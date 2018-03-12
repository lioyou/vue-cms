import Vue from "vue"

//事件总线，用于不同组件之前的通信
export default new Vue({
  name: 'Bus'
})

// 触发组件 A 中的事件
// bus.$emit('id-selected', 1)
// 在组件 B 创建的钩子中监听事件
// bus.$on('id-selected', function (id) {
// })
