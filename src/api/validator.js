//表彰验证器
const validator = {
  validateName: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入名称'));
    } else {
      callback()
    }
  },
  validateCode: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入代号'))
    } else {
      callback()
    }
  },
  validateDescription: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入描述'))
    } else {
      callback()
    }
  },
  validatePid: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请选择父级菜单'));
    } else {
      callback()
    }
  },
  validateName: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入名称'))
    } else {
      callback()
    }
  },
  validateLevel: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入级别'))
    } else {
      callback()
    }
  },
  validateType: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请选择类型'))
    } else {
      callback()
    }
  },
  validateAlias: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入别名'))
    } else {
      callback()
    }
  },
  validateSystemId: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请选择所属系统'))
    } else {
      callback()
    }
  },
  validateUrl: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入路径'))
    } else {
      callback()
    }
  },
  validateTitle: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入名称'));
    } else {
      callback()
    }
  }
}


export default validator