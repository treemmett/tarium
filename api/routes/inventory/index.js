const inventory = require('express').Router();
const db = require(__root + 'database');

inventory.get('/', (req, res, next) => {
  //Fetch information from database
  db.any('SELECT asset, model, serial, os, status, location FROM inventory')

  .then(result => {
    res.json(result);
    return next();
  })

  .catch(err => {
    res.status(500).json({error: 'Server Error'});
    return next();
  });
});

inventory.post('/', (req, res, next) => {
  //Check if all required data is present
  if(!(req.body.asset && req.body.model && req.body.serial)){
    res.status(422).json({error: 'Missing required data'});
    return next();
  }

  //Set optional fields
  const os = req.body.os || null;
  const location = req.body.location || 'storage';
  const status = req.body.status || 'working';

  //Insert into database
  db.result('INSERT INTO inventory (asset, model, serial, os, status, location) VALUES ($1, $2, $3, $4, $5, $6)',
  [req.body.asset, req.body.model, req.body.serial, os, status, location])

  .then(result => {
    //Check if insert was successful
    if(!result.rowCount){
      res.status(500).json({error: 'Database query failed'});
      return next();
    }

    res.json({success: true});
  })

  .catch(err => {
    res.status(500).json({error: 'Server Error'});
    return next();
  });
});

module.exports = inventory;
