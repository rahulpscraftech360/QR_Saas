const { userService, emailService } = require('../services');
const { generateQRCode } = require('../services/qrCode.service');
const he = require('he');
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); // Replace with your service account key JSON file
const { createCanvas } = require('canvas');
const { toPng } = require('node-html-to-image');
const nodeHtmlToImage = require('node-html-to-image');
const { convertHtmlToImage, convertHtmlToPng, pngToBase64 } = require('../services/htmlToImage.service');
const sharp = require('sharp');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://qr-code-7944d.appspot.com', // Replace with your storage bucket URL
});

const bucket = admin.storage().bucket();

exports.uploadFinalImage = async (qrCodeUri, userId) => {
  //console.log('uploading Image', qrCodeUri);
  try {
    const qrCodeBuffer = Buffer.from(qrCodeUri.compressedDataUri.split(',')[1], 'base64');
    const file = bucket.file(`qrcodes/${userId}.png`);

    await file.save(qrCodeBuffer, {
      metadata: {
        contentType: 'image/png',
      },
    });

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491', // Replace with an expiry date or duration
    });

    // console.log('image is uploaded to:', url);
    return url;
  } catch (error) {
    console.error('Error uploading QR code:', error);
    throw new Error('Failed to upload QR code');
  }
};
