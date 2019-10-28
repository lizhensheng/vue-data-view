<template>
    <div class="chart" ref="chart">
        <vue-draggable-resizable :x="x"
                                 :y="y"
                                 :w="width"
                                 :h="height"
                                 @dragging="(left, top) =>onDrag('chart1572251851000',left,top)"
                                 @resizing="(x, y, width, height) =>onResize('chart1572251851000',x, y, width, height)"
                                 @activated="onActivated('chart1572251851000')">
            <div @click="deleteChart('chart1572251851000')" class="delete">删除</div>
            <div class="chart" ref="chart1572251851000"
                               style="width: 300px;height:300px;"
                               data-width="300" data-height="300" data-x="585" data-y="165"></div>
        </vue-draggable-resizable>
    </div>
</template>
<script>
    import './chart.styl'
    let echarts = require('echarts')
    import {getChartData} from "api/bar"
    import {getCommonConfig} from "common/js/normalize"
    import {socket} from "common/js/socket-client"
    import jsonobj from "common/js/chalk.project.json"
    import {mapGetters,mapMutations} from 'vuex'
    import {baseConfigApi} from 'common/js/config'
    export default {
        data(){
            return {
                x:0,
                y:0,
                width:10,
                height:10,
                chartId:'chart1572251851000'
            }
        },
        mounted() {
            let mconfig = {"chartId":"chart1572251851000","config":{"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"","textStyle":{"color":"#D6BC28","fontSize":14}},"textStyle":{"color":"#fff"}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"test1"},{"id":"SZFPZZMJ","name":"test2"}]},"dataUrl":"http://localhost:8888/api/line/ydys/v1","width":300,"height":300,"dx":585,"dy":165},"chartType":1}
            this.commonConfig = mconfig.config.commonConfig
            this.userConfig = mconfig.config.userConfig
            this.dataUrl = mconfig.config.dataUrl
            this.chartType = 1
            echarts.registerTheme('chalk',jsonobj)
            this.$echarts = echarts.init(this.$refs.chart1572251851000, 'chalk', {
                width: mconfig.config.width,
                height: mconfig.config.height
            })
            //this.$echarts.showLoading('default')
            getChartData(this.dataUrl).then((res)=>{
                //this.$echarts.hideLoading()
                let tempConfig = getCommonConfig(res.data,this.commonConfig,this.userConfig,this.chartType)
                this.$echarts.setOption(tempConfig)
                this.x = mconfig.config.dx
                this.y = mconfig.config.dy
                this.width = mconfig.config.width
                this.height = mconfig.config.height
                this.setPosition({id:this.chartId,chartType:this.chartType,x:mconfig.config.dx,y:mconfig.config.dy,width:mconfig.config.width,height:mconfig.config.height,xData:this.userConfig.x,yData:[],yFields:this.userConfig.y,dataId:'',dataUrl:this.dataUrl})
            })
        },
        computed:{
             ...mapGetters(
                ['storePosition','increaseId','increaseIdForData']
             )
        },
        watch:{
            increaseId(){
                let pos = this.storePosition(this.chartId)
                if(this.x != pos.x){
                    this.x = pos.x
                }
                if(this.y != pos.y){
                    this.y = pos.y
                }
                if(this.width != pos.width){
                    this.width = pos.width
                    this.$echarts.resize({width:pos.width})
                }
                if(this.height != pos.height){
                    this.height = pos.height
                }
            },
            increaseIdForData(){
                this._refreshData()
            }
        },
        methods:{
            _refreshData(){
                let pos = this.storePosition(this.chartId)
                if(!pos.xData || pos.yData.length === 0 || pos.yFields.length === 0 || !pos.dataId){
                    return
                }
                let dataUrl = `${baseConfigApi}/api/getChartDataDynamic?id=${pos.dataId}`
                this.setPosition({id:this.chartId,dataUrl: dataUrl})
                getChartData(dataUrl).then((res)=>{
                    this.userConfig.x = pos.xData
                    this.userConfig.y = pos.yFields
                    let tempConfig = getCommonConfig(res.data,this.commonConfig,this.userConfig,this.chartType)
                    this.$echarts.clear()
                    this.$echarts.setOption(tempConfig)
                })
            },
            onDrag(id,x,y){
                let position = {
                   dx:x,
                   dy:y,
                   chartId:id
                }
                this.setPosition({id:this.chartId,x:x,y:y,width:this.width,height:this.height})
                socket.emit('onDragInPanel',JSON.stringify(position))
            },
            onResize(id,x,y,width,height){
               let position = {
                   dx:x,
                   dy:y,
                   width:width,
                   height:height,
                   chartId:id
               }
               this.setPosition({id:this.chartId,x:x,y:y,width:width,height:height})
               this.$echarts.resize({width:width,height:height})
               socket.emit('onDragInPanel',JSON.stringify(position))
            },
            deleteChart(id){
                  if(!this.$echarts.isDisposed()){
                       this.$echarts.clear()
                       this.$echarts.dispose()
                   }
                   this.$refs.chart.innerHTML=''
                   this.setDeletePosition({id:id})
            },
            onActivated(id){
                this.setChartId(id)
                this.setIncreaseId(this.increaseId+1)
            },
            ...mapMutations({
                setChartId:'SET_CHART_ID',
                setPosition:'SET_POSITION',
                setIncreaseId:'SET_INCREASE_ID',
                setIncreaseUpdateData:'SET_INCREASE_UPDATE_DATA',
                setDeletePosition:'SET_DELETE_POSITION'
            })
        }
    }
</script>