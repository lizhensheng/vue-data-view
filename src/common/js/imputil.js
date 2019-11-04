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

export let constructTree = function (nodes,config) {
    const id = config && config.id || 'id'
    const pid = config && config.pid || 'pid'
    const children = config && config.children || 'children'

    const idMap = {}
    const jsonTree = []

    nodes.forEach((v) => { v && (idMap[v[id]] = v) })
    nodes.forEach((v) => {
        if (v) {
            let parent = idMap[v[pid]]
            if (parent) {
                !parent[children] && (parent[children] = [])
                parent[children].push(v)
            } else {
                jsonTree.push(v)
            }
        }
    })

    return jsonTree
}
