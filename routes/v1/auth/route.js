const auth = require('../../../controller/authController');
const response = require('../../../config/response');
const authSchema = require('../../../schemas/login.schema');
const registerSchema = require('../../../schemas/register.schema');

module.exports = async function (fastify, opts) {
  fastify.post('/register',{schema: registerSchema.schema}, auth.signup);
  fastify.post('/login', {schema: authSchema.schema}, auth.login);

  fastify.get('/', {preValidation : [fastify.authenticate]}, (req, res) => {
    return response.singleData({
      status: 'Authenticated'
    }, 'Authenticated user', res)
  })
}
