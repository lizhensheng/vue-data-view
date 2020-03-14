<template>
    <div class="guide-line" data-name="guideline">
        <div class="guide-temp_line" v-show="line.show" :class="line.type"
         :style="[{
                    'top': line.type === 'h'? line.position + 'px' : '20px'
                }, {
                    'left': line.type === 'v'? line.position + 'px' : '20px'
                }]"
            data-name="guideline">
        </div>
        <div class="guide-solidLines" v-show="isShowGuideLine">
            <div class="guide-solid_line" v-for="(item,index) in solidLines" :key="index" :class="item.type"
                :style="[{
                    'top': item.type === 'h'? item.position + 'px' : '20px'
                    }, {
                        'left': item.type === 'v'? item.position + 'px' : '20px'
                    }, {
                        'width': item.type === 'h'? screenShot.width + 'px' : '2px'
                    }, {
                        'height': item.type === 'v'? screenShot.height + 'px' : '2px'
                    }]"
                @mousedown="onMouseDown"
                @dblclick="onDbClick"
                :data-index="index"
                title="双击删除辅助线"
            >
                <div class="line-action" :style="{'transform': item.type === 'v'?`translateY(${canvaswp.scrollTop}px)`:`translateX(${canvaswp.scrollLeft}px)`}"><span class="line-value">
                    {{
                        Math.ceil(
                            (item.position-tranlate)*(relationScale/singleScaleWidth)
                        )
                    }}
                </span></div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    data(){
        return {
            line: {
                type: 'h',  //水平或垂直线
                position: 20,
                show: false,
            },
            solidLines: [],
            isShowGuideLine: true,
            tranlate: 60 //定义偏移量
        }
    },
    computed:{
        ...mapState({
            screenShot: state => state.scale.screenShot,
            singleScaleWidth: state => state.scale.singleScaleWidth,
            relationScale: state => state.scale.relationScale,
            canvaswp: state => state.scale.canvaswp,
        })
    },
    mounted(){
        this.$bus.$on('onTempLineShow', (data) => {
                this.line.type = data.type
                this.line.position = data.position
                this.line.show = true
        })
        this.$bus.$on('onTempLineHide', (data) => {
            this.line.type = 'h'
            this.line.position = 0
            this.line.show = false
        })
        this.$bus.$on('onAddLine', (data) => {
            this.solidLines.push(data)
        })
        this.$bus.$on('onGuideLine', (data) => {
            this.isShowGuideLine = data.show
        })
    },
    methods:{
        onMouseDown(e){
            let index = e.currentTarget.dataset.index
            this.solidLines[index].canMove = true
             //获取x坐标和y坐标
            let x = e.clientX;
            let y = e.clientY;

            //获取左部和顶部的偏移量
            let l = e.currentTarget.offsetLeft;
            let t = e.currentTarget.offsetTop;
            let me = this
            window.addEventListener('mousemove',function(e){
                 //获取x和y
                var nx = e.clientX;
                var ny = e.clientY;
                //计算移动后的左偏移量和顶部的偏移量
                var nl = nx - (x - l);
                var nt = ny - (y - t);
                if(me.solidLines[index] && me.solidLines[index].canMove){
                    if(me.solidLines[index].type == 'h'){
                        me.$set(me.solidLines[index],'position',nt)
                    }else{
                        me.$set(me.solidLines[index],'position',nl)
                    }
                }
            })
            e.currentTarget.addEventListener('mouseup',function(e){
                 me.solidLines[index].canMove = false
            })
        },
        onDbClick(e){
            let index = e.currentTarget.dataset.index
            this.solidLines.splice(index,1)
             e.currentTarget.removeEventListener('mousedown',function(e){
            })
             e.currentTarget.removeEventListener('mouseup',function(e){
            })
            
        }
    }
}
</script>

<style lang="stylus" scoped>
.guide-line{
    overflow: hidden;
    z-index: 91;
    .guide-temp_line{
        z-index: 91;
        &.h{
            position: absolute;
            left: 0;
            right: 0;
            height: 2px;
            border-left: 0px;
            border-right: 0px;
            border-top: 1px dashed rgb(31,131,255);
            border-bottom: 0px;
        }
        &.v{
            position: absolute;
            top: 40px;
            width: 2px;
            border-top: 0px;
            border-bottom: 0px;
            border-left: 1px dashed rgb(31,131,255);
            border-right: 0px;
            height: 100vh;
        }
    }
    .guide-solidLines{
        .guide-solid_line{
            z-index: 100;
            &.h{
                position: absolute;
                left: 0;
                right: 0;
                height: 2px;
                border-left: 0px;
                border-right: 0px;
                border-top: 1px solid rgb(31,131,255);
                border-bottom: 0px;
                cursor: s-resize;
                padding-top: 5px;
                .line-action {
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    user-select: none;
                    color: #fff;
                    padding: 0 4px;
                    border-radius: 1px;
                    box-shadow: 0 0 5px -3px #000;
                    background: #4074b4;
                }
            }
            &.v{
                position: absolute;
                top: 40px;
                width: 2px;
                border-top: 0px;
                border-bottom: 0px;
                border-left: 1px solid rgb(31,131,255);
                border-right: 0px;
                cursor: w-resize;
                height: calc(100%);
                padding-left: 5px;
                 .line-action {
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    user-select: none;
                    color: #fff;
                    padding: 0 4px;
                    border-radius: 1px;
                    box-shadow: 0 0 5px -3px #000;
                    background: #4074b4;
                }
            }
        }
    }
}
</style>