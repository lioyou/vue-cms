<template>
  <div class="category-form">
    <el-form :model="form" status-icon ref="form" :rules="rules" label-width="100px">
      <el-form-item label="父级类别" prop="pid">
        <el-select v-model="form.pid" placeholder="请选择">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input type="text" v-model="form.name" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="级别" prop="level">
        <el-input type="text" v-model="form.level" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input type="text" v-model="form.icon" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="别名" prop="alias">
        <el-input type="text" v-model="form.alias" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="text" v-model="form.description" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-radio v-model="form.type" :label="1">普通</el-radio>
        <el-radio v-model="form.type" :label="2">热门</el-radio>
      </el-form-item>
      <el-form-item label="所属系统" prop="systemId">
        <el-select v-model="form.systemId" placeholder="请选择">
          <el-option v-for="item in systems" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
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
import { Dialog, Form, FormItem, Select, Input, Option, Button, Radio } from 'element-ui'

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
Vue.use(Radio)

export default {
  name: 'category-form',
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
        level: '',
        description: '',
        icon: '',
        type: 1,
        alias: '',
        systemId: '',
      },
      options: data.table.tables['/api/v1/cms/category'],
      systems: data.table.tables['/api/v1/cms/system'],
      rules: {
        pid: [
          { validator: validator.validatePid, trigger: 'blur' }
        ],
        name: [
          { validator: validator.validateName, trigger: 'blur' }
        ],
        level: [
          { validator: validator.validateLevel, trigger: 'blur' }
        ],
        description: [
          { validator: validator.validateDescription, trigger: 'blur' }
        ],
        type: [
          { validator: validator.validateType, trigger: 'blur' }
        ],
        alias: [
          { validator: validator.validateAlias, trigger: 'blur' }
        ],
        systemId: [
          { validator: validator.validateSystemId, trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    submitForm: action.submitForm,
    resetForm: action.resetForm
  },
  created() {
    let systemTable = data.table.tables['/api/v1/cms/system'];
    if('undefined' === typeof(systemTable)){
      request.get('/api/v1/cms/system/get').then((response) => {
        data.table.tables['/api/v1/cms/system'] = response.data.data.content
        this.systems = response.data.data.content
      }).catch(function (err) {
        alert(err)
      })
    }
    
    bus.$on('updateRow', (url) => {
      if (url === '/api/v1/cms/category')
        this.form = data.table.selects['/api/v1/cms/category'][0]
    })
    //初始化
    if (!this.isCreate) this.form = data.table.selects['/api/v1/cms/category'][0]
  }

}
</script>

<style  lang="scss">
</style>