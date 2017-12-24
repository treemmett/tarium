const inventory = require('express').Router();
const db = require(__root + 'database');

inventory.get('/', (req, res, next) => {
  //Fetch information from database
  db.any('SELECT asset, model, serial, os, status, location FROM inventory')
  .then(result => {
    res.json(result);
    return next();

  }).catch(err => {
    res.status(500).json({error: 'Server Error'});
    return next();

  });
});

module.exports = inventory;
