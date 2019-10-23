exports.seed = knex => {
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert({
        username: 'test',
        password: '$2a$08$wqer8poS7eXLwEupJzZyi.DSLWZ.mrHmxGz0woH/K1fQGohrPmkia',
      });
    });
};
