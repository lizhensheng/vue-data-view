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
//新建页面级工程
export function addPageProjectName(projectname) {
    return instance.post('/config/addPageProjectName',{projectname:projectname})
}
//获取配置的工程
export function getPageProjectName() {
    return instance.post('/config/getPageProjectName')
}
export function getAllPageProject() {
    return instance.post('/config/getAllPageProject')
}
//新建页面
export function addPageName(projectid,pagename) {
    return instance.post('/config/addPageName',{projectid:projectid,pagename:pagename})
}
export function getPageControlConfig(pageid) {
    return instance.post('/config/getPageControlConfig',{pageid:pageid})
}
export function savePageControlConfig(data) {
    return instance.post('/config/savePageControlConfig',{data:data})
}
export function deleteSingleControl(chartId) {
    return instance.post('/config/deleteSingleControl',{chartId:chartId})
}
export function setBackgroundImage(pageId,backgroundImageUrl) {
    return instance.post('/config/setBackgroundImage',{pageId,backgroundImageUrl})
}
export function getBackgroundImage(pageId) {
    return instance.post('/config/getBackgroundImage',{pageId})
}
export function saveDbConfig(dbconnectionname,dbtype,dbhost,dbservername,dbusername,dbpassword) {
    return instance.post('/config/saveDbConfig',{dbconnectionname,dbtype,dbhost,dbservername,dbusername,dbpassword})
}
export function getDbConfigs() {
    return instance.post('/config/getDbConfigs',{})
}
export function testConnection(dbtype,dbhost,dbservername,dbusername,dbpassword) {
    return instance.post('/config/testConnection',{dbtype,dbhost,dbservername,dbusername,dbpassword})
}

