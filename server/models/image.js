const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const schema = new Schema({
    _id:{ type: ObjectId },
    url:{ type:String, default: ''},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const model = mongoose.model('image', schema, 'image')

module.exports = model