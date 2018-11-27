
exports.seed = function(knex, Promise) {
  var tableName = 'users';
    var rows = [

        // You are free to add as many rows as you feel like in this array. Make sure that they're an object containing the following fields:
        {
            name: 'Abdul Malik',
            role: '0',
            password: 'password',
            email: 'alik@gmail.com',
        },

    ];

    return knex( tableName )
        // Empty the table (DELETE)
        .del()
        .then( function() {
            return knex.insert( rows ).into( tableName );
        });
};
