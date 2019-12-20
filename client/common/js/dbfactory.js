let dbOracle = require('./dboracle')
let dbMssql = require('./dbmssql')
let dbPg = require('./dbpg')
let dbMysql = require('./dbmysql')
let {dbConfig} = require('../../server/db/db')
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
           dbConfig.findOne({_id:id},(err,doc)=>{
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