const dbOracle = require('./dboracle')
const dbMssql = require('./dbmssql')
const dbPg = require('./dbpg')
const dbMysql = require('./dbmysql')
const Connecton = require('../models/connection')
let dbFactory = {
    createOperate : (operate)=>{
        let handle = null
        switch (operate) {
            case ORACLE:
                handle = new dbOracle()
                break
            case MSSQL:
                handle = new dbMssql()
                break
            case MYSQL:
                handle = new dbMysql()
                break
            case PGSQL:
                handle = new dbPg()
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

const ORACLE='oracle'
const MSSQL='mssql'
const MYSQL='mysql'
const PGSQL='postgress'

module.exports = dbFactory