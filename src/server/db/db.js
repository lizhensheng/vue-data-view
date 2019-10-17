const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/vue-echart-design')

let db = mongoose.connection
mongoose.Promise = global.Promise

db.on('error',function () {
    console.log('数据库连接出错')
})
db.on('open',function () {
    console.log('数据库连接成功')
})
/**
 * 用户表结构
 */
const userSchema = mongoose.Schema({
    username:String,
    password:String,
    token:String,
    create_time:Date
})
/**
 * 数据源配置表结构
 */
const sourceConfigSchema = mongoose.Schema({
    dbtype:String,
    tablename:String,
    sourcename:String,
    create_time: Date
})

const user = mongoose.model('user',userSchema)

const sourceConfig = mongoose.model('sourceConfig',sourceConfigSchema)

module.exports = {
    user,
    sourceConfig
}