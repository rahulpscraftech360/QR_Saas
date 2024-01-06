const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, organization, info) => {
  console.log(organization);
  if (err || info || !organization) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate organization'));
  }
  req.organization = organization;

  if (requiredRights.length) {
    const organizationRights = roleRights.get(organization.role); // Assuming you have roles defined for organizations
    const hasRequiredRights = requiredRights.every((requiredRight) => organizationRights.includes(requiredRight));
    if (!hasRequiredRights) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
