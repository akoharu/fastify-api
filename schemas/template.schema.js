const tags = ['Company'];

const bodyJsonSchema
const filter = {
    limit: { type: 'string' },
    skip: { type: 'string' }
}
const queryStringJsonSchema
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

module.exports = {
    find, findOne, create, update, destroy
}