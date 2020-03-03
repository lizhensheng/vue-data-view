import Component from './src/button'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component