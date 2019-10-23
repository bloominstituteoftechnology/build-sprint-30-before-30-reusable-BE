exports.seed = knex => {
  return knex('lists').del()
    .then(() => {
      // Inserts seed entries
      return knex('lists').insert({
        name: 'List name',
        description: 'List description',
        user_id: 1,
      });
    });
};
