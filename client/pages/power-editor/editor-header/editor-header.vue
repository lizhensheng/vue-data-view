<template>
    <div class="editor-header">
        <div class="header_left dv">
            <div class="ibox header_left_back" @click="onBack"><i class="el-icon-arrow-left"></i>返回</div>
        </div>
        <div class="header_center dv"><i class="el-icon-data-line paddingR10"></i><span class="paddingR5">-</span>{{projectDataInfo.title}}</div>
        <div class="header_right dv">
            <el-tooltip content="保存"><div class="header-icon_wrap save" @click="onSaveProject"><i class="el-icon-check icon"></i></div></el-tooltip>
            <el-tooltip content="预览"><div class="header-icon_wrap preview"><i class="el-icon-data-board icon"></i></div></el-tooltip>
            <el-tooltip content="发布"><div class="header-icon_wrap publish"><i class="el-icon-s-promotion icon"></i></div></el-tooltip>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'EditorHeader',
    data(){
        return { 
        }
    },
    methods:{
        onBack(){
            this.$router.push({
                name: 'projectCreate'
            })
        },
        onSaveProject(){
            let id = this.$route.params.id
            let project = this.projectDataInfo
            if(id){
                this.$axios.post('/project/update/' + id, project).then((res) => {
                    if(res.code === 200){
                        this.$msgbox({
                            title: '提示',
                            message: '更新成功',
                            iconClass: 'el-icon-success'
                        })
                    }
                })
            }   
            else{
                this.$axios.post('/project/add', project).then((res) => {
                    if(res.code === 200){
                        this.$msgbox({
                            title: '提示',
                            message: '保存成功',
                            iconClass: 'el-icon-success'
                        })
                    }
                })
            }
        }
    },
    computed:{
        ...mapState({
            projectDataInfo: state => state.powereditor.projectDataInfo
        })
    }
}
</script>

<style lang="stylus" scoped>
.editor-header{
    display:flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    z-index: 200;
    background: rgb(29,30,31);
    .dv{
        flex: 1;
    }
    .header_left{
        .header_left_back{
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(161,174,179,0.5);
            width: 70px;
            height: 28px;
            color: #fff;
            font-size: 12px;
            cursor: pointer;
        }
    }
    .header_center{
        text-align: center;
        color: rgb(161,174,179);
    }
    .header_right{
         display: flex;
         justify-content: flex-end;
        .header-icon_wrap{
            display: flex;
            width: 40px;
            height: 24px;
            margin: 0px 5px;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            &:hover{
                border: 1px solid rgba(161,174,179,0.6);
            }
            .icon{
                color: #fff;
            }
            &.save{
                background: rgba(161,174,179,0.5);
            }
            &.preview{
                background: rgba(161,174,179,0.3);
            }
            &.publish{
                background: rgba(161,174,179,0.1);
             }
        }
    }
}
</style>