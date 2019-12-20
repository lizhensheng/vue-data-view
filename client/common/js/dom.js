export function addClassName(el,className) {
    if(hasClassName(el,className)){
        return
    }
    let arr_class = el.className.split(' ')
    arr_class.push(className)
    el.className = arr_class.join(' ')
}
export function removeClassName(el,className) {
    if(hasClassName(el,className)){
        let arr_class = el.className.split(' ')
        arr_class.splice(arr_class.indexOf(className),1)
        el.className = arr_class
    }
}
export function toggleClassName(el,className) {
    if (hasClassName(el,className)){
        removeClassName(el,className)
    }else{
        addClassName(el,className)
    }
}
export function hasClassName(el,className) {
    let reg = new RegExp('(^|\\s)'+className+'(\\s|$)')
    return reg.test(el.className)
}
let elementStyle = document.createElement('div').style

let vendor = (() => {
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }

    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key
        }
    }

    return false
})()

export function prefixStyle(style) {
    if (vendor === false) {
        return false
    }

    if (vendor === 'standard') {
        return style
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}