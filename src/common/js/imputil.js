/**
 * 深拷贝对象
 * @param object
 */
export let deepCopy = function (object) {
    let resultObject = {};
    for (let obj in object) {
        if (typeof (object[obj]) == "object" && !Array.isArray(object[obj])) {
            let x = {}
            x[obj] = deepCopy(object[obj])
            Object.assign(resultObject, x);
        } else {
            let x = {};
            x[obj] = object[obj];
            Object.assign(resultObject, x);
        }
    }
    return resultObject;
}
