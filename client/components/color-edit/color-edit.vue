<template>
    <div class="color-edit">
        <div class="color-add" @click="onAdd">
            <i class="el-icon-plus pointer"></i>
        </div>
        <div class="color-item_wrap">
            <div v-for="item in colorInfo" :key="item.id" class="color-item">
                <div class="color-item-delete" @click="onDelete" :data-id="item.id">
                    <i class="el-icon-minus pointer"></i>
                </div>
                <div class="color-item-config">
                    <el-color-picker v-model="item.color" size="mini" @change="onChange"></el-color-picker>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createUUID } from '@/common/js/mUtils'
import { cloneDeep } from 'lodash'
let model =  {
    id: '',
    color : '#fff'
}
export default {
    name: 'ColorEdit',
    data(){
       return {
           colorInfo: [
           ]
       }
    },
    props:{
        value: Array
    },
    mounted(){
        let model = this.value.map(v => {
            return {
                id: createUUID(),
                color: v
            }
        })
        this.colorInfo = model
    },
    methods:{
        onDelete(e){
            let id = e.currentTarget.dataset.id
            let index = this.colorInfo.findIndex(e=>e.id === id)
            this.colorInfo.splice(index, 1)
            this.getColors()
        },
        onAdd(){
            if(this.colorInfo.length < 8){
                let copy = cloneDeep(model)
                copy.id = createUUID()
                this.colorInfo.splice(this.colorInfo.length, 0, copy)
                this.getColors()
            }
        },
        onChange(){
           this.getColors()
        },
        getColors(){
            let colors = this.colorInfo.map(c => {
                return c.color
            })
            this.$emit('input', colors)
        }
    }
}
</script>

<style lang="stylus">
.color-edit{
    display: flex;
    flex-direction: row;
    .color-add{
        display: flex;
        align-items: center;
        width: 20px;
        cursor: pointer;
    }
    .color-item_wrap{
        display: flex;
        .color-item{
            display: flex;
            flex-direction: column;
            .color-item-delete{
                display: flex;
                justify-content: center;
                cursor: pointer;
            }
        }
    }
}
</style>