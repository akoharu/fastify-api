const bodyJsonSchema = {
  type: 'object',
  properties: {
    server: { type: 'string' },
    name: { type: 'string' },
    endpoint: { type: 'string' },
    method: { type: 'string' },
    role: {
      type: 'string',
      'x-ref': 'Role',
      description: 'Refers to Role',
      pattern: '^[0-9a-fA-F]{24}$'
    },
  },
  required: [ 'server', 'name', 'endpoint', 'method' ]
}
const filter = {
    limit: { type: 'string' },
    skip: { type: 'string' }
}
const queryStringJsonSchema = {
    type: 'object',
    properties: {
      server: { type: 'string' },
      name: { type: 'string' },
      endpoint: { type: 'string' },
      method: { type: 'string' },
      role: {
        type: 'string',
        'x-ref': 'Role',
        description: 'Refers to Role',
        pattern: '^[0-9a-fA-F]{24}$'
      },
      ...filter
    },
  }
const paramsJsonSchema = {
  type: 'object',
  properties: {
    _id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' }
  },
  required: [ '_id']
}
// const headersJsonSchema
const find = {
    querystring: queryStringJsonSchema,

    // headers: headersJsonSchema
}
const findOne = {
    params: paramsJsonSchema,

    // headers: headersJsonSchema
}
const create = {
    body: bodyJsonSchema,

    // headers: headersJsonSchema
}

const update = {
    body: bodyJsonSchema,

    params: paramsJsonSchema,

    // headers: headersJsonSchema
}

const destroy = {

    params: paramsJsonSchema,

    // headers: headersJsonSchema
}

module.exports = {
    find, findOne, create, update, destroy
}