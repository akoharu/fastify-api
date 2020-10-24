const controller = require('../../../controller/routeController');
const schema = require('../../../schemas/route.schema');

module.exports = async function (fastify, opts) {
    fastify.post('/', {schema: schema.create, preValidation : [fastify.authenticate], preSerialization : [fastify.addPermission]}, controller.create);
    fastify.get('/', {schema: schema.find, preValidation : [fastify.authenticate]}, controller.find);
    fastify.get('/:_id', {schema: schema.findOne, preValidation : [fastify.authenticate]}, controller.findOne);
    fastify.put('/:_id', {schema: schema.update, preValidation : [fastify.authenticate]}, controller.update);
    fastify.delete('/:_id', {schema: schema.findOne, preValidation : [fastify.authenticate], preSerialization : [fastify.deletePermission]}, controller.destroy);
    fastify.put('/restore/:_id', {schema: schema.findOne, preValidation : [fastify.authenticate], preSerialization : [fastify.addPermission]}, controller.restore)
    fastify.get('/count', {schema: schema.find, preValidation : [fastify.authenticate]}, controller.count);
    fastify.get('/deleted', {schema: schema.find, preValidation : [fastify.authenticate]}, controller.findDeleted);
    fastify.get('/count-deleted', {schema: schema.find, preValidation : [fastify.authenticate]}, controller.countDeleted);
    fastify.get('/permissions', {schema: schema.find, preValidation : [fastify.authenticate]}, controller.permissionRules);
    fastify.post('/check-permissions', {schema: schema.checkPermissions, preValidation : [fastify.authenticate]}, controller.checkPermissions);
}
