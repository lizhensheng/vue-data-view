const mongoose = require('mongoose')
const Project = require('../models/project')
const Token = require('../models/token')
const router = require('koa-router')()
const moment = require('moment')
var url = require('url')
const $config = require('../../config')

router.get('/view/:_id', async ctx=>{
    let referer = ctx.request.header.referer
    let refererHost = (url.parse(referer)).hostname
    let baseHost = (url.parse($config.baseURL)).hostname
    if(refererHost === baseHost){
        let _id=mongoose.mongo.ObjectId(ctx.params._id)
        let project=await Project.findOne({_id})
        ctx.status=201
        await ctx.render('pc',{projectInfo: project})
    }
    else{
        ctx.status=201
        ctx.body = '权限不足'
    }
})

router.get('/verify/:_id/:token', async ctx=>{
    let _id = mongoose.mongo.ObjectId(ctx.params._id)
    let token = ctx.params.token
    let model = await Token.findOne({token: token})
    if(model){
        let now = moment()
        let before = moment(model.expire)
        if(before.diff(now) > 0){
            let project=await Project.findOne({_id: _id})
            ctx.status=201
            await ctx.render('pc',{projectInfo: project})
        }
        else{
            ctx.status=201
            ctx.body = '密钥过期了'
        }
    }
    else{
        ctx.status=201
        ctx.body = '权限不足'
    }
})

router.get('/myProjects', async ctx=>{
    let author=ctx.state.user._id
    ctx.body=await Project.find({author: author}).ne('isTemplate',true)
})

router.post('/modifyName/:_id', async ctx=>{
    let _id = ctx.params._id
    let data = ctx.request.body
    ctx.body = await Project.updateOne({_id},{$set: data},{
        runValidators:true
    })
})

// router.get('/myPages/count',async ctx=>{
//     let author = ctx.state.user_id
//     author = mongoose.mongo.ObjectId(author)
//     let myList = await Project.find({pageMode:ctx.query.pageMode,author:author}).ne('isTemplate',true)
//     let shareList = await Project.find({pageMode:ctx.query.pageMode,isTemplate:{$ne:true},members:{$elemMatch:{$in:author}}})
//     ctx.body = {
//         my:myList.length,
//         share:shareList.length
//     }
// })

// router.get('/myPublishPages', async ctx=>{
//     let author=ctx.state.user_id
//     author=mongoose.mongo.ObjectId(author)
//     ctx.body=await Project.find({author:author,pageMode:ctx.query.pageMode}).where('isPublish').equals(true)
// })

// router.get('/myPublishPages/count',async ctx=>{
//     let author = ctx.state.user_id
//     author = mongoose.mongo.ObjectId(author)
//     let myList = await Project.find({pageMode:ctx.query.pageMode,author:author}).where('isPublish').equals(true)
//     ctx.body = {
//         my:myList.length
//     }
// })

router.get('/detail/:_id',async ctx=>{
    let _id = mongoose.mongo.ObjectId(ctx.params._id)
    ctx.body = await Project.findOne({_id})
})

router.post('/add', async ctx=>{
    let data = ctx.request.body
    let author = ctx.state.user._id
    author=mongoose.mongo.ObjectId(author)
    ctx.body = await Project.create({
        ...data,
        author:author,
        members:[author],
        _id:mongoose.mongo.ObjectId()
    })
})

router.post('/copy/:_id', async ctx=>{
    let _id=mongoose.mongo.ObjectId(ctx.params._id)
    let author=ctx.state.user._id
    author=mongoose.mongo.ObjectId(author)
    let data=await Project.findOne({_id})
    ctx.body=await Project.create({
        ...data.toObject(),
        isPublish:false,
        isTemplate:false,
        members:[author],
        author: author,
        _id:mongoose.mongo.ObjectId()
    })
})

router.post('/update/:_id',async ctx=>{
    let _id=mongoose.mongo.ObjectId(ctx.params._id)
    let data=ctx.request.body
    ctx.body=await Project.updateOne({_id},{$set:data},{
        runValidators:true
    })
})

router.post('/delete/:_id', async ctx=>{
    let _id=mongoose.mongo.ObjectId(ctx.params._id)
    ctx.body=await Project.deleteOne({_id})
})

router.post('/setTemplate/:_id',async ctx=>{
    let _id=mongoose.mongo.ObjectId(ctx.params._id)
    let data=await Project.findOne({_id})
    ctx.body=await Project.create({
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
    ctx.body=await Project.find({author:author}).where('isTemplate').equals(true).where('isPublish').equals(false)
})

router.post('/publish/:_id',async ctx=>{
    let _id = mongoose.mongo.ObjectId(ctx.params._id)
    ctx.body=await Project.updateOne({_id},{$set:{isPublish:true}},{
        runValidators:true
    })
})

// router.post('/deleteShareToUser/:_id',async ctx=>{
//     let _id=mongoose.mongo.ObjectID(ctx.params._id)
//     let author=ctx.state.user._id
//     ctx.body=await Project.updateOne({_id},{$pull:{members:author}},{
//         runValidators:true
//     })
// })

// router.post('/publishTemplate/:_id',async ctx=>{
//     let _id=mongoose.mongo.ObjectId(ctx.params._id)
//     let data=await Project.findOne({_id})
//     ctx.body=await Project.create({
//         ...data.toObject(),
//         isTemplate:true,
//         isPublish:true,
//         members:[],
//         _id:mongoose.mongo.ObjectId()
//     })
// })

// router.get('/templateShop/list',async ctx=>{
//     ctx.body=await Project.find({pageMode:ctx.query.pageMode}).where('isTemplate').equals(true).where('isPublish').equals(true)
// })

module.exports=router
