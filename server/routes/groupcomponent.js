const mongoose = require('mongoose')
const GroupComponent = require('../models/groupcomponent')
const router = require('koa-router')()

router.get('/all', async ctx => {
    try{
        ctx.body = await GroupComponent.find({})
    }
    catch(e){
        ctx.status = 503
        ctx.body = e.message
    }
})

module.exports = router