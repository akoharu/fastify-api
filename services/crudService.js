const model = require('../models').models;
const Boom = require('@hapi/boom');
const response = require('../config/response');
const {MongooseQueryParser} = require('mongoose-query-parser');
const parser = new MongooseQueryParser();

const find = async (req, res, collection) => {
    const url = req.url.split('?').length > 1 ? req.url.split('?')[1] : ''; 
    const parsed = parser.parse(url);
    let limit = 10, skip = 0, filter = {}, select = {}, populate = [];
    if (req.url.split('?').length > 1) filter = parsed.filter;
    if (parsed.limit) limit = parsed.limit;
    if (parsed.skip) skip = parsed.skip;
    if (parsed.populate) populate = parsed.populate;
    if (parsed.select) select = parsed.select;
    try {
        let data = await model[collection].find(filter).select(select).populate(populate).limit(limit).skip(skip);
        return response.singleData(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}
const count = async (req, res, collection) => {
    const url = req.url.split('?').length > 1 ? req.url.split('?')[1] : ''; 
    const parsed = parser.parse(url);
    let filter = {}
    if (req.url.split('?').length > 1) filter = parsed.filter;
    try {
        let data = await model[collection].count(filter)
        return response.singleData(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}

const findDeleted = async (req, res, collection) => {
    const url = req.url.split('?').length > 1 ? req.url.split('?')[1] : ''; 
    const parsed = parser.parse(url);
    let limit = 10, skip = 0, filter = {}, select = {}, populate = [];
    if (req.url.split('?').length > 1) filter = parsed.filter;
    if (parsed.limit) limit = parsed.limit;
    if (parsed.skip) skip = parsed.skip;
    if (parsed.populate) populate = parsed.populate;
    if (parsed.select) select = parsed.select;
    try {
        let data = await model[collection].findDeleted(filter).select(select).populate(populate).limit(limit).skip(skip);
        return response.singleData(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}
const countDeleted = async (req, res, collection) => {
    const url = req.url.split('?').length > 1 ? req.url.split('?')[1] : ''; 
    const parsed = parser.parse(url);
    let filter = {}
    if (req.url.split('?').length > 1) filter = parsed.filter;
    try {
        let data = await model[collection].countDeleted(filter)
        return response.singleData(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}
const findOne = async (req, res, collection) => {
    let id = req.params;
    const url = req.url.split('?').length > 1 ? req.url.split('?')[1] : ''; 
    const parsed = parser.parse(url);
    let select = {}, populate = [];
    if (parsed.populate) populate = parsed.populate;
    if (parsed.select) select = parsed.select;
    try {
        let data = await model[collection].findOne(id).select(select).populate(populate);
        return response.singleData(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}

const create = async (req, res, collection) => {
    try {
        const data = new model[collection](req.body);
        const newData = await data.save();
        return response.singleData(newData, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}
const update = async (req, res, collection) => {
    const id = req.params;
    try {
        let newData = await model[collection].findOneAndUpdate(id, req.body, {upsert: true, new: true});
        return response.singleData(newData, 'Success', res);   
    } catch (error) {
        throw Boom.boomify(error);
    }
}

const destroy = async (req, res, collection) => {
    const id = req.params;
    const user = req.state.user;
    try {
        await model[collection].delete(id, user._id);
        let deletedData = await model[collection].findOneDeleted(id);
        return response.singleData(deletedData, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}
const restore = async (req, res, collection) => {
    const id = req.params;
    try {
        await model[collection].restore(id);
        let restoredData = await model[collection].findOne(id);
        return response.singleData(restoredData, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}

module.exports = {
    find, findOne, create, update, destroy, findDeleted, count, countDeleted, restore
}