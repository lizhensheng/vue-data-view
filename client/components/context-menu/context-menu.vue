<template>
    <div class="context-menu" tabindex="1" :style="{'top': y+'px','left':x+'px'}">
        <div v-for="(item,index) in contextList" :key="index" :class="['context-menu_item',{'disabled': item.disabled}]" @click="onMenuItemClick" :data-title="item.title">
            <i :class="item.iconClass" class="marginR5"></i><span>{{item.title}}</span>
        </div>
    </div>
</template>

<script>
export default {
   data(){
       return {

       }
   },
   props:{
       contextList: {
           type: Array,
           default: function(){
               return []
           }
       },
       x: Number,
       y: Number
   },
   methods: {
       onMenuItemClick(e){
           let title = e.currentTarget.dataset.title
           this.$emit('menuItemClick', {title: title})
       }
   }
}
</script>

<style lang="stylus">
.context-menu{
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 172px;
    background: rgb(39,52,72);
    color: #fff;
    font-size: 13px;
    z-index: 100;
    .context-menu_item{
        display: flex;
        align-items: center;
        height: 30px;
        padding-left: 10px;
        &:hover{
            background: rgb(29,38,46);
            cursor: pointer;
            color: rgb(36,131,255);
        }
        &.disabled{
            background:none;
            color: rgb(87,99,105);
            cursor: default;
        }
    }
}
</style>