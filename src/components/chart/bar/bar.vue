<template>
    <div class="bar">
        <panel-right>
            <div class="drawer-container">
                <div>
                    <h3 class="drawer-title">系统布局配置</h3>
                    <div class="drawer-item">
                        <span>主题色</span>
                        <div class="theme-color">
                            <el-color-picker v-model="color1" popper-class="theme-message" size="small"></el-color-picker>
                        </div>
                    </div>
                    <div class="drawer-item">
                        <span>开启 Tags-View</span>
                        <div class="theme-color">
                            <el-switch
                                    v-model="value"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </div>
                    </div>
                    <div class="drawer-item">
                        <span>开启 Tags-View</span>
                        <div class="theme-color">
                            <el-switch
                                    v-model="value"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </div>
                    </div>
                </div>
            </div>
        </panel-right>
    </div>
</template>

<script>
    import PanelRight from 'base/panel-right/panel-right'
    import './bar.styl'

    export default {
        data() {
            return {
                color1: '#409EFF',
                value:false
            }
        },
        components:{
            PanelRight
        }
    }
</script>