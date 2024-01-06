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

// exports.sendEmail = async (req, res) => {
//   // console.log('hereeeeeeeeeeeeeeeeeeeeee');
//   const { htmlTemplate, participants, subject } = req.body;

//   const updatedHtmlPromises = participants.map(async (userId) => {
//     try {
//       const user = await userService.getUserById(userId);
//       const qrCode = await generateQRCode(user._id).then((qrBase64) => {
//         return qrBase64;
//       });
//       const decodedHTML = he.decode(htmlTemplate);
//       const updatedHtml = await decodedHTML.replace(
//         /src="https:\/\/cdn\.britannica\.com\/17\/155017-050-9AC96FC8\/Example-QR-code\.jpg"/,
//         `src="${qrCode}"`
//       );
//       const recipient = user;
//       const backgroundImage = await convertHtmlToPng(updatedHtml, user._id);
//       const backgroundImagelink = await uploadFinalImage(backgroundImage, user._id);
//       console.log('going ot email service', recipient);
//       // await emailService.sendEmail(recipient, subject, backgroundImagelink);
//     } catch (error) {
//       console.error('Error sending email:', error);
//       res.status(500).json({ error: 'Failed to send email' });
//     }
//   });
// };

///>>>

// exports.sendEmail = async (req, res) => {
//   // console.log('hereeeeeeeeeeeeeeeeeeeeee');
//   try {
//   const { htmlTemplate, participants, subject } = req.body;
//   await emailService.sendEmail( htmlTemplate, participants, subject);
//   res.status(200).json({message:"suceess"})
// } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ error: 'Failed to send email' });
//       }
// };

//??testing  bull mq

exports.sendEmail = async (req, res) => {
  // console.log('hereeeeeeeeeeeeeeeeeeeeee');
  try {
    const { htmlTemplate, participants, subject } = req.body;
    addEmailJob(htmlTemplate, participants, subject)
      .then(() => {
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
