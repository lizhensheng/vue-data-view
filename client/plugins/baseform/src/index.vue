<template>
    <div class="c-base-form">
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    border>
                <el-table-column
                        fit="true"
                        header-row-class-name="headerClass"
                        row-class-name = "rowClass"
                        v-for="(item,index) in tableFields"
                        :key="index"
                        :prop="item"
                        :label="item"
                        min-width="100">
                </el-table-column>
            </el-table>
            <div class="c-base_pagination">
                <el-pagination
                        v-if="tableData.length>0&&paging"
                        background
                        layout="prev, pager, next"
                        :total="total"
                        @current-change="changPage">
                </el-pagination>
            </div>
    </div>
</template>

<script>
import moment from 'moment'
import componentRefresh from '@/mixins/componentRefresh'
let DATA = [{"新增确诊": 10,"新增疑似": 3,"新增治愈": 15,"新增死亡": 0}, {"新增确诊": 2,"新增疑似": 13,"新增治愈": 10,"新增死亡": 0}, {"新增确诊": 12,"新增疑似": 1,"新增治愈": 6,"新增死亡": 1}, {"新增确诊": 5,"新增疑似": 15,"新增治愈": 16,"新增死亡": 0}]
export default {
    name:'CBaseForm',
    data(){
        return {
            tableData: [],
            tableFields:[]
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
        total(){
            if(this.props[1].fields[0].value.dataJson.data.paging.total){
                return this.props[1].fields[0].value.dataJson.data.paging.total
            }
            else{
                return DATA.length
            }
        },
        paging(){
            return this.total > this.props[1].fields[0].value.dataJson.data.paging.pageSize
        }
    },
    watch:{
        dataTrigger(){
            this.initData()
        },
        paging(val){
            if(val){
                this.props[1].fields[0].value.dataJson.data.paging.pageIndex = 1
            }
        }
    },
    created(){
        this.initData()
    },
    methods:{
        changPage(pageIndex){
            this.props[1].fields[0].value.dataJson.data.paging.pageIndex = pageIndex
        },
        initData(){
            let header = this.getHeader(this.dataTrigger)
            this.tableData = this.formatDate(this.dataTrigger)
            this.tableFields = header
        },
        getHeader(data){
             if(Array.isArray(data) && data.length>0){
                 return Object.keys(data[0])
             }else{
                 return []
             }
        },
        formatDate(data){
            data.forEach(element => {
                let keys = Object.keys(element)
                keys.forEach(k => {
                    let value = element[k]
                    if(/^([0-9]{4})-([0-1][0-9])-([0-3][0-9]).+/.test(value)){
                         element[k] = moment(value).format('YYYY-MM-DD')
                    }
                })
            })
            return data
        }
    }
}
</script>

<style lang="stylus" scoped>
.c-base_pagination{
    display: flex;
    height: 50px;
    justify-content: flex-end;
    align-items: center;
}
</style>