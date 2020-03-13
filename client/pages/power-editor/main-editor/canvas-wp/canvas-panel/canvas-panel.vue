<template>
    <div id="canvasPanel" class="canvas-panel" :style="{ 
        width: projectDataInfo.screenWidth +'px' ,
        height: projectDataInfo.screenHeight +'px',
        backgroundColor: projectDataInfo.backgroundColor,
        backgroundImage: `url('${projectDataInfo.backgroundImage}')`,
        transform: `scale(${scalePercent/100})  translate(0px, 0px)`
    }"  @drop="onDrop" @dragover.prevent="onAllowDrop">
          <!--页面组件列表展示-->
            <vdr v-for="item in activePage.elements"
                                     :key="item.uuid"
                                     :data-uuid="item.uuid"
                                     :w="item.commonStyle.chartPixel.width * ratio" 
                                     :h="item.commonStyle.chartPixel.height * ratio"
                                     :x="item.commonStyle.chartPosition.x * ratio"
                                     :y="item.commonStyle.chartPosition.y * ratio"  
                                     @dragging="onComponentDrag" 
                                     @resizing="onComponentResize" 
                                     :parent="true" 
                                     :active="item.uuid === activeElementUUID"
                                     @activated="onComponentActivated(item.uuid)"
                                     :scale-ratio="ratio" 
                                     >
                <component :is="item.elName" class="element-on-edit-pane" v-bind="{...item}"/>
            </vdr>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import domtoimage from 'dom-to-image'
// import EditShape from '@/components/edit-shape/edit-shape'
import editorProjectConfig from '@/pages/power-editor/data-model/data-model'
import { merge } from "lodash"
import {_c_register_components_object} from '@client/plugins/index'

export default {
    data(){
       return {
           getCommonStyle: editorProjectConfig.getCommonStyle
       }
    },
    mounted(){
        this.$bus.$on('screenCapture', ()=>{
            this.screenCapture()
        })
    },
    methods:{
         screenCapture() {
             //截图前把缩放比例设置为100
            this.$store.dispatch('setScalePercent', 100)
            setTimeout(()=>{
                const node = document.querySelector("#canvasPanel") //this.$refs.canvasPanel
                domtoimage.toPng(node).then( dataUrl => {
                    let params = new FormData()
                    const blob = this.$mUtils.dataURItoBlob(dataUrl)
                    const file = new window.File([blob], +new Date() + '.png', {type: 'image/png'})
                    params.append('file', file);
                    this.$axios.post('/common/uploadFile', params).then(res => {
                        if(res.code === 200){
                            let temp = this.projectDataInfo
                            temp.thumbnailImage = res.body
                            this.$store.dispatch('setProjectDataInfo', temp)
                        }
                        this.$bus.$emit('doneScreenCapture')
                    }).catch(err => {
                        console.warn(err)
                         this.$bus.$emit('doneScreenCapture')
                    })
                })
                .catch(function (error) {
                    console.error('截图出错了!', error);
                    this.$bus.$emit('doneScreenCapture')
                });
            }, 1000)
         },
         onDrop(e){
             let title=e.dataTransfer.getData("title")
             this.$axios.post('/componentconfig/detail', {name: title})
             .then((res) => {
                 if(res.code === 200){
                     let dynamicConfig = res.body
                     let commonConfig = editorProjectConfig.getElementConfig()
                     let config = merge(commonConfig, dynamicConfig)
                     this.$store.dispatch('addElement', config)
                 }
             })
             .catch(e =>{
                 console.warn(e)
             })
         },
         onAllowDrop(e){
             
         },
         onComponentActivated(uuid){
             this.$store.dispatch('setActiveElementUUID', uuid);
         },
         onComponentDrag(left,top){
             
         },
         onComponentResize(){

         }
    },
    computed:{
        ratio(){
            return this.scalePercent / 100
        },
        ...mapState({
            scalePercent: state => state.scale.scalePercent,
            projectDataInfo: state => state.powereditor.projectDataInfo,
            activeElementUUID: state => state.powereditor.activeElementUUID
        }),
        ...mapGetters([
            'activeElementIndex',
            'activeElement',
            'activePage'
        ])
    },
    components:{
        ..._c_register_components_object
    }
}
</script>

<style lang="stylus" scoped>
    .canvas-panel{
        position: absolute;
        transform-origin: 0 0;
        top: 60px;
        left: 60px;
        transition: .2s all ease-in-out;
        background-size: cover,contain;
        background-position: center,right bottom;
        background-repeat: no-repeat,no-repeat;
        box-shadow: rgba(0,0,0,.5) 0 0 30px 0;
        z-index: 90;
    }
</style>