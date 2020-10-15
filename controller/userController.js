const model = require('../models').models.User;
const Boom = require('boom');
let response = require('../config/response');
const {MongooseQueryParser} = require('mongoose-query-parser');
const parser = new MongooseQueryParser();
const bcrypt = require('bcrypt-nodejs');

const find = async (req, res) => {
    console.log(req.state);
    const url = req.url.split('?').length > 1 ? req.url.split('?')[1] : ''; 
    const parsed = parser.parse(url);
    let limit = 10, skip = 0, filter = {}, select = {}, populate = [];
    if (req.url.split('?').length > 1) filter = parsed.filter;
    if (parsed.limit) limit = parsed.limit;
    if (parsed.skip) skip = parsed.skip;
    if (parsed.populate) populate = parsed.populate;
    if (parsed.select) select = parsed.select;
    try {
        let data = await model.find(filter).select(select).populate(populate).limit(limit).skip(skip);
        return response.singleData(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}
const count = async (req, res) => {
    const url = req.url.split('?').length > 1 ? req.url.split('?')[1] : ''; 
    const parsed = parser.parse(url);
    let filter = {}
    if (req.url.split('?').length > 1) filter = parsed.filter;
    try {
        let data = await model.count(filter)
        return response.singleData(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}

const findDeleted = async (req, res) => {
    const url = req.url.split('?').length > 1 ? req.url.split('?')[1] : ''; 
    const parsed = parser.parse(url);
    let limit = 10, skip = 0, filter = {}, select = {}, populate = [];
    if (req.url.split('?').length > 1) filter = parsed.filter;
    if (parsed.limit) limit = parsed.limit;
    if (parsed.skip) skip = parsed.skip;
    if (parsed.populate) populate = parsed.populate;
    if (parsed.select) select = parsed.select;
    try {
        let data = await model.findDeleted(filter).select(select).populate(populate).limit(limit).skip(skip);
        return response.singleData(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}
const countDeleted = async (req, res) => {
    const url = req.url.split('?').length > 1 ? req.url.split('?')[1] : ''; 
    const parsed = parser.parse(url);
    let filter = {}
    if (req.url.split('?').length > 1) filter = parsed.filter;
    try {
        let data = await model.countDeleted(filter)
        return response.singleData(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}
const findOne = async (req, res) => {
    let id = req.params;
    const url = req.url.split('?').length > 1 ? req.url.split('?')[1] : ''; 
    const parsed = parser.parse(url);
    let select = {}, populate = [];
    if (parsed.populate) populate = parsed.populate;
    if (parsed.select) select = parsed.select;
    try {
        let data = await model.findOne(id).select(select).populate(populate);
        return response.singleData(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}
const update = async (req, res) => {
    const id = req.params;
    const { username, password } = req.body;
    try {
        if (username) {
            const existingUser = await model.findOne({ username: username.toLowerCase() });
            if (existingUser) {
                res.code(409);
                res.send(new Error('User already exists'));
                return;
            }  
        }
        let newData;

        if (password) {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {throw Boom.boomify(err)}
                bcrypt.hash(req.body.password, salt, null, async (err, hash) => {
                  if (err) { throw Boom.boomify(err)}
                  req.body.password = hash;
                  newData = await model.findOneAndUpdate(id, req.body, {upsert: true});
                  return response.singleData(newData, 'Success', res);     
                });
              });            
        } else {
            newData = await model.findOneAndUpdate(id, req.body, {upsert: true});
            return response.singleData(newData, 'Success', res);     
        }
    } catch (error) {
        throw Boom.boomify(error);        
    }
};

const destroy = async (req, res) => {
    const id = req.params;
    const user = req.state.user;
    try {
        let data = await model.delete(id, user._id);
        return response.singleData(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}
const restore = async (req, res) => {
    const id = req.params;
    try {
        let data = await model.restore(id);
        return response.singleData(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}

module.exports = {
    find, findOne, update, destroy, findDeleted, count, countDeleted, restore
}