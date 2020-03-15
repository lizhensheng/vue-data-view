<template>
    <div class="engine-template-wrapper">
        <div class="relative">
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
                                                'top': (getCommonStyle(item)).chartY +'px'
                                              }"
                                     :z="999"
                                     class="engine-element-item"
                                     >
                    <component :is="item.elName" class="element-on-edit-pane" v-bind="{...item}"/>
            </div>
        </div>
    </div>
</template>

<script>
import {_c_register_components_object} from '@client/plugins/index'
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
             let rotate = item.props[0].fields[2].value.value
             return {
                 chartWidth,
                 chartHeight,
                 chartX,
                 chartY,
                 rotate
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
}

.engine-element-item{
    position: absolute;
}
</style>