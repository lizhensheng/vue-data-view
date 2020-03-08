<template>
    <div class="canvas-ruler">
        <div class="canvas-ruler-top" @mousemove="onMouseHOver" @mouseout="onMouseHOut" @click="onHClick"
             :style="{'transform': `translateX(-${canvaswp.scrollLeft}px)`}">
            <canvas-item></canvas-item>
        </div>
        <div class="canvas-ruler-left" @mousemove="onMouseVOver" @mouseout="onMouseVOut" @click="onVClick"
             :style="{'transform': `rotate(90deg) translateX(-${canvaswp.scrollTop}px)`}">
             <canvas-item></canvas-item>
        </div>
        <div class="canvas-copper" :class="{'active': isShowGuideLine}" @click="onCopperClick" title="是否显示辅助线">
            <i class="el-icon-cpu"></i>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import CanvasItem from './canvas-item'
let _ = require('lodash')
export default {
    data(){
        return {
            isShowGuideLine: true
        }
    },
    computed:{
        ...mapState({
            canvaswp: state => state.scale.canvaswp,
        })
    },
    components:{
        CanvasItem
    },
    methods:{
        onMouseHOver(e){
            //触发更新辅助线
            this.$bus.$emit('onTempLineShow', {
                type: 'v',
                position: e.offsetX + 20
            })
            
        },
        onMouseHOut(e){
            this.$bus.$emit('onTempLineHide')
        },
        onMouseVOver(e){
             //触发更新辅助线
            this.$bus.$emit('onTempLineShow', {
                type: 'h',
                position: e.offsetX + 20
            })
        },
        onMouseVOut(e){
            this.$bus.$emit('onTempLineHide')
        },
        onHClick(e){
            //增加实线
            this.$bus.$emit('onAddLine',{
                type: 'v',
                position: e.offsetX + 20
            })
        },
        onVClick(e){
            //增加实线
            this.$bus.$emit('onAddLine',{
                type: 'h',
                position: e.offsetX + 20,
                show: true,
                canMove: true
            })
        },
        onCopperClick(){
            this.isShowGuideLine = ! this.isShowGuideLine
            this.$bus.$emit('onGuideLine',{
                show: this.isShowGuideLine
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.canvas-ruler{
    z-index: 99;
    position: fixed;
    .canvas-ruler-top{
        position: absolute;
        left: 20px;
        cursor: w-resize;
         z-index: 99;
    }
    .canvas-ruler-left{
        position: absolute;
        transform: rotate(90deg) translateX(0px);
        transform-origin: 0 100% 0;
        cursor: s-resize;
         z-index: 99;
    }
    .canvas-copper{
        background: #000;
        z-index: 100;
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ccc;
        cursor: pointer;
        &.active,&:hover{
            color: #eee;
        }
    }
}
</style>