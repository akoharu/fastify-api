const fp = require("fastify-plugin");
const Boom = require('boom');
const model = require('../models').models.User;

module.exports = fp(async function (fastify, opts, done) {
    fastify.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify();            
            let {url, method} = request;
            // cek RBAC
            const token = request.headers.authorization.split('Bearer ')[1];
            const decodedToken = fastify.jwt.decode(token);
            let user = await model.findOne({_id: decodedToken.id}).populate({ path: 'role', select: 'type _id'});
            request.state = {
                user: user
            }
            let checkRBAC = await fastify.rbac.can(user.role.type, url.split('?')[0], method);
            if (!checkRBAC) {
                reply.code(403);
                throw Boom.forbidden(`You can't do this`);
            }
        } catch (err) {
            throw Boom.boomify(err, {statusCode: 403});
        }
    });
});