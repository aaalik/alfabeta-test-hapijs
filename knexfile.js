module.exports = {

    development: {

        migrations: {
            tableName: 'knex_migrations'
        },
        seeds: {
            tableName: './seeds'
        },

        client: 'mysql',
        connection: {

            host: 'localhost',

            user: 'root',
            password: '',

            database: 'alfabeta-test',
            charset: 'utf8',

        }

    }

};