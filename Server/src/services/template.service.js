// templateService.js

const Template = require('../models/template.model');
const fs = require('fs').promises;

const saveTemplate = async (name, htmlFilePath) => {
  try {
    // Read the HTML and CSS files as Buffers
    // const htmlFileContent = await fs.readFile(htmlFilePath);
    // const cssFileContent = await fs.readFile(cssFilePath);

    const htmlFileContent = await fs.readFile(htmlFilePath);

    const newTemplate = new Template({ name, htmlFile: htmlFileContent });
    const savedTemplate = await newTemplate.save();
    return savedTemplate;
  } catch (error) {
    throw new Error(`Error saving template: ${error}`);
  }
};

const getTemplateByName = async (name) => {
  try {
    const template = await Template.findOne({ name });
    return template;
  } catch (error) {
    throw new Error(`Error retrieving template: ${error}`);
  }
};

module.exports = {
  saveTemplate,
  getTemplateByName,
};
