<script>
export default {
    name: 'YTable',
    data(){
        return {
            colProps: [],
            headers: []
        }
    },
    props: {
        data: Array
    },
    methods: {
        getColumnPropInstance(){
            if(this.$slots.default){
                    const columnPropSlots = this.$slots.default.filter((vnode)=> vnode.tag&&
                        vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'YTableColumn')
                    const columnProps = columnPropSlots.map(({componentInstance}) => componentInstance)
                    const columnsChanged = !(columnProps.length === this.colProps.length && 
                                            columnProps.every((columnProp,index) => columnProp.$options.propsData.prop === this.colProps[index]))
                    if(columnsChanged && this.headers.length == 0){
                        columnProps.forEach(columnProp=>{
                            let label = columnProp.$options.propsData.label
                            let width = columnProp.$options.propsData.width
                            this.headers.push({
                                label,
                                width
                            })
                            let prop = columnProp.$options.propsData.prop
                            this.colProps.push({
                                prop
                            })
                        })
                    }
            }
            else{
                this.colProps = []
            }
        }
    },
    mounted(){
        this.getColumnPropInstance()
    },
    render(){
        let headers = (
            <div class="ui-table_header">
                {
                    this.headers.map((header) =>{
                        return (
                            <div class={ header.width === 'auto' ? 'ui-table_header_item auto-width' : 'ui-table_header_item'}
                                 style={{'width': this.$mUtils.isNumber(header.width) ? header.width + 'px' : header.width}}>
                                {header.label}
                            </div>
                        )
                    })
                }
            </div>
        )
        let tableData = (
             <div class="ui-table_data">
                {this.$slots.default}
             </div>
        )
        return (
            <div class="ui-table">
                {headers}
                {tableData}
            </div>
        )
    }
}
</script>