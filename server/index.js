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

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }

  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username"
      `;
      const params = [username, hashedPassword];
      db.query(sql, params)
        .then(result => {
          const [newUser] = result.rows;
          res.status(201).json(newUser);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

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
           "numberOfDays",
            (select count("todo"."completed") as "itemsCompleted"
            from "todo"
            where "tripId" = $1
            and "completed" = 'true')
      from "trip"
     where "tripId" = $1
  `;
  const params = [tripId];
  db.query(sql, params)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/triptodo/:tripId', (req, res, next) => {
  const tripId = parseInt(req.params.tripId, 10);
  if (!tripId) {
    throw new ClientError(400, 'tripId must be a positive integer');
  }
  const sql = `
    select "todoId",
           "item",
           "completed"
      from "todo"
     where "tripId" = $1
  order by "todoId"
  `;
  const params = [tripId];
  db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/travelers/:tripId', (req, res, next) => {
  const tripId = parseInt(req.params.tripId, 10);
  if (!tripId) {
    throw new ClientError(400, 'tripId must be a positive integer');
  }
  const sql = `
    select "travelerId",
           "name",
           "going",
           "notes"
      from "travelers"
     where "tripId" = $1
  order by "travelerId"
  `;
  const params = [tripId];
  db.query(sql, params)
    .then(result => res.json(result.rows))
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

app.post('/api/triptodo/:tripId', (req, res, next) => {
  const tripId = parseInt(req.params.tripId, 10);
  const { item, completed } = req.body;
  if (!tripId) {
    throw new ClientError(400, 'tripId must be a positive integer');
  } else if (!item || typeof completed !== 'boolean') {
    throw new ClientError(400, 'One of the following fields are missing: item, completed');
  }
  const sql = `
    insert into "todo" ("item", "completed", "tripId")
    values ($1, $2, $3)
    returning *
  `;
  const params = [item, completed, tripId];
  db.query(sql, params)
    .then(result => {
      const [tripTodo] = result.rows;
      res.status(201).json(tripTodo);
    })
    .catch(err => next(err));
});

app.post('/api/travelers/:tripId', (req, res, next) => {
  const tripId = parseInt(req.params.tripId, 10);
  const { name, going, notes } = req.body;
  if (!tripId) {
    throw new ClientError(400, 'tripId must be a positive integer');
  } else if (!name || !going) {
    throw new ClientError(400, 'One of the following fields are missing: name, going ');
  }
  const sql = `
    insert into "travelers" ("name", "going", "notes", "tripId")
    values ($1, $2, $3, $4)
    returning *
  `;
  const params = [name, going, notes, tripId];
  db.query(sql, params)
    .then(result => {
      const [traveler] = result.rows;
      res.status(201).json(traveler);
    })
    .catch(err => next(err));
});

app.patch('/api/triptodo/:todoId', (req, res, next) => {
  const todoId = parseInt(req.params.todoId, 10);
  const { completed } = req.body;
  if (!Number.isInteger(todoId) || todoId < 1) {
    throw new ClientError(400, 'todoId must be a positive integer');
  } else if (typeof completed !== 'boolean') {
    throw new ClientError(400, 'completed (boolean) is a required field');
  }
  const sql = `
    update "todo"
       set "completed" = $1
     where "todoId" = $2
     returning *
  `;
  const params = [completed, todoId];
  db.query(sql, params)
    .then(result => {
      const [todo] = result.rows;
      res.status(200).json(todo);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
