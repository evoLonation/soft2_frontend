import axios from "axios";

//创建应对不同服务的axios实例
const checkLoginAxios = axios.create();
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
}

const ip = "120.46.220.182";
initialInstance(checkLoginAxios, ip, 8889);
initialInstance(userAxios, ip, 8889);
initialInstance(messageAxios, ip, 8890);
initialInstance(applyAxios, ip, 8891);
initialInstance(helpAxios, ip, 8892);
initialInstance(paperScholarAxios, ip, 8893);
initialInstance(fileAxios, ip, 8894);
initialInstance(testAxios, '0.0.0.0', 8889);

export {checkLoginAxios, userAxios, fileAxios, paperScholarAxios, messageAxios, applyAxios, helpAxios, testAxios};

