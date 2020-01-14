const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const usersSchema = new Schema({
    _id:{ type: ObjectId},
    username:{ type:String, required:[true,'username不能为空']},
    password:{ type:String, required:[true,'password不能为空']},
    name:{ type:String, default:''},
    email:{ type:String, default:''},
    avatar:{ type:String, default:''},
    roles:{ type:String, default:''},
    type:{ type:String, enum: ['site','third'], default:'site'}
})

const users = mongoose.model('user',usersSchema,'user')

module.exports = users