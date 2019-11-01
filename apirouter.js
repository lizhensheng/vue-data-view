const express = require('express');
const Mock = require('mockjs');
let apiRoutes = express.Router()
const userController = require('./src/server/controller/user')
const checkToken = require('./src/server/token/check-token')
let {sourceConfig} = require('./src/server/db/db')
const dbFactory = require('./src/common/js/dbfactory')
/**
 * 模板柱状图数据的接口
 */
apiRoutes.get('/bar/ydys/v1', function (req, res) {
    //建设用地审批
    let json = Mock.mock( [
            {
                "TJDATE":'2008',
                "ARECODE":150000,
                "GWYPZZMJ|1-100":1,
                "SZFPZZMJ|1-100":1
            },
            {
                "TJDATE":'2009',
                "ARECODE":150000,
                "GWYPZZMJ|1-100":1,
                "SZFPZZMJ|1-100":1
            },
            {
                "TJDATE":'2010',
                "ARECODE":150000,
                "GWYPZZMJ|1-100":1,
                "SZFPZZMJ|1-100":1
            },
            {
                "TJDATE":'2011',
                "ARECODE":150000,
                "GWYPZZMJ|1-100":1,
                "SZFPZZMJ|1-100":1
            },
            {
                "TJDATE":'2013',
                "ARECODE":150000,
                "GWYPZZMJ|1-100":1,
                "SZFPZZMJ|1-100":1
            }
        ])
    res.json(json)
});
/**
 * 模板折线图数据的接口
 */
apiRoutes.get('/line/ydys/v1', function (req, res) {
    //建设用地审批
    let json = Mock.mock([
            {
                "TJDATE":'2008',
                "ARECODE":150000,
                "GWYPZZMJ|1-100":1,
                "SZFPZZMJ|1-100":1
            },
            {
                "TJDATE":'2009',
                "ARECODE":150000,
                "GWYPZZMJ|1-100":1,
                "SZFPZZMJ|1-100":1
            },
            {
                "TJDATE":'2010',
                "ARECODE":150000,
                "GWYPZZMJ|1-100":1,
                "SZFPZZMJ|1-100":1
            },
            {
                "TJDATE":'2011',
                "ARECODE":150000,
                "GWYPZZMJ|1-100":1,
                "SZFPZZMJ|1-100":1
            },
            {
                "TJDATE":'2013',
                "ARECODE":150000,
                "GWYPZZMJ|1-100":1,
                "SZFPZZMJ|1-100":1
            }
        ])
    res.json(json)
});
/**
 * 模板饼图数据的接口
 */
apiRoutes.get('/pie/ydys/v1', function (req, res) {
    //建设用地审批
    let json = Mock.mock([{
                "GWYPZZMJ|1-100":1,
                "SZFPZZMJ|1-100":1
        }]
    )
    res.json(json)
});
/**
 * 模板环形饼图数据的接口
 */
apiRoutes.get('/ring/ydys/v1', function (req, res) {
    //建设用地审批
    let json = Mock.mock(
        [{
            "GWYPZZMJ|1-100":1,
            "SZFPZZMJ|1-100":1
        }]
    )
    res.json(json)
});
/**
 * 模板散点图数据的接口
 */
apiRoutes.get('/scatter/ydys/v1', function (req,res) {
    let json = Mock.mock([{
        "year":2006,
        "region":"武汉",
        "POPULATION":68,
        "ECONOMICS":5888
    },{
        "year":2007,
        "region":"武汉",
        "POPULATION":89,
        "ECONOMICS":15896
    },{
        "year":2006,
        "region":"襄阳",
        "POPULATION":45,
        "ECONOMICS":3896
    },{
        "year":2007,
        "region":"襄阳",
        "POPULATION":65,
        "ECONOMICS":7896
    }])
    res.json(json)
})
apiRoutes.get('/getChartDataDynamic',async (req,res) => {
    let id = req.query.id
    if(id){
        await sourceConfig.findOne({_id:id}, async (err,doc)=>{
            if(err){
                res.json([])
            }else{
                let dbtype = doc.dbtype
                let tablename = doc.tablename
                let tablefields = JSON.parse(doc.tablefields)
                let fields = []
                tablefields.forEach((item)=>{
                    fields.push(item.value)
                })
                let ff = fields.join(',')
                let handle = dbFactory.createOperate(dbtype)
                await handle.createConnection()
                await handle.getDataset(ff,tablename,(result)=>{
                    handle.closeConnection()
                    if(result){
                        res.json(result)
                    }else{
                        res.json([])
                    }
                })
            }
        })
    }
})
/**
 * 登录
 */
apiRoutes.post('/login',userController.login);
/**
 * 注册
 */
apiRoutes.post('/register',userController.reg);
/**
 * 获取所有用户
 */
apiRoutes.get('/user', checkToken,userController.getAllUser);
/**
 * 删除某个用户
 */
apiRoutes.post('/delUser', checkToken,userController.delUser);

module.exports = apiRoutes