<template>
  <div class="page-home">
    <div class="home-side-bar">
      <menu-list :collapsed="isCollapsed"></menu-list>
    </div>
    <div class="clearfix my-page-list">
      <mheader @collapsed="onCollapsed" :collapsed="isCollapsed"></mheader>
      <router-view class="sub-page"/>
    </div>
  </div>
</template>

<script>
  import Menu from '../menu/menu'
  import mheader from '../m-header/m-header'
	export default {
    data(){
      return {
        isCollapsed: false
      }
    },
    components:{
      MenuList: Menu,
      mheader: mheader
    },
    methods:{
      onCollapsed(){
        this.isCollapsed = !this.isCollapsed  
      }
    }
	}
</script>

<style lang="scss" scoped>
  .page-home {
    display: flex;
    width: 100%;
    height: 100%;
    background: rgb(240, 243, 244);
    .home-side-bar{
      background-color:rgb(0,0,43);
      border-right: 1px solid rgb(0,0,43);
      z-index: 2;
    }
    .my-page-list{
      flex: 1;
      height: 100%;
      overflow: hidden;
      .sub-page{
        height: 100%;
      }
    }
  }

</style>
