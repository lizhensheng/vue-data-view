<template>
    <div class="page data-create">
        <div class="project-group_wrap">
            <ul class="project-group_names">
                <li class="project-group_name active-group_name">
                    <i class="el-icon-truck"></i>
                    <div class="ibox project-group_title">数据源管理</div>
                </li>
            </ul>
        </div>
         <div class="project-list_wrap">
             <div class="project-list_header">
                 <div class="project-list_addBtns" @click="onAddClick">
                     <i class="el-icon-plus"></i>
                     <div class="project-list_addBtn">添加数据</div>
                 </div>
                 <div class="project-list_orderby">
                     <div class="project-list_orderby_time">
                         <el-tooltip  placement="bottom" popper-class="orderby-time_menu" :offset="25">
                             <div slot="content">
                                 <div class="project-list_order_detail">
                                     <div>按名称排序</div>
                                     <div>按创建时间排序</div>
                                     <div>按修改时间排序</div>
                                 </div>
                             </div>
                             <div>
                                 <div class="ibox">按修改时间排序</div>
                                 <i class="el-icon-arrow-down"></i>
                             </div>
                         </el-tooltip>
                     </div>
                 </div>
             </div>
            <div class="project-list_body">
               <div class="project-list_main_storage" v-for="item in datasourceList" :key="item._id">
                   <div class="project-list_storage_type">
                       <div class="storage_type_wrapper">
                            <i class="el-icon-document storage_type"></i>
                            <div>{{item.dbtype.length > 3 ? item.dbtype.substr(0,3) : item.dbtype}}</div>
                       </div>
                       <span class="title font-size-12">{{item.dbtype}}</span>
                   </div>
                   <div class="project-list_storage_operate">
                       <i class="el-icon-edit" @click="onEditData" :data-id="item._id"></i>
                       <i class="el-icon-delete" @click="onDeleteData" :data-id="item._id"></i>
                   </div>
                   <div class="project-list_storage_info">
                       <div class="info-name">{{item.dbconnectionname}}</div>
                       <div class="info-time">{{item.dbcreatetime | todate}}</div>
                   </div>
               </div>
            </div>
         </div>
         <!--新增数据源弹出框-->
          <y-dialog title="添加数据" :isShow="showAddDialog" @close="onCloseDialog">
                    <div class="project-list_dataconfig">
                        <div class="marginB10"><span class="red">*</span>类型</div>
                        <div class="marginB10">
                            <y-select :options="dbTypeOtions" v-model="dbTypeDefaultVal"></y-select>
                        </div>
                        <div class="marginB10"><span class="red">*</span>名称</div>
                        <div class="marginB10">
                            <y-input v-model="txtNameVal"></y-input>
                        </div>
                        <div class="marginB10"><span class="red">*</span>域名</div>
                        <div class="marginB10">
                            <y-input v-model="txtHostVal"></y-input>
                        </div>
                        <div class="marginB10"><span class="red">*</span>用户名</div>
                        <div class="marginB10">
                            <y-input v-model="txtUserNameVal"></y-input>
                        </div>
                        <div class="marginB10"><span class="red">*</span>密码</div>
                        <div class="marginB10">
                            <y-input v-model="txtPasswordVal" type="password"></y-input>
                        </div>
                        <div class="marginB10"><span class="red">*</span>Service Name</div>
                        <div class="marginB10">
                            <y-input v-model="txtServiceNameVal"></y-input>
                        </div>
                        <div class="project-list_confirm marginT20">
                            <y-button text="测试连接" 
                                      :width="150" 
                                      :showIcon="false" 
                                      @click="onTest" 
                                      :hollow="true" 
                                      popper="marginR20"
                            ></y-button>
                            <y-button text="确定" :width="150" :showIcon="false" @click="onConfirm"></y-button>
                        </div>
                    </div>
            </y-dialog>
    </div>
</template>

<script>
  export default {
    data() {
        return {
            showAddDialog: false,
            dbTypeOtions: [{
                value: 'ORACLE',
                label: 'ORACLE'
                }, {
                value: 'MYSQL',
                label: 'MYSQL'
                }],
            dbTypeDefaultVal: 'ORACLE',
            txtNameVal:'',
            txtHostVal:'',
            txtUserNameVal:'',
            txtPasswordVal:'',
            txtServiceNameVal:'',
            datasourceList: [],
            actionType: 'add'
        }
    },
    mounted(){
        this.initData()
    },
    methods:{
        initData(){
            this.$axios.post('/connection/all')
            .then((res) => {
                if(res.code === 200){
                    this.datasourceList = res.body
                }
            })
            .catch((e) => {
                console.warn(e.message)
            })
        },
        onTest(){
            let data = {
                dbtype: this.dbTypeDefaultVal,
                dbhost: this.txtHostVal,
                dbservername: this.txtServiceNameVal,
                dbusername: this.txtUserNameVal,
                dbpassword: this.txtPasswordVal
            }
            this.$axios.post('/connection/testConnection', data)
            .then((res)=>{
                if(res.code === 200){
                    this.$msgbox({
                        title: '提示',
                        message: res.body,
                        iconClass: 'el-icon-success'
                    })
                }
            })
            .catch((e) => {
                console.warn(e.message)
            })
        },
        onEditData(e){
            this.actionType = 'edit'
            let _id = e.target.dataset.id
            this.editId = _id
            let info = null
            info = this.datasourceList.filter((item) => {
                return item._id === _id
            })
            if(info && info.length>0){
                this.dbTypeDefaultVal = info[0].dbtype
                this.txtNameVal = info[0].dbconnectionname
                this.txtHostVal = info[0].dbhost
                this.txtUserNameVal = info[0].dbusername
                this.txtPasswordVal = info[0].dbpassword
                this.txtServiceNameVal = info[0].dbservername
                this.showAddDialog = true
            }
        },
        onDeleteData(e){
            this.$confirm( '确定删除?', '提示', {
                iconClass: 'el-icon-warning',
                callback: (res)=>{
                    if(res.action === 'confirm'){
                        let _id = e.target.dataset.id
                        this.$axios.post('/connection/delete/' + e.target.dataset.id)
                        .then((res) => {
                            if(res.code === 200){
                                let dIndex = this.datasourceList.findIndex(t => t._id === _id)
                                this.datasourceList.splice(dIndex,1)
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
        onAddClick(){
            this.actionType = 'add'
            this.showAddDialog = true
        },
        onCloseDialog(){
            this.showAddDialog = false
        },
        onConfirm(){
            let data = {
                    dbconnectionname: this.txtNameVal,
                    dbtype: this.dbTypeDefaultVal,
                    dbhost: this.txtHostVal,
                    dbservername: this.txtServiceNameVal,
                    dbusername: this.txtUserNameVal,
                    dbpassword: this.txtPasswordVal
            }
            if(this.actionType == 'add'){
                this.$axios.post('/connection/add', data)
                .then((res) => {
                    if(res.code === 200){
                        this.datasourceList.push(res.body)
                        this.showAddDialog = false
                        this.$msgbox({
                            title: '提示',
                            message: '添加成功',
                            iconClass: 'el-icon-success'
                        })
                    }
                })
                .catch((e)=>{
                    console.warn(e.message)
                })
            }
            else {
                this.$axios.post('/connection/update/' + this.editId, data)
                .then((res) => {
                    if(res.code === 200){
                        let dIndex = this.getIndex(this.editId)
                        let item = Object.assign({}, this.datasourceList[dIndex], data)
                        this.$set(this.datasourceList, dIndex, item)
                        this.showAddDialog = false
                        this.$msgbox({
                            title: '提示',
                            message: '更新成功',
                            iconClass: 'el-icon-success'
                        })
                    }
                })
                .catch((e)=>{
                    console.warn(e.message)
                })
            }
        }
    }
  }
</script>

<style lang="stylus">
    /**
        *  菜单项 tooltips提示框的背景颜色  
        **/
    .el-tooltip__popper{
        &.orderby-time_menu{
             padding:0px;
             top: 130px !important;
             .project-list_order_detail{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 125px;
                height: 88px;
                div{
                    cursor: pointer;
                    width:100%;
                    flex: 1;
                    background: rgb(38,44,51);
                    text-align: left;
                    line-height:30px;
                    padding:0 10px;
                    border-bottom: 2px solid rgb(26,28,30);
                    &:hover{
                        background: rgb(26,27,29);
                        border-left: 2px solid rgb(36,131,255);
                    }
                }
            }
        }
    }
    .data-create{
        display: flex;
        flex-direction: row;
        width:100%;
        background: rgb(23,27,34);
        overflow: hidden;
        padding-top: 40px;
        /**
        *   数据源
        **/
        .project-group_wrap{
            display: flex;
            flex-direction: column;
            width: 228px;
            height: 100%;
            overflow: hidden;
            font-size: 13px;
            .project-group_names{
                .project-group_name{
                    display:flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    height: 35px;
                    color: rgb(149,160,171);
                    .project-group_title{
                        margin-left: 5px;
                        white-space : nowrap;
                        font-size: 15px;
                    }
                    .el-icon-truck{
                        font-size: 24px;
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
            margin-left: 60px;
            /**
            *   项目配额信息
            **/
            .project-list_header{
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 100%;
                height: 50px;
                color: rgb(179,194,207);
                font-size: 13px;
                .project-list_addBtns{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 32px;
                    width: 128px;
                    background: rgb(38,129,255);
                    color: #fff;
                    cursor: pointer;
                    transform: skewX(-45deg);
                    .project-list_addBtn,i{
                        transform: skewX(45deg);
                    }
                    i{
                        margin-right:3px;
                        font-size: 12px;
                    }
                }
                .project-list_orderby{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    align-items: center;
                    height: 32px;
                    width: 100%;
                    border: 1px solid;
                    border-color:#3a4659 transparent transparent #3a4659;
                    transform: skewX(-45deg);
                    margin-left: 20px;
                    .project-list_orderby_time{
                        transform: skewX(45deg);
                        cursor: pointer;
                        &:hover{
                            color: rgb(36,131,255);
                        }
                        i{
                            padding:0 5px;
                        }
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
                .project-list_main_storage{
                    display: flex;
                    flex-direction: row;
                    position: relative;
                    height: 46px;
                    align-items: center;
                    margin-left:20px;
                    margin-top:10px;
                    &:hover{
                        .project-list_storage_info{
                            background-image: linear-gradient(to left, rgb(28,34,43) , rgb(25,131,189));
                            border: 2px solid rgb(38,129,255);
                            color: #fff;
                        }
                        .project-list_storage_operate{
                            transform: translateX(-150px) skew(-45deg);
                            background-image: linear-gradient(to right, rgb(13,92,250) , rgb(17,62,94));
                        }
                    }
                    .project-list_storage_type{
                        background: rgb(30,35,43);
                        color: rgb(145,152,165);
                        position: relative;
                        display: flex;
                        width: 183px;
                        height: 35px;
                        align-items: center;
                        justify-content: center;
                        transform: skew(-45deg);
                        .storage_type_wrapper{
                            position: relative;
                            transform: skew(45deg);
                            .storage_type{
                                font-size: 30px;
                            }
                            div{
                                position: absolute;
                                top: 10px;
                                left: -3px;
                                color: #000;
                                background: rgb(145,152,165);
                                font-size: 10px;
                                padding:1px 2px;
                                border-radius: 1px;
                                transform: scale(0.7);
                            }
                        }
                        .title{
                            margin-top: 10px;
                            margin-left: 5px;
                            transform: skew(45deg);
                        }
                    }
                    .project-list_storage_operate{
                        position: absolute;
                        left: 170px;
                        top: 5px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 170px;
                        transition: 1s;
                        height: 80%;
                        transform: skew(-45deg);
                        i{
                            color: #fff;
                            transform: skew(45deg);
                            margin-left:20px;
                            cursor: pointer;
                        }
                    }
                    .project-list_storage_info{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 474px;
                        height: 46px;
                        background: rgb(28,34,43);
                        z-index: 100;
                        color: rgb(145,152,165);
                        transform: skew(-45deg);
                        cursor: pointer;
                        border: 1px solid #3a4659;
                        border-left: 3px solid #1894ff;
                        .info-name,.info-time{
                            flex:1;
                            text-align: center;
                            transform: skew(45deg);
                            
                        }
                    }
                }
            }
        }
    }
    /**
    *   确定按钮排列方向
    **/
    .project-list_confirm{
        display: flex;
        justify-content: flex-end;
    }
</style>