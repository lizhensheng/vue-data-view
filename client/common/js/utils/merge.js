export default function(target){
    for(let i=1,j=arguments.length;i<j;i++){
        let source=arguments[i]||{}
        for(let prop in source){
            let value = source[prop]
            if(value!==undefined){
                target[prop]=value
            }
        }
    }
    return target
}