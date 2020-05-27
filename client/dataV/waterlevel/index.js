import Component from './src/waterlevel'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component