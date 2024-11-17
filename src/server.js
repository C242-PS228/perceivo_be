import express from 'express';
import route from './routes.js';
import bodyParser from 'body-parser';
// require('dotenv').config();

const app = express();

app.listen(3000,  '0.0.0.0', () => {
  console.log('Server running at http://0.0.0.0:3000');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.contentType('application/json');
  next();
});

app.use(bodyParser.json());

// development route
app.use('/dev', route);