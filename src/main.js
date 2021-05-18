import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import store from './store'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// markdown 解析编辑工具
Vue.use(mavonEditor)

// 导入全局样式
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

// 远程后台地址
axios.defaults.baseURL = 'http://localhost:8081/'

axios.interceptors.request.use((config) => {
    if (window.localStorage.getItem('token')) {
        config.headers.t = window.localStorage.getItem('token')
    }
    return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

document.title = '人人投票'

Vue.filter('dateFormat', function(orginVal) {
    const dt = new Date(orginVal)

    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')

    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
