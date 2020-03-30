<template>
    <div class="c-scroll-form">
        <dv-scroll-board :config="config" :style="{...getCommonStyle(props[0].fields)}" />
    </div>
</template>
<script>
import componentRefresh from '@/mixins/componentRefresh'
let DATA = [
            {"新增确诊": 10,"新增疑似": 3,"新增治愈": 15,"新增死亡": 0}, 
            {"新增确诊": 2,"新增疑似": 13,"新增治愈": 10,"新增死亡": 0}, 
            {"新增确诊": 12,"新增疑似": 1,"新增治愈": 6,"新增死亡": 1}, 
            {"新增确诊": 5,"新增疑似": 15,"新增治愈": 16,"新增死亡": 0},
            {"新增确诊": 5,"新增疑似": 15,"新增治愈": 16,"新增死亡": 0},
            {"新增确诊": 5,"新增疑似": 15,"新增治愈": 16,"新增死亡": 0},
            {"新增确诊": 5,"新增疑似": 15,"新增治愈": 16,"新增死亡": 0},
            {"新增确诊": 5,"新增疑似": 15,"新增治愈": 16,"新增死亡": 0},
            {"新增确诊": 5,"新增疑似": 15,"新增治愈": 16,"新增死亡": 0},
           ]
export default {
    name:'CScrollForm',
    data(){
        return {
            config: {}
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
            return this.props[0].fields[7].value.value
        },
        carousel(){
            return this.props[0].fields[8].value.value
        },
        headerBGC(){
            return this.props[0].fields[9].value.value
        },
        headerHeight(){
            return this.props[0].fields[10].value.value
        },
        index(){
            return this.props[0].fields[11].value.value
        }
    },
    watch:{
        dataTrigger(){
            this.initData()
        },
        rowNum(){
            this.initData()
        },
        rowHeight(){
            this.initData()
        },
        oddRowBGC(){
            this.initData()
        },
        evenRowBGC(){
            this.initData()
        },
        waitTime(){
            this.initData()
        },
        carousel(){
            this.initData()
        },
        headerBGC(){
            this.initData()
        },
        headerHeight(){
            this.initData()
        },
        index(){
            this.initData()
        }
    },
    created(){
        this.initData()
    },
    methods:{
        getCommonStyle(item){
            let width = item[0].value[0].value.value
            let height = item[0].value[1].value.value
            return {
                'width': width + 'px',
                'height': height + 'px'
            }
        },
        initData(){
            let header = this.getHeader(this.dataTrigger)
            let data = this.getData(this.dataTrigger)
            this.config = {
                header: header,
                data: data,
                rowNum: this.rowNum,
                oddRowBGC: this.oddRowBGC,
                evenRowBGC: this.evenRowBGC,
                waitTime: this.waitTime,
                carousel: this.carousel,
                headerBGC: this.headerBGC,
                headerHeight: this.headerHeight,
                index: this.index
            }
        },
        getHeader(data){
             if(Array.isArray(data) && data.length>0){
                 return Object.keys(data[0])
             }else{
                 return []
             }
        },
        getData(data){
            let arr = []
            data.forEach(element => {
                arr.push(Object.values(element))
            })
            return arr
        }
    },
    destroyed(){
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