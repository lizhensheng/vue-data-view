function objectHasProperty(obj,arr){
    for(let i = 0;i<arr.length;i++){
        if(!obj.hasOwnProperty(arr[i])){
            return false
        }
    }
    return true
}
module.exports = {
    objectHasProperty
}