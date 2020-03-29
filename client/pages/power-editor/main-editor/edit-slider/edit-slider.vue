<template>
    <div class="edit-slider">
        <el-tooltip popper-class="shortcut-key">
            <div slot="content">
                <div>
                    <div class="shortcut-tip_item"><span class="shortcut-tip_title">开关图层面板</span><span class="shortcut-tip_key">Ctrl/Cmd + ←</span></div>
                    <div class="shortcut-tip_item"><span class="shortcut-tip_title">切换组件面板</span><span class="shortcut-tip_key">Ctrl/Cmd + ↑</span></div>
                    <div class="shortcut-tip_item"><span class="shortcut-tip_title">切换右侧面板</span><span class="shortcut-tip_key">Ctrl/Cmd + →</span></div>
                    <div class="shortcut-tip_item"><span class="shortcut-tip_title">画布缩放至最佳位置</span><span class="shortcut-tip_key">Ctrl/Cmd + a</span></div>
                </div>
            </div>
            <i class="el-icon-monitor">
        </i></el-tooltip>
        <div class="edit-scale">
            <y-input-number  v-model="scalePercent" :min="18" :max="175" class="edit-scale-value" @change="onChange"></y-input-number>
            <!-- <input type="number"   v-model="scalePercent"  @change="onChange"/>%<i class="el-icon-arrow-down"/> -->
        </div>
        <div><y-range v-model="scalePercent" :min="18" :max="175"  :step="15" @change="onChange"></y-range></div>
        <i class="el-icon-magic-stick" @click="onMagic"></i>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'EditSlider',
    data(){
        return {
            scalePercent: 0
        }
    },
    computed:{
        ...mapState({
            showThumbnail: state => state.scale.showThumbnail,
            _scalePercent: state => state.scale.scalePercent
        })
    },
    watch:{
        _scalePercent(value){
            this.scalePercent = value
        }
    },
    mounted(){
        this.scalePercent = this._scalePercent
    },
    methods:{
        onChange(){
            this.$store.dispatch('setScalePercent', this.scalePercent)
        },
        onMagic(){
            this.$store.dispatch('setShowThumbnail', {show: !this.showThumbnail})
        }
    }
}
</script>

<style lang="stylus" scoped>
    .edit-slider{
        display: flex;
        position: absolute;
        bottom: 0;
        height: 30px;
        right: 0;
        left: 0;
        background: rgb(34,37,40);
        color: #bcc9d4;
        justify-content: flex-end;
        align-items: center;
        z-index: 222;
        .edit-scale{
            background: rgb(38,44,51);
            color: #bcc9d4;
            padding: 5px;
            border:1px solid #000;
            margin-left: 5px;
            .edit-scale-value{
                color: #bcc9d4;
                width: 20px;
                background:none;
                text-align:right;
            }
            i{
                font-size: 12px;
                transform: scale(0.8);
                font-weight: bold;
            }
        }
        i.el-icon-magic-stick{
            margin:0 10px 0 3px;
            &.active,&:hover{
                color: #fff;
                cursor:pointer;
            }
        }
    }
    .shortcut-tip_item{
        display: flex;
        flex-direction: row;
        justify-content:space-between;
        align-items: center;
        width: 200px;
        height: 30px;
        .shortcut-tip_key{
            color: rgb(8,161,219);
            background: rgb(38,43,51);
            padding: 5px 10px;
        }
    }
</style>