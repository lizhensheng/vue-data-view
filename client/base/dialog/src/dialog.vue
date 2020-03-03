<template>
    <div class="ui-dialog" v-show="showDialog">
        <div class="dialog-mask" @click="onMaskClick"></div>
        <div class="dialog-wrap">
            <div class="dialog-header_wrap">
                <div class="dialog-header_title">{{title}}</div>
                <i class="el-icon-close" @click="onClose"></i>
            </div>
            <div class="dialog-body_wrap">
                <slot></slot>
            </div>
            <div class="dialog-footer"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'YDialog',
    data(){
        return {

        }
    },
    props:{
        title: String,
        isShow: Boolean
    },
    methods: {
        onClose(e){
            this.$emit('close',e)
        },
        onMaskClick(e){
            this.$emit('close',e)
        }
    },
    computed:{
        showDialog(){
            return this.isShow
        }
    }
}
</script>
