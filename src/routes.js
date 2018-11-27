import Knex from './knex';
import jwt from 'jsonwebtoken';

const routes = [
    {
        method: 'GET',
        path: '/hello',
        handler: function (request, h) {
            return 'hello world';
        }
    },
    {
        method: 'GET',
        path: '/users',
        handler: (request, reply) => {
            const getOperation = Knex('users').select().then((results) => {
                if (!results || results.length === 0) {
                    return {
                        error: true,
                        errMessage: 'no public user found',
                    };
                }
                return {
                    dataCount: results.length,
                    data: results,
                };
            }).catch((err) => {
                return err;
            });
            return getOperation;
        }
    },
    {
        path: '/auth',
        method: 'POST',
        config: {
            auth: false
        },
        handler: (request, reply) => {
            const {
                email,
                password
            } = request.payload;
            const getOperation = Knex('users').where({
                email
            }).select('password').then(([user]) => {
                if (!user) {
                    return {
                        error: true,
                        errMessage: 'the specified user was not found',
                    };
                }
                if (user.password === password) {
                    const token = jwt.sign({
                        email
                    }, 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy', {
                        algorithm: 'HS256',
                        expiresIn: '1h',
                    });
                    return {
                        token
                    };
                } else {
                    return 'incorrect password';
                }
            }).catch((err) => {
                return err;
            });
            return getOperation;
        }
    },
    {
        path: '/createuser',
        method: 'POST',
        handler: (request, reply) => {
            const {name,email,password} = request.payload;
            const token = jwt.sign({
                email
            }, 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy', {
                algorithm: 'HS256',
                expiresIn: '1h',
            });
            const row = {
                name,
                email,
                password,
                role: 1,
                created_at: new Date(),
                token
            };
            const insertOperation = Knex('users').insert(row).then((results) => {
                return{
                    message: 'successfully created user'
                };
            }).catch((err) => {
                console.log(err);
                return err;
            });
            return insertOperation;
        }
    },
    {
        path: '/createadmin',
        method: 'POST',
        handler: (request, reply) => {
            const {
                name,
                email,
                password,
            } = request.payload;
            const token = jwt.sign({
                email
            }, 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy', {
                algorithm: 'HS256',
                expiresIn: '1h',
            });
            const row = {
                name,
                email,
                password,
                role: 0,
                created_at: new Date(),
                token
            };
            const insertOperation = Knex('users').insert(row).then((results) => {
                return {
                    message: 'successfully created admin'
                };
            }).catch((err) => {
                console.log(err);
                return err;
            });
            return insertOperation;
        }
    },
    {
        method: 'GET',
        path: '/user/{id}',
        handler: (request, h) => {
            const getOperation = Knex('users').where({id:request.params.id}).select().then((results) => {
                return {
                    data: results,
                };
            }).catch((err) => {
                return err;
            });
            return getOperation;
        }
    },
    {
        method: 'GET',
        path: '/deleteuser/{id}',
        handler: (request, h) => {
            const getOperation = Knex('users').where({
                id: request.params.id
            }).del().then((results) => {
                return {
                    results,
                };
            }).catch((err) => {
                return err;
            });
            return getOperation;
        }
    },
    {
        method: 'POST',
        path: '/updateuser/{id}',
        handler: (request, h) => {
            const {name,email,password} = request.payload;
            const row = {
                name,
                email,
                password
            };
            const getOperation = Knex('users').where({
                id: request.params.id
            }).update(row).then((results) => {
                return {
                    results
                };
            }).catch((err) => {
                return err;
            });
            return getOperation;
        }
    },
    {
        method: 'POST',
        path: '/insertspeed',
        handler: (request, h) => {
            const {id_user,speed} = request.payload;
            const row = {
                id_user, 
                speed
            };
            const getOperation = Knex('speed').where({
                id: request.params.id
            }).insert(row).then((results) => {
                return {
                    message: 'successfully insert speed'
                };
            }).catch((err) => {
                return err;
            });
            return getOperation;
        } 
    },
    {
        method: 'GET',
        path: '/getspeed',
        handler: (request, h) => {
            const getOperation = Knex('speed').select().then((results) => {
                return {
                    results
                };
            }).catch((err) => {
                return err;
            });
            return getOperation;
        }
    },
    {
        method: 'POST',
        path: '/updatespeed/{id}',
        handler: (request, h) => {
            const {id_user,speed} = request.payload;
            const row = {id_user,speed};
            const getOperation = Knex('speed').where({
                id: request.params.id
            }).update(row).then((results) => {
                return {
                    results
                };
            }).catch((err) => {
                return err;
            });
            return getOperation;
        }
    },
    {
        method: 'GET',
        path: '/deletespeed/{id}',
        handler: (request, h) => {
            const getOperation = Knex('speed').where({
                id: request.params.id
            }).del().then((results) => {
                return {
                    results,
                };
            }).catch((err) => {
                return err;
            });
            return getOperation;
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            const getOperation = Knex('users').where({
                id: request.params.id
            }).del().then((results) => {
                return {
                    results,
                };
            }).catch((err) => {
                return err;
            });
            return getOperation;
        }
    },
    {
        method: 'GET',
        path: '/logout',
        handler: (request, h) => {
            const getOperation = Knex('users').where({
                id: request.params.id
            }).del().then((results) => {
                return {
                    results,
                };
            }).catch((err) => {
                return err;
            });
            return getOperation;
        }
    }
]
export default routes;