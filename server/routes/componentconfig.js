const mongoose = require('mongoose')
const ComponentConfig = require('../models/componentconfig')
const router = require('koa-router')()

router.post('/all',async ctx=>{
    ctx.body = await ComponentConfig.find({})
})

router.post('/detail', async ctx=>{
    let data = ctx.request.body
    ctx.body = await ComponentConfig.findOne({name: data.name})
})
module.exports = router