<template>
    <div class="m-header">
        <div class="m-logo_wrapper ibox" @click="onCollapsed"><img src='./menu-right.svg' v-if="isCollapsed"/><img src='./menu-left.svg' v-else/></div>
        <div class="right-menu" ref="rightMenu">
            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                <div class="avatar-wrapper">
                    <img src="/img/avatar/avatar_24px_1102729_easyicon.net.png" class="user-avatar">
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/profile/index">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                    </router-link>
                    <a target="_blank" href="#">
                        <el-dropdown-item>Github</el-dropdown-item>
                    </a>
                    <el-dropdown-item divided>
                        <span style="display:block;" @click="logout">退出登陆</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>

    import './header.styl'
    export default {
        name:'mheader',
        data(){
            return {
            }
        },
        props:{
            collapsed:Boolean
        },
        computed:{
            isCollapsed(){
                return this.collapsed
            }
        },
        methods:{
            logout(){
                this.$store.dispatch('doLogout')
                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            },
            onCollapsed(){
                this.$emit('collapsed')
            }
        }
    }
</script>

