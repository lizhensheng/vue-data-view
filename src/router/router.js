import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Homepage from 'components/homepage/homepage'
import Statistic from 'components/statistic/statistic'
import Grantland from 'components/statistics/grantland/grantland'
import Keyindustry from 'components/statistics/keyindustry/keyindustry'
import Landclass from 'components/statistics/landclass/landclass'
import Landsupply from 'components/statistics/landsupply/landsupply'
import Idleland from 'components/statistics/idleland/idleland'
import Line from 'components/chart/line/line'
import Bar from 'components/chart/bar/bar'
import Pie from 'components/chart/pie/pie'
import Preview from 'components/chart/preview/preview'
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/homepage'
        },
        {
            path: '/homepage',
            component: Homepage
        },
        {
            path: '/statistic',
            component: Statistic
        },
        {
            path:'/statistic/grantland',
            component:Grantland
        },
        {
            path:'/statistic/keyindustry',
            component:Keyindustry
        },
        {
            path:'/statistic/landclass',
            component:Landclass
        },
        {
            path:'/statistic/landsupply',
            component:Landsupply
        },
        {
            path:'/statistic/idleland',
            component:Idleland
        },
        {
            path:'/chart/line',
            component:Line
        },
        {
            path:'/chart/bar',
            component:Bar,
            children:[
                {
                    path:'/chart/preview',
                    component:Preview
                }
            ]
        },
        {
            path:'/chart/pie',
            component:Pie
        }
    ]
})
