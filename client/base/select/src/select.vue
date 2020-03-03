<template>
    <div class="ui-select">
        <div class="select-choose_wrap" @blur="onBlur"  @focus="onFocus" tabindex="1">
            <div  class="ibox select-choose_value marginL10">{{value}}</div>
            <i class="el-icon-arrow-down marginR10"></i>
        </div>

        <div class="select-dropdown_wrap" v-show="isShowDropdown"  tabindex="2">
            <div class="select-dropdown_item" v-for="(item,index) in options" :key="index" :data-val="item.value"  tabindex="3">
                <div class="ibox marginL10 width5 center"><span :class="{'select-dropdown_selected': item.label === value}">·</span></div>
                <div class="ibox marginL5">{{item.label}}</div>
            </div>
        </div>
    </div>
</template>
    
<script>
export default {
    name:'YSelect',
    data(){
        return {
            isShowDropdown :false,
        }
    },
    props:{
        options: Array,
        value: String
    },
    methods:{
        onBlur(e){
            this.isShowDropdown = false
            if(e.relatedTarget&&e.relatedTarget.dataset.val){
                let value = e.relatedTarget.dataset.val
                let item = this.options.filter(t=>t.value === value)
                if(item.length>0){
                    this.$emit('input',item[0].label)
                }
            }
        },
        onFocus(){
            this.isShowDropdown = true
        }
    }
}
</script>

