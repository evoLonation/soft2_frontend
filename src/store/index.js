import { defineStore } from 'pinia'
import {createPinia} from "pinia/dist/pinia";
import piniaPersist from "pinia-plugin-persist";
const pinia = createPinia();
pinia.use(piniaPersist);
export const loginStore = defineStore('main', {
    state: () => {
        return {
            // 所有这些属性都将自动推断其类型
            userId: 0,
            nickname: "",
            token: "",
            displayLoginWindow: false,
            isLogin : false,
        }
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
        ]
    },
})

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
export default pinia;

