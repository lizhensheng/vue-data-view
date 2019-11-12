let axios = require('axios')
//创建axios实例
let instance = axios.create({
    timeout: 30000, //请求超过5秒即超时返回错误
})
export function getControl(config) {
    return instance.post('/control/onDragInControl',{config:config})
}