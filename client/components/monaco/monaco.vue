<template>
    <div class="monaco">
         <div  :ref="id" :style="{'height': height + 'px'}">
         </div>
    </div>
</template>

<script>
import * as monaco from 'monaco-editor'
export default {
    name: 'Monaco',
    mounted(){
        this.initMonaco()
        this.$bus.$on('createMonacoInstance', () => {
            this.initMonaco()
        })
        this.$bus.$on('setLanguage', (language) => {
                if(this.$monacoInstance){
                    let model =  this.$monacoInstance.getModel()
                    if(model && model.uri){
                        monaco.editor.setModelLanguage(model, language)
                    }
                }
        })
    },
    props:{
        value: {
            type: String,
            default: ''
        },
        height: {
            type: Number,
            default: 300
        },
        language:{
            type: String,
            default: 'json'
        },
        readOnly:{
            type: Boolean,
            default: true
        },
        id:{
            type: String,
            default: 'monaco'
        }
    },
    watch:{
        value(val){
            if(val){
                if(this.$monacoInstance){
                    (this.$monacoInstance.getModel()).setValue(val)
                }
            }
        }
    },
    methods:{
        initMonaco(){
            let that = this
            if(that.$refs && that.$refs[that.id]){
                if(that.$monacoInstance){
                    that.$monacoInstance.dispose()
                }
                that.$monacoInstance = monaco.editor.create(that.$refs[that.id], {
                    value: that.addBackspace(that.value),
                    language: that.language,
                    theme: 'hc-black',
                    automaticLayout: true,
                    readOnly: that.readOnly,
                    wordWrap:'on',
                    folding: true,
                    contextmenu: 'false',
                    layoutInfo:{
                        height: 300,
                        width: 200   
                    }
                })
                that.$monacoInstance.onDidBlurEditorText(() => {
                    if(that.$monacoInstance){
                        let val = (that.$monacoInstance.getModel()).getValue()
                        that.$emit('blur', val)
                    }
                })
            }
        },
        addBackspace(result) {
            if(this.language === 'json'){
                return result
            }
            else{
                return result
            }
        }
    },
    beforeDestroy(){
            if(this.$monacoInstance){
                this.$monacoInstance.dispose()
            }
    }
}
</script>