<template>
    <div class="homepage">
        <m-header></m-header>
        <router-view></router-view>
    </div>
</template>

<script>
    import MHeader from 'components/m-header/m-header'
    import './homepage.styl'

    export default {
        components:{
            MHeader
        }
    }
</script>

<style lang="stylus">
</style>