const fp = require("fastify-plugin");
const Boom = require('boom');

module.exports = fp(async function (fastify, opts, done) {
    fastify.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify();
        } catch (err) {
            throw Boom.boomify(err);
        }
    });
});