import instance from "../axios"
//获取数据表
export function getTableNames(dbType){
    return instance.post('/config/getTableNames', {dbtype:dbType});
}
//获取数据集
export function getDataset(tablefields,tableName,dbType) {
    return instance.post('/config/getDataset',{tablefields:tablefields,tablename:tableName,dbtype:dbType})
}
//保存数据源配置
export function setDataSource(tableName,dbType,sourceName,tableFields) {
    return instance.post('/config/setDataSource',{tablename:tableName,dbtype:dbType,sourcename:sourceName,tablefields: tableFields})
}
//更新SQL模型数据配置
export function updateSqlDataSource(sourceName,tableName,dbType,tableFields) {
    return instance.post('/config/updateSqlDataSource',{sourcename:sourceName,tablename:tableName,dbtype:dbType,tablefields: tableFields})
}
//获取配置的工程
export function getDataProjects() {
    return instance.post('/config/getDataProjects',{})
}
