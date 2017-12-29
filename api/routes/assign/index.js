const assign = require('express').Router();
const db = require(__root + 'database');

assign.post('/', (req, res, next) => {
  //Check if all required data is present
  if(!(req.body.asset && req.body.assignee)){
    res.status(422).json({error: 'Missing required data'});
    return next();
  }

  //Check if expectedReturn is a number
  if(req.body.expectedReturn){
    if(isNaN(req.body.expectedReturn)){
      res.status(400).json({error: 'Incorrect data type. expectedReturn expects a number'});
      return next();
    }
  }

  //Calculate epoch time
  const time = Math.floor(new Date() / 1000);

  //Check if asset tag exists
  db.result('SELECT id FROM inventory WHERE asset = $1', req.body.asset)

  .then(result => {
    if(!result.rowCount){
      res.status(404).json({error: 'Asset tag not found'});
      return next();
    }

    //Insert into database
    db.result('INSERT INTO assignments (asset, assignee, date_assigned, expected_return) VALUES ($1, $2, $3, $4)', [req.body.asset, req.body.assignee, time, req.body.expectedReturn])

    .then(result => {
      //Check if insert was successful
      if(!result.rowCount){
        res.status(500).json({error: 'Database query failed'});
        return next();
      }

      res.json({success: true});
    });
  })

  .catch(err => {
    res.status(500).json({error: 'Server Error'});
    return next();
  });
});

module.exports = assign;
