let dbOracle = require('./dboracle')
let dbMssql = require('./dbmssql')
let dbPg = require('./dbpg')
let dbMysql = require('./dbmysql')
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
    }
}

const ORACLE='oracle'
const MSSQL='mssql'
const MYSQL='mysql'
const PGSQL='postgress'

module.exports = dbFactory