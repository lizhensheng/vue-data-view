<template>
    <div class="config-project">
        <div class="config-project_header">页面设置</div>
        <div class="config-project_setting">
            <y-form-item title="项目名称" :width="70" :height="20" popper="marginB10">
                <div class="screen-bg_color yinput">
                   <y-input :height="20" v-model="projectName"></y-input>
                </div>
            </y-form-item>
            <y-form-item title="屏幕大小" :width="70" :height="30">
                <div class="screen-pixel">
                    <y-input-number v-model="screenWidth" :min="0" :max="10000"></y-input-number>
                     <y-input-number v-model="screenHeight" :min="0" :max="10000"></y-input-number>
                </div>
            </y-form-item>
            <div class="screen-pixel_title marginB10">
                <div class="ibox"></div>
                <div class="pixel_title">宽度</div>
                <div class="pixel_title paddingL20">高度</div>
            </div>
             <y-form-item title="背景颜色" :width="70" :height="20" popper="marginB10">
                <div class="screen-bg_color yinput">
                   <y-input :height="20" v-model="backgroundColor"></y-input>
                </div>
            </y-form-item>
             <y-form-item title="背景图" :width="70" :height="20" popper="marginB10">
                <div class="screen-bg_image yinput"> 
                   <y-input :height="20" prevIcon="el-icon-link" v-model="backgroundImage"></y-input>
                </div>
            </y-form-item>
            <y-form-item title="" :width="70" :height="120" popper="marginB10">
                <div class="screen-bg_img_preview yinput" @click="onBgImageClick"> 
                   <img v-show="projectDataInfo.backgroundImage" :src="projectDataInfo.backgroundImage" width="140" height="90">
                </div>
            </y-form-item>
             <y-form-item title="缩略图" :width="70" :height="20" popper="marginB25">
                    <div class="thumbnail">
                        <y-button text="截取封面" 
                                  :width="80" 
                                  iconClass="el-icon-crop" 
                                  class="crop" 
                                  @click="onScreenCapture"
                                  :isLoading="isDoingScreenShot">
                        </y-button>
                        <y-button text="上传封面" :width="80" iconClass="el-icon-upload2"></y-button>
                    </div>
                    <input ref="thumbnailSrc" type="file" accept="image/*" style="display: none;">
            </y-form-item>
            <y-form-item title="" :width="70" :height="108" popper="marginB10">
                <div class="screen-bg_img_thumbnail yinput"> 
                   <img :src="projectDataInfo.thumbnailImage" height="90" width="140">
                </div>
            </y-form-item>
        </div>
         <y-dialog title="选择图片" :isShow="showChooseImgDialog" @close="onChooseImgClose" theme="white">
           <img-libs unique="config-project"></img-libs>
        </y-dialog>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import ImgLibs from '@/components/img-libs/img-libs'
import editorProjectConfig from '@/pages/power-editor/data-model/data-model'
export default {
    data() {
        return {
            screenWidth: 0,
            screenHeight: 0,
            backgroundColor: '',
            backgroundImage: '',
            showChooseImgDialog: false,
            isDoingScreenShot: false,
            projectName: ''
        }
    },
    components:{
        ImgLibs
    },
    mounted(){
        this.initProjectInfo()
        this.$bus.$on('select-image', (selectId, url, unique)=>{
            if(unique === 'config-project')
            {
                this.backgroundImage = url
                this.$store.dispatch('setProjectDataInfo', this.projectDataInfo)
                this.showChooseImgDialog = false
            }
        })
    },
    computed:{
        ...mapState({
            projectDataInfo: state => state.powereditor.projectDataInfo
        })
    },
    watch:{
        screenWidth(){
            this.projectDataInfo.screenWidth = this.screenWidth
            this.$store.dispatch('setProjectDataInfo', this.projectDataInfo)
        },
        screenHeight(){
            this.projectDataInfo.screenHeight = this.screenHeight
            this.$store.dispatch('setProjectDataInfo', this.projectDataInfo)
        },
        backgroundColor(){
            this.projectDataInfo.backgroundColor = this.backgroundColor
            this.$store.dispatch('setProjectDataInfo', this.projectDataInfo)
        },
        backgroundImage(){
            this.projectDataInfo.backgroundImage = this.backgroundImage
            this.$store.dispatch('setProjectDataInfo', this.projectDataInfo)
        },
        projectName(){
            this.projectDataInfo.title = this.projectName
            this.$store.dispatch('setProjectDataInfo', this.projectDataInfo)
        }
    },
    methods:{
        onBgImageClick(){
             this.showChooseImgDialog = true
        },
        initProjectInfo(){
            let id = this.$route.params.id
            if(id){
                this.$axios.get('/project/detail/' + id)
                .then(res => {
                    if(res.code === 200){
                        let project = res.body
                        this.initData(project)
                    }
                })
                .catch((e) => {
                    console.warn(e.message)
                })
            }   
            else{
                let project = editorProjectConfig.getProjectConfig()
                this.initData(project)
            }
        },
        initData(project){
            this.projectName = project.title
            this.screenWidth = project.screenWidth
            this.screenHeight = project.screenHeight
            this.backgroundColor = project.backgroundColor
            this.backgroundImage = project.backgroundImage
            this.$store.dispatch('setProjectDataInfo', project)
        },
        onChooseImgClose(){
            this.showChooseImgDialog = false
        },
        /**
         * 提供截屏作为项目缩略图
         */
        onScreenCapture() {
            //this.projectInfo.thumbnailImage = res.body;
            this.$bus.$emit('screenCapture')
            this.isDoingScreenShot = true
            this.$bus.$on('doneScreenCapture', ()=>{
                this.isDoingScreenShot = false
            })
           
        }
    }
}
</script>

<style lang="stylus" scoped>
 .config-project{
     width: 332px;
     background: rgb(28,32,38);
     font-size: 12px;
     height: 500px;
     .config-project_header{
         display: flex;
         width: 100%;
         justify-content: center;
         align-items: center;
         height: 30px;
         color: #bcc9d4;
         background: rgb(46,52,60);
     }
     .config-project_setting{
        padding: 10px 20px;
        .screen-pixel{
            display: flex;
            flex-direction: row;
            justify-content:space-between;
        }
        .screen-pixel_title{
            display: flex;
            flex-direction: row;
            .ibox{
                width: 70px;
            }
            .pixel_title{
                flex:1;
                font-size: 12px;
                color: rgb(92,99,102);
            }
        }
        .yinput{
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
        .thumbnail{
            display: flex;
            width: 100%;
            div{
                flex: 1;
            }
            .crop{
                border:1px solid rgb(38,129,255);
                background: none;
                &:hover{
                    background: rgba(38,129,255,0.8);
                }
            }
        }
        .screen-bg_img_thumbnail{
            text-align: center;
        }
    }
 }   
</style>