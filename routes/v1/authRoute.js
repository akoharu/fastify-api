const auth = require('../../controller/authController');
const response = require('../../config/response')
module.exports = async function (fastify, opts) {
  fastify.post('/register', auth.postSignup);
  fastify.post('/login', auth.postLogin);

  fastify.get('/', {preValidation : [fastify.authenticate]}, (req, res) => {
    return response.ok({
      status: 'Authenticated'
    }, 'Authenticated user', res)
  })
}
