import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => {
        return {
            // 所有这些属性都将自动推断其类型
            userId: 0,
            nickname: '',
            token: "",
        }
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