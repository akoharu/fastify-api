const bodyJsonSchema = {
    type: 'object',
    required: ['username', 'password'],
    properties: {
        username: {
            type: 'string'
        },
        password: {
            type: 'string',
        }
    }
}

const schema = {
    body: bodyJsonSchema,

    // querystring: queryStringJsonSchema,

    // params: paramsJsonSchema,

    // headers: headersJsonSchema
}

module.exports = {
    schema
}