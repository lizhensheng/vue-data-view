const express = require('express')
const moment = require('moment')
const dbFactory = require('./src/common/js/dbfactory')
let {sourceConfig} = require('./src/server/db/db')
let configRoutes = express.Router()
/**
 * 获取数据表
 */
configRoutes.post('/getTableNames',async (req,res) => {
    if (req.body.dbtype){
        let dbtype = req.body.dbtype
        let handle = dbFactory.createOperate(dbtype)
        await handle.createConnection()
        await handle.getTableNames((result)=>{
            handle.closeConnection()
            if(result){
                res.json(result)
            }else{
                res.json({code:500})
            }
        })
    }else{
        res.json({code:500})
    }
})
/**
 * 获取数据表数据
 */
configRoutes.post('/getDataset',async (req,res)=>{
    if(req.body.tablename&&req.body.dbtype){
        let tablefields = req.body.tablefields
        let tablename = req.body.tablename
        let dbtype = req.body.dbtype
        let handle = dbFactory.createOperate(dbtype)
        await handle.createConnection()
        await handle.getDataset(tablefields,tablename,(result)=>{
            handle.closeConnection()
            if(result){
                res.json(result)
            }else{
                res.json({code:500})
            }
        })
    }else{
        res.json({code:500})
    }
})
/**
 * 保存数据源配置
 */
configRoutes.post('/setDataSource',(req,res)=>{
    if(!req.body.tablename||!req.body.dbtype||!req.body.sourcename||!req.body.tablefields){
        res.json({code:800})
        return
    }
    let s = new sourceConfig({
        dbtype:req.body.dbtype,
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
            res.json({code:1})
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
module.exports =  configRoutes