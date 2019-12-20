<template>
    <div
        class="lk-tree"
        :class="{
            'lk-tree--highlight-current': highlightCurrent,
            'is-dragging': !!dragState.draggingNode,
            'is-drop-not-allow': !dragState.allowDrop,
            'is-drop-inner': dragState.dropType === 'inner'
        }"
        role='tree'>
            <lk-tree-node
                v-for="child in root.childNodes"
                :node="child"
                :props="props"
                :render-after-expend="renderAfterExpand"
                :show-checkbox="showCheckbox"
                :key="getNodeKey(child)"
                :render-content="renderContent"
                @node-expand="handleNodeExpand">
            </lk-tree-node>
            <div class="lk-tree__empty-blok" v-if="isEmpty">
                <span class="lk-tree__empty-text"></span>
            </div>
            <div
                v-show="dragState.showDropIndicator"
                class="lk-tree__drop-indicator"
                ref="dropIndicator">
            </div>
        </div>
</template>

<script>
import TreeStore from './model/tree-store'
import emitter from 'common/js/mixins/emitter'
import { getNodeKey,findNearestComponent } from './model/util'
import LkTreeNode from './tree-node.vue'
import { addClassName,removeClassName } from 'common/js/dom'
export default {
    name: 'LkTree',
    mixins: [emitter],
    components:{
        LkTreeNode
    },
    data(){
        return {
            store: null,
            root: null,
            currentNode: null,
            treeItems: null,
            checkboxItems: [],
            dragState: {
                showDropIndicator: false,
                draggingNode: null,
                dragNode: null,
                allowDrop: true
            }
        }
    },
    props: {
        data:{
            type:Array
        },
        emptyText:{
            type:String,
            default:'没有数据'
        },
        renderAfterExpand:{
            type:Boolean,
            default:true
        },
        nodeKey:String,
        checkStrictly:Boolean,
        defaultExpandAll:Boolean,
        expandOnClickNode:{
            type:Boolean,
            default:true
        },
        checkOnClickNode:Boolean,
        checkDescendants:{
            type:Boolean,
            default:false
        },
        autoExpandParent:{
            type:Boolean,
            default:true
        },
        defaultCheckedKeys:Array,
        defaultExpandedKeys:Array,
        currentNodeKey:[String,Number],
        renderContent:Function,
        showCheckbox:{
            type:Boolean,
            default:false
        },
        draggable:{
            type:Boolean,
            default:false
        },
        allowDrag:Function,
        allowDrop:Function,
        props:{
            default(){
                return {
                    children:'children',
                    label:'label',
                    disabled:'disabled'
                }
            }
        },
        lazy:{
            type:Boolean,
            default:false
        },
        highlightCurrent:Boolean,
        load:Function,
        filterNodeMethod:Function,
        accordion:Boolean,
        indent:{
            type: Number,
            default:18
        },
        iconClass:String
    },
    computed:{
        children:{
            set(value){
                this.data = value
            },
            get(){
                return this.data
            }
        },
        treeItemArray(){
            return Array.prototype.slice.call(this.treeItems)
        },
        isEmpty(){
            const { childNodes } = this.root
            return !childNodes || childNodes.length === 0 || childNodes.every(({visible})=> !visible)
        }
    },
    watch:{
        defaultCheckedKeys(newVal){
            this.store.setDefaultCheckedKey(newVal)
        },
        defaultExpandedKeys(newVal){
            this.store.defaultExpandedKeys = newVal
            this.store.setDefaultExpandedKey(newVal)
        },
        data(newVal){
            this.store.setData(newVal)
        },
        checkboxItems(val){
            Array.prototypeforEach.call(val,(checkbox) => {
                checkbox.setAttribute('tabindex',-1)
            })
        },
        checkStrictly(newVal){
            this.store.checkStrictly = newVal
        }
    },
    methods:{
        filter(value){
            if (!this.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter')
            this.store.filter(value)
        },
        getNodeKey(node){
            return getNodeKey(this.nodeKey,node.data)
        },
        getNodePath(data){
            if(!this.nodeKey) throw new Error('[Tree] nodeKey is required in getNodePath')
            const node = this.store.getNode(data)
            if(!node) return []
            const path = [node.data]
            let parent = node.parent
            while(parent && parent !== this.root){
                path.push(parent.data)
                parent = parent.parent
            }
            return path.reverse()
        },
        getCheckedNodes(leafOnly,includeHalfChecked){
            return this.store.getCheckedNodes(leafOnly,includeHalfChecked)
        },
        getCheckedKeys(leafOnly){
            return this.store.getCheckedKeys(leafOnly)
        },
        getCurrentNode(){
            const currentNode = this.store.getCurrentNode()
            return currentNode ? currentNode.data : null
        },
        getCurrentKey(){
            if(!this.nodeKey)  throw new Error('[Tree] nodeKey is required in getCurrentKey')
            const currentNode = this.getCurrentNode()
            return currentNode ? currentNode[this.nodeKey]:null
        },
        setCheckedNodes(nodes,leafOnly){
            if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes')
            this.store.setDefaultCheckedNodes(nodes,leafOnly)
        },
        setCheckedKeys(keys,leafOnly){
            if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes')
            this.store.setCheckedKeys(keys,leafOnly)
        },
        setChecked(data,checked,deep){
            this.store.setChecked(data,checked,deep)
        },
        getHalfCheckedNodes(){
            return this.store.getHalfCheckedNodes()
        },
        getHalfCheckedKeys(){
            return this.store.getHalfCheckedKeys()
        },
        setCurrentNode(node){
            if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentNode')
            this.store.setUserCurrentNode(node)
        },
        setCurrentKey(key){
            if(!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentNode')
            this.store.setCurrentNode(key)
        },
        getNode(data){
            return this.store.getNode(data)
        },
        remove(data){
            this.store.remove(data)
        },
        append(data,parentNode){
            this.store.append(data,parentNode)
        },
        insertBefore(data,refNode){
            this.store.insertBefore(data,refNode)
        },
        insertAfter(data,refNode){
            this.store.insertAfter(data,refNode)
        },
        handleNodeExpand(nodeData,node,instance){
            this.broadcast('LkTreeNode','tree-node-expand',node)
            this.$emit('node-expand',nodeData,node,instance)
        },
        updateKeyChildren(key,data){
            if(!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentNode')
            this.store.updateKeyChildren(key,data)
        },
        initTabIndex(){
            this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem')
            this.checkboxItem = this.$el.querySelectorAll('input[type=checkbox')
            const checkedItem = this.$el.querySelectorAll('.is-checked[role=treeitem]')
            if(checkedItem.length){
                checkedItem[0].setAttribute('tabindex',0)
                return
            }
            this.treeItems[0]&&this.treeItems[0].setAttribute('tabindex',0)
        },
        handleKeydown(ev){
            const currentItem = ev.target
            if(currentItem.className.indexOf('el-tree-node') === -1) return
            const keyCode = ev.keyCode
            this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]')
            const currentIndex = this.treeItemArray.indexOf(currentItem)
            let nextIndex
            if([38,40].indexOf(keyCode)>-1){
                ev.preventDefault()
                if(keyCode === 38){
                    nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0
                }else{
                    nextIndex = (currentIndex < this.treeItemArray.length - 1) ? currentIndex + 1 : 0
                }
                this.treeItemArray[nextIndex].focus()
            }
            if([37,39].indexOf(keyCode)>-1){
                ev.preventDefault()
                currentItem.click()
            }
            const hasInput = currentItem.querySelectorAll('[type="checkbox"]')
            if([13,12].indexOf(keyCode)>-1&&hasInput){
                ev.preventDefault()
                hasInput.click()
            }
        }
    },
    created(){
        this.isTree = true
        this.store = new TreeStore({
            key:this.nodeKey,
            data:this.data,
            lazy:this.lazy,
            props:this.props,
            load:this.load,
            currentNodeKey:this.currentNodeKey,
            checkStrictly:this.checkStrictly,
            checkDescendants:this.checkDescendants,
            defaultCheckedKeys:this.defaultCheckedKeys,
            defaultExpandedKeys:this.defaultExpandedKeys,
            autoExpandParent:this.autoExpandParent,
            defaultExpandAll:this.defaultExpandAll,
            filterNodeMethod:this.filterNodeMethod
        })

        this.root = this.store.root
        let dragState = this.dragState
        this.$on('tree-node-drag-start',(event,treeNode) => {
            if(typeof this.allowDrag === 'function' && !this.allowDrag(treeNode.node)){
                event.preventDefault()
                return false
            }
            event.dataTransfer.effectAllowed = 'move'
            try{
                event.dataTransfer.setData('text/plain','')
            } catch(e){}
            dragState.draggingNode = treeNode
            this.$emit('node-drag-start',treeNode.node,event)
        })
        this.$on('tree-node-drag-over',(event,treeNode) => {
            const dropNode = findNearestComponent(event.target,'LkTreeNode')
            const oldDropNode = dragState.dropNode
            if(oldDropNode&&oldDropNode!==dropNode){
                removeClassName(oldDropNode.$el,'is-drop-inner')
            }
            const draggingNode = dragState.draggingNode
            if(!draggingNode || !dropNode) return
            let dropPrev = true
            let dropInner = true
            let dropNext = true
            let userAllowDropInner = true
            if(typeof this.allowDrop === 'function'){
                dropPrev = this.allowDrop(draggingNode.node,dropNode.node,'prev')
                userAllowDropInner = dropInner = this.allowDrop(draggingNode.node,dropNode.node,'inner')
                dropNext = this.allowDrop(draggingNode.node,dropNode.node,'next')
            }
            event.dataTransfer.dropEffect = dropInner?'move':'none'
            if((dropPrev||dropInner||dropNext)&&oldDropNode!==dropNode){
                if(oldDropNode){
                    this.$emit('node-drag-leave',draggingNode.node,oldDropNode.node,event)
                }
                this.$emit('node-drag-enter',draggingNode.node,dropNode.node,event)
            }
            if(dropPrev||dropInner||dropNext){
                dragState.dropNode = dropNode
            }
            if(dropNode.node.nextSibling === draggingNode.node){
                dropNext = false
            }
            if(dropNode.node.previousSibling === draggingNode.node){
                dropPrev = false
            }
            if(dropNode.node.contains(draggingNode.node,false)){
                dropInner = false
            }
            if(draggingNode.node === dropNode.node || draggingNode.node.contains(dropNode.node)){
                dropPrev = false
                dropInner = false
                dropNext = false
            }
            const targetPosition = dropNode.$el.getBoundingClientRect()
            const treePosition = this.$el.getBoundingClientRect()
            let dropType
            const prevPercent = dropPrev ? (dropInner?0.25:(dropNext?0.45:1)):-1
            const nextPercent = dropNext ? (dropInner?0.75:(dropPrev?0.55:0)):1
            let indicatorTop = -9999
            const distance = event.clientY - targetPosition.top
            if(distance<targetPosition.height*prevPercent){
                dropType = 'before'
            }else if(distance>targetPosition.height*nextPercent){
                dropType='after'
            }else if(dropInner){
                dropType = 'inner'
            }else{
                dropType = 'none'
            }
            const iconPosition = dropNode.$el.querySelector('.lk-tree-node__expand-icon').getBoundingClientRect()
            const dropIndicator = this.$refs.dropIndicator
            if(dropType === 'before'){
                indicatorTop = iconPosition.top - treePosition.top
            } else if(dropType === 'after'){
                indicatorTop = iconPosition.bottom - treePosition.top
            }
            dropIndicator.style.top = indicatorTop+'px'
            dropIndicator.style.left = (iconPosition.right - treePosition.left)+'px'
            if(dropType==='inner'){
                addClassName(dropNode.$el,'is-drop-inner')
            }else{
                removeClassName(dropNode.$el,'is-drop-inner')
            }
            dragState.showDropIndicator = dropType === 'before'||dropType==='after'
            dragState.allowDrop = dragState.showDropIndicator||userAllowDropInner
            dragState.dropType = dropType
            this.$emit('node-drag-over',draggingNode.node,dropNode.node,event)
        })
        this.$on('tree-node-drag-end',(event)=>{
            const {draggingNode,dropType,dropNode} = dragState
            event.preventDefault()
            event.dataTransfer.dropEffect = 'move'
            if(draggingNode&&dropNode){
                const draggingNodeCopy = {data:draggingNode.node.data}
                if(dropType!=='none'){
                    draggingNode.node.remove()
                }
                if(dropType==='before'){
                    dropNode.node.parent.insertBefore(draggingNodeCopy,dropNode.node)
                }else if(dropType==='after'){
                    dropNode.node.parent.insertAfter(draggingNodeCopy,dropNode.node)
                }else if(dropType==='inner'){
                    dropNode.node.insertChild(draggingNodeCopy)
                }
                if(dropType!=='none'){
                    this.store.registerNode(draggingNodeCopy)
                }
                removeClassName(dropNode.$el,'is-drop-inner')
                this.$emit('node-drag-end',draggingNode.node,dropNode.node,dropType,event)
                if(dropType!=='none'){
                    this.$emit('node-drop',draggingNode,dropNode.node,dropType,event)
                }
            }
            if(draggingNode&&!dropNode){
                this.$emit('node-drag-end',draggingNode.node,null,dropType,event)
            }
            dragState.showDropIndicator = false
            dragState.draggingNode = null
            dragState.dropNode = null
            dragState.allowDrop = true
        })
    },
    mounted(){
        this.initTabIndex()
        this.$el.addEventListener('keydown',this.handleKeydown)
    },
    updated(){
        this.treeItems = this.$el.querySelectorAll('[role=treeitem]')
        this.checkboxItem = this.$el.querySelectorAll('input[type=checkbox]')
    }
}
</script>