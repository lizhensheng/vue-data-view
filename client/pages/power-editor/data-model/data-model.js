
import { cloneDeep } from "lodash"
//假设一个项目对应一个页面
let projectConfig = {
    screenWidth: 1920,
    screenHeight: 1080,
    title: "",
    backgroundColor: "rgb(14,42,67)",
    backgroundImage: "",
    thumbnailImage: "",
    pages: []
}

let pageConfig = {
    name: '',
    elements: []
}


let getProjectConfig = function(){
    let project = cloneDeep(projectConfig)
    let page = getPageConfig()
    project.pages.push(page)
    return project
}


let getPageConfig = function(){
    let page = cloneDeep(pageConfig)
    return page
}


export default {
    getProjectConfig
}