
exports.seed = function(knex, Promise) {
  var tableName = 'speed';
    var rows = [
        {
            id_user: '01011996',
            speed: '223'
        },
        {
          id_user: '22221996',
          speed: '212'
        },
    ];

    return knex( tableName )
        .del()
        .then( function() {
            return knex.insert( rows ).into( tableName );
        });

};
