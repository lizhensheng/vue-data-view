import instance from "../axios"
//获取数据表
export function getTableNames(dbType){
    return instance.post('/config/getTableNames', {dbtype:dbType});
}
//获取数据集
export function getDataset(tableName,dbType) {
    return instance.post('/config/getDataset',{tablename:tableName,dbtype:dbType})
}
//保存数据源配置
export function setDataSource(tableName,dbType,sourceName) {
    return instance.post('/config/setDataSource',{tablename:tableName,dbtype:dbType,sourcename:sourceName})
}