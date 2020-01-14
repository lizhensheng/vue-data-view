const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const schema = new Schema({
    _id:{ type: ObjectId },
    connectionid:{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'connection'
    },
    tablename:{ type: String },
    dataname: { type: String },
    tablefields: { type: String },
    create_time: { type: Date }
})

const model = mongoose.model('dataconfig', schema, 'dataconfig')

module.exports = model