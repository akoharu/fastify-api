const bodyJsonSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    username: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    role: {
      type: 'string',
      'x-ref': 'Role',
      description: 'Refers to Role',
      pattern: '^[0-9a-fA-F]{24}$'
    },
    status: {
      type: 'string',
      enum: [ 'active', 'inactive', 'blocked' ],
      default: 'active'
    },
    tokenReset: { type: 'string' },
    timezone: { type: 'string' },
    language: { type: 'string' },
  },
  required: [
    'firstName', 'lastName',
    'username',  'email',
    'password',  'role',
    'timezone',  'language'
  ]
}
const filter = {
    limit: { type: 'string' },
    skip: { type: 'string' }
}
const queryStringJsonSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    username: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    role: {
      type: 'string',
      'x-ref': 'Role',
      description: 'Refers to Role',
      pattern: '^[0-9a-fA-F]{24}$'
    },
    status: {
      type: 'string',
      enum: [ 'active', 'inactive', 'blocked' ],
      default: 'active'
    },
    tokenReset: { type: 'string' },
    timezone: { type: 'string' },
    language: { type: 'string' },
    ...filter
  }
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