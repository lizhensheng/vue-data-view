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
export const arrayFindIndex = function(arr, pred){
    for (let i = 0; i !== arr.length; ++i){
        if(pred(arr[i])){
            return i
        }
    }
    return -1
}

export const arrayFind = function(arr, pred){
    const idx = arrayFindIndex(arr,pred)
    return idx !== -1 ? arr[idx] : undefined
}

export const setLocalStorage = (name,content) => {
    if(!name) return
    if(typeof content !== 'string')
    {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name,content)
}

export const getLocalStorage = name => {
    if(!name) return
    let data = window.localStorage.getItem(name)
    
    return data ? JSON.parse(data) : undefined
}

export const removeLocalStorage = name => {
    if(!name) return
    window.localStorage.removeItem(name)
}

export const Cookie = {
    get(name){
        var strCookie = document.cookie
        var arrCookie = strCookie.split("; ")
        for(var i=0;i<arrCookie.length;i++)
        {
            var arr=arrCookie[i].split("=")
            if(arr[0] == name) return arr[1]
        }
        return ""
    },
    set(name,value,expiresDays,domain,path)
    {
        var cookieString = name + '=' + (value?value:'')
        var date=new Date()
        if(domain!=undefined)
            domain = "; domain="+domain
        else
            domain = ''
        
        date.setTime(date.getTime()+(expiresDays||1)*24*3600*1000)
        cookieString = cookieString + domain + "; path="+(path||"/")+"; expires="+date.toGMTString()

        document.cookie = cookieString
    },

    remove(name)
    {
        this.set(name,'',-1)
    }
}

export function dataURItoBlob(dataURI){
    var byteString = atob(dataURI.split(',')[1])
    var mimeString = dateURI.split(',')[0].split(':')[1].split(';')[0]
    var ab=new ArrayBuffer(byteString.length)
    var ia=new Uint8Array(ab)

    for(var i=0;i<byteString.length;i++)
    {
        ia[i]=byteString.charCodeAt(i)
    }

    var blob = new Blob([ab], {type:mimeString})
    return blob
}