const QRCode = require('qrcode');
const fs = require('fs').promises;

/**
 * Generate QR code based on provided data
 * @param {object} data
 * @returns {Promise<string>} Returns the filename of the generated QR code image
 */
const generateQRCode = async (data) => {
  //console.log(' data before stringfy', data);
  try {
    // Convert the data object to a string (you might need to format it as needed)
    const qrData = JSON.stringify(data);

    // Generate QR code

    const filePath = 'qr-code.png'; // Path to save the QR code image
    await QRCode.toFile(filePath, qrData); // Generate and save the QR code image
    const qrImageDataURI = await QRCode.toDataURL(qrData);

    return qrImageDataURI;

    // Return the filepath of the generated QR code image
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

module.exports = {
  generateQRCode,
};
