import {createRouter, createWebHashHistory} from "vue-router"
// 文献互助
const helpCenter =  {
    path: 'helpCenter',
    name: 'helpCenter',
    component:() =>import('../views/help/HelpCenter'),
};
const myHelp =  {
    path: 'myHelp',
    name: 'myHelp',
    component:() =>import('../views/help/MyHelp'),
};
const myRequest =  {
    path: 'myRequest',
    name: 'myRequest',
    component:() =>import('../views/help/MyRequest'),
};
const helpTips =  {
    path: 'helpTips',
    name: 'helpTips',
    component:() =>import('../views/help/HelpTips'),
};
const help =  {
    path: '/help',
    name: 'help',
    component:() =>import('../views/help/Help'),
    children: [
        myHelp,
        myRequest,
        helpTips,
        helpCenter,
    ]
};

const routes = [
    help,
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
        path: '/helpl',
        name: 'helpl',
        component: () => import('../views/help/Help')
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
    },
    {
        path: '/scholar/testPie',
        name: "pie",
        component: () => import('../views/scholar/TestNewPie')
    }
];

const router = createRouter({
    //采用hash 模式
    history: createWebHashHistory(),
    routes, //使用上方定义的路由配置
});

export default router
