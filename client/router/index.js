import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**  各个模块 */
export default new Router({
	routes: [{
		path: '/',
		name: 'home',
		component: () => import('@/pages/home/index'),
		redirect: { name: 'projectCreate' },
		children: [{
			path: 'project-create',
			name: 'projectCreate',
			component: () => import('@/pages/home/project-create'),
		}, {
			path: 'data-create',
			name: 'dataCreate',
			component: () => import('@/pages/home/data-create'),
		},  {
			path: 'my-template',
			name: 'myTemplate',
			component: () => import('@/pages/home/my-template'),
		}, {
			path: 'page-data',
			name: 'pageData',
			component: () => import('@/pages/home/page-data'),
		}, {
			path: 'page-data-detail',
			name: 'pageDataDetail',
			component: () => import('@/pages/home/page-data-detail'),
		}, {
			path: 'template-list',
			name: 'templateList',
			component: () => import('@/pages/home/template-list'),
		}, {
			path: 'page-list-publish',
			name: 'pageListPublish',
			component: () => import('@/pages/home/page-list-publish'),
		}]
	},{
		path: '/editor',
		name: 'Editor',
		component: () => import('@/pages/editor/index')
	},{
		path: '/power-editor',
		name: 'PowerEditor',
		component: () => import('@/pages/power-editor/power-editor')
	},{
		path: '/mine',
		name: 'Mine',
		component: () => import('@/pages/mine')
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/pages/loginfor'),
		meta: {
			hideHeader: true,
			trust: true,
			noNeedLogin: true
		}
	},{
		path: 'template-create',
		name: 'templateCreate',
		component: () => import('@/pages/home/template-create'),
	}]
})
