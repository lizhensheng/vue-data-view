import Component from './src/formitem'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component