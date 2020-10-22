const auth = require('../../../controller/authController');
const response = require('../../../config/response');
const authSchema = require('../../../schemas/login.schema');
const userSchema = require('../../../schemas/user.schema');

module.exports = async function (fastify, opts) {
  fastify.post('/register',{schema: userSchema.create}, auth.signup);
  fastify.post('/login', {schema: authSchema.schema}, auth.login);
  fastify.get('/me', {schema: {tags: ['User']}, preValidation : [fastify.authenticate]}, auth.me)
}
