exports.up = async function (knex) {
  // Step 1: Create user_types_tbl
  await knex.schema.createTable("user_types_tbl", function (table) {
    table.string("type").primary(); // or table.increments('id').primary() if using integers
    table.string("label");
  });

  // Optional: Insert default user types
  await knex("user_types_tbl").insert([
    { type: "applicant", label: "Applicant" },
    { type: "admin", label: "Administrator" },
    { type: "reviewer", label: "Reviewer" },
  ]);

  // Step 2: Alter users table
  return knex.schema.alterTable("users", function (table) {
    table
      .string("userType")
      .defaultTo("applicant");

    table
      .foreign("userType")
      .references("type")
      .inTable("user_types_tbl")
      .onDelete("SET NULL")
      .onUpdate("CASCADE");

    table.string("email").notNullable().alter();
    table.string("phone").nullable();
    table.string("password").notNullable().alter();
  });
};

exports.down = async function (knex) {
  // Step 1: Drop foreign key and userType column from users
  await knex.schema.alterTable("users", function (table) {
    table.dropForeign("userType");
    table.dropColumn("userType");
    table.dropColumn("phone");
    table.string("email").nullable().alter();
    table.string("password").nullable().alter();
  });

  // Step 2: Drop user_types_tbl
  await knex.schema.dropTable("user_types_tbl");
};
