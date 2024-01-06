const { loadImage, createCanvas } = require('canvas');
const { convert } = require('node-html-to-image');
const nodeHtmlToImage = require('node-html-to-image');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const imageSize = require('image-size');

async function convertHtmlToPng(updatedHtml) {
  try {
    const image = await nodeHtmlToImage({
      html: updatedHtml,
    });

    const compressedDataUri = `data:image/png;base64,${image.toString('base64')}`;

    return { compressedDataUri }; // Return the data URI and the image file path
  } catch (error) {
    throw new Error(`Failed to convert HTML to image: ${error.message}`);
  }
}

// async function pngToBase64(pngFilePath) {
//   try {
//     const pngData = fs.readFileSync(pngFilePath);
//     // size reduce
//     const outputBuffer = await sharp(inputBuffer).resize({ width: 500 }).toBuffer(); // Adjust resizing parameters as needed
//     const base64Image = pngData.toString('base64');
//     return base64Image;
//   } catch (error) {
//     throw new Error(`Failed to convert PNG to base64: ${error.message}`);
//   }
// }

async function pngToBase64(pngFilePath) {
  try {
    const pngData = fs.readFileSync(pngFilePath);
    // size reduce
    const pngDataSizeKB = (pngData.length / 1024).toFixed(2); // Size of pngData in KB
    console.log(`Size of pngData: ${pngDataSizeKB} KB`);
    const outputBuffer = await sharp(pngData).resize({ width: 500 }).png({ quality: 70 }).toBuffer();
    const outputBufferSizeKB = (outputBuffer.length / 1024).toFixed(2); // Size of outputBuffer in KB
    console.log(`Size of outputBuffer: ${outputBufferSizeKB} KB`);
    // Adjust resizing parameters as needed
    const base64Image = outputBuffer.toString('base64');
    const base64ImageSizeKB = (base64Image.length / 1024).toFixed(2); // Size of outputBuffer in KB
    console.log(`Size of base64Image: ${base64ImageSizeKB} KB`);
    return base64Image;
  } catch (error) {
    throw new Error(`Failed to convert PNG to base64: ${error.message}`);
  }
}

module.exports = { convertHtmlToPng, pngToBase64 };
