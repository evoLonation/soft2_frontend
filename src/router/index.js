import {createRouter, createWebHashHistory} from "vue-router"
import zzyRoutes from "@/router/test/zzy";
import wyfRoutes from "@/router/test/wyf";
import gytRoutes from "@/router/test/gyt";
import lyhRoutes from "@/router/test/lyh";
import jxrRoutes from "@/router/test/jxr";
import thrRoutes from "@/router/test/thr";

const helpCenter = {
    path: "help-center",
    name: "HelpCenter",
    component: () => import('../views/help/HelpCenter'),
}
const myHelp = {
    path: "my-help",
    name: "MyHelp",
    component: () => import('../views/help/MyHelp'),
}
const myRequest = {
    path: "my-request",
    name: "MyRequest",
    component: () => import('../views/help/MyRequest'),
}
const createRequest = {
    path: "create-request",
    name: "CreateRequest",
    component: () => import('../views/help/CreateRequest'),
}
const helpTips = {
    path: "help-tips",
    name: "HelpTips",
    component: () => import('../views/help/HelpTips'),
}


const routes = [
    {
        path: "/",
        redirect: '/home'
    },
    {
        path: "/",
        name: 'User',
        component: () => import('../views/User'),
        children : [
            {
                path: '/home',
                name: 'Home',
                component: () => import('../views/home/HomePage')
            },
            {
                path: '/user-info',
                name: 'UserInfo',
                component: () => import('../views/user/UserInform')
            },
            {
                path: '/paper-search',
                name: 'PaperSearch',
                component: () => import('../views/search/PaperSearch')
            },
            {
                path: '/scholar-search',
                name: 'ScholarSearch',
                component: () => import('../views/search/ScholarSearch')
            },
            {
                path: '/paper/:paperId',
                name: 'Paper',
                component: ()=> import('../views/paper/Paper')
            },
            {
                path: '/message',
                name: 'Message',
                component: ()=> import('../views/message/Message')
            },
            {
                path: '/scholar',
                name: "Scholar",
                component: () => import('../views/scholar/ScholarHome')
            },
            {
                path: '/identify',
                name: "Identify",
                component: () => import('../views/scholar/Identify/MyIdentify')
            },
            {
                path: '/mv-paper',
                name: "MovePaper",
                component: () => import('../views/move/MvPaper')
            },
            {
                path: '/field',
                name: 'Field',
                component: () => import('../views/field/FieldPage')
            },
            {
                path: '/help',
                name: 'Help',
                component: ()=> import('../views/help/Help'),
                children: [
                    helpCenter,
                    myHelp,
                    myRequest,
                    createRequest,
                    helpTips,
                ]
            },
        ],
    },
    {
        path: "/admin",
        name: 'Admin',
        component: () => import('../views/Admin'),
        children : [
            {
                path: 'apply-list',
                name: 'ApplyList',
                component: ()=> import('../views/admin/ApplyList')
            },{
                path: 'complain-list',
                name: 'ComplainList'
            }

        ],
    },
];
const allRoutes = routes.concat(zzyRoutes).concat(wyfRoutes).concat(gytRoutes).concat(lyhRoutes).concat(jxrRoutes).concat(thrRoutes);
console.log(allRoutes);
const router = createRouter({
    //采用hash 模式
    history: createWebHashHistory(),
    routes : allRoutes, //使用上方定义的路由配置
});

export default router;
