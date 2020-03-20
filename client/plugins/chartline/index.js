import Component from './src/chartline'
Component.install = Vue => {
	Vue.component(Component.name, Component)
}
export default Component