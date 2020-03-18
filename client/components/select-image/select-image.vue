<template>
    <div class="select-image">
        <div class="screen-bg_img_preview yinput"> 
            <img :src="backgroundImage" @click="onBgImageClick" width="220" height="100">
         </div>
         <y-dialog title="选择图片" :isShow="showChooseImgDialog" @close="onChooseImgClose" theme="white">
           <img-libs unique="select-image"></img-libs>
        </y-dialog>
    </div>
</template>

<script>
import ImgLibs from '@/components/img-libs/img-libs'
export default {
    data(){
        return {
            showChooseImgDialog: false,
            backgroundImage: ''
        }
    },
    props:{
        value: String
    },
    watch:{
        value(val){
            console.log(val)
        }
    },
    mounted(){
        this.backgroundImage = this.value
        this.$bus.$on('select-image', (selectId, url, unique)=>{
            if(unique === 'select-image'){
                this.backgroundImage = url
                this.$emit('input', url)
                this.showChooseImgDialog = false
            }
        })
    },
    methods:{
         onBgImageClick(){
             this.showChooseImgDialog = true
        },
         onChooseImgClose(){
            this.showChooseImgDialog = false
        },
    },
    components:{
        ImgLibs
    }
}
</script>

<style lang="stylus" scoped>
.select-image{
    width: 100%;
    yinput{
        border: 1px solid #000;
    }
    .screen-bg_img_preview{
        height:120px;
        width: 100%;
        background: rgb(38,44,51);
        display: flex;
        justify-content: center;
        align-items: center;
        padding:2px 15px;
        cursor: pointer;
    }
}
</style>