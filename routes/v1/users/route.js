const controller = require('../../../controller/userController');
const schema = require('../../../schemas/user.schema');

module.exports = async function (fastify, opts) {
    fastify.get('/', {schema: schema.find, preValidation : [fastify.authenticate]}, controller.find);
    fastify.get('/:_id', {schema: schema.findOne, preValidation : [fastify.authenticate]}, controller.findOne)
    fastify.put('/:_id', {schema: schema.update, preValidation : [fastify.authenticate]}, controller.update);
    fastify.delete('/:_id', {schema: schema.findOne,preValidation : [fastify.authenticate]}, controller.destroy);
    fastify.put('/restore/:_id', {schema: schema.findOne,preValidation : [fastify.authenticate]}, controller.restore)
    fastify.get('/count', {schema: schema.find, preValidation : [fastify.authenticate]}, controller.count);
    fastify.get('/deleted', {schema: schema.find, preValidation : [fastify.authenticate]}, controller.findDeleted);
    fastify.get('/count-deleted', {schema: schema.find, preValidation : [fastify.authenticate]}, controller.countDeleted);

}
