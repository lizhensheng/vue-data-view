const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const tokenSchema = new Schema({
    _id:{ type: ObjectId},
    token: {type: String, default: ''},
    expire: {type: Date}
},{timestamps: {createdAt:'created',updateAt:'updated'}})

const token = mongoose.model('token',tokenSchema,'token')

module.exports = token