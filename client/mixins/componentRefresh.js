export default {
    mounted(){
        //定时刷新数据
        this.excute()
    },
    computed:{
        reflesh(){
            return this.props[1].fields[0].value.dataJson.isRefresh
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
        }
    },
    methods: {
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
        getRealTimeData(){
            let data = this.props[1].fields[0].value.dataJson.data
            this.$axios.post('/connection/excuteSql', {id: data.connectionSourceId, sql: data.sql, limit: data.limit })
            .then((res) =>{
                if(res.code === 200){
                    let json = JSON.stringify(res.body)
                    this.props[1].fields[0].value.dataJson.json = json
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