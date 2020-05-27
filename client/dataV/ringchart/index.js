import Component from './src/ringchart'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component