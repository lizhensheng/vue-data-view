<template>
    <div class="color-edit">
        <div class="color-add" @click="onAdd">
            <i class="el-icon-plus pointer"></i>
        </div>
        <div class="color-item_wrap">
            <div v-for="item in editStringArray" :key="item.id" class="color-item">
                <div class="color-item-delete" @click="onDelete" :data-id="item.id">
                    <i class="el-icon-minus pointer"></i>
                </div>
                <div class="color-item-config">
                    <el-input v-model="item.inputValue" size="mini" @change="onChange"></el-input>
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
        inputValue : ''
    }
    export default {
        name: 'EditStringArray',
        data(){
            return {
                editStringArray: [
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
                    inputValue: v
                }
            })
            this.editStringArray = model
        },
        methods:{
            onDelete(e){
                let id = e.currentTarget.dataset.id
                let index = this.editStringArray.findIndex(e=>e.id === id)
                this.editStringArray.splice(index, 1)
                this.getStringArray()
            },
            onAdd(){
                if(this.editStringArray.length < 8){
                    let copy = cloneDeep(model)
                    copy.id = createUUID()
                    this.editStringArray.splice(this.editStringArray.length, 0, copy)
                    this.getStringArray()
                }
            },
            onChange(){
                this.getStringArray()
            },
            getStringArray(){
                let strings = this.editStringArray.map(c => {
                    return c.inputValue
                })
                this.$emit('input', strings)
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
