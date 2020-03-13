<template>
    <div class="gridlist">
        <div class="gridlist-item marginL5 marginT5 " v-for="item in imgList" :key="item.id" :class="{'edit': edit, 'active': item.active}" @click.prevent.stop="onItemClick" :data-id="item.id">
            <img :src="item.pic" class="gridlist-img"/>
            <div class="gridlist-top">
                <div class="ibox gridlist-check"  @click.prevent.stop="onCheckIconClick" :data-id="item.id"><i class="el-icon-check"></i></div>
            </div>
            <div class="gridlist-bottom">
                <div class="ibox gridlist-check" @click="onSearchClick"  :data-id="item.id">
                    <div class="ibox"><i class="el-icon-search"></i></div>
                    <div class="ibox absolute"><i class="el-icon-plus"></i></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
        }
    },
    computed:{
        edit(){
            let flag = this.imgList.every((t) => {return !t.active})
            return !flag
        },
        ...mapState({
            imgList: state => state.image.imgList
        })
    },
    methods:{
        getIndex(copyList, id){
            let cindex = -1
            copyList.map((t,index) => {
                if(t.id == id){
                    cindex = index 
                }
            })
            return cindex
        },
        onItemClick(e){
            let id = e.currentTarget.dataset.id
            if(this.edit){
                let copyList = this.imgList
                let index = this.getIndex(copyList, id)
                copyList[index].active = !copyList[index].active
                this.$store.dispatch('setImgList', copyList)
            }
            else{
                this.$emit('itemClick', id)
            }
        },
        onCheckIconClick(e){
            let id = e.currentTarget.dataset.id
            let copyList = this.imgList
            let index = this.getIndex(copyList, id)
            copyList[index].active = !copyList[index].active
            this.$store.dispatch('setImgList', copyList)
        },
        onSearchClick(e){
            let id = e.currentTarget.dataset.id
            this.$emit('itemClick', id)
        }
    }
}
</script>

<style lang="stylus">
.gridlist{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .gridlist-item{
        position: relative;
        cursor: pointer;
        width: 110px;
        height: 110px;
        background: rgba(150,150,150,0.2);
        .gridlist-img{
            width: auto;  
            height: auto;  
            max-width: 100%;  
            max-height: 100%; 
        }
        .gridlist-top{
            z-index: 1;
            position: absolute;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            top: 0;
            height: 40px;
            line-height: 40px;
            width: 100%;
            opacity: 0;
            background-image: linear-gradient(to bottom, rgba(154,154,154,1) , rgba(255,255,255,0));
            .gridlist-check{
                width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                border-radius: 50%;
                background: #fff;
                margin-left: 8px;
                >i{
                    font-size: 12px;
                    font-weight: bold;
                    color: rgb(196,196,196);
                }
            }
        }
        .gridlist-bottom{
            z-index: 1;
            position: absolute;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            bottom: 0;
            height: 40px;
            line-height: 40px;
            width: 100%;
            opacity: 0;
            background-image: linear-gradient(to top, rgba(154,154,154,1) , rgba(255,255,255,0));
            .gridlist-check{
                position: relative;
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                margin-right: 10px;
                color: #fff;
                font-size: 20px;
                .absolute{
                    top: -1px;
                    left: 14px;
                    font-size: 12px;
                    transform: scale(0.7)
                }
            }
        }
        &:hover{
            .gridlist-top{
                opacity: 1;
            }
        }
        &.edit{
            .gridlist-top{
                opacity: 1;
                .gridlist-check{
                    border:2px solid rgb(196,196,196);
                    background: none;
                    >i{
                        display: none;
                    }
                }
            }
        }
        &.edit:hover{
            .gridlist-top{
                .gridlist-check{
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    background: #fff;
                    border: none;
                    >i{
                        display: inline-block;
                    }
                }
            }
            .gridlist-bottom{
                opacity: 1;
            }
        }
        &.edit.active{
            border: 1px solid rgb(87,74,184);
            .gridlist-top{
                .gridlist-check{
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    background: rgb(87,74,184);
                    border: none;
                    >i{
                        display: inline-block;
                    }
                }
            }
        }
    }
}
</style>