<template>
    <div class="ui-formitem" :class="[align,popper]" :style="{height: height === 'auto' ? 'auto': height + 'px'}">
        <div class="ui-formitem_title" :style="{width: width + 'px'}" v-if="align === 'leftToRight'">{{title}}</div>
        <div class="ui-formitem_title" :style="{width: '100%', cursor: 'pointer'}" v-else @click="onClickHeader">
            <span>{{title}}</span><i :class="showContent ? 'el-icon-arrow-up': 'el-icon-arrow-down'" v-show="!this.staticTitle"></i>
        </div>
        <div class="ui-formitem_content" v-show="align === 'leftToRight'? true : showContent">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name:'YFormItem',
    data(){
        return {
            showContent: false
        }
    },
    props:{
        title: String,
        width: {
            type: Number,
            default: 300
        },
        height: {
            type: [Number,String],
            default: function(){
                return 30
            }
        },
        popper:{
            type: String,
            default: ''
        },
        align:{
            type: String,
            default: 'leftToRight'
        },
        staticTitle:{
            type: Boolean,
            default: false
        }
    },
    mounted(){
        this.showContent = this.staticTitle
    },
    methods:{
        onClickHeader(){
            if(this.staticTitle) return
            this.showContent = ! this.showContent 
        }
    }
}
</script>