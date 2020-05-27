import Border from './border'
import Decoration from './decoration'
import Ringchart from './ringchart'
import Capsulechart from './capsulechart'
import Waterlevel from './waterlevel'
import Percentpond from './percentpond'
import Conicalcolumn from './conicalcolumn'
import Digitalflop from './digitalflop'
import ScrollForm from './scrollform'
import RankForm from './rankform'

const components = [
    Border,
    Decoration,
    Ringchart,
    Capsulechart,
    Waterlevel,
    Percentpond,
    Conicalcolumn,
    Digitalflop,
    ScrollForm,
    RankForm
]


// function changeStr(str){
//     //首字母大写
//     return str.charAt(0).toUpperCase() + str.sclice(1)
// }
const install = function(Vue){
    if(install.installed) return
    install.installed = true
    // comps.keys().forEach((filename) => {
    //     let config = comps(filename)
    //     let componentName  = 'D' + changeStr(
    //         filename.replace(/^\.\//, "").replace(/\.\w+$/,"")
    //     )
    //     Vue.component(componentName, config.default || config)
    // })
    components.map(component=>Vue.component(component.name, component))
}

if(typeof window != undefined && window.Vue){
    install(window.Vue)
}

export default {
    install,
    Border,
    Decoration,
    Ringchart,
    Capsulechart,
    Waterlevel,
    Percentpond,
    Conicalcolumn,
    Digitalflop,
    ScrollForm,
    RankForm
}
