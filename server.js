const express = require('express');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const authRouter = require('./routes/auth');
const sessionStore = new KnexSessionStore({ knex: require('./database') });
const server = express();
const apiRouter = express.Router();

server.use(cors({ credentials: true, origin: true }));
server.use(
  session({
    secret: 'lambda',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 604800,
      httpOnly: false,
    },
  })
);

server.use(express.json());

apiRouter.use('/auth', authRouter);

server.use('/api', apiRouter);

module.exports = server;