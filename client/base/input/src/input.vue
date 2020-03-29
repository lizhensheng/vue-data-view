<template>
    <div class="ui-input" tabindex="2" :class="{'focus': isFocus}" :style="{'height': height + 'px'}">
        <div class="ibox icon-wrap" v-show="prevIcon"><i :class="prevIcon" /></div>
        <input :type="type" :value="value"  tabindex="6" @blur="onBlur" @focus="onFocus" @change="onChange" :placeholder="placeholder"/>
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
        value: [String, Number],
        placeholder: String,
        suffixIcon: String,
        prevIcon: String,
        height: {
            type: Number,
            default: 30
        },
        type: {
            type: String,
            default: 'text',
            validator: (value) =>{
                if(value === 'password' || value === 'text')
                {
                    return true
                }
                return false
            }
        }
    },
    methods:{
        onFocus(){
            this.isFocus = true
        },
        onBlur(){
            this.isFocus = false
        },
        onChange(e){
            this.$emit('input', e.target.value)
            this.$emit('change', e.target.value)
        }
    }
}
</script>