
const express = require('express')
const moment = require('moment')
const dbFactory = require('./src/common/js/dbfactory')
const {objectHasProperty} = require('./src/server/utils/util')
let {sourceConfig,projectPageConfig,controlConfig,pageConfig,dbConfig} = require('./src/server/db/db')
let configRoutes = express.Router()
/**
 * 获取数据表
 */
configRoutes.post('/getTableNames', (req,res) => {
    if(!objectHasProperty(req.body,['id'])) 
    {
        res.json({code:40001})
        return
    }
    let id = req.body.id
    dbFactory.getConnection(id)
        .then(async r=>{
            if(!res){
                res.json({code:40002})
                return
            }
            let handle = dbFactory.createOperate(r.dbtype)
            await handle.createConnection(r.dbhost,r.dbservername,r.dbusername,r.dbpassword)
            await handle.getTableNames((result)=>{
                handle.closeConnection()
                if(result){
                    res.json(result)
                }else{
                    res.json({code:40002})
                }
            })
        })
        .catch(err=>{
            console.log(err)
            res.json({code:40002})
        })
})
/**
 * 获取数据表数据
 */
configRoutes.post('/getDataset',async (req,res)=>{
    if(!objectHasProperty(req.body,['tablefields','tablename','id'])) 
    {
        res.json({code:40001})
        return
    }
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
                    res.json({code:40002})
                }
            })
        })
        .catch(e=>{
            console.log(e)
            res.json({code:40002})
        })
})
/**
 * 测试数据库连接
 */
configRoutes.post('/testConnection',(req,res)=>{
    if(!objectHasProperty(req.body,['dbtype','dbhost','dbservername','dbusername','dbpassword'])) 
    {
        res.json({code:40001})
        return
    }
    let dbtype = req.body.dbtype
    let handle = dbFactory.createOperate(dbtype)
    handle.testConnection(req.body.dbhost,req.body.dbservername,req.body.dbusername,req.body.dbpassword)
        .then(()=>{
            res.json({code:0})
        })
        .catch((err)=>{
            res.json({code:1})
        })
})
/**
 * 保存数据源配置
 */
configRoutes.post('/setDataSource',(req,res)=>{
    if(!objectHasProperty(req.body,['sourceid','tablename','sourcename','tablefields'])){
        res.json({code:40001})
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
            res.json({code:40002})
            return
        }
        if(doc){
            res.json({code:40002})
            return
        }
        s.save((err)=>{
            if(err){
                res.json({code:40002})
            }else{
                res.json({code:0})
            }
        })
    })
})
configRoutes.post('/deleteDataSource',(req,res)=>{
    if(!objectHasProperty(req.body,['id'])){
        res.json({code:40001})
        return
    }
    sourceConfig.remove({_id:req.body.id},err=>{
        if(err){
            res.json({code:40002})
        }else{
            res.json({code:0})
        }
    })
})
configRoutes.post('/getDataProjects',(req,res)=>{
    sourceConfig.find({},(err,doc)=>{
        if(err){
            res.json({code:40002})
            return
        }
        res.json({code:0,data:doc})
    })
})
configRoutes.post('/updateSqlDataSource',(req,res)=>{
    if(!objectHasProperty(req.body,['tablename','sourceid','sourcename','tablefields'])){
        res.json({code:40001})
        return
    }
    let query = { sourcename: req.body.sourcename };
    sourceConfig.findOneAndUpdate(query,{'tablename':req.body.tablename,sourceid:req.body.sourceid,tablefields:req.body.tablefields},function(err, doc) {
        if(err){
            res.json({code:40002})
        }else{
            res.json({code:0})
        }
    })
})
configRoutes.post('/addPageProjectName',(req,res)=>{
    if(!objectHasProperty(req.body,['label','pid','isfold'])){
        res.json({code:40001})
        return
    }
    let s = new projectPageConfig({
        pid:req.body.pid,
        label:req.body.label,
        isfold:req.body.isfold
    })
    projectPageConfig.findOne({label:req.body.label},(err,doc)=>{
        if(err){
            res.json({code:40002})
            return
        }
        if(doc){
            res.json({code:40003})
            return
        }
        s.save((err)=>{
            if(err){
                res.json({code:40002})
            }else{
                res.json({code:0})
            }
        })
    })
})
configRoutes.post('/editPageProjectName',(req,res)=>{
    if(!objectHasProperty(req.body,['label','_id'])){
        res.json({code:40001})
        return
    }
    let query = {_id:req.body._id}
    projectPageConfig.findOneAndUpdate(query,{label:req.body.label},function(err, doc) {
        if(err){
            res.json({code:40002})
        }else{
            res.json({code:0})
        }
    })
})
configRoutes.post('/deleteProjectPageConfig',(req,res)=>{
    if(!objectHasProperty(req.body,['_id'])){
        res.json({code:40001})
        return
    }
    projectPageConfig.findOne({pid:req.body._id},(err,doc)=>{
        if(err){
            res.json({code:40002})
            return
        }
        if(doc){
            res.json({code:40004,msg:'无法删除,含有子节点'})
        }
        projectPageConfig.remove({_id:req.body._id},(err)=>{
            if(err){
                res.json({code:40002})
                return
            }
            res.json({code:0})
        })
    })
})
configRoutes.post('/getPageProjectName',(req,res)=>{
    projectPageConfig.find({pid:'0'},(err,doc)=>{
        if(err){
            res.json({code:40002})
            return
        }
        res.json({code:0,data:doc})
    })
})
configRoutes.post('/getAllPageProject',(req,res)=>{
    projectPageConfig.find({},(err,doc)=>{
        if(err){
            res.json({code:40002})
            return
        }
        res.json({code:0,data:doc})
    })
})
configRoutes.post('/hasExistPageProject',(req,res)=>{
    if(!objectHasProperty(req.body,['label'])){
        res.json({code:40001})
        return
    }
    projectPageConfig.findOne({label:req.body.label},(err,doc)=>{
        if(err){
            res.json({code:40002})
            return
        }
        doc?res.json({code:0,data:true}):res.json({code:0,data:false})
    })
})
configRoutes.post('/addPageName',(req,res)=>{
    if(!objectHasProperty(req.body,['projectid','pagename'])){
        res.json({code:40001})
        return
    }
    projectPageConfig.findOne({label:req.body.pagename},(err,doc)=>{
        if(err){
            res.json({code:40002})
            return
        }
        if(doc){
            res.json({code:40002})
            return
        }else{
            let s = new projectPageConfig({
                pid:req.body.projectid,
                label:req.body.pagename
            })
            s.save((err)=>{
                if(err){
                    res.json({code:40002})
                }else{
                    res.json({code:0})
                }
            })
        }
    })
})
configRoutes.post('/getPageControlConfig',(req,res)=>{
    if(!objectHasProperty(req.body,['pageid'])){
        res.json({code:40001})
        return
    }
    controlConfig.find({pageId:req.body.pageid},(err,doc)=>{
        if(err){
            res.json({code:40002})
            return
        }
        res.json({code:0,data:doc})
    })
})
configRoutes.post('/savePageControlConfig',(req,res)=>{
    if(!objectHasProperty(req.body,['data'])){
        res.json({code:40001})
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
                    rej({code:40002})
                }
                d.forEach((item)=>{
                    let s = new controlConfig(item)
                    s.save((err)=>{
                        if(err){
                            rej({code:40002})
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
    if(!objectHasProperty(req.body,['chartId'])){
        res.json({code:40001})
        return
    }
    controlConfig.remove({chartId:req.body.chartId},err=>{
        if(err){
            res.json({code:40002})
        }else{
            res.json({code:0})
        }
    })
})
configRoutes.post('/deleteControls',(req,res)=>{
    if(!objectHasProperty(req.body,['pageId'])){
        res.json({code:40001})
        return
    }
    controlConfig.remove({pageId:req.body.pageId},err=>{
        if(err){
            res.json({code:40002})
        }else{
            res.json({code:0})
        }
    })
})
configRoutes.post('/setBackgroundImage',(req,res)=>{
    if(!objectHasProperty(req.body,['pageId','backgroundImageUrl'])){
        res.json({code:40001})
        return
    }
    pageConfig.find({pageId:req.body.pageId},(err,doc)=>{
        if(err){
            res.json({code:40002})
            return
        }
        if(doc.length>0){
            doc.backgroundImageUrl = req.body.backgroundImageUrl

            let query = { pageId:req.body.pageId };
            pageConfig.findOneAndUpdate(query,{backgroundImageUrl:req.body.backgroundImageUrl},function(err, doc) {
                if(err){
                    res.json({code:40002})
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
                    res.json({code:40002})
                }else{
                    res.json({code:0})
                }
            })
        }
    })
})
configRoutes.post('/getBackgroundImage',(req,res)=>{
    if(!objectHasProperty(req.body,['pageId'])){
        res.json({code:40001})
        return
    }
    pageConfig.findOne({pageId:req.body.pageId},(err,doc)=> {
        if(err){
            res.json({code:40002})
        }else{
            res.json({code:0,data:doc})
        }
    })
})
configRoutes.post('/getDbConfigs',(req,res)=>{
    dbConfig.find({},(err,doc)=>{
        if(err){
            res.json({code:40002})
        }
        else{
            res.json({code:0,data:doc})
        }
    })
})
configRoutes.post('/getDbConfig',(req,res)=>{
    if(!objectHasProperty(req.body,['id'])){
        res.json({code:40001})
        return
    }
    dbConfig.findOne({_id:req.body.id},(err,doc)=>{
        if(err){
            res.json({code:40002})
        }
        else{
            res.json({code:0,data:doc})
        }
    })
})
configRoutes.post('/deleteDbConfig',(req,res)=>{
    if(!objectHasProperty(req.body,['id'])){
        res.json({code:40001})
        return
    }
    dbConfig.remove({_id:req.body.id},(err)=>{
        if(err){
            res.json({code:40002})
        }else{
            res.json({code:0})
        }
    })
})
configRoutes.post('/saveDbConfig',(req,res)=>{
    if(!objectHasProperty(req.body,['dbconnectionname','dbtype','dbhost','dbservername','dbusername','dbpassword'])){
        res.json({code:40001})
        return
    }
    dbConfig.findOne({dbconnectionname:req.body.dbconnectionname},(err,doc)=> {
        if(err){
            res.json({code:40002})
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
                        res.json({code:40002})
                    }else{
                        res.json({code:0})
                    }
                })
            }
        }
    })
})
configRoutes.post('/updateDbConfig',(req,res)=>{
    if(!objectHasProperty(req.body,['dbconnectionname','dbtype','dbhost','dbservername','dbusername','dbpassword'])){
        res.json({code:40001})
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
                res.json({code:40002})
            }else{
                res.json({code:0})
            }
        })
})
module.exports =  configRoutes