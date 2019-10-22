<template>
    <div class="projectsetting" @mousemove="mouseProjectSetting" @mouseup="mouseUpProjectSetting" ref="projectsetting">
        <div class="moveflag" ref="moveflag" v-show="moveflag">
            <canvas ref="myCanvas" width="20" height="20"
                    style="z-index: 10000">
            </canvas>
        </div>
        <div class="leftWrapper">
            <el-tabs v-model="activeName">
                <el-tab-pane label="工程管理" name="first">
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </el-tab-pane>
                <el-tab-pane label="控件" name="second">
                    <div class="list-container">
                        <ul class="tool-list">
                            <li @mousedown.prevent.stop="mouseClickControl"  data-chart="1" >
                                <span class="tool-item">
                                    <div class="tool-item__icon chart-line"  data-chart="1" ></div>
                                    <div class="tool-item__name"  data-chart="1" >折线图</div>
                                </span>
                            </li>
                            <li @mousedown="mouseClickControl"  data-chart="2" >
                                <span class="tool-item">
                                    <div class="tool-item__icon chart-bar"  data-chart="2"></div>
                                    <div class="tool-item__name"  data-chart="2">柱状图</div>
                                </span>
                            </li>
                            <li @mousedown="mouseClickControl"  data-chart="3" >
                                <span class="tool-item">
                                    <div class="tool-item__icon chart-pie" data-chart="3" ></div>
                                    <div class="tool-item__name" data-chart="3" >饼图</div>
                                </span>
                            </li>
                            <li @mousedown="mouseClickControl"  data-chart="4" >
                                <span class="tool-item">
                                    <div class="tool-item__icon chart-ring" data-chart="4" ></div>
                                    <div class="tool-item__name" data-chart="4" >环形饼图</div>
                                </span>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="数据源" name="third">
                    <div class="dbsource">
                        <el-row>
                            <el-col :span="8"><div class="grid-content bg-purple"><div class="title">数据源:</div></div></el-col>
                            <el-col :span="16"><div class="grid-content bg-purple-light">
                                <el-select v-model="dbtype" placeholder="请选择" @change="changeDbType">
                                    <el-option
                                            v-for="item in dbtypeoptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div></el-col>
                        </el-row>
                    </div>
                    <div class="split"></div>
                    <div class="dbtablename">
                        <el-row>
                            <el-col :span="8"><div class="grid-content bg-purple"><div class="title">数据表:</div></div></el-col>
                            <el-col :span="16"><div class="grid-content bg-purple-light">
                                <el-select v-model="dbtablename" placeholder="请选择"  @change="changeTablename">
                                    <el-option
                                            v-for="item in dbtablenameoptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div></el-col>
                        </el-row>
                    </div>
                    <div class="split"></div>
                    <div class="split"></div>
                    <div class="tablefields" v-if="tablefields.length>0">
                        <el-row>
                            <el-col :span="12"><h3>原始列名</h3></el-col>
                            <el-col :span="12"><h3>显示列名</h3></el-col>
                        </el-row>
                        <div class="split"></div>
                        <div class="divided"></div>
                        <el-row v-for="(item,index) in tablefields" :key="index">
                            <el-col :span="12"><div class="title">{{Object.keys(item)[0]}}</div></el-col>
                            <el-col :span="12"><el-input v-model="tablefields[index][Object.keys(item)[1]]" autocomplete="off" ></el-input></el-col>
                        </el-row>
                    </div>
                    <div class="split"></div>
                    <div class="divided"></div>
                    <div class="search">
                        <el-row>
                            <el-col :span="8">
                                <el-button round @click="clickSaveSource">保存数据源</el-button>
                            </el-col>
                            <el-col :span="8" :offset="8">
                                <el-button round @click="clickSearch">查询</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="rightWrapper">
            <div class="css-sqdry3">

                    <div class="css-1qkwt59">
                        <el-menu :default-active="menuIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                            <el-menu-item index="1" >预览</el-menu-item>
                            <el-menu-item index="2" >文档</el-menu-item>
                        </el-menu>

                            <div class="css-10ro1m" v-if="!docdesc">
                                <div class="dashboard-background-image" @activeChart="onActiveChart">
                                    <Index></Index>
                                </div>
                            </div>
                            <div v-if="docdesc">
                                文档
                            </div>
                    </div>
            </div>
            <div class="css-fullconfig">
                <div class="configheader">
                    <span>控制面板</span>
                </div>
                <div class="content" @activeChart="onActiveChart">

                </div>
                <div class="nocontent">
                    点击控件进行配置
                </div>
            </div>
        </div>

        <el-dialog title="预览数据(展示前5条)" :visible.sync="dialogTableVisible">
            <el-table :data="gridData" v-if="gridData.length>0">
                <el-table-column v-for="(item,index) in Object.keys(gridData[0])" :key="index" :property="item" :label="item" width="150"></el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog title="保存数据源" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="数据源名称" :label-width="formLabelWidth">
                    <el-input v-model="form.sourcename" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="clickSaveSourceOk">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>
<script>
    import {getTableNames,getDataset,setDataSource} from 'api/dbhelper'
    import {socket} from "common/js/socket-client"
    import Index from 'components/page/index'
    let TOP_HEIGHT = 125
    let LEFT_WIDTH = 300
    import './projectsetting.styl'
    export default {
        data() {
            return {
                tablefields:[],
                moveflag:false,
                form:{
                    sourcename:''
                },
                formLabelWidth: '120px',
                dialogFormVisible:false,
                dialogTableVisible:false,
                gridData:[],
                dbtablename:'',
                dbtablenameoptions:[

                ],
                dbtype:'',
                dbtypeoptions:[
                    {
                        value: 'oracle',
                        label: 'oracle'
                    },
                    {
                        value: 'mssql',
                        label: 'mssql'
                    },
                    {
                        value: 'mysql',
                        label: 'mysql'
                    },
                    {
                        value: 'postgress',
                        label: 'postgress'
                    }
                ],
                activeName: 'first',
                menuIndex: "1",
                data: [{
                    label: 'project01',
                    children: [{
                        label: 'index01'
                    },{
                        label: 'index02'
                    },{
                        label: 'index03'
                    }]
                }, {
                    label: 'project02',
                    children: [{
                        label: 'index01'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                docdesc:false
            };
        },
        created(){

        },
        mounted(){
        },
        methods:{
            handleNodeClick(){
                // let his = this.$router.history.current.fullPath
                // if(his !== '/pindex'){
                //     this.$router.replace('/pindex')
                // }
            },
            handleSelect(item){
                this.docdesc = item == 2
            },
            changeDbType(item){
                this.dbtablename = ''
                getTableNames(item).then((res)=>{
                    if(res.status == 200){
                        this.dbtablenameoptions=[]
                        res.data.forEach((item)=>{
                           this.dbtablenameoptions.push({
                               value: item.TABLE_NAME,
                               label: item.TABLE_NAME
                           })
                        })
                    }else{
                        this.$message({
                            type: 'error',
                            message: '获取表名出现异常'
                        });
                    }
                })
            },
            changeTablename(){
                if(this.dbtablename&&this.dbtype){
                    getDataset('',this.dbtablename,this.dbtype).then((res)=>{
                        if(res.status == 200){
                            if(res.data.length>0){
                                let arrNames = Object.keys(res.data[0])
                                arrNames.splice(0,1)
                                let formfields = []
                                arrNames.forEach(item =>{
                                    let aform = {}
                                    aform[item] = item
                                    aform[`${item}_nickname`] = item
                                    formfields.push(aform)
                                })
                                this.tablefields = formfields
                            }else{
                                this.tablefields = []
                                this.$message({
                                    type: 'info',
                                    message: '暂无数据'
                                });
                            }
                        }else{
                            this.$message({
                                type: 'error',
                                message: '获取表结构出现异常'
                            });
                        }
                    })
                }
            },
            clickSearch(){
                if(this.dbtablename&&this.dbtype){
                    let searchStr = ''
                    if(this.tablefields.length>0){
                        this.tablefields.forEach((item)=>{
                            searchStr +=`${item[Object.keys(item)[0]]} ${item[Object.keys(item)[1]]},`
                        })
                        searchStr = searchStr.substr(0,searchStr.length-1)
                    }
                    getDataset(searchStr,this.dbtablename,this.dbtype).then((res)=>{
                        if(res.status == 200){
                            this.dialogTableVisible = true
                            this.gridData = res.data
                        }else{
                            this.$message({
                                type: 'error',
                                message: '获取数据集结果出现异常'
                            });
                        }
                    })
                }
            },
            clickSaveSource(){
                if(this.dbtablename&&this.dbtype){
                    this.dialogFormVisible = true
                }else{
                    this.$message({
                        type: 'info',
                        message: '请选择数据源'
                    });
                }
            },
            clickSaveSourceOk(){
                if(this.dbtablename&&this.dbtype&&this.form.sourcename) {
                    setDataSource(this.dbtablename,this.dbtype,this.form.sourcename).then((res)=>{
                        if(res.data.code==0){
                            this.dialogFormVisible = false
                            this.form.sourcename = ''
                            this.$message({
                                type: 'success',
                                message: '保存成功'
                            });
                        }else if(res.data.code==1){
                            this.$message({
                                type: 'error',
                                message: '数据源名称重复'
                            });
                        }else{
                            this.$message({
                                type: 'error',
                                message: '保存异常'
                            });
                        }
                    })
                }
            },
            mouseClickControl(e){
                this.clickControl = true
                this.moveflag = true
                //获取点击的图形的类型
                this.chartType = e.target.dataset.chart
            },
            mouseProjectSetting(e){
                if(this.clickControl){
                    this.$refs.moveflag.style.top = e.y-10 + 'px'
                    this.$refs.moveflag.style.left = e.x-10 + 'px'
                }
            },
            mouseUpProjectSetting(e){
                this.clickControl = false
                this.moveflag = false
                this.$refs.moveflag.style.top = 0 + 'px'
                this.$refs.moveflag.style.left = 0 + 'px'
                let dx = e.x-LEFT_WIDTH
                let dy = e.y-TOP_HEIGHT
                if(dx>0&&dy>0&&this.chartType>0){
                    //在坐标(dx,dy)处增加一个默认图表,图表类型是this.chartType
                    let obj = {
                        dx:dx,
                        dy:dy,
                        chartType:this.chartType
                    }
                    socket.emit('onDragInControl',JSON.stringify(obj))
                }
                this.chartType = -1
            },
            onActiveChart(){
                console.log('onActiveChart')
            }
        },
        components:{
            Index
        }
    }
</script>