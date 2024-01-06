const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const eventRoute = require('./event.route');

const emailRoute = require('./email.route');

const templateRoute = require('./template.route');
const organizationRoute = require('./organization.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/organizations',
    route: organizationRoute,
  },

  {
    path: '/events',
    route: eventRoute,
  },
  {
    path: '/template',
    route: templateRoute,
  },
  {
    path: '/email',
    route: emailRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
