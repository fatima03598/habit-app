
exports.up = function (knex, Promise) {
    return knex.schema.createTable("weather", (table) => {
      table.increments("weather_id").primary();
      table.string("city", 256);
      table
      .integer("userId")
      .unsigned()
      .references("user_id")
      .inTable("userTable")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("weather");
  };
  