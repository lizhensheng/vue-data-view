<template>
    <div class="preview" ref="preview"></div>
</template>
<script>
    import Vue from 'vue'
    import {getPageControlConfig,getBackgroundImage} from 'api/dbhelper'
    import {getControl} from "api/control"
    export default{
        data(){
          return {
              count:0
          }
        },
        created()
        {
            this.controlConfigs = []
        },
        mounted(){
            // socket.on('reply',data => {
            //     const d = data
            //     const dv = document.createElement('div')
            //     dv.id = `echart${d.el}`
            //     this.$refs.preview.appendChild(dv)
            //     const node = eval(d.code)
            //     new Vue({
            //         render: h => h(node.default)
            //     }).$mount(`#echart${d.el}`)
            //     this.count++
            //     if(this.count == this.controlConfigs.length){
            //         this.loading.close()
            //     }
            // })
            let pageId = this.$router.currentRoute.query.pageId
            if(pageId){
                this.loading = this.$loading({
                    lock: true,
                    text: '加载中',
                    spinner: 'el-icon-loading'
                });
                this._getBackgroundImage(pageId)
                this._getPageControlConfig(pageId)
            }
        },
        methods:{
            loadControl(data){
                const d = data
                const dv = document.createElement('div')
                dv.id = `echart${d.el}`
                this.$refs.preview.appendChild(dv)
                const node = eval(d.code)
                new Vue({
                    render: h => h(node.default)
                }).$mount(`#echart${d.el}`)
                this.count++
                if(this.count == this.controlConfigs.length){
                    this.loading.close()
                }
            },
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
                            //setTimeout(()=>{socket.emit('onDragInControl',item)},10)
                            if(!item.chartId){
                                return
                            }
                            getControl(item).then((res)=>{
                                this.loadControl(res.data)
                            }).catch(e=>{
                                console.log(e)
                            })
                        })
                    }
                })
            },
            _getBackgroundImage(pageId){
                getBackgroundImage(pageId).then(res=>{
                    if(res.data.code == 0){
                        if(res.data.data) {
                            window.document.body.style.backgroundImage = `url(${res.data.data.backgroundImageUrl})`
                        }
                    }
                })
            }
        }
    }
</script>

<style >
    html {
        background: none;
    }
</style>