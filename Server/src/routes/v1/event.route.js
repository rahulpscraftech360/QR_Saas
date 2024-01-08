const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const eventValidation = require('../../validations/event.validation');
const eventController = require('../../controllers/event.controller');

const router = express.Router();

router
  .route('/')
  .post(
    // auth('createEvent'), validate(eventValidation.createEvent),
    eventController.createEvent
  )
  .get(
    // auth('getEvents'), validate(eventValidation.getEvents),
    eventController.getEvents
  );

router
  .route('/today')

  // auth('createEvent'), validate(eventValidation.createEvent),
  // eventController.createEvent

  .get(
    // auth('getEvents'), validate(eventValidation.getEvents),
    eventController.getTodaysEvent
  );

router
  .route('/expired')

  // auth('createEvent'), validate(eventValidation.createEvent),
  // eventController.createEvent

  .get(
    // auth('getEvents'), validate(eventValidation.getEvents),
    eventController.getExpiredEvent
  );
router
  .route('/byorganization')

  // auth('createEvent'), validate(eventValidation.createEvent),
  // eventController.createEvent

  .get(
    // auth('getEvents'), validate(eventValidation.getEvents),
    eventController.getEventsByOrganization
  );

router
  .route('/:eventId')
  .get(
    // auth('getEvent'), validate(eventValidation.getEvent),
    eventController.getEventById
  )
  .patch(
    // auth('updateEvent'), validate(eventValidation.updateEvent),
    eventController.updateEvent
  )
  .delete(
    // auth('deleteEvent'),
    // validate(eventValidation.deleteEvent),

    eventController.deleteEvent
  );

router.route('/:eventId/allParticipent').get(
  // auth('getEvent'), validate(eventValidation.getEvent),
  eventController.getUsers
);

router.route('/:eventId/saveTemplate').post(
  // auth('getEvent'), validate(eventValidation.getEvent),
  eventController.saveScannerTemplate
);

router.route('/:eventId/removeParticipant').patch(eventController.removeParticipant);

router
  .route('/:eventId/participate')
  .post(auth('participateEvent'), validate(eventValidation.participateEvent), eventController.participateEvent)
  .delete(
    // auth('cancelParticipation'), validate(eventValidation.cancelParticipation),
    eventController.cancelParticipation
  );

router.route('/:eventId/:organizationId/participants').post(
  // validate(eventValidation.participateEvent),
  eventController.addParticipants
);

//??mark user attended  the event

router.route('/:eventId/:organizationId/attendEvent').patch(
  // validate(eventValidation.participateEvent),
  eventController.addAttendees
);

module.exports = router;
