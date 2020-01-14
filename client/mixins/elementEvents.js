export default {
    methods:{
        _event_link(eventData){
            return new Promis((resolve)=>{
                if(eventData.url){
                    window.location.href = eventData.url
                }
                resolve()
            })
        },
        _event_share(){
            return new Promise((resolve)=>{
                window.alert('分享')
                resolve()
            })
        },
        _event_submitForm(eventData,element,page){
            return new Promise((resolve)=>{
                let apiUrl = evnentData.url
                let formdate={}
                page.pages.forEach(data=>{
                    data.elements.forEach(item=>{
                        if(!item.isForm) return
                        let key = item.propsValue.keyName||''
                        formdata[key]=item.value
                    })
                })
                resolve()
            })
        }
    }
}