const mysql  = require('mysql')
let dbMysql = function dbMysql() {
    this.conn = null
    this.host = null
    this.database = null
    this.username = null
    this.password = null
    this.createConnection = (host,database,username,password)=>{
        this.host = host
        this.database = database
        this.username = username
        this.password = password
        this.conn =  mysql.createConnection(`mysql://${username}:${password}@${host}/${database}`)
    }
    this.testConnection = (host,database,username,password)=>{
        return new Promise((req,rej)=>{
            let conn = mysql.createConnection(`mysql://${username}:${password}@${host}/${database}`)
            conn.connect(function(err) {
                if (err) {
                    console.error('error connecting: ' +err.code);
                    rej(err)
                }
                conn.end()
                req()
            })
        })
    }
    this.excuteSql =  (sql, limit, paging, where)=>{
        return new Promise((req,rej)=>{
            if(where){
                let filterSql = where.map(w => {
                    switch(w.type){
                        case 'y-date':
                            return `datediff(w.params, '${w.value}') = 0`
                    }
                    return `${w.params} = '${w.value}'`
                })
                filterSql.join(' and ')
                sql =  `select * from (${sql}) a where ${filterSql}`
            }
            if(paging){
                sql = `select *from (${sql}) t  limit ${(paging.pageIndex-1)*paging.pageSize},${paging.pageSize}`
            }else{
                if(!sql.toLowerCase().includes('limit')){
                    sql = `${sql} limit ${limit}`
                }
            }
            this.conn.query(sql, (error, result, fields) => {
                if (error) {
                    rej(error)
                }
                req(result)
            })
        })
    }
    this.getTableNames = async (callback)=> {
            await this.conn.query(`select table_name from information_schema.tables where table_schema='${this.database}'`,  (error, result, fields) => {
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
            callback({data:result,fields:fields})
        })
    }
    this.getPagingData = async (pageindex,pagesize,tablefields,tablename,callback) => {
        let sql = ''
        let countSql = ''
        let totalCount = 0
        if(tablefields){
            if(tablename.toUpperCase().includes('SELECT')){
                sql = `select ${tablefields} from (${tablename}) t limit ${(pageindex-1)*pagesize},${pagesize}`
                countSql = `select count(*) cnt from (${tablename}) t`
            }
            else{
                sql = `select ${tablefields} from ${tablename} t  limit ${(pageindex-1)*pagesize},${pagesize}`
                countSql = `select count(*) cnt from ${tablename}`
            }
        }else{
            sql = `select *from ${tablename}  limit ${(pageindex-1)*pagesize},${pagesize}`
            countSql = `select count(*) cnt from ${tablename}`
        }
        if(process.env.NODE_ENV !== 'production'){
            console.log(sql)
        }
        await this.conn.query(countSql,  (error, result, fields) => {
            if (error) {
                console.log(error)
            }
            totalCount = result[0].CNT
            this.conn.query(sql,  (error, result, fields) => {
                if (error) {
                    console.log(error)
                }
                callback({totalCount:totalCount,data:result,fields:fields})
            })  
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
                this.conn.end()
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