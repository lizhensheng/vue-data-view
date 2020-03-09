<template>
    <div class="power-editor">
        <editor-header></editor-header>
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
import EditorHeader from './editor-header/editor-header'
export default {
    components:{
        MainEditor,
        ComponentPanel,
        ConfigPanel,
        EditorHeader
    }
}
</script>

<style lang="stylus" scoped>
.power-editor{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .power-workspace{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}
</style>