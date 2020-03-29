<template>
    <div class="ui-date">
        <el-date-picker
            size="mini"
            v-model="date"
            type="date"
            placeholder="选择日期"
            @change="onChange">
        </el-date-picker>
    </div>
</template>

<script>
export default {
    name: 'YDate',
    data(){
        return {
            date: ''
        }
    },
    props: {
        value: [String, Date]
    },
    watch:{
        value(val){
            this.date = val
        }
    },
    mounted(){
        this.date = this.value
    },
    methods:{
        onChange(){
            this.$emit('input', this.date)
        }
    }
}
</script>