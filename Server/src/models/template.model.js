const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  name: String,
  htmlFile: Buffer,
  backgroundImageURL: String,
  overlayImageURL: String,
  // Other fields if needed
});

const Template = mongoose.model('Template', TemplateSchema);

module.exports = Template;
