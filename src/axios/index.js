import {loginStore} from "@/store";
import pinia from "@/store";
import {ElMessage} from "element-plus";
import axios from "axios";

//注：在非.vue文件中使用pinia的状态时，要传入pinia实例作为参数
const loginState = loginStore(pinia);

//创建应对不同服务的axios实例
const userAxios = axios.create();
const fileAxios = axios.create();
const paperScholarAxios = axios.create();
const messageAxios = axios.create();
const applyAxios = axios.create();
const helpAxios = axios.create();
const testAxios = axios.create();
function initialInstance (instance, ip, port){
    //设置默认url
    instance.defaults.baseURL =  'http://' + ip + ':' + port + '/api/';
    // 添加响应拦截器
    instance.interceptors.response.use(null, function (error) {
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
}
// 重新设置header头，在初始化和token变化时调用
function setHeaderAuth (token) {
    userAxios.defaults.headers.common['Authorization'] = token;
    messageAxios.defaults.headers.common['Authorization'] = token;
    applyAxios.defaults.headers.common['Authorization'] = token;
    helpAxios.defaults.headers.common['Authorization'] = token;
    paperScholarAxios.defaults.headers.common['Authorization'] = token;
    fileAxios.defaults.headers.common['Authorization'] = token;
    testAxios.defaults.headers.common['Authorization'] = token;
}
const ip = "0.0.0.0";
initialInstance(userAxios, ip, 8889);
initialInstance(messageAxios, ip, 8890);
initialInstance(applyAxios, ip, 8891);
initialInstance(helpAxios, ip, 8892);
initialInstance(paperScholarAxios, ip, 8893);
initialInstance(fileAxios, ip, 8894);
initialInstance(testAxios, '0.0.0.0', 8889);
setHeaderAuth(loginState.token);

export {userAxios, fileAxios, paperScholarAxios, messageAxios, applyAxios, helpAxios, testAxios, setHeaderAuth};