const bodyJsonSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    phone: { type: 'string' },
    address: { type: 'string' }
  },
  required: [ 'name', 'phone', 'address' ]
}
const filter = {
    limit: { type: 'string' },
    skip: { type: 'string' }
}
const queryStringJsonSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    phone: { type: 'string' },
    address: { type: 'string' },
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