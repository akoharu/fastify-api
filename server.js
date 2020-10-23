'use strict'

// Read the .env file.
require('dotenv').config()

// Require the framework
const Fastify = require('fastify')

let logger = {
  prettyPrint: true,
}
if (process.env.NODE_ENV == 'production') {
  logger = false
}
// Instantiate Fastify with some config
const app = Fastify({
  logger: logger,
  pluginTimeout: 10000
})

// Register your application as a normal plugin.
app.register(require('fastify-cors'), { origin: '*' });
app.register(require('./app.js'))

// Start listening.
app.listen(process.env.PORT || 1337, '0.0.0.0', (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
