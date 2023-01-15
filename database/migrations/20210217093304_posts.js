exports.up = function (knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.integer('userId').unsigned().notNullable();
    table.string('category').notNullable();
    table.string('image');
    table.integer('upvotes').defaultTo(0);
    table.integer('downvotes').defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.foreign('userId').references('id').inTable('users').onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('posts');
};
