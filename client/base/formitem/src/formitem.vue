<template>
    <div class="ui-formitem" :style="{height: height + 'px'}" :class="popper">
        <div class="ui-formitem_title" :style="{width: width + 'px'}">{{title}}</div>
        <div class="ui-formitem_content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name:'YFormItem',
    props:{
        title: String,
        width: {
            type: Number,
            default: 300
        },
        height: {
            type: Number,
            default: 30
        },
        popper:{
            type: String,
            default: ''
        }
    }
}
</script>