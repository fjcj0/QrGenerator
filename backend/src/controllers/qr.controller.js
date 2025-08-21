import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { QRCodeCanvas } from '@loskir/styled-qr-code-node';
import { QRImages } from '../models/image.model.js';
import { QRCode as QRCodeModel } from '../models/qr.model.js';
import cloudinary from '../utils/cloudinary.js';
import { User } from '../models/user.model.js';
import { Scanner } from '../models/scanner.model.js';
import dotenv from "dotenv";
export const saveQr = async (req, res) => {
  try {
    const { userId, name, config: configBody, qrId, url } = req.body;
    const logoFile = req.file;
    if (!configBody || !name || !userId) {
      return res.status(400).json({ message: 'Name, Config and userId are required!!' });
    }
    dotenv.config({ quiet: true });
    const BASE_URL = process.env.MODE === "development" ? "http://localhost:8080" : "";
    let config = typeof configBody === 'string' ? JSON.parse(configBody) : configBody;
    const tokenURL = crypto.randomBytes(8).toString('hex');
    const unrealDestination = `${BASE_URL}/api/qr/scan/${tokenURL}`;
    let logoUrl = null;
    if (logoFile) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'QrLogos' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(logoFile.buffer);
      });
      logoUrl = uploadResult.secure_url;
      config = {
        ...config,
        data: unrealDestination,
        image: logoUrl,
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 0,
          imageSize: 0.3,
          hideBackgroundDots: true,
        },
      };
    }
    const bgColor =
      (config.backgroundOptions && config.backgroundOptions.color) ||
      config.background ||
      '#FFFFFF';
    const isDarkBg = ['#000', '#000000', 'black'].includes(bgColor.toLowerCase());
    config.dotsOptions = config.dotsOptions || {};
    config.dotsOptions.color = config.dotsOptions.color || (isDarkBg ? '#FFFFFF' : '#000000');
    let qrDocument;
    let imageDoc;
    if (qrId) {
      qrDocument = await QRCodeModel.findById(qrId);
      if (!qrDocument) return res.status(404).json({ message: 'QR not found' });
      const qrCode = new QRCodeCanvas(config);
      const fileType = (config?.type || 'png').toLowerCase();
      const uploadDir = path.join(process.cwd(), 'src/uploads/qrs');
      fs.mkdirSync(uploadDir, { recursive: true });
      const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(4).toString('hex');
      const fileName = `${name}-${uniqueSuffix}.${fileType}`;
      const filePath = path.join(uploadDir, fileName);
      await qrCode.toFile(filePath, fileType);
      if (qrDocument.imageId) {
        const oldImage = await QRImages.findById(qrDocument.imageId);
        if (oldImage) {
          const oldFilePath = path.join(process.cwd(), 'src', oldImage.image);
          if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
          imageDoc = await QRImages.findByIdAndUpdate(
            qrDocument.imageId,
            { image: `/uploads/qrs/${fileName}`, logoUrl: logoUrl },
            { new: true }
          );
        }
      }
      if (!imageDoc) {
        imageDoc = await QRImages.create({
          userId,
          image: `/uploads/qrs/${fileName}`,
          logoUrl: logoUrl,
        });
      }
      qrDocument.name = name;
      qrDocument.token = tokenURL;
      if (url && url !== qrDocument.url) {
        config.data = unrealDestination;
        qrDocument.url = url;
      } else {
        config.data = qrDocument.config.data;
      }
      qrDocument.config = config;
      qrDocument.imageId = imageDoc._id;
      await qrDocument.save();
    }
    else {
      const user = await User.findById(userId);
      if (!user || user.totalFreeQr <= 0) {
        return res.status(400).json({ message: 'you dont have enough money!!' });
      }
      const qrCode = new QRCodeCanvas(config);
      const fileType = (config?.type || 'png').toLowerCase();
      const uploadDir = path.join(process.cwd(), 'src/uploads/qrs');
      fs.mkdirSync(uploadDir, { recursive: true });
      const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(4).toString('hex');
      const fileName = `${name}-${uniqueSuffix}.${fileType}`;
      const filePath = path.join(uploadDir, fileName);
      await qrCode.toFile(filePath, fileType);
      imageDoc = await QRImages.create({
        userId,
        image: `/uploads/qrs/${fileName}`,
        logoUrl: logoUrl,
      });
      qrDocument = new QRCodeModel({
        userId,
        name,
        config,
        imageId: imageDoc._id,
        token: tokenURL,
        url,
      });
      await qrDocument.save();
      user.totalFreeQr -= 1;
      await user.save();
    }
    res.status(201).json({
      message: 'QR code saved successfully',
      qr: qrDocument,
      qrImage: imageDoc,
    });
  } catch (error) {
    console.error('Error saving QR code:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const scanQr = async (req, res) => {
  try {
    const { tokenURL } = req.params;
    const qr = await QRCodeModel.findOne({ token: tokenURL });
    if (!qr) return res.status(404).json({ message: "QR not found" });
    await Scanner.findOneAndUpdate(
      { qrId: qr._id },
      { 
        $inc: { scanCount: 1 }, 
        $set: { userAgent: req.headers["user-agent"], ipAddress: req.ip } 
      },
      { new: true, upsert: true }
    );
    return res.redirect(qr.url);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error scanning QR" });
  }
};
export const deleteQrs = async (req, res) => {
  try {
    const qrIdsParam = req.query.qrIds;
    if (!qrIdsParam) return res.status(400).json({ message: 'qrIds query parameter is required' });
    const qrIds = qrIdsParam.split(',');
    if (qrIds.length === 0) return res.status(400).json({ message: 'No QR IDs provided' });
    const deletedQrs = [];
    for (const qrId of qrIds) {
      const qrDocument = await QRCodeModel.findById(qrId);
      if (!qrDocument) continue;
      if (qrDocument.imageId) {
        const imageDoc = await QRImages.findById(qrDocument.imageId);
        if (imageDoc) {
          const filePath = path.join(process.cwd(), 'src', imageDoc.image);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
          if (imageDoc.logoUrl) {
            try {
              const parts = imageDoc.logoUrl.split('/');
              const filename = parts.pop();
              const folder = parts.slice(parts.indexOf('upload') + 1).join('/');
              const publicId = imageDoc.logoUrl.split('/').pop().split('.')[0];
              await cloudinary.uploader.destroy(`QrLogos/${publicId}`);
            } catch (err) {
              console.warn('⚠️ Failed to delete logo from Cloudinary:', err.message);
            }
          }
          await QRImages.findByIdAndDelete(imageDoc._id);
        }
      }
      await QRCodeModel.findByIdAndDelete(qrId);
      await Scanner.deleteMany({qrId});
      deletedQrs.push(qrId);
    }
    res.status(200).json({
      message: 'Selected QR codes deleted successfully!!',
      deletedQrs
    });
  } catch (error) {
    console.error('Error deleting QR codes:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const getUserQrs = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const qrs = await QRCodeModel.find({ userId })
      .populate("imageId", "image logoUrl createdAt") 
      .sort({ createdAt: -1 });

    if (!qrs || qrs.length === 0) {
      return res.status(404).json({ message: "No QR codes found for this user" });
    }
    res.status(200).json({ qrs });
  } catch (error) {
    console.error("Error fetching user QR codes:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getUserQrScans = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      return res.status(400).json({ message: 'Invalid userId' });
    }
    const userQrs = await QRCodeModel.find({ userId }).select('_id name token');
    const qrIds = userQrs.map(qr => qr._id);
    const scans = await Scanner.find({ qrId: { $in: qrIds } });
    const result = userQrs.map(qr => {
      const qrScans = scans.filter(scan => scan.qrId.toString() === qr._id.toString());
      const totalScans = qrScans.reduce((sum, scan) => sum + (scan.scanCount || 0), 0);
      return {
        qrId: qr._id,
        name: qr.name,
        token: qr.token,
        totalScans,
        scans: qrScans
      };
    });
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const getTop10UserQrs = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      return res.status(400).json({ message: 'Invalid userId' });
    }
    const userQrs = await QRCodeModel.find({ userId }).select('_id name token');
    if (!userQrs.length) {
      return res.json([]);
    }
    const qrIds = userQrs.map(qr => qr._id);
    const scans = await Scanner.find({ qrId: { $in: qrIds } });
    const result = userQrs.map(qr => {
      const qrScans = scans.filter(scan => scan.qrId.toString() === qr._id.toString());
      const totalScans = qrScans.reduce((sum, scan) => sum + (scan.scanCount || 0), 0);
      return {
        qrId: qr._id,
        name: qr.name,
        token: qr.token,
        totalScans,
      };
    });
    const top10 = result.sort((a, b) => b.totalScans - a.totalScans).slice(0, 10);
    return res.json(top10);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const getLastWeekStats = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const today = new Date();
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(today.getDate() - 7);
    lastWeekStart.setHours(0, 0, 0, 0);
    const lastWeekEnd = new Date(today);
    lastWeekEnd.setDate(today.getDate() - 1);
    lastWeekEnd.setHours(23, 59, 59, 999);
    const totalQrCreated = await QRCodeModel.countDocuments({
      userId,
      createdAt: { $gte: lastWeekStart, $lte: lastWeekEnd }
    });
    const userQrIds = await QRCodeModel.find({ userId }).distinct('_id');
    const totalScansData = await Scanner.aggregate([
      { $match: { qrId: { $in: userQrIds }, scannedAt: { $gte: lastWeekStart, $lte: lastWeekEnd } } },
      { $group: { _id: null, totalScans: { $sum: '$scanCount' } } }
    ]);

    const totalScans = totalScansData[0]?.totalScans || 0;
    const totalMoneyLost = totalScans * 0.5;
    const weeklyStat = await WeeklyStats.create({
      userId,
      weekStart: lastWeekStart,
      weekEnd: lastWeekEnd,
      totalQrCreated,
      totalScans,
      totalMoneyLost
    });
    res.status(200).json({ message: 'Last week stats', data: weeklyStat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};