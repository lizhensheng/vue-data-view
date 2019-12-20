import Baseform from './baseform'
import Scrollform from './scrollform'
import Simpletext from './simpletext'
import Tabs from "./tabs"
import TabPane from './tabpane'
import NavbarCollapse from './navbarcollapse'
import Tree from './tree'
const components = [
    Baseform,
    Scrollform,
    Simpletext,
    Tabs,
    TabPane,
    NavbarCollapse,
    Tree
]
const install = function (Vue){
    if(install.installed) return
    install.installed = true
    components.map(component => Vue.component(component.name,component))
}
if(typeof window !== 'undefined' && window.Vue){
    install(window.Vue)
}
export default {
    install,
    Baseform,
    Scrollform,
    Simpletext,
    Tabs,
    TabPane,
    NavbarCollapse,
    Tree
}