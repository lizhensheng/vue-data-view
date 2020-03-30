<template>
    <div class="event-edit">
        <div class="event-add">
            <i class="el-icon-plus pointer" @click="onAdd"></i>
        </div>
        <div v-for="item in eventInfo" :key="item.id" class="event-item">
           <div class="event-item_config">
                <y-form-item title="事件类型" :width="70" :height="40">
                    <y-select v-model="item.eventType" :options="eventTypeOptions" @change="onChange">
                    </y-select>
                </y-form-item>
                <y-form-item title="事件来源" :width="70" :height="40">
                    <y-input v-model="item.eventAction.source" @change="onChange"></y-input>
                </y-form-item>
                <y-form-item title="事件目标" :width="70" :height="40">
                    <y-input v-model="item.eventAction.target" @change="onChange"></y-input>
                </y-form-item>
                <y-form-item title="事件参数" :width="70" :height="40">
                    <y-input v-model="item.eventAction.params" @change="onChange"></y-input>
                </y-form-item>
           </div>
           <div class="event-item-delete">
                <i class="el-icon-minus pointer" @click="onDelete" :data-id="item.id"></i>
           </div>
        </div>
    </div>
</template>

<script>
import { createUUID } from '@/common/js/mUtils'
import { cloneDeep } from 'lodash'
const EVENT_TYPE = {
    'REFLESH': '刷新',
    'VISIBLE': '显示',
    'HIDDLE': '隐藏'
}
let model =  {
    id: '',
    eventType: EVENT_TYPE.REFLESH,
    eventAction: {
        source: '',
        target: '',
        params: ''
    }
}
export default {
    name: 'EventEdit',
    data(){
       return {
           eventInfo: [
           ],
           eventTypeOptions: [
               {
                   label: '刷新',
                   value: '刷新'
               },
               {
                   label: '显示',
                   value: '显示'
               },
               {
                   label: '隐藏',
                   label: '隐藏'
               }
           ]
       }
    },
    props:{
        value: Array
    },
    mounted(){
        this.eventInfo = this.value
    },
    methods: {
        onDelete(e){
            let id = e.currentTarget.dataset.id
            let index = this.eventInfo.findIndex(e=>e.id === id)
            this.eventInfo.splice(index, 1)
        },
        onAdd(){
            let copy = cloneDeep(model)
            copy.id = createUUID()
            this.eventInfo.splice(this.eventInfo.length, 0, copy)
        },
        onChange(){
            this.$emit('input', this.eventInfo)
        }
    }
}
</script>

<style lang="stylus">
.event-edit{
    .event-item{
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #1c2026;
        .event-item_config{
            flex: 1;
            margin: 10px;
        }
        .event-item-delete{
            width: 60px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
    }
    .event-add{
        display: flex;
        align-items: center;
        height: 30px;
    }
    .pointer{
        cursor: pointer;
    }
}
</style>