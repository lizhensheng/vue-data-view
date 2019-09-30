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
