import Knex from './knex';
import jwt from 'jsonwebtoken';

// The idea here is simple: export an array which can be then iterated over and each route can be attached. 
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
        path: '/test',
        handler: (request, reply) => {
            // In general, the Knex operation is like Knex('TABLE_NAME').where(...).chainable(...).then(...)
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
        handler: (request, reply) => {
            // This is a ES6 standard
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
                // Honestly, this is VERY insecure. Use some salted-hashing algorithm and then compare it.
                if (user.password === password) {
                    const token = jwt.sign({
                        // You can have anything you want here. ANYTHING. As we'll see in a bit, this decoded token is passed onto a request handler.
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
    // {
    //     path: '/speed',
    //     method: 'POST',
    //     config: {
    //         auth: {
    //             strategy: 'jwt',
    //         }
    //     },
    //     handler: (request, reply) => {
    //         const {
    //             id_user
    //         } = request.payload;
    //     }
    // }
]
export default routes;