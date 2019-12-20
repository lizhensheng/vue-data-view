export function arrayFindIndex(arr,pred){
    for (let i = 0; i !== arr.length; ++i){
        if(pred(arr[i])){
            return i
        }
    }
    return -1
}