import Component from './src/decoration'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component