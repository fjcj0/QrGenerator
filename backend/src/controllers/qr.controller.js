import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { QRCodeCanvas } from '@loskir/styled-qr-code-node';
import { QRImages } from '../models/image.model.js';
import { QRCode as QRCodeModel } from '../models/qr.model.js';
import cloudinary from '../utils/cloudinary.js';
export const saveQr = async (req, res) => {
  try {
    const { userId, name, config: configBody, qrId } = req.body;
    const logoFile = req.file; 
    if (!configBody || !name) {
      return res.status(400).json({ message: 'Name and config are required' });
    }
    let config = typeof configBody === 'string' ? JSON.parse(configBody) : configBody;
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
        image: logoUrl,
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 5,
          imageSize: 0.3,
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
      qrDocument.config = config;
      qrDocument.imageId = imageDoc._id;
      await qrDocument.save();
    } else {
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
      });
      await qrDocument.save();
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
              const publicId = folder + '/' + filename.split('.')[0]; 
              await cloudinary.uploader.destroy(publicId);
              console.log(`✅ Deleted logo from Cloudinary: ${publicId}`);
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
      message: 'Selected QR codes deleted successfully', 
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
      .populate("imageId", "image logo createdAt")
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