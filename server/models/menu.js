const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const menuSchema = new Schema({
    _id:{ type: ObjectId},
    id:{type:Number, required:[true,'编号不能为空']},
    pid:{ type:Number, required:[true,'父节点编号不能为空']},
    name:{ type:String, required:[true,'节点名不能为空']},
    iconClass:{ type:String, required:[true,'节点图标不能为空']},
    routerPath:{ type:String, required:[true,'节点路由不能为空']}
})

const model = mongoose.model('menu',menuSchema,'menu')

module.exports = model