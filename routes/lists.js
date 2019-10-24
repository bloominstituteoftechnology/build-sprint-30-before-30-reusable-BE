const router = require('express').Router();
const sessionAuth = require('../middleware/auth/session');
const database = require('../database');

router.post('/', [sessionAuth], (req, res) => {
  const { name, description, deadline, is_private } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'You must provide a name and description.' });
  };

  database('lists')
    .returning('id')
    .insert({ name, description, deadline, is_private, user_id: req.session.user.id })
    .then(data => {
      const [id] = data;

      database('lists')
        .join('users', 'users.id', 'lists.user_id')
        .select('lists.*', 'users.username as created_by')
        .where('lists.id', id)
        .first()
        .then(list => res.status(201).send(list))
        .catch(error => res.status(500).send(error));
    })
    .catch(error => res.status(500).send(error));
});

router.get('/', [sessionAuth], (req, res) => {
  database('lists')
    .join('users', 'users.id', 'lists.user_id')
    .select('lists.*', 'users.username as created_by')
    .then(lists => res.send(lists))
    .catch(error => res.status(500).send(error));
});

router.get('/:id', [sessionAuth], (req, res) => {
  database('lists')
    .join('users', 'users.id', 'lists.user_id')
    .select('lists.*', 'users.username as created_by')
    .where('lists.id', req.params.id)
    .first()
    .then(list => {
      if (!list) {
        return res.status(404).json({ message: 'The specified list could not be found.' });
      };

      database('list_comments')
        .join('users', 'users.id', 'list_comments.user_id')
        .select('list_comments.id',
          'users.id as user_id',
          'list_comments.content',
          'users.username as created_by',
          'list_comments.created_at',
          'list_comments.updated_at')
        .where({ list_id: list.id })
        .then(comments => {
          list.comments = comments;

          database('list_items')
            .where({ list_id: list.id })
            .then(items => {
              list.items = items;
              res.send(list);
            })
            .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));
    })
    .catch(error => res.status(500).send(error));
});

router.put('/:id', [sessionAuth], (req, res) => {
  database('lists')
    .update({ name, description, deadline, is_private } = req.body, 'id')
    .where({ id: req.params.id })
    .then(data => {
      const [id] = data;

      if (!id) {
        return res.status(404).json({ message: 'The specified list could not be found.' });
      };

      database('lists')
        .join('users', 'users.id', 'lists.user_id')
        .select('lists.*', 'users.username as created_by')
        .where('lists.id', id)
        .first()
        .then(list => res.status(201).send(list))
        .catch(error => res.status(500).send(error));
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

router.post('/:id/comments', [sessionAuth], (req, res) => {
  if (!req.body.content) {
    return res.status(400).json({ message: 'You must specify the content for the comment.' });
  };

  database('lists')
    .where({ id: req.params.id })
    .first()
    .then(list => {
      if (!list) {
        return res.status(404).json({ message: 'The specified list could not be found.' });
      };

      database('list_comments')
        .returning('*')
        .insert({ list_id: list.id, user_id: req.session.user.id, content: req.body.content })
        .then(comment => {
          res.status(201).send(comment);
        })
        .catch(error => res.status(500).send(error));
    })
    .catch(error => res.status(500).send(error));
});

router.delete('/comments/:commentId', [sessionAuth], (req, res) => {
  database('list_comments')
    .where({ id: req.params.commentId })
    .del()
    .then(rows => {
      if (!rows) {
        return res.status(404).json({ message: 'The specified comment could not be found.' });
      };

      res.sendStatus(204);
    })
    .catch(error => res.status(500).send(error));
});

router.post('/:id/items', [sessionAuth], (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({ message: 'You must provide a name and description.' });
  };

  database('lists')
    .where('lists.id', req.params.id)
    .first()
    .then(list => {
      if (!list) {
        return res.status(404).json({ message: 'The specified list could not be found.' });
      };

      database('list_items')
        .returning('*')
        .insert({ list_id: list.id, name: req.body.name, description: req.body.description })
        .then(item => res.status(201).send(item[0]))
        .catch(error => res.status(500).send(error));
    })
    .catch(error => res.status(500).send(error));
});

router.delete('/items/:itemId', [sessionAuth], (req, res) => {
  database('list_items')
    .where({ id: req.params.itemId })
    .del()
    .then(rows => {
      if (!rows) {
        return res.status(404).json({ message: 'The specified item could not be found.' });
      };

      res.sendStatus(204);
    })
    .catch(error => res.status(500).send(error));
});

router.put('/items/:itemId', [sessionAuth], (req, res) => {
  database('list_items')
    .update({ name, description, deadline, completed } = req.body, '*')
    .where({ id: req.params.itemId })
    .then(data => {
      if (!data) {
        return res.status(404).json({ message: 'The specified item could not be found.' });
      };

      res.send(data);
    })
    .catch(error => res.status(500).send(error));
});

module.exports = router;