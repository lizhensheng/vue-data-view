import Component from './src/inputnumber'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component