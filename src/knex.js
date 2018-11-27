export default require('knex')({

    client: 'mysql',
    connection: {

        host: 'localhost',

        user: 'root',
        password: '',

        database: 'alfabeta-test',
        charset: 'utf8',

    }

});