const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { organizationService } = require('../services'); // Make sure to import the organization service
const { Organization } = require('../models');

const test = (req, res) => {
  res.status(200).send('Route test successful');
};
const createOrganization = catchAsync(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: 'Email is required' });
  }

  // Check if the email is already registered for an organization
  const existingOrganization = await Organization.findOne({ email });

  if (existingOrganization) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: 'Email is already registered for an organization' });
  }

  // If the email is not registered, proceed with creating the organization
  const organization = await organizationService.createOrganization(req.body);
  res.status(httpStatus.CREATED).send(organization);
});

const getOrganizations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'description']); // Adjust filter fields based on the organization schema
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await organizationService.queryOrganizations(filter, options);
  res.send(result);
});

const getOrganization = catchAsync(async (req, res) => {
  const organization = await organizationService.getOrganizationById(req.params.orgId);
  if (!organization) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  res.send(organization);
});

const updateOrganization = catchAsync(async (req, res) => {
  const organization = await organizationService.updateOrganizationById(req.params.orgId, req.body);
  res.send(organization);
});

const deleteOrganization = catchAsync(async (req, res) => {
  await organizationService.deleteOrganizationById(req.params.orgId);
  console.log('deleting');
  res.status(httpStatus.NO_CONTENT).send();
});

const createPass = catchAsync(async (req, res) => {
  console.log('creating Pass QR code');
  const event = req.body;
  console.log(req.body);

  //Qr_code generation

  res.status(httpStatus.CREATED).send(event);
});

module.exports = {
  createOrganization,
  getOrganizations,
  getOrganization,
  updateOrganization,
  deleteOrganization,
  test,
  createPass,
};
