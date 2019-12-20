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
apiRoutes.get('/k/ydys/v1',function (req,res) {
    let json = Mock.mock([{
        "year":'2019/12/15',
        "up":20,
        "down":30,
        "red":10,
        "green":35
    },{
        "year":'2019/12/16',
        "up":20,
        "down":30,
        "red":10,
        "green":35
    },{
        "year":'2019/12/17',
        "up":20,
        "down":30,
        "red":10,
        "green":35
    },{
        "year":'2019/12/18',
        "up":20,
        "down":30,
        "red":10,
        "green":35
    }])
    res.json(json)
})
apiRoutes.get('/radar/ydys/v1',function (req,res) {
    let json = Mock.mock([{
        category:'预算',
        sale:20,
        market:56,
        development:45,
        administrator:55,
        customsupport:58
    },{
        category:'实际',
        sale:18,
        market:48,
        development:15,
        administrator:65,
        customsupport:78
    }])
    res.json(json)
})
apiRoutes.get('/tree/ydys/v1',function (req,res) {
    let json = Mock.mock([{
        id:1,
        pid:0,
        name:'父'
    },{
        id:2,
        pid:1,
        name:'子1'
    },{
        id:3,
        pid:1,
        name:'子2'
    }])
    res.json(json)
})
let jsonMap = require('./src/common/data/420000.json')
apiRoutes.get('/map/ydys/v1',function (req,res) {
    res.json(jsonMap)
})
apiRoutes.get('/getAllData',async (req,res) => {
    let id = req.query.id
    if(id){
        await sourceConfig.findOne({_id:id}, async (err,doc)=>{
            if(err){
                res.json({code:500})
            }else{
                let sourceid = doc.sourceid
                dbFactory.getConnection(sourceid)
                    .then(async r=> {
                            if (!r) {
                                res.json({code:500})
                                return
                            }
                            let tablename = doc.tablename
                            let tablefields = JSON.parse(doc.tablefields)
                            let fields = []
                            tablefields.forEach((item)=>{
                                fields.push(item.value)
                            })
                            let ff = fields.join(',')
                            let handle = dbFactory.createOperate(r.dbtype)
                            await handle.createConnection(r.dbhost,r.dbservername,r.dbusername,r.dbpassword)
                            await handle.getDataset(ff,tablename,(result)=>{
                                handle.closeConnection()
                                if(result){
                                    res.json({code:0,data:result})
                                }else{
                                    res.json({code:500})
                                }
                            })
                        }
                    ).catch(e=>{
                        console.log(e)
                        res.json({code:500})
                    })

            }
        })
    }
})
apiRoutes.get('/getTableDataDynamic',async (req,res) => {
    let id = req.query.id
    let pageIndex = req.query.pageIndex
    let pageSize = req.query.pageSize
    if(id){
        await sourceConfig.findOne({_id:id}, async (err,doc)=>{
            if(err){
                console.log(err)
                res.json({code:500})
            }else{
                let sourceid = doc.sourceid
                dbFactory.getConnection(sourceid)
                    .then(async r=> {
                        if (!r) {
                            console.log('excute code getConnection error')
                            res.json({code:500})
                            return
                        }
                        let tablename = doc.tablename
                        let tablefields = JSON.parse(doc.tablefields)
                        let fields = []
                        tablefields.forEach((item)=>{
                            fields.push(`${item.value} ${item.label}`)
                        })
                        let ff = fields.join(',')
                        let handle = dbFactory.createOperate(r.dbtype)
                        await handle.createConnection(r.dbhost,r.dbservername,r.dbusername,r.dbpassword)
                        await handle.getPagingData(pageIndex,pageSize,ff,tablename,(result)=>{
                            handle.closeConnection()
                            res.json({code:0,data:result})
                        })
                    }).catch(e=>{
                    console.log(e)
                    res.json({code:500})
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