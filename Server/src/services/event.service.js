const httpStatus = require('http-status');
const { Event } = require('../models');
const ApiError = require('../utils/ApiError');

const createEvent = async (eventBody) => {
  return Event.create(eventBody);
};

const getEventById = async (eventId) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  return event;
};

const getAllEvents = async () => {
  return Event.find();
};

const getAllEventsByOrganization = async (organizationId) => {
  console.log(organizationId);
  const events = await Event.find({ organization: organizationId });
  console.log(events);
  return events;
};
const updateEventById = async (eventId, userId) => {
  console.log('>>>><<<<<<<<<', eventId);
  try {
    const event = await Event.findByIdAndUpdate(eventId, { $pull: { participants: userId } }, { new: true });
    if (!event) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
    }
    return event;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
};
const updateEventTemplate = async (eventId, cssSettings) => {
  try {
    const event = await Event.findByIdAndUpdate(
      eventId,
      { $set: { cssSettings: cssSettings } }, // Only update cssSettings field
      { new: true, runValidators: true }
    );

    if (!event) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
    }

    return event;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
};
const deleteEventById = async (eventId) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  //console.log('delete>>>>');
  await event.remove();
  return event;
};

const removeParticipant = async (eventId, userId) => {
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
    }

    const participantIndex = event.participants.indexOf(userId);

    if (participantIndex !== -1) {
      // Remove the userId from the participants array
      event.participants.splice(participantIndex, 1);
      await event.save();
      return event;
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, 'Participant not found in event');
    }

    return event;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
};

const getEventsForToday = async (organizationId) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    const todaysEvents = await Event.find({
      date: {
        $gte: today, // Events greater than or equal to today
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Events less than tomorrow
      },
      organizer: organizationId,
    }).exec();

    return todaysEvents;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error fetching today's events");
  }
};

const getEventsExpired = async (organizationId) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    const expiredEvents = await Event.find({
      date: {
        $lt: today, // Events greater than or equal to today
      },
      organizer: organizationId,
    }).exec();

    return expiredEvents;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error fetching today's events");
  }
};

module.exports = {
  getEventsForToday,
  createEvent,
  getEventById,
  getAllEvents,
  updateEventById,
  deleteEventById,
  getAllEventsByOrganization,
  removeParticipant,
  updateEventTemplate,
  getEventsExpired,
};
