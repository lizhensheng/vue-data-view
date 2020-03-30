<template>
    <div class="c-chartline" :id="localUUID">
        
    </div>
</template>

<script>
import moment  from 'moment'
import { Chart } from '@antv/g2'
import { createUUID } from '@/common/js/mUtils'
import componentRefresh from '@/mixins/componentRefresh'
//准备数据
const DATA = [{"DAY":"2020-03-14T16:00:00.000Z","NUM":300,"SERIES":"新增确诊"},{"DAY":"2020-03-14T16:00:00.000Z","NUM":105,"SERIES":"疑似"},{"DAY":"2020-03-14T16:00:00.000Z","NUM":120,"SERIES":"治愈"},{"DAY":"2020-03-14T16:00:00.000Z","NUM":3,"SERIES":"死亡"},{"DAY":"2020-03-15T16:00:00.000Z","NUM":254,"SERIES":"新增确诊"},{"DAY":"2020-03-15T16:00:00.000Z","NUM":85,"SERIES":"疑似"},{"DAY":"2020-03-15T16:00:00.000Z","NUM":42,"SERIES":"治愈"},{"DAY":"2020-03-15T16:00:00.000Z","NUM":1,"SERIES":"死亡"},{"DAY":"2020-03-16T16:00:00.000Z","NUM":352,"SERIES":"新增确诊"},{"DAY":"2020-03-16T16:00:00.000Z","NUM":152,"SERIES":"疑似"},{"DAY":"2020-03-16T16:00:00.000Z","NUM":405,"SERIES":"治愈"},{"DAY":"2020-03-16T16:00:00.000Z","NUM":1,"SERIES":"死亡"},{"DAY":"2020-03-17T16:00:00.000Z","NUM":200,"SERIES":"新增确诊"},{"DAY":"2020-03-17T16:00:00.000Z","NUM":50,"SERIES":"疑似"},{"DAY":"2020-03-17T16:00:00.000Z","NUM":402,"SERIES":"治愈"},{"DAY":"2020-03-17T16:00:00.000Z","NUM":0,"SERIES":"死亡"},{"DAY":"2020-03-18T16:00:00.000Z","NUM":250,"SERIES":"新增确诊"},{"DAY":"2020-03-18T16:00:00.000Z","NUM":102,"SERIES":"疑似"},{"DAY":"2020-03-18T16:00:00.000Z","NUM":12,"SERIES":"治愈"},{"DAY":"2020-03-18T16:00:00.000Z","NUM":14,"SERIES":"死亡"},{"DAY":"2020-03-19T16:00:00.000Z","NUM":102,"SERIES":"新增确诊"},{"DAY":"2020-03-19T16:00:00.000Z","NUM":2,"SERIES":"疑似"},{"DAY":"2020-03-19T16:00:00.000Z","NUM":403,"SERIES":"治愈"},{"DAY":"2020-03-19T16:00:00.000Z","NUM":0,"SERIES":"死亡"}]
  const SHAPE =  {
        '矩形': 'square',
        '圆形': 'circle',
        '三角型': 'triangle',
        '线型': 'line',
        '连字符': 'hyphen'
    }   
  const LAYOUT = {
      '水平排列': 'horizontal',
      '垂直排列': 'vertical'
  }
  const POSITION = {
      '上对齐': 'top',
      '上左对齐': 'top-left',
      '上右对齐': 'top-right',
      '下对齐': 'bottom',
      '下左对齐': 'bottom-left',
      '下右对齐': 'bottom-right',
      '左对齐': 'left',
      '左上对齐': 'left-top',
      '左下对齐': 'left-bottom',
      '右对齐': 'right',
      '右上对齐': 'right-top',
      '右下对齐': 'right-bottom'
  }
export default {
    name: 'CChartline',
    data(){
        return {
           localUUID: createUUID()
        }
    },
    mixins: [componentRefresh],
    props: {
        props:{
            type: Array,
            default: function(){
                return [{
                    fields:[]
                }]
            }
        },
        width:{
            type: Number,
            default: 300
        },
        height:{
            type: Number,
            default: 300
        },
        ratio:{
            type: Number,
            default: 1
        },
        uuid:String
    },
    computed:{
         dataTrigger(){
            if(this.props[1].fields[0].value.dataJson.json){
                let result = this.props[1].fields[0].value.dataJson.json
                return JSON.parse(result)
            }
            else{
                return DATA
            }
        },
        modelTrigger(){
            return this.props[1].fields[0].value.dataJson.model
        },
        LegendTextColor(){
            return this.props[0].fields[3].value[0].value.value
        },
        LegendStyle(){
            return this.props[0].fields[3].value[1].value.value
        },
        LegendAlign(){
            return this.props[0].fields[3].value[2].value.value
        },
        LegendPosition(){
            return this.props[0].fields[3].value[3].value.value
        },
        ChageColor(){
            return this.props[0].fields[3].value[4].value.value
        },
        xGrid(){
            return this.props[0].fields[4].value[0].value.value
        },
        xGridColor(){
            return this.props[0].fields[4].value[1].value.value
        },
        xLabelColor(){
            return this.props[0].fields[4].value[2].value.value
        },
        xLabelSize(){
            return this.props[0].fields[4].value[3].value.value
        },
        xLineColor(){
             return this.props[0].fields[4].value[4].value.value
        },
        xRotate(){
            return this.props[0].fields[4].value[5].value.value
        },
        xFormart(){
            return this.props[0].fields[4].value[6].value.value
        },
        xArea(){
            return this.props[0].fields[4].value[7].value.value
        },
        xPoint(){
            return this.props[0].fields[4].value[8].value.value
        },
        yGrid(){
            return this.props[0].fields[5].value[0].value.value
        },
        yGridColor(){
            return this.props[0].fields[5].value[1].value.value
        },
        yLabelColor(){
            return this.props[0].fields[5].value[2].value.value
        },
        yLabelSize(){
            return this.props[0].fields[5].value[3].value.value
        },
        yLineColor(){
             return this.props[0].fields[5].value[4].value.value
        }
    },
    watch:{
        dataTrigger(val){
            if(val&&this.chartInstance){
                this.chartInstance.destroy()
                this.initData()
            }     
        },
        modelTrigger(){
            if(this.chartInstance){
                this.chartInstance.destroy()
                this.initData()
            }
        },
        LegendTextColor(val){
            this.legend()
            this.chartInstance.render()
        },
        LegendStyle(val){
            this.legend()
            this.chartInstance.render()
        },
        LegendAlign(val){
            this.legend()
            this.chartInstance.render()
        },
        LegendPosition(val){
            this.legend()
            this.chartInstance.render()
        },
        ChageColor(){
             if(this.chartInstance){
                this.chartInstance.destroy()
                this.initData()
            }
        },
        xGrid(){
            this.axisX()
            this.chartInstance.render()
        },
        xGridColor(){
            this.axisX()
            this.chartInstance.render()
        },
        xLabelColor(){
            this.axisX()
            this.chartInstance.render()
        },
        xLabelSize(){
            this.axisX()
            this.chartInstance.render()
        },
        xLineColor(){
            this.axisX()
            this.chartInstance.render()
        },
        xRotate(){
            this.axisX()
            this.chartInstance.render()
        },
        xFormart(){
            this.axisX()
            this.chartInstance.render()
        },
        xArea(){
           if(this.chartInstance){
                this.chartInstance.destroy()
                this.initData()
            }   
        },
        xPoint(){
           if(this.chartInstance){
                this.chartInstance.destroy()
                this.initData()
            }   
        },
        yGrid(){
            this.axisY()
            this.chartInstance.render()
        },
        yGridColor(){
            this.axisY()
            this.chartInstance.render()
        },
        yLabelColor(){
            this.axisY()
            this.chartInstance.render()
        },
        yLabelSize(){
            this.axisY()
            this.chartInstance.render()
        },
        yLineColor(){
            this.axisY()
            this.chartInstance.render()
        },
        width(val){
            this.resizeChart()
        },
        height(val){
            this.resizeChart()
        }
    },
    mounted(){
       this.initData()
    },
    methods:{
        initData(){
            let width = parseInt(this.width)
            let height = parseInt(this.height)
            this.initMapping()
         
            this.chartInstance = new Chart({
                container: this.localUUID,
                autoFit: false,
                width: width,
                height: height
            })
            this.chartInstance.data(this.dataTrigger)
            let pos = `${this.mappings[0].field}*${this.mappings[1].field}`
            let col = this.mappings[2].field
            this.chartInstance.tooltip({
                showCrosshairs: true,
                shared: true,
                showTitle: false
            })
            if(this.xArea){
                this.chartInstance.area().adjust('stack').position(pos).color(col, this.ChageColor)
            } 
            if(this.xPoint){
                this.chartInstance.point().adjust('stack').position(pos).color(col, this.ChageColor)
            }
            this.chartInstance.line().adjust('stack').position(pos).color(col, this.ChageColor)
            this.axisX()
            this.axisY()
            this.legend()
            this.chartInstance.render()
        },
        initMapping(){
            let model = this.props[1].fields[0].value.dataJson.model
            this.mappings = model.map(m => {
                let field = m.field
                let mapping = m.mapping
                let key =  mapping || field
                return {field: key}
            })
            if(!this.props[1].fields[0].value.dataJson.json){
                this.mappings = [{
                    field: 'DAY'
                },{
                    field: 'NUM'
                },{
                    field: 'SERIES'
                }]
            }
        },
        resizeChart(){
            let width = parseInt(this.width) 
            let height = parseInt(this.height)
            this.chartInstance.changeSize(width,height)
        },
        legend(){
            this.chartInstance.legend({
                itemName: {
                    style:{fill: this.LegendTextColor}
                },
                marker:{
                    symbol: SHAPE[this.LegendStyle]
                },
                layout: LAYOUT[this.LegendAlign],
                position: POSITION[this.LegendPosition]
            })
        },
        axisX(){
            let grid = null
            if(this.xGrid){
                grid = {
                       line: {
                           style: {
                               lineWidth: 1,
                               stroke: this.yGridColor
                           }
                       }
                   }
            }else{
                grid = null
            }
            let format = null
            if(this.xFormart !== '不处理'){
                format = (date) => {
                    return moment(date).format(this.xFormart) 
                }
            }
            this.chartInstance.axis(this.mappings[0].field, {
                   grid: grid,
                   label: {
                       style: {
                           fill: this.xLabelColor,
                           fontSize: this.xLabelSize
                       },
                       autoRotate: false,
                       rotate: this.xRotate,
                       formatter: format
                   },
                   line: {
                       style: {
                           stroke: this.xLineColor
                       }
                   }
            })
        },
        axisY(){
            let grid = null
            if(this.yGrid){
                grid = {
                       line: {
                           style: {
                               lineWidth: 1,
                               stroke: this.yGridColor
                           }
                       }
                   }
            }else{
                grid = null
            }
            this.chartInstance.axis(this.mappings[1].field, {
                   grid: grid,
                   label: {
                       style: {
                           fill: this.yLabelColor,
                           fontSize: this.yLabelSize
                       }
                   },
                   line: {
                       style: {
                           stroke: this.yLineColor
                       }
                   }
            })
        }
    }
}
</script>

<style>
    .c-chartline{
        width: 100%;
        height: 100%;
    }
</style>