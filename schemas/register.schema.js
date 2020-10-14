const bodyJsonSchema = {
    type: 'object',
    required: ['username', 'password', 'role'],
    properties: {
        username: {
            type: 'string'
        },
        password: {
            type: 'string',
        },
        role: {
            type: 'string'
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