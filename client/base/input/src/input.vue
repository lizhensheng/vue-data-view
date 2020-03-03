<template>
    <div class="ui-input" tabindex="2" :class="{'focus': isFocus}">
        <input type="text" value="我的"  tabindex="6" @blur="onBlur" @focus="onFocus" @change="onChange"/>
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
        input: String
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