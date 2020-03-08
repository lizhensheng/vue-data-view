<template>
    <div class="ui-tab-panel" v-show="active">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'YTabPanel',
        componentName: 'YTabPanel',
        data(){
            return {

            }
        },
        props:{
            iconClass: String,
            name: String,
        },
        computed:{
            active(){
                const active = this.$parent.currentName === this.name
                return active
            }
        },
        created(){
        },
        mounted(){
        },
        updated(){
            this.$parent.$emit('tab-nav-update')
        }
    }
</script>