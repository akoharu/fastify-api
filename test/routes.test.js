require('dotenv').config()

const test = require('tape');
const fastify = require('fastify');
const app = require('../app.js');

test('Root route', async ({deepEqual}) => {
    const server = fastify();
    server.register(app);

    const res = await server.inject('/');

    deepEqual(res.json(), {root: true})

    await server.close()
})

test('Auto load route', async ({deepEqual}) => {
    const server = fastify();
    server.register(app);

    const res = await server.inject('/example');

    deepEqual(res.body, 'this is an example')

    await server.close()
})

test('Authenticate route', async ({deepEqual}) => {
    const server = fastify();
    server.register(app);

    const {data} = (await server.inject({
        url: '/v1/login',
        method: 'POST',
        body: {
            username: 'kohar',
            password: 'udin'
        }
    })).json()
    const res = await server.inject({
        url: '/v1',
        headers: {
            authorization: `Bearer ${data.token}`
        }
    })
    deepEqual(res.json(), {statusCode:200,data:{status:"Authenticated"},message:"Authenticated user"})
    await server.close()
})
