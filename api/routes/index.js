const routes = require('express').Router();

//Setup routes
routes.use('/inventory', require('./inventory'));

//404 handling
routes.all('*', (req, res, next) => {
  res.status(404).json({error: 'API endpoint not found'});
  return next();
});

module.exports = routes;
