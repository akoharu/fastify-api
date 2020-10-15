const model = 'Company';
const crud = require('../services/crudService');
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

module.exports = {
    find, findOne, create, update, destroy, findDeleted, count, countDeleted, restore
}