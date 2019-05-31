exports.up = async function(knex, Promise) {
  await knex.schema.hasTable("users");

  return await knex.schema.createTable("users", table => {
    table.uuid("id").primary(),
      table.string("firstName"),
      table.string("lastName"),
      table.string("username"),
      table.string("password");
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable("users");
};
