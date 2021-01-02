require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const pg = require('pg');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();
app.use(staticMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.get('/api/trip', (req, res, next) => {
  const sql = `
    select *
      from "trip"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/trip/:tripId', (req, res, next) => {
  const tripId = parseInt(req.params.tripId, 10);
  if (!tripId) {
    throw new ClientError(400, 'tripId must be a positive integer');
  }
  const sql = `
    select "tripId",
           "name",
           "destination",
           "departureDate",
           "returnDate",
           "numberOfDays"
      from "trip"
     where "tripId" = $1
  `;
  const params = [tripId];
  db.query(sql, params)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.post('/api/trip', (req, res, next) => {
  const { tripName, tripDestination, departureDate, returnDate, numberOfDays } = req.body;
  if (!tripName || !tripDestination || !departureDate || !returnDate || !numberOfDays) {
    throw new ClientError(400, 'One of the following fields are missing: name, destination, departureDate, returnDate, numberOfDays');
  }
  const userId = 1; // for testing purposes
  const sql = `
    insert into "trip" ("userId", "name", "destination", "departureDate", "returnDate", "numberOfDays")
    values ($1, $2, $3, $4, $5, $6)
    returning *
  `;
  const params = [userId, tripName, tripDestination, departureDate, returnDate, numberOfDays];
  db.query(sql, params)
    .then(result => {
      const [tripDetail] = result.rows;
      res.status(201).json(tripDetail);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
