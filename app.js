'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const fastifyJWT = require('fastify-jwt');
const rbacPlugin = require('fastify-rbac');
const permissionRuleServie = require('./services/routeService');

module.exports = async function (fastify, opts) {  
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

  let basicRules = await permissionRuleServie.permissionRules(``);
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
  fastify.register(require('fastify-swagger'), {
    swagger: {
      info: {
        title: 'AUTH API',
        description: 'Auth API documentation API',
        version: '0.1.0'
      },
      tags: [
        { name: 'Company', description: 'Company related end-points' },
        { name: 'User', description: 'User related end-points' },,
        { name: 'Role', description: 'Role related end-points' },
        { name: 'Menu', description: 'Menu related end-points' },
        { name: 'Route', description: 'Route related end-points' }
      ],  
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      },
      security: [
        {
          "apiKey": []
        }
      ]
    },  
    exposeRoute: true,
    routePrefix: '/documentations'
  });
  
  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
  
}
