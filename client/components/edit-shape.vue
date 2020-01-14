<template>
    <div
        class="components-edit-shape"
        @click="handleTopWrapperClick"
        @mousedown="handleMouseDownOnElement"
        :class="{active:this.active}"
        >
        <div
            class="edit-shape-point"
            v-for="item in (active?pointList:[])"
            :key="item"
            @mousedown="handleMouseDownOnPoint(item)"
            :style="getPointStyle(item)"
            ></div>
            <slot></slot>
    </div>
</template>

<script>
import runAnimations from '@client/common/js/runAnimations'
import Bus from '@client/eventBus'
export default {
    name:'EditShape',
    props:{
        active:{
            type:Boolean,
            default:false
        },
        defaultStyle:{
            require:true,
            type:Object
        },
        uuid:String
    },
    data(){
        return {
            pointList:['lt','rt','lb','rb','l','r','t','b'],
            directionKey:{
                t:'n',
                b:'s',
                l:'w',
                r:'e'
            }
        }
    },
    mounted(){
        this.animatePlaying=false
        Bus.$on('RUN_ANIMATIONS',(uuid,animations)=>{
            if(uuid!==this.uuid){
                return
            }
            if(this.animationPlaying) return
            let cssText = this.$el.style.cssText
            this.animatePlaying=true
            runAnimations(this.$el,animations,true,()=>{
                this.$el.style.cssText=cssText
                this.animatePlaying=false
            })
        })
    },
    methods:{
        getPointStyle(point){
            const pos=this.defaultStyle
            const height=pos.height
            const width=pos.width
            let hasT=/t/.test(point)
            let hasB=/b/.test(point)
            let hasL=/l/.test(point)
            let hasR=/r/.test(point)
            let newLeft=0
            let newTop=0
            if(point.length===2)
            {
                newLeft=hasL?0:width
                newTop=hasT?0:height
            }
            else{
                if(hasT||hasB){
                    newLeft=width/2
                    newTop=hasT?0:height
                }
                if(hasL||hasR){
                    newLeft=hasL?0:width
                    newTop=height/2
                }
            }
            const style={
                marginLeft:(hasL||hasR)?'-5px':0,
                maringTop:(hasT||hasB)?'-5px':0,
                left:`${newLeft}px`,
                top:`${newTop}px`,
                cursor:point.split('').reverse().map(m=>this.directionKey[m]).join('')+'-resize'
            }
            return style
        },
        handleTopWrapperClick(e){
            e.stopPropagation()
            e.preventDefault()
        },
        handleMouseDownOnElement(e){
            this.$emit('handleElmentClick')

            const pos = {...this.defaultStyle}
            let startY=e.clientY
            let startX=e.clientX
            let startTop=pos.top
            let startLeft=pos.left
            let firstTime='',lastTime=''
            let move=moveEvent=>{
                moveEvent.stopPropagation()
                moveEvent.preventDefault()

                let currX = moveEvent.clientX
                let currY = moveEvent.clientY
                pos.top=currY-startY+startTop
                pos.left=currX-startX+startLeft
                this.$emit('resize',pos)
            }
            let up=()=>{
                lastTime=new Date().getTime()
                if((lastTime-firstTime)>200){
                    this.$emit('resize')
                }
                document.removeEventListener('mousemove',move,true)
                document.addEventListener('mouseup',up,true)
            }
            document.addEventListener('mousemove',move,true)
            document.addEventListener('mouseup',up,true)
            return true
        },
        handleMouseDownOnPoint(point){
            let downEvent = event
            this.$emit('handleElementClick')
            downEvent.stopPropagaton()
            downEvent.preventDefault()
            const pos={...this.defaultStyle}
            let height=pos.height
            let width=pos.width
            let top=pos.top
            let left=pos.left
            let startX=downEvent.clientX
            let startY=downEvent.clientY
            let move = moveEvent=>{
                let currX=moveEvent.clientX
                let currY=moveEvent.clientY
                let disY=currY-startY
                let disX=currX-startX
                let hasT=/t/.test(point)
                let hasB=/b/.test(point)
                let hasL=/l/.test(point)
                let hasR=/r/.test(point)
                let newHeight=+height+(hasT?-disY:hasB?disY:0)
                let newWidth=+width+(hasL?-disX:hasR?disX:0)
                pos.height=newHeight>0?newHeight:0
                pos.width=newHeight>0?newWidth:0
                pos.left=+left+(hasT?disY:0)
                pos.top=+top+(hasT?disY:0)
                this.$emit('resize',pos)
            }
            let up=()=>{
                this.$emit('resize')
                document.removeEventListener('mousemove',move)
                document.removeEventListener('mouseup',up)
            }
            document.addEventListener('mousemove',move)
            document.addEventListener('mouseup',up)
        }
    }
}
</script>

<style lang="scss" scoped>
.edit-shape-point{
    width:10px;
    height:10px;
    background-color: #ffffff;
    border:1px solid #59c7f9;
    border-radius: 10px;
    position: absolute;
    z-index: 1001;
}
.components-edit-shop{
    cursor:move;
    &.active {
      outline: 1px dashed #25A589;
    }
    &:hover {
      outline: 1px dashed #25A589;
    }
}
</style>