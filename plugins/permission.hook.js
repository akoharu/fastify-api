const fp = require("fastify-plugin");
const _ = require('lodash');
const model = require('../models').models;

module.exports = fp(async function (fastify, opts, done) {
    fastify.decorate("addPermission", async (request, reply, payload, done) => {
        console.log(payload.data);
        const role = await model['Role'].findOne({_id: payload.data.role});
        let checkrbac = await fastify.rbac.can(role.type, payload.data.endpoint, payload.data.method);
        if (!checkrbac) {
            await fastify.rbac.add(role.type, payload.data.endpoint, payload.data.method);
        }
    });
    fastify.decorate("deletePermission", async (request, reply, payload, done) => {
        const role = await model['Role'].findOne({_id: payload.data.role});
        let checkrbac = await fastify.rbac.can(role.type, payload.data.endpoint, payload.data.method);
        if (checkrbac) {
            await fastify.rbac.remove(role.type, payload.data.endpoint, payload.data.method);
        }
    });
});