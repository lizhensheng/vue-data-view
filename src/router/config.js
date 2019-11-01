import Homepage from 'components/homepage/homepage'
import Bar from 'components/chart/bar/bar'
import Line from 'components/chart/line/line'
import Preview from 'components/chart/preview/preview'
import Login from 'views/login/login'
import Register from 'views/register/register'
import ProjectSetting from 'components/projectsetting/projectsetting'
import EchartDemo from 'components/page/echartdemo'
import Index from 'components/page/index'
export let routers = [
    {
        path: '/',
        redirect: '/homepage',
        meta:{
            requiresAuth:true
        }
    },
    {
        path:'/test',
        component:EchartDemo
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
            },
            {
                path:'/chart/line',
                component:Line
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
    },
    {
        path:'/preview',
        component:Index
    }
]