import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

import Homepage from 'components/homepage/homepage'
import Bar from 'components/chart/bar/bar'
import Preview from 'components/chart/preview/preview'
import Login from 'views/login/login'
import Register from 'views/register/register'
import ProjectSetting from 'components/projectsetting/projectsetting'
import Echartdemo from 'components/page/echartdemo'
const router =  new Router({
    routes: [
        {
            path: '/',
            redirect: '/homepage',
            meta:{
                requiresAuth:true
            }
        },
        {
            path:'/test',
            component:Echartdemo
        },
        {
            path: '/homepage',
            component: Homepage,
            meta:{
                requiresAuth:true
            },
            children:[
                {
                    path:'/chart/bar',
                    component:Bar,
                    children:[
                        {
                            path:'/chart/bar/preview',
                            component:Preview
                        }
                    ],
                    meta:{
                        requiresAuth:true
                    }
                },
                {
                    path:'/projectsetting',
                    component: ProjectSetting
                }
            ]
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/register',
            component:Register
        }
    ]
})

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
    //获取store里面的token
    let token = store.state.token;
    //判断要去的路由有没有requiresAuth
    if (to.meta.requiresAuth) {
        if (token) {
            next();
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath } // 将刚刚要去的路由path作为参数，方便登录成功后直接跳转到该路由
            });
        }
    } else {
        next();
    }
});

export default router
