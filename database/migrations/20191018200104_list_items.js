exports.up = knex => {
  return knex.schema.createTable('list_items', table => {
    table.increments();
    table.integer('list_id').notNullable();
    table.string('name', 255).notNullable();
    table.text('description');
    table.boolean('completed').notNullable().defaultTo(0);
    table.date('deadline');

    table.foreign('list_id').references('id').inTable('lists').onDelete('CASCADE');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('list_items');
};