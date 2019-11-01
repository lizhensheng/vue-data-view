<template>
    <div class="chart" ref="chart">
        <vue-draggable-resizable :x="x"
                                 :y="y"
                                 :w="width"
                                 :h="height"
                                 @dragging="(left, top) =>onDrag('<%- config.chartId%>',left,top)"
                                 @resizing="(x, y, width, height) =>onResize('<%- config.chartId%>',x, y, width, height)"
                                 @activated="onActivated('<%- config.chartId%>')"  ref="draggable">
            <div @click="deleteChart('<%- config.chartId%>')" class="delete">删除</div>
            <div ref="<%- config.chartId%>"
                               style="width: <%- config.config.width%>px;height:<%- config.config.height%>px;"
                               data-width="<%- config.config.width%>" data-height="<%- config.config.height%>" data-x="<%- config.config.dx%>" data-y="<%- config.config.dy%>"></div>
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
    import {chartConfigClass} from 'common/js/chartConfigClass'
    import {deepCopy} from 'common/js/imputil'
    export default {
        data(){
            return {
                x:0,
                y:0,
                width:10,
                height:10,
                chartId:'<%- config.chartId%>'
            }
        },
        mounted() {
            let mconfig = <%- JSON.stringify(config)%>
            this.commonConfig = mconfig.config.commonConfig
            this.userConfig = mconfig.config.userConfig
            this.dataUrl = mconfig.config.dataUrl
            this.chartType = <%- config.chartType%>
            echarts.registerTheme('chalk',jsonobj)
            this.$echarts = echarts.init(this.$refs.<%- config.chartId%>, 'chalk', {
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
                let conf = deepCopy(chartConfigClass)
                conf.id = this.chartId
                conf.chartType = this.chartType
                conf.x = mconfig.config.dx
                conf.y = mconfig.config.dy
                conf.width = mconfig.config.width
                conf.height = mconfig.config.height
                conf.xData = this.userConfig.x
                conf.yData = []
                conf.yFields = this.userConfig.y
                conf.dataId = ''
                conf.dataUrl = this.dataUrl
                conf.backgroundColor=mconfig.config.backgroundColor,
                conf.borderRadius=mconfig.config.borderRadius,
                conf.borderWidth=mconfig.config.borderWidth,
                conf.borderStyle=mconfig.config.borderStyle,
                conf.borderColor=mconfig.config.borderColor
                this.setPosition(conf)
                if(conf.backgroundColor){
                    this.$refs.draggable.$el.style.backgroundColor = conf.backgroundColor
                }
                if(conf.borderRadius){
                    this.$refs.draggable.$el.style.borderRadius = conf.borderRadius+'px'
                }
                if(conf.borderRadius){
                    this.$refs.draggable.$el.style.borderWidth = conf.borderWidth+'px'
                }
                if(conf.borderStyle){
                    this.$refs.draggable.$el.style.borderStyle = conf.borderStyle
                }
                if(conf.borderColor){
                    this.$refs.draggable.$el.style.borderColor = conf.borderColor
                }
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
                if(pos.backgroundColor){
                    this.$refs.draggable.$el.style.backgroundColor = pos.backgroundColor
                }
                this.$refs.draggable.$el.style.borderRadius = pos.borderRadius+'px'
                this.$refs.draggable.$el.style.borderWidth = pos.borderWidth+'px'
                if(pos.borderStyle){
                    this.$refs.draggable.$el.style.borderStyle = pos.borderStyle
                }
                if(pos.borderColor){
                    this.$refs.draggable.$el.style.borderColor = pos.borderColor
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