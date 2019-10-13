<template>
    <div class="bar">
        <div class="content">
            <router-view></router-view>
        </div>
        <panel-right>
            <div class="drawer-container">
                <div>
                    <h3 class="drawer-title">系统布局配置</h3>
                    <div class="drawer-item">
                        <span>标题颜色</span>
                        <div class="theme-color">
                            <el-color-picker v-model="config.title.textStyle.color" popper-class="theme-message" size="small"></el-color-picker>
                        </div>
                    </div>
                    <div class="drawer-item">
                        <span>标题内容</span>
                            <el-input v-model="config.title.text" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="drawer-item">
                        <span>标题字体大小</span>
                            <el-slider v-model="config.title.textStyle.fontSize"></el-slider>
                    </div>
                    <div class="drawer-item">
                        <span>服务地址</span>
                        <el-select v-model="addr" placeholder="请选择" @change="onAddrChange">
                            <el-option-group
                                    v-for="group in optionsAddr"
                                    :key="group.label"
                                    :label="group.label">
                                <el-option
                                        v-for="item in group.options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    <span style="float: left">{{ item.label }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </div>
                    <div class="drawer-item">
                        <span>x轴显示列</span>
                        <el-select v-model="xData" placeholder="请选择">
                            <el-option
                                    v-for="item in tags"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="drawer-item">
                        <span>y轴显示列</span>
                        <el-select multiple  v-model="yData" placeholder="请选择">
                            <el-option
                                    v-for="item in tags"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="drawer-item">
                        <span>y轴名称</span>
                        <el-input v-model="otherConfig.yTitle" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="drawer-item">
                        <span>y轴单位</span>
                        <el-input v-model="otherConfig.yUnit" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="drawer-item">
                        <span>图表宽度</span>
                        <el-slider v-model="otherConfig.width" :min="300" :max="1000"></el-slider>
                    </div>
                    <div class="drawer-item">
                        <span>图表高度</span>
                        <el-slider v-model="otherConfig.height" :min="300" :max="1000"></el-slider>
                    </div>
                </div>
            </div>
        </panel-right>
    </div>
</template>

<script>
    import PanelRight from 'base/panel-right/panel-right'
    import {barConfig} from "./config"
    import './bar.styl'
    import {normalize} from 'common/js/observer'
    import {baseConfigApi} from "common/js/config"
    import {getChartData} from "api/bar"
    import {socket} from "common/js/socket-client"
    import {debounce} from "common/js/util"

    export default {
        data() {
            return {
                config:{
                    title:{
                        text:'默认标题',
                        textStyle:{
                            color:'#333',
                            fontSize:18
                        }
                    },
                },
                optionsAddr:[],
                addr:'',
                tags:[],
                xData:'',
                yData:[],
                otherConfig:{
                    yTitle:'',
                    yUnit:'',
                    width:600,
                    height:600
                }
            }
        },
        computed:{
            cConfig(){
                if(!this.xData||this.yData.length<=0){
                    return ''
                }
                let commonConfig = Object.assign({},barConfig,this.config)
                let y = []
                this.yData.forEach(item=>{
                    y.push({
                        id:item,
                        name:this.tags[this.tags.findIndex((i)=>{return i.value == item})].label
                    })
                })
                let userConfig = {
                    x:this.xData,
                    y:y,
                    yAxis:[{type: 'value',name: this.otherConfig.yTitle,axisLabel: {formatter: `{value} ${this.otherConfig.yUnit}`}}]
                }
                let dataUrl = baseConfigApi+this.addr
                return {
                    commonConfig,
                    userConfig,
                    dataUrl,
                    width:this.otherConfig.width,
                    height:this.otherConfig.height
                }
            }
        },
        watch:{
            cConfig(newVal){
                if(newVal){
                    socket.emit('onChartConfig',JSON.stringify(newVal))
                }
            },
            "config.title.text"(){
                if(this.cConfig){
                    socket.emit('onChartConfig',JSON.stringify(this.cConfig))
                }
            },
            "config.title.textStyle.color"(){
                if(this.cConfig){
                    socket.emit('onChartConfig',JSON.stringify(this.cConfig))
                }
            },
            "config.title.textStyle.fontSize"(){
                if(this.cConfig){
                    socket.emit('onChartConfig',JSON.stringify(this.cConfig))
                }
            }
        },
        created(){
            this.$router.push({path: '/chart/preview'});
        },
        mounted(){
            this.optionsAddr = normalize()
        },
        components:{
            PanelRight
        },
        methods:{
            onAddrChange(){
                if (this.addr){
                    let fullUrl = baseConfigApi+this.addr
                    getChartData(fullUrl).then(res=>{
                        this.tags = res.data.tags
                    })
                }
            }
        }
    }
</script>