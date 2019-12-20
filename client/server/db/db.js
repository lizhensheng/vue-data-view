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
    sourceid:String,
    tablename:String,
    sourcename:String,
    tablefields:String,
    create_time: Date
})
/**
 * 工程页面配置表结构
 */
const projectPageConfigSchema = mongoose.Schema({
    pid:String,
    label:String,
    isfold:Boolean
})
/**
 * 控件配置表结构
 */
const controlConfigSchema = mongoose.Schema({
    pageId:String,//页面id
    chartId:String,//图表id
    chartType:Number,//图表类型
    x:Number,//图表x坐标
    y:Number,//图表y坐标
    width:Number,//图表宽度
    height:Number,//图表高度
    xData:Array,//图表x轴列名
    yData:Array,//图表y轴列名
    yFields:Array,//图表y轴列名详细
    dataId:String,//图表配置数据源id
    dataUrl:String,//图表配置获取数据路径,
    backgroundColor:String,//图表背景色
    borderRadius:Number,//图表圆角
    borderWidth:Number,//图表边框宽度
    borderStyle:String,//图表边框样式
    borderColor:String,//图表边框颜色
})
/**
 * 页面样式配置表结构
 */
const pageConfigSchema = mongoose.Schema({
    pageId:String,
    backgroundImageUrl:String
})
/**
 * 数据库配置表结构
 */
const dbConfigSchema = mongoose.Schema({
    dbconnectionname:String,
    dbtype:String,
    dbhost: String,
    dbservername: String,
    dbusername: String,
    dbpassword: String
})

const user = mongoose.model('user',userSchema)

const sourceConfig = mongoose.model('sourceConfig',sourceConfigSchema)

const projectPageConfig = mongoose.model('projectPageConfig',projectPageConfigSchema)

const controlConfig = mongoose.model('controlConfig',controlConfigSchema)

const pageConfig = mongoose.model('pageConfig',pageConfigSchema)

const dbConfig = mongoose.model('dbConfig',dbConfigSchema)

module.exports = {
    user,
    sourceConfig,
    projectPageConfig,
    controlConfig,
    pageConfig,
    dbConfig
}