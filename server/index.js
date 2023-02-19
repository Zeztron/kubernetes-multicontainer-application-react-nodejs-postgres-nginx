const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const keys = require('./keys');

// Express Application setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client setup
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on('connect', (client) => {
  client
    .query('CREATE TABLE IF NOT EXISTS values (number INT')
    .catch((err) => console.error(err));
});

// Express routes definitions
app.get('/', (req, res) => {
  res.send('Hi');
});

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * FROM values');
  res.send(values);
});

app.post('/values', async (req, res) => {
  if (!req.body.value) res.send({ working: false });

  pgClient.query('INSERT INTO values(number) VALUIES($1)', [req.body.value]);

  res.send({ working: true });
});

app.listen(5000, (err) => {
  console.log('Server Listening...');
});
