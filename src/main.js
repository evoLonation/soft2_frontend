/**
 * 请勿随意修改该文件！！！
 * 请勿随意修改该文件！！！
 * 请勿随意修改该文件！！！
 * 如果想要修改请和赵正阳联系
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app
    // .use(ElementPlus)
    // .use(store)
    .use(router)
    .use(VueAxios,axios,Request)
    .mount('#app')
