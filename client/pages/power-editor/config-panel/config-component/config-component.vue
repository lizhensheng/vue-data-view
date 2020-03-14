<template>
    <div class="config-component" v-show="activeElement">
         <y-tabs position='top'>
            <y-tab-panel :iconClass="item.info.iconClass" :name="item.info.title" v-for="(item,index) in activeElement && activeElement.props" :key="index">
                <y-form-item :title="fItem.title" :width="70" :height="30" v-for="(fItem, fIndex) in item.fields" :key="fIndex">
                    <div v-if="fItem.type !== 'group'">
                        <component :is="fItem.type" v-bind="{...fItem.value}" v-model="fItem.value.value"/>
                    </div>
                    <div v-else class="config-value_item">
                        <div v-for="(vItem,vIndex) in fItem.value" :key="vIndex">
                            <div v-if="vItem.showTitle"  class="config-value_item_wrap">
                                <y-form-item :title="vItem.title"  :width="70" :height="30">
                                    <component :is="vItem.type" v-bind="{...vItem.value}" v-model="vItem.value.value"/>
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
    watch:{
        activeElement(val){
        }
    },
    mounted(){
        
    }
}
</script>

<style lang="stylus" scoped>
.config-component{
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