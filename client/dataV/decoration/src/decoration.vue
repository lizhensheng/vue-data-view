<template>
        <component  ref="decorationRef"  :is="props[0].fields[3].value[1].value.value"
                   :color="props[0].fields[3].value[0].value.value"
                   :style="{'width': width + 'px', 'height': height + 'px'}"
                    v-model="props[0].fields[3].value[0].value.value"/>
</template>

<script>

export default {
    name: 'DDecoration',
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
    methods:{
        
    }
}
</script>