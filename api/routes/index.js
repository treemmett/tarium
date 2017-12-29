const routes = require('express').Router();

//Setup routes
routes.use('/inventory', require('./inventory'));
routes.use('/assign', require('./assign'));

//404 handling
routes.all('*', (req, res, next) => {
  //Check if response has already been sent
  if(res.headersSent){
    return next();
  }

  res.status(404).json({error: 'API endpoint not found'});
  return next();
});

module.exports = routes;
