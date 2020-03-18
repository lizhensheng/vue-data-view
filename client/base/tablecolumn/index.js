import Component from '../table/src/table-column'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component