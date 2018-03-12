<template>
  <div class="login-container">
   <el-form class="login-form" :model="form" status-icon :rules="rules" ref="form"  label-width="85px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from "vue";
import {Form, FormItem, Input, Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import request from '@/api/request'
import data from '@/api/data'
import '../../../static/css/material-design-iconic-font-2.2.0/css/material-design-iconic-font.min.css'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)

export default {
  name: 'cms-login',
  data() {
    var checkUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        pass: '123456',
        checkPass: '123456',
        username: 'leecp'
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ]
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //进行登录验证
          let user = this.form
          request.post(this.$route.path, user).then(response => {
            data.login = true
            this.$router.push('/api/v1/cms/index')
            console.log(response)
          }).catch(function (err) {
            alert('fail')
            console.log(err)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
} 
</script>

<style lang="scss">
body {
  background-color: #00804e;
  .login-container {
    .login-form {
      .el-form-item {
        .el-form-item__content {
          margin-left: auto;
          margin-right: auto;
          .el-button--primary {
            margin-left: 35px;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  width: 500px;
  height: 100%;
  margin: 200px auto 0px auto;
  border: 1px solid black;
  background-color: #00805c;
  .login-form {
    width: 400px;
    margin: 25px auto;
    padding: 15px;
    border: 1px solid gray;
    opacity: 0.85;
    background-color: white; 
  }
}
</style>
