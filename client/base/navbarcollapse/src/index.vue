<script>
    export default {
        name:'LkNavbarCollapse',
        data(){
            return {
                collapseState:true
            }
        },
        props:{
            collapsePosition:{
                type:String,
                default:'left'
            }
        },
        methods:{
            moveInCollapse(e){
                if(e.target != this.$refs.navbarCollapse) return
                let { collapseState } = this
                if(collapseState){
                    this.$refs.collapseBg.style.borderRight = '20px solid #f7f7f7'
                    this.$refs.collapseBg.style.borderLeft = 'none'
                    this.$refs.collapseWrapper.style.right = '0px'
                    this.$refs.collapseWrapper.style.left = 'initial'
                }else{
                    this.$refs.collapseBg.style.borderLeft = '20px solid #f7f7f7'
                    this.$refs.collapseBg.style.borderRight = 'none'
                    this.$refs.collapseWrapper.style.left = '7px'
                    this.$refs.collapseWrapper.style.right = 'initial'
                }
                
                this.$refs.collapseBg.style.borderBottom = '8px solid transparent'
                this.$refs.collapseBg.style.borderTop = '8px solid transparent'
            },
            moveOutCollapse(e){
                if(e.target != this.$refs.navbarCollapse) return
                let { collapseState } = this
                if(collapseState){
                    this.$refs.collapseBg.style.borderRight = '13px solid #f7f7f7'
                    this.$refs.collapseBg.style.borderLeft = 'none'
                    this.$refs.collapseWrapper.style.right = '-7px'
                    this.$refs.collapseWrapper.style.left = 'initial'
                }else{
                    this.$refs.collapseBg.style.borderLeft = '13px solid #f7f7f7'
                    this.$refs.collapseBg.style.borderRight = 'none'
                    this.$refs.collapseWrapper.style.left = '0px'
                    this.$refs.collapseWrapper.style.right = 'initial'
                }

                this.$refs.collapseBg.style.borderBottom = '9px solid transparent'
                this.$refs.collapseBg.style.borderTop = '9px solid transparent'
                
            },
            collapseClick(e){
                let { collapseState } = this
                this.collapseState = ! collapseState
                
                let navbarBounding = this.$parent.$el.getBoundingClientRect()
                if(!this.parentWidth){
                    this.parentWidth = navbarBounding.width
                }
                this.$parent.$el.style.width = parseInt(this.$parent.$el.style.width) ===  0 ?  this.parentWidth + 'px' : 0
                if(!collapseState){
                    this.$refs.collapseBg.style.borderRight = '13px solid #f7f7f7'
                    this.$refs.collapseBg.style.borderLeft = 'none'
                    this.$parent.$el.style.paddingLeft = '0px'
                    this.$refs.collapseBg.style.right = '0px'
                    this.$refs.collapseBg.style.left = 'initial'
                }else{
                    this.$refs.collapseBg.style.borderLeft = '13px solid #f7f7f7'
                    this.$refs.collapseBg.style.borderRight = 'none'
                    this.$parent.$el.style.paddingLeft = '20px'
                    this.$refs.collapseBg.style.left = '0px'
                    this.$refs.collapseBg.style.right = 'initial'
                }
            }
        },
        render(h){
            let {collapsePosition,collapseState} = this
            let icon = collapsePosition === 'left' ?(
                <div class="lk-navbar-collapse__wrapper"
                     on-click={(e)=>{ this.collapseClick(e) }}
                     ref="collapseWrapper">
                    <i class="el-icon-s-fold" class={{
                        'is-show':collapseState,
                        'el-icon-s-fold':true
                    }}></i>
                    <i class="el-icon-s-unfold" class={{
                        'is-show':!collapseState,
                        'el-icon-s-unfold':true
                    }}></i>
                </div>
            ):(
                <div class="lk-navbar-collapse__wrapper"
                     on-click={(e)=>{ this.collapseClick(e) }}
                     ref="collapseWrapper">
                    <i class="el-icon-s-unfold" class={{
                        'is-show':collapseState,
                        'el-icon-s-unfold':true
                    }}></i>
                    <i class="el-icon-s-fold" class={{
                        'is-show':!collapseState,
                        'el-icon-s-fold':true
                    }}></i>
                </div>
            )
            return (
                <div class="lk-navbar-collapse"
                     on-mouseenter={(e)=>{ this.moveInCollapse(e) }}
                     on-mouseleave={(e)=>{ this.moveOutCollapse(e) }}
                     ref="navbarCollapse">
                        <div class="lk-navbar-collapse__inner" ref="collapseInner">
                            <div class="lk-navbar-collapse__bg" ref="collapseBg"
                            ></div>
                                {icon}
                        </div>
                </div>
            )
        }
    }
</script>