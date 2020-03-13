<template>
    <div class="ui-button" :style="{width:width+'px', height:height+'px'}" @click="onClick" :class="[popper, {'hollow': hollow}]" >
        <i class="el-icon-loading marginR5"  v-show="isLoading"></i>
        <i :class="iconClass" class="marginR5" v-show="showIcon&&!isLoading"></i>
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
        },
        height:{
            type: Number,
            default: 40
        },
        popper:{
            type: String,
            default: ''
        },
        hollow: {
            type: Boolean,
            default: false
        },
        isLoading:{
            type: Boolean,
            default: false
        }
    },
    methods:{
        onClick(e){
            this.$emit('click', e)
        }
    }
}
</script>
