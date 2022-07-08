import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import El from 'element-plus';
import 'element-plus/dist/index.css'
createApp(App).use(Antd).use(El).mount('#app')
