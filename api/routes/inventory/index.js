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

inventory.get('/:asset', (req, res, next) => {
  //Database query
  db.result('SELECT asset, model, serial, os, status, location FROM inventory WHERE asset = $1', req.params.asset)

  .then(result => {
    //Check if asset tag was found
    if(!result.rowCount){
      res.status(404).json({error: 'Asset tag not found'});
      return next();
    }

    res.json(result.rows[0]);
  })

  .catch(err => {
    res.status(500).json({error: 'Server Error'});
    return next();
  });
});

inventory.put('/:asset', (req, res, next) => {
  //Gather all usable parameters
  const data = {
    location: req.body.location,
    model: req.body.model,
    os: req.body.os,
    serial: req.body.serial,
    status: req.body.status,
  }

  var statement = '';
  const values = {
    currentAsset: req.params.asset
  };

  //Prepare SQL statement based on what values we received
  for(let i in data){
    //Check if value is null
    if(!data[i]){
      continue;
    }

    //Add comma if we already have a statement
    if(statement){
      statement += ', ';
    }

    //Append to statement
    statement += i + ' = ${'+i+'}';
    values[i] = data[i];
  }

  //Check if any values are being updated
  if(!statement){
    res.status(422).json({error: 'At least one parameter required to update'});
    return next();
  }

  //Database query
  db.result('UPDATE inventory SET ' + statement + 'WHERE asset = ${currentAsset}; SELECT asset, model, serial, os, status, location FROM inventory WHERE asset = ${currentAsset}', values)

  .then(result => {
    //Check if any rows were updated
    if(!result.rowCount){
      res.status(404).json({error: 'Asset tag not found'});
      return next();
    }

    //Send updated values
    res.json(result.rows[0]);
    return next();
  })

  .catch(err => {
    res.status(500).json({error: 'Server Error'});
    return next();
  });
});

module.exports = inventory;
