import moment  from 'moment'
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
    },
    todate(value){
        return moment(value).format('YYYY/MM/DD HH:mm:ss') 
    }
}

export default filter