<template>
    <div class="power-editor" ref="editor" tabindex="1">
        <editor-header></editor-header>
        <div class="power-workspace">
            <component-panel v-show="showComponent"></component-panel>
            <main-editor></main-editor>
            <config-panel v-show="showConfig"></config-panel>
        </div>
    </div>
</template>

<script>
import MainEditor from './main-editor/main'
import ComponentPanel from './component-panel/panel'
import ConfigPanel from './config-panel/config-panel'
import EditorHeader from './editor-header/editor-header'
export default {
    data(){
        return {
            showComponent: true,
            showConfig: true
        }
    },
    components:{
        MainEditor,
        ComponentPanel,
        ConfigPanel,
        EditorHeader
    },
    mounted(){
        this.addEvent()
    },
    methods:{
        onCopy(){
            console.log('1')
        },
        addEvent(){
            this.$refs.editor.focus()
            this.$refs.editor.onkeydown = (e)=>{
                //组件面板的Ctrl + ↑
                if(e.ctrlKey && e.keyCode === 38){
                    this.showComponent = ! this.showComponent
                }
                //组件面板的Ctrl + →
                console.log(e)
                if(e.ctrlKey && e.keyCode === 39){
                    this.showConfig = ! this.showConfig
                }
                //组件面板的Ctrl + a
                if(e.ctrlKey && e.keyCode === 65){

                }
            }
        }
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