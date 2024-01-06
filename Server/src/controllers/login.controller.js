const httpStatus = require('http-status');
const { organizationService } = require('../services');
const { tokenService } = require('../services');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if organization exists with the provided email
    const organization = await organizationService.getOrganizationByEmail(email);
    if (!organization) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
    }

    // Check if the provided password matches the organization's password
    const isPasswordMatch = await organizationService.isPasswordMatch(organization, password);
    if (!isPasswordMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
    }

    // Generate authentication tokens for the organization
    const tokens = await tokenService.generateAuthTokens(organization);

    // Send the tokens in the response
    res.send({
      organizationData: {
        _id: organization._id,
        email: organization.email,
        name: organization.name,
        // Add any other necessary organization details here
      },
      tokens,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
