const oracledb = require('oracledb')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
let dbOracle = function dbOracle() {
    this.conn = null
    this.host = null
    this.database = null
    this.username = null
    this.password = null
    this.createConnection = async (host,database,username,password)=>{
        this.host = host
        this.database = database
        this.username = username
        this.password = password
        this.conn = await oracledb.getConnection({
            user : username,
            password : password,
            connectString : `${host}/${database}`
        })
    }
    this.testConnection = (host,database,username,password)=>{
        return new Promise(async (req,rej)=>{
            try {
                let conn = await oracledb.getConnection({
                    user : username,
                    password : password,
                    connectString : `${host}/${database}`
                })
                conn.close()
                req()
            }
            catch(e){
                console.log(e)
                rej(e)
            }
        })
    }
    this.excuteSql = async (sql,callback)=>{
        const result = await this.conn.execute(sql)
        callback(result)
    }
    this.getTableNames = async (callback)=>{
        const result = await this.conn.execute(`select table_name from user_tables where TABLESPACE_NAME is not null and  user='${this.username}'`)
        callback(result.rows)
    }
    this.getDataset = async (tablefields,tablename,callback)=>{
        let sql = ''
        if(tablefields){
            sql = `select ${tablefields} from (select rownum,t.* from (${tablename}) t where rownum<21)`
        }else{
            sql = `select rownum,t.*from ${tablename} t where rownum<21`
        }
        const result = await this.conn.execute(sql)
        callback(result.rows)
    }
    // this.getTableCols = async (tablename)=>{
    //     const result = await this.conn.execute(`SELECT column_name, data_type FROM all_tab_cols WHERE table_name = '${tablename}'`)
    //     // eslint-disable-next-line no-console
    //     console.log(result)
    //     return result
    // }
    this.closeConnection = async ()=>{
        if(this.conn) {
            try {
                await this.conn.close()
            }
            catch(e){
                // eslint-disable-next-line no-console
                console.log(e)
            }
        }
    }
}

module.exports = dbOracle

//select table_name from user_tables where TABLESPACE_NAME is not null and  user='UserName'
//
//
// SELECT table_name, column_name, data_type FROM all_tab_cols WHERE table_name = 'tablename ';