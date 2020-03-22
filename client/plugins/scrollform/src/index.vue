<template>
    <div class="c-scroll-form">
        <div class="header">
            <div class="header-item" v-for="(item,index) in tableFields" :key="index">
                {{item.name}}
            </div>
        </div>
        <div class="row" :style="{'height': rowHeight*rowNum + 'px'}">
            <div 
                class="row-item"
                v-for="(item,index) in rowData" 
                :key="index" 
                :style="{
                        'height': heights[index] + 'px',
                        'line-height': heights[index]+ 'px',
                        'background-color': item['序号'] % 2 === 0 ? evenRowBGC : oddRowBGC
                        }">
                <div class="col-item" v-for="(key,index2) in tableFields" :key="index2"  :style="{ 'fontSize': heights[index] === 0 ? 0 : fontSize + 'px'}">
                    {{item[key.name]}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import componentRefresh from '@/mixins/componentRefresh'
let DATA = [{"新增确诊": 10,"新增疑似": 3,"新增治愈": 15,"新增死亡": 0}, {"新增确诊": 2,"新增疑似": 13,"新增治愈": 10,"新增死亡": 0}, {"新增确诊": 12,"新增疑似": 1,"新增治愈": 6,"新增死亡": 1}, {"新增确诊": 5,"新增疑似": 15,"新增治愈": 16,"新增死亡": 0}]
export default {
    name:'CScrollForm',
    data(){
        return {
            tableData:[],
            tableFields:[],
            heights:[],
            animationIndex:0,
            animationHandler:[],
            rowData:[],
            count:0
        }
    },
    mixins: [componentRefresh],
    props:{
        props:{
            type: Array,
            default: function(){
                return [{
                    fields:[]
                }]
            }
        }
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
        rowNum(){
            return this.props[0].fields[3].value.value
        },
        rowHeight(){
            return this.props[0].fields[4].value.value
        },
        oddRowBGC(){
            return this.props[0].fields[5].value.value
        },
        evenRowBGC(){
            return this.props[0].fields[6].value.value
        },
        waitTime(){
            return this.props[0].fields[7].value.value * 1000
        },
        carousel(){
            return this.props[0].fields[8].value.value
        },
        fontSize(){
            return this.props[0].fields[9].value.value
        }
    },
    watch:{
         dataTrigger(){
            this.stopAnimation()
            this.startAnimation()
        },
        waitTime(){
            this.stopAnimation()
            this.startAnimation()
        },
        rowNum(){
             this.stopAnimation()
            this.startAnimation()
        }
    },
    mounted(){
        this.startAnimation()
    },
    methods:{
        startAnimation(){
            this.tableData = this.dataTrigger
            this.tableData = this.tableData.map((item,index)=>{
                return {
                    '序号': index + 1,
                    ...item
                }
            })
            if(this.tableData.length > 0){
                let keys = Object.keys(this.tableData[0])
                this.tableFields = []
                keys.forEach((key, index) => {
                    this.tableFields.push({
                        index: index,
                        name: key
                    })
                })
            }
            this.animation(true)
        },
        async animation(start = false){
            const rowLength = this.tableData.length
            if(this.rowNum > rowLength) return
            if(start){
                await new Promise(resolve=>setTimeout(resolve,this.waitTime))
                this.heights = new Array(rowLength).fill(this.rowHeight)
            }
            const animationNum = this.carousel === 'single' ? 1 : this.rowNum
            let rows = this.tableData.slice(this.animationIndex)
            rows.push(...this.tableData.slice(0,this.animationIndex))
            this.rowData = rows
            this.heights = new Array(rowLength).fill(this.rowHeight)
            await new Promise(resolve => setTimeout(resolve, 600))
            this.heights.splice(0, 1, ...new Array(animationNum).fill(0))
            await new Promise(resolve => setTimeout(resolve, 600))
            
            this.animationIndex += animationNum
            const back = this.animationIndex - rowLength
            if(back>=0) this.animationIndex = back
            this.count++
            this.animationHandler.push(setTimeout(this.animation, this.waitTime - 600))
        },
        stopAnimation(){
            if(this.animationHandler.length>0){
                this.animationHandler.forEach(item=>{
                    clearTimeout(item)
                })
            }
        }
    },
    destroyed(){
        this.stopAnimation()
    }
}
</script>

<style lang="stylus" scoped>
.c-scroll-form{
    position: relative;
    width: 100%;
    height: 100%;
    .header{
        display: flex;
        flex-direction: row;
        height: 30px;
        align-items: center;
        padding: 0px 10px;
        .header-item
        {
            flex: 1;
        }
    }
    .row
    {
        overflow: hidden;
        .row-item
        {
            display: flex;
            transition: all 0.9s;
            padding: 0px 10px;
            .col-item
            {
                flex: 1;
            }
        }
    }
}
</style>