<template>
    <div class="components-image-cropper">
        <div class="inline-block cropper-res-img">
            <img :src="url || defaultCoverImage" alt="">
            <el-upload
                action="/"
                :before-upload="beforeUpload"
                accept="image/gif,image/jpeg,image/png,image/bmp"
                :show-file-list="false">
                <p class="cropper-res-img-title">更换主图</p>
            </el-upload>
        </div>
        <el-dialog
            title="图片裁切"
            :visible.sync="dialogVisible"
            append-to-body
            center
            width="400px">
            <div class="cropper-wrapper">
                <vueCropper
                    ref="cropper"
                    :img="option.img"
                    :outputType="option.outputType"
                    :autoCrop="option.autoCrop"
                    :full="option.full"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    :fixedBox="option.fixedBox"
                    :centerBox="option.centerBox"
                    :info="option.info"
                    ></vueCropper>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false" size="small">取消</el-button>
                <el-button type="primary" @click="updateImage" size="small">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {VueCropper} from 'vue-cropper'
export default {
    components:{
        VueCropper
    },
    props:{
        url:String
    },
    data(){
        return {
            loading:false,
            dialogVisible:false,
            defaultCoverImage:require('@client/common/images/logo.jpg'),
            option:{
                img:'',
                outputSize:1,
                full:false,
                autoCrop:true,
                outputType:'png',
                autoCropWidth:120,
                autoCropHeight:120,
                fixedBox:false,
                centerBox:false,
                info:false
            }
        }
    },
    methods:{
        updateImage(){
            this.$refs.cropper.getCropBlob((data)=>{
                let file = blobToFile(data)
                let params = new FormData()
                params.append('file',file)
                this.$axios.post('/common/uploadFile',params).then(res=>{
                    this.loading=false
                    this.dialogVisible=false
                    this.$emit('update:url',res.body)
                }).catch(()=>{
                    this.loading=false
                })
            })
        },
        beforeUpload(file){
            if(file.size>4*1024*1024){
                this.$message.error('上传图片不能超过4M')
                return
            }
            var reader = new FileReader()
            let _this=this
            reader.onload=(e)=>{
                let data
                if(typeof e.target.result==='object')
                {
                    data=window.URL.createObjectURL(new Blob([e.target.result]))
                }
                else{
                    data=e.target.result
                }
                _this.option.img=data
            }
            reader.readAsDataURL(file)
            this.dialogVisible=true

            return false
        }
    }
}
function blobToFile(blob,fileName){
    blob.lastModifiedDate = new Date()
    blob.name=fileName||new Date().getTime()
}
</script>

<style lang="scss" scoped>
  .cropper-res-img {
    width: 100px;
    height: 100px;
    border: 1px dashed $primary;
    border-radius: 3px;
    margin-bottom: 18px;
    text-align: center;
    cursor: pointer;
    transition: all 0.28s;
    position: relative;
    background: #eee 50%/contain no-repeat;
    justify-content: center;
    align-items: center;
    display: flex;
    &:hover {
      color: $primary;
    }
    .cropper-res-img-title {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 80px;
      transform: translateY(-50%);
      transform: translateX(-50%);
      text-align: center;
      background: rgba(0, 0, 0, 0.7);
      padding: 6px 8px;
      border-radius: 4px;
      color: #eee;
      transition: all 0.28s;
      &:hover {
        background: rgba(0, 0, 0, 0.8);
        color: white;
      }
    }
    img {
      display: inline-block;
      max-width: 100%;
      max-height: 100%;
    }
  }
  .cropper-wrapper{
    height: 400px;
  }
</style>
