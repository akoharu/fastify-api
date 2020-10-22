const bodyJsonSchema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      url: { type: 'string' },
      icon: { type: 'string' },
      isExternal: { type: 'boolean' },
      parent: {
        type: [ 'string'],
        'x-ref': 'Menu',
        default: null,
        description: 'Refers to Menu',
        pattern: '^[0-9a-fA-F]{24}$'
      },
      order: { type: 'number' },
      role: {
        type: 'string',
        'x-ref': 'Role',
        description: 'Refers to Role',
        pattern: '^[0-9a-fA-F]{24}$'
      },
      permissions: {
        type: 'array',
        items: {
          type: 'string',
          'x-ref': 'Route',
          description: 'Refers to Route',
          pattern: '^[0-9a-fA-F]{24}$'
        },
        minItems: 1
      },
      active: { type: 'boolean', default: true },
    },
    required: [ 'name', 'url', 'icon', 'isExternal', 'order', 'role' ]
  }
const filter = {
    limit: { type: 'string' },
    skip: { type: 'string' }
}
const queryStringJsonSchema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      url: { type: 'string' },
      icon: { type: 'string' },
      isExternal: { type: 'boolean' },
      parent: {
        type: [ 'string', 'null' ],
        'x-ref': 'Menu',
        default: null,
        description: 'Refers to Menu',
        pattern: '^[0-9a-fA-F]{24}$'
      },
      order: { type: 'number' },
      role: {
        type: 'string',
        'x-ref': 'Role',
        description: 'Refers to Role',
        pattern: '^[0-9a-fA-F]{24}$'
      },
      permissions: {
        type: 'array',
        items: {
          type: 'string',
          'x-ref': 'Route',
          description: 'Refers to Route',
          pattern: '^[0-9a-fA-F]{24}$'
        },
        minItems: 1
      },
      active: { type: 'boolean', default: true },
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