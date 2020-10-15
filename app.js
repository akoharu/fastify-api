'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const fastifyJWT = require('fastify-jwt');
const rbacPlugin = require('fastify-rbac');
const permissionRuleServie = require('./services/routeService');

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(fastifyJWT, {
    secret: process.env.JWT_SECRET
  });
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  let basicRules = await permissionRuleServie.permissionRules(`?server=${process.env.SERVER}`);
  // const basicRules = {
  //   user: {
  //     can: [
  //       {name: '/v1/', operation: 'GET'},
  //       {name: '/v1/user', operation: 'GET'},
  //     ],
  //   },
  //   admin: {
  //     can: [
  //       {name: '*', operation: 'POST'},
  //       {name: '*', operation: 'GET'},
  //       {name: '*', operation: 'PUT'},
  //       {name: '*', operation: 'DELETE'},
  //     ],
  //   },
  //   superAdmin: {
  //     can: ['*'],
  //   },
  // };

  // It exposes rbac to fastify instance fastify.rbac which you may use to check/add/remove roles and permissions.
  fastify.register(rbacPlugin, {roles: basicRules});

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
  
}
