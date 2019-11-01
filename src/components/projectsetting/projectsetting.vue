<template>
    <div class="projectsetting" @mousemove="mouseProjectSetting" @mouseup="mouseUpProjectSetting" ref="projectsetting">
        <!--移动选框start-->
        <div class="moveflag" ref="moveflag" v-show="moveflag">
            <canvas ref="myCanvas" width="20" height="20"
                    style="z-index: 10000">
            </canvas>
        </div>
        <!--移动选框end-->

        <!--左侧面板start-->
        <div class="leftWrapper">
            <keep-alive>
                <el-tabs v-model="activeName">
                <el-tab-pane label="工程管理" name="first">
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </el-tab-pane>
                <el-tab-pane label="控件" name="second">
                    <el-collapse v-model="activeControls">
                        <el-collapse-item title="图表" name="1">
                            <template slot="title">
                                &nbsp;&nbsp;图表<i class="header-icon el-icon-info"></i>
                            </template>
                            <div class="list-container">
                                <ul class="tool-list">
                                    <li @mousedown.prevent.stop="mouseClickControl" v-for="(item,index) in chartModules" :key="index"  :data-chart="item.value">
                                        <span class="tool-item">
                                            <div class="tool-item__icon" :class="`chart-${item.value}`"  :data-chart="item.value" ></div>
                                            <div class="tool-item__name"  :data-chart="item.value" >{{item.name}}</div>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="2">
                            <template slot="title">
                                &nbsp;&nbsp;表格<i class="header-icon el-icon-info"></i>
                            </template>
                            <div class="list-container">
                                <ul class="tool-list">
                                    <li @mousedown.prevent.stop="mouseClickControl" v-for="(item,index) in tableModules" :key="index"  :data-chart="item.value">
                                        <span class="tool-item">
                                            <div class="tool-item__icon" :class="`table-${item.value}`"  :data-chart="item.value" ></div>
                                            <div class="tool-item__name"  :data-chart="item.value" >{{item.name}}</div>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="3">
                            <template slot="title">
                                &nbsp;&nbsp;文字<i class="header-icon el-icon-info"></i>
                            </template>
                            <div class="list-container">
                                <ul class="tool-list">
                                    <li @mousedown.prevent.stop="mouseClickControl" v-for="(item,index) in textModules" :key="index"  :data-chart="item.value">
                                        <span class="tool-item">
                                            <div class="tool-item__icon" :class="`text-${item.value}`"  :data-chart="item.value" ></div>
                                            <div class="tool-item__name"  :data-chart="item.value" >{{item.name}}</div>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="4">
                            <template slot="title">
                                &nbsp;&nbsp;媒体<i class="header-icon el-icon-info"></i>
                            </template>
                            <div class="list-container">
                                <ul class="tool-list">
                                    <li @mousedown.prevent.stop="mouseClickControl" v-for="(item,index) in mediaModules" :key="index"  :data-chart="item.value">
                                        <span class="tool-item">
                                            <div class="tool-item__icon" :class="`media-${item.value}`"  :data-chart="item.value" ></div>
                                            <div class="tool-item__name"  :data-chart="item.value" >{{item.name}}</div>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </el-collapse-item>
                    </el-collapse>

                </el-tab-pane>
                <el-tab-pane label="数据源" name="third">
                    <div class="dbsource">
                        <el-row>
                            <el-col :span="8"><div class="grid-content bg-purple"><div class="title">数据源:</div></div></el-col>
                            <el-col :span="16"><div class="grid-content bg-purple-light">
                                <el-select v-model="dbtype" placeholder="请选择" @change="changeDbType" size="small">
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
                    <div class="split"></div>
                    <div class="split"></div>
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
                    <div class="split"></div>
                    <div class="divided"></div>
                    <div class="search">
                        <el-row>
                            <el-col :span="8">
                                <el-button round @click="clickSaveSource" size="small">保存数据源</el-button>
                            </el-col>
                            <el-col :span="6" :offset="10">
                                <el-button round @click="clickSearch" size="small">查询</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
            </el-tabs>
            </keep-alive>
        </div>
        <!--左侧面板end-->

        <!--中间和右侧面板start-->
        <div class="rightWrapper">
            <!--中间面板start-->
            <div class="editor">
                    <div class="editor-panel">
                        <el-menu :default-active="menuIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                            <el-menu-item index="1" >预览</el-menu-item>
                        </el-menu>
                        <div class="editor-body" v-if="!docdesc" @click="onClick">
                            <div class="containerWrapper">
                                <div class="dashboard-background-image" ref="dashboard">

                                </div>
                            </div>
                        </div>
                        <div class="bottom-panel">
                            <span>面板缩放百分比</span>
                            <input class="range" type="range" min="10" max="200" step="1"  v-model="scaleValue" >
                            <input class="number" type="number" min="10" max="200" step="1"  v-model="scaleValue">
                            <i class="el-icon-full-screen" @click="onFullScreen"></i>
                        </div>
                        <div v-if="docdesc">
                            文档
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
                                <div class="tag"><el-tag size="small">图表id</el-tag></div>
                                <div class="setting"><el-tag size="small">{{chartId}}</el-tag></div>
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
                                    <el-col :span="14">
                                        <el-select v-model="configproject" placeholder="请选择"  @change="changeConfigProjects"  size="small">
                                            <el-option
                                                    v-for="item in configprojectsoptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="9" :offset="1"> <el-button @click="onProjectEdit" size="small"><i class="el-icon-edit"></i></el-button><el-button @click="onProjectPlus" size="small"><i class="el-icon-plus"></i></el-button>
                                    </el-col>
                                </el-row>

                              </div>
                            <div class="tag"><el-tag size="small">维度</el-tag></div>
                            <div class="setting">
                                <el-select v-model="xData" placeholder="请选择">
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
                    点击控件进行配置
                </div>
            </div>
            <!--右侧面板end-->
        </div>
        <!--中间和右侧面板end-->

        <!--预览数据对话框start-->
        <el-dialog title="预览数据(展示前5条)" :visible.sync="dialogTableVisible">
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

        <el-dialog :title="sqleditstate?'修改SQL模型':'新增SQL模型'" :visible.sync="dialogProjectVisible" :close-on-click-modal="false">
            <el-form>
                <el-form-item label="SQL模型名称" :label-width="formLabelWidth">
                    <el-input v-model="sqlModelShowName" autocomplete="off" :disabled="sqleditstate"></el-input>
                </el-form-item>
                <el-form-item label="数据源" :label-width="formLabelWidth">
                    <el-select v-model="sqldbtype" placeholder="请选择" @change="changeDbType" size="small">
                        <el-option
                                v-for="item in dbtypeoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
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
                                    <el-select v-model="sqltablefields[index][Object.keys(item)[2]]" placeholder="请选择"  @change="changeTablename"  size="small">
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
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDebugVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import Vue from 'vue'
    import {getTableNames,getDataset,setDataSource,getDataProjects,updateSqlDataSource} from 'api/dbhelper'
    import {socket} from "common/js/socket-client"
    import Index from 'components/page/index'
    import {mapGetters,mapMutations} from 'vuex'
    import BScroll from 'better-scroll'
    import * as monaco from 'monaco-editor'
    let TOP_HEIGHT = 125
    let LEFT_WIDTH = 300
    import './projectsetting.styl'
    import {baseConfigApi} from 'common/js/config'
    import {getChartData} from "api/bar"
    import {prefixStyle} from 'common/js/dom'
    export default {
        data() {
            return {
                mediaModules:[{
                    name:'图片',
                    value:1
                },{
                    name:'图片轮播',
                    value:2
                },{
                    name:'视频',
                    value:3
                },{
                    name:'天气预报',
                    value:4
                }],
                textModules:[{
                    name:'文本',
                    value:1
                },{
                    name:'超链接',
                    value:2
                },{
                    name:'跑马灯',
                    value:3
                }],
                tableModules:[{
                    name:'表格',
                    value:1
                },{
                    name:'轮播表格',
                    value:1
                }],
                chartModules:[{
                    name:'折线图',
                    value:1
                },{
                    name:'柱状图',
                    value:2
                },{
                    name:'饼图',
                    value:3
                },{
                    name:'圆环图',
                    value:4
                },{
                    name:'散点图',
                    value:5
                },{
                    name:'K线图',
                    value:6
                },{
                    name:'雷达图',
                    value:7
                },{
                    name:'树图',
                    value:8
                },{
                    name:'地图',
                    value:9
                },{
                    name:'飞线图',
                    value:10
                },{
                    name:'关系图',
                    value:11
                },{
                    name:'仪表盘',
                    value:12
                }],
                activeControls:['1','2','3','4'],
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
                sqldbtype:'',
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
        computed:{
           ...mapGetters(
               ['chartId','storePosition','chartConfigs','increaseId','increaseIdForData']
           )
        },
        created(){

        },
        mounted(){
          socket.on('reply',data => {
              console.log(data)
              const d = JSON.parse(data)
              const dv = document.createElement('div')
              dv.id = `echart${d.el}`
              this.$refs.dashboard.appendChild(dv)
              const node = eval(d.code)
              const instance = new Vue({
                  render: h => h(node.default)
              }).$mount(`#echart${d.el}`)
          })
        },
        watch:{
            increaseId(){
                let pos = this.storePosition(this.chartId)
                this.localChartWidth = pos.width
                this.localChartHeight = pos.height
                this.localChartX = pos.x
                this.localChartY = pos.y
                this.comBackgroundColor = pos.backgroundColor
                this.comBorderColor = pos.borderColor
                this.comBorderRadius = pos.borderRadius
                this.comBorderStyle = pos.borderStyle
                this.comBorderWidth = pos.borderWidth
            },
            localChartWidth(newVal){
                if(this.chartWidth == newVal){
                    return
                }
                let pos = this.storePosition(this.chartId)
                this.setPosition({id:this.chartId,x:pos.x,y:pos.y,width:newVal,height:pos.height})
                let position = {
                    dx:pos.x,
                    dy:pos.y,
                    width:newVal,
                    height:pos.height,
                    chartId:this.chartId
                }
            },
            localChartHeight(newVal){
                if(this.chartHeight == newVal){
                    return
                }
                let pos = this.storePosition(this.chartId)
                this.setPosition({id:this.chartId,x:pos.x,y:pos.y,width:pos.width,height:newVal})
                let position = {
                    dx:pos.x,
                    dy:pos.y,
                    width:pos.width,
                    height:newVal,
                    chartId:this.chartId
                }
            },
            localChartX(newVal){
                if(this.chartX == newVal){
                    return
                }
                let pos = this.storePosition(this.chartId)
                this.setPosition({id:this.chartId,x:newVal,y:pos.y,width:pos.width,height:pos.height})
                let position = {
                    dx:newVal,
                    dy:pos.y,
                    width:pos.width,
                    height:pos.height,
                    chartId:this.chartId
                }
            },
            localChartY(newVal){
                if(this.chartY == newVal){
                    return
                }
                let pos = this.storePosition(this.chartId)
                this.setPosition({id:this.chartId,x:pos.x,y:newVal,width:pos.width,height:pos.height})
                let position = {
                    dx:pos.x,
                    dy:newVal,
                    width:pos.width,
                    height:pos.height,
                    chartId:this.chartId
                }
            },
            comBackgroundColor(newVal){
                this.setPosition({id:this.chartId,backgroundColor:newVal})
                this.setIncreaseId(this.increaseId+1)
            },
            comBorderColor(newVal) {
                this.setPosition({id:this.chartId,borderColor:newVal})
                this.setIncreaseId(this.increaseId+1)
            },
            comBorderStyle(newVal) {
                this.setPosition({id:this.chartId,borderStyle:newVal})
                this.setIncreaseId(this.increaseId+1)
            },
            comBorderWidth(newVal){
                this.setPosition({id:this.chartId,borderWidth:newVal})
                this.setIncreaseId(this.increaseId+1)
            },
            comBorderRadius(newVal){
                this.setPosition({id:this.chartId,borderRadius:newVal})
                this.setIncreaseId(this.increaseId+1)
            },
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
                    if(!this.$debugResult) {
                        setTimeout(() => {
                            this.$debugResult = monaco.editor.create(this.$refs.debugResult, {
                                value: '',
                                language: 'json',
                                theme: 'vs-dark',
                                automaticLayout: true
                            })
                        }, 20)
                    }
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
            if(this.$debugResult){
                this.$debugResult.dispose()
            }
        },
        methods:{
            onBorderWidth(){
                // this.setPosition({id:this.chartId,borderWidth:this.comBorderWidth})
                // this.setIncreaseId(this.increaseId+1)
            },
            onBorderRadius(){
                // this.setPosition({id:this.chartId,borderRadius:this.comBorderRadius})
                // this.setIncreaseId(this.increaseId+1)
            },
            onFullScreen(){
                this.$refs.dashboard.style[prefixStyle('transform')] = `scale(1.0,1.0)`
            },
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
            _getDataType(data){
                if(typeof data == 'number'){
                    return 'number'
                }else if(/^\d{4}-\d{2}-\d{2}.+/.test(data)){
                    return  'date'
                }else{
                    return 'string'
                }
            },
            changeTablename(){
                if(this.dbtablename&&this.dbtype){
                    getDataset('',this.dbtablename,this.dbtype).then((res)=>{
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
                    let mtags = []
                    this.tablefields.forEach((item)=>{
                        let keys = Object.keys(item)
                        let tag = {}
                        tag['value'] = item[keys[0]]
                        tag['label'] = item[keys[1]]
                        tag['type'] = item[keys[2]]
                        mtags.push(tag)
                    })
                    setDataSource(this.dbtablename,this.dbtype,this.form.sourcename,JSON.stringify(mtags)).then((res)=>{
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
                    let lastConfig = {
                        dx:dx,
                        dy:dy,
                        chartType:this.chartType
                    }
                    // //读取vuex中存储的图表配置
                    // let oldConfigs = Object.values(this.chartConfigs)
                    // let json = JSON.stringify({
                    //     oldConfigs:oldConfigs,
                    //     lastConfig:lastConfig
                    // })
                    let json = JSON.stringify(lastConfig)
                    socket.emit('onDragInControl',json)
                }
                this.chartType = -1
            },
            onClick(e){
                if (e.target.tagName != 'CANVAS'){
                    this.setChartId('')
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
                    this.sqldbtype = this.ConfigProjects[index].dbtype
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
                if(!this.xData || this.yData.length === 0)
                {
                    return
                }
                let y = []
                this.yData.forEach(item=>{
                    y.push({
                        id:item,
                        name:this.measurement[this.measurement.findIndex((i)=>{return i.value == item})].label
                    })
                })
                let x = this.xData

                //let dataUrl = `${baseConfigApi}/getChartDataDynamic?id=${this.configproject}`
                this.setPosition({id:this.chartId,xData:x,yData:this.yData,yFields:y,dataId:this.configproject})
                this.setIncreaseIdForData(this.increaseIdForData+1)
            },
            onProjectEdit(){
                let index = this.configprojectsoptions.findIndex(item=>item.value == this.configproject)
                if(index>-1){
                    this.sqlModelShowName = this.configprojectsoptions[index].label
                    this.sqlstatement = this.ConfigProjects[index].tablename
                    this.sqldbtype =  this.ConfigProjects[index].dbtype
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
                },200)
            },
            onProjectPlus(){
                this.sqldbtype = ''
                this.sqltablefields = []
                this.sqlModelShowName = ""
                this.sqleditstate = false
                this.sqlstatement =''
                setTimeout(()=>{
                    this.$monacoInstance.setValue(this.sqlstatement)
                },200)
                this.dialogProjectVisible = true
            },
            onTableFieldsDelete(index){
                this.tablefields.splice(index,1)
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
                    updateSqlDataSource(this.sqlModelShowName,this.$monacoInstance.getValue().replace(/\r\n/g,''),this.sqldbtype,JSON.stringify(this.sqltablefields))
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
                    setDataSource(this.$monacoInstance.getValue().replace(/\r\n/g,''),this.sqldbtype,this.sqlModelShowName,JSON.stringify(this.sqltablefields))
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
                        this.$debugResult.setValue(JSON.stringify(resJson))
                    },100)


                })
            },
            ...mapMutations({
                setChartId:'SET_CHART_ID',
                setPosition:'SET_POSITION',
                setIncreaseId:'SET_INCREASE_ID',
                setIncreaseIdForData:'SET_INCREASE_UPDATE_DATA'
            })
        },
        components:{
            Index
        }
    }
</script>