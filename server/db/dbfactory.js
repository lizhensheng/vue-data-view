const dbOracle = require('./dboracle')
const dbMysql = require('./dbmysql')
const Connecton = require('../models/connection')
let dbFactory = {
    createOperate : (operate)=>{
        let handle = null
        switch (operate) {
            case ORACLE:
                handle = new dbOracle()
                break
            case MYSQL:
                handle = new dbMysql()
                break
        }
        return handle
    },
    getConnection : (id)=>{
       return new Promise((req,rej)=>{
        Connecton.findOne({_id:id},(err,doc)=>{
               if(err) {
                   rej(err)
                   return
               }
               req(doc)
           })
       })
    }
}

const ORACLE='ORACLE'
const MYSQL='MYSQL'

module.exports = dbFactory