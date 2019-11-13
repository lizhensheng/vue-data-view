
const express = require('express')
const moment = require('moment')
const dbFactory = require('./src/common/js/dbfactory')
let {sourceConfig,projectPageConfig,controlConfig,pageConfig,dbConfig} = require('./src/server/db/db')
let configRoutes = express.Router()
/**
 * 获取数据表
 */
configRoutes.post('/getTableNames', (req,res) => {
    if (req.body.id){
        let id = req.body.id
        dbFactory.getConnection(id)
            .then(async r=>{
                if(!res){
                    res.json({code:500})
                    return
                }
                let handle = dbFactory.createOperate(r.dbtype)
                await handle.createConnection(r.dbhost,r.dbservername,r.dbusername,r.dbpassword)
                await handle.getTableNames((result)=>{
                    handle.closeConnection()
                    if(result){
                        res.json(result)
                    }else{
                        res.json({code:500})
                    }
                })
            })
            .catch(err=>{
                console.log(err)
                res.json({code:500})
            })
    }else{
        res.json({code:500})
    }
})
/**
 * 获取数据表数据
 */
configRoutes.post('/getDataset',async (req,res)=>{
    if(req.body.tablename&&req.body.id){
        let tablefields = req.body.tablefields
        let tablename = req.body.tablename
        let id = req.body.id
        dbFactory.getConnection(id)
            .then(async r=>{
                let handle = dbFactory.createOperate(r.dbtype)
                await handle.createConnection(r.dbhost,r.dbservername,r.dbusername,r.dbpassword)
                await handle.getDataset(tablefields,tablename,(result)=>{
                    handle.closeConnection()
                    if(result){
                        res.json(result)
                    }else{
                        res.json({code:500})
                    }
                })
            })
            .catch(e=>{
                console.log(e)
                res.json({code:500})
            })
    }else{
        res.json({code:500})
    }
})
/**
 * 测试数据库连接
 */
configRoutes.post('/testConnection',(req,res)=>{
    if(req.body.dbtype&&req.body.dbhost&&req.body.dbservername&&req.body.dbusername&&req.body.dbpassword){
        let dbtype = req.body.dbtype
        let handle = dbFactory.createOperate(dbtype)
        handle.testConnection(req.body.dbhost,req.body.dbservername,req.body.dbusername,req.body.dbpassword)
            .then(()=>{
                res.json({code:0})
            })
            .catch((err)=>{
                res.json({code:1})
            })
    }else{
        res.json({code:500})
    }
})
/**
 * 保存数据源配置
 */
configRoutes.post('/setDataSource',(req,res)=>{
    if(!req.body.tablename||!req.body.sourceid||!req.body.sourcename||!req.body.tablefields){
        res.json({code:800})
        return
    }
    let s = new sourceConfig({
        sourceid:req.body.sourceid,
        tablename:req.body.tablename,
        sourcename:req.body.sourcename,
        tablefields:req.body.tablefields
    })
    s.create_time =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    sourceConfig.findOne({sourcename:s.sourcename},(err,doc)=>{
        if(err){
            res.json({code:500})
            return
        }
        if(doc){
            res.json({code:500})
            return
        }
        s.save((err)=>{
            if(err){
                res.json({code:500})
            }else{
                res.json({code:0})
            }
        })
    })
})
configRoutes.post('/deleteDataSource',(req,res)=>{
    if(!req.body.id){
        res.json({code:800})
        return
    }
    sourceConfig.remove({_id:req.body.id},err=>{
        if(err){
            res.json({code:500})
        }else{
            res.json({code:0})
        }
    })
})
configRoutes.post('/getDataProjects',(req,res)=>{
    sourceConfig.find({},(err,doc)=>{
        if(err){
            res.json({code:500})
            return
        }
        res.json({code:0,data:doc})
    })
})
configRoutes.post('/updateSqlDataSource',(req,res)=>{
    if(!req.body.tablename||!req.body.sourceid||!req.body.sourcename||!req.body.tablefields){
        res.json({code:800})
        return
    }
    let query = { sourcename: req.body.sourcename };
    sourceConfig.findOneAndUpdate(query,{'tablename':req.body.tablename,sourceid:req.body.sourceid,tablefields:req.body.tablefields},function(err, doc) {
        if(err){
            res.json({code:500})
        }else{
            res.json({code:0})
        }
    })
})
configRoutes.post('/addPageProjectName',(req,res)=>{
    if(!req.body.projectname){
        res.json({code:800})
        return
    }
    let s = new projectPageConfig({
        pid:'0',
        label:req.body.projectname
    })
    projectPageConfig.findOne({label:req.body.projectname},(err,doc)=>{
        if(err){
            res.json({code:500})
            return
        }
        if(doc){
            res.json({code:500})
            return
        }
        s.save((err)=>{
            if(err){
                res.json({code:500})
            }else{
                res.json({code:0})
            }
        })
    })
})
configRoutes.post('/getPageProjectName',(req,res)=>{
    projectPageConfig.find({pid:'0'},(err,doc)=>{
        if(err){
            res.json({code:500})
            return
        }
        res.json({code:0,data:doc})
    })
})
configRoutes.post('/getAllPageProject',(req,res)=>{
    projectPageConfig.find({},(err,doc)=>{
        if(err){
            res.json({code:500})
            return
        }
        res.json({code:0,data:doc})
    })
})
configRoutes.post('/addPageName',(req,res)=>{
    if(!req.body.projectid || !req.body.pagename){
        res.json({code:800})
        return
    }
    projectPageConfig.findOne({label:req.body.pagename},(err,doc)=>{
        if(err){
            res.json({code:500})
            return
        }
        if(doc){
            res.json({code:500})
            return
        }else{
            let s = new projectPageConfig({
                pid:req.body.projectid,
                label:req.body.pagename
            })
            s.save((err)=>{
                if(err){
                    res.json({code:500})
                }else{
                    res.json({code:0})
                }
            })
        }
    })
})
configRoutes.post('/getPageControlConfig',(req,res)=>{
    if(!req.body.pageid){
        res.json({code:800})
        return
    }
    controlConfig.find({pageId:req.body.pageid},(err,doc)=>{
        if(err){
            res.json({code:500})
            return
        }
        res.json({code:0,data:doc})
    })
})
configRoutes.post('/savePageControlConfig',(req,res)=>{
    if(!req.body.data){
        res.json({code:800})
        return
    }
    let d = req.body.data
    if(d.length == 0){
        res.json({code:0})
        return
    }
    Promise.resolve(new Promise((req,rej)=>{
            controlConfig.remove({pageId:d[0].pageId},err=>{
                if(err){
                    rej({code:500})
                }
                d.forEach((item)=>{
                    let s = new controlConfig(item)
                    s.save((err)=>{
                        if(err){
                            rej({code:500})
                        }
                    })
                })
                req({code:0})
            })
    })
    ).then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json(err)
    })
})
configRoutes.post('/deleteSingleControl',(req,res)=>{
    if(!req.body.chartId){
        res.json({code:800})
        return
    }
    controlConfig.remove({chartId:req.body.chartId},err=>{
        if(err){
            res.json({code:500})
        }else{
            res.json({code:0})
        }
    })
})
configRoutes.post('/setBackgroundImage',(req,res)=>{
    if(!req.body.pageId||!req.body.backgroundImageUrl){
        return
    }
    pageConfig.find({pageId:req.body.pageId},(err,doc)=>{
        if(err){
            res.json({code:500})
            return
        }
        if(doc.length>0){
            doc.backgroundImageUrl = req.body.backgroundImageUrl

            let query = { pageId:req.body.pageId };
            pageConfig.findOneAndUpdate(query,{backgroundImageUrl:req.body.backgroundImageUrl},function(err, doc) {
                if(err){
                    res.json({code:500})
                }else{
                    res.json({code:0})
                }
            })
        }else{
            let s = new pageConfig({
                pageId:req.body.pageId,
                backgroundImageUrl:req.body.backgroundImageUrl
            })
            s.save(err=>{
                if(err){
                    res.json({code:500})
                }else{
                    res.json({code:0})
                }
            })
        }
    })
})
configRoutes.post('/getBackgroundImage',(req,res)=>{
    if(!req.body.pageId){
        res.json({code:800})
        return
    }
    pageConfig.findOne({pageId:req.body.pageId},(err,doc)=> {
        if(err){
            res.json({code:500})
        }else{
            res.json({code:0,data:doc})
        }
    })
})
configRoutes.post('/getDbConfigs',(req,res)=>{
    dbConfig.find({},(err,doc)=>{
        if(err){
            res.json({code:500})
        }
        else{
            res.json({code:0,data:doc})
        }
    })
})
configRoutes.post('/getDbConfig',(req,res)=>{
    if(!req.body.id){
        res.json({code:800})
        return
    }
    dbConfig.findOne({_id:req.body.id},(err,doc)=>{
        if(err){
            res.json({code:500})
        }
        else{
            res.json({code:0,data:doc})
        }
    })
})
configRoutes.post('/deleteDbConfig',(req,res)=>{
    if(!req.body.id){
        res.json({code:800})
        return
    }
    dbConfig.remove({_id:req.body.id},(err)=>{
        if(err){
            res.json({code:500})
        }else{
            res.json({code:0})
        }
    })
})
configRoutes.post('/saveDbConfig',(req,res)=>{
    if(!req.body.dbconnectionname||!req.body.dbtype||!req.body.dbhost||!req.body.dbservername||!req.body.dbusername||!req.body.dbpassword){
        res.json({code:800})
        return
    }
    dbConfig.findOne({dbconnectionname:req.body.dbconnectionname},(err,doc)=> {
        if(err){
            res.json({code:500})
        }else{
            if(doc){
                res.json({code:300})
            }else{
                let s = new dbConfig({
                    dbconnectionname:req.body.dbconnectionname,
                    dbtype:req.body.dbtype,
                    dbhost: req.body.dbhost,
                    dbservername: req.body.dbservername,
                    dbusername: req.body.dbusername,
                    dbpassword: req.body.dbpassword
                })
                s.save(err=>{
                    if(err){
                        res.json({code:500})
                    }else{
                        res.json({code:0})
                    }
                })
            }
        }
    })
})
configRoutes.post('/updateDbConfig',(req,res)=>{
    if(!req.body.dbconnectionname||!req.body.dbtype||!req.body.dbhost||!req.body.dbservername||!req.body.dbusername||!req.body.dbpassword){
        res.json({code:800})
        return
    }
    let query = { dbconnectionname:req.body.dbconnectionname }
    dbConfig.findOneAndUpdate(query,
        {
            dbtype:req.body.dbtype,
            dbhost: req.body.dbhost,
            dbservername: req.body.dbservername,
            dbusername: req.body.dbusername,
            dbpassword: req.body.dbpassword
        },function(err, doc) {
            if(err){
                res.json({code:500})
            }else{
                res.json({code:0})
            }
        })
})
module.exports =  configRoutes