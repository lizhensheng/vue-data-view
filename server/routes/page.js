const mongoose = require('mongoose')
const Page = require('../models/page')
const router = require('koa-router')()

router.get('/view/:_id', async ctx=>{
    let _id=mongoose.mongo.ObjectId(ctx.params._id)
    let page=await Page.findOne({_id})
    ctx.status=201
    let pageMode={
        'h5':'h5-swiper',
        'longPage':'h5-long',
        'relativePage':'h5-relative',
        'pc':'pc'
    }
    await ctx.render(pageMode[page.pageMode],{pageData:page})
})

router.get('/myPages', async ctx=>{
    let author=ctx.state.user_id
    author=mongoose.mongo.ObjectId(author)
    if(ctx.query.type==='share'){
        ctx.body=await Page.find({pageMode:ctx.query.pageMode,isTemplate:{$ne:true},members:{$elemMatch:{$in:author}}})
        return
    }
    ctx.body=await Page.find({author:author,pageMode:ctx.query.pageMode}).ne('isTemplate',true)
})

router.get('/myPages/count',async ctx=>{
    let author = ctx.state.user_id
    author = mongoose.mongo.ObjectId(author)
    let myList = await Page.find({pageMode:ctx.query.pageMode,author:author}).ne('isTemplate',true)
    let shareList = await Page.find({pageMode:ctx.query.pageMode,isTemplate:{$ne:true},members:{$elemMatch:{$in:author}}})
    ctx.body = {
        my:myList.length,
        share:shareList.length
    }
})

router.get('/myPublishPages', async ctx=>{
    let author=ctx.state.user_id
    author=mongoose.mongo.ObjectId(author)
    ctx.body=await Page.find({author:author,pageMode:ctx.query.pageMode}).where('isPublish').equals(true)
})

router.get('/myPublishPages/count',async ctx=>{
    let author = ctx.state.user_id
    author = mongoose.mongo.ObjectId(author)
    let myList = await Page.find({pageMode:ctx.query.pageMode,author:author}).where('isPublish').equals(true)
    ctx.body = {
        my:myList.length
    }
})

router.get('/detail/:_id',async ctx=>{
    let _id = mongoose.mongo.ObjectId(ctx.params._id)
    ctx.body = await Page.findOne({_id})
})

router.post('/add', async ctx=>{
    let data = ctx.request.body
    let author = ctx.state.user._id
    ctx.body = await Page.create({
        ...data,
        author:author,
        _id:mongoose.mongo.ObjectId()
    })
})

router.post('/copy/:_id', async ctx=>{
    let _id=mongoose.mongo.ObjectId(ctx.params._id)
    let author=ctx.state.user_id
    let data=await Page.findOne({_id})
    ctx.body=await Page.create({
        ...data.toObject(),
        isPublish:false,
        isTemplate:false,
        members:[],
        author:author,
        _id:mongoose.mongo.ObjectId()
    })
})

router.post('/update/:_id',async ctx=>{
    let _id=mongoose.mongo.ObjectId(ctx.params._id)
    let data=ctx.request.body
    ctx.body=await Page.updateOne({_id},{$set:data},{
        runValidators:true
    })
})

router.post('/delete/:_id', async ctx=>{
    let _id=mongoose.mongo.ObjectId(ctx.params._id)
    ctx.body=await Page.deleteOne({_id})
})

router.post('/setTemplate/:_id',async ctx=>{
    let _id=mongoose.mongo.ObjectId(ctx.params._id)
    let data=await Page.findOne({_id})
    ctx.body=await Page.create({
        ...data.toObject(),
        isTemplate:true,
        isPublish:false,
        members:[],
        _id:mongoose.mongo.ObjectId()
    })
})

router.get('/myTemplate', async ctx=>{
    let author = ctx.state.user._id
    author = mongoose.mongo.ObjectId(author)
    ctx.body=await Page.find({pageMode:ctx.query.pageMode,author:author}).where('isTemplate').equals(true).where('isPublish').equals(false)
})

router.post('/publish/:_id',async ctx=>{
    let _id = mongoose.mongo.ObjectId(ctx.params._id)
    ctx.body=await Page.updateOne({_id},{$set:{isPublish:true}},{
        runValidators:true
    })
})

router.post('/deleteShareToUser/:_id',async ctx=>{
    let _id=mongoose.mongo.ObjectID(ctx.params._id)
    let author=ctx.state.user._id
    ctx.body=await Page.updateOne({_id},{$pull:{members:author}},{
        runValidators:true
    })
})

router.post('/publishTemplate/:_id',async ctx=>{
    // let _id=mongoose.mongo.ObjectId(ctx.params._id)
    // let data=await Page.findOne({_id})
    // ctx.body=await Page.create({
    //     ...data.toObject(),
    //     isTemplate:true,
    //     isPublish:true,
    //     members:[],
    //     _id:mongoose.mongo.ObjectId()
    // })
    ctx.status=202
    ctx.body='该功能暂不开放'
})

router.get('/templateShop/list',async ctx=>{
    ctx.body=await Page.find({pageMode:ctx.query.pageMode}).where('isTemplate').equals(true).where('isPublish').equals(true)
})

module.exports=router
