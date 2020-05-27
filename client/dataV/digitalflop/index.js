import Component from './src/digitalflop'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component
