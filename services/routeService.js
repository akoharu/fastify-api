const model = require('../models').models.Route;
const {MongooseQueryParser} = require('mongoose-query-parser');
const parser = new MongooseQueryParser();
const _ = require('lodash');
const permissionRules = async (urlFilter) => {
    const url = urlFilter.split('?').length > 1 ? urlFilter.split('?')[1] : ''; 
    const parsed = parser.parse(url);
    let filter = {}
    if (parsed.filter) filter = parsed.filter;
    console.log(filter);
    try {
        // let data = await model.find(filter).select({ endpoint: 1, method: 1, _id: 0}).populate([{ path: 'role', select: 'type -_id' }]);

        let data = await model.aggregate([
            {
                $match: filter
            },
            {
                $lookup: {
                    from: "roles",
                    localField: "role",
                    foreignField: "_id",
                    as: "role"
                }
            },
            {$unwind: '$role'},
            {
                "$project": {
                    "_id": 0,
                    "name": "$endpoint",
                    "operation": "$method",
                    "role.type": 1,
                }
            },
        ])
        let group =  _.groupBy(data, (currentObject) => {
            return currentObject.role.type;
        });
        let rules = {};
        Object.keys(group).forEach(key => {
            rules[key] = {can: group[key]};
        });

        return rules;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    permissionRules
}