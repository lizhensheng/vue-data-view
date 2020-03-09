const mongoose = require('mongoose')
const Conn = require('../models/connection')
const router = require('koa-router')()
const dbFactory = require('../db/dbfactory')

router.post('/getTableNames',ctx=>{
    let data = ctx.request.body
    dbFactory.getConnection(data.id)
        .then(async r=>{
            if(!r){
                ctx.status=202
                ctx.body='获取数据失败'
                return
            }
            let handle = dbFactory.createOperate(r.dbtype)
            await handle.createConnection(r.dbhost,r.dbservername,r.dbusername,r.dbpassword)
            await handle.getTableNames((result)=>{
                handle.closeConnection()
                if(result){
                    ctx.body= result
                }else{
                    ctx.status=202
                    ctx.body='获取数据失败'
                }
            })
        })
        .catch(err=>{
            ctx.status=202
            ctx.body='获取数据失败'
        })
})

router.post('/getDataset',ctx=>{
    let data = ctx.request.body
    let tablefields = data.tablefields
    let tablename = data.tablename
    let id = data.id
    dbFactory.getConnection(id)
        .then(async r=>{
            let handle = dbFactory.createOperate(r.dbtype)
            await handle.createConnection(r.dbhost,r.dbservername,r.dbusername,r.dbpassword)
            await handle.getDataset(tablefields,tablename,(result)=>{
                handle.closeConnection()
                if(result){
                    ctx.body= result
                }else{
                    ctx.status=202
                    ctx.body='获取数据失败'
                }
            })
        })
        .catch(e=>{
            ctx.status=202
            ctx.body='获取数据失败'
        })
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