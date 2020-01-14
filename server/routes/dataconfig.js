const mongoose = require('mongoose')
const Dataconfig = require('../models/dataconfig')
const router = require('koa-router')()

router.post('/all',async ctx=>{
    ctx.body = await Dataconfig.find({})
})

router.post('/detail/:_id',async ctx=>{
    let _id = mongoose.mongo.ObjectId(ctx.params._id)
    ctx.body = await Dataconfig.findOne({_id})
})

router.post('/add',async ctx=>{
    let data = ctx.request.body
    ctx.body = await Dataconfig.Create({
        ...data.toObject(),
        _id: mongoose.mongo.ObjectId()
    })
})

router.post('/update/:_id',async ctx=>{
    let _id = mongoose.mongo.ObjectId(ctx.params._id)
    let data = ctx.request.body
    ctx.body = await Dataconfig.updateOne({_id},{$set:data},{
        runValidators:true
    })
})

router.post('/delete/:_id',async ctx=>{
    let _id = mongoose.mongo.ObjectId(ctx.params._id)
    ctx.body = await Dataconfig.deleteOne({_id})
})

module.exports = router