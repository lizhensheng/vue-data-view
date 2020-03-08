<template>
    <div class="page template-create">
        <div class="project-list-header">
            <div class="project-list-cancel" @click="onGoback"><i class="el-icon-arrow-left"></i>取消创建</div>
        </div>
        <div class="project-list_tag_wrap">
            <div class="project-list_tag">PC端</div>
        </div>
        <div class="project-list_body">
            <div class="project-list_item project-list_active">
               <y-button text="创建项目" :width="130" @click="onNewProject"></y-button>
            </div>
            <div class="project-list_item">
                <div class="project_list_item_proimg_wrap">
                    <img src="" class="project_list_item_proimg"/>
                    <div class="project_list_item_operator_wrap">
                        <div class="project_list_item_operator_middle">
                            <div class="project_list_item_edit">创建项目</div>   
                            <div class="project_list_item_preview">预览</div>       
                        </div>
                    </div>
                </div>
                <div class="project_list_item_name_wrap">
                    <div class="project_list_item_left">省市确诊病例分析</div>
                    <div class="project_list_item_right">
                        <div>比例 16：9</div>
                        <div>1920x1080px</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
        methods:{
            onGoback(){
                this.$router.history.go(-1)
            },
            onNewProject(){
                this.$router.push({
                    name: 'PowerEditor'
                })
            }
        }
}
</script>

<style lang="stylus">
    .template-create{
        background: rgb(23,30,42);
        display: flex;
        flex-direction: column;
        .project-list-header{
            display: flex;
            align-items: center;
            width: 100%;
            height: 45px;
            background: rgb(22,29,38);
            border-bottom: 2px solid rgb(31,78,145);
            .project-list-cancel{
                color: #fff;
                font-size: 12px;
                margin-left: 10px;
                cursor: pointer;
                i{
                    margin-right: 8px;
                }
                &:hover{
                    color: rgb(36,131,255);
                }
            }
        }
        .project-list_tag_wrap{
            height: 27px;
            margin-top:39px;
            margin-bottom:10px;
            margin-left:60px;
            .project-list_tag{
                width: 115px;
                height: 27px;
                line-height: 27px;
                text-align: center;
                font-size: 13px;
                background: rgb(38,129,255);
                color: #fff;
            }
        }
        /**
        *   模板列表
        **/
        .project-list_body{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin:0px 50px;    
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
                        .project_list_item_operator_middle{
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            height: 100%;
                            align-items: center;
                            .project_list_item_edit,.project_list_item_preview{
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
                            .project_list_item_preview{
                                background:none;
                                border: 1px solid rgb(38,129,255);
                                &:hover{
                                    background: rgb(38,129,255);
                                    opacity: 1;
                                }
                                margin-top: 10px;
                            }
                        }
                    }
                    
                }
                .project_list_item_name_wrap{
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    color: rgb(172,188,196);
                    background: rgb(29,38,46);
                    height: 50px;
                    align-items: center;
                    font-size: 13px;
                    .project_list_item_left{
                        width:100%;
                        color: rgb(254,254,254);
                        margin-left:10px;
                        overflow : hidden;
                    }
                    .project_list_item_right{
                        width:180px;
                        font-size: 14px;
                        text-align: right;
                        font-family:"youdu" !important;
                        font-style:normal;
                        -webkit-font-smoothing: antialiased;
                        -webkit-text-stroke-width: 0.2px;
                        -moz-osx-font-smoothing: grayscale;
                        color : rgb(108,128,134);
                        margin-right: 10px;
                    }
                }
            }
        }
    }
</style>