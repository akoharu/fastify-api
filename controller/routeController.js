const model = 'Route';
const crud = require('../services/crudService');
const permissionRuleServie = require('../services/routeService');
const Boom = require('boom');
const response = require('../config/response');
const find = async (req, res) => {
    return crud.find(req, res, model);
}
const count = async (req, res) => {
    return crud.count(req, res, model);
}

const findDeleted = async (req, res) => {
    return crud.findDeleted(req, res, model);
}
const countDeleted = async (req, res) => {
    return crud.countDeleted(req, res, model);
}
const findOne = async (req, res) => {
    return crud.findOne(req, res, model);
}

const create = async (req, res) => {
    return crud.create(req, res, model);
}
const update = async (req, res) => {
    return crud.update(req, res, model);
}

const destroy = async (req, res) => {
    return crud.destroy(req, res, model);
}
const restore = async (req, res) => {
    return crud.restore(req, res, model);
}

const permissionRules = async(req, res) => {
    try {
        let data = await permissionRuleServie.permissionRules(req.url);
        return response.singleData(data, 'Success', res);
    } catch (error) {
        throw Boom.boomify(error);
    }
}

const checkPermissions = async(req, res) => {
    try {
        let {url, method} = req.context.config;
        const user = req.state.user;
        console.log(user.role.type, url.split('?')[0], method);
        let checkRBAC = req.rbac.can(user.role.type, url.split('?')[0], method);
        return response.singleData(checkRBAC, 'Success', res);
    } catch (error) {
        throw Boom.boomify(error);
    }
}

module.exports = {
    find, findOne, create, update, destroy, findDeleted, count, countDeleted, restore, permissionRules, checkPermissions
}