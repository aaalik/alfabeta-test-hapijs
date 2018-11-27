import Hapi from 'hapi';
import routes from './routes';

const people = { // our "users database"
    1: {
        id: 1,
        name: "Abdul Malik",
        role: 0,
        email: "alik@gmail.com",
        password: "password",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaWtAZ21haWwuY29tIiwiaWF0IjoxNTQzMzQ4MjYwLCJleHAiOjE1NDMzNTE4NjB9.6LE4B3PBd3rPvBXKQUPysjKF8u4pqi5Ec9bUSfYBWHI",
        created_at: "2018-11-27T17:37:16.000Z"
    }
};

// bring your own validation function
const validate = async (decoded, request) =>{
    // do your checks to see if the person is valid
    if (!people[decoded.id]) {
        return {
            isValid: false
        };
    } else {
        return {
            isValid: true
        };
    }
};

const init = async() => {
    const server = new Hapi.Server({
        port: 8000
    });

    // await server.register(require('hapi-auth-jwt2'));
    // server.auth.strategy('token', 'jwt', {
    //     key: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',
    //     validate,
    //     verifyOptions: {
    //         algorithms: ['HS256'],
    //     }
    // });
    // server.auth.default('token');

    routes.forEach((route) => {
        console.log(`attaching ${route.path}`);
        server.route(route);
    });
    await server.start();
    return server;
};

init().then((server) => console.log(`Server listening on ${server.info.uri}`))
.catch((err) => {
    console.error(err);
    process.exit(1);
});



// Start the server
// async function start() {
//     try {
//         await server.start();
//     } catch (err) {
//         console.log(err);
//         process.exit(1);
//     }
//     console.log('Server running at:', server.info.uri);
// };

// start();