const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Set app settings
app.use(express.json());
app.use(bodyParser.json({
  limit: '10gb'
}));
app.use(bodyParser.text());
app.disable('etag');
global.__root = __dirname + '/';

//Set response headers
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store');
  res.set('Connection', 'close');
  res.removeHeader('Date');
  res.removeHeader('X-Powered-By');
  return next();
});

app.use('/api', require('./routes'));

app.listen(8080, _ => console.log('Server listening on port 8080'));
