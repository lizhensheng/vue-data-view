import instance from "../axios"
//获取数据表
export function getTableNames(id){
    return instance.post('/config/getTableNames', {id});
}
//获取数据集
export function getDataset(tablefields,tableName,id) {
    return instance.post('/config/getDataset',{tablefields:tablefields,tablename:tableName,id:id})
}
//保存数据源配置
export function setDataSource(tableName,sourceId,sourceName,tableFields) {
    return instance.post('/config/setDataSource',{tablename:tableName,sourceid:sourceId,sourcename:sourceName,tablefields: tableFields})
}
//删除数据源配置
export function deleteDataSource(id) {
    return instance.post('/config/deleteDataSource',{id})
}
//更新SQL模型数据配置
export function updateSqlDataSource(sourceName,tableName,sourceId,tableFields) {
    return instance.post('/config/updateSqlDataSource',{sourcename:sourceName,tablename:tableName,sourceid:sourceId,tablefields: tableFields})
}
//获取配置的工程
export function getDataProjects() {
    return instance.post('/config/getDataProjects',{})
}
//新建页面级工程
export function addPageProjectName(data) {
    return instance.post('/config/addPageProjectName',data)
}
export function editPageProjectName(data){
    return instance.post('/config/editPageProjectName',data)
}
//是否已存在页面或文件夹名称
export function hasExistPageProject(data){
    return instance.post('/config/hasExistPageProject',data)
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
export function deleteControls(pageId){
    return instance.post('/config/deleteControls',{pageId})
}
export function getBackgroundImage(pageId) {
    return instance.post('/config/getBackgroundImage',{pageId})
}
export function saveDbConfig(dbconnectionname,dbtype,dbhost,dbservername,dbusername,dbpassword) {
    return instance.post('/config/saveDbConfig',{dbconnectionname,dbtype,dbhost,dbservername,dbusername,dbpassword})
}
export function updateDbConfig(dbconnectionname,dbtype,dbhost,dbservername,dbusername,dbpassword) {
    return instance.post('/config/updateDbConfig',{dbconnectionname,dbtype,dbhost,dbservername,dbusername,dbpassword})
}
export function getDbConfigs() {
    return instance.post('/config/getDbConfigs',{})
}
export function getDbConfig(id) {
    return instance.post('/config/getDbConfig',{id})
}
export function deleteDbConfig(id) {
    return instance.post('/config/deleteDbConfig',{id})
}
export function testConnection(dbtype,dbhost,dbservername,dbusername,dbpassword) {
    return instance.post('/config/testConnection',{dbtype,dbhost,dbservername,dbusername,dbpassword})
}
export function getConfigByFunctionName(functionName,data){
    return instance.post(`/config/${functionName}`,data)
}

