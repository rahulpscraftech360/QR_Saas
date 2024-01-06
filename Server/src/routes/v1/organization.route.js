const express = require('express');
const auth = require('../../middlewares/auth');
const organizationAuth = require('../../middlewares/organizationAuth');
const validate = require('../../middlewares/validate');
const organizationValidation = require('../../validations/organization.validation');
const organizationController = require('../../controllers/organization.controller');
const loginController = require('../../controllers/login.controller');
const passport = require('passport');
const router = express.Router();
// function clicked() {
//   console.log('boom');
// }
router
  .route('/')
  .post(
    // auth('getOrganizations'),
    validate(organizationValidation.getOrganizations),
    organizationController.createOrganization
  )
  .get(organizationController.getOrganizations);

router
  .route('/:orgId')
  .get(organizationController.getOrganization)
  .patch(
    // auth('manageOrganizations'),
    validate(organizationValidation.updateOrganization),
    organizationController.updateOrganization
  )
  .delete(
    // auth('manageOrganizations'),
    validate(organizationValidation.deleteOrganization),
    organizationController.deleteOrganization
  );

//router.route('/adddata').post(organizationController.createEvents);

router.route('/:login').post(loginController.login);
// ?? full code  for ('/' route)
// router
//   .route('/')
//   .post(
//     auth('manageOrganizations'),
//     validate(organizationValidation.createOrganization),
//     organizationController.createOrganization
//   )
//   .get(auth('getOrganizations'), validate(organizationValidation.getOrganizations), organizationController.getOrganizations);

// router
//   .route('/:orgId')
//   .get(auth('getOrganizations'), validate(organizationValidation.getOrganization), organizationController.getOrganization)
//   .patch(
//     auth('manageOrganizations'),
//     validate(organizationValidation.updateOrganization),
//     organizationController.updateOrganization
//   )
//   .delete(
//     auth('manageOrganizations'),
//     validate(organizationValidation.deleteOrganization),
//     organizationController.deleteOrganization
//   );

module.exports = router;
