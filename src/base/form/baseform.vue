<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%"
                border
                v-if="tableData.length>0">
            <el-table-column
                    fit="true"
                    header-row-class-name="headerClass"
                    row-class-name = "rowClass"
                    v-for="(item,index) in Object.keys(tableData[0])"
                    :key="index"
                    :prop="item.value"
                    :label="item.label"
                    min-width="100">
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
        </el-pagination>
    </div>
</template>

<script>
    import {getTableDataDynamic} from "api/api"
    import {baseUrl} from "common/js/config"

    export default {
        data(){
            return {
                tableData: []
            }
        },
        mounted() {
            let dataId = '5dcbc808edb815f1040683ad'
            let url = baseUrl + '/api/getTableDataDynamic?id=' + dataId
            getTableDataDynamic(url).then((res)=>{
                console.log(res.data)
                this.tableData = res.data
            })
        }
    }
</script>

