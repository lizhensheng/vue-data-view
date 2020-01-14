const mongoose = require('mongoose')
const Users = require('../models/user')
const router = require('koa-router')()

router.get('/list',async ctx=>{
    ctx.body=await Users.find()
})

router.get('/info',async ctx=>{
    let _id=ctx.state.user._id
    ctx.body=await Users.findOne({_id}).select('username name email avatar type roles').exec()
})

router.get('/list/search',async ctx=>{
    let keywords=ctx.request.keywords
    const reg = new RegExp(keywords,'i')
    ctx.body=await Users.find().where('username').regex(reg).where('name').regex(reg)
})

router.post('/',async ctx=>{
    let data=ctx.request.body
    let result=await Users.create({
        ...data,
        _id:mongoose.mongo.ObjectId()
    })
    ctx.body=result.select('username name email avatar type roles').exec()
})

router.post('/login',async ctx=>{
    let data=ctx.request.body
    let result = await Users.findOne({username:data.username}).select('username password').exec()
    if(!result){
        ctx.status=202
        ctx.body='密码错误'
    }
    ctx.body=result
})

router.delete('/:_id',async ctx=>{
    let _id = mongoose.mongo.ObjectId(ctx.params_id)
    ctx.body=await Users.deleteOne({_id})
})

module.exports=router