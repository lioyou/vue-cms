import axios from 'axios'

//使用axios进行网络请求
function Request () {

}

Request.prototype = {
  get: function (url) {
    return axios.get(url)
  },
  post: function (url, data) {
    return axios.post(url, data)
  },
  all: function (requests) {
    return axios.all(requests)
  },
  request: function (config) {
    return axios(config)
  }
}

export default new Request()
