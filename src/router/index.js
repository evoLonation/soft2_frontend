import {createRouter, createWebHashHistory} from "vue-router"
// 文献互助
// help
const helpCenter =  {
    path: 'helpCenter',
    name: 'helpCenter',
    component:() =>import('../views/help/HelpCenter'),
};
const all_help =  {
    path: 'all_help',
    name: 'all_help',
    component:() =>import('../views/help/MyHelp/AllHelp'),
};
const TobeConfirmed_help =  {
    path: 'TobeConfirmed_help',
    name: 'TobeConfirmed_help',
    component:() =>import('../views/help/MyHelp/TobeConfirmed'),
};
const complaint_help =  {
    path: 'complaint_help',
    name: 'complaint_help',
    component:() =>import('../views/help/MyHelp/Complaint'),
};
const success_help =  {
    path: 'success_help',
    name: 'success_help',
    component:() =>import('../views/help/MyHelp/Success'),
};
const failed_help =  {
    path: 'failed_help',
    name: 'failed_help',
    component:() =>import('../views/help/MyHelp/Failed'),
};
const myHelp =  {
    path: 'myHelp',
    name: 'myHelp',
    component:() =>import('../views/help/MyHelp/MyHelp'),
    children: [
        all_help,
        TobeConfirmed_help,
        complaint_help,
        success_help,
        failed_help
    ]
};
// request
const all_request =  {
    path: 'all_request',
    name: 'all_request',
    component:() =>import('../views/help/MyRequest/AllRequest'),
};
const TobeHelp =  {
    path: 'TobeHelp',
    name: 'TobeHelp',
    component:() =>import('../views/help/MyRequest/TobeHelp'),
};
const TobeConfirmed_request =  {
    path: 'TobeConfirmed_request',
    name: 'TobeConfirmed_request',
    component:() =>import('../views/help/MyRequest/TobeConfirmed'),
};
const complaint_request =  {
    path: 'complaint_request',
    name: 'complaint_request',
    component:() =>import('../views/help/MyRequest/Complaint'),
};
const success_request =  {
    path: 'success_request',
    name: 'success_request',
    component:() =>import('../views/help/MyRequest/Success'),
};
const failed_request =  {
    path: 'failed_request',
    name: 'failed_request',
    component:() =>import('../views/help/MyRequest/Failed'),
};
const createRequest =  {
    path: 'createRequest',
    name: 'createRequest',
    component:() =>import('../views/help/MyRequest/CreateRequest'),
};
const myRequest =  {
    path: 'myRequest',
    name: 'myRequest',
    component:() =>import('../views/help/MyRequest/MyRequest'),
    children: [
        all_request,
        TobeHelp,
        TobeConfirmed_request,
        complaint_request,
        success_request,
        failed_request,
        createRequest
    ]
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
