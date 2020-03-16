<template>
    <div class="config-component" v-show="activeElement">
         <y-tabs position='top' @switchTab="onSwitchTab">
            <y-tab-panel :iconClass="item.info.iconClass" :name="item.info.title" v-for="(item,index) in activeElement && activeElement.props" :key="index">
                <y-form-item :title="fItem.title" 
                             :width="70" 
                             :height="fItem.align ==='topToBottom'? 0 : 40" 
                             v-for="(fItem, fIndex) in item.fields" 
                             :key="fIndex" 
                             :align="fItem.align"
                             :staticTitle = "fItem.staticTitle"
                >
                    <div v-if="fItem.type !== 'group'">
                        <component :is="fItem.type" 
                                    v-bind="{...fItem.value}" 
                                    v-model="item.fields[0].value[fItem.value.value]" 
                                    v-if="fItem.value.valueType && fItem.value.valueType === 'refer'"/>
                        <component :is="fItem.type" v-bind="{...fItem.value}" v-model="fItem.value.value" v-else/>
                    </div>
                    <div v-else class="config-value_item">
                        <div v-for="(vItem,vIndex) in fItem.value" :key="vIndex">
                            <div v-if="vItem.showTitle"  class="config-value_item_wrap">
                                <y-form-item :title="vItem.title"  
                                             :width="70" :height="30"  
                                             :align="vItem.align" 
                                             :staticTitle = "vItem.staticTitle">
                                    <component :is="vItem.type" 
                                                v-bind="{...vItem.value}" 
                                                v-model="fItem.value[0].value[vItem.value.value]" 
                                                v-if="vItem.value.valueType && vItem.value.valueType === 'refer'"/>
                                    <component :is="vItem.type" v-bind="{...vItem.value}" v-model="vItem.value.value" v-else/>
                                </y-form-item>
                            </div>
                            <div v-else  class="config-value_item_wrap">
                                 <component :is="vItem.type" v-bind="{...vItem.value}" v-model="vItem.value.value"/>
                            </div>
                        </div>
                    </div>
                </y-form-item>
            </y-tab-panel>
        </y-tabs>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import EditSource from '@/components/edit-source/edit-source'
import ResponseData from '@/components/response-data/response-data'
import ConfigSource from '@/components/config-source/config-source'

export default {
    name: 'ConfigComponent',
    data(){
        return {
           
        }
    },
    computed:{
        ...mapGetters([
            'activeElement'
        ])
    },
    methods:{
        onSwitchTab(name){
            if(name === '第二页'){
                this.$bus.$emit('createMonacoInstance')
            }
        }
    },
    mounted(){
    },
    watch:{
        activeElement(val){
            if(val){
                 this.$bus.$emit('createMonacoInstance')
            }
        }
    },
    components: {
        EditSource,
        ResponseData,
        ConfigSource
    }
}
</script>

<style lang="stylus" scoped>
.config-component{
    position: relative;
    display: flex;
    width: 332px;
    .config-value_item{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
}
.ui-tab-panel{
    padding:0 10px;
}
</style>