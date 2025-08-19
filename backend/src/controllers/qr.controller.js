import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { QRCodeCanvas } from '@loskir/styled-qr-code-node';
import { QRImages } from '../models/image.model.js';
import { QRCode as QRCodeModel } from '../models/qr.model.js';
import cloudinary from '../utils/cloudinary.js';
export const saveQr = async (req, res) => {
  try {
    const { userId, name, config, qrId } = req.body;
    let logoFile = req.files?.logo; 
    if (!config || !name) {
      return res.status(400).json({ message: 'Name and config are required' });
    }
    if (logoFile) {
      const uploadResult = await cloudinary.uploader.upload(logoFile[0].path, {
        folder: 'qr-logos',
      });
      const logoUrl = uploadResult.secure_url;
      config = {
        ...config,
        image: logoUrl,
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 5
        }
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
            { image: `/uploads/qrs/${fileName}`, logoUrl: logoFile ? uploadResult.secure_url : null },
            { new: true }
          );
        }
      }
      if (!imageDoc) {
        imageDoc = await QRImages.create({ userId, image: `/uploads/qrs/${fileName}`, logoUrl: logoFile ? uploadResult.secure_url : null });
      }
      qrDocument.name = name;
      qrDocument.config = config;
      qrDocument.imageId = imageDoc._id;
      await qrDocument.save();
    } else {
      imageDoc = await QRImages.create({ userId, image: `/uploads/qrs/${fileName}`, logoUrl: logoFile ? uploadResult.secure_url : null });
      qrDocument = new QRCodeModel({
        userId,
        name,
        config,
        imageId: imageDoc._id
      });
      await qrDocument.save();
    }
    res.status(201).json({
      message: 'QR code saved successfully',
      qr: qrDocument,
      qrImage: imageDoc
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