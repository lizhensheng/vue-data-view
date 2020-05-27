<template>
    <div>
        <el-color-picker :value="value" @change="onChange" size="mini" show-alpha></el-color-picker>
    </div>
</template>

<script>
export default {
    name: 'YColor',
    props:{
        value: String
    },
    methods:{
        onChange(color){
            this.$emit('input', color)
            this.$emit('change', color)
        }
    }
}
</script>