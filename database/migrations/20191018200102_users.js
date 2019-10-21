exports.up = knex => {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('username', 255).unique().notNullable();
    table.string('password', 255).notNullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('users');
};