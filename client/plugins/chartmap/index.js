import Component from './src/chartmap'
Component.install = Vue => {
	Vue.component(Component.name, Component)
}
export default Component