const inventory = require('express').Router();

inventory.get('/', (req, res, next) => {
  res.send('Inventory');
})

module.exports = inventory;
