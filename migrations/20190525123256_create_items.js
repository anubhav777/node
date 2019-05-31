exports.up = async function(knex, Promise) {
  await knex.schema.hasTable("items");

  return await knex.schema.createTable("items", table => {
    table.uuid("id").primary(),
      table.string("name"),
      table.float("price"),
      table.string("imageName"),
      table.string("desc");
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable("items");
};
