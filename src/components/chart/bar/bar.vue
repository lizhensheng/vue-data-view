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
                        <el-select v-model="value" placeholder="请选择">
                            <el-option-group
                                    v-for="group in options"
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
                        <span>{{config.title.textStyle.color}}</span>
                    </div>
                    <div class="drawer-item">
                        <span>{{config.title.text}}</span>
                    </div>
                    <div class="drawer-item">
                        <span>{{config.title.textStyle.fontSize}}</span>
                    </div>
                    <div class="drawer-item">
                        <span>{{cconfig}}</span>
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
                dataAddr:'',
                options:[],
                value:''
            }
        },
        computed:{
          cconfig(){
              return Object.assign({},barConfig,this.config)
            }
        },
        mounted(){
            this.options = normalize()
        },
        components:{
            PanelRight
        }
    }
</script>