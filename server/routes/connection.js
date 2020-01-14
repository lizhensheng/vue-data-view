const mongoose = require('mongoose')
const Connection = require('../models/connection')
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

router.post('/testConnection',ctx=>{
    let data = ctx.request.body
    let dbtype = data.dbtype
    let handle = dbFactory.createOperate(dbtype)
    handle.testConnection(req.body.dbhost,req.body.dbservername,req.body.dbusername,req.body.dbpassword)
        .then(()=>{
            ctx.body= '连接成功'
        })
        .catch((err)=>{
            ctx.status=202
            ctx.body='获取数据失败'
        })
})

router.post('/all',async ctx=>{
    ctx.body = await Connection.find({})
})

router.post('/detail/:_id',async ctx=>{
    let _id = mongoose.mongo.ObjectId(ctx.params._id)
    ctx.body = await Connection.findOne({_id})
})

router.post('/add',async ctx=>{
    let data = ctx.request.body
    ctx.body = await Connection.Create({
        ...data.toObject(),
        _id: mongoose.mongo.ObjectId()
    })
})

router.post('/update/:_id',async ctx=>{
    let _id = mongoose.mongo.ObjectId(ctx.params._id)
    let data = ctx.request.body
    ctx.body = await Connection.updateOne({_id},{$set:data},{
        runValidators:true
    })
})

router.post('/delete/:_id',async ctx=>{
    let _id = mongoose.mongo.ObjectId(ctx.params._id)
    ctx.body = await Connection.deleteOne({_id})
})

module.exports = router