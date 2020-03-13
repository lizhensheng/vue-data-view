<template>
    <div class="page menu" :class="{'menu-list_collapsed' : isCollapsed }" v-loading="loading">
        <div class="menu-logo_wrap">
            <img src="../logo.svg" class="menu-logo"/>
            <div class="menu-title">
                <div class="menu-main_title">有度</div>
                <div class="menu-sub_title">YOU DU</div>
            </div>
        </div>
        <div class="menu-list_wrap">
            <ul class="menu-list_main_wrap">
                <li class="menu-list_main" v-for="item in menuList" :key="item.id" @click="onMenuClick(item.id)">
                    <router-link :to="{path: item.routerPath}" class="menu-list_link">
                        <div class="menu-list_item" :class="{'menu-list_item_active': item.id === activeIndex}"   :data-index="item.id">
                            <el-tooltip placement="right-start" v-if="isCollapsed&&item.children.length>0"  :visible-arrow="false" popper-class="sub-menu">
                                <div slot="content">
                                    <ul class="menu-list-subitem_collapse">
                                        <li class="menu-list-sub"  
                                            v-for="subitem in item.children" 
                                            :key="subitem.id" 
                                            :data-index="subitem.id" 
                                            :class="{'menu-list_item_active': subitem.id === activeSubIndex}"
                                            @click="onSubMenuClick(subitem.id)"
                                        >
                                            {{subitem.name}}
                                        </li>
                                    </ul>
                                </div>
                                <i class="el-icon-s-platform el-icon-lefts" />
                            </el-tooltip>
                            <i class="el-icon-lefts" :class="item.iconClass" v-else/>
                            <div class="menu-list_item_title">{{item.name}}</div>
                            <i class="el-icon-arrow-down el-icon-rights"></i>
                        </div>
                    </router-link>
                    <ul class="menu-list_sub_wrap" v-show="item.id === activeIndex">
                        <li class="menu-list-sub" 
                            v-for="subitem in item.children" 
                            :key="subitem.id" 
                            :data-index="subitem.id"
                            @click="onSubMenuClick(subitem.id)"
                        >
                            <router-link :to="{path: subitem.routerPath}" class="menu-list_link">
                                <div class="menu-list-subitem" :class="{'menu-list_item_subactive': subitem.id === activeSubIndex}">
                                    <div class="menu-list_item_subtitle">{{subitem.name}}</div>
                                </div>
                            </router-link>
                        </li>       
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            loading:false,
            activeIndex: 1,
            activeSubIndex: -1,
            menuList:[]
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
    mounted(){
        this.loading = true;
        this.$axios.get('/menus/info').then(res => {
            this.loading = false;
            if (res.body) {
                this.menuList = res.body
            }
        }).catch(() => {
            this.loading = false;
        })
    },
    methods:{
        onMenuClick(index){
            if(this.activeIndex !== index){
                this.activeIndex = index
            }
        },
        onSubMenuClick(index){
            if(this.activeSubIndex !== index){
                this.activeSubIndex = index
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    /**
    *   定义颜色过渡   
    **/
    @keyframes hoverColor {
        from {color:rgb(121,121,136)}
        to {color:rgb(255,255,255)}
    }
    /**
    *   定义形状过渡 宽度由大变小
    **/
    @keyframes decreaseWidth {
        from {width:217px}
        to {width:60px}
    }
    /**
    *   定义形状过渡 宽度由小变大
    **/
    @keyframes growthWidth {
        from {width:60px}
        to {width:217px}
    }
    .menu{
        width:217px;
        /**
        *  品牌标识logo
        **/
        .menu-logo_wrap{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            height: 35px;
            .menu-logo{
                height: 100%;
                width:34px;
            }
            .menu-title{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 31px;
                color: white;
                margin-left: 10px;
                .menu-main_title{
                    font-size: 25px;
                    font-family:"youdu" !important;
                    font-style:normal;
                    -webkit-font-smoothing: antialiased;
                    -webkit-text-stroke-width: 0.2px;
                    -moz-osx-font-smoothing: grayscale;
                }
                .menu-sub_title{
                    font-size: 8px;
                    font-family:"youdu" !important;
                }
            }
        }
        /**
        *  菜单栏
        **/
        .menu-list_wrap{
            margin-top:10px;
            .menu-list_main_wrap{
                .menu-list_main{
                    display:flex;
                    flex-direction: column;
                    align-items:center;
                    .menu-list_link{
                        width: 100%;
                        display: block;
                    }
                    .menu-list_item{
                        display:flex;
                        flex-direction: row;
                        align-items:center;
                        width:100%;
                        height:50px;
                        line-height: 50px;
                        color: rgb(166,166,181);
                        cursor: pointer;
                        .el-icon-lefts{
                            font-size:16px;
                            margin-left:20px;
                            margin-right:5px;
                            color: rgb(121,121,136);
                        }
                        .el-icon-rights{
                            font-size:10px;
                            font-weight:800;    
                            margin-right:15px;
                            color: rgb(121,121,136);
                        }
                        .menu-list_item_title{
                            width:100%;
                            font-size:14px;
                        }
                        &:hover{
                            .menu-list_item_title{
                                color: white;
                                animation: hoverColor 0.5s;
                            }
                            .el-icon-arrow-down,.el-icon-s-platform{
                                color: white;
                            }
                        }
                        &.menu-list_item_active{
                            .el-icon-lefts,.el-icon-rights,.menu-list_item_title{
                                color: white;
                            }
                        }
                        &.menu-list_item_active:hover{
                            .menu-list_item_title{
                                color: white;
                                animation: none;
                            }
                            .el-icon-lefts,.el-icon-rights,{
                                color: white;
                            }
                        }
                    }
                    .menu-list_sub_wrap{
                        width:100%;
                        .menu-list-sub{
                            .menu-list-subitem{
                                display:flex;
                                flex-direction: row;
                                align-items:center;
                                width:100%;
                                height:50px;
                                line-height: 50px;
                                color: rgb(166,166,181);
                                cursor: pointer;
                                background:rgb(20,20,51);
                                .menu-list_item_subtitle{
                                    font-size: 14px;
                                    padding-left: 48px;
                                }
                                &:hover{
                                    color: white;
                                    animation: hoverColor 0.5s;
                                }
                                &.menu-list_item_subactive{
                                    background: rgb(15,189,160);
                                    color:white;
                                }
                                &.menu-list_item_subactive:hover{
                                    color: white;
                                    animation: none;
                                }
                            }
                        }
                    }
                }
            
            }
        }
        /**
        *  折叠菜单栏
        **/
        &.menu-list_collapsed{
            animation: decreaseWidth 0.5s;
            width:60px;
            .menu-list_item_title,.el-icon-arrow-down,.menu-list_sub_wrap,.menu-title{
                display:none;
            }
            .el-icon-lefts{
                padding-right:15px;
            }
        }
    }
    .menu-list-subitem_collapse{
        .menu-list-sub{
            display:flex;
            flex-direction: column;
            align-items:flex-start;
            width:150px;
            line-height: 40px;
            color: rgb(166,166,181);
            cursor: pointer;
            font-size: 14px;
            text-overflow: clip;
            padding-left:20px;
            &:hover{
                color: white;
                animation: hoverColor 0.5s;
            }
            &.menu-list_item_active{
                background: rgb(15,189,160);
                color:white;
            }
            &.menu-list_item_active:hover{
                color: white;
                animation: none;
            }
        }
    }
</style>