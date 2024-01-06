/* eslint-disable no-console */
const httpStatus = require('http-status');
const { Event } = require('../models/event.model');
const ApiError = require('../utils/ApiError');
const { eventService, userService } = require('../services');
const { generateQRCode } = require('../services/qrCode.service');
const { createLogger } = require('winston');

const createEvent = async (req, res) => {
  try {
    console.log('>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<');
    const event = await eventService.createEvent(req.body);
    res.status(httpStatus.CREATED).send(event);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

const getEvents = async (req, res) => {
  const events = await eventService.getAllEvents();
  res.status(httpStatus.OK).send(events);
};

const getEventById = async (req, res) => {
  const { eventId } = req.params;
  const event = await eventService.getEventById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  res.status(httpStatus.OK).send(event);
};

const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const event = await eventService.updateEventById(eventId, req.body, { new: true });
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  res.status(httpStatus.OK).send(event);
};
const getUsers = async (req, res) => {
  const { eventId } = req.params;
  const event = await eventService.getEventById(eventId);
  const participants = event.participants;
  console.log(event);
  try {
    const users = await Promise.all(
      participants.map(async (participantId) => {
        // Fetch each user by their ID
        const user = await userService.getUserById(participantId);
        return user;
      })
    );

    res.status(200).json(users); // Send all users' data to the frontend
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
  // const users = await userService.getUsersByEmails(event.participants);
};
const deleteEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    console.log(eventId, '>>>');
    const event = await eventService.deleteEventById(eventId);

    if (!event) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
    }
    res.status(httpStatus.OK).send();
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

const getEventsByOrganization = async (req, res) => {
  console.log('here');
  try {
    const { organizationId } = req.query; // Assuming organizationId is passed as a query parameter
    const events = await eventService.getAllEventsByOrganization(organizationId);
    res.status(httpStatus.OK).send(events);
  } catch (error) {
    // Handle error within the controller
    // You can also pass the error to a global error handler
    // For example:
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const participateEvent = async (req, res) => {
  const { eventId } = req.params;
  const { participants } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
    }

    // Add participants to the event
    event.participants.push(...participants);
    await event.save();

    res.status(httpStatus.CREATED).send(event);
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

// const participateEvent = async (req, res) => {
//   const { eventId } = req.params;
//   const { participants } = req.body;

//   try {
//     const event = await Event.findById(eventId);
//     if (!event) {
//       throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
//     }

//     // Add participants to the event
//     event.participants.push(...participants);
//     await event.save();

//     res.status(httpStatus.CREATED).send(event);
//   } catch (error) {
//     res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
//   }
// };

const cancelParticipation = async (req, res) => {
  const { eventId, participantId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
    }

    // Remove the participant from the event
    event.participants.pull(participantId);
    await event.save();

    res.status(httpStatus.OK).send(event);
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

// const addParticipants = async (req, res) => {
//   const { eventId } = req.params;
//   const { participants } = req.body;

//   try {
//     const event = await Event.findById(eventId);
//     if (!event) {
//       throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
//     }

//     // Assuming participants is an array of participant objects
//     participants.forEach((participant) => {
//       event.participants.push(participant);
//     });

//     await event.save();

//     res.status(httpStatus.CREATED).send(event);
//   } catch (error) {
//     res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
//   }
// };
// const createPass = catchAsync(async (req, res) => {
//   console.log('creating Pass QR code');
//   const event = req.body;
//   console.log(req.body);

//   //Qr_code generation

//   res.status(httpStatus.CREATED).send(event);
// });
const addParticipants = async (req, res) => {
  const eventId = req.params.eventId;
  const organizationId = req.params.organizationId;
  console.log(req.body);
  const participantsData = req.body;
  console.log('>>>', participantsData);
  try {
    const event = await eventService.getEventById(eventId);
    console.log(event);
    if (!event || !event.organization || event.organization.toString() !== organizationId) {
      throw new Error('Invalid event or organization ID');
    }

    const existingUserIds = new Set(event.participants.map((participant) => participant.toString()));
    console.log(existingUserIds);
    const createdParticipants = await Promise.all(
      participantsData.map(async (participant) => {
        const existingUser = await userService.getUserByEmail(participant.email);

        if (existingUser) {
          if (!existingUserIds.has(existingUser._id.toString())) {
            return existingUser._id;
          }
        } else {
          const createdUser = await userService.createUser(participant);
          return createdUser._id;
        }
      })
    );

    const uniqueParticipants = createdParticipants.filter(Boolean); // Remove undefined values

    event.participants.push(...uniqueParticipants);
    await event.save();

    res.status(httpStatus.CREATED).send(event);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ error: error.message });
  }

  // try {
  //   const event = await Event.findById(eventId);
  //   if (!event) {
  //     throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  //   }

  //   // Assuming participants is an array of participant objects
  //   participants.forEach((participant) => {
  //     event.participants.push(participant);
  //   });

  //   await event.save();

  //   res.status(httpStatus.CREATED).send(event);
  // } catch (error) {
  //   res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  // }
};

const removeParticipant = async (req, res) => {
  console.log('controller>>');
  const { eventId } = req.params;
  const { userId } = req.body;

  console.log(eventId, userId);
  try {
    const updatedEvent = await eventService.removeParticipant(eventId, userId);
    console.log('>>>>KKKK>>', updatedEvent);

    res.status(httpStatus.OK).json(updatedEvent);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

const getTodaysEvent = async (req, res) => {
  console.log('hereeeee');
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day
    console.log(today);
    // Query the database to find events for today's date
    const result = await eventService.getEventsForToday();

    console.log(result);
    res.status(httpStatus.OK).send(result);
  } catch (error) {
    console.error("Error fetching today's events:", error); // Log the error for debugging
    throw new Error("Error fetching today's events"); // Throw an error to propagate it to the caller
  }
};
const addAttendees = async (req, res) => {
  const eventId = req.params.eventId;
  const organizationId = req.params.organizationId;
  const userId = req.body.userId;

  try {
    const event = await eventService.getEventById(eventId);

    if (!event || !event.organization || event.organization.toString() !== organizationId) {
      throw new Error('Invalid event or organization ID');
    }

    const participantsSet = new Set(event.participants.map((participant) => participant.toString()));

    if (!participantsSet.has(userId)) {
      throw new Error('User ID is not a participant');
    }

    const presentSet = new Set(event.present.map((attendee) => attendee.toString()));
    if (!presentSet.has(userId)) {
      event.present.push(userId);
      await event.save();
      res.status(httpStatus.CREATED).send(event);
    } else {
      res.status(httpStatus.OK).send({ message: 'User is already marked as present' });
    }
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ error: error.message });
  }
};
const saveScannerTemplate = async (req, res) => {
  const { eventId } = req.params;
  const event = await eventService.updateEventTemplate(eventId, req.body, { new: true });
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  res.status(httpStatus.OK).send(event);
};

module.exports = {
  addAttendees,
  getTodaysEvent,
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  participateEvent,
  cancelParticipation,
  addParticipants,
  getEventsByOrganization,
  getUsers,
  removeParticipant,
  saveScannerTemplate,
};
