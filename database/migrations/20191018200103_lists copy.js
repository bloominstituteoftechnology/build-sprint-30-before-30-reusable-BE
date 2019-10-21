exports.up = knex => {
  return knex.schema.createTable('lists', table => {
    table.increments();
    table.integer('user_id').notNullable();
    table.string('name', 255).notNullable();
    table.text('description');
    table.date('deadline');

    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('lists');
};