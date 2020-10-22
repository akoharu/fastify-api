const controller = require('../../../controller/routeController');
module.exports = async function (fastify, opts) {
    fastify.post('/', {preValidation : [fastify.authenticate], preSerialization : [fastify.addPermission]}, controller.create);
    fastify.get('/', {preValidation : [fastify.authenticate]}, controller.find);
    fastify.get('/:_id', {preValidation : [fastify.authenticate]}, controller.findOne);
    fastify.put('/:_id', {preValidation : [fastify.authenticate]}, controller.update);
    fastify.delete('/:_id', {preValidation : [fastify.authenticate], preSerialization : [fastify.deletePermission]}, controller.destroy);
    fastify.put('/restore/:_id', {preValidation : [fastify.authenticate], preSerialization : [fastify.addPermission]}, controller.restore)
    fastify.get('/count', {preValidation : [fastify.authenticate]}, controller.count);
    fastify.get('/deleted', {preValidation : [fastify.authenticate]}, controller.findDeleted);
    fastify.get('/count-deleted', {preValidation : [fastify.authenticate]}, controller.countDeleted);
    fastify.get('/permissions', {preValidation : [fastify.authenticate]}, controller.permissionRules);
}
