import request from '@/api/request'
import data from '@/api/data'
import bus from '@/api/bus'
import {MessageBox, Message} from 'element-ui'
//表单操作
function Action() {}

Action.prototype = {
  submitForm: function () { //提交表单
    //提交前进行验证
    this.$refs['form'].validate((valid) => {
      let t = this
      if (valid) {//验证通过，提交数据
        request.post(this.$route.path, this.form).then(function (response) {
          if (response.data.status === 'ERROR') { //数据已提交，后端处理存在错误
            let title = response.data.message
            let content = ''
            response.data.data.forEach(element => { //拼接错误
              let tmp = element.field + ':' + element.errorMsg
              content += tmp
            });
            //弹窗提示
            Message({
              message: content,
              type: 'error'
            })
          } else { //操作成功
            t.$emit('hiddenDialog') //关闭Form表单对话框
            //发送刷新列表事件，在cms-table中进行处理
            bus.$emit('flushTable', response.data.data, t.isCreate ? 'create' : 'update')
            t.form = {}  //清空form数据
            t.$refs['form'].clearValidate()  //清除验证状态
          }
        }).catch(function (err) { //网络请求问题，如服务器已经关闭了
          alert('error')
        })
      } else { //验证失败
        return false;
      }
    });
  },
  delete: function(url){ //删除操作，url指资源标识，如api/v1/cms/system
      //使用弹出框进行确认操作
      MessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { //真正执行删除操作
        let deleteArray = []
        data.table.selects[url].forEach(element => { //获取Id
          deleteArray.push(element.id)
        })
        //提交数据
        request.post(url + '/delete', deleteArray).then((response) => {
          if (response.data.status === 'ERROR') { //提交成功，但是操作存在错误
            MessageBox({
              type: 'info',
              message: '删除失败由于' + response.data.message
            });
          } else { //删除成功
            MessageBox({
              type: 'success',
              message: '删除成功!'
            });
            //发送列表更新操作事件，在cms-table中进行处理
            bus.$emit('flushTable', data.table.selects[url], 'delete')
          }
        }).catch((err) => { //网络连接问题
          console.log(err)
        })

      }).catch((err) => { //取消操作
        MessageBox({
          type: 'success',
          message: '已取消删除'
        });
        //清空数据
        data.table.selects[url] = []
        //更新列表，如清除用户的选择
        bus.$emit('flushTable', data.table.selects[url], 'delete')
      });
  },
  resetForm: function() { //重置表单
    this.$refs['form'].resetFields()
  },
  resetName: function(){//返回修改界面按钮名称
    return this.isCreate ? '重置' : '恢复'
  }
}

export default new Action()