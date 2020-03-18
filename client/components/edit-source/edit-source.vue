<template>
    <div class="edit-source">
        <div class="edit-source_header">
            <div class="edit-source_field">
                字段
            </div>
            <div class="edit-source_mapping">
                映射
            </div>
            <div class="edit-source_status">
                状态
            </div>
        </div>
        <div v-for="(item,index) in ejson" :key="index" class="edit-source_item">
            <div class="edit-source_field">{{item.field}}</div>
            <y-input v-model="item.mapping"  class="edit-source_mapping" @input="onInput"></y-input>
            <div class="edit-source_status">{{item.status ? '匹配成功': '未匹配'}}</div>
        </div>
        <div style="display: none;">{{ejson}}</div>
    </div>
</template>

<script>
export default {
    name: 'EditSource',
    data(){
        return {
            localList: []
        }
    },
    props:{
        value: Object,
        dataJson: Object
    },
    computed:{
        ejson(){
             return this.mapping()
        }
    },
    mounted(){
        this.localList = this.value.model
    },
    methods:{
        onInput(){
            this.value.model = this.ejson
            this.$emit('input', this.value)
        },
        mapping(){
            let mappingList = this.value.model
            let arr = []
            try{
                arr = JSON.parse(this.value.json)
            }
            catch(e){
                mappingList = mappingList.map(element => {
                    element.status = false
                    return element
                });
                console.warn(e)
            }
            if(Array.isArray(arr) && arr.length > 0)
            {
                let keys = Object.keys(arr[0])
                mappingList = mappingList.map(element => {
                    let searchKey = ''
                    searchKey = element.mapping ? element.mapping : element.field
                    let index = keys.findIndex(key => key === searchKey)
                    let matchStatus = index > -1
                    element.status = matchStatus
                    return element
                });
            }
            return mappingList
        }
    }
}
</script>

<style lang="stylus" scoped>

.edit-source_item,.edit-source_header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    .edit-source_field{
        flex: 1;
        text-align: center;
    }
    .edit-source_mapping{
        flex: 2;
        text-align: center;
    }
    .edit-source_status{
        flex: 2;
        text-align: center;
    }
}
</style>