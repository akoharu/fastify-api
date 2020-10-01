const model = require('../models').models.User;
const Boom = require('boom');
let response = require('../config/response');

const postSignup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await model.findOne({ username: username.toLowerCase() });
        if (existingUser) {
            res.code(409);
            res.send(new Error('User already exists'));
            return;
        }
        const user = new model({
            username,
            password,
        });
        const newUser = await user.save();
        const { _id } = newUser;
        const token = await res.jwtSign({ _id }, { expiresIn: process.env.JWT_EXP });
        return response.ok({token}, 'Register Success', res)
    } catch (error) {
        throw Boom.boomify(error);        
    }
};

const postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await model.findOne({ username: username.toLowerCase() }).exec();
        if (!user) {
            return response.badRequest({}, `Username not exist`, res)
        }
        const isMatch = await user.comparePassword(password);
        if (isMatch) {
            const { id } = user;
            const token = await res.jwtSign({ id }, { expiresIn: process.env.JWT_EXP });
            return response.ok({token}, `Welcomeback ${username} !`, res) 
        }
        return response.badRequest({}, `Invalid Password!`, res)
    } catch (err) {
        throw Boom.boomify(err);        
    }
};
module.exports = {
    postSignup,
    postLogin
}