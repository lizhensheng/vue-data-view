<template>
    <div>
        <vue-draggable-resizable :x="x"
                                  :y="y"
                                  :w="width"
                                  :h="height"
                                  @dragging="(left, top) =>onDrag('<%- config.chartId%>',left,top)"
                                  @resizing="(x, y, width, height) =>onResize('<%- config.chartId%>',x, y, width, height)"
                                  @activated="onActivated('<%- config.chartId%>')"  ref="draggable" v-if="borderIndex == 1">
            <dv-border-box-1>dv-border-box-2</dv-border-box-1>
        </vue-draggable-resizable>
        <vue-draggable-resizable :x="x"
                                  :y="y"
                                  :w="width"
                                  :h="height"
                                  @dragging="(left, top) =>onDrag('<%- config.chartId%>',left,top)"
                                  @resizing="(x, y, width, height) =>onResize('<%- config.chartId%>',x, y, width, height)"
                                  @activated="onActivated('<%- config.chartId%>')"  ref="draggable" v-if="borderIndex == 2">
            <dv-border-box-2>dv-border-box-2</dv-border-box-2>
        </vue-draggable-resizable>
        <vue-draggable-resizable :x="x"
                                 :y="y"
                                 :w="width"
                                 :h="height"
                                 @dragging="(left, top) =>onDrag('<%- config.chartId%>',left,top)"
                                 @resizing="(x, y, width, height) =>onResize('<%- config.chartId%>',x, y, width, height)"
                                 @activated="onActivated('<%- config.chartId%>')"  ref="draggable" v-if="borderIndex == 3">
            <dv-border-box-3>dv-border-box-2</dv-border-box-3>
        </vue-draggable-resizable>
        <vue-draggable-resizable :x="x"
                                 :y="y"
                                 :w="width"
                                 :h="height"
                                 @dragging="(left, top) =>onDrag('<%- config.chartId%>',left,top)"
                                 @resizing="(x, y, width, height) =>onResize('<%- config.chartId%>',x, y, width, height)"
                                 @activated="onActivated('<%- config.chartId%>')"  ref="draggable" v-if="borderIndex == 41">
            <dv-border-box-4>dv-border-box-2</dv-border-box-4>
        </vue-draggable-resizable>
        <vue-draggable-resizable :x="x"
                                 :y="y"
                                 :w="width"
                                 :h="height"
                                 @dragging="(left, top) =>onDrag('<%- config.chartId%>',left,top)"
                                 @resizing="(x, y, width, height) =>onResize('<%- config.chartId%>',x, y, width, height)"
                                 @activated="onActivated('<%- config.chartId%>')"  ref="draggable" v-if="borderIndex == 42">
            <dv-border-box-4  :reverse="true">dv-border-box-2</dv-border-box-4>
        </vue-draggable-resizable>
        <vue-draggable-resizable :x="x"
                                 :y="y"
                                 :w="width"
                                 :h="height"
                                 @dragging="(left, top) =>onDrag('<%- config.chartId%>',left,top)"
                                 @resizing="(x, y, width, height) =>onResize('<%- config.chartId%>',x, y, width, height)"
                                 @activated="onActivated('<%- config.chartId%>')"  ref="draggable" v-if="borderIndex == 51">
            <dv-border-box-5>dv-border-box-2</dv-border-box-5>
        </vue-draggable-resizable>
        <vue-draggable-resizable :x="x"
                                 :y="y"
                                 :w="width"
                                 :h="height"
                                 @resizing="(x, y, width, height) =>onResize('<%- config.chartId%>',x, y, width, height)"
                                   ref="draggable" v-if="borderIndex == 52">
            <dv-border-box-5  :reverse="true">dv-border-box-2</dv-border-box-5>
        </vue-draggable-resizable>
        <vue-draggable-resizable :x="x"
                                 :y="y"
                                 :w="width"
                                 :h="height"
                                 @resizing="(x, y, width, height) =>onResize('<%- config.chartId%>',x, y, width, height)"
                                 ref="draggable" v-if="borderIndex == 6">
            <dv-border-box-6  :reverse="true">dv-border-box-2</dv-border-box-6>
        </vue-draggable-resizable>
        <vue-draggable-resizable :x="x"
                                 :y="y"
                                 :w="width"
                                 :h="height"
                                 @resizing="(x, y, width, height) =>onResize('<%- config.chartId%>',x, y, width, height)"
                                 ref="draggable" v-if="borderIndex == 7">
            <dv-border-box-7  :reverse="true">dv-border-box-2</dv-border-box-7>
        </vue-draggable-resizable>
        <vue-draggable-resizable :x="x"
                                 :y="y"
                                 :w="width"
                                 :h="height"
                                 @resizing="(x, y, width, height) =>onResize('<%- config.chartId%>',x, y, width, height)"
                                 ref="draggable" v-if="borderIndex == 8">
            <dv-border-box-8  :reverse="true">dv-border-box-2</dv-border-box-8>
        </vue-draggable-resizable>
        <vue-draggable-resizable :x="x"
                                 :y="y"
                                 :w="width"
                                 :h="height"
                                 @resizing="(x, y, width, height) =>onResize('<%- config.chartId%>',x, y, width, height)"
                                 ref="draggable" v-if="borderIndex == 9">
            <dv-border-box-9  :reverse="true">dv-border-box-2</dv-border-box-9>
        </vue-draggable-resizable>
        <vue-draggable-resizable :x="x"
                                 :y="y"
                                 :w="width"
                                 :h="height"
                                 @resizing="(x, y, width, height) =>onResize('<%- config.chartId%>',x, y, width, height)"
                                 ref="draggable" v-if="borderIndex == 10">
            <dv-border-box-10  :reverse="true">dv-border-box-2</dv-border-box-10>
        </vue-draggable-resizable>
    </div>
</template>

<script>
    import Vue from 'vue'
    import dataV from '@jiaminghi/data-view'

    Vue.use(dataV)
    export default {
        data(){
          return {
              borderIndex:10,
              x:100,
              y:100,
              width:300,
              height:300
          }
        },
        mounted() {
            setTimeout(()=>{
                this.hide()
                setTimeout(()=>{
                    this.show()
                },200)

            },800)
        },
        methods:{
            onResize(chartId,x,y,width,height){
                this.x = x
                this.y = y
                this.width = width
                this.height = height
                setTimeout(()=>{
                    this.hide()
                    setTimeout(()=>{
                        this.show()
                    },200)

                },800)
            },
            hide(){
                this.borderIndex = -this.borderIndex
            },
            show(){
                this.borderIndex = Math.abs(this.borderIndex)
            }
        }
    }
</script>

<style>
    html,body{
        background: #1e1212;
    }
</style>