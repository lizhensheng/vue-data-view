export default {
    methods:{
        _event_link(eventData){
            return new Promise((resolve)=>{
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
        }
    }
}