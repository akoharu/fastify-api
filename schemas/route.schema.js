const tags = ['Route'];
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
    tags: tags,
    querystring: queryStringJsonSchema,

    // headers: headersJsonSchema
}
const findOne = {
    tags: tags,
    params: paramsJsonSchema,

    // headers: headersJsonSchema
}
const create = {
    tags: tags,
    body: bodyJsonSchema,

    // headers: headersJsonSchema
}

const update = {
    tags: tags,
    body: bodyJsonSchema,

    params: paramsJsonSchema,

    // headers: headersJsonSchema
}

const destroy = {
    tags: tags,

    params: paramsJsonSchema,

    // headers: headersJsonSchema
}
const checkPermissions = {
  tags: tags,
  body: {
    type: 'object',
    properties: {
      endpoint: { type: 'string' },
      method: { type: 'string' },
    },
    required: [ 'endpoint', 'method' ]
  },

  // headers: headersJsonSchema
}
module.exports = {
    find, findOne, create, update, destroy, checkPermissions
}