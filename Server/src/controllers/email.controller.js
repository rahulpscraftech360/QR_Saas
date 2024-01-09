//const emailService = require('../services/email.service');

const { generateQRCode } = require('../services/qrCode.service');
const he = require('he');
// const admin = require('firebase-admin');
// const serviceAccount = require('../serviceAccountKey.json'); // Replace with your service account key JSON file
const { createCanvas } = require('canvas');
const { toPng } = require('node-html-to-image');
const nodeHtmlToImage = require('node-html-to-image');
const { convertHtmlToImage, convertHtmlToPng, pngToBase64 } = require('../services/htmlToImage.service');
const sharp = require('sharp');
const { uploadFinalImage } = require('../services/fileUpload.service');
const { addEmailJob } = require('../bull/bullSetup');

//??testing  bull mq

exports.sendEmail = async (req, res) => {
  // console.log('hereeeeeeeeeeeeeeeeeeeeee');
  try {
    const { htmlTemplate, participants, subject } = req.body;
    addEmailJob(htmlTemplate, participants, subject)
      .then(() => {
        console.log('jobid');
        console.log('Email job added successfully');
      })
      .catch((err) => {
        console.error('Failed to add email job:', err);
      });
    res.status(200).json({ message: 'suceess' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
