<template>
    <div class="c-scroll-text" :style="{...getTextStyle(props[0].fields)}">
        <a v-if="dataTrigger.link" :href="dataTrigger.link">
            <span class="sp-text" ref="textWrapper">{{dataTrigger.text}}</span>
        </a>
        <span v-else class="sp-text" ref="textWrapper">{{dataTrigger.text}}</span>
    </div>
</template>
<script>
import componentRefresh from '@/mixins/componentRefresh'
export default {
    name:'CScrollText',
    data(){
        return {
            animationHandler:[],
        }
    },
    mixins: [componentRefresh],
    props:{
        props:{
            type: Array,
            default: function(){
                return [{
                    fields:[]
                }]
            }
        }
    },
    mounted(){
        this.startAnimation()
    },
    computed:{
        dataTrigger(){
            if(this.props[1].fields[0].value.dataJson.json){
                let result = this.getResult(this.props[1].fields[0].value.dataJson.json)
                return result
            }
            else{
                let link = this.props[0].fields[4].value[2].value.value
                let text = this.props[0].fields[3].value.value
                return {link,text}
            }
        },
        animationTime(){
            return this.props[0].fields[4].value[3].value.value
        }
    },
    watch:{
        animationTime(val){
            if(val>0){
                this.stopAnimation()
                this.startAnimation()
            }
        }
    },
    methods:{
        startAnimation(){
            this.$nextTick(()=>{
                let second = this.animationTime
                if(second === 0) return
                this.$refs.textWrapper.style.transition = `all ${second}s linear`
                this.animation()
            })
        },
        async animation(){
            let animationWidth = this.props[0].fields[0].value[0].value.value
            this.$refs.textWrapper.style.transition = 'all 0s linear'
            if(!this.first){
                this.$refs.textWrapper.style.transform = 'translateX(0px)'
                this.first = true
            }else{
                this.$refs.textWrapper.style.transform = `translateX(${animationWidth}px)`
            }
            await new Promise(resolve=>setTimeout(resolve,30))
            let second = this.animationTime
            second = !this.first ? second :second*2
            this.$refs.textWrapper.style.transition = `all ${second}s linear`
            this.$refs.textWrapper.style.transform = `translateX(-${animationWidth}px)`
            let milliSecond = this.animationTime*1000
            this.animationHandler.push(setTimeout(this.animation,!this.first ? milliSecond : milliSecond*2))
        },
        stopAnimation(){
            if(this.animationHandler.length>0){
                this.animationHandler.forEach(item=>{
                    clearTimeout(item)
                })
            }
        },
        getTextStyle(item){
            let fontSize = item[4].value[0].value.value
            let fontColor = item[4].value[1].value.value
            return {
                'font-size': fontSize + 'px',
                'color': fontColor
            }
        },
        getResult(json){
            let jsonArray = []
            try
            {
                jsonArray = JSON.parse(json)
            }
            catch(e){
                console.warn(e.message)
            }
            let model = this.props[1].fields[0].value.dataJson.model
            let fieldText = model[0].field
            let mappingText =model[0].mapping
            let keyText = mappingText || fieldText

            let fieldLink = model[1].field
            let mappingLink =model[1].mapping
            let keyLink = mappingLink || fieldLink
            return jsonArray.length > 0 ? 
                    {
                        text: jsonArray[0][keyText],
                        link: jsonArray[0][keyLink] 
                    }
                    : {}
        }
    },
    destroyed(){
        this.stopAnimation()
    }
}
</script>

<style lang="stylus" scoped>
.c-scroll-text{
    position: relative;
    text-overflow: hidden;
    display: inline-block;
    .sp-text{
        display: inline-block;
    }
}
</style>