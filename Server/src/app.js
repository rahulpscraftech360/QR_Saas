const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const bcrypt = require('bcryptjs');

const bullSetup = require('./bull/bullSetup');
// const { emailWorker, sendSSEUpdate } = require('./bull/bullSetup');
const { emailWorker } = require('./bull/bullSetup');
const app = express();
const { eventEmitter } = require('./bull/bullSetup');
const corsOptions = {
  origin: 'http://localhost:3000',
};

// app.get('/events', (req, res) => {
//   res.writeHead(200, {
//     'Content-Type': 'text/event-stream',
//     'Cache-Control': 'no-cache',
//     Connection: 'keep-alive',
//   });

// sending server side event in ever second

// setInterval(() => {
//   const data = { message: `hello world (${new Date().toISOString()})` };
//   console.log(Date.now() + ' Events endpoint hit!');
//   res.write(`data:${JSON.stringify(data)}\n\n`);
// }, 1000);

// const sseEventHandler = (data) => {
//   res.write(`data: ${JSON.stringify(data)}\n\n`);
// };

// const sseUpdateListener = (data) => {
//   sseEventHandler(data);
// };

// eventEmitter.on('sseUpdate', sseUpdateListener);

// req.on('close', () => {
//   eventEmitter.off('sseUpdate', sseUpdateListener);
// });
// });

app.get('/events', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  const sendSSEUpdate = (data) => {
    res.write(`data:${JSON.stringify(data)}\n\n`);
    // console.log(`data:${JSON.stringify(data)}\n\n`);
  };

  const sseUpdateHandler = (data) => {
    sendSSEUpdate(data);
  };

  eventEmitter.on('sseUpdate', sseUpdateHandler);

  req.on('close', () => {
    eventEmitter.off('sseUpdate', sseUpdateHandler);
  });
});
if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}
app.use(express.json());

// v1 api routes
app.use('/v1', routes);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

//EventEmitter
// const eventEmitter = new EventEmitter();

module.exports = app;
