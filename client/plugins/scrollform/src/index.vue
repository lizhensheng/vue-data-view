<template>
    <div class="lk-scrollform">
        <div class="header">
            <div class="header-item" v-for="(item,index) in tableFields" :key="index">
                {{item.name}}
            </div>
        </div>
        <div class="row" :style="`height:${rowHeight*rowNum}px;`">
            <div 
                class="row-item"
                v-for="(item,index) in rowData" 
                :key="item.id" 
                :style="`
                        height:${heights[index]}px;
                        line-height:${heights[index]}px;
                        background-color: ${item.id % 2 === 0 ? evenRowBGC : oddRowBGC};
                        `">
                <div class="col-item" v-for="(key,index2) in tableFields" :key="index2"  :style="`font-size:${heights[index] === 0 ? 0 :fontSize}px;`">
                    {{item[key.name]}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import './index.styl'
import axios from 'axios'
export default {
    name:'LkScrollform',
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
    props:{
        url:{
            type:String,
            default:''
        },
        rowNum:{
            type:Number,
            default:5
        },
        rowHeight:{
            type:Number,
            default:50
        },
        evenRowBGC:{
            type:String,
            default:'orange'
        },
        oddRowBGC:{
            type:String,
            default:'blue'
        },
        waitTime:{
            type:Number,
            default:3000
        },
        carousel:{
            type:String,
            default:'single'
        },
        fontSize:{
            type:Number,
            default:24
        }
    },
    created(){
        if(this.url === '') return
        this.getTableData()
    },
    methods:{
        getTableData(){
            axios.get(this.url)
            .then(res=>{
                if(res.data.code === 0){
                    this.tableFields = res.data.data.fields
                    this.tableData = res.data.data.data
                    this.tableData.forEach((item,index)=>{
                        item.id=index
                    })
                    this.animation(true)
                }
            })
            .catch(e=>{
                console.log(e)
            })
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
            this.heights.splice(0, animationNum, ...new Array(animationNum).fill(0))
            
            
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