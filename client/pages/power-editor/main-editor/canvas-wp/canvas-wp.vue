<template>
    <div class="canvas-wp"  @scroll="onScroll"  ref="canvaswp">
        <div class="screen-shot" :style="{width: screen.width +'px', height: screen.height + 'px'}">
            <canvas-ruler></canvas-ruler>
            <canvas-panel></canvas-panel>
            <guide-line></guide-line>
        </div>
    </div>
</template>

<script>
import CanvasRuler from './canvas-ruler/canvas-ruler'
import CanvasPanel from './canvas-panel/canvas-panel'
import GuideLine from './guide-line/guide-line'
import {mapState} from 'vuex'
export default {
    name: 'CanvasWp',
    components:{
        CanvasRuler,
        CanvasPanel,
        GuideLine
    },
    data(){
        return {
            clientWidth: 2320,
            clientHeight: 1480
        }
    },
    computed:{
        screen(){
            let percent = this.scalePercent / 100
            let paintWidth = this.$config.editorWrapPanelWidth * percent
            let maxWidth = Math.max( this.clientWidth, paintWidth)

            // let percent = this.scalePercent / 100
            let paintHeight = this.$config.editorWrapPanelHeight * percent
            let maxHeight = Math.max( this.clientHeight, paintHeight)

            //保存屏幕的高度
            this.$store.dispatch('setScreenShot', {
                width: maxWidth,
                height: maxHeight
            })
            return {
                width: maxWidth,
                height: maxHeight
            }
        },
        ...mapState({
            scalePercent: state => state.scale.scalePercent,
            canvaswp: state => state.scale.canvaswp,
            screenShot: state => state.scale.screenShot
        })
    },
    created(){

    },
    mounted(){
        this.canvaswpInstance = this.$refs.canvaswp
        this.clientWidth = this.canvaswpInstance.clientWidth
        this.clientHeight = this.canvaswpInstance.clientHeight
        this.$bus.$on('winowResize', ()=>{
            this.clientWidth = this.canvaswpInstance.clientWidth
            this.clientHeight = this.canvaswpInstance.clientHeight
        })
        this.$bus.$on('thumbnailScroll', (data) => {
            this.canvaswpInstance.scrollLeft  = data.x 
            this.canvaswpInstance.scrollTop = data.y
        })
        //获得视口的大小
        this.$store.dispatch('setCanvaswp',{
            scrollTop: 0,
            scrollLeft: 0,
            clientWidth: this.clientWidth,
            clientHeight: this.clientHeight
        })
    },
    methods:{
        onScroll(e){
           let scrollTop = e.target.scrollTop
           let scrollLeft = e.target.scrollLeft
           this.$store.dispatch('setCanvaswp',{
               scrollTop,
               scrollLeft,
               clientWidth: this.clientWidth,
               clientHeight: this.clientHeight
           })

        }
    }
}
</script>

<style lang="stylus" scoped>
    .canvas-wp{
        height: 100%;
        overflow: auto;
        position: relative;
        width: 100%;
        height: 100%;
        .screen-shot{
            
        }
    }
</style>