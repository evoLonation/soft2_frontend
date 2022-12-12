import {createPinia} from "pinia/dist/pinia";
import piniaPersist from "pinia-plugin-persist";
import {defineStore} from 'pinia'
import {ElMessage} from "element-plus";
import {checkLoginAxios} from "@/axios";

const pinia = createPinia();
pinia.use(piniaPersist);
export const loginStore = defineStore('main', {
    state: () => ({
            // 所有这些属性都将自动推断其类型
            userId: 0,
            nickname: "",
            token: "",
            displayLoginWindow: false,
            isLogin : false,
            avatarUrl: "",
            // isLogin为true，说明上次登录过没有登出，但是不保证登录没有过期；isLogin为false，保证没有登录
    }),
    actions: {
        // actions里的函数不能是箭头式声明
        login(userId, nickname, token, url)  {
            console.log("login!");
            console.log("url is "+ url);
            this.isLogin = true;
            this.userId = userId;
            this.nickname = nickname;
            this.token = token;
            this.displayLoginWindow = false;
            this.avatarUrl = url;
        },
        logout()  {
            console.log("logout!");
            this.isLogin = false;
            this.userId = null;
            this.nickname = null;
            this.token = null;
            this.avatarUrl = null;
        },
        async checkLogin(){
            checkLoginAxios.defaults.headers.common['Authorization'] = this.token;
            return await checkLoginAxios.post("user/is-login")
                .then(()=>{
                    return true;
                })
                .catch((err) => {
                    console.log("测试登录状态失败！");
                    if (err.response) {
                        let res = err.response;
                        if(res.status === 401){
                            this.logout();
                        }else{
                            ElMessage({message: "其他错误", type: "warning"});
                        }
                    } else if (err.request) {
                        ElMessage({message: "请求没有发出", type: "warning"});
                    } else {
                        ElMessage({message: "其他错误", type: "warning"});
                    }
                    return false;
                });
        },

    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'token',
                storage: localStorage,
                paths: ['token']
            },
            {
                key: 'nickname',
                storage: localStorage,
                paths: ['nickname']
            },
            {
                key: 'userId',
                storage: localStorage,
                paths: ['userId']
            },
            {
                key: 'isLogin',
                storage: localStorage,
                paths: ['isLogin']
            },
            {
                key: 'avatarUrl',
                storage: localStorage,
                paths: ['avatarUrl']
            },
        ]
    },
});

export const paperStore = defineStore('paper', {
    state: () => {
        return {
            paperId: '',
            paperInfo: null,
            paperRelationNet: null,
            scholarCoNet: null,
            scholarCiNet: null,
        }
    }
});

export const navigationStore = defineStore('navigation', {
    state: () =>( {
        isOnTop : false,
        // isOpacity : false,
        // isDisplaySearchBox : true,
    }),
});
export default pinia;

