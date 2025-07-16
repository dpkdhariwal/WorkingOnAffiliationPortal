exports.up = function(knex) {
  return knex.schema.alterTable("user_types_tbl", function (table) {
    table
      .enum("status", ["active", "inactive", "pending"])
      .defaultTo("active");
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("user_types_tbl", function (table) {
    table.dropColumn("status");
  });
};
