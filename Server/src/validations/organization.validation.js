const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrganization = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    address: Joi.object().keys({
      street: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
      postalCode: Joi.string(),
    }),
    // Add more schema validations for other fields as needed
  }),
};

const getOrganizations = {
  query: Joi.object().keys({
    // Define validation for query parameters if necessary
    // For example:
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOrganization = {
  params: Joi.object().keys({
    orgId: Joi.string().custom(objectId),
  }),
};

const updateOrganization = {
  params: Joi.object().keys({
    orgId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      address: Joi.object().keys({
        street: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        country: Joi.string(),
        postalCode: Joi.string(),
      }),
      // Add more schema validations for other fields as needed
    })
    .min(1), // At least one field to update
};

const deleteOrganization = {
  params: Joi.object().keys({
    orgId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrganization,
  getOrganizations,
  getOrganization,
  updateOrganization,
  deleteOrganization,
};
