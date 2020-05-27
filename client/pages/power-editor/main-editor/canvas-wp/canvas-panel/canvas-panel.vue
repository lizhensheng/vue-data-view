<template>
    <div id="canvasPanel" class="canvas-panel" :style="{ 
        width: projectDataInfo.screenWidth +'px' ,
        height: projectDataInfo.screenHeight +'px',
        backgroundColor: projectDataInfo.backgroundColor,
        backgroundImage: `url('${projectDataInfo.backgroundImage}')`,
        transform: `scale(${scalePercent/100})  translate(0px, 0px)`
    }"  @drop="onDrop" @dragover.prevent="onAllowDrop" @click="onCanvasPanelClick" data-id="canvasPanel">
          <!--页面组件列表展示-->
            <vdr v-for="item in activePage.elements"
                                     :id="item.uuid"
                                     :key="item.uuid"
                                     :ref="item.uuid"
                                     :data-uuid="item.uuid" 
                                     :w="getWidth(item)"
                                     :h="getHeight(item)"
                                     :x="getChartX(item)"
                                     :y="getChartY(item)"
                                     @dragging="onComponentDrag" 
                                     @resizing="onComponentResize" 
                                     :parent="false" 
                                     :className="item.uuid === activeElementUUID? 'actived': 'noActived'"
                                     @activated="onComponentActivated(item.uuid)"
                                     :scale-ratio="ratio"
                                     @keyup.native.13="onDelete"
                                     @keyup.native.46="onDelete"
                                     @keyup.native.8="onDelete"
                                     @keyup.native.ctrl.67="onCopy"
                                     @keyup.native.alt.67="onCopyUUID"
                                     tabindex="1"
                                     :style ="{...getCommonStyle(item)}"
                                     >
                    <component :is="item.elName"
                                class="element-on-edit-pane" 
                                v-bind="{...item}" 
                                :width="getWidth(item)"
                                :height="getHeight(item)"
                                :ratio="ratio"
                                />
            </vdr>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import domtoimage from 'dom-to-image'
import {_c_register_components_object} from '@client/plugins/index'
import { createUUID } from '@/common/js/mUtils'

export default {
    data(){
       return {
          
       }
    },
    mounted(){
        this.$bus.$on('screenCapture', ()=>{
            this.screenCapture()
        })
    },
    watch: {
    },
    methods:{
         getChartX(item){
             return  item.props[0].fields[1].value[0].value.value 
         },
         getChartY(item){
             return  item.props[0].fields[1].value[1].value.value  
         },
         getWidth(item){
             return  item.props[0].fields[0].value[0].value.value 
         },
         getHeight(item){
             return  item.props[0].fields[0].value[1].value.value 
         },
         getCommonStyle(item){
             //读取基本配置
             let chartWidth = item.props[0].fields[0].value[0].value.value 
             let chartHeight = item.props[0].fields[0].value[1].value.value 
             let chartX = item.props[0].fields[1].value[0].value.value 
             let chartY = item.props[0].fields[1].value[1].value.value 
             let zindex = item.props[0].fields[1].value[2].value.value
             let rotate = item.props[0].fields[2].value.value
             return {
                 'width': chartWidth + 'px',
                 'height': chartHeight + 'px',
                 'top':  chartY + 'px',
                 'left': chartX  + 'px',
                 'zIndex': zindex,
                 'transform': `rotate(${rotate}deg)`
             }
         },
         screenCapture() {
             //截图前把缩放比例设置为100
            //this.$store.dispatch('setScalePercent', 100)
            if(this.scalePercent != 100){
                this.$msgbox({
                    title: '请先将缩放比例调整为100%'
                })
                return
            }
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
                        console.warn(err.message)
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
             let left = e.offsetX - 60
             let top = e.offsetY - 60
             let title=e.dataTransfer.getData("title")
             this.$axios.post('/componentconfig/detail', {name: title})
             .then((res) => {
                 if(res.code === 200){
                     let dynamicConfig = res.body
                     dynamicConfig.uuid = createUUID()
                     dynamicConfig.props[0].fields[1].value[0].value.value = parseInt(left) 
                     dynamicConfig.props[0].fields[1].value[1].value.value = parseInt(top)
                     this.$store.dispatch('addElement', dynamicConfig)
                 }
             })
             .catch(e =>{
                 console.warn(e.message)
             })
         },
         onComponentActivated(uuid){
             this.$store.dispatch('setActiveElementUUID', uuid);
         },
         onComponentDrag(left, top){
             if(this.activeElementIndex > -1){
                let props = this.projectDataInfo.pages[0].elements[this.activeElementIndex].props[0]
                props.fields[1].value[0].value.value = parseInt(left)
                props.fields[1].value[1].value.value = parseInt(top)
                this.$store.dispatch('setProjectDataInfo',  this.projectDataInfo);
             }
            
         },
         onComponentResize(left, top, width, height){
             if(this.activeElementIndex > -1){
                let props = this.projectDataInfo.pages[0].elements[this.activeElementIndex].props[0]
                props.fields[0].value[0].value.value = parseInt(width)
                props.fields[0].value[1].value.value = parseInt(height)
                props.fields[1].value[0].value.value = parseInt(left)
                props.fields[1].value[1].value.value = parseInt(top)
                this.$store.dispatch('setProjectDataInfo',  this.projectDataInfo);
             }
         },
         onCanvasPanelClick(e){
             if(e.target.dataset.id === "canvasPanel"){
                 this.$store.dispatch('setActiveElementUUID', '');
             }
         },
         onDelete(e){
            let uuid = e.currentTarget.dataset.uuid
            this.$store.dispatch('removeElement', uuid)
         },
         onCopy(){
             if(this.activeElement){
                this.$store.dispatch('addElement', this.activeElement)
             }
         },
         onCopyUUID(e){
            let uuid = e.currentTarget.dataset.uuid
            window.alert(`请复制uuid: ${uuid}`)
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
        .draggable.actived{
            border: 2px solid rgb(37,124,245);
        }
    }
</style>