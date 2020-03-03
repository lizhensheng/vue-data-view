import YDialog from './dialog'
import YSelect from './select'
import YInput from './input'
import YButton from './button'
const components = [
    YDialog,
    YSelect,
    YInput,
    YButton
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
    YButton
}