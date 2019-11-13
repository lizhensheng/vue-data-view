<template>
    <!--左侧面板start-->
    <div class="leftWrapper">
        <div>
            <keep-alive>
                <el-tabs v-model="activeName">
                <el-tab-pane label="工程管理" name="first">
                    <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="true"></el-tree>
                    <div class="split"></div>
                    <el-button round @click="clickAddProject" size="small">新建工程</el-button>
                    <el-button round @click="clickAddPage" size="small">新建页面</el-button>
                </el-tab-pane>
                <el-tab-pane label="控件" name="second">
                    <el-collapse v-model="activeControls">
                        <el-collapse-item name="1">
                            <template slot="title">
                                &nbsp;&nbsp;图表<i class="header-icon el-icon-info"></i>
                            </template>
                            <div class="list-container">
                                <ul class="tool-list">
                                    <li v-for="(item,index) in chartModules" :key="index"  :data-chart="item.value">
                                        <span class="tool-item">
                                            <div class="tool-item__icon" :class="`chart-${item.value}`"  :data-chart="item.value"  @mousedown.prevent.stop="mouseClickControl">
                                                <span class="icon iconfont" :class="item.pic"  :data-chart="item.value"  @mousedown.prevent.stop="mouseClickControl"></span>
                                            </div>
                                            <div class="tool-item__name"  :data-chart="item.value"  @mousedown.prevent.stop="mouseClickControl">{{item.name}}</div>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="2">
                            <template slot="title">
                                &nbsp;&nbsp;边框<i class="header-icon el-icon-info"></i>
                            </template>
                            <div class="list-container">
                                <ul class="tool-list">
                                    <li @mousedown.prevent.stop="mouseClickControl" v-for="(item,index) in borderModules" :key="index"  :data-chart="item.value">
                                        <span class="tool-item">
                                            <div class="tool-item__icon" :class="`chart-${item.value}`"  :data-chart="item.value"  @mousedown.prevent.stop="mouseClickControl">
                                                <span class="icon iconfont" :class="item.pic"  :data-chart="item.value"  @mousedown.prevent.stop="mouseClickControl"></span>
                                            </div>
                                            <div class="tool-item__name"  :data-chart="item.value"  @mousedown.prevent.stop="mouseClickControl">{{item.name}}</div>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="3">
                            <template slot="title">
                                &nbsp;&nbsp;表格<i class="header-icon el-icon-info"></i>
                            </template>
                            <div class="list-container">
                                <ul class="tool-list">
                                    <li @mousedown.prevent.stop="mouseClickControl" v-for="(item,index) in tableModules" :key="index"  :data-chart="item.value">
                                        <span class="tool-item">
                                            <div class="tool-item__icon" :class="`chart-${item.value}`"  :data-chart="item.value"  @mousedown.prevent.stop="mouseClickControl">
                                                <span class="icon iconfont" :class="item.pic"  :data-chart="item.value"  @mousedown.prevent.stop="mouseClickControl"></span>
                                            </div>
                                            <div class="tool-item__name"  :data-chart="item.value"  @mousedown.prevent.stop="mouseClickControl">{{item.name}}</div>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="4">
                            <template slot="title">
                                &nbsp;&nbsp;文字<i class="header-icon el-icon-info"></i>
                            </template>
                            <div class="list-container">
                                <ul class="tool-list">
                                    <li @mousedown.prevent.stop="mouseClickControl" v-for="(item,index) in mediaModules" :key="index"  :data-chart="item.value">
                                        <span class="tool-item">
                                            <div class="tool-item__icon" :class="`chart-${item.value}`"  :data-chart="item.value"  @mousedown.prevent.stop="mouseClickControl">
                                                <span class="icon iconfont" :class="item.pic"  :data-chart="item.value"  @mousedown.prevent.stop="mouseClickControl"></span>
                                            </div>
                                            <div class="tool-item__name"  :data-chart="item.value"  @mousedown.prevent.stop="mouseClickControl">{{item.name}}</div>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="5">
                            <template slot="title">
                                &nbsp;&nbsp;媒体<i class="header-icon el-icon-info"></i>
                            </template>
                            <div class="list-container">
                                <ul class="tool-list">
                                    <li @mousedown.prevent.stop="mouseClickControl" v-for="(item,index) in textModules" :key="index"  :data-chart="item.value">
                                        <span class="tool-item">
                                            <div class="tool-item__icon" :class="`chart-${item.value}`"  :data-chart="item.value"  @mousedown.prevent.stop="mouseClickControl">
                                                <span class="icon iconfont" :class="item.pic"  :data-chart="item.value"  @mousedown.prevent.stop="mouseClickControl"></span>
                                            </div>
                                            <div class="tool-item__name"  :data-chart="item.value"  @mousedown.prevent.stop="mouseClickControl">{{item.name}}</div>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </el-collapse-item>
                    </el-collapse>

                </el-tab-pane>
                <el-tab-pane label="数据源" name="third">
                    <el-collapse v-model="activeControls">
                        <el-collapse-item title="图表" name="1">
                            <template slot="title">
                                &nbsp;数据源<i class="header-icon el-icon-info"></i>
                            </template>
                            <div class="dbsource">
                                <div class="grid-content bg-purple"><div class="title">&nbsp;数据源:</div></div>
                                <el-row>
                                    <el-col :span="8"  :offset="1">
                                        <el-select v-model="dbsource" placeholder="请选择" @change="changeDbType" size="small">
                                            <el-option
                                                    v-for="item in dbsourceconfigs"
                                                    :key="item._id"
                                                    :label="item.dbconnectionname"
                                                    :value="item._id">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="14" :offset="1"><div class="grid-content bg-purple-light">
                                        <el-button @click="onSourceEdit" size="small"><i class="el-icon-edit"></i></el-button>
                                        <el-button @click="onSourcePlus" size="small"><i class="el-icon-plus"></i></el-button>
                                        <el-button @click="onSourceDelete" size="small"><i class="el-icon-delete"></i></el-button>
                                    </div></el-col>
                                </el-row>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="图表" name="2">
                            <template slot="title">
                                &nbsp;数据表<i class="header-icon el-icon-info"></i>
                            </template>
                            <div class="dbtablename">
                        <el-row>
                            <el-col :span="8"><div class="grid-content bg-purple"><div class="title">&nbsp;数据表:</div></div></el-col>
                            <el-col :span="16"><div class="grid-content bg-purple-light">
                                <el-select v-model="dbtablename" placeholder="请选择"  @change="changeTablename"  size="small">
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
                        </el-collapse-item>
                        <el-collapse-item title="图表" name="3">
                            <template slot="title">
                                &nbsp;数据集<i class="header-icon el-icon-info"></i>
                            </template>
                            <div class="tablefields" v-if="tablefields.length>0" ref="tablefields">
                        <div class="fieldsWrapper">
                            <el-row :gutter="20">
                                <el-col :span="6" class="fields"><h3>原始列名</h3></el-col>
                                <el-col :span="7" class="fields"><h3>显示列名</h3></el-col>
                                <el-col :span="7" class="fields"><h3>数据类型</h3></el-col>
                                <el-col :span="4" class="fields"><h3>操作</h3></el-col>
                            </el-row>
                            <div class="split"></div>
                            <div class="divided"></div>
                            <el-row v-for="(item,index) in tablefields" :key="index" class="rowfields" :gutter="20">
                                <el-col :span="6" class="fields"><div class="title">{{tablefields[index][Object.keys(item)[0]]}}</div></el-col>
                                <el-col :span="7" class="fields"><div class="title">{{tablefields[index][Object.keys(item)[1]]}}</div></el-col>
                                <el-col :span="7" class="fields">
                                    <div class="title">
                                        <div class="title">{{tablefields[index][Object.keys(item)[2]]}}</div>
                                    </div>
                                </el-col>
                                <el-col :span="4" class="fields">
                                    <div class="title"><i class="el-icon-delete" @click="onTableFieldsDelete(index)"></i></div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                        </el-collapse-item>
                        <el-collapse-item title="图表" name="4">
                            <template slot="title">
                                &nbsp;操作<i class="header-icon el-icon-info"></i>
                            </template>
                            <div class="search">
                        <el-row>
                            <el-col :span="7" :offset="1">
                                <el-button round @click="clickSaveSource" size="small">保存数据源</el-button>
                            </el-col>
                            <el-col :span="6" :offset="10">
                                <el-button round @click="clickSearch" size="small">查询</el-button>
                            </el-col>
                        </el-row>
                    </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-tab-pane>
            </el-tabs>
            </keep-alive>
        </div>
    </div>
    <!--左侧面板end-->

</template>

<script>
    import './leftsetting.styl'
    import BScroll from 'better-scroll'
    import {constructTree} from 'common/js/imputil'
    import {chart,border,table,media,text} from "common/js/controlconfig"
    import {mapMutations,mapGetters} from 'vuex'
    import {getTableNames,getDataset,getPageProjectName,getAllPageProject,getDbConfigs,deleteDbConfig} from 'api/dbhelper'
    export default {
        data(){
            return {
                fit:'fill',
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573037491645&di=85dadabbb705133c0943cfe12e1f0422&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D2224126077%2C573428413%26fm%3D214%26gp%3D0.jpg',
                activeName: 'first',
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                activeControls:['1','2','3','4','5'],
                chartModules:chart,
                borderModules:border,
                tableModules:table,
                mediaModules:media,
                textModules:text,
                dbtype:'',
                dbsource:'',
                dbsourceconfigs:[],
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
                dbtablename:'',
                dbtablenameoptions:[

                ],
                tablefieldsoptions:[
                    {label: '字符串', value: 'string'},
                    {label: '数字', value: 'number'},
                    {label: '日期', value: 'date'}
                ],
                tablefields:[],
            }
        },
        created(){
            this._getProjectTree()
            this._getSourceConfigs()
        },
        computed:{
          ...mapGetters([
              'treeData'
          ])
        },
        methods:{
            _getSourceConfigs(){
                getDbConfigs().then(res=>{
                    if(res.data.code == 0){
                        this.dbsourceconfigs = res.data.data
                    }
                }).catch(e=>{
                    console.log(e)
                })
            },
            _getProjectTree(){
                getAllPageProject().then((res)=>{
                    if(res.data.code == 0){
                        let projects = res.data.data
                        let out = constructTree(projects,{id:'_id',pid:'pid'})
                        this.setTreeData(out)
                    }else{
                        this.$message({
                            type: 'error',
                            message: '获取工程配置失败,错误码:'+res.data.code
                        });
                    }
                })
            },
            handleNodeClick(data){
                if(data.pid !== '0'){
                    let id = data._id
                    this.$emit('onPageControlConfig',id)
                }
            },
            clickAddProject(){
                this.setDialogAddProject(true)
            },
            clickAddPage(){
                this.setDialogAddPage(true)
                getPageProjectName().then((res)=>{
                    if(res.data.code == 0){
                        let d = res.data.data
                        this.setProjectNameList(d)
                    }
                })
            },

            mouseClickControl(e){
                //获取点击的图形的类型
                let chartType = e.target.dataset.chart
                this.$emit('onMouseClickControl',{clickControl:true,moveFlag:true,chartType:chartType})
            },
            changeTablename(){
                if(this.dbtablename&&this.dbsource){
                    getDataset('',this.dbtablename,this.dbsource).then((res)=>{
                        if(res.status == 200){
                            if(res.data.length>0){
                                let arrNames = Object.keys(res.data[0])
                                let arrValues = Object.values(res.data[0])
                                if(arrNames[0] == 'ROWNUM'){
                                    arrNames.splice(0,1)
                                    arrValues.splice(0,1)
                                }
                                let formfields = []
                                arrNames.forEach((item,index) =>{
                                    let aform = {}
                                    aform[item] = item
                                    aform[`${item}_nickname`] = item
                                    aform[`${item}_datetype`] = this._getDataType(arrValues[index])
                                    formfields.push(aform)
                                })
                                this.tablefields = formfields
                                window.setTimeout(()=>{
                                    this.$scroll = new BScroll(this.$refs.tablefields,{
                                        scrollX: true,
                                        click: true
                                    })
                                },50)
                            }else{
                                this.tablefields = []
                                this.$message({
                                    type: 'success',
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
            _getDataType(data){
                if(typeof data == 'number'){
                    return 'number'
                }else if(/^\d{4}-\d{2}-\d{2}.+/.test(data)){
                    return  'date'
                }else{
                    return 'string'
                }
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
            onTableFieldsDelete(index){
                this.tablefields.splice(index,1)
            },
            clickSaveSource(){
                if(this.dbtablename&&this.dbsource){
                    this.$emit('onClickSaveSource',{dbtablename:this.dbtablename,id:this.dbsource,tablefields:this.tablefields})
                }else{
                    this.$message({
                        type: 'success',
                        message: '请选择数据源'
                    });
                }
            },

            clickSearch(){
                if(this.dbtablename&&this.dbsource){
                    let searchStr = ''
                    if(this.tablefields.length>0){
                        this.tablefields.forEach((item)=>{
                            searchStr +=`${item[Object.keys(item)[0]]} ${item[Object.keys(item)[1]]},`
                        })
                        searchStr = searchStr.substr(0,searchStr.length-1)
                    }
                    getDataset(searchStr,this.dbtablename,this.dbsource).then((res)=>{
                        if(res.status == 200){
                            let gridData = res.data
                            this.$emit('onClickSearch',gridData)
                        }else{
                            this.$message({
                                type: 'error',
                                message: '获取数据集结果出现异常'
                            });
                        }
                    })
                }
            },
            onSourceEdit(){
                let item = this.dbsourceconfigs[this.dbsourceconfigs.findIndex(i=>i._id === this.dbsource)]
                if(item){
                    this.$emit('onSourceEdit', item)
                }
            },
            onSourcePlus(){
                this.$emit('onSourcePlus')
            },
            onSourceDelete(){
                if(!this.dbsource){
                    return
                }
                this.$confirm('此操作将永久删除该数据源, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteDbConfig(this.dbsource)
                        .then(res=>{
                            if(res.data.code == 0){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                });
                                this._getSourceConfigs()
                                this.dbsource = ''
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: '网络断线了'
                                });
                            }
                        })
                        .catch(e=>{
                            console.log(e)
                        })
                }).catch(() => {
                    this.$message({
                        type: 'success',
                        message: '已取消删除'
                    });
                });
            },
            ...mapMutations({
                setDialogAddProject:'DIALOG_ADD_PROJECT_VISIBLE',
                setTreeData: 'SET_TREE_DATA',
                setDialogAddPage:'DIALOG_ADD_PAGE_VISIBLE',
                setProjectNameList:'SET_PROJECT_NAME_LIST'
            })
        }
    }
</script>