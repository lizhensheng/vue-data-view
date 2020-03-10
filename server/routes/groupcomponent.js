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

router.post('/add', async ctx => {
    try{
    let data = ctx.request.body
    let data2 = {
        groupName: "地图",
        iconClass: "el-icon-plus",
        children: [
            {
                title: '折线图',
                components: [
                    {
                        elName: 'qk-input',
                        title: '折线堆叠图',
                        icon: 'iconfont iconwenbenkuang',
                        isForm: true,
                        defaultStyle: {
                            height: 38,
                            width: 250,
                            paddingTop: 2,
                            paddingBottom: 2,
                            paddingLeft: 10,
                            paddingRight: 10,
                            borderColor: "#999999",
                            borderStyle: 'solid',
                            borderWidth: 1,
                            borderRadius: 4
                        }
                    },
                    {
                        elName: 'qk-textarea',
                        title: '堆叠区域图',
                        icon: 'iconfont iconwenbenkuang',
                        isForm: true,
                        defaultStyle: {
                            height: 58,
                            width: 250,
                            paddingTop: 6,
                            paddingBottom: 6,
                            paddingLeft: 10,
                            paddingRight: 10,
                            borderColor: "#999999",
                            borderStyle: 'solid',
                            borderWidth: 1,
                            borderRadius: 4
                        }
                    }
                ]
            },
            {
                title: '柱状图',
                components: [
                    {
                        elName: 'qk-bg-music',
                        title: '正负条形图',
                        icon: 'iconfont iconyinlemusic217',
                        valueType: '',
                        defaultStyle: {
                            height: 52,
                            width: 52,
                        }
                    }
                ]
            }
        ]        
    }
        ctx.body =await GroupComponent.create({
            ...data2,
            _id: mongoose.mongo.ObjectId()
        })
    }
    catch(e){
        ctx.status = 503
        ctx.body = e.message
    }
})

module.exports = router