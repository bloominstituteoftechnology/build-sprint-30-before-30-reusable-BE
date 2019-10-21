const router = require('express').Router();
const sessionAuth = require('../middleware/auth/session');
const database = require('../database');

router.post('/', [sessionAuth], (req, res) => {
  const { name, description, deadline } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'You must provide a name and description.' });
  };

  database('lists')
    .returning('id')
    .insert({ name, description, deadline, user_id: req.session.user.id })
    .then(data => {
      const [id] = data;
      res.status(201).json({ id });
    })
    .catch(error => res.status(500).send(error));
});

router.get('/', [sessionAuth], (req, res) => {
  database('lists')
    .join('users', 'users.id', 'lists.user_id')
    .select('lists.*', 'users.username as createdBy')
    .then(lists => res.send(lists))
    .catch(error => res.status(500).send(error));
});

router.get('/:id', [sessionAuth], (req, res) => {
  database('lists')
    .join('users', 'users.id', 'lists.user_id')
    .select('lists.*', 'users.username as createdBy')
    .where('lists.id', req.params.id)
    .first()
    .then(list => {
      if (!list) {
        return res.status(404).json({ message: 'The specified list could not be found.' });
      };

      res.send(list);
    })
    .catch(error => res.status(500).send(error));
});

router.delete('/:id', [sessionAuth], (req, res) => {
  database('lists')
    .where({ id: req.params.id })
    .del()
    .then(rows => {
      if (!rows) {
        return res.status(404).json({ message: 'The specified list could not be found.' });
      };

      res.sendStatus(204);
    })
    .catch(error => res.status(500).send(error));
});

module.exports = router;