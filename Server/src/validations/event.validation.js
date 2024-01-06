const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createEvent = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
    location: Joi.string().required(),
  }),
};

const getEvents = {
  query: Joi.object().keys({
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getEvent = {
  params: Joi.object().keys({
    eventId: Joi.string().custom(objectId),
  }),
};

const updateEvent = {
  params: Joi.object().keys({
    eventId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')),
    location: Joi.string(),
  }),
};

const deleteEvent = {
  params: Joi.object().keys({
    eventId: Joi.string().custom(objectId),
  }),
};

// const participateEvent = {
//   params: Joi.object().keys({
//     eventId: Joi.string().custom(objectId),
//   }),
//   body: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//     // Any other fields relevant to participation
//   }),
// };

// const cancelParticipation = {
//   params: Joi.object().keys({
//     eventId: Joi.string().custom(objectId),
//   }),
//   body: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//     // Any other fields relevant to participation cancellation
//   }),
// };

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  // participateEvent,
  // cancelParticipation,
};
