const _model = require('../models').models.Menu;
const Boom = require('boom');
const response = require('../config/response');
const {MongooseQueryParser} = require('mongoose-query-parser');
const parser = new MongooseQueryParser();
const model = 'Menu';
const crud = require('../services/crudService');

const find = async (req, res) => {
    const user = req.state.user;
    const url = req.url.split('?').length > 1 ? req.url.split('?')[1] : ''; 
    const parsed = parser.parse(url);
    let limit = 10, skip = 0, filter = {}, select = {}, populate = [];
    if (req.url.split('?').length > 1) filter = parsed.filter;
    if (parsed.limit) limit = parsed.limit;
    if (parsed.skip) skip = parsed.skip;
    if (parsed.populate) populate = parsed.populate;
    if (parsed.select) select = parsed.select;
    try {
        let data = await _model.aggregate([
            {
                $match: {...filter,
                    parent: null,
                    role: user.role._id
                }
            },
            {
                $lookup: {
                    from: "routes",
                    localField: "permissions",
                    foreignField: "_id",
                    as: "permissions"
                }
            },
            {
                $lookup: {
                    from: "menus",
                    localField: "_id",
                    foreignField: "parent",
                    as: "childMenu"
                }
            },
            {
                "$project": {
                    "role": 0,
                    "childMenu.permissions": 0,
                    "childMenu.role": 0,
                    "permissions._id": 0,
                    "permissions.role": 0,
                }
            },
        ])
        return response.singleData(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
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