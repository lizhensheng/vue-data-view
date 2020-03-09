<template>
    <div class="ui-messagebox"  v-show="visible">
        <div class="messagebox-mask" @click="onMaskClick"></div>
         <div class="messagebox-wrap">
            <div class="messagebox-header_wrap">
                <div class="messagebox-header_title">
                    <i :class="iconClass"></i>
                    {{title}}
                </div>
                <i class="el-icon-close" @click="onClose"></i>
            </div>
            <div class="messagebox-body_wrap">
                {{message}}
            </div>
            <div class="messagebox-footer">
                <y-button :showIcon="false" 
                          :width="120" 
                          :text="confirmButtonText" 
                          v-show="showConfirmButton"
                          @click="onConfirm">
                </y-button>
                <y-button :showIcon="false" 
                          :width="120" 
                          :text="cancelButtonText" 
                          popper="messagebox-cancel" 
                          v-show="showCancelButton"
                          @click="onCancel">
                </y-button>
            </div>
        </div>
    </div>
</template>

<script>
import YButton from '../../button'
export default {
    data(){
        return {
            uid: 1,
            title: '',
            message: '',
            iconClass: '',
            showConfirmButton: true,
            showCancelButton: false,
            confirmButtonText: '',
            cancelButtonText: '',
            visible: false
        }
    },
    props: {
        closeOnClickModal: {
            default: true
        }
    },
    components:{
        YButton
    },
    watch: {
        visible(val){
            if(val){
                this.uid++
            }
        }
    },
    methods:{
        onMaskClick(){
            this.visible = false
        },
        onClose(){
             this.visible = false
        },
        onConfirm(e){
            this.visible = false
            if(this.callback){
                this.callback({
                    action: 'confirm'
                })
            }
        },
        onCancel(e){
            this.visible = false
             if(this.callback){
                 this.callback({
                     action: 'cancel'
                 })
            }
        }
    }
}
</script>