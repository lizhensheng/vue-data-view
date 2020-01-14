const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const schema = new Schema({
    _id:{ type: ObjectId },
    dbconnectionname:{ type: String },
    dbtype:{ type: String },
    dbhost: { type: String },
    dbservername: { type: String },
    dbusername: { type: String },
    dbpassword: { type: String }
})

const model = mongoose.model('connection', schema, 'connection')

module.exports = model