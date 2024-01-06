const Mailjet = require('node-mailjet');

const fs = require('fs');

const path = require('path');
const apikey = 'f8c199da7a532fcb35fc83fce0e9ec55';
const secretKey = '4256f81b95daa1b6f63444c3971382bb';
const mailjet = Mailjet.apiConnect(apikey, secretKey);

const userService = require('./user.service');
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

// const mailjet = Mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

// exports.sendEmail = async (recipient, subject, backgroundImagelink) => {
//   var htmlString = `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title>GOURMETLUXE</title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
//         body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
//         table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
//         img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
//         p { display:block;margin:13px 0; }</style><!--[if mso]>
//       <noscript>
//       <xml>
//       <o:OfficeDocumentSettings>
//         <o:AllowPNG/>
//         <o:PixelsPerInch>96</o:PixelsPerInch>
//       </o:OfficeDocumentSettings>
//       </xml>
//       </noscript>
//       <![endif]--><!--[if lte mso 11]>
//       <style type="text/css">
//         .mj-outlook-group-fix { width:100% !important; }
//       </style>
//       <![endif]--><style type="text/css">@media only screen and (min-width:480px) {
//           .mj-column-per-100 { width:100% !important; max-width: 100%; }
//         }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css">@media only screen and (max-width:479px) {
//         table.mj-full-width-mobile { width: 100% !important; }
//         td.mj-full-width-mobile { width: auto !important; }
//       }</style><style type="text/css"></style></head><body style="word-spacing:normal;">
//       <div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:500px;">
//       <img alt="Full Screen Image" src="https://raw.githubusercontent.com/Craftech360-projects/qr-vijayawada/new-qrCode/mainImages/SYMPH.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="500" height="auto"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`;
//   const decodedHTML = he.decode(htmlString);

//   try {
//     const updatedHtml = htmlString.replace(
//       /src="https:\/\/raw\.githubusercontent\.com\/Craftech360-projects\/qr-vijayawada\/new-qrCode\/mainImages\/SYMPH\.png"/,
//       `src="${backgroundImagelink}"`
//     );

//     function downloadHtmlAsFile(updatedHtml) {
//       try {
//         const outputFilePath = path.join('', 'output.html'); // Output file path

//         // Write the HTML content to a file
//         fs.writeFileSync(outputFilePath, updatedHtml, 'utf8');

//         console.log(`HTML file saved at: ${outputFilePath}`);
//       } catch (error) {
//         throw new Error(`Failed to download HTML as file: ${error.message}`);
//       }
//     }
//     const updatedHtmlSizeKB = (updatedHtml.length / 1024).toFixed(2); // Size of outputBuffer in KB
//     console.log(`Size of updatedHtmlSizeKB: ${updatedHtmlSizeKB} KB`);
//     downloadHtmlAsFile(updatedHtml);

//     const request = mailjet.post('send', { version: 'v3.1' }).request({
//       Messages: [
//         {
//           From: {
//             Email: 'abilash@craftech360.com',
//             Name: 'Abilash',
//           },
//           To: [
//             {
//               Email: recipient.email,
//               Name: recipient.name,
//             },
//           ],
//           Subject: subject,
//           HTMLPart: updatedHtml,
//         },
//       ],
//     });
//     request
//       .then((result) => {
//         // console.log(JSON.stringify(result));
//         console.log(`mail to ${recipient} is success`);
//       })
//       .catch((err) => {
//         console.log(err, 'failed');
//       });
//   } catch (error) {
//     console.log('Failed to send email:', error);
//     return { success: false, error: error.message };
//   }
// };

//working code
// console.log(htmlString);
// const request = mailjet.post('send', { version: 'v3.1' }).request({
//   Messages: [
//     {
//       From: {
//         Email: 'abilash@craftech360.com',
//         Name: 'Abilash',
//       },
//       To: [
//         {
//           Email: 'rahulps995@gmail.com',
//           Name: recipient.name,
//         },
//       ],
//       Subject: subject,
//       HTMLPart: updatedHtml,
//     },
//   ],
// });
// request
//   .then((result) => {
//     // console.log(JSON.stringify(result));
//     console.log(`mail to ${recipient} is success`, result);
//   })
//   .catch((err) => {
//     console.log(err, 'failed');
//   });

//workers added

// const { eventEmitter } = require('../app');

// exports.sendEmail = async (htmlTemplate, participants, subject, jobId) => {
//   const totalParticipants = participants.length;

//   const updatedHtmlPromises = participants.map(async (userId, index) => {
//     try {
//       console.log(index);
//       // const userId = participants[i];
//       eventEmitter.emit('jobProgress', { jobId: jobId, progress: `${((index + 1) / totalParticipants) * 100}%` });
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
//       // console.log('going ot email service', recipient);

//       // await emailService.sendEmail(recipient, subject, backgroundImagelink);

//       var htmlString = `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title>GOURMETLUXE</title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
//       body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
//       table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
//       img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
//       p { display:block;margin:13px 0; }</style><!--[if mso]>
//     <noscript>
//     <xml>
//     <o:OfficeDocumentSettings>
//       <o:AllowPNG/>
//       <o:PixelsPerInch>96</o:PixelsPerInch>
//     </o:OfficeDocumentSettings>
//     </xml>
//     </noscript>
//     <![endif]--><!--[if lte mso 11]>
//     <style type="text/css">
//       .mj-outlook-group-fix { width:100% !important; }
//     </style>
//     <![endif]--><style type="text/css">@media only screen and (min-width:480px) {
//         .mj-column-per-100 { width:100% !important; max-width: 100%; }
//       }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css">@media only screen and (max-width:479px) {
//       table.mj-full-width-mobile { width: 100% !important; }
//       td.mj-full-width-mobile { width: auto !important; }
//     }</style><style type="text/css"></style></head><body style="word-spacing:normal;">
//     <div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:500px;">
//     <img alt="Full Screen Image" src="https://raw.githubusercontent.com/Craftech360-projects/qr-vijayawada/new-qrCode/mainImages/SYMPH.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="500" height="auto"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`;
//       const decodedHTML2 = he.decode(htmlString);
//       // console.log("decodede html", decodedHTML2)
//       try {
//         const updatedHtml = htmlString.replace(
//           /src="https:\/\/raw\.githubusercontent\.com\/Craftech360-projects\/qr-vijayawada\/new-qrCode\/mainImages\/SYMPH\.png"/,
//           `src="${backgroundImagelink}"`
//         );
//         // console.log(">>>>>>>>>>>>",updatedHtml)
//         async function downloadHtmlAsFile(updatedHtml) {
//           try {
//             const outputFilePath = path.join('', 'output.html'); // Output file path

//             // Write the HTML content to a file
//             fs.writeFileSync(outputFilePath, updatedHtml, 'utf8');

//             // console.log(`HTML file saved at: ${outputFilePath}`);
//           } catch (error) {
//             throw new Error(`Failed to download HTML as file: ${error.message}`);
//           }
//         }
//         console.log('complete');

//         //?? hided because no need to send email

//         // downloadHtmlAsFile(updatedHtml);

//         // const request = mailjet.post('send', { version: 'v3.1' }).request({
//         //   Messages: [
//         //     {
//         //       From: {
//         //         Email: 'abilash@craftech360.com',
//         //         Name: 'Abilash',
//         //       },
//         //       To: [
//         //         {
//         //           Email: recipient.email,
//         //           Name: recipient.name,
//         //         },
//         //       ],
//         //       Subject: subject,
//         //       HTMLPart: updatedHtml,
//         //     },
//         //   ],
//         // });
//         // request
//         //   .then((result) => {
//         //     // console.log(JSON.stringify(result));
//         //     console.log(`mail to ${recipient.name} is success`);
//         //   })
//         //   .catch((err) => {
//         //     console.log(err, 'failed');
//         //   });
//       } catch (error) {
//         console.log('Failed to send email:', error);
//         return { success: false, error: error.message };
//       }
//     } catch (error) {
//       console.error('Error sending email:', error);
//       // res.status(500).json({ error: 'Failed to send email' });
//     }
//   });
// };

//events emitting without emai logic almost fixed

// const { eventEmitter } = require('../app');
// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
// exports.sendEmail = async (htmlTemplate, participants, subject, job) => {
//   const totalParticipants = participants.length;
//   // await sleep(2000);
//   console.log('hereeeee', totalParticipants);
//   const updatedHtmlPromises = participants.map(async (userId, index) => {
//     console.log('hereeeee>>>');
//     const progress = `${((index + 1) / totalParticipants) * 100}`;
//     console.log(index, { jobId: job.id, Progress: progress }, '>>>>>>');
//     await job.updateProgress(progress);

//     // try {
//     //   // console.log(index);
//     //   // const userId = participants[i];
//     //   // eventEmitter.emit('jobProgress', { jobId: jobId, progress: `${((index + 1) / totalParticipants) * 100}%` });
//     //   const user = await userService.getUserById(userId);
//     //   const qrCode = await generateQRCode(user._id).then((qrBase64) => {
//     //     return qrBase64;
//     //   });
//     //   const decodedHTML = he.decode(htmlTemplate);
//     //   const updatedHtml = await decodedHTML.replace(
//     //     /src="https:\/\/cdn\.britannica\.com\/17\/155017-050-9AC96FC8\/Example-QR-code\.jpg"/,
//     //     `src="${qrCode}"`
//     //   );
//     //   const recipient = user;
//     //   const backgroundImage = await convertHtmlToPng(updatedHtml, user._id);
//     //   const backgroundImagelink = await uploadFinalImage(backgroundImage, user._id);
//     //   // console.log('going ot email service', recipient);

//     //   // await emailService.sendEmail(recipient, subject, backgroundImagelink);

//     //   var htmlString = `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title>GOURMETLUXE</title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
//     //   body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
//     //   table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
//     //   img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
//     //   p { display:block;margin:13px 0; }</style><!--[if mso]>
//     // <noscript>
//     // <xml>
//     // <o:OfficeDocumentSettings>
//     //   <o:AllowPNG/>
//     //   <o:PixelsPerInch>96</o:PixelsPerInch>
//     // </o:OfficeDocumentSettings>
//     // </xml>
//     // </noscript>
//     // <![endif]--><!--[if lte mso 11]>
//     // <style type="text/css">
//     //   .mj-outlook-group-fix { width:100% !important; }
//     // </style>
//     // <![endif]--><style type="text/css">@media only screen and (min-width:480px) {
//     //     .mj-column-per-100 { width:100% !important; max-width: 100%; }
//     //   }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css">@media only screen and (max-width:479px) {
//     //   table.mj-full-width-mobile { width: 100% !important; }
//     //   td.mj-full-width-mobile { width: auto !important; }
//     // }</style><style type="text/css"></style></head><body style="word-spacing:normal;">
//     // <div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:500px;">
//     // <img alt="Full Screen Image" src="https://raw.githubusercontent.com/Craftech360-projects/qr-vijayawada/new-qrCode/mainImages/SYMPH.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="500" height="auto"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`;
//     //   const decodedHTML2 = he.decode(htmlString);
//     //   // console.log("decodede html", decodedHTML2)
//     //   try {
//     //     const updatedHtml = htmlString.replace(
//     //       /src="https:\/\/raw\.githubusercontent\.com\/Craftech360-projects\/qr-vijayawada\/new-qrCode\/mainImages\/SYMPH\.png"/,
//     //       `src="${backgroundImagelink}"`
//     //     );
//     //     // console.log(">>>>>>>>>>>>",updatedHtml)
//     //     async function downloadHtmlAsFile(updatedHtml) {
//     //       try {
//     //         const outputFilePath = path.join('', 'output.html'); // Output file path

//     //         // Write the HTML content to a file
//     //         fs.writeFileSync(outputFilePath, updatedHtml, 'utf8');

//     //         // console.log(`HTML file saved at: ${outputFilePath}`);
//     //       } catch (error) {
//     //         throw new Error(`Failed to download HTML as file: ${error.message}`);
//     //       }
//     //     }
//     //     // console.log('complete');

//     //     //?? hided because no need to send email

//     //     // downloadHtmlAsFile(updatedHtml);

//     //     const request = mailjet.post('send', { version: 'v3.1' }).request({
//     //       Messages: [
//     //         {
//     //           From: {
//     //             Email: 'abilash@craftech360.com',
//     //             Name: 'Abilash',
//     //           },
//     //           To: [
//     //             {
//     //               Email: recipient.email,
//     //               Name: recipient.name,
//     //             },
//     //           ],
//     //           Subject: subject,
//     //           HTMLPart: updatedHtml,
//     //         },
//     //       ],
//     //     });
//     //     request
//     //       .then((result) => {
//     //         // console.log(JSON.stringify(result));
//     //         console.log(`mail to ${recipient.name} is success`);
//     //       })
//     //       .catch((err) => {
//     //         console.log(err, 'failed');
//     //       });
//     //   } catch (error) {
//     //     console.log('Failed to send email:', error);
//     //     return { success: false, error: error.message };
//     //   }
//     // } catch (error) {
//     //   console.error('Error sending email:', error);
//     //   // res.status(500).json({ error: 'Failed to send email' });
//     // }
//   });

//   // ... your email sending logic here

//   // Emit progress event for each processed email
// };

//events emitting without emai logic

const { eventEmitter } = require('../app');
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sendEmail = async (htmlTemplate, participants, subject, job) => {
  if (!Array.isArray(participants) || participants.length === 0) {
    console.error('No participants provided or participants is not an array');
    return;
  }
  const totalParticipants = participants.length;
  // await sleep(2000);
  console.log('hereeeee', totalParticipants);
  const updatedHtmlPromises = participants.map(async (userId, index) => {
    console.log('hereeeee>>>');
    const progress = `${((index + 1) / totalParticipants) * 100}`;
    console.log(index, { jobId: job.id, Progress: progress }, '>>>>>>');
    await job.updateProgress(progress);

    try {
      // console.log(index);
      // const userId = participants[i];
      // eventEmitter.emit('jobProgress', { jobId: jobId, progress: `${((index + 1) / totalParticipants) * 100}%` });
      const user = await userService.getUserById(userId);
      const qrCode = await generateQRCode(user._id).then((qrBase64) => {
        return qrBase64;
      });
      const decodedHTML = he.decode(htmlTemplate);
      const updatedHtml = await decodedHTML.replace(
        /src="https:\/\/cdn\.britannica\.com\/17\/155017-050-9AC96FC8\/Example-QR-code\.jpg"/,
        `src="${qrCode}"`
      );
      const recipient = user;
      console.log('here');
      console.log(updatedHtml);
      const backgroundImage = await convertHtmlToPng(updatedHtml, user._id);
      const backgroundImagelink = await uploadFinalImage(backgroundImage, user._id);
      // console.log('going ot email service', recipient);

      // await emailService.sendEmail(recipient, subject, backgroundImagelink);

      var htmlString = `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title>GOURMETLUXE</title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
      body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
      table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
      img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
      p { display:block;margin:13px 0; }</style><!--[if mso]>
    <noscript>
    <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]--><!--[if lte mso 11]>
    <style type="text/css">
      .mj-outlook-group-fix { width:100% !important; }
    </style>
    <![endif]--><style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
      }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css">@media only screen and (max-width:479px) {
      table.mj-full-width-mobile { width: 100% !important; }
      td.mj-full-width-mobile { width: auto !important; }
    }</style><style type="text/css"></style></head><body style="word-spacing:normal;">
    <div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:auto;">
    <img alt="Full Screen Image" src="https://raw.githubusercontent.com/Craftech360-projects/qr-vijayawada/new-qrCode/mainImages/SYMPH.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="500" height="auto"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`;
      const decodedHTML2 = he.decode(htmlString);
      // console.log("decodede html", decodedHTML2)
      try {
        const updatedHtml = htmlString.replace(
          /src="https:\/\/raw\.githubusercontent\.com\/Craftech360-projects\/qr-vijayawada\/new-qrCode\/mainImages\/SYMPH\.png"/,
          `src="${backgroundImagelink}"`
        );
        // console.log(">>>>>>>>>>>>",updatedHtml)
        async function downloadHtmlAsFile(updatedHtml) {
          try {
            const outputFilePath = path.join('', 'output.html'); // Output file path

            // Write the HTML content to a file
            fs.writeFileSync(outputFilePath, updatedHtml, 'utf8');

            // console.log(`HTML file saved at: ${outputFilePath}`);
          } catch (error) {
            throw new Error(`Failed to download HTML as file: ${error.message}`);
          }
        }

        console.log(updatedHtml);
        // console.log('complete');

        //?? hided because no need to send email

        // downloadHtmlAsFile(updatedHtml);

        const request = mailjet.post('send', { version: 'v3.1' }).request({
          Messages: [
            {
              From: {
                Email: 'abilash@craftech360.com',
                Name: 'Abilash',
              },
              To: [
                {
                  // Email: recipient.email,
                  Email: 'rahulps995@gmail.com',
                  Name: recipient.name,
                },
              ],
              Subject: subject,
              HTMLPart: updatedHtml,
            },
          ],
        });
        request
          .then((result) => {
            // console.log(JSON.stringify(result));
            console.log(`mail to ${recipient.name} is success`);
          })
          .catch((err) => {
            console.log(err, 'failed');
          });
      } catch (error) {
        console.log('Failed to send email:', error);
        return { success: false, error: error.message };
      }
    } catch (error) {
      console.error('Error sending email:', error);
      // res.status(500).json({ error: 'Failed to send email' });
    }
  });

  // ... your email sending logic here

  // Emit progress event for each processed email
};
