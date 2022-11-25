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
import ElementPlus, {ElMessage} from 'element-plus';
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import {loginStore} from "@/store";

const pinia = createPinia();
pinia.use(piniaPersist);
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app
    .use(ElementPlus)
    // .use(store)
    .use(router)
    .use(VueAxios,axios,Request)
    .use(pinia)
    .mount('#app')


axios.defaults.baseURL = 'http://localhost:8888/api/';
// 添加默认请求配置
axios.defaults.headers.common['Authorization'] = loginStore().token;
// 添加响应拦截器
axios.interceptors.response.use(null, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    const response = error.response;
    if(response.status === 401){
        loginStore().displayLoginWindow = true;
    }else{
        if(response.data.msg !== undefined) {
            ElMessage({message: response.data.msg, type : "warning"});
        }else{
            ElMessage({message: "其他未知错误", type : "warning"});
        }
    }
});

