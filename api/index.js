const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(true);
});

app.listen(8080, _ => console.log('Server listening on port 8080'));
