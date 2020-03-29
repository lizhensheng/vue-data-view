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
                rej(e)
            }
        })
    }
    this.excuteSql =  (sql, limit, paging, where)=>{
        return new Promise(async (req,rej)=>{
            try {
                let countSql = ""
                if(where){
                    let filterSql = where.map(w => {
                        switch(w.type){
                            case 'y-date':
                                return `${w.params} = to_date('${w.value}', 'yyyy-MM-dd')`
                            case 'y-select':
                                return `${w.params} = '${w.value}'`
                            case 'y-input':
                                return `${w.params} like '%${w.value}%'`
                        }
                        return `${w.params} = '${w.value}'`
                    })
                    filterSql = filterSql.join(' and ')
                    sql =  `select * from (${sql}) a where ${filterSql}`
                }
                if(paging){
                    countSql = `select count(1) count from (${sql}) c`
                    sql = `select * from (select rownum as 序号,b.* from (${sql}) b where  rownum <= ${paging.pageIndex * paging.pageSize}) c where c.序号 > ${(paging.pageIndex-1) * paging.pageSize}`
                    
                }
                else{
                    if(!sql.toLowerCase().includes('rownum')){
                        limit = parseInt(limit)
                        sql = `select t.* from (${sql}) t where rownum < ${limit + 1}`
                    }
                }
                let res = await this.conn.execute(sql)
                if(paging){
                    let countResult = await this.conn.execute(countSql)
                    let total = countResult.rows[0].COUNT
                    req({
                        total: total,
                        data: res.rows
                    })
                }else{
                    req(res.rows)
                }
            }
            catch(e){
                rej(e)
            }
        })
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
        callback({data:result.rows,fields:result.metaData})
    }
    this.getPagingData = async (pageindex,pagesize,tablefields,tablename,callback)=>{
        let sql = ''
        let countSql = ''
        let totalCount = 0
        if(tablefields){
            sql = `select ${tablefields} from (select rownum as rowno,t.* from (${tablename}) t where  rownum<=${pageindex*pagesize}) t where t.rowno>${(pageindex-1)*pagesize}`
            countSql = `select count(*) cnt from (select rownum,t.* from (${tablename}) t)`
        }else{
            sql = `select *from (select rownum as rowno,t.* from ${tablename} t where  rownum<=${pageindex*pagesize}) t where t.rowno>${(pageindex-1)*pagesize}`
            countSql = `select count(*) cnt from ${tablename} t`
        }
        if(process.env.NODE_ENV !== 'production'){
            console.log(sql)
        }
        totalCount = await this.conn.execute(countSql)
        totalCount = totalCount.rows[0].CNT
        let result = await this.conn.execute(sql)
        callback({totalCount:totalCount,data:result.rows,fields:result.metaData})      
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