const mongoose = require('mongoose')
const Conn = require('../models/connection')
const router = require('koa-router')()
const dbFactory = require('../db/dbfactory')

router.post('/excuteSql',async ctx => {
    let data = ctx.request.body
    let sql = data.sql
    let id = data.id
    let limit = data.limit
    let paging = data.paging
    let where = data.where
    let conn = await Conn.findOne({_id: id})
    if(conn){
        let handle = dbFactory.createOperate(conn.dbtype)
        await handle.createConnection(conn.dbhost,conn.dbservername,conn.dbusername,conn.dbpassword)
        await handle.excuteSql(sql, limit, paging, where)
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
    let author = ctx.state.user._id
    ctx.body = await Conn.find({
        author: author
    })
})

router.post('/detail/:_id',async ctx=>{
    let _id = mongoose.mongo.ObjectId(ctx.params._id)
    let author = ctx.state.user._id
    ctx.body = await Conn.findOne({_id: _id, author: author})
})
/**
 *  数据未加密
 */
router.post('/add',async ctx=>{
    let data = ctx.request.body
    let author = ctx.state.user._id
    author=mongoose.mongo.ObjectId(author)
    try{
        ctx.body = await Conn.create({
            ...data,
            dbcreatetime: new Date().getTime(),
            author: author,
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