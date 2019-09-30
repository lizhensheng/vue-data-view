<template>
    <div>
            <div class="panel-right" ref="panelRight">
                <div class="handle-button" @click="togglePanel">
                    <i class="iconfont icon-icon-closes"></i>
                </div>
                <div class="rightPanel-items">
                    <slot></slot>
                </div>
            </div>
    </div>
</template>

<script>
    import './panel-right.styl'
    import {toggleClassName} from "common/js/dom"

    export default {
        methods:{
            togglePanel(){
                let panelRight = this.$refs.panelRight
                toggleClassName(panelRight,'toggle')
            }
        }
    }
</script>