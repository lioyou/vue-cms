<template>
  <div class="topic-form">
      <el-form :model="form" status-icon ref="form" :rules="rules" label-width="100px">
        <el-form-item label="名称" prop="title">
          <el-input type="text" v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="url">
          <el-input type="text" v-model="form.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="text" v-model="form.description" auto-complete="off"></el-input>
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
import { Dialog, Form, FormItem, Input, Button } from 'element-ui'

import request from '@/api/request'
import data from '@/api/data'
import bus from '@/api/bus'
import validator from '@/api/validator'
import action from '@/api/action'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Button)

export default {
  name: 'topic-dialog',
  props: ['isCreate'],
  computed: {
    resetName: action.resetName
  },
  data() {
    return {
      formLabelWidth: '120px',
      form: {
        title: '',
        url: '',
        description: ''
      },
      dialog: data.dialog,
      rules: {
        title: [
          { validator: validator.validateTitle, trigger: 'blur' }
        ],
        url: [
          { validator: validator.validateUrl, trigger: 'blur' }
        ],
        description: [
          { validator: validator.validateDescription, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm: action.submitForm,
    resetForm: action.resetForm
  },
  created() {
    bus.$on('updateRow', (url) => {
      if (url === '/api/v1/cms/topic')
        this.form = data.table.selects['/api/v1/cms/topic'][0]
    })
    //初始化
    if (!this.isCreate) this.form = data.table.selects['/api/v1/cms/topic'][0]
  }
}
</script>

<style  lang="scss">
</style>