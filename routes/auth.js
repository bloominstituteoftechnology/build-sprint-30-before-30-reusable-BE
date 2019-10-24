const router = require('express').Router();
const basicAuth = require('../middleware/auth/basic');
const sessionAuth = require('../middleware/auth/session');
const bcrypt = require('bcryptjs');
const database = require('../database');

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'You must provide a username and password.' });
  };

  bcrypt.hash(password, 8).then(hash => {
    database('users')
      .insert({ username: username, password: hash })
      .then(() => {
        return database('users').select('id', 'username').where({ username: username }).first();
      })
      .then(data => res.status(201).send(data))
      .catch(error => {
        if (error.code === '23505') {
          return res.status(409).json({ message: 'That username is already taken.' });
        };

        res.status(500).send(error);
      });
  });
});

router.post('/login', [basicAuth], (req, res) => {
  database('users')
    .where({ username: req.auth.username })
    .first()
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      };

      bcrypt.compare(req.auth.password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(401).json({ message: 'The password you have provided is incorrect.' });
          };

          req.session.user = { id } = user;
          res.sendStatus(200);
        })
        .catch(error => res.status(500).send(error));
    });
});

router.get('/logout', [sessionAuth], (req, res) => {
  req.session.destroy(error => {
    if (error) {
      return res.status(500).send(error);
    };

    res.sendStatus(200);
  });
});

module.exports = router;