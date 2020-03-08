<template>
    <div class="page panel">
        <div class="panel-header">
            <span class="panel-header_title marginL10">组件列表</span>
        </div>
        <div class="panel-group">
            <y-select :options="dbTypeOtions" v-model="dbTypeDefaultVal"></y-select>
        </div>
        <y-tabs>
            <y-tab-panel iconClass="el-icon-plus" name="me">
                <y-collapse>
                    <y-collapse-item  iconClass="el-icon-plus" name="全部">
                        <div class="panel-controls_wrap">
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                        </div>
                    </y-collapse-item>
                    <y-collapse-item  iconClass="el-icon-plus" name="柱形">
                        <div class="panel-controls_wrap">
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                        </div>
                    </y-collapse-item>
                </y-collapse>
            </y-tab-panel>
            <y-tab-panel iconClass="el-icon-edit" name="you">
                 <y-collapse>
                    <y-collapse-item  iconClass="el-icon-plus" name="全部">
                        <div class="panel-controls_wrap">
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                            <div class="panel-controls_item">
                                <div class="panel-controls_title">水平</div>
                                <img class="panel-controls_img" src=""/>
                            </div>
                        </div>
                    </y-collapse-item>
                </y-collapse>
            </y-tab-panel>
        </y-tabs>
        <div>
            <y-input v-model="defaultVal" placeholder="搜索" suffix-icon="el-icon-search"></y-input>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ComponentPanel',
    data(){
       return {
            dbTypeOtions: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            dbTypeDefaultVal: '选项1',
            defaultVal:"dsfdsddfdgdfdsfds"
       } 
    }
}
</script>

<style lang="stylus">
    .panel{
        z-index: 100;
        color: #bcc9d4;
        font-size: 12px;
        background: rgb(29,33,38);
        display: flex;
        flex-direction: column;
        width: 310px;
        .panel-header{
            display: flex;
            height: 40px;
            align-items: center;
            background: rgb(46,52,60);
            .panel-header_title{
                
            }
        }
        .panel-group{
            padding: 5px;
        }
        .panel-controls_wrap{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 5px;
            width: 100%;
            font-size: 12px;
            .panel-controls_item{
                 display: flex;
                 flex-direction: column;
                 width: 80px;
                 height: 80px;
                 margin-bottom: 6px;
                 background: rgb(24,26,28);
                 cursor: pointer;
                 .panel-controls_img{
                     height: 58px;
                 }
                 .panel-controls_title{
                     display: flex;
                     justify-content: center;
                     align-items: center;
                     height: 22px;
                     
                 }
            }
        }
    }
    .ui-select{
        background: rgb(14,16,19);
    }
</style>