<template>
    <div>

        <div  ref="monaco" style="height: 300px">
        </div>
    </div>
</template>

<script>
    import * as monaco from 'monaco-editor'
    export default {
        data() {
            return {

            }
        },
        mounted() {
            this.$monacoInstance = monaco.editor.create(this.$refs.monaco,{
                value: [
                    'function x() {',
                    '\tconsole.log("Hello world!");',
                    '}'
                ].join('\n'),
                language: 'javascript'
            })
        }
    }
</script>