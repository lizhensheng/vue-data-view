<template>
    <div class="page main">
        <div class="canvas-main">
            <canvas-wp></canvas-wp>
        </div>
        <thumbnail></thumbnail>
        <edit-slider></edit-slider>
    </div>
</template>

<script>
import EditSlider from './edit-slider/edit-slider'
import CanvasWp from './canvas-wp/canvas-wp'
import Thumbnail from './thumbnail/thumbnail'
export default {
    name:'MainEditor',
    components:{
        EditSlider,
        CanvasWp,
        Thumbnail
    }
}
</script>

<style lang="stylus">
    .main{
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: url('./editorBg.png');
         overflow: hidden;
        .canvas-main{
            display: flex;
            width: 100%;
            height: 100%;
        }
    }
</style>