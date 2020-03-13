
import { cloneDeep, merge } from "lodash"
import { createUUID } from "../../../../common/uitls"
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

let elementConfig = {
    name: '',
    commonStyle:{
        chartPixel: {
            width: 200,
            height: 200
        },
        chartPosition: {
            x: 0,
            y: 0
        },
        rotate: 0,
        opacity: 1
    }
}

let getProjectConfig = function(){
    let project = cloneDeep(projectConfig)
    let page = getPageConfig()
    project.pages.push(page)
    return project
}

let getElementConfig = function (cfg){
    let element = cloneDeep(elementConfig)
    cfg = cfg ? cloneDeep(cfg) : {}
    let config = {
        uuid: createUUID(),
        ...element
    }
    return merge(config, cfg)
}

let getPageConfig = function(){
    let page = cloneDeep(pageConfig)
    return page
}

let getCommonStyle = function (styleObj, scalingRatio = 1) {
	let style ={}
    style.width = styleObj.chartPixel.width * scalingRatio + 'px'
    style.height = styleObj.chartPixel.height * scalingRatio + 'px'
    style.top = styleObj.chartPosition.y * scalingRatio + 'px'
    style.left = styleObj.chartPosition.x * scalingRatio + 'px'
    style.transform = `rotate(${styleObj.rotate}deg)`
    style.opacity = styleObj.opacity
	return style;
}
export default {
    getProjectConfig,
    getElementConfig,
    getCommonStyle
}