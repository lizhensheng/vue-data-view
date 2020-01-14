<template>
    <div class="component-page-header">
        <div class="logo-wrapper cursor-pointer" @click="$router.push('/')">
                <i class="el-icon-set-up" style="width:40px;height:40px;line-height:40px;text-align:center;"></i>
                <span>数据可视化</span>
        </div>
        <slot></slot>
        <div class="pull-right">
            <userHeaderBar class="maringL30"/>
        </div>
    </div>
</template>

<script>
import userHeaderBar from './user-header-bar'
import {mapState} from 'vuex'
export default {
    name:'page-header',
    components:{
        userHeaderBar
    },
    data(){
        return {

        }
    },
    computed:{
        ...mapState({
            userData:state=>state.user.userData,
            token:state=>state.user.token
        })
    },
    methods:{
        logoutFn(){
            this.$router.push({name:'Login'})
        },
        goLogin(){
            this.$mUtils.Cookie.set('beforeLoginUrl',encodeURIComponent(this.$router.fullPath),1/24/60,window.location.host,window.location.pathname.substring(0,window.loation.pathname.length-1))
            this.$router.push({name:'Login'})
        }
    }
}
</script>