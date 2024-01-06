const httpStatus = require('http-status');
const { Organization } = require('../models');
const ApiError = require('../utils/ApiError');

const bcrypt = require('bcryptjs');
/**
 * Create an organization
 * @param {Object} organizationBody
 * @returns {Promise<Organization>}
 */
const createOrganization = async (organizationBody) => {
  // Hash the password before storing it
  const { password } = organizationBody;
  const hashedPassword = await bcrypt.hash(password, 8); // You can adjust the salt rounds (8 here) as needed

  const organizationData = {
    ...organizationBody,
    password: hashedPassword, // Replace the plain text password with the hashed one
  };
  return Organization.create(organizationData);
};

/**
 * Query for organizations
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrganizations = async (filter, options) => {
  const organizations = await Organization.paginate(filter, options);
  return organizations;
};

/**
 * Get organization by id
 * @param {ObjectId} id
 * @returns {Promise<Organization>}
 */
const getOrganizationById = async (id) => {
  return Organization.findById(id);
};
const getOrganizationByEmail = async (email) => {
  return Organization.findOne({ email });
};

// Function to check if the provided password matches the organization's password
const isPasswordMatch = async (organization, password) => {
  return bcrypt.compare(password, organization.password);
};
/**
 * Update organization by id
 * @param {ObjectId} orgId
 * @param {Object} updateBody
 * @returns {Promise<Organization>}
 */
const updateOrganizationById = async (orgId, updateBody) => {
  const organization = await getOrganizationById(orgId);
  if (!organization) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  Object.assign(organization, updateBody);
  await organization.save();
  return organization;
};

/**
 * Delete organization by id
 * @param {ObjectId} orgId
 * @returns {Promise<Organization>}
 */
const deleteOrganizationById = async (orgId) => {
  const organization = await getOrganizationById(orgId);
  if (!organization) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  await organization.remove();
  return organization;
};

module.exports = {
  createOrganization,
  queryOrganizations,
  getOrganizationById,
  updateOrganizationById,
  deleteOrganizationById,
  getOrganizationByEmail,
  isPasswordMatch,
};
