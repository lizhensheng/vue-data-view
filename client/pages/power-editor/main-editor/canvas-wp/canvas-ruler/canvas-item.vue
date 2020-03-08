<template>
    <canvas ref="rule" class="canvas"  :width="showWidth" :height="showHeight">您当前的浏览器不支持canvas</canvas>
</template>

<script>
import {mapState} from 'vuex'
/**
 *  定义缩放的倍率和刻度的关系
 **/
const scaleRelation = function(percent){
    if(percent>=18 && percent <35){
        return 40
    } else if(percent>=35 && percent <52){
        return 20
    } else if(percent>=52 && percent <88){
        return 10
    } else if(percent>=88 && percent <105){
        return 8
    }else if(percent>=105 && percent <140){
        return 6
    }else if(percent>=140 && percent <175){
        return 4
    }else{
        return 4
    }
}
/**
 *  定义画布宽度
 **/
const CANVAS_WIDTH = 2320
/**
 *  定义画布高度
 **/
const CANVAS_HEIGHT = 20

/**
 *  定义尺子起点位置
 **/
const RULE_START = 40
export default {
    data(){
        return {
            showWidth: 0
        }
    },
    computed:{
        showHeight(){
            return CANVAS_HEIGHT
        },
        singleScaleWidth(){
            let scaleCount = CANVAS_WIDTH / this.relationScale
            let result = ((CANVAS_WIDTH * this.scalePercent) / (scaleCount*100))

            this.$store.dispatch('setSingleScaleWidth',result)
            return result
        },
        relationScale(){
            let result = scaleRelation(this.scalePercent)

            this.$store.dispatch('setRelationScale',result)
            return result
        },
        ...mapState({
            scalePercent: state => state.scale.scalePercent,
            screenShot: state => state.scale.screenShot,
		})
    },
    watch:{
        scalePercent(){
             let _ = this
             this.showWidth = this.screenShot.width
             setTimeout(()=>{_.setRule()},30)
        }
    },
    mounted(){
        let canvasInstance = this.$refs.rule
        this.ctx = canvasInstance.getContext('2d')
        //监控window窗口的大小
        //设置当前的画布宽度
        this.showWidth =  this.screenShot.width
        setTimeout(()=>{this.setRule()},30)
    },
    destroyed(){
        this.ctx = null
    },
    methods:{
        setRule(){
            try{
                let {ctx} = this
                if(ctx) {
                    
                    ctx.clearRect(0,0,this.showWidth,this.showHeight);
                    ctx.beginPath();
                    //绘制起点
                    ctx.strokeStyle = 'rgb(161, 174, 179)'
                    ctx.fillStyle = 'rgb(161, 174, 179)';
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(RULE_START,0)
                    ctx.lineTo(RULE_START,20)
                    ctx.fillText('0',RULE_START+3,13)
                    //计算出要绘制多少个刻度
                    let scaleCount = Math.ceil(this.showWidth / this.singleScaleWidth)
                    for(let i = 1; i<= scaleCount; i++){
                        let step = RULE_START + i * this.singleScaleWidth
                        if(i%10 === 0){
                            ctx.moveTo(step, 0)
                            ctx.lineTo(step, 20)
                            //标注刻度值
                            let scaleText = this.relationScale * i
                            ctx.fillText(scaleText,step+3,13)
                        } else if (i%5 === 0){
                            ctx.moveTo(step, 15)
                            ctx.lineTo(step, 20)
                            //标注刻度值
                            let scaleText = this.relationScale * i
                            ctx.fillText(scaleText,step,13)
                        } else {
                            ctx.moveTo(step, 18)
                            ctx.lineTo(step, 20)
                          
                           
                        }
                    }
                    ctx.stroke()
                   
                }
            }
            catch(e){
                console.error(e)
            }
        }
    }
}
</script>

<style>
.canvas{
    background: rgb(14,16,19);
   
}
</style>