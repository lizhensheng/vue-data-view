<template>
    <div class="c-chartpie" :id="localUUID">
        
    </div>
</template>

<script>
import moment  from 'moment'
import { Chart } from '@antv/g2'
import { createUUID } from '@/common/js/mUtils'
import componentRefresh from '@/mixins/componentRefresh'
import { cloneDeep } from 'lodash'
//准备数据
const DATA = [{"item":"示例一","count":40, "percent": 0.2},{"item":"示例二","count":50, "percent": 0.2},{"item":"示例三","count":60, "percent": 0.2},{"item":"示例四","count":80, "percent": 0.2},{"item":"示例五","count":180, "percent": 0.2}]
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
    name: 'CChartpie',
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
        ChageColor(val){
             if(this.chartInstance){
                this.chartInstance.destroy()
                this.initData()
            }
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
            this.chartInstance.coordinate('theta', {
                radius: 0.75
            })
            let mData = this.dataTrigger
            this.chartInstance.data(mData)
            this.chartInstance.scale(this.mappings[2].field, {
                formatter: (val) => {
                    val = (val * 100).toFixed(0) + '%'
                    return val
                }
            })
            this.chartInstance.interval().position(this.mappings[2].field).color(this.mappings[0].field, this.ChageColor) 
            .label('percent', {
                content: (data) => {
                    return `${data[this.mappings[0].field]}: ${data[this.mappings[1].field]}`
                }
            })
            .adjust('stack')
            this.chartInstance.tooltip({
                showMarkers: false,
                showTitle: false
            })
            this.legend()
            this.chartInstance.interaction('element-active')
            this.chartInstance.render()
        },
        initMapping(){
            let model = this.props[1].fields[0].value.dataJson.model
            this.mappings =model.map(m => {
                let field = m.field
                let mapping = m.mapping
                let key =  mapping || field
                return {field: key}
            })
            if(!this.props[1].fields[0].value.dataJson.json){
                this.mappings = [{
                    field: 'item'
                },{
                    field: 'count'
                },{
                    field: 'percent'
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
        }
    }
}
</script>

<style>
    .c-chartpie{
        width: 100%;
        height: 100%;
    }
</style>