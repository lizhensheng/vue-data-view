<script>
function noop(){}
const firstUpperCase = (str)=>{
    return str.toLowerCase().replace(/( |^)[a-z]/g,(L)=>L.toUpperCase())
}
import TabBar from './tab-bar'
export default {
    name:'TabNav',
    components:{
        TabBar
    },
    data(){
        return {
            scrollable:false,
            navOffset:0
        }
    },
    props:{
        panes:Array,
        currentName:String,
        editable:Boolean,
        onTabClick:{
            type:Function,
            default:noop
        },
        onTabRemove:{
            type:Function,
            default:noop
        },
        type:String
    },
    inject:['rootTabs'],
    computed:{
        navStyle(){
            const dir = ['top','bottom'].indexOf(this.rootTabs.tabPosition)>-1?'X':'Y'
            return {
                transform:`translate${dir}(-${this.navOffset}px)`
            }
        },
        sizeName(){
            return ['top','bottom'].indexOf(this.rootTabs,tabPosition) !== -1 ? 'width':'height'
        }
    },
    methods:{
        scrollPrev(){
            const containerSize = this.$refs.navScroll[`offset${firstUpperCase(this.sizeName)}`]
            const currentSize = this.navOffset

            if(!currentSize) return

            let newOffset = currentSize>containerSize?
            currentSize - containerSize:0
            this.navOffset = newOffset
        },
        scrollNext(){
            const navSize = this.$refs.nav[`offset${firstUpperCase(this.sizeName)}`]
            const containerSize = this.$refs.navScroll[`offset${firstUpperCase(this.sizeName)}`]
            const currentOffset  = this.navOffset

            if(navSize - currentOffset < containerSize) return

            let newOffset = navSize - currentOffset >containerSize*2
            ?currentOffset+containerSize
            :(navSize - containerSize)
            this.navOffset = newOffset
        },
        scrollToActiveTab(){
            if(!this.scrollable) return
            const nav = this.$refs.nav
            const activeTab = this.$el.querySelector('.is-acitive')
            const navScroll = this.$refs.navScroll
            const isHorizontal = ['top','bottom'].indexOf(this.rootTabs.tabPosition) !== -1
            const activeTabBounding = activeTab.getBoundingClientRect()
            const navScrollBounding = navScroll.getBoundingClientRect()
            const maxOffset = isHorizontal
                ? nav.offsetWidth - navScrollBounding.width
                : nav.offsetHeight - navScrollBounding.height
            const currentOffset = this.navOffset
            let newOffset = currentOffset
            if(isHorizontal){
                if(activeTabBounding.left < navScrollBounding.left){
                    newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left)
                }
                if(activeTabBounding.right > navScrollBounding.right){
                    newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right
                }
            } else {
                if(activeTabBounding.top < navScrollBounding.top){
                    newOffset = currentOffset - (navScrollBounding.top - activeTabBounding.top)
                }
                if(activeTabBounding.bottom > navScrollBounding.bottom){
                    newOffset = currentOffset + (activeTabBounding.bottom - navScrollBounding.bottom)
                }
            }
            newOffset = Math.max(newOffset,0)
            this.navOffset = Math.min(newOffset,maxOffset)
        },
        setFocus(){
            if(this.focusable){
                this.isFocus = true
            }
        },
        removeFocus(){
            this.isFocus = false
        },
        windowBlurHandler(){
            this.focusable = false
        },
        windowFocusHandler(){
            setTimeout(()=>{
                this.focusable = true  
            },50)     
        },
        visibilityChangeHandler(){
            const visibility = document.visibilityState
            if(visibility === 'hidden'){
                this.focusable = false
            } else if(visibility === 'visible'){
                setTimeout(()=>{
                    this.focusable = true
                },50)
            }
        },
        changeTab(e){
            const keyCode = e.keyCode
            let nextIndex
            let currentIndex,tabList
            if([37,38,39,40].indexOf(keyCode)!==-1){
                tabList = e.currentTarget.querySelectorAll('[role-tabs]')
                currentIndex = Array.prototype.indexOf.call(tabList,e.target)
            }else{
                return
            }
            if(keyCode === 37 || keyCode === 38){
                if(currentIndex === 0){
                    nextIndex = tabList - 1
                }
                else{
                    nextIndex = currentIndex - 1
                }
            } else {
                if(currentIndex < tabList.length - 1){
                    nextIndex = currentIndex + 1
                }else{
                    nextIndex = 0
                }
            }
            tabList[nextIndex].focus()
            tabList[nexIndex].click()
            this.setFocus()
        }
    },
    render(h){
        const {
            type,
            panes,
            editable,
            onTabClick,
            onTabRemove,
            navStyle,
            scrollable,
            scrollNext,
            scrollPrev
        } = this
        const scrollBtn = scrollable
            ? [
                <span class={['lk-tabs__nav-prev',scrollable.prev ? '' : 'is-disabled']} on-click={scrollPrev}><i class="el-icon-arrow-left"></i></span>,
                <span class={['lk-tabs__nav-next',scrollable.next ? '' : 'is-disabled']} on-click={scrollNext}><i class="el-icon-arrow-right"></i></span>
            ]:null
        const tabs = this._l(panes,(pane,index)=>{
            let tabName = pane.name || pane.index || index
            const closable  = pane.isClosable || editable
            pane.index = `${index}`
            const btnClose = closable 
                ? <span class="el-icon-close" on-click={(ev) => { this.onTabRemove(pane,ev) }}></span>
                : null
            const tabLabelContent = pane.$slots.label || pane.label
            const tabindex = pane.active ? 0 : -1
            return (
                <div
                 class={{
                     'lk-tabs__item': true,
                     [`is-${ this.rootTabs.tabPosition }`]: true,
                     'is-active': pane.active,
                     'is-disabled': pane.disabled,
                     'is-closable': closable,
                     'is-focus': this.isFocus
                 }}
                 id={`tab-${tabName}`}
                 key={`tab-${tabName}`}
                 aria-controls={`pane-${tabName}`}
                 role="tab"
                 aria-selected={pane.active}
                 ref="tabs"
                 tabindex={tabindex}
                 refInFor
                 on-focus={()=> { this.setFocus() }}
                 on-blur={()=>{ this.removeFocus() }}
                 on-click={(ev)=>{ this.removeFocus(); this.onTabClick(pane,tabName,ev) }}
                 on-keydown={(ev) => { if(closable && (ev.keyCode === 46 || ev.keyCode === 8)) { this.onTabRemove(pane,ev)} }}
                >
                 {tabLabelContent}
                 {btnClose}
                </div>  
            )
        })
        return (
            <div class={['lk-tabs__nav-wrap',scrollable ? 'is-scrollable' : '', `is-${ this.rootTabs.tabPosition }`]}>
             {scrollBtn}
             <div class={['lk-tabs__nav-scroll']} ref="navScroll">
              <div
               class={['lk-tabs__nav',`is-${ this.rootTabs.tabPosition }`]}
               ref="nav"
               style={navStyle}
               role="tablist"
               on-keydown={ (ev)=>{this.changeTab(ev);} }
              >
                {!type ? <tab-bar tabs={panes}></tab-bar> : null}
                {tabs}
               </div>
               </div>
            </div>
        )
    },
    mounted(){
        document.addEventListener('visibilitychange',this.visibilityChangeHandler)
        window.addEventListener('blur',this.windowBlurHandler)
        window.addEventListener('focus',this.windowFocusHandler)
        setTimeout(()=>{
            this.scrollToActiveTab()
        },0)
    },
    beforeDestroy(){
        document.removeEventListener('visibilitychange',this.visibilityChangeHandler)
        window.removeEventListener('blur',this.windowBlurHandler)
        window.removeEventListener('focus',this.windowFocusHandler)
    }
}
</script>