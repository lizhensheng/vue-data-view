
<script>
    export default {
        name: 'YTabs',
        data(){
            return {
                panels: [],
                headers: [],
                currentName: ''
            }
        },
        props:{
            activeName: String,
            position: {
                type: String,
                default: 'left'
            }
        },
        created(){
            this.$on('tab-nav-update',this.calcPaneInstances.bind(null,true))
        },
        mounted(){
            this.calcPaneInstances()
        },
        updated(){
            this.calcPaneInstances()
        },
        methods:{
            calcPaneInstances(){
                if(this.$slots.default){
                    const panelSlots = this.$slots.default.filter((vnode)=> vnode.tag&&
                        vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'YTabPanel')
                    const panels = panelSlots.map(({componentInstance}) => componentInstance)
                    const panesChanged = !(panels.length === this.panels.length && panels.every((panel,index) => panel === this.panels[index]))
                    if(panesChanged){
                        this.panels = panels
                    }
                    if(this.headers.length === 0 && this.panels.length > 0){
                        this.panels.forEach(panel=>{
                            let iconClass = panel.$options.propsData.iconClass
                            let name = panel.$options.propsData.name
                            this.headers.push({
                                iconClass,
                                name
                            })
                        })
                        if(!this.currentName){
                            this.currentName = this.headers[0].name
                        }
                    }
                }else{
                    this.panels = []
                }
            },
            onTableClick(e,name){
                this.currentName = name
                this.$emit('switchTab', name)
            }
        },
        render(){
             const panels = (
                <div class="ui-tabs_content">
                    {this.$slots.default}
                </div>
            ) 
            const headers = (
                  <div class="ui-tabs_header">
                    {this.headers.map(header => {
                        return (
                            <div class="ui-tabs_navitem" 
                                 class={{'ui-tabs_navitem': true,'active': this.currentName === header.name}}
                                 on-click={(e)=>{ this.onTableClick(e,header.name)}}
                                 >
                                    <i class={header.iconClass}></i>
                            </div>
                        )
                    })}
                </div>
            )
            return (
                <div  class={{'position-left': this.position === 'left', 'position-top': this.position ==='top', 'ui-tabs': true}}>
                    {headers}
                    {panels}
                </div>
            )
        }
    }
</script>