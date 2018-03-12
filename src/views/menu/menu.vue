<template>
  <div class="menu-form">
      <el-form :model="form" status-icon ref="form" :rules="rules" label-width="80px">
        <el-form-item label="父级菜单" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择,0表示顶级菜单">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="url">
          <el-input type="text" v-model="form.url" auto-complete="off"></el-input>
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
  name: 'menu-form',
  props: ['isCreate'],
  computed: {
    resetName: action.resetName
  },
  data() {
    return {
      formLabelWidth: '120px',
      form: {
        pid: '',
        name: '',
        url: ''
      },
      options: data.table.tables['/api/v1/cms/menu'],
      rules: {
        pid: [
          { validator: validator.validatePid, trigger: 'blur' }
        ],
        name: [
          { validator: validator.validateName, trigger: 'blur' }
        ],
        url: [
          { validator: validator.validateUrl, trigger: 'blur' }
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
      if (url === '/api/v1/cms/menu')
        this.form = data.table.selects['/api/v1/cms/menu'][0]
    })
    //初始化
    if (!this.isCreate) this.form = data.table.selects['/api/v1/cms/menu'][0]
  }
}
</script>

<style  lang="scss">
</style>