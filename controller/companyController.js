const model = require('../models').models.Company;
const Boom = require('boom');
let response = require('../config/response');

getCompany = async function (req, res) {
    try {
        let data = await model.find({});
        return response.ok(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}

module.exports = {
    getCompany
}