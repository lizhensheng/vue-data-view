const oracledb = require('oracledb')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
let {oracleConfig} = require('./dbbase')
let dbOracle = function dbOracle() {
    this.conn = null
    this.createConnection = async ()=>{
        this.conn = await oracledb.getConnection({
            user : oracleConfig.username,
            password : oracleConfig.password,
            connectString : oracleConfig.host
        })
    }
    this.excuteSql = async (sql,callback)=>{
        const result = await this.conn.execute(sql)
        callback(result)
    }
    this.getTableNames = async (callback)=>{
        const result = await this.conn.execute(`select table_name from user_tables where TABLESPACE_NAME is not null and  user='${oracleConfig.username}'`)
        callback(result.rows)
    }
    this.getDataset = async (tablefields,tablename,callback)=>{
        if(tablename.indexOf(' ')>-1){
            callback('')
        }
        let sql = ''
        if(tablefields){
            sql = `select ${tablefields} from (select rownum,t.* from ${tablename} t where rownum<6)`
        }else{
            sql = `select rownum,t.*from ${tablename} t where rownum<6`
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