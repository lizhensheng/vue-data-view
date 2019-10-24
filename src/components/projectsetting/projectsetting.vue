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
                        <div style="width:300px">
                            <el-row>
                                <el-col :span="7" class="fields"><h3>原始列名</h3></el-col>
                                <el-col :span="10" class="fields"><h3>显示列名</h3></el-col>
                                <el-col :span="7" class="fields"><h3>数据类型</h3></el-col>
                            </el-row>
                            <div class="split"></div>
                            <div class="divided"></div>
                            <el-row v-for="(item,index) in tablefields" :key="index" class="rowfields">
                                <el-col :span="7" class="fields"><div class="title">{{Object.keys(item)[0]}}</div></el-col>
                                <el-col :span="10" class="fields"><el-input v-model="tablefields[index][Object.keys(item)[1]]" autocomplete="off" size="small"></el-input></el-col>
                                <el-col :span="7" class="fields"><div class="title">{{tablefields[index][Object.keys(item)[2]]}}</div></el-col>
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
            <div class="css-sqdry3">

                    <div class="css-1qkwt59">
                        <el-menu :default-active="menuIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                            <el-menu-item index="1" >预览</el-menu-item>
                        </el-menu>

                            <div class="css-10ro1m" v-if="!docdesc" @click="onClick">
                                <div class="dashboard-background-image">
                                    <Index></Index>
                                </div>
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
                                <div class="setting"><el-tag type="info" size="small">{{chartId}}</el-tag></div>
                                <div class="tag"><el-tag size="small">宽度</el-tag></div>
                                <div class="setting"><el-input-number v-model="localChartWidth"  :min="100" :max="1000" label="图表宽度" size="small"></el-input-number></div>
                                <div class="tag"><el-tag size="small">高度</el-tag></div>
                                <div class="setting"><el-input-number v-model="localChartHeight"  :min="100" :max="1000" label="图表高度" size="small"></el-input-number></div>
                                <div class="tag"><el-tag size="small">X坐标</el-tag></div>
                                <div class="setting"><el-input-number v-model="localChartX"  :min="0" :max="1000" label="X坐标" size="small"></el-input-number></div>
                                <div class="tag"><el-tag size="small">Y坐标</el-tag></div>
                                <div class="setting"><el-input-number v-model="localChartY"  :min="0" :max="1000" label="Y坐标" size="small"></el-input-number></div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="数据">
                            <div class="tag"><span>数据绑定</span></div>
                            <div class="setting"><el-radio v-model="dataBingType" label="1">SQL建模</el-radio></div>
                            <div class="setting">
                                <el-select v-model="configproject" placeholder="请选择"  @change="changeConfigProjects"  size="small">
                                    <el-option
                                            v-for="item in configprojectsoptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                &nbsp;<i class="el-icon-edit"></i>&nbsp;<i class="el-icon-plus"></i>
                            </div>
                            <div class="tag"><span>维度</span></div>
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
                            <div class="tag"><span>度量</span></div>
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
                                <el-button round @click="clickRefreshChart" size="small">刷新图表</el-button>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="高级">高级</el-tab-pane>
                        <el-tab-pane label="下钻">下钻</el-tab-pane>
                        <el-tab-pane label="联动">联动</el-tab-pane>
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
        <!--保存数据源对话框end-->
    </div>
</template>
<script>
    import {getTableNames,getDataset,setDataSource,getDataProjects} from 'api/dbhelper'
    import {socket} from "common/js/socket-client"
    import Index from 'components/page/index'
    import {mapGetters,mapMutations} from 'vuex'
    import BScroll from 'better-scroll'
    let TOP_HEIGHT = 125
    let LEFT_WIDTH = 300
    import './projectsetting.styl'
    export default {
        data() {
            return {
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
               ['chartId','chartWidth','chartHeight','chartX','chartY','storePosition','increaseId']
           )
        },
        created(){
            // this.localChartWidth = this.chartWidth
            // this.localChartHeight = this.chartHeight
            // this.localChartX = this.chartX
            // this.localChartY = this.chartY
        },
        watch:{
            // chartWidth(newVal){
            //     this.localChartWidth = this.storePosition(this.chartId).width
            // },
            // chartHeight(newVal){
            //     this.localChartHeight = newVal
            // },
            // chartX(newVal){
            //     this.localChartX = newVal
            // },
            // chartY(newVal){
            //     this.localChartY = newVal
            // },
            increaseId(newVal){
                console.log(newVal)
                let pos = this.storePosition(this.chartId)
                console.log(pos)
                this.localChartWidth = pos.width
                this.localChartHeight = pos.height
                this.localChartX = pos.x
                this.localChartY = pos.y
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
                socket.emit('onSingleChartSimpleConfig',JSON.stringify(position))
                this.setIncreaseId(this.increaseId+1)
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
                socket.emit('onSingleChartSimpleConfig',JSON.stringify(position))
                this.setIncreaseId(this.increaseId+1)
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
                socket.emit('onSingleChartSimpleConfig',JSON.stringify(position))
                this.setIncreaseId(this.increaseId+1)
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
                socket.emit('onSingleChartSimpleConfig',JSON.stringify(position))
                this.setIncreaseId(this.increaseId+1)
            }
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
                    let obj = {
                        dx:dx,
                        dy:dy,
                        chartType:this.chartType
                    }
                    socket.emit('onDragInControl',JSON.stringify(obj))
                }
                this.chartType = -1
            },
            onClick(e){
                if (e.target.tagName != 'CANVAS'){
                    this.setChartId('')
                }
            },
            onConfigPanelClick(tab){
                if(tab.label == '数据'){
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
                }
            },
            changeConfigProjects(){
                let index = this.ConfigProjects.findIndex((item)=>item._id == this.configproject)
                let tt = JSON.parse(this.ConfigProjects[index].tablefields)
                this.dimensionality = tt.filter(t=>t.type !== 'number')
                this.measurement= tt.filter(t=>t.type === 'number')
            },
            clickRefreshChart(){

            },
            ...mapMutations({
                setChartId:'SET_CHART_ID',
                setChartWidth:'SET_CHART_WIDTH',
                setChartHeight:'SET_CHART_HEIGHT',
                setChartX:'SET_CHART_X',
                setChartY:'SET_CHART_Y',
                setPosition:'SET_POSITION',
                setIncreaseId:'SET_INCREASE_ID'
            })
        },
        components:{
            Index
        }
    }
</script>