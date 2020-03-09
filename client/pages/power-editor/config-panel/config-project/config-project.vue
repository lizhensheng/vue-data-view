<template>
    <div class="config-project">
        <div class="config-project_header">页面设置</div>
        <div class="config-project_setting">
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
                <div class="screen-bg_img_preview yinput"> 
                   <img src="//datav.oss-cn-hangzhou.aliyuncs.com/uploads/templates/7.png" @click="onBgImageClick" width="140" height="90">
                   <input ref="imageSrc" type="file" accept="image/*" style="display: none;">
                </div>
            </y-form-item>
             <y-form-item title="缩略图" :width="70" :height="20" popper="marginB25">
                    <div class="thumbnail">
                        <y-button text="截取封面" :width="80" iconClass="el-icon-crop" class="crop"></y-button>
                        <y-button text="上传封面" :width="80" iconClass="el-icon-upload2"></y-button>
                    </div>
                    <input ref="thumbnailSrc" type="file" accept="image/*" style="display: none;">
            </y-form-item>
            <y-form-item title="" :width="70" :height="108" popper="marginB10">
                <div class="screen-bg_img_thumbnail yinput"> 
                   <img src="//datav.oss-cn-hangzhou.aliyuncs.com/uploads/templates/7.png" height="108" width="100%">
                </div>
            </y-form-item>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            screenWidth: 1920,
            screenHeight: 1080,
            backgroundColor: 'rgb(100,100,100)',
            backgroundImage: 'http://xxx.com'
        }
    },
    methods:{
        onBgImageClick(){
            this.$refs.imageSrc.click();
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
    }
 }   
</style>