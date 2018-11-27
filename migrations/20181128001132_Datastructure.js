
exports.up = function(knex, Promise) {
  return knex
      .schema
      .createTable('users', function (usersTable) {

          // Primary Key
          usersTable.increments();

          // Data
          usersTable.string('name', 50).notNullable();
          usersTable.integer('role', 1).notNullable();
          usersTable.string('email', 250).notNullable();
          usersTable.string('password', 128).notNullable();
          usersTable.string('token', 128).notNullable();
          usersTable.timestamp('created_at').notNullable();

      })

      .createTable('speed', function (speedTable) {

          // Primary Key
          speedTable.increments();

          // Data
          // Each chainable method creates a column of the given type with the chained constraints. For example, in the line below, we create a column named `name` which has a maximum length of 250 characters, is of type string (VARCHAR) and is not nullable. 
          speedTable.string('id_user', 50).notNullable();
          speedTable.integer('speed', 3).notNullable();

      });
};

exports.down = function(knex, Promise) {
  return knex
      .schema
      .dropTableIfExists('birds')
      .dropTableIfExists('users');
};
