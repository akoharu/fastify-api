const controller = require('../../../controller/companyController');
module.exports = async function (fastify, opts) {
  fastify.post('/', controller.create)
  fastify.get('/', controller.find);
  fastify.get('/:_id', controller.findOne)
  fastify.put('/:_id', controller.update)
  fastify.delete('/:_id', controller.destroy);
  fastify.put('/restore/:_id', controller.restore)
  fastify.get('/count', {preValidation : [fastify.authenticate]}, controller.count);
  fastify.get('/deleted', {preValidation : [fastify.authenticate]}, controller.findDeleted);
  fastify.get('/count-deleted', {preValidation : [fastify.authenticate]}, controller.countDeleted);
}
