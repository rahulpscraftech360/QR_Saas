// templateController.js

const templateService = require('../services/template.service');

const saveTemplate = async (req, res) => {
  const { name, htmlContent, cssContent } = req.body;

  try {
    const savedTemplate = await templateService.saveTemplate(name, htmlContent, cssContent);
    res.status(201).json(savedTemplate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTemplateByName = async (req, res) => {
  const { name } = req.params;

  try {
    const template = await templateService.getTemplateByName(name);
    if (template) {
      res.status(200).json(template);
    } else {
      res.status(404).json({ message: 'Template not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTemplateByName = async (req, res) => {
  const { name } = req.params;
  const { htmlContent, cssContent } = req.body;

  try {
    const updatedTemplate = await templateService.updateTemplateByName(name, htmlContent, cssContent);
    res.status(200).json(updatedTemplate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTemplateByName = async (req, res) => {
  const { name } = req.params;

  try {
    const deletedTemplate = await templateService.deleteTemplateByName(name);
    res.status(200).json(deletedTemplate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  saveTemplate,
  getTemplateByName,
  updateTemplateByName,
  deleteTemplateByName,
};
