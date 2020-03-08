import YDialog from './dialog'
import YSelect from './select'
import YInput from './input'
import YButton from './button'
import YTabs from './tabs'
import YTabPanel from './tabpanel'
import YCollapse from './collapse'
import YCollapseItem from './collapseitem'
import YRange from './range'
const components = [
    YDialog,
    YSelect,
    YInput,
    YButton,
    YTabs,
    YTabPanel,
    YCollapse,
    YCollapseItem,
    YRange
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
    YDialog,
    YSelect,
    YInput,
    YButton,
    YTabs,
    YTabPanel,
    YCollapse,
    YCollapseItem,
    YRange
}