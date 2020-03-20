<template>
    <div class="page panel">
        <div class="panel-header">
            <span class="panel-header_title marginL10">组件列表</span>
        </div>
        <div class="panel-group">
            <y-select :options="dbTypeOtions" v-model="dbTypeDefaultVal"></y-select>
        </div>
        <y-tabs>
            <y-tab-panel :iconClass="item.iconClass" :name="item.groupName" v-for="(item,index) in groupComponentList" :key="index">
                <y-collapse>
                    <y-collapse-item  :iconClass="group.iconClass" :name="group.title" v-for="(group,gIndex) in item.children" :key="gIndex">
                        <div class="panel-controls_wrap">
                            <div class="panel-controls_item" v-for="(component,cIndex) in group.components" :key="cIndex">
                                <div class="panel-controls_title">{{component.title}}</div>
                                <img class="panel-controls_img" :src="component.icon"   draggable="true" @dragstart="onDrag" :data-title="component.title" @click="onAddComponent"/>
                            </div>
                        </div>
                    </y-collapse-item>
                </y-collapse>
            </y-tab-panel>
        </y-tabs>
        <div>
            <y-input v-model="searchVal" placeholder="搜索" suffix-icon="el-icon-search"></y-input>
        </div>
    </div>
</template>

<script>
import { createUUID } from '@/common/js/mUtils'
export default {
    name: 'ComponentPanel',
    data(){
       return {
            dbTypeOtions: [{
                value: '全部',
                label: '全部'
            }],
            dbTypeDefaultVal: '全部',
            searchVal:"",
            groupComponentList: []
       } 
    },
    mounted(){
        this.initData()
    },
    methods:{
        initData(){
            this.$axios.get('/groupcomponent/all')
            .then((res) => {
                if(res.code === 200){
                    this.groupComponentList = res.body
                }
            })
            .catch(e => {
                console.warn(e.message)
            })
        },
        onDrag(e){
            let title = e.currentTarget.dataset.title
            e.dataTransfer.setData("title", title)
        },
        onAddComponent(e){
            let title = e.currentTarget.dataset.title
            this.$axios.post('/componentconfig/detail', {name: title})
             .then((res) => {
                 if(res.code === 200){
                     let dynamicConfig = res.body
                     dynamicConfig.uuid = createUUID()
                     dynamicConfig.props[0].fields[1].value[0].value.value = 0
                     dynamicConfig.props[0].fields[1].value[1].value.value = 0
                     this.$store.dispatch('addElement', dynamicConfig)
                 }
             })
             .catch(e =>{
                 console.warn(e.message)
             })
        }
    }
}
</script>

<style lang="stylus">
    .panel{
        z-index: 100;
        color: #bcc9d4;
        font-size: 12px;
        background: rgb(29,33,38);
        display: flex;
        flex-direction: column;
        width: 310px;
        .panel-header{
            display: flex;
            height: 40px;
            align-items: center;
            background: rgb(46,52,60);
            .panel-header_title{
                
            }
        }
        .panel-group{
            padding: 5px;
        }
        .panel-controls_wrap{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 5px;
            width: 100%;
            font-size: 12px;
            .panel-controls_item{
                 display: flex;
                 flex-direction: column;
                 width: 75px;
                 height: 80px;
                 margin-bottom: 6px;
                 background: rgb(24,26,28);
                 cursor: pointer;
                 .panel-controls_img{
                     height: 58px;
                 }
                 .panel-controls_title{
                     display: flex;
                     justify-content: center;
                     align-items: center;
                     height: 22px;
                     
                 }
            }
        }
    }
    .ui-select{
        background: rgb(14,16,19);
    }
</style>