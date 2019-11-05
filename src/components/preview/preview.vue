<template>
    <div class="preview" ref="preview"></div>
</template>
<script>
    import Vue from 'vue'
    import {socket} from "common/js/socket-client"
    import {getPageControlConfig} from 'api/dbhelper'
    export default{
        created()
        {
            this.controlConfigs = []
        },
        mounted(){
            socket.on('reply',data => {
                const d = data
                const dv = document.createElement('div')
                dv.id = `echart${d.el}`
                this.$refs.preview.appendChild(dv)
                const node = eval(d.code)
                const instance = new Vue({
                    render: h => h(node.default)
                }).$mount(`#echart${d.el}`)
            })
            let pageId = this.$router.currentRoute.query.pageId
            if(pageId){
                this._getPageControlConfig(pageId)
            }
        },
        methods:{
            _getPageControlConfig(pageId){
                getPageControlConfig(pageId).then((res)=>{
                    if(res.data.code === 0){
                        let d = res.data.data
                        if(d.length > 0){
                            this.controlConfigs = d
                        }else{
                            this.controlConfigs = []
                        }
                        this.$refs.preview.innerHTML = ''
                        this.controlConfigs.forEach(item=>{
                            item.preview = true
                            //let json = JSON.stringify(item)
                            setTimeout(()=>{socket.emit('onDragInControl',item)},200)

                        })
                    }
                })
            }
        }
    }
</script>