<template>
    <div class="power-editor">
        <div class="power-control"></div>
        <div class="power-workspace">
            <component-panel></component-panel>
            <main-editor></main-editor>
            <config-panel></config-panel>
        </div>
    </div>
</template>

<script>
import MainEditor from './main-editor/main'
import ComponentPanel from './component-panel/panel'
import ConfigPanel from './config-panel/config-panel'
export default {
    components:{
        MainEditor,
        ComponentPanel,
        ConfigPanel
    }
}
</script>

<style lang="stylus" scoped>
.power-editor{
    .power-workspace{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .right{
            width: 332px;
        }
    }
}
</style>