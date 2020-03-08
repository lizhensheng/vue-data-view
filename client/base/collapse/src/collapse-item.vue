<template>
    <div class="ui-collapse-item">
        <div class="ui-collapse_header" @click="onItemClick">
            <i :class="{'el-icon-arrow-up': collapseState, 'el-icon-arrow-down': !collapseState}"  class="marginR5 fontBold"></i>
            <i :class="iconClass" class="marginR5"></i>
            <div class="ibox">{{name}}</div>
        </div>
        <div class="ui-collapse_body" v-show="collapseState">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'YCollapseItem',
    data(){
        return {
            currentName: '',
            collapseState: false
        }
    },
    props:{
        iconClass: String,
        name: String
    },
    methods:{
        onItemClick(){
            this.collapseState = !this.collapseState
        }
    }
}
</script>