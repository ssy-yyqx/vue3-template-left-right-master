import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/style/index.scss'
import './permission'

import * as echarts from 'echarts'
import axios from 'axios'

const app = createApp(App)
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$axios = axios

app.use(store)
app.use(router)
app.use(Antd)
app.mount('#app')
