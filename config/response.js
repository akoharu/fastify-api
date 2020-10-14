async function singleData (values, message, reply) {
    return reply
    .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            statusCode : 200,
            data : values,
            message : message,
        });
}

async function badRequest (values, message, reply) {
    return reply
        .code(400)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            statusCode : 400,
            data : values,
            message : message,
        });
}

module.exports = {
    singleData, badRequest
};
