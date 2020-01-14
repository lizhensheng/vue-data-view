const filter={
    booleanToText:function(value){
        return value?'是':'否'
    },
    getLabelText(value,list,label='label'){
        let data=list.find(v=>v.value===value)
        if(data){
            return data[label]
        } else{
            return ''
        }
    }
}

export default filter