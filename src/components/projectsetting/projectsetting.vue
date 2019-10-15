<template>
    <div class="projectsetting">
        <div class="leftWrapper">
            <el-tabs v-model="activeName">
                <el-tab-pane label="项目管理" name="first">
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </el-tab-pane>
                <el-tab-pane label="控件" name="second">控件</el-tab-pane>
            </el-tabs>
        </div>
        <div class="rightWrapper">
            <div class="css-sqdry3">
                <div class="css-1qkwt59">
                    <el-menu :default-active="menuIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="1" >预览</el-menu-item>
                        <el-menu-item index="2" >代码</el-menu-item>
                    </el-menu>
                    <div class="css-10ro1m">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import './projectsetting.styl'
    export default {
        data() {
            return {
                activeName: 'first',
                menuIndex: "1",
                data: [{
                    label: 'project01',
                    children: [{
                        label: 'index01'
                    },{
                        label: 'index02'
                    },{
                        label: 'index03'
                    }]
                }, {
                    label: 'project02',
                    children: [{
                        label: 'index01'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods:{
            handleNodeClick(){
                let his = this.$router.history.current.fullPath
                if(his !== '/pindex'){
                    this.$router.replace('/pindex')
                }
            },
            handleSelect(){

            }
        }
    }
</script>