import Homepage from 'components/homepage/homepage'
import Login from 'views/login/login'
import Register from 'views/register/register'
import ProjectSetting from 'components/projectsetting/projectsetting'
import EchartDemo from 'components/page/echartdemo'
import Preview from 'components/preview/preview'
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
    },
    {
        path:'/preview',
        component:Preview
    }
]