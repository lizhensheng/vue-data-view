<template>
    <dv-digital-flop :config="userConfig" :style="{'width': width + 'px', 'height': height + 'px'}" />
</template>

<script>
    export default {
        name: 'DDigitalflop',
        data(){
            return {

            }
        },
        props: {
            props:{
                type: Array,
                default: function(){
                    return [{
                        fields:[]
                    }]
                }
            },
            width:{
                type: Number,
                default: 300
            },
            height:{
                type: Number,
                default: 300
            },
            ratio:{
                type: Number,
                default: 1
            },
        },
        computed:{
            number(){
                return this.props[0].fields[3].value[0].value.value
            },
            content(){
                return this.props[0].fields[3].value[1].value.value
            },
            toFixed(){
                return this.props[0].fields[3].value[2].value.value
            },
            userConfig(){
                let config = {
                    number: this.number,
                    content: this.content,
                    toFixed: this.toFixed,
                }
                return { ... config}
            }
        }
    }
</script>
