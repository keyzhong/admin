<template>
  <div class='login-container'>

    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>

    <!--   表单验证
      1. el-form 配置 model 表单数据对象 =》user
      2. el-from-item 绑定prop属性  prop = mobile => user中对应的属性名
      3. el-form 配置 :rules = formRules -->

      <el-form class='login-form' ref='login-form' :model = 'user'  :rules='formRules'>
        <el-form-item prop='mobile'>
          <el-input prefix-icon="el-icon-mobile-phone" v-model='user.mobile' placeholder='手机号'></el-input>
        </el-form-item>
        <el-form-item prop='code'>
          <el-input prefix-icon="el-icon-key" v-model='user.code' placeholder='验证码'></el-input>
        </el-form-item>
        <el-form-item prop='agree'>
          <el-checkbox v-model='user.agree'> 我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class='login-btn' :loading="loading" type='primary' @click='onLogin'>登录</el-button>
        </el-form-item>
    </el-form>
  </div>

  </div>
</template>

<script type="text/ecmascript-6">
import { login } from '@/api/user.js'

const validateCode = function (rule, value, callback) {
  if (!value) {
    callback(new Error('cuo'))
  } else {
    callback()
  }
}
export default {
  name: 'LoginIndex',
  data () {
    return {
      loading: false,
      user: {
        mobile: '',
        code: '',
        agree: false
      },
      formRules: {
        mobile: [
          { required: true, message: '手机号不能空', triggger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能空', triggger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ],
        agree: [
          { validator: validateCode, message: '请勾选', trigger: 'change' }
        ]
      }
    }
  },
  props: {

  },
  methods: {
    onLogin () {
      // 验证数据
      this.$refs['login-form'].validate(valid => {
        if (!valid) {
          return false
        }
        this.toLogin()
      })
    },

    toLogin () {
      // 获取数据
      const user = this.user
      // 发送请求
      this.loading = true
      login(user).then(res => {
        this.loading = false
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push({ name: 'Home' })
      }).catch(() => {
        this.loading = false
        this.$message.error('登录失败')
      })
      // 处理请求结果
      // 成功->跳转 失败->提示
    }
  },
  components: {

  }
}
</script>

<style scoped lang='less'>
.login-container{
  position: fixed;
  top:0;
  left:0;
  bottom:0;
  right:0;
  display:flex;
  justify-content: center;
  align-items: center;
  background: url('./login_bg.jpg') no-repeat;
  background-size: cover;
  .login-form-wrap{
    min-width: 300px;
    background:#fff;
    padding:30px 50px 20px;
    .login-head{
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      .logo{
        width:200px;
        height:50px;
        background: url('./logo_index.png') no-repeat;
        background-size: contain;
      }
    }
    .login-form{
      .login-btn{
        width:100%;
      }
    }
  }
}
</style>
