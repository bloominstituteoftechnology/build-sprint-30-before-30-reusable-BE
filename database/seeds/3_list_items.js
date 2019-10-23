exports.seed = knex => {
  return knex('list_items').del()
    .then(() => {
      // Inserts seed entries
      return knex('list_items').insert({
        name: 'Item name',
        description: 'Item description',
        list_id: 1,
      });
    });
};
