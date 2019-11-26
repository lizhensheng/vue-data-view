<template>
    <div class="lk-baseform">
        <el-table
                :data="data"
                style="width: 100%"
                border
                v-if="data.length>0">
            <el-table-column
                    fit="true"
                    header-row-class-name="headerClass"
                    row-class-name = "rowClass"
                    v-for="(item,index) in Object.keys(data[0])"
                    :key="index"
                    :prop="item"
                    :label="item"
                    min-width="100">
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="count"
                @current-change="changPage">
        </el-pagination>
    </div>
</template>

<script>
    // import {getTableDataDynamic} from "api/api"
    // import {baseUrl} from "common/js/config"

    export default {
        name:'LkBaseform',
        data(){
            return {
                // tableData: [],
                // totalCount:0,
                // pageIndex:1,
                // pageSize:10
            }
        },
        props:{
            data:[],
            count:0
        },
        mounted() {
            //this.getTableData()
        },
        methods:{
            changPage(pageIndex){
                // this.pageIndex = pageIndex 
                this.$emit('change',pageIndex)
                // this.getTableData()
            },
            // getTableData(){
            //     let dataId = '5dcbc808edb815f1040683ad'
            //     let url = `${baseUrl}/api/getTableDataDynamic?id=${dataId}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
            //     getTableDataDynamic(url).then((res)=>{
            //         if(res.data.code === 0){
            //             this.totalCount = res.data.data.totalCount
            //             this.tableData = res.data.data.data
            //         }
            //     })
            //     .then(e=>{
            //         console.log(e)
            //     })
            // }
        }
    }
</script>