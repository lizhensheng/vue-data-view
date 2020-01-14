<template>
    <div class="clearfix my-page-list">
        <div class="page-search-wrapper">
            <el-tabs v-model="searchParams.pageMode" @tab-click="handelPageModeClick">
                <el-tab-pane :name="item.value" :disabled="item.disabled" v-for="(item,index) in pageModeList" :key="index">
                    <div slot="label"><span class="nav-tabs-label">{{item.label}}</span></div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="page-content">
            <div class="my-page-nav-list">
                <div class="my-page-nav-list">
                    <ul class="page-item-wrapper">
                        <li class="page-item" v-for="(item,index) in pageList" :key="index">
                            <div class="header-mask">
                                <div class="details-btn" @click="showPreviewFn(item.id)">预览</div>
                            </div>
                            <div class="cover">
                                <img :src="item.coverImage||defaultCoverImage" alt="">
                            </div>
                            <div class="page-item-title border-T">
                                <div class="btn-wrapper">
                                    <el-button type="text" size="mini" @click="deletePage(item._id)">删除</el-button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <notFundData v-if="!pageList.length"/>
         <previewPage v-if="showPreview" :pageId="previewId" @closePreview="showPreview=false"></previewPage>
    </div>
</template>

<script>
import editorProjectConfig from '../editor/DataModel'
import previewPage from './components/preview'
import notFundData from '@client/components/notFundData'
export default {
    components:{
        previewPage,
        notFundData
    },
    data(){
        return {
            loading:false,
            defaultCoverImage: require('@client/common/images/logo.jpg'),
            pageList:[],
            myCount:0,
            shareCount:0,
            previewId:'',
            showPreview:false,
            dialogVisible:false,
            addUserLoading:false,
            userDataList:[],
            pageModeList:[{
                value:'pc',
                label:'PC页面',
                disabled:false
            },{
                value:'h5',
                label:'H5',
                disabled:false
            },{
                value:'longPage',
                label:'长页H5',
                disabled:false
            }],
            addUserForm:{
                id:"",
                userIds:[]
            },
            searchParams:{
                type:'my',
                pageMode:'pc'
            }
        }
    },
    created(){
        this.getPagesList()
        this.getPagesCount()
        this.previewId=this.$route.query.previewId||''
        if(this.previewId)
        {
            this.showPreview=true
        }
    },
    methods:{
        doSearch(type){
            this.searchParams={type}
            this.getPagesList()
        },
        getPagesCount(){
            this.$axios.get('/page/myPublishPages/count',this.searchParams).then(res=>{
                this.myCount=res.body.my
                this.shareCount=res.body.share
            })
        },
        getPagesList(){
            this.$axios.get('/page/myPublishPages',this.searchParams).then(res=>{
                this.pageList=res.body||[]
            })
        },
        deletePage(id,index){
            this.$confirm('此操作将永久删除该页面,是否继续?','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                this.loading=true
                this.$axios.delete('/page/delete/'+id).then(()=>{
                    this.loading=false
                    this.pageList.splice(index,1)
                    this.getPagesCount()
                }).catch(()=>{
                    this.loading=false
                })
            })
        },
        handelPageModeClick(){
            this.getPagesList()
            this.getPagesCount()
        }
    }
}
</script>

<style lang="scss" scoped>

  .my-page-nav-list {
    height: 40px;
    line-height: 40px;
    z-index: 2;
    margin-bottom: 20px;
    .my-page-nav-item {
      float: left;
      padding-right: 32px;
      text-align: center;
      cursor: pointer;
      &.active {
        color: $primary;
      }
      &:hover {
        color: $primary;
      }
    }
  }

  .page-item {
    width: 224px;
    height: 296px;
    border-radius: 4px;
    overflow: hidden;
    float: left;
    margin-bottom: 24px;
    background: white;
    position: relative;
    transition: all 0.28s;
    &:hover {
      box-shadow: 0 0 16px 0 rgba(0, 0, 0, .16);
      transform: translate3d(0, -2px, 0);
      .header-mask {
        opacity: 1;
      }
    }
    .unpublish {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 12px;
      display: block;
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      background-color: #76838f;
      color: #fff;
      border-top-left-radius: 4px;
      border-bottom-right-radius: 12px;
      z-index: 10;
    }
    .header-mask {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      background-color: rgba(0, 0, 0, .8);
      width: 224px;
      height: 224px;
      border-radius: 4px 4px 0 0;
      padding-top: 92px;
      text-align: center;
      transition: top .28s ease, opacity .28s ease, height .28s ease;
      .details-btn {
        display: inline-block;
        width: 120px;
        height: 44px;
        font-size: 18px;
        line-height: 44px;
        border-radius: 22px;
        border: 1px solid #fff;
        color: #fff;
        cursor: pointer;
      }
    }
    .cover {
      width: 224px;
      height: 224px;
      background-size: cover;
      justify-content: center;
      align-items: center;
      display: flex;
      img {
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
      }
    }
    .page-item-title {
      .item-title-i {
        display: inline-block;
        width: 85%;
        font-size: 14px;
        height: 36px;
        line-height: 36px;
        color: #111;
        transition: transform .2s ease;
        background-color: #fff;
        padding: 0 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        float: left;
      }
    }
    .page-item-data-pv {
      width: 100%;
      display: flex;
      .btn-wrapper {
        flex: 1;
        text-align: center;
      }
    }
  }

  .page-item:not(:nth-child(4n+1)) {
    margin-left: calc((100% - 224px * 4) / 3);
  }

  .page-item.create {
    padding: 16px;
    text-align: center;
    .temp-create {
      display: inline-block;
      width: 192px;
      height: 100%;
      border: 1px solid #e6ebed;
      border-radius: 3px;
      margin-bottom: 18px;
      padding-top: 104px;
      transition: all 0.28s;
      cursor: pointer;
      &:hover {
        color: $primary;
        border-color: $primary;
      }
    }
    .null-create {
      display: inline-block;
      width: 192px;
      height: 42px;
      line-height: 42px;
      border: 1px solid #e6ebed;
      transition: all 0.28s;
      cursor: pointer;
      &:hover {
        color: $primary;
        border-color: $primary;
      }
    }
  }

  .full-input-w {
    width: 100%;
  }


  .nav-tabs-label{
    display: inline-block;
    padding: 0 16px;
    height: 60px;
    line-height: 60px;
  }
  .page-search-wrapper{
    padding: 0;
  }
</style>
<style lang="scss">
  .my-page-list{
    .page-search-wrapper{
      .el-tabs__header{
        margin: 0;
      }
      .el-tabs__nav-wrap{
        padding: 0 30px;
      }
    }
  }
</style>
