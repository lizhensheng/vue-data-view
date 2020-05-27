import Component from './src/conicalcolumn'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component