import { defineStore } from 'pinia'

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
})