const {addUserSchema , getUserSchema , updatesUserSchema } = require('./controllers/schemas/user');
const { addUserHandler ,getUserHandler , updateUserHandler , deleteUserHandler , loginUserHandler } = require('./controllers/handlers/user');
const verifyToken = require('./controllers/auth/auth')
// require('dotenv').config()

// The options (sometimes written as opts) parameter is for options on the routes
// The done parameter is a function we would call at the end of the postRoutes function, to indicate we are done. Just like making a middleware in Express and calling next to move on.

const getUserOpts = {
    schema : getUserSchema,
    handler : getUserHandler
};

const addUserOpts = {
    schema : addUserSchema,
    handler : addUserHandler
};

const updateUserOpts = {
    schema : updatesUserSchema,
    handler : updateUserHandler
}

const deleteUserOpts = {
    handler : deleteUserHandler
}

const loginUserOpts = {
    handler : loginUserHandler
}

async function privateUserRoutes(fastify) {
    fastify.put('/users/update',{
        preHandler: fastify.auth([verifyToken]),
        ...updateUserOpts
    });
}

async function userRoutes(fastify, opts) {
    fastify.get('/users/read', getUserOpts);
    fastify.post('/users/create', addUserOpts);
    // fastify.put('/users/update', updateUserOpts);
    fastify.delete('/users/delete', deleteUserOpts);
    fastify.post('/users/login', loginUserOpts);

    fastify
        .register(require('@fastify/auth'))
        .after(() => privateUserRoutes(fastify));
}



module.exports = userRoutes