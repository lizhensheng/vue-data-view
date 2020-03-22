<template>
    <div class="config-component" v-show="activeElement">
         <y-tabs position='top' @switchTab="onSwitchTab">
            <y-tab-panel :iconClass="item.info.iconClass" :name="item.info.title" v-for="(item,index) in localProps" :key="index">
                <y-form-item :title="fItem.title" 
                             :width="fItem.width?fItem.width:70" 
                             :height="fItem.align ==='topToBottom'? 'auto' : fItem.height?fItem.height:40" 
                             v-for="(fItem, fIndex) in item.fields" 
                             :key="fIndex" 
                             :align="fItem.align"
                             :staticTitle = "fItem.staticTitle"
                >
                    <div v-if="fItem.type !== 'group'" class="config-content_wrap">
                        <component :is="fItem.type" 
                                    v-bind="{...fItem.value}" 
                                    v-model="item.fields[0].value[fItem.value.value]" 
                                    v-if="fItem.value.valueType && fItem.value.valueType === 'refer'"/>
                        <component :is="fItem.type" v-bind="{...fItem.value}" v-model="fItem.value.value" v-else/>
                    </div>
                    <div v-else class="config-value_item" :class="fItem.value[0].align">
                        <div v-for="(vItem,vIndex) in fItem.value" :key="vIndex">
                            <div v-if="vItem.showTitle"  class="config-value_item_wrap">
                                <y-form-item :title="vItem.title"  
                                             :width="vItem.width?vItem.width:70" :height="vItem.height?vItem.height:40"  
                                             :align="vItem.align" 
                                             :staticTitle = "vItem.staticTitle">
                                             <div  v-if="vItem.value.valueType && vItem.value.valueType === 'refer'" class="config-refer_item">
                                                <component :is="vItem.type" 
                                                            v-bind="{...vItem.value}" 
                                                            v-model="fItem.value[0].value[vItem.value.value]" 
                                                 />
                                             </div>
                                             <div v-else class="config-refer_item">  
                                                 <component :is="vItem.type" v-bind="{...vItem.value}" v-model="vItem.value.value"/>   
                                             </div>
                                    
                                </y-form-item>
                            </div>
                            <div v-else  class="config-value_item_wrap">
                                 <div  v-if="vItem.value.valueType && vItem.value.valueType === 'refer'" class="config-refer_item">
                                    <component :is="vItem.type" v-bind="{...vItem.value}" v-model="fItem.value[0].value[vItem.value.value]"/>
                                 </div>
                                 <div v-else class="config-refer_item">
                                      <component :is="vItem.type" v-bind="{...vItem.value}" v-model="vItem.value.value"/>
                                 </div>
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
import SelectImage from '@/components/select-image/select-image'

export default {
    name: 'ConfigComponent',
    data(){
        return {
           tabIndex: 0
        }
    },
    computed:{
        localProps(){
            return this.activeElement ? this.activeElement.props : []
        },
        ...mapGetters([
            'activeElement'
        ])
    },
    watch:{
        localProps(){
            
        }
    },
    methods:{
        onSwitchTab(name, index){
            this.tabIndex = index
        }
    },
    mounted(){
    },
    updated(index){
        if(this.tabIndex == 1 && this.localProps.length >= 2){
            this.$bus.$emit('createMonacoInstance')
        }
    },
    components: {
        EditSource,
        ResponseData,
        ConfigSource,
        SelectImage
    }
}
</script>

<style lang="stylus" scoped>
.config-component{
    position: relative;
    display: flex;
    width: 332px;
    .config-content_wrap{
        width: 100%;
        height: 100%;
    }
    .config-value_item{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
         &.topToBottom{
            display:flex;
            flex-direction: column;
            margin-bottom: 10px;
        }
        .config-refer_item{
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
        }
    }
}
.ui-tab-panel{
    padding:0 10px;
}
</style>