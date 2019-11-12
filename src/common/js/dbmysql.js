const mysql  = require('mysql')
let {mysqlConfig} = require('./dbconfig')
let dbMysql = function dbMysql() {
    this.conn = null
    this.createConnection =  ()=>{
        this.conn =  mysql.createConnection(`mysql://${mysqlConfig.username}:${mysqlConfig.password}@${mysqlConfig.host}/${mysqlConfig.database}`)
    }
    this.excuteSql = async (sql,callback)=>{
        await this.conn.query(sql, (error, result, fields) => {
            if (error) {
                console.log(error)
            }
            callback(result)
        })
    }
    this.getTableNames = async (callback)=> {
            await this.conn.query(`select table_name from information_schema.tables where table_schema='${mysqlConfig.database}'`,  (error, result, fields) => {
                if (error) {
                    console.log(error)
                }
                callback(result)
            })
    }
    this.getDataset = async (tablefields,tablename,callback)=>{
        let sql = ''
        if(tablefields){
            if(tablename.toUpperCase().includes('SELECT')){
                sql = `select ${tablefields} from (${tablename}) t limit 20`
            }
            else{
                sql = `select ${tablefields} from ${tablename} t limit 20`
            }
        }else{
            sql = `select *from ${tablename} limit 20`
        }
        await this.conn.query(sql,  (error, result, fields) => {
            if (error) {
                console.log(error)
            }
            callback(result)
        })
    }
    // this.getTableCols = (tablename)=> {
    //     return new Promise((resolve, reject) => {
    //         this.conn.query(`select column_name, data_type from information_schema.columns where table_schema ='${mysqlConfig.database}' and table_name = '${tablename}'`, function (error, result, fields) {
    //             if (error) {
    //                 reject(error)
    //             }
    //             console.log(result)
    //             resolve(result)
    //         })
    //     })
    // }
    this.closeConnection =  ()=>{
        if(this.conn) {
            try {
                 //this.conn.release()
            }
            catch(e){
                // eslint-disable-next-line no-console
                console.log(e)
            }
        }
    }
}

module.exports = dbMysql

//select table_name from user_tables where TABLESPACE_NAME is not null and  user='UserName'
//
//
// SELECT table_name, column_name, data_type FROM all_tab_cols WHERE table_name = 'tablename ';