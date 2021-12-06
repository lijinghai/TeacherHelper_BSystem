<!--
@Description: 登录页面
@Author: lijinghailjh@163.com
@Date: 2021/3/22
-->
<template>
  <!--  <div class="login" :style="'background-image:url('+ Background +');'">-->
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
      <h3 class="title">
        {{ $t('login.title') }}
      </h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <!--验证码-->
      <!--      <el-form-item prop="code">-->
      <!--        <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%" @keyup.enter.native="handleLogin">-->
      <!--          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />-->
      <!--        </el-input>-->
      <!--        <div class="login-code">-->
      <!--          <img :src="codeUrl" @click="getCode">-->
      <!--        </div>-->
      <!--      </el-form-item>-->
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
        记住我
      </el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div v-if="$store.state.settings.showFooter" id="el-login-footer">
      <span v-html="$store.state.settings.footerTxt" />
      <span> ⋅ </span>
      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">{{ $store.state.settings.caseNumber }}</a>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
// eslint-disable-next-line no-unused-vars
import { validUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from './components/SocialSignin'
// import Background from '@/assets/images/background.jpg'
export default {
  name: 'Login',
  // eslint-disable-next-line vue/no-unused-components
  components: { LangSelect, SocialSign },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      // 设置登录背景图片
      Background: 'https://cdn.jsdelivr.net/gh/Dorian1015/cdn/img/github/122.jpg',
      loginForm: {
        username: 'admin1',
        password: 'password1'
      },
      loginRules: {
        // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        // password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // 获取用户名密码等Cookie
    this.getCookie()
    // token 过期提示
    this.point()
    // window.addEventListener('storage', this.afterQRScan)
    console.log(' __    _         _   _                       __               _')
    console.log('[  |  (_)       (_) (_)                     [  |             (_)')
    console.log(' | |  __        __  __   _ .--.   .--./)     | |--.   ,--.   __')
    console.log(' | | [  |      [  |[  | [ .-. | / /;       | .-. | ``_\ : [  |')
    console.log(' | |  | |    _  | | | |  | | | | \ ._//       | | | | // | |, | |')
    console.log('[___][___]  [ _| |[___][___||__].,__       [___]|__]\-;__/[___]')
    console.log('             ____/             ( ( __))')
    console.log(' ')
    console.log('my Email : lijinghailjh@163.com')
    console.log('my Github: https://github.com/lijinghailjh')
    console.log('( ͡° ͜ʖ ͡°)✧ *************************************************************')
    console.log(' ')
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    getCookie() {
      const username = Cookies.get('username')
      let password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? '' : password
      password = password === undefined ? this.loginForm.password : password
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: ''
      }
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              // this.$message.error('111111111111')
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    point() {
      const point = Cookies.get('point') !== undefined
      if (point) {
        this.$notify({
          title: '提示',
          message: '当前登录状态已过期，请重新登录！',
          type: 'warning',
          duration: 5000
        })
        Cookies.remove('point')
      }
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  background-image: linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 385px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon{
    height: 39px;width: 14px;margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  display: inline-block;
  height: 38px;
  float: right;
  img{
    cursor: pointer;
    vertical-align:middle
  }
}
</style>
