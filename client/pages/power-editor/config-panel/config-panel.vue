<template>
    <div class="config-panel">
        <config-project v-show="!switchConfig"></config-project>
        <config-component v-show="switchConfig"></config-component>
    </div>
</template>

<script>
import ConfigProject from './config-project/config-project'
import ConfigComponent from './config-component/config-component'
export default {
    data(){
        return {
            switchConfig: false
        }
    },
    components: {
        ConfigProject,
        ConfigComponent
    }
}
</script>

<style lang="stylus" scoped>
.config-panel{
    display: flex;
    width: 332px;
    background: rgb(25,28,33);
    z-index: 333;
}
</style>