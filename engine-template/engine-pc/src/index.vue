<template>
    <div class="engine-template-wrapper">
        <div class="relative" :style="{...getProjectStyle()}">
            <!--页面组件列表展示-->
            <div v-for="item in projectInfo.pages[0].elements"
                                     :key="item.uuid"
                                     :ref="item.uuid"
                                     :data-uuid="item.uuid"
                                     :style="{
                                                'transform': `rotate(${(getCommonStyle(item)).rotate}deg)`,
                                                'width': (getCommonStyle(item)).chartWidth +'px',
                                                'height': (getCommonStyle(item)).chartHeight +'px',
                                                'left': (getCommonStyle(item)).chartX +'px',
                                                'top': (getCommonStyle(item)).chartY +'px',
                                                'zIndex': (getCommonStyle(item)).zindex
                                              }"
                                     class="engine-element-item"
                                     >
                    <component :is="item.elName" 
                                class="element-on-edit-pane" 
                                v-bind="{...item}"
                                :width="(getCommonStyle(item)).chartWidth" 
                                :height="(getCommonStyle(item)).chartHeight"/>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import '../../../client/common/styles/element-variable.scss'
import {_c_register_components_object} from '@client/plugins/index'
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
import Element from 'element-ui'
Vue.use(dataV)
Vue.use(Element)
export default {
    name:'ShowData',
    data(){
        return {
            projectInfo:{
                pages:[]
            }
        }
    },
    created(){
        this.projectInfo = window._projectInfo
    },
    methods:{
        getCommonStyle(item){
             //读取基本配置
             let chartWidth = item.props[0].fields[0].value[0].value.value
             let chartHeight = item.props[0].fields[0].value[1].value.value
             let chartX = item.props[0].fields[1].value[0].value.value
             let chartY = item.props[0].fields[1].value[1].value.value
             let zindex = item.props[0].fields[1].value[2].value.value
             let rotate = item.props[0].fields[2].value.value
             return {
                 chartWidth,
                 chartHeight,
                 chartX,
                 chartY,
                 zindex,
                 rotate
             }
         },
         getProjectStyle(){
            return {
                width: this.projectInfo.screenWidth +'px' ,
                height: this.projectInfo.screenHeight +'px',
                backgroundColor: this.projectInfo.backgroundColor,
                backgroundImage: `url('${this.projectInfo.backgroundImage}')`,
                margin: '0 auto'
            }
         }
    },
    components:{
        ..._c_register_components_object
    }
}
</script>

<style scoped>
.engine-template-wrapper{
    position: relative;
    width:100%;
    height:100%;
}

.relative{
    position:relative;
    background-size: 100% 100%;
}

.engine-element-item{
    position: absolute;
}

  /**
 *  滚动条的样式
 **/
 html::-webkit-scrollbar,body::-webkit-scrollbar,div::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}
html::-webkit-scrollbar-thumb,body::-webkit-scrollbar-thumb,div::-webkit-scrollbar-thumb {
    background-color: #434b55;
}
</style>