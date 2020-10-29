const _model = require('../models').models.User;
const Boom = require('@hapi/boom');
let response = require('../config/response');
const {MongooseQueryParser} = require('mongoose-query-parser');
const parser = new MongooseQueryParser();
const bcrypt = require('bcrypt');
const model = 'User';
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

const destroy = async (req, res) => {
    return crud.destroy(req, res, model);
}
const restore = async (req, res) => {
    return crud.restore(req, res, model);
}

const update = async (req, res) => {
    const id = req.params;
    const { username, password } = req.body;
    try {
        if (username) {
            const existingUser = await _model.findOne({ username: username.toLowerCase() });
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
                  newData = await _model.findOneAndUpdate(id, req.body, {upsert: true, new: true});
                  return response.singleData(newData, 'Success', res);     
                });
              });            
        } else {
            newData = await _model.findOneAndUpdate(id, req.body, {upsert: true, new: true});
            return response.singleData(newData, 'Success', res);     
        }
    } catch (error) {
        throw Boom.boomify(error);        
    }
};
module.exports = {
    find, findOne, update, destroy, findDeleted, count, countDeleted, restore
}