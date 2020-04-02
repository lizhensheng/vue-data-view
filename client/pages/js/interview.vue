<template>
    <el-tabs @tab-click="handleClick">
        <el-tab-pane label="统计网页中的标签">
            <monaco id="allpLabel" 
                    :value="allpLabel" 
                    language="javascript" 
                    :readOnly="false" 
                    :height="600">
            </monaco>
        </el-tab-pane>
        <el-tab-pane label="js深拷贝">
            <monaco id="deepCopy" 
                    :value="deepCopy" 
                    language="javascript" 
                    :readOnly="false" 
                    :height="600">
            </monaco>
        </el-tab-pane>
        <el-tab-pane label="原生ajax">
            <monaco id="ajax" 
                    :value="ajax" 
                    language="javascript" 
                    :readOnly="false" 
                    :height="600">
            </monaco>
        </el-tab-pane>
        <el-tab-pane label="防抖和节流">
            <monaco id="shake" 
                    :value="shake" 
                    language="javascript" 
                    :readOnly="false" 
                    :height="600">
            </monaco>
        </el-tab-pane>
        <el-tab-pane label="解析URL参数">
            <monaco id="parseUrl" 
                    :value="parseUrl" 
                    language="javascript" 
                    :readOnly="false" 
                    :height="600">
            </monaco>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import Monaco from '@/components/monaco/monaco'
export default {
    data(){
        return {
            allpLabel: `new Set([...document.querySelectorAll('*')].map(ele=>ele.tagName)).size`,
            deepCopy: `function deepClone(obj)
            {
                    if(obj === null) return null
                    if(typeof obj !=='object') return obj
                    if(typeof window !== 'undefined' && window.JSON){
                        return JSON.parse(JSON.stringify(obj))
                    }

                    if(obj instanceof RegExp){
                        return new RegExp(obj)
                    }

                    if(obj instanceof Date){
                        return new Date(obj)
                    }
                    let newObj = new obj.construtor
                    for(let key in obj){
                        if(obj.hasOwnProperty(key)){
                            newObj[key] = deepClone(obj[key])
                        }
                    }
                    return newObj
            }`,
            ajax: `funciton ajax(options){
                let method = options.method || 'get',
                    params = options.params,
                    data = options.data,
                    url = options.url + (params ? '?' + Object.keys(params).map(key => key + '=' + params[key] : ''
                    async = options.async === false ? false : true,
                    success = options.success,
                    headers = options.headers
                    
                let xhr
                if(window.XMLHttpRequest){
                    xhr = new XMLHttpRequest()
                } else {
                    xhr = new ActiveXObject('Microsoft.XMLHTTP')
                }
                
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4 && xhr.status === 200){
                        success && success(xhr.responseText)
                    }
                }
                
                xhr.open(method, url, async)
                
                if(headers){
                    Object.keys(Headers).forEach(key => xhr.setRequestHeader(key, headers[key]))
                }
                
                method === 'GET' ? xhr.send() : xhr.send(data)
            }`,
            shake: `const debounce = (fn, delay) => {
                    let timer = null
                    return (...args) => {
                        clearTimeout(timer)
                        timer = setTimeout(() => {
                            fn.apply(this, args)
                        }, delay)
                    }
                }
                const throttle = (fn, delay = 500) => {
                    let prev = Date.now()
                    return (...args) => {
                        let now = Date.now()
                        if(now - prev > delay){
                            fn.apply(this, args)
                            prev = Date.now()
                        }
                    }
                }
                `,
            parseUrl: `function parseParam(url){
                // 将浏览器地址中'?' 后面的字符串取出来
                const paramsStr = /.+\?(.+)$/.exec(url)[1]
                // 将截取的字符串以'&'分隔后存到数组中
                const paramsArr = paramsStr.split('&')
                // 定义存放解析后的对象
                let parmsObj = {}
                // 遍历
                paramsArr.forEach(param => {
                    // 判断是否含有key和value
                    if(/=/.test(param)){
                        // 结构获取对象的key和value
                        let [key, val] = param.split('=')
                        // 解码
                        val = decodeURIComponent(val)
                        // 判断是否转为数字
                        val = /^\d+$/.test(val) ? parseFloat(val) : val
                        // 判断存放对象中是否存在key属性
                        if(paramsObj.hasOwnProperty(key)){
                            // 存在的话就存放一个数组
                            paramsObj[key] = [].concat(paramsObj[key], val)
                        } else {
                            // 不存在就存放一个对象
                            paramsObj[key] = val
                        }
                    } else {
                        // 不存在就存放一个对象
                        paramsObj[key] = val
                    }
                } else {
                    // 没有value的情况
                    paramsObj[param] = true       
                }
              })
              return paramsObj
            }
            `
        }
    },
    mounted(){
        this.$bus.$emit('createMonacoInstance')
    },
    methods:{
        handleClick(){
            this.$bus.$emit('createMonacoInstance')
        }
    },
    components: {
        Monaco
    }
}
</script>

<style lang="stylus">
</style>