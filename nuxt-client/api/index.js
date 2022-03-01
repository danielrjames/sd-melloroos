const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/test', function (req, res) {
  res.send(req.body);
});

export default {
  handler: app,
  path: '/api',
};
