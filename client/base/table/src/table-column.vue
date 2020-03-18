<template>
    <div class="ui-table_column" :class="{'auto-width': width === 'auto'}">
        <div class="ui-table_column_item" 
             v-for="(item,index) in columns" :key="index" 
             
             :style="{'width': $mUtils.isNumber(width) ? width + 'px' : width}"
        >
            {{item[prop]}}
        </div>
    </div>
</template>
<script>
export default {
    name: 'YTableColumn',
    props: {
       prop: String,
       label: String,
       width: {
           type: [String, Number],
           default: 100
       }
    },
    data(){
        return {
            columns: []
        }
    },
    mounted(){
        this.columns = this.$parent.data
    }
}
</script>