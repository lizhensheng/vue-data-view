import Component from './src/range'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component