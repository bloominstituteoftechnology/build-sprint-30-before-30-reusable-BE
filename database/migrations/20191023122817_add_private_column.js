exports.up = knex => {
  return knex.schema.table('lists', table => {
    table.boolean('private').notNullable().defaultTo(1);
  });
};

exports.down = knex => {
  return knex.schema.dropColumn('private');
};