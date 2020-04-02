<template>
    <el-tabs>
        <el-tab-pane label="双飞翼布局">
            <div class="main">
                <div class="middle">
                    <div class="middle-inner">中间</div>
                </div>
                <div class="left">左边</div>
                <div class="right">右边</div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="水平垂直居中">
            <div class="box-wrap">
                <div class="box">
                    石小明
                </div>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
    
}
</script>

<style lang="stylus">
.main>div { 
    float:left;
    height: 300px; 
}
.middle { 
    width: 100%;
    background-color: lightgreen 
}
.left { 
   width:200px;
   margin-left:-100%;
   background-color:#b0f9c2 
}
.right { 
   width: 200px;
   margin-left:-200px;
   background-color:pink 
}
.middle-inner{
   margin:0 200px; 
   background-color: burlywood; 
   height:300px;
}
.box-wrap{
    width: 100vw;
    height : 100vh;    
    .box {
        box-sizing: border-box;
        width: 100px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        border: 1px solid lightblue;
        background: lightcyan;

        /**第一种
        */
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -50px;
        margin-top: -25px;

        /**第二种
        */
        // .boy{
        //     display: table-cell;
        //     vertical-align: middle;
        //     text-align: center;
        // }
    }
}
</style>