import Component from './src/chartcolumnar'
Component.install = Vue => {
	Vue.component(Component.name, Component)
}
export default Component