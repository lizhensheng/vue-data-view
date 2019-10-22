/**
 * js节流
 */
let debounce = function (fn,delay) {
    let timerId
    return function (...args) {
        if(timerId){
            clearTimeout(timerId)
        }
        timerId = setTimeout(()=>{
            fn(...args)
            timerId = null
        },delay)
    }
}
/**
 * 深拷贝对象
 * @param object
 */
let deepCopy = function DeepCopy(object) {
    let resultObject = {};
    for (let obj in object) {
        if (typeof (object[obj]) == "object" && !Array.isArray(object[obj])) {
            let x = {}
            x[obj] = DeepCopy(object[obj])
            Object.assign(resultObject, x);
        } else {
            let x = {};
            x[obj] = object[obj];
            Object.assign(resultObject, x);
        }
    }
    return resultObject;
}

let upperFirstLetter = function(str){
    let first = str.substr(0,1).toUpperCase()
    let last =  str.substr(1)
    return first + last
}
module.exports ={
    debounce,
    deepCopy,
    upperFirstLetter
}