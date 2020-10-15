const fp = require("fastify-plugin");
const _ = require('lodash');


module.exports = fp(async function (fastify, opts, done) {
    fastify.decorate("roleHook", async (request, reply, payload) => {
        request.body.type = _.camelCase(request.body.name);
        console.log(request.body);
      });
});