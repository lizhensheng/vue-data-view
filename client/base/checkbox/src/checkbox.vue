<template>
    <div class="ui-checkbox" @click="onClick">
        <div class="ui-checkbox_status" :class="{'checked': checked}"><i class="el-icon-check"></i></div>
        <div class="ui-checkbox_content"><slot></slot></div>
    </div>
</template>

<script>
export default {
    name: 'YCheckbox',
    props: {
        value: Boolean
    },
    data(){
        return{
            checked: false
        }
    },
    mounted(){
        this.checked = this.value
    },
    methods:{
        onClick(){
            this.checked = !this.checked
            this.$emit('input', this.checked)
        }
    }
}
</script>