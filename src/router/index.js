import {createRouter, createWebHashHistory} from "vue-router"
import zzyRoutes from "@/router/test/zzy";
import wyfRoutes from "@/router/test/wyf";
import gytRoutes from "@/router/test/gyt";
import lyhRoutes from "@/router/test/lyh";
import jxrRoutes from "@/router/test/jxr";
import thrRoutes from "@/router/test/thr";

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

            },
            {
                path: '/paper-search',
                name: 'PaperSearch',

            },
            {
                path: '/scholar-search',
                name: 'ScholarSearch',
            },
            {
                path: '',
                name: '',
            },
            {
                path: '/paper/:paperId',
                name: 'Paper',
            },
            {
                path: '/message',
                name: 'Message',
            },
            {
                path: ''
            },
            {
                path: '/field',
                name: 'Field',
            },
            {

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
            },

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
