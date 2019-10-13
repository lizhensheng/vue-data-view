<template>
    <div class="homepage">
        <div class="panel-wrapper">
            <router-link tag="div" class="tab-item" to="/chart/line"><panel-tool title="line"></panel-tool></router-link>
            <router-link tag="div" class="tab-item" to="/chart/bar"><panel-tool title="bar"></panel-tool></router-link>
            <router-link tag="div" class="tab-item" to="/chart/pie"><panel-tool title="pie"></panel-tool></router-link>
        </div>
        <div class="panel-wrapper">
        </div>
    </div>
</template>

<script>
    import PanelTool from 'base/panel-tool/panel-tool'
    import './homepage.styl'

    export default {
        components:{
            PanelTool
        }
    }
</script>

<style lang="stylus">
</style>