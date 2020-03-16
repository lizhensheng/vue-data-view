const mongoose = require('mongoose')
const Conn = require('../models/connection')
const router = require('koa-router')()
const dbFactory = require('../db/dbfactory')

router.post('/excuteSql',async ctx => {
    let data = ctx.request.body
    let sql = data.sql
    let name = data.name
    let limit = data.limit
    let conn = await Conn.findOne({dbconnectionname: name})
    if(conn){
        let handle = dbFactory.createOperate(conn.dbtype)
        await handle.createConnection(conn.dbhost,conn.dbservername,conn.dbusername,conn.dbpassword)
        await handle.excuteSql(sql, limit)
        .then((res)=>{
            ctx.body = res
        })
        .catch(e => {
            ctx.status = 503
            ctx.body = e.message
        })
    }
})

router.post('/testConnection',async ctx=>{
    let data = ctx.request.body
    let dbtype = data.dbtype
    try{
        let handle = dbFactory.createOperate(dbtype)
        await handle.testConnection(data.dbhost,data.dbservername,data.dbusername,data.dbpassword)
            .then(()=>{
                ctx.body= '连接成功'
            })
            .catch((err)=>{
                ctx.body= '连接失败'
            })
    }
    catch(e){
        ctx.body = e.message
    }
})

router.post('/all',async ctx=>{
    ctx.body = await Conn.find({})
})

router.post('/detail/:_id',async ctx=>{
    let _id = mongoose.mongo.ObjectId(ctx.params._id)
    ctx.body = await Conn.findOne({_id})
})
/**
 *  数据未加密
 */
router.post('/add',async ctx=>{
    let data = ctx.request.body
    try{
        ctx.body = await Conn.create({
            ...data,
            dbcreatetime: new Date().getTime(),
            _id: mongoose.mongo.ObjectId()
        })
    }
    catch(e){
        ctx.status = 503
        ctx.body = e.message
    }
})

router.post('/update/:_id',async ctx=>{
    let _id = mongoose.mongo.ObjectId(ctx.params._id)
    let data = ctx.request.body
    ctx.body = await Conn.updateOne({_id},{$set:data},{
        runValidators:true
    })
})

router.post('/delete/:_id',async ctx=>{
    let _id = mongoose.mongo.ObjectId(ctx.params._id)
    ctx.body = await Conn.deleteOne({_id})
})

module.exports = router