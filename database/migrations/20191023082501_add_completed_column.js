exports.up = knex => {
  return knex.schema.table('list_items', table => {
    table.boolean('completed').notNullable().defaultTo(0);
  });
};

exports.down = knex => {
  return knex.schema.dropColumn('completed');
};