const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const schema = new Schema({
    _id: {type: ObjectId},
    groupName: {type: String},
    iconClass: {type: String},
    children: Schema.Types.Mixed
})

const model = mongoose.model('groupcomponent', schema, 'groupcomponent')

module.exports = model