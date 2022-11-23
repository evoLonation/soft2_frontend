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
        component: () => import('../views/paper/Paper.vue')
    },
    {
        path: '/scholar',
        name: "scholar",
        component: () => import('../views/scholar/ScholarHome')
    },
    {
        path: '/field',
        name: "field",
        component: () => import('../views/field/FieldPage')
    },
    // {
    //     path: '/scholar/testChart',
    //     name: "chart",
    //     component: () => import('../views/scholar/TestNewEchart')
    // },
    {
        path: '/scholar/testPie',
        name: "pie",
        component: () => import('../views/scholar/Pie/TestNewPie')
    },
    {
        path:'/paperSearch',
        name: "paperSearch",
        component: () => import('../views/search/PaperSearch')
    },
    {
        path:'/scholarSearch',
        name: "scholarSearch",
        component: () => import('../views/search/ScholarSearch')
    },
    {
        path:'/userHome',
        name:"userHome",
        component :() => import('../views/user/UserHome')
    },
    {
        path: '/netTest', //开发测试，以后会删
        name: 'net',
        component: () => import('../views/scholar/RelationNet/testNet')
    },
    {
        path:'/testSearch',
        name: 'serach',
        component: () => import('../views/search/testSearch')
    }
];

const router = createRouter({
    //采用hash 模式
    history: createWebHashHistory(),
    routes, //使用上方定义的路由配置
});

export default router
