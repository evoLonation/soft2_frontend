import {createRouter, createWebHashHistory} from "vue-router"

const routes = [
    {
        path: "/",
        redirect: 'Home'
    },

    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/home/HomePage')
    },
    {
        path: '/paper/:paperId',
        name: "paper",
        component: () => import('../views/paper/paperHome')
    },
    {
        path: '/scholar/:scholarId',
        name: "scholar",
        component: () => import('../views/scholar/ScholarHome')
    },
    {
        path: '/scholar/testChart',
        name: "chart",
        component: () => import('../views/scholar/TestNewEchart')
    }
];

const router = createRouter({
    //采用hash 模式
    history: createWebHashHistory(),
    routes, //使用上方定义的路由配置
});

export default router
