<template>
    <div class="page project-create">
        <div class="project-group_wrap">
            <div class="project-group_btns">
                <div class="ibox project-group_label">我的分组</div>
                <i class="el-icon-plus project-group_btn_add"></i>
            </div>
            <ul class="project-group_names">
                <li class="project-group_name active-group_name">
                    <div class="ibox project-group_title">全部大屏</div>
                    <div class="ibox project-group_count">0</div>
                </li>
                <li class="project-group_name">
                    <div class="ibox project-group_title">未分组</div>
                    <div class="ibox project-group_count">0</div>
                </li>
            </ul>
        </div>
        <div class="project-list_wrap">
            <div class="project-list_header">
                <div class="project-list_info">
                    <div class="ibox project-list_title">全部大屏</div>
                    <span class="project-list_nums">1</span><span>个/还可以创建 </span>
                    <span class="project-list_rests">4</span> 个
                    <i class="el-icon-question"></i>
                    <div class="ibox project-list_operator">管理配额</div>
                </div>
                <div class="project-list_search">
                    <input
                        type="text"
                        placeholder="请输入内容"
                        v-model="keywords"
                        class="project-list_search_input"/>
                    <span class="project-list_search_icon"><i class="el-icon-search"></i></span>
                </div>
            </div>
            <div class="project-list_body">
                <div class="project-list_item project-list_active">
                   <y-button text="新建可视化" :width="140" @click="onNewProject"></y-button>
                </div>
                <div class="project-list_item" v-for="item in projectList" :key="item._id">
                    <div class="project_list_item_proimg_wrap">
                        <img :src="item.thumbnailImage" class="project_list_item_proimg"/>
                        <div class="project_list_item_operator_wrap">
                            <div class="project_list_item_operator_top">
                                <i class="el-icon-data-board" @click="onPreview" :data-id="item._id"></i>
                                <i class="el-icon-s-promotion" @click="onPublish" :data-id="item._id" v-show="!item.isPublish"></i>
                            </div>
                            <div class="project_list_item_operator_middle">
                                <div v-show="!item.isPublish" class="project_list_item_edit" @click="onEditProject"  :data-id="item._id">编辑</div>        
                            </div>
                            <div class="project_list_item_operator_bottom">
                                <i class="el-icon-document-copy" @click="onCopyProject" :data-id="item._id"  v-show="!item.isPublish"></i>
                                <i class="el-icon-delete" @click="onDeleteProject"  :data-id="item._id" :data-title="item.title"></i>
                                <i class="el-icon-share" @click="onTemplateCreate"  :data-id="item._id"  v-show="!item.isPublish"></i>
                                <i class="el-icon-link" v-show="item.isPublish" @click="onPublishLink"  :data-id="item._id"></i>
                            </div>
                        </div>
                    </div>
                    <div class="project_list_item_name_wrap">
                        <i class="el-icon-edit"></i>
                        <input type="text" v-model="item.title" class="project_list_item_name" @blur="onProjectNameBlur" :data-id="item._id"/>
                        <span class="project_list_pstatus">{{item.isPublish?'已发布':'未发布'}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
            keywords: "",
            projectList: []
        }
    },
    created(){
        //加载projectlist
        this.initProjectList()
    },
    computed:{
        ...mapState({
            userData: state => state.user.userData
        })
    },
    methods:{
        onNewProject(){
            this.$router.push({name: "templateCreate"})
        },
        initProjectList(){
            this.$axios.get('/project/myProjects').then((res) => {
                if(res.code === 200){
                    this.projectList = res.body
                }
            })
        },
        onProjectNameBlur(e){
            let _id = e.currentTarget.dataset.id
            let arr = this.projectList.filter(t => t._id === _id)
            if(arr.length > 0 && arr[0].title.length > 0){
                this.$axios.post('/project/modifyName/' + _id, {title: arr[0].title}).then((res) => {
                    if(res.code === 200){
                        this.$msgbox({
                            title: '提示',
                            message: '项目名已修改',
                            iconClass: 'el-icon-success'
                        })
                    }
                })
            }
        },
        onEditProject(e){
            let _id = e.currentTarget.dataset.id
            this.$router.push({
                name: 'PowerEditor',
                params: {
                    id: _id
                }
            })
        },
        onDeleteProject(e){
                let _id = e.currentTarget.dataset.id
                let title = e.currentTarget.dataset.title || ''
                this.$confirm(`确定要删除 "${title}" 吗`,'提示', {
                iconClass: 'el-icon-warning',
                callback: (res)=>{
                    if(res.action === 'confirm'){
                            this.$axios.post('/project/delete/' + _id)
                            .then((res) => {
                            if(res.code === 200){
                                    let index = this.projectList.findIndex(t => t._id === _id)
                                    this.projectList.splice(index, 1)
                                    this.$msgbox({
                                        title: '提示',
                                        message: '删除成功',
                                        iconClass: 'el-icon-success'
                                    })
                            }
                        })
                        .catch((e) => {
                            console.warn(e.message)
                        })
                    }
                }
                })
        },
        onTemplateCreate(e){
                let _id = e.currentTarget.dataset.id
                this.$axios.post('/project/setTemplate/'+ _id)
                .then((res)=>{
                    if(res.code ===200){
                        this.$msgbox({
                        title: '提示',
                        message: '已设置为模板',
                        iconClass: 'el-icon-success'
                    })
                    }
                })
        },
        onCopyProject(e){
            let _id = e.currentTarget.dataset.id
            this.$axios.post('/project/copy/' + _id).then((res) => {
                if(res.code === 200){
                    let project = res.body
                    this.projectList.splice(this.projectList.length -1 ,0, project)
                }
            })
        },
        onPreview(e){
                let _id = e.currentTarget.dataset.id
            window.open(`${this.$config.baseURL}/project/view/${_id}`, '_blank')
        },
        onPublish(e){
            let _id = e.currentTarget.dataset.id
            this.$axios.post('/project/publish/' + _id).then((res) => {
                if(res.code === 200){
                    let index = this.projectList.findIndex(t => t._id === _id)
                    let project = this.projectList[index]
                    project.isPublish = true
                    this.projectList.splice(index ,1, project)
                    this.$msgbox({
                        title: '提示',
                        message: '已发布',
                        iconClass: 'el-icon-success'
                    })
                }
            })
        },
        onPublishLink(e){
            console.log(this.userData)
            let _id = e.currentTarget.dataset.id
            let token = this.userData.token
            window.open(`${this.$config.baseURL}/project/verify/${_id}/${token}`, '_blank')
        }
    }
}
</script>

<style lang="stylus" scoped>
    /**
    *   定义缩放的样式
    **/
    @keyframes growthScale {
        from{ transform: scale(1) }
        to{ transform: scale(1.05)}
    }
    .project-create{
        display: flex;
        flex-direction: row;
        width:100%;
        background: rgb(23,27,34);
        overflow: hidden;
        /**
        *   项目分组
        **/
        .project-group_wrap{
            display: flex;
            flex-direction: column;
            width: 228px;
            height: 100%;
            overflow: hidden;
            font-size: 13px;
            .project-group_btns{
                display:flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                height: 54px;
                width: 100%;
                color: rgb(251,251,251);
                .project-group_btn_add{
                    font-size: 16px;
                    margin-right: 30px;
                }
                .project-group_label{
                    width:100%;
                    margin-left: 20px;
                    white-space : nowrap;
                }
            }
            .project-group_names{
                .project-group_name{
                    display:flex;
                    flex-direction: row;
                    align-items: center;
                    height: 35px;
                    color: rgb(149,160,171);
                    .project-group_title{
                        width: 100%;
                        margin-left: 40px;
                        white-space : nowrap;
                        font-size: 12px;
                    }
                    .project-group_count{
                        margin-right: 20px;
                    }
                    &.active-group_name{
                        color: white;
                        background-image: linear-gradient(to right, rgb(13,92,250) , rgb(17,62,94));
                    }
                }
            }
        }
        /**
        *   项目列表
        **/
        .project-list_wrap{
            display: flex;
            flex-direction: column;
            width:100%;
            height: 100%;
            margin-right: 20px;
            margin-left: 10px;
            /**
            *   项目配额信息
            **/
            .project-list_header{
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 100%;
                height: 56px;
                color: rgb(179,194,207);
                font-size: 13px;
                .project-list_info{
                    width:500px;
                    .project-list_title{
                        color: rgb(36,136,230);
                        width: 68px;
                        text-align: center;
                        border-left: 2px solid rgb(32,97,182);
                    }
                    .project-list_nums,.project-list_rests,.el-icon-question,.project-list_operator{
                        color: rgb(36,136,230);
                    }
                    .project-list_nums,.project-list_rests,.el-icon-question{
                        padding:0px 3px;
                    }
                    .project-list_operator{
                        margin-left: 20px;
                    }
                }
                .project-list_search{
                    display: flex;
                    width: 100%;
                    justify-content: flex-end;
                    align-items: center;
                    .project-list_search_input{
                        width: 186px;
                        height: 30px;
                        background: rgb(29,38,42);
                        color: #fff;
                        padding-left:10px;
                    }
                    .project-list_search_icon{
                        background: rgb(29,38,42);
                        height: 30px;
                        line-height: 30px;
                        padding:0px 10px;
                    }
                }
            }
            /**j
            *   项目列表
            **/
            .project-list_body{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;    
                .project-list_item{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background: rgb(17,62,93);
                    color: rgb(165,200,226);
                    height: 180px;
                    width: 235px;
                    border: 2px solid rgb(58,70,89);
                    margin-left: 10px;
                    margin-top: 10px;
                    &.project-list_active{
                        border: 2px solid rgb(25,105,187);
                    }
                    &:hover{
                        border: 2px solid rgb(25,105,187);
                        .project_list_item_proimg_wrap .project_list_item_operator_wrap{
                            opacity: 1;
                        }
                    }
                    /**
                    *   项目创建窗口
                    **/
                    .project-list_new{
                        display: flex;
                        align-items: center;
                        border: 1px solid rgb(25,105,187);
                        border-radius: 10px;
                        padding:15px 35px;
                        cursor: pointer;
                        font-size: 13px;
                        text-align: center;
                        i{
                            font-size: 12px;
                        }
                        &:hover{
                            transform: scale(1.05);
                            width: 160px;
                            font-size: 15px;
                            animation: growthScale 0.3s;
                            background: rgb(25,105,187);
                            color: white;
                        }
                    }
                    /**
                    *   项目信息详细窗口
                    **/
                    .project_list_item_proimg_wrap{
                        position: relative;
                        display: flex;
                        height: 100%;
                        width: 100%;
                        .project_list_item_operator_wrap{
                            background: rgb(5,5,7);
                            position: absolute;
                            width:100%;
                            top: 0;
                            left: 0;
                            bottom: 0;
                            opacity: 0;
                            .project_list_item_operator_top{
                                display: flex;
                                justify-content: flex-end;
                                align-items: center;
                                height: 40px;
                                padding-right:3px;
                                color: rgb(254,254,254);
                                i{
                                    padding:5px 3px;
                                    cursor: pointer;
                                    &:hover{
                                        color: rgb(38,129,255);
                                    }
                                }
                            }
                            .project_list_item_operator_middle{
                                display: flex;
                                justify-content: center;
                                .project_list_item_edit{
                                    width: 115px;
                                    height: 33px;
                                    line-height: 33px;
                                    text-align: center;
                                    background: rgb(38,129,255);
                                    color: #fff;
                                    cursor: pointer;
                                    &:hover{
                                        opacity: 0.8;
                                    }
                                }
                            }
                            .project_list_item_operator_bottom{
                                display: flex;
                                justify-content: center;
                                margin-top:25px;
                                i{
                                    padding:5px 13px;
                                    cursor: pointer;
                                    color: rgb(254,254,254);
                                    &:hover{
                                        color: rgb(38,129,255);
                                    }
                                }
                            }
                        }
                        
                    }
                    .project_list_item_name_wrap{
                        display: flex;
                        flex-direction: row;
                        color: rgb(172,188,196);
                        background: rgb(29,38,46);
                        height: 38px;
                        align-items: center;
                        font-size: 13px;
                        .el-icon-edit{
                            margin-left: 10px;
                            margin-right: 10px;
                        }
                        .project_list_item_name{
                            width:100%;
                            background: none;
                            color: rgb(172,188,196);
                        }
                        .project_list_pstatus{
                            width: 60px;
                            white-space:nowrap;
                            margin-left: 10px;
                            margin-right: 10px;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
</style>