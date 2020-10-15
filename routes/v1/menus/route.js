const controller = require('../../../controller/menuController');
module.exports = async function (fastify, opts) {
    fastify.post('/', {preValidation : [fastify.authenticate]}, controller.create);
    fastify.get('/', {preValidation : [fastify.authenticate]}, controller.find);
    fastify.get('/:_id', {preValidation : [fastify.authenticate]}, controller.findOne);
    fastify.put('/:_id', {preValidation : [fastify.authenticate]}, controller.update);
    fastify.delete('/:_id', {preValidation : [fastify.authenticate]}, controller.destroy);
    fastify.put('/restore/:_id', {preValidation : [fastify.authenticate]}, controller.restore)
    fastify.get('/count', {preValidation : [fastify.authenticate]}, controller.count);
    fastify.get('/deleted', {preValidation : [fastify.authenticate]}, controller.findDeleted);
    fastify.get('/count-deleted', {preValidation : [fastify.authenticate]}, controller.countDeleted);
}
