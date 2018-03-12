<template>
  <div class="cms-form">
      <el-form :model="form" status-icon ref="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="代号" prop="code">
          <el-input type="text" v-model="form.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="text" v-model.number="form.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">{{resetName}}</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { Dialog, Form, FormItem, Select, Input, Option, Button } from 'element-ui'

import request from '@/api/request'
import data from '@/api/data'
import bus from '@/api/bus'
import validator from '@/api/validator'
import action from '@/api/action'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Input)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Button)

export default {
  name: 'system-form',
  props: ['isCreate'],
  computed: {
    resetName: action.resetName
  },
  data() {
    return {
      formLabelWidth: '120px',
      form: {
        code: '',
        name: '',
        description: ''
      },
      rules: {
        name: [
          { validator: validator.validateName, trigger: 'blur' }
        ],
        code: [
          { validator: validator.validateCode, trigger: 'blur' }
        ],
        description: [
          { validator: validator.validateDescription, trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    submitForm: action.submitForm,
    resetForm: action.resetForm
  },
  created() {
    bus.$on('updateRow', (url) => {
      if (url === '/api/v1/cms/system')
        this.form = data.table.selects['/api/v1/cms/system'][0]
    })
    //初始化
    if (!this.isCreate) {
      this.form = data.table.selects['/api/v1/cms/system'][0]
      }
  }
}
</script>

<style  lang="scss">
</style>