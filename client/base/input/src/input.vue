<template>
    <div class="ui-input" tabindex="2" :class="{'focus': isFocus}">
        <input type="text" :value="value"  tabindex="6" @blur="onBlur" @focus="onFocus" @change="onChange" :placeholder="placeholder"/>
        <div class="ibox icon-wrap" v-show="suffixIcon"><i :class="suffixIcon" /></div>
    </div>
</template>

<script>
export default {
    name: 'YInput',
    data(){
        return {
            isFocus: false
        }
    },
    props:{
        value: String,
        placeholder: String,
        suffixIcon: String
    },
    methods:{
        onFocus(){
            this.isFocus = true
        },
        onBlur(){
            this.isFocus = false
        },
        onChange(e){
            this.$emit('input',e.target.value)
        }
    }
}
</script>