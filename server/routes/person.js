const User=require('../models/user')
const Image=require('../models/image')
const router=require('koa-router')()
const uploadImage=require('../utils/uploadImg')
const mongoose=require('mongoose')

router.get('/info',async ctx=>{
    let _id=ctx.state.user._id
    let result=await Users.findOne({_id}).select('_id username name email avatar type roles').exec()
    ctx.body=result
})

router.get('/images',async ctx=>{
    let author=ctx.state.user._id
    let result = await Image.find({author:author})
    ctx.body=result
})

router.post('/uploadImage',async ctx=>{
    let imageUrl = uploadImage(ctx)
    let author=ctx.state.user._id
    return ctx.body=await Image.create({
        url:imageUrl,
        author:author,
        _id:mongoose.mongo.ObjectId()
    })
})

module.exports=router