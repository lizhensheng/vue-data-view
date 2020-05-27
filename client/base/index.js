import YDialog from './dialog'
import YSelect from './select'
import YInput from './input'
import YButton from './button'
import YTabs from './tabs'
import YTabPanel from './tabpanel'
import YCollapse from './collapse'
import YCollapseItem from './collapseitem'
import YRange from './range'
import YFormItem from './formitem'
import YInputNumber from './inputnumber'
import YTable from './table'
import YTableColumn from './tablecolumn'
import YCheckbox from './checkbox'
import YDate from './date'
import YColor from './color'
import MessageBox from './messagebox'
const components = [
    YDialog,
    YSelect,
    YInput,
    YButton,
    YTabs,
    YTabPanel,
    YCollapse,
    YCollapseItem,
    YRange,
    YFormItem,
    YInputNumber,
    YTable,
    YTableColumn,
    YCheckbox,
    YDate,
    YColor
]
const install = function (Vue){
    if(install.installed) return
    install.installed = true
    components.map(component => Vue.component(component.name,component))

    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
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
    YRange,
    YFormItem,
    YInputNumber,
    YTable,
    YTableColumn,
    YCheckbox,
    YDate,
    YColor
}