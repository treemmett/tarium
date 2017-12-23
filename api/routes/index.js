const routes = require('express').Router();

//Setup routes
routes.use('/inventory', require('./inventory'));

module.exports = routes;
