<template>
    <el-tooltip content="缩略图">
        <div class="thumbnail" v-show="showThumbnail">
            <div class="thumbnail-paint">
                <canvas ref="paint" class="canvas"  :width="showWidth" :height="showHeight">您当前的浏览器不支持canvas</canvas>
            </div>
            <div ref="controlBox" class="ibox thumbnail-control_box" :style="{
                    'transform':`translate(${translateX}px, ${translateY}px)`,
                    'width': `${controlWidth}px`, 
                    'height': `${controlHeight}px`}" 
                    @mousedown = "onMouseDown"></div>
            </div>
    </el-tooltip>
</template>

<script>
import {mapState} from 'vuex'
/**
 * 定义内矩形的偏移
 */
const WRAP_TRANSLATEX = 60
const WRAP_TRANSLATEY = 60
export default {
    data(){
        return {
            showWidth: 0,
            showHeight: 0,
            innerWidth: 0,
            innerHeight: 0,
            t: 0
        }
    },
    computed:{
        translateX(value){
            return this.canvaswp.scrollLeft / this.scaleX
        },
        translateY(){
           
           return this.canvaswp.scrollTop / this.scaleY
        },
        controlWidth(){
            let width = this.canvaswp.clientWidth / (this.$config.editorWrapPanelWidth * (this.scalePercent / 100) / this.$config.thumbnailWidth)
            return Math.min(width,this.$config.thumbnailWidth)
        },
        controlHeight(){
            let height = this.canvaswp.clientHeight / this.scaleY
            return Math.min(height,this.$config.thumbnailHeight)
        },
        scaleX(){
            return this.$config.editorWrapPanelWidth * (this.scalePercent / 100) / this.$config.thumbnailWidth
        },
        scaleY(){
            return this.$config.editorWrapPanelHeight * (this.scalePercent / 100) / this.$config.thumbnailHeight
        },
        ...mapState({
            showThumbnail: state => state.scale.showThumbnail,
            canvaswp: state => state.scale.canvaswp,
            scalePercent: state => state.scale.scalePercent
        })
    },
    created(){
        this.showWidth = this.$config.thumbnailWidth
        this.showHeight = this.$config.thumbnailHeight
    },
    mounted(){
        let canvasInstance = this.$refs.paint
        this.controlBoxInstance = this.$refs.controlBox
        this.ctx = canvasInstance.getContext('2d')
        this.initPaint()
    },
    methods:{
        initPaint(){
            this.ctx.strokeStyle = 'rgb(5,81,110)'
            this.ctx.fillStyle = 'rgb(5,81,110)';
            //绘制屏幕矩形
            let config = this.$config
            let innerWidth = config.screenPixelWidth * (this.scalePercent / 100) / this.scaleX
            let innerHeight = config.screenPixelHeight * (this.scalePercent / 100) / this.scaleY
            let innerTranslateX = WRAP_TRANSLATEX / this.scaleX
            let innerTranslateY = WRAP_TRANSLATEY / this.scaleX
            this.innerWidth = innerWidth
            this.innerHeight = innerHeight
            this.ctx.strokeRect(innerTranslateX, innerTranslateY, innerWidth, innerHeight)
        },
        onMouseDown(e){
            e.stopPropagation();
            let canMove = true
             //获取x坐标和y坐标
            let x = e.clientX;
            let y = e.clientY;
            //获取左部和顶部的偏移量
            let l = this.translateX
            let t = this.translateY
            let me = this
            window.document.body.addEventListener('mousemove',function(e){
                e.preventDefault();
                 //获取x和y
                var nx = e.clientX;
                var ny = e.clientY;
                //计算移动后的左偏移量和顶部的偏移量
                var nl =   nx - (x-l);
                var nt = ny - (y-t);
                if(canMove){
                       if (nl<0) nl = 0
                       if(nt<0) nt = 0
                       if((nl + me.controlWidth) > me.$config.thumbnailWidth) nl = me.$config.thumbnailWidth - me.controlWidth
                       if((nt + me.controlHeight) > me.$config.thumbnailHeight) nt = me.$config.thumbnailHeight - me.controlHeight
                        let canvasValue = {
                            scrollTop: nt * me.scaleY,
                            scrollLeft: nl * me.scaleX,
                            clientWidth: me.canvaswp.clientWidth,
                            clientHeight: me.canvaswp.clientHeight
                        }
                        me.$store.dispatch('setCanvaswp', canvasValue)
                       
                        me.$bus.$emit('thumbnailScroll', {
                            x: canvasValue.scrollLeft,
                            y: canvasValue.scrollTop     
                        })
                }
            })
            window.document.body.addEventListener('mouseup',function(e){
                 canMove = false
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.thumbnail{
    display: flex;
    position: absolute;
    right: 5px;
    bottom: 35px;
    user-select: none;
    z-index: 110;
    cursor: pointer;
    .thumbnail-control_box{
        border: 1px solid #2483ff;
        box-shadow: 0 0 30px 0 #000;
        z-index: 2;
        position: absolute;
        top: 0;
        left: 0;
        cursor: move;
        
    }
}
</style>