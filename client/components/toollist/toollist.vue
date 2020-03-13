<template>
    <div class="toollist" @blur="onBlur" tabindex="10">
        <div class="toolist-item" v-for="(item, index) in toolList" :key="index" @click="onItemClick" :data-title="item.title">
            <i :class="item.iconClass" class="marginR5"></i><span>{{item.title}}</span>
        </div>
    </div>
</template>

<script>
export default {
   name: 'ToolList',
   props: {
       toolList: {
           type: Array,
           default: function(){
               return []
           }
       }
   },
   methods:{
       onBlur(){
           this.$emit('blur')
       },
       onItemClick(e){
           let title = e.currentTarget.dataset.title
           this.$emit('toolListClick', {title: title})
       }
   }
}
</script>

<style  lang="stylus">
.toollist{
    display: flex;
    flex-direction: row;
    .toolist-item{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        border: 1px solid rgb(193,188,224);
        color: rgb(87,74,184);
        font-size: 14px;
        cursor: pointer;
        border-right: none;
        padding: 5px 10px;
    }
    >:first-child{
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    >:last-child{
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
        border-right: 1px solid rgb(193,188,224);
    }
}
</style>