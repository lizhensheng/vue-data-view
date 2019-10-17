const sql  = require('mssql')
let mssqlConfig = require('./dbbase')
let dbMssql = function dbMssql() {
    this.conn = null
    this.createConnection = async ()=>{
        this.conn = await sql.connect(`mssql://${mssqlConfig.username}:${mssqlConfig.password}@${mssqlConfig.host}`)
    }
    this.getTableNames = async ()=>{
        const result = await this.conn.query(`select table_name from user_tables where TABLESPACE_NAME is not null and  user='${mssqlConfig.username}'`)
        // eslint-disable-next-line no-console
        console.log(result)
        return result
    }
    this.getTableCols = async (tablename)=>{
        const result = await this.conn.query(`SELECT table_name, column_name, data_type FROM all_tab_cols WHERE table_name = '${tablename}'`)
        // eslint-disable-next-line no-console
        console.log(result)
        return result
    }
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

module.exports = dbMssql

//select table_name from user_tables where TABLESPACE_NAME is not null and  user='UserName'
//
//
// SELECT table_name, column_name, data_type FROM all_tab_cols WHERE table_name = 'tablename ';