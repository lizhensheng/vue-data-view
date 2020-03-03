<template>
    <div class="ui-button" :style="{width:width+'px'}" @click="onClick">
        <i :class="iconClass" class="marginR5" v-show="showIcon"></i>
        <div class="ibox">
            {{text}}
        </div>
    </div>
</template>

<script>
export default{
    name:'YButton',
    data(){
        return {

        }
    },
    props:{
        text: String,
        iconClass: {
            type: String,
            default: 'el-icon-plus'
        },
        showIcon: {
            type: Boolean,
            default: true
        },
        width:{
            type: Number,
            default: 200
        }
    },
    methods:{
        onClick(e){
            this.$emit('click', e)
        }
    }
}
</script>
