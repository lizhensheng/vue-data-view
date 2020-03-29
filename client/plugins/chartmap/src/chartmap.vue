<template>
    <div class="c-chartmap" :id="localUUID"></div>
</template>

<script>
import DataSet from '@antv/data-set'
import { Chart } from '@antv/g2'
import { createUUID } from '@/common/js/mUtils'
// 可视化用户数据
const DATA =[{"name":"北京市","value":300},{"name":"天津市","value":999},{"name":"河北省","value":6666},{"name":"山西省","value":127},{"name":"内蒙古自治区","value":61},{"name":"辽宁省","value":84},{"name":"吉林省","value":1},{"name":"黑龙江省","value":83},{"name":"上海市","value":54},{"name":"江苏省","value":69},{"name":"浙江省","value":35},{"name":"安徽省","value":6},{"name":"福建省","value":61},{"name":"江西省","value":71},{"name":"山东省","value":48},{"name":"河南省","value":91},{"name":"湖北省","value":27},{"name":"湖南省","value":80},{"name":"广东省","value":86},{"name":"广西壮族自治区","value":1},{"name":"重庆市","value":71},{"name":"四川省","value":81},{"name":"贵州省","value":8},{"name":"云南省","value":8},{"name":"西藏自治区","value":75},{"name":"陕西省","value":3},{"name":"甘肃省","value":72},{"name":"青海省","value":60},{"name":"宁夏回族自治区","value":29},{"name":"新疆维吾尔自治区","value":99},{"name":"台湾省","value":70},{"name":"香港特别行政区","value":37},{"name":"澳门特别行政区","value":58}]
export default {
    name: 'CChartmap',
    data(){
        return {
           localUUID: createUUID()
        }
    },
    mounted(){
        this.initData()
    },
    props:{
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
            default: 600
        },
        height:{
            type: Number,
            default: 600
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
        levelNums(){
             let nums = this.props[0].fields[3].value[0].value.value
             let arr = nums.split(',')
             arr.push(100000000)
             return arr
        },
        levelColors(){
            let colors = this.props[0].fields[3].value[1].value.value
            let arr = colors.split(',')
            return arr
        }
    },
    watch:{
         dataTrigger(){
            if(this.chartInstance){
                this.initMapping()
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
    methods: {
       initData(){
            this.initMapping()
            let width = parseInt(this.width)
            let height = parseInt(this.height)
            fetch('/data/china.json')
            .then(res => res.json())
            .then((mapData) => {
                let res = mapData.features.filter(f => {
                    return  f.properties.name !== ''
                })
                this.mapData = {
                    type: "FeatureCollection",
                    features: res
                }
                this.chartInstance = new Chart({
                    container: this.localUUID,
                    autoFit: false,
                    width: this.width,
                    height: this.height,
                    padding: [10, 10]
                });
                this.chartInstance.tooltip({
                    showTitle: false,
                    showMarkers: false,
                    shared: false,
                });
                // 同步度量
                this.chartInstance.scale({
                    longitude: {
                        sync: true
                    },
                    latitude: {
                        sync: true
                    }
                });
                this.chartInstance.axis(false);
                this.renderMap()
           })
           .catch(e => {
               console.log(e.message)
           })
       },
       renderMap(){
         
                // 绘制地图背景
                const ds = new DataSet();
                const worldMap = ds.createView('back')
                .source(this.mapData, {
                    type: 'GeoJSON'
                });
                const worldMapView = this.chartInstance.createView()
                    worldMapView.data(worldMap.rows);
                    worldMapView.tooltip(false);
                    worldMapView.polygon().position('longitude*latitude').style({
                    fill: '#fff',
                    stroke: '#ccc',
                    lineWidth: 1
                });
                const userDv = ds.createView()
                .source(this.dataTrigger)
                .transform({
                    geoDataView: worldMap,
                    field: this.mappings[0].field,
                    type: 'geo.region',
                    as: ['longitude', 'latitude']
                })
                .transform({
                    type: 'map',
                    callback: obj => {
                        obj.trend = obj[this.mappings[1].field]
                        return obj;
                    }
                });
                const userView = this.chartInstance.createView()
                userView.data(userDv.rows);
                let obj = {}
                obj[this.mappings[0].field] = {alias: '地区'}
                obj['trend'] = {alias: '新增确诊'}
                userView.scale(obj);

                userView.polygon()
                .position('longitude*latitude')
                .color('trend', val => {
                    return this.getLevelColor(val)
                })
                .tooltip(`${this.mappings[0].field}*trend`)
                .label(this.mappings[0].field, {
                   layout: {
                        type: 'fixed-overlap',
                    },
                    offsetX: 10,
                    offsetY: 20,
                    style: {
                        fill: 'black'
                    }
                })
                .style({
                    fillOpacity: 0.85
                })
                .animate({
                    leave: {
                    animation: 'fade-out'
                    }
                })
                 this.chartInstance.legend(this.mappings[0].field, false)
                let items = this.getItems()
                this.chartInstance.legend('trend', {
                    position: 'left',
                    layout: 'vertical',
                    custom: true,
                    items: items,
                    offsetY: 50
                });

                userView.interaction('element-active')
                this.chartInstance.render();
       },
       getItems(){
           let arr = []
           this.levelNums.forEach((l,index) => {
               if(index == this.levelNums.length - 1){
                   return
               }
               else if(index == this.levelNums.length - 2){
                   arr.push({
                       name: `${this.levelNums[index]}人及以上`,
                       value: index,
                       marker: {
                           style: {
                               fill: this.levelColors[index]
                           }
                       }
                   })
               }else {
                    arr.push({
                       name: `${this.levelNums[index]}~${this.levelNums[index+1]}人`,
                       value: index,
                       marker: {
                           style: {
                               fill: this.levelColors[index]
                           }
                       }
                   })
               }
           })
           return arr
       },
       getLevelColor(val){
            let index = this.getLevelIndex(this.levelNums,val)
            return this.levelColors[index]
       },
       getLevelIndex(levelNums, num){
           let levelIndex = 0;
            for(let index = 0; index < levelNums.length; index ++ ){
                if(levelNums[index] <= num && num < levelNums[index + 1]){
                    levelIndex = index;
                    break;
                }
            }
            return levelIndex;
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
                    field: 'name'
                },{
                    field: 'value'
                }]
            }
        },
        resizeChart(){
            let width = parseInt(this.width) 
            let height = parseInt(this.height)
            this.chartInstance.changeSize(width,height)
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>