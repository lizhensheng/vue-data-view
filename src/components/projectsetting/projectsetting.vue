<template>
    <div class="projectsetting" @mousemove="mouseProjectSetting" @mouseup="mouseUpProjectSetting" ref="projectsetting">
        <!--移动选框start-->
        <div class="moveflag" ref="moveflag" v-show="moveflag">
            <canvas ref="myCanvas" width="20" height="20"
                    style="z-index: 10000">
            </canvas>
        </div>
        <!--移动选框end-->

        <left-setting @onPageControlConfig="_getPageControlConfig"
                      @onMouseClickControl="onMouseClickControl"
                      @onSourcePlus="onSourcePlus"
                      @onSourceEdit="onSourceEdit"
                      @onClickSaveSource="onClickSaveSource"
                      @onClickSearch="onClickSearch"></left-setting>

        <!--中间和右侧面板start-->
        <div class="rightWrapper">
            <!--中间面板start-->
            <div class="editor">
                    <div class="editor-panel">
                        <el-menu :default-active="menuIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                            <el-menu-item index="0" ><router-link target="_blank" :to="{path:'/preview',query:{pageId:`${this.pageId}`}}"><div class="previewText">预览</div></router-link></el-menu-item>
                            <el-menu-item index="1" >保存</el-menu-item>
                            <el-menu-item index="2" ><div @click="clearPage">清屏</div></el-menu-item>
                        </el-menu>
                        <div class="editor-body" @click="onClick">
                            <div class="containerWrapper">
                                <div class="dashboard-background-image" ref="dashboard" :class="{'active':this.pageId!=''}">

                                </div>
                            </div>
                        </div>
                        <div class="bottom-panel">
                            <span>面板缩放百分比</span>
                            <input class="range" type="range" min="10" max="200" step="1"  v-model="scaleValue" >
                            <input class="number" type="number" min="10" max="200" step="1"  v-model="scaleValue">
                            <i class="el-icon-full-screen" @click="onFullScreen"></i>
                        </div>
                    </div>
                    <div v-if="loading" class="loading">
                        <div class="loading-container">
                            <div><img src="/img/loading/grid.svg"></div>
                            <div class="loading-title">加载中...</div>
                        </div>
                    </div>
            </div>
            <!--中间面板end-->

            <!--右侧面板start-->
            <div class="css-fullconfig">
                <div class="configheader">
                    <span>控制面板</span>
                </div>
                <div class="content" v-if="chartId">
                    <el-tabs type="border-card" @tab-click="onConfigPanelClick">
                        <el-tab-pane label="基础">
                            <div class="simple">
                                <div class="tag"><el-tag size="small">{{chartId}}</el-tag>&nbsp;<el-button @click="onBaseChartRefresh" size="small"><i class="el-icon-refresh-left"></i>刷新图表</el-button></div>
                                <div class="tag"><el-tag size="small">宽度</el-tag></div>
                                <div class="setting"><el-input-number controls-position="right" v-model="localChartWidth"  :min="100" :max="2000" label="图表宽度" size="small" style="width: 205px"></el-input-number></div>
                                <div class="tag"><el-tag size="small">高度</el-tag></div>
                                <div class="setting"><el-input-number controls-position="right" v-model="localChartHeight"  :min="100" :max="2000" label="图表高度" size="small" style="width: 205px"></el-input-number></div>
                                <div class="tag"><el-tag size="small">X坐标</el-tag></div>
                                <div class="setting"><el-input-number controls-position="right" v-model="localChartX"  :min="0" :max="2000" label="X坐标" size="small" style="width: 205px"></el-input-number></div>
                                <div class="tag"><el-tag size="small">Y坐标</el-tag></div>
                                <div class="setting"><el-input-number controls-position="right" v-model="localChartY"  :min="0" :max="2000" label="Y坐标" size="small" style="width: 205px"></el-input-number></div>
                                <div class="tag"><el-tag size="small">图表背景颜色</el-tag></div>
                                <div class="setting">
                                    <el-row>
                                        <el-col :span="16"> <el-input v-model="comBackgroundColor" size="small"/></el-col>
                                        <el-col :span="8"> <el-color-picker v-model="comBackgroundColor" size="small" show-alpha></el-color-picker></el-col>
                                    </el-row>
                                </div>
                                <div class="tag"><el-tag size="small">图表圆角</el-tag></div>
                                <div class="setting">
                                    <el-input-number controls-position="right" v-model="comBorderRadius"  :min="0" :max="100" label="图表圆角" size="small" style="width: 205px"></el-input-number>
                                </div>
                                <div class="tag"><el-tag size="small">图表边框宽度</el-tag></div>
                                <div class="setting">
                                    <el-input-number controls-position="right" v-model="comBorderWidth"  :min="0" :max="100" label="图表圆角" size="small" style="width: 205px"></el-input-number>
                                </div>
                                <div class="tag"><el-tag size="small">图表边框样式</el-tag></div>
                                <div class="setting">
                                    <el-select v-model="comBorderStyle" placeholder="请选择" size="small">
                                        <el-option
                                                v-for="item in comBorderStyleArray"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="tag"><el-tag size="small">图表边框颜色</el-tag></div>
                                <div class="setting">
                                    <el-row>
                                        <el-col :span="16"> <el-input v-model="comBorderColor" size="small"/></el-col>
                                        <el-col :span="8"> <el-color-picker v-model="comBorderColor" size="small" show-alpha></el-color-picker></el-col>
                                    </el-row>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="数据">
                            <div class="tag"><el-tag size="small">数据绑定</el-tag></div>
                            <div class="setting"><el-radio v-model="dataBingType" label="1"><el-tag size="small">SQL建模</el-tag></el-radio></div>
                            <div class="setting">
                                <el-row>
                                    <el-col :span="8">
                                        <el-select v-model="configproject" placeholder="请选择"  @change="changeConfigProjects"  size="small">
                                            <el-option
                                                    v-for="item in configprojectsoptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="14" :offset="1">
                                        <el-button @click="onProjectEdit" size="small"><i class="el-icon-edit"></i></el-button>
                                        <el-button @click="onProjectPlus" size="small"><i class="el-icon-plus"></i></el-button>
                                        <el-button @click="onProjectDelete" size="small"><i class="el-icon-delete"></i></el-button>
                                    </el-col>
                                </el-row>

                              </div>
                            <div class="tag"><el-tag size="small">维度</el-tag></div>
                            <div class="setting">
                                <el-select multiple v-model="xData" placeholder="请选择">
                                    <el-option
                                            v-for="item in dimensionality"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="tag"><el-tag size="small">度量</el-tag></div>
                            <div class="setting">
                                <el-select multiple  v-model="yData" placeholder="请选择">
                                    <el-option
                                            v-for="item in measurement"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="setting">
                                <el-button round @click="clickDebugChart" size="small">调试</el-button>
                                <el-button round @click="clickRefreshChart" size="small">刷新图表</el-button>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="高级">高级</el-tab-pane>
                    </el-tabs>
                </div>
                <div class="nocontent" v-if="!chartId">
                    <div style="width: 300px">背景图片地址:</div>
                    <div class="split"></div>
                    <div style="width: 300px"><el-input v-model="backgroundImageUrl" size="small"></el-input></div>
                    <div class="split"></div>
                    <div><el-button size="small" @click="setBackgroundImageUrl">设置</el-button>&nbsp;<el-button size="small" @click="saveBackgroundImageUrl">保存</el-button></div>

                </div>
            </div>
            <!--右侧面板end-->
        </div>
        <!--中间和右侧面板end-->

        <!--预览数据对话框start-->
        <el-dialog title="预览数据" :visible.sync="dialogTableVisible">
            <el-table :data="gridData" v-if="gridData.length>0">
                <el-table-column v-for="(item,index) in Object.keys(gridData[0])" :key="index" :property="item" :label="item" width="150"></el-table-column>
            </el-table>
        </el-dialog>
        <!--预览数据对话框end-->

        <!--保存数据源对话框start-->
        <el-dialog title="保存数据源" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
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
        <!--保存数据源对话框end-->

        <!--新建工程对话框start-->
        <el-dialog title="新建工程" :visible.sync="dialogAddProjectVisible" :close-on-click-modal="false">
            <el-form :model="form">
                <el-form-item label="工程名称" :label-width="formLabelWidth">
                    <el-input v-model="form.projectname" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="setDialogAddProject(false)">取 消</el-button>
                <el-button type="primary" @click="clickAddProjectOk">确 定</el-button>
            </div>
        </el-dialog>
        <!--新建工程对话框end-->

        <!--新建页面对话框start-->
        <el-dialog title="新建页面" :visible.sync="dialogAddPageVisible" :close-on-click-modal="false">
            <el-form :model="form">
                <el-form-item label="选择工程" :label-width="formLabelWidth">
                    <el-select v-model="projectnamevalue" placeholder="请选择" size="small">
                        <el-option
                                v-for="item in projectNameList"
                                :key="item._id"
                                :label="item.label"
                                :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="新建页面" :label-width="formLabelWidth">
                    <el-input v-model="form.pagename" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="setDialogAddPage(false)">取 消</el-button>
                <el-button type="primary" @click="clickAddPageOk">确 定</el-button>
            </div>
        </el-dialog>
        <!--新建页面对话框end-->

        <el-dialog :title="sqleditstate?'修改SQL模型':'新增SQL模型'" :visible.sync="dialogProjectVisible" :close-on-click-modal="false">
            <el-form>
                <el-form-item label="SQL模型名称" :label-width="formLabelWidth">
                    <el-input v-model="sqlModelShowName" autocomplete="off" :disabled="sqleditstate"></el-input>
                </el-form-item>
                <el-form-item label="数据源" :label-width="formLabelWidth">
                    <el-select v-model="dbsource" placeholder="请选择" size="small">
                        <el-option
                                v-for="item in dbsourceconfigs"
                                :key="item._id"
                                :label="item.dbconnectionname"
                                :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="SQL语句(*SQL语句对应列和字段的名称要对应)" :label-width="formLabelWidth">
                    <div  ref="monaco" style="height: 120px">
                    </div>
                </el-form-item>
                <el-form-item label="字段" :label-width="formLabelWidth">
                    <div>
                        <el-row :gutter="20">
                            <el-col :span="6" class="fields"><el-tag>原始列名</el-tag></el-col>
                            <el-col :span="6" class="fields"><el-tag>显示列名</el-tag></el-col>
                            <el-col :span="6" class="fields"><el-tag>数据类型</el-tag></el-col>
                            <el-col :span="3" class="fields"><el-tag>操作</el-tag></el-col>
                        </el-row>
                        <div class="split"></div>
                        <div class="divided"></div>
                        <el-row v-for="(item,index) in sqltablefields" :key="index" class="rowfields" :gutter="10">
                            <el-col :span="6" class="fields"><el-input v-model="sqltablefields[index][Object.keys(item)[0]]" autocomplete="off" size="small"></el-input></el-col>
                            <el-col :span="6" class="fields"><el-input v-model="sqltablefields[index][Object.keys(item)[1]]" autocomplete="off" size="small"></el-input></el-col>
                            <el-col :span="6" class="fields">
                                <div class="title">
                                    <el-select v-model="sqltablefields[index][Object.keys(item)[2]]" placeholder="请选择"   size="small">
                                        <el-option
                                                v-for="item in tablefieldsoptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :span="3" class="fields">
                                <div class="title" style="text-align: center"><i class="el-icon-delete" @click="onSqlTableFieldsDelete(index)"></i></div>
                            </el-col>
                        </el-row>
                    </div>
                </el-form-item>
                <div class="sqltablefieldsdelete"><el-tag @click="onSqlTableFieldsAdd"><i class="el-icon-plus"></i></el-tag></div>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="clickDebugChart">调 试</el-button>
                <el-button @click="_saveProject">保 存</el-button>
                <el-button @click="dialogProjectVisible = false">取 消</el-button>
                <el-button type="primary" @click="clickSaveProjectOk">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="调试" :visible.sync="dialogDebugVisible" :close-on-click-modal="false">
            <div class="title">原始伪SQL：</div>
            <br/>
            <div  ref="debugSql" style="height: 120px">
            </div>
            <br/>
            <div class="title">格式化后结果：</div>
            <br/>
            <div  ref="debugResult" style="height: 260px">
                <json-viewer
                        :value="debugJson"
                        :expand-depth=5
                        copyable
                        boxed
                        sort></json-viewer>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDebugVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="this.isSourceEdit?'修改数据库':'新增数据库'" :visible.sync="dialogSourceVisible"  :close-on-click-modal="false">
            <el-form>
                <el-form-item label="连接名" :label-width="formLabelWidth">
                    <el-input v-model="sourceConnectionName" autocomplete="off" :disabled="this.isSourceEdit"></el-input>
                </el-form-item>
                <el-form-item label="连接方式" :label-width="formLabelWidth">
                    <el-select
                            v-model="chooseDbtype" placeholder="请选择"  size="small">
                        <el-option
                                v-for="item in dbtypeoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主机名" :label-width="formLabelWidth">
                    <el-input v-model="sourceHostname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="数据库名" :label-width="formLabelWidth">
                    <el-input v-model="sourceDbname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="sourceUsername" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="sourcePassword" autocomplete="off"  show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="textConnection">测 试</el-button>
                <el-button @click="dialogSourceVisible = false">取 消</el-button>
                <el-button  type="primary" @click="saveSourceDbConfig">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import Vue from 'vue'
    import
    {
        setDataSource,getDataProjects,updateSqlDataSource,
        addPageProjectName,getAllPageProject,addPageName,getPageControlConfig,
        savePageControlConfig,deleteSingleControl,setBackgroundImage,saveDbConfig,
        testConnection,getDbConfigs,deleteDataSource,updateDbConfig,getDbConfig,
        deleteControls
    } from 'api/dbhelper'
    import {getControl} from "api/control"
    //import {socket} from "common/js/socket-client"
    import {mapGetters,mapMutations} from 'vuex'
    import * as monaco from 'monaco-editor'
    import {constructTree} from 'common/js/imputil'
    let TOP_HEIGHT = 125
    let LEFT_WIDTH = 300
    import './projectsetting.styl'
    import {baseConfigApi} from 'common/js/config'
    import {getChartData} from "api/bar"
    import {prefixStyle} from 'common/js/dom'
    import LeftSetting from 'components/leftsetting/leftsetting'
    export default {
        data() {
            return {
                isSourceEdit:false,
                dbsource:'',
                dbsourceconfigs:[],
                sourceConnectionName:'',
                sourceHostname:'',
                sourceDbname:'',
                sourceUsername:'',
                sourcePassword:'',
                dialogSourceVisible:false,
                loading:false,
                backgroundImageUrl:'http://datav.jiaminghi.com/demo/construction-data/img/bg.837e99ea.png',
                projectnamevalue:'',
                comBorderColor:'rgba(255, 255, 255, 0)',
                comBorderStyle:'',
                comBorderStyleArray:[
                    {label:'实线',value:'solid'},
                    {label:'点状',value:'dotted'},
                    {label:'双线',value:'double'},
                    {label:'虚线',value:'dashed'}
                ],
                comBorderWidth:0,
                comBorderRadius:0,
                comBackgroundColor:'rgba(255, 255, 255, 0)',
                scaleValue:100,
                dialogDebugVisible:false,
                sqlstatement:'',
                sqlModelShowName:'',
                sqleditstate:true,
                sqltablefields:[],
                tablefieldsoptions:[
                    {label: '字符串', value: 'string'},
                    {label: '数字', value: 'number'},
                    {label: '日期', value: 'date'}
                ],
                dialogProjectVisible:false,
                dimensionality:[],
                measurement:[],
                xData:'',
                yData:[],
                configproject:'',
                configprojectsoptions:[],
                dataBingType:'1',
                localChartWidth:0,
                localChartHeight:0,
                localChartX:0,
                localChartY:0,
                moveflag:false,
                form:{
                    sourcename:'',
                    projectname:'',
                    pagename:''
                },
                formLabelWidth: '120px',
                dialogFormVisible:false,
                dialogTableVisible:false,
                gridData:[],
                chooseDbtype:'',
                dbtypeoptions:[
                    {
                        value: 'oracle',
                        label: 'oracle',
                        disabled: false
                    },
                    {
                        value: 'mssql',
                        label: 'mssql',
                        disabled: true
                    },
                    {
                        value: 'mysql',
                        label: 'mysql',
                        disabled: false
                    },
                    {
                        value: 'postgress',
                        label: 'postgress',
                        disabled: true
                    }
                ],

                menuIndex: "1",
                treeData: [],
                chartId:'',
                pageId:'',
                debugJson:[]
            };
        },
        computed:{
            ...mapGetters([
                'dialogAddProjectVisible',
                'dialogAddPageVisible',
                'projectNameList'
            ])
        },
        created(){
            //定义一个变量,存储控件配置
            this.controlConfigs = []
            //定义一个变量,存储vue图表实例
            this.chartInstances = new Map()
            this._getProjectTree()
            window.$controlevent = new Vue()
            window.$controlevent.$on('saveSingleControl',conf=>{
                if(conf) {
                    let index = this._getControlConfigs(conf.chartId)
                    conf.pageId = this.pageId
                    if (index > -1) {
                        this.controlConfigs[index] = conf
                    } else {
                        this.controlConfigs.push(conf)
                    }
                }
            })

            window.$controlevent.$on('deleteSingleControl',conf=>{
                if(conf.chartId) {
                    this._deleteSingleControl(conf.chartId)
                }
            })

            window.$controlevent.$on('activeSingleControl',conf=>{
                console.log(this.chartId,conf.chartId)
                if(conf.chartId) {
                    this.chartId = conf.chartId
                    this.localChartWidth= conf.width
                    this.localChartHeight= conf.height
                    this.localChartX= conf.x
                    this.localChartY= conf.y
                    this.comBorderColor= conf.borderColor
                    this.comBorderStyle= conf.borderStyle
                    this.comBorderWidth= conf.borderWidth
                    this.comBorderRadius= conf.borderRadius
                    this.comBackgroundColor= conf.backgroundColor
                    this.configproject = conf.dataId
                }
            })
        },
        mounted(){
         
        },
        watch:{
            dialogProjectVisible(newVal){
                //sql编辑器初始化
                if(newVal){
                    if(!this.$monacoInstance) {
                        setTimeout(() => {
                            this.$monacoInstance = monaco.editor.create(this.$refs.monaco, {
                                value: '',
                                language: 'sql',
                                theme: 'vs-dark',
                                automaticLayout: true
                            })
                        }, 20)
                    }

                }
            },
            dialogDebugVisible(newVal){
                if(newVal){
                    if(!this.$debugSql) {
                        setTimeout(() => {
                            this.$debugSql = monaco.editor.create(this.$refs.debugSql, {
                                value: '',
                                language: 'sql',
                                theme: 'vs-dark',
                                automaticLayout: true
                            })
                        }, 20)
                    }
                    // if(!this.$debugResult) {
                    //     setTimeout(() => {
                    //         this.$debugResult = monaco.editor.create(this.$refs.debugResult, {
                    //             value: '',
                    //             language: 'json',
                    //             theme: 'vs-dark',
                    //             automaticLayout: true
                    //         })
                    //     }, 20)
                    // }
                }
            },
            scaleValue(newVal){
                let percent = newVal*1.0/100
                this.$refs.dashboard.style[prefixStyle('transform')] = `scale(${percent}, ${percent})`
            }
        },
        beforeDestroy(){
            if(this.$monacoInstance){
                this.$monacoInstance.dispose()
            }
            if(this.$debugSql){
                this.$debugSql.dispose()
            }
            // if(this.$debugResult){
            //     this.$debugResult.dispose()
            // }
        },
        methods:{
            clearPage(){
                if(this.pageId){
                    deleteControls(this.pageId).then((res)=>{
                        if(res.data.code === 0){
                            this.controlConfigs = []
                            this.chartInstances.clear()
                            this.$message({
                                type:'success',
                                message:'清除成功'
                            })
                            this.$refs.dashboard.innerHTML = ''
                        }else{
                            this.$message({
                                type:'error',
                                message:'清除失败'
                            })
                        }
                    })
                }
            },
            _getSourceConfigs(){
                getDbConfigs().then(res=>{
                    if(res.data.code == 0){
                        this.dbsourceconfigs = res.data.data
                    }
                }).catch(e=>{
                    console.log(e)
                })
            },
            loadControl(data){
                    const d = data
                    if(d.pageId == this.pageId) {
                        const dv = document.createElement('div')
                        dv.id = `echart${d.el}`
                        this.$refs.dashboard.appendChild(dv)
                        const node = eval(d.code)
                        setTimeout(() => {
                            const instance = new Vue({
                                render: h => h(node.default)
                            }).$mount(`#echart${d.el}`)
                            this.chartInstances.set(`${d.el}`, instance)
                        }, 20)
                        this.loading = false
                    }
            },
            saveBackgroundImageUrl(){
                if(this.pageId&&this.backgroundImageUrl)
                setBackgroundImage(this.pageId,this.backgroundImageUrl).then(res=>{
                    if(res.data.code == 0){
                        this.$message({
                            type:'success',
                            message:'保存成功'
                        })
                    }else{
                        this.$message({
                            type:'error',
                            message:'网络断线了'
                        })
                    }
                })
            },
            setBackgroundImageUrl(){
                if(this.pageId){
                    this.$refs.dashboard.style.backgroundImage = `url(${this.backgroundImageUrl})`
                }
            },
            onClickSearch(gridData){
                this.gridData = gridData
                this.dialogTableVisible = true
            },
            onClickSaveSource(obj){
                this.dialogFormVisible = true
                this.dbtablename = obj.dbtablename
                this.dbsource = obj.id
                this.tablefields = obj.tablefields
            },
            clickSaveSourceOk(){
                if(this.dbtablename&&this.dbsource&&this.form.sourcename) {
                    let mtags = []
                    this.tablefields.forEach((item)=>{
                        let keys = Object.keys(item)
                        let tag = {}
                        tag['value'] = item[keys[0]]
                        tag['label'] = item[keys[1]]
                        tag['type'] = item[keys[2]]
                        mtags.push(tag)
                    })
                    setDataSource(this.dbtablename,this.dbsource,this.form.sourcename,JSON.stringify(mtags)).then((res)=>{
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
                }else{
                    this.$message({
                        type: 'success',
                        message: '无数据'
                    });
                }
            },
            onMouseClickControl(data){
                this.moveflag = data.moveFlag
                this.clickControl = data.clickControl
                this.chartType = data.chartType
            },
            clickAddProjectOk(){
                if(!this.form.projectname){
                    return
                }
                addPageProjectName(this.form.projectname).then((res)=>{
                    if(res.data.code == 0){
                        this.setDialogAddProject(false)
                        this.form.projectname = ''
                        this.$message({
                            type: 'success',
                            message: '新建工程成功'
                        });
                        this._getProjectTree()
                    }else{
                        this.$message({
                            type: 'error',
                            message: '新建工程失败,错误码:'+res.data.code
                        });
                    }
                })
            },
            clickAddPageOk(){
                if(!this.projectnamevalue||!this.form.pagename){
                    return
                }
                addPageName(this.projectnamevalue,this.form.pagename).then((res)=>{
                    if(res.data.code == 0){
                        this.setDialogAddPage(false)
                        this.form.pagename = ''
                        this.projectnamevalue = ''
                        this.$message({
                            type: 'success',
                            message: '新建页面成功'
                        });
                        this._getProjectTree()
                    }else{
                        this.$message({
                            type: 'error',
                            message: '新建页面失败,错误码:'+res.data.code
                        });
                    }
                })
            },
            _deleteSingleControl(chartId){
                let instance = this.chartInstances.get(chartId)
                if(instance){
                    instance.$el.innerHTML = ''
                    this.chartInstances.delete(chartId)
                    let index = this._getControlConfigs(chartId)
                    this.controlConfigs.splice(index,1)
                    deleteSingleControl(chartId).then((res)=>{
                        if(res.data.code == 0){
                            this.$message({
                                type:'success',
                                message:'删除成功'
                            })
                        }else{
                            this.$message({
                                type:'error',
                                message:'网络断线了'
                            })
                        }
                    })
                }
            },
            _getControlConfigs(chartId){
                let index = this.controlConfigs.findIndex(t=>t.chartId === chartId)
                return index
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
            onFullScreen(){
                this.$refs.dashboard.style[prefixStyle('transform')] = `scale(1.0,1.0)`
            },

            _getPageControlConfig(pageId){
                this.pageId = pageId
                getPageControlConfig(pageId).then((res)=>{
                    if(res.data.code === 0){
                        let d = res.data.data
                        if(d.length > 0){
                            this.controlConfigs = d
                            this.loading = true
                        }else{
                            this.controlConfigs = []
                        }
                        this.$refs.dashboard.innerHTML = ''
                        this.controlConfigs.forEach(item=>{
                            //setTimeout(()=>{socket.emit('onDragInControl',item)},10)
                            if(!item.chartId){
                                return
                            }
                            getControl(item).then((res)=>{
                                this.loadControl(res.data)
                            })
                        })
                    }
                })
            },
            handleSelect(item){
                if(item == 1){
                    savePageControlConfig(this.controlConfigs).then((res)=>{
                        if (res.data.code == 0){
                            this.$message({
                                type:'success',
                                message:'保存成功'
                            })
                        }else{
                            this.$message({
                                type:'error',
                                message:'保存失败'
                            })
                        }
                    })
                }
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

                if(dx>0&&dy>0&&this.chartType>0&&!this.pageId){
                    this.$message({
                        type:'error',
                        message:'请先选择页面'
                    })
                    this.chartType = -1
                    return
                }
                if(dx>0&&dy>0&&this.chartType>0){
                    //在坐标(dx,dy)处增加一个默认图表,图表类型是this.chartType
                    let lastConfig = {
                        dx:dx,
                        dy:dy,
                        chartType:this.chartType,
                        pageId:this.pageId
                    }
                    // //读取vuex中存储的图表配置
                    // let oldConfigs = Object.values(this.chartConfigs)
                    // let json = JSON.stringify({
                    //     oldConfigs:oldConfigs,
                    //     lastConfig:lastConfig
                    // })
                    //socket.emit('onDragInControl',lastConfig)
                    getControl(lastConfig).then((res)=>{
                        this.loadControl(res.data)
                    })
                    this.loading = true
                }
                this.chartType = -1
            },
            onClick(e){
                if (e.target.tagName != 'CANVAS'){
                    //this.chartId = ''
                }
            },
            _getDataProjects(){
                getDataProjects().then((res)=>{
                    if(res.data.code == 0){
                        let data = res.data.data
                        this.ConfigProjects = data
                        let mdata = []
                        data.forEach((item)=>{
                            mdata.push({
                                value:item._id,
                                label:item.sourcename
                            })
                        })
                        this.configprojectsoptions = mdata
                    }else{
                        this.$message({
                            type: 'error',
                            message: '网络断线了'
                        });
                    }
                })
            },
            onConfigPanelClick(tab){
                if(tab.label == '数据'){
                    this._getDataProjects()
                }
            },
            _changeBingFields(){
                let index = this.ConfigProjects.findIndex((item)=>item._id == this.configproject)
                if(index>-1){
                    this.xData = ''
                    this.yData = []
                    let tt = JSON.parse(this.ConfigProjects[index].tablefields)
                    this.dbsource = this.ConfigProjects[index].sourceid
                    this.sqltablefields = tt
                    this.sqlstatement = this.ConfigProjects[index].tablename
                    this.dimensionality = tt.filter(t=>t.type !== 'number')
                    this.measurement= tt.filter(t=>t.type === 'number')
                }
            },
            changeConfigProjects(){
                this._changeBingFields()
            },
            clickRefreshChart(){
                let y = []
                this.yData.forEach(item=>{
                    y.push({
                        id:item,
                        name:this.measurement[this.measurement.findIndex((i)=>{return i.value == item})].label
                    })
                })
                let x = this.xData
                let index = this._getControlConfigs(this.chartId)
                let conf = this.controlConfigs[index]
                conf.xData = x
                conf.yData = this.yData
                conf.yFields = y
                conf.dataId = this.configproject

                window.$controlevent.$emit('onDataChartRefresh',conf)
            },
            onProjectEdit(){
                let index = this.configprojectsoptions.findIndex(item=>item.value == this.configproject)
                if(index>-1){
                    this.sqlModelShowName = this.configprojectsoptions[index].label
                    this.sqlstatement = this.ConfigProjects[index].tablename
                    this._getSourceConfigs()
                    this.dbsource =  this.ConfigProjects[index].sourceid
                    this.sqltablefields = JSON.parse(this.ConfigProjects[index].tablefields)
                }else{
                    return
                }
                this.sqleditstate = true
                this.dialogProjectVisible = true
                //SQL语句的处理
                if(!this.sqlstatement.toUpperCase().includes('FROM')){
                    //处理只含有表名的情况
                    if(this.sqltablefields.length>0){
                         let ff = ''
                         this.sqltablefields.map(function(item){
                             ff += `${item.value},\r\n`
                        })
                        ff = ff.substring(0,ff.length-3)
                        this.sqlstatement = `select ${ff} from ${this.sqlstatement}`
                    }
                }
                setTimeout(()=>{
                    this.$monacoInstance.setValue(this.sqlstatement)
                },100)
            },
            onProjectPlus(){
                this.sqltablefields = []
                this.sqlModelShowName = ""
                this.sqleditstate = false
                this.sqlstatement =''
                this.dbsource = ''
                this._getSourceConfigs()
                setTimeout(()=>{
                    this.$monacoInstance.setValue(this.sqlstatement)
                },100)
                this.dialogProjectVisible = true
            },
            onProjectDelete(){
                if(!this.configproject){
                    return
                }
                this.$confirm('此操作将永久删除该数据源, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteDataSource(this.configproject).then(res=>{
                        if(res.data.code == 0){
                            this.$message({
                                type: 'success',
                                message: '已删除'
                            });
                            this.configproject = ''
                            this._getDataProjects()
                        }else{
                            this.$message({
                                type: 'error',
                                message: '删除错误'
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
            onSqlTableFieldsDelete(index){
                this.sqltablefields.splice(index,1)
            },
            onSqlTableFieldsAdd(){
                this.sqltablefields.push({
                    value:'',
                    label:'',
                    type:'number'
                })
            },
            _saveProject(){
                //保存项目的SQL模型配置
                if(this.sqleditstate){
                    updateSqlDataSource(this.sqlModelShowName,this.$monacoInstance.getValue().replace(/\r\n/g,''),this.dbsource,JSON.stringify(this.sqltablefields))
                        .then((res)=>{
                            if(res.data.code == 0){
                                this.$message({
                                    type: 'success',
                                    message: '更新完成'
                                });
                                this._getDataProjects()
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: '网络断线了'
                                });
                            }
                        })
                }else{
                    setDataSource(this.$monacoInstance.getValue().replace(/\r\n/g,''),this.dbsource,this.sqlModelShowName,JSON.stringify(this.sqltablefields))
                        .then((res)=>{
                            if(res.data.code==0){
                                this._getDataProjects()

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
            async clickSaveProjectOk(){
                this.dialogProjectVisible = false
                await this._getDataProjects()
                this._changeBingFields()
            },
            clickDebugChart(){
                if(!this.configproject){
                    this.$message({
                        type: 'error',
                        message: '请选择数据源'
                    });
                    return
                }
                this.dialogDebugVisible = true
                let dataUrl = `${baseConfigApi}/api/getChartDataDynamic?id=${this.configproject}`
                getChartData(dataUrl).then((res)=> {
                    let originSql = this.sqlstatement
                    let resJson = res.data
                    setTimeout(()=>{
                        this.$debugSql.setValue(originSql)
                    },100)
                    setTimeout(()=>{
                        this.debugJson = resJson
                        //this.$debugResult.setValue(JSON.stringify(resJson))
                    },100)


                })
            },

            onBaseChartRefresh(){
                let index = this._getControlConfigs(this.chartId)
                if(index>-1){
                    let conf = this.controlConfigs[index]
                    conf.width = this.localChartWidth
                    conf.height = this.localChartHeight
                    conf.x = this.localChartX
                    conf.y = this.localChartY
                    conf.borderColor = this.comBorderColor
                    conf.borderStyle = this.comBorderStyle
                    conf.borderWidth = this.comBorderWidth
                    conf.borderRadius = this.comBorderRadius
                    conf.backgroundColor = this.comBackgroundColor
                    window.$controlevent.$emit('onBaseChartRefresh', conf)
                }
            },
            onSourcePlus(){
                this.isSourceEdit = false
                this.dialogSourceVisible = true
                this.sourceConnectionName =''
                this.chooseDbtype = ''
                this.sourceHostname = ''
                this.sourceDbname = ''
                this.sourceUsername = ''
                this.sourcePassword = ''
            },
            onSourceEdit(item){
                this.isSourceEdit = true
                this.dialogSourceVisible = true
                getDbConfig(item._id)
                    .then(res=>{
                        if(res.data.code == 0){
                            let d = res.data.data
                            this.sourceConnectionName = d.dbconnectionname
                            this.chooseDbtype = d.dbtype
                            this.sourceHostname = d.dbhost
                            this.sourceDbname = d.dbservername
                            this.sourceUsername = d.dbusername
                            this.sourcePassword = d.dbpassword
                        }
                    })
            },
            saveSourceDbConfig(){
                if(!this.sourceConnectionName||!this.sourceHostname||!this.sourceDbname||!this.sourceUsername||!this.sourcePassword||!this.chooseDbtype){
                   return
                }
                if(this.isSourceEdit){
                    updateDbConfig(this.sourceConnectionName,this.chooseDbtype,this.sourceHostname,this.sourceDbname,this.sourceUsername,this.sourcePassword)
                        .then(res=>{
                            if(res.data.code == 0){
                                this.$message({
                                    type: 'success',
                                    message: '更新成功'
                                });
                                this.dialogSourceVisible = false
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
                }else{
                    saveDbConfig(this.sourceConnectionName,this.chooseDbtype,this.sourceHostname,this.sourceDbname,this.sourceUsername,this.sourcePassword)
                        .then(res=>{
                            if(res.data.code == 0){
                                this.$message({
                                    type: 'success',
                                    message: '保存成功'
                                });
                                this.dialogSourceVisible = false
                            }else if(res.data.code == 300){
                                this.$message({
                                    type: 'error',
                                    message: '连接名重复,请重试'
                                });
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
                }
            },
            textConnection(){
                if(!this.sourceHostname||!this.sourceDbname||!this.sourceUsername||!this.sourcePassword||!this.chooseDbtype){
                    return
                }
                testConnection(this.chooseDbtype,this.sourceHostname,this.sourceDbname,this.sourceUsername,this.sourcePassword)
                    .then(res=>{
                        if(res.data.code == 0){
                            this.$message({
                                type: 'success',
                                message: '连接成功'
                            });
                        }else{
                            this.$message({
                                type: 'error',
                                message: '连接错误,请重试'
                            });
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                        this.$message({
                            type: 'error',
                            message: '连接错误,请重试'
                        });
                    })
            },
            ...mapMutations({
                setDialogAddProject:'DIALOG_ADD_PROJECT_VISIBLE',
                setTreeData:'SET_TREE_DATA',
                setDialogAddPage:'DIALOG_ADD_PAGE_VISIBLE',
            })
        },
        components:{
            LeftSetting:LeftSetting
        }
    }
</script>