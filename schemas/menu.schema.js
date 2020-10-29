const tags = ['Menu'];
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
        minItems: 0
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
        minItems: 0
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
    body: {
      type: bodyJsonSchema.type,
      properties: bodyJsonSchema.properties,
      required: []
    },

    params: paramsJsonSchema,

    // headers: headersJsonSchema
}

const destroy = {
    tags: tags,

    params: paramsJsonSchema,

    // headers: headersJsonSchema
}

module.exports = {
    find, findOne, create, update, destroy
}