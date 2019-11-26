<template>
  <div class="login">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登录" name="first">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  @click="submitForm('ruleForm')">登录</el-button>
            <el-button  @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="second">
        <register></register>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import register from 'views/register/register'
import {userLogin} from 'api/user'
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    return {
      activeName: 'first',
      ruleForm: {
        name: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入您的名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      },

    };
  },
  methods: {
    //选项卡切换
    handleClick() {
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userLogin(this.ruleForm).then(({data})=>{
            //账号不存在
            if(data.info === false){
              this.$message({
                type: 'info',
                message: '账号不存在'
              });
              return;
            }
            //账号存在
            if(data.success){
              this.$message({
                type: 'success',
                message: '登录成功'
              });
              let token = data.token
              let username = data.username
              this.$store.dispatch('UserLogin', token)
              this.$store.dispatch('UserName', username)
              this.$router.push('/projectsetting')
            }
          })
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
    },
  },
  components: {
    register
  }
}
</script>
<style lang="stylus">
.login {
  width: 400px;
  margin: 0 auto;
}
.el-tabs__item {
}
.el-tabs__item:hover {
    color: #ddd;
}
.el-tabs__item.is-active {
    color: #ddd;
}
.el-tabs__active-bar {
    background-color: #ddd;
}
</style>