import Homepage from 'components/homepage/homepage'
import Login from 'views/login/login'
import Register from 'views/register/register'
import ProjectSetting from 'components/projectsetting/projectsetting'
import Preview from 'components/preview/preview'
import Test from 'views/test/test'
export let routers = [
    {
        path: '/',
        redirect: '/homepage',
        meta:{
            requiresAuth:true
        }
    },
    {
        name:'homepage',
        path: '/homepage',
        component: Homepage,
        meta:{
            requiresAuth:true
        },
        children:[
            {
                name:'projectsetting',
                path:'/projectsetting',
                component: ProjectSetting
            }
        ]
    },
    {
        name:'login',
        path:'/login',
        component:Login
    },
    {
        name:'register',
        path:'/register',
        component:Register
    },
    {
        name:'preview',
        path:'/preview',
        component:Preview
    },
    {
        name:'test',
        path:'/test',
        component:Test
    }
]