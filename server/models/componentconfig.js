const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const schema = new Schema({
    _id:{ type: ObjectId },
    name:{ type: String}
})

const model = mongoose.model('componentconfig', schema, 'componentconfig')

module.exports = model