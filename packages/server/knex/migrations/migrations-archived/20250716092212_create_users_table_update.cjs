exports.up = function (knex) {
  return knex.schema.alterTable('users', function (table) {
    table.string('phone'); // Add new column
    table.string('name').notNullable().alter(); // Modify existing column
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('users', function (table) {
    table.dropColumn('phone');
    table.string('name').nullable().alter(); // Revert change
  });
};
