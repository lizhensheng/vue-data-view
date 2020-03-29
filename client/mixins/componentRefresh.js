import bus from '@/eventBus/index'
import moment from 'moment'
import httpServer from '@client/service/httpServer' 
import { cloneDeep } from 'lodash'
export default {
    mounted(){
        //定时刷新数据
        this.excute()
        bus.$on('button-click', eventData => {
            let refleshList = eventData.filter(e => e.eventType === '刷新')
            let group = {}
            let pageElementData = window._projectInfo ? window._projectInfo.pages[0].elements : this.$parent.$parent.projectDataInfo.pages[0].elements
            //刷新数据
            refleshList.forEach(r => {
                if(group[r.eventAction.target]){
                group[r.eventAction.target].push(r.eventAction)
                }
                else{
                    group[r.eventAction.target] = []
                    group[r.eventAction.target].push(r.eventAction)
                }
            })
            if(group[this.uuid]){
                let searchDependList = group[this.uuid]
                let whereModel = []
                searchDependList.map(s => {
                    let dependId = s.source
                    let index = pageElementData.findIndex(p => {
                        return p.uuid === dependId
                    })
                    if(index > -1){
                        let info = pageElementData[index].props[0].fields[3]
                        if(s.params && info.value.value){
                            s.value = this.format(info.value)
                            s.type = info.type
                            whereModel.push(s)
                        }
                    }
                })
                if(whereModel.length>0){
                    this.getRealTimeData(whereModel)
                }else{
                    this.getRealTimeData()
                }
            }
        })
    },
    computed:{
        reflesh(){
            return this.props[1].fields[0].value.dataJson.isRefresh
        },
        changePage(){
            if(this.props[1].fields[0].value.dataJson.data.paging){
                return this.props[1].fields[0].value.dataJson.data.paging.pageIndex
            }else{
                return 1
            }
        }
    },
    watch:{
        reflesh(val){
            if(!val && this.runId){
                clearInterval(this.runId)
            }else if(val){
                if(this.runId){
                    clearInterval(this.runId)
                }
                this.excute()
            }
        },
        changePage(val){
            this.getRealTimeData(this.props[1].fields[0].value.dataJson.data.where, true)
        }
    },
    methods: {
        format(item){
            let format = item.format
            if(format){
                return moment(item.value).format(format)
            }else {
                return item.value
            }
        },
        excute(){
            let isRefresh =  this.props[1].fields[0].value.dataJson.isRefresh
            let dataType = this.props[1].fields[0].value.dataJson.dataType
            if( isRefresh && dataType!= 'static'){
                let interval = this.props[1].fields[0].value.dataJson.refreshInterval
                this.runId = setInterval(() => {
                    this.getRealTimeData()
                }, interval * 1000)
            }
        },
        getRealTimeData(whereModel = '', isPaging = false){
            let data = this.props[1].fields[0].value.dataJson.data
            if(data.sql === ""){
                return
            }
            if(whereModel){
                //数据配置校验
                let json = this.props[1].fields[0].value.dataJson.json
                let keys = []
                try{
                    keys = Object.keys((JSON.parse(json))[0])
                }
                catch(e){
                    console.log(e.message)
                }
                if(keys.length > 0){
                    let isValid = whereModel.every(w => {
                        return keys.toString().toLowerCase().includes(w.params.toLowerCase())
                    })
                    if(!isValid){
                        return
                    }
                }
            } 
            let paging = data.paging ? cloneDeep(data.paging) : ''
            
            if(!isPaging && paging){
                paging.pageIndex = 1
            }
            httpServer.post('/connection/excuteSql', {id: data.connectionSourceId, sql: data.sql, limit: data.limit, paging: paging, where: whereModel})
            .then((res) =>{
                if(res.code === 200){
                    let result =res.body
                    this.props[1].fields[0].value.dataJson.data.where = whereModel
                    if(paging){
                        this.props[1].fields[0].value.dataJson.json = JSON.stringify(result.data)
                        this.props[1].fields[0].value.dataJson.data.paging.total = result.total
                    }else{
                        this.props[1].fields[0].value.dataJson.json = JSON.stringify(result)
                    }
                }
            })
            .catch(e => {
                console.warn(e.message)
            })
        }
    },
    destroyed(){
        if(this.runId){
            clearInterval(this.runId)
        }
    }
}