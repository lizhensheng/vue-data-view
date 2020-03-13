<template>
    <div class="c-simpleText" :style="`color:${color};font-size:${size}px;width:${width}px;background-color:${backColor};`">
        <a v-if="link"><span class="sp-text" ref="textWrapper">{{value}}</span></a>
        <span v-else class="sp-text" ref="textWrapper">{{value}}</span>
    </div>
</template>
<script>
import './index.styl'
export default {
    name:'CSimpleText',
    data(){
        return {
            animationHandler:[]
        }
    },
    props:{
        value:{
            type:String,
            default:''
        },
        color:{
            type:String,
            default:'black'
        },
        backColor:{
            type:String,
            default:'white'
        },
        size:{
            type:Number,
            default:16
        },
        marquee:{
            type:Boolean,
            default:true
        },
        width:{
            type:Number,
            default:300
        },
        waitTime:{
            type:Number,
            default:3000
        },
        link:{
            type:String,
            default:''
        }
    },
    mounted(){
        if(this.marquee){
            this.$nextTick(()=>{
                let mill = this.waitTime / 1000
                this.$refs.textWrapper.style.transition = `all ${mill}s linear`
                this.animation()
            })
        }
        
    },
    methods:{
        async animation(){
            this.$refs.textWrapper.style.transition = 'all 0s linear'
            if(!this.first){
                this.$refs.textWrapper.style.transform = 'translateX(0px)'
                this.first = true
            }else{
                this.$refs.textWrapper.style.transform = `translateX(${this.width}px)`
            }
            
            await new Promise(resolve=>setTimeout(resolve,30))
            let mill = this.waitTime / 1000
            mill = !this.first ? mill :mill*2
            this.$refs.textWrapper.style.transition = `all ${mill}s linear`
            this.$refs.textWrapper.style.transform = `translateX(-${this.width}px)`
            this.animationHandler.push(setTimeout(this.animation,!this.first ? this.waitTime :this.waitTime*2))
        },
        stopAnimation(){
            if(this.animationHandler.length>0){
                this.animationHandler.forEach(item=>{
                    clearTimeout(item)
                })
            }
        }
    },
    destroyed(){
        this.stopAnimation()
    }
}
</script>