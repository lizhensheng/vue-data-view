<template>
    <div class="c-base-form" v-show="url">
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
                        :prop="item.name"
                        :label="item.name"
                        min-width="100">
                </el-table-column>
            </el-table>
            <el-pagination
                    v-if="tableData.length>0&&pageing"
                    background
                    layout="prev, pager, next"
                    :total="totalCount"
                    @current-change="changPage">
            </el-pagination>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name:'CBaseForm',
        data(){
            return {
                tableData: [],
                tableFields:[],
                totalCount:0,
                pageIndex:1,
                pageSize:10
            }
        },
        props:{
            url:{
                type:String,
                default:""
            },
            pageing:{
                type:Boolean,
                default:true
            }
        },
        created(){
            this.getTableData()
        },
        mounted(){
        },
        updated(){
        },
        methods:{
            changPage(pageIndex){
                this.pageIndex = pageIndex
                this.getTableData()
            },
            getTableData(){
                if(this.url === ''){
                    return
                }
                let m_url =  this.url.indexOf('?')>0 ? 
                            this.url+ `&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`:
                            this.url+ `?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
                axios.get(m_url).then((res)=>{
                    if(res.data.code === 0){
                        this.totalCount = res.data.data.totalCount
                        this.tableData = res.data.data.data
                        this.tableFields = res.data.data.fields
                    }
                })
                .catch(e=>{
                    console.log(e)
                })
            }
        }
    }
</script>