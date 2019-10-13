/**
 * js节流
 */
export let debounce = function (fn,delay) {
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