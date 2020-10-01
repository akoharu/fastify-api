const company = require('../../controller/companyController');
module.exports = async function (fastify, opts) {
  fastify.get('/company', {preValidation : [fastify.authenticate]}, company.getCompany)
}
