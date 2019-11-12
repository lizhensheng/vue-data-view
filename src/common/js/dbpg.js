const pg = require('pg-then')
let pgConfig = require('./dbconfig')
let dbPg = function dbPg() {
    this.conn = null
    this.createConnection = async ()=>{
        this.conn = await pg.Client(`postgres://${pgConfig.username}:${pgConfig.password}@${pgConfig.host}`)
    }
    this.getTableNames = ()=>{
           return  this.conn.query(`select table_name from user_tables where TABLESPACE_NAME is not null and  user='${pgConfig.username}'`)
    }
    this.getTableCols = (tablename)=>{
        return  this.conn.query(`SELECT table_name, column_name, data_type FROM all_tab_cols WHERE table_name = '${tablename}'`)
    }
    this.closeConnection = async ()=>{
        if(this.conn) {
            try {
                await this.conn.end()
            }
            catch(e){
                // eslint-disable-next-line no-console
                console.log(e)
            }
        }
    }
}

module.exports = dbPg

//select table_name from user_tables where TABLESPACE_NAME is not null and  user='UserName'
//
//
// SELECT table_name, column_name, data_type FROM all_tab_cols WHERE table_name = 'tablename ';