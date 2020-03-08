<template>
    <div class="canvas-panel" :style="{ 
        width: width1 +'px' ,
        height: height1 +'px',
        backgroundColor: backgroundColor,
        transform: `scale(${scalePercent/100})  translate(0px, 0px)`,
        backgroundImage: backgroundImage
    }">

    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
       return {
            width1: 1920,
            height1: 1080,
            backgroundColor: 'rgba(13, 42, 67, 0)',
            backgroundImage: 'url("//datav.oss-cn-hangzhou.aliyuncs.com/uploads/templates/7.png")'
       }
    },
    computed:{
        ...mapState({
            scalePercent: state => state.scale.scalePercent
        })
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