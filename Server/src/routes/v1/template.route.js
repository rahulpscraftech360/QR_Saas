// templateRoutes.js

const express = require('express');

const router = express.Router();
const templateController = require('../../controllers/template.controller');

router.post('/templates', templateController.saveTemplate);
router.get('/templates/:name', templateController.getTemplateByName);

module.exports = router;
