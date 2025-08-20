import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { QRCodeCanvas } from '@loskir/styled-qr-code-node';
import { QRImages } from '../models/image.model.js';
import { QRCode as QRCodeModel } from '../models/qr.model.js';
import cloudinary from '../utils/cloudinary.js';
import { User } from '../models/user.model.js';
import { Scanner } from '../models/scanner.model.js';
export const saveQr = async (req, res) => {
  try {
    const { userId, name, config: configBody, qrId, url } = req.body;
    const logoFile = req.file;
    if (!configBody || !name) {
      return res.status(400).json({ message: 'Name and config are required' });
    }
    let config = typeof configBody === 'string' ? JSON.parse(configBody) : configBody;
    const tokenURL = crypto.randomBytes(8).toString('hex');
    const unrealDestination = `localhost:8080/api/qr/scan/${tokenURL}`;
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
    const qrCode = new QRCodeCanvas(config);
    const fileType = (config?.type || 'png').toLowerCase();
    const uploadDir = path.join(process.cwd(), 'src/uploads/qrs');
    fs.mkdirSync(uploadDir, { recursive: true });
    const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(4).toString('hex');
    const fileName = `${name}-${uniqueSuffix}.${fileType}`;
    const filePath = path.join(uploadDir, fileName);
    await qrCode.toFile(filePath, fileType);
    let qrDocument;
    let imageDoc;
    if (qrId) {
      qrDocument = await QRCodeModel.findById(qrId);
      if (!qrDocument) return res.status(404).json({ message: 'QR not found' });
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
    } else {
      const user = await User.findById(userId);
      if (user && user.totalFreeQr > 0) {
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
