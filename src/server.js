import Hapi from 'hapi';
import routes from './routes';

// bring your own validation function
const validate = async (decoded, request) =>{
    // do your checks to see if the person is valid
    // console.log(decoded);
    if (!decoded.email) {
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
    
    await server.register(require('inert'));
    await server.register(require('hapi-auth-jwt2'));
    server.auth.strategy('token', 'jwt', {
        key: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',
        validate,
        verifyOptions: {
            algorithms: ['HS256'],
        }
    });
    server.auth.default('token');

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