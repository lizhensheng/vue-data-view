<template>
    <div class="img-preview" v-show="value">
        <div class="img-body">
            <div class="img-body_header">
                <i class="el-icon-close" @click="onClose"></i>
            </div>
            <div class="img-body_left" @click="onPreClick">
                <div class="ibox box"><i class="el-icon-arrow-left"></i></div>
            </div>
            <div class="img-body_right" @click="onNextClick">
                 <div class="ibox box"><i class="el-icon-arrow-right"></i></div>
            </div>
            <div class="img-body_wrap" id="imgWrapper">
                <img v-if="imgList.length>0" :src="imgList[currentIndex].pic" alt="" > 
                <!-- :style="{'width': 500+'px','height': 500+'px'}" -->
            </div>
        </div>
        <div class="img-control">
            <div class="img-icons_wrap">
                <i class="el-icon-search"></i>
                <i class="el-icon-download"></i>
                <i class="el-icon-share"></i>
                <i class="el-icon-delete"></i>
                <i class="el-icon-warning-outline"></i>
            </div>
            <div class="img-file_wrap">
                <div v-for="item in preList" :key="item.id" class="img-file_item" :class="{'active': item.id - 1 === currentIndex}" @click="onImgClick" :data-id="item.id">
                     <img :src="item.pic" class="img-file" >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
const MAX_PREVIEW = 11
export default {
  data(){
      return {
          currentIndex: 0
      }
  },
  mounted(){
      this.currentIndex = this.previewIndex
      document.getElementById("imgWrapper").addEventListener("wheel", (e) => {
          if(e.wheelDeltaY > 0){
              this.onPreClick()
          }else {
              this.onNextClick()
          }
      })
  },
  methods:{
      onPreClick(){
          if(this.currentIndex > 0){
            this.currentIndex --
          }
      },
      onNextClick(){
          if(this.currentIndex < this.imgList.length-1){
            this.currentIndex ++
          }
      },
      onImgClick(e){
          let id = e.currentTarget.dataset.id
          if(id){
              this.currentIndex = parseInt(id) - 1
          }
      },
      onClose(){
          this.$emit('closePreview')
      }
  },
  computed:{
       preList(){
           let maxLength = this.imgList.length
           if(this.imgList.length < MAX_PREVIEW){
               return this.imgList
           } else{
               if(this.currentIndex + Math.floor(MAX_PREVIEW / 2) >= maxLength || this.currentIndex - Math.floor(MAX_PREVIEW / 2) < 0 ){
                   if(this.currentIndex + Math.floor(MAX_PREVIEW/2) >= maxLength){
                       return this.imgList.slice(maxLength- MAX_PREVIEW, maxLength)
                   } else if(this.currentIndex - Math.floor(MAX_PREVIEW/2) < 0){
                        return this.imgList.slice(0, MAX_PREVIEW)
                   } 
               } else {
                   return this.imgList.slice(
                                this.currentIndex - Math.floor(MAX_PREVIEW / 2), 
                                this.currentIndex + Math.floor(MAX_PREVIEW / 2)  + 1
                          )
               }
           }
       },
        ...mapState({
            imgList: state => state.image.imgList
        })
  },
  props: {
      value: {
          type: Boolean,
          default: false
      },
      appendToBody: {
          type: Boolean,
          default: false
      },
      previewIndex:{
          type: Number,
          default: 0
      }
  },
  watch:{
      value(val){
          if(val){
              if(this.appendToBody){
                  document.body.appendChild(this.$el)
              }
          }
      },
      previewIndex(){
           this.currentIndex = this.previewIndex
      }
  }
}
</script>

<style lang="stylus">
.img-preview{
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    z-index: 1000;
    top: 0px;
    left: 0px;
    background-color: rgba(0,0,0,0.85);
    .img-body{
        position: relative;
        width: 100%;
        height: 90%;
        .img-body_header{
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 1001;
            font-size: 30px;
            cursor: pointer;
        }
        .img-body_left{
            top: 0;
            left: 0;
            justify-content: flex-start;
            
        }
        .img-body_right{
            top: 0;
            right: 0;
            justify-content: flex-end;
        }
        .img-body_left,.img-body_right{
            position: absolute;
            height: 100%;
            width: 25%;
            display: flex;
            align-items: center;
            cursor: pointer;
            .box{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 60px;
                height: 60px;
                opacity: 0;
                background: rgb(43,43,43);
                border-radius: 50%;
                font-size: 18px;
                margin-left: 50px;
                margin-right: 50px;
            }
            &:hover{
                .box{
                    background: rgb(9,170,255);
                }
            }
        }
        &:hover{
            .box{
                opacity: 1;
            }
        }
        .img-body_wrap{
            display: flex;
            height: 100%;
            width: 100%;
            justify-content: center;
            align-items: center;
        }
    }
    .img-control{
        position: absolute;
        bottom: 0;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 120px;
        background: rgb(0,0,0);
        .img-icons_wrap{
            display: flex;
            width: 100%;
            height: 50px;
            justify-content: center;
            align-items: center;
            >i{
                font-size: 30px;
                margin-left: 30px;
                cursor: pointer;
            }
        }
        .img-file_wrap{
            display: flex;
            justify-content: center;
            align-items: center;
            .img-file_item{
                margin-left: 10px;
                width: 80px;
                height: 60px;
                &.active{
                    border: 2px solid rgb(59,140,255);
                    border-radius: 5px;
                }
                .img-file{
                    width: 100%;  
                    height: 100%;  
                    max-width: 100%;  
                    max-height: 100%; 
                    background: rgb(25,25,52);
                    border-radius: 5px;
                }
            }
        }
    }
}
</style>