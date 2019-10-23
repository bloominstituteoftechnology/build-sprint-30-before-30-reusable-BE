exports.up = knex => {
  return knex.schema.createTable('list_comments', table => {
    table.increments();
    table.timestamps(false, true);
    table.integer('list_id').notNullable();
    table.integer('user_id').notNullable();
    table.text('content').notNullable();

    table.foreign('list_id').references('id').inTable('lists').onDelete('CASCADE');
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('list_comments');
};