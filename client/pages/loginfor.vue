<template>
    <div class="page loginfor" v-loading="loading">
        <div class="header-logo-wrap">
            <div class="header-logo"></div>
            <div class="header-text">有度信息科技后台管理系统</div>
        </div>
        <div class="body">
            <div class="login-wrap">
                <div class="login-title">-- 系统登录 --</div>
                <div class="login-user">
                    <img src="./user.png" class="login-user-icon"/>  
                    <input type="text" placeholder="请输入用户名" class="login-user-input" maxlength="20" v-model="username">
                    <i class="el-icon-close login-user-delete" @click="onDeleteInput" v-show="isShowDelIcon"></i>
                </div>
                <div class="split"></div>
                
                <div class="login-user">
                    <img src="./password.png" class="login-user-icon"/>  
                    <input type="password" placeholder="请输入密码" class="login-user-input" maxlength="12" v-model="password" @keyup.13="doLogin($event)">
                    <i class="el-icon-close login-user-delete" style="opacity:0;"></i>
                </div>
                <div class="split"></div>
                <div class="login-btn" @click="onLogin">
                    登陆
                </div>
            </div>
            <div class="footer">武汉有度信息科技有限公司 @2020 版权所有</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            username:'',
            password:'',
            loading:false
        }
    },
    methods:{
        doLogin(){

            this.onLogin()
        },
        onLogin(){
            if(this.username === ''){
                this.$message('用户名不能为空')
                return ""
            } else if(this.password === ''){
                this.$message('密码不能为空')
                return ""
            }
            this.loading = true
            this.$axios.post('/auth/login',{username:this.username,password:this.password}).then(res => {
                this.loading = false
                this.getUserInfo();
                this.$store.dispatch('updateUserToken', res.body.token)
                this.$router.push('/');
            })
            .catch(()=>{
                this.loading = false
            })
        },
         /**
         * 删除用户文本框内容
         */
        onDeleteInput(){
            this.username = ''
        },
        /**
         * 获取用户信息
         */
        getUserInfo() {
            this.$axios.get('/user/info').then(res => {
                this.$store.dispatch('updateUserInfo', res.body)
            })
        },
    },
    computed:{
        isShowDelIcon:function(){
            return this.username.length>0
        }
    }
}
</script>

<style lang="stylus">
    .loginfor{
        display:flex;
        flex-direction: column;
        width : 100%;
        height: 100%;
        background-image:url('./login-background.png');
        background-size: 100%;
        .header-logo-wrap{
            width: 100%;
            height: 110px;
            display: flex;
            flex-direction: row;
            align-items: center;
            
            .header-logo{
                background:url('./logo.svg');
                width: 27px;
                height: 27px;
                margin-left: 395px;
                display: inline-block;
            }

            .header-text{
                margin-left: 21px;
                display: inline-block;  
                color: white;
                font-size: 18px;  
            }
        }
        .footer{
            position: absolute;
            width: 100%;
            bottom: 108px;
            color: white;
            font-size: 15px;
            text-align: center;
        }
        .body{
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            position: relative;
            width:100%;
            height: 100%;
        }
        .login-wrap{
            display:flex;
            flex-direction: column;
            width: 361px;
            height: 400px;
            margin-top:159px;
            margin-right: 359px;
            background: #ffffff;
            .login-title{
                width:100%;
                height:77px;
                background-color: rgb(248,248,248);
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                color: rgb(207,207,207);
                margin-bottom: 40px;
            }
            .login-user{
                display:flex;
                alin-align-items: center;
                margin-top: 22px;
                .login-user-icon{
                    width: 22px;
                    height: 18px;
                    margin-left: 35px;
                    margin-right: 10px;
                }
                .login-user-input{
                    border:none;
                    outline:none;
                    box-shadow: none;
                    width: 100%;
                }
                .login-user-delete{
                    width:15px;
                    height: 15px;
                    margin-right: 35px;
                }
            }
            .split{
                margin : 5px 35px 10px 35px;
                border: 1px solid rgb(221,221,221);
            }

            .login-btn{
                width:80%;
                display:flex;
                height: 60px;
                justify-content: center;
                align-items: center;
                background-image:url('./loginbtn.png');
                background-size:100%;
                color:white;
                margin: 20px 38px;
            }
            .login-btn:hover{
                opacity :0.8;
                cursor: pointer;
            }
        }
    }
</style>