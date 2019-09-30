<template>
    <div class="tab">
        <div>
            <router-link tag="div" class="tab-item" to="/homepage">
                <span class="tab-link">首页</span>
            </router-link>
            <router-link tag="div" class="tab-item" to="/statistic">
                <span class="tab-link" @mouseenter="mouseOverTab" @mouseleave="mouseOutTab">综合分析</span>
            </router-link>
        </div>
        <transition name="slide">
            <div class="slide-wrapper" v-show="false"  @mouseenter="mouseOverTabSlide" @mouseleave="mouseOutTabSlide">
            <div class="item">
                <div class="title">
                    <router-link tag="div" class="tab-item" to="/statistic/landclass">
                        <span class="tab-link" @click="hideSlide">地政类</span>
                    </router-link>
                </div>
                <div class="menu-item">
                    <router-link tag="div" class="tab-item" to="/statistic/grantland">
                        <span class="tab-link" @click="hideSlide">建设用地审批</span>
                    </router-link>
                </div>
                <div class="menu-item">
                    <router-link tag="div" class="tab-item" to="/statistic/landsupply">
                        <span class="tab-link" @click="hideSlide">土地供应</span>
                    </router-link>
                </div>
                <div class="menu-item">
                    <router-link tag="div" class="tab-item" to="/statistic/keyindustry">
                        <span class="tab-link" @click="hideSlide">重点产业</span>
                    </router-link>
                </div>
                <div class="menu-item">
                    <router-link tag="div" class="tab-item" to="/statistic/idleland">
                        <span class="tab-link" @click="hideSlide">闲置土地</span>
                    </router-link>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    <router-link tag="div" class="tab-item" to="/statistic/miningadministration">
                        <span class="tab-link" @click="hideSlide">矿政类</span>
                    </router-link>
                </div>
                <div class="menu-item">
                    <router-link tag="div" class="tab-item" to="/statistic/productprice">
                        <span class="tab-link" @click="hideSlide">产品价格</span>
                    </router-link>
                </div>
                <div class="menu-item">
                    <router-link tag="div" class="tab-item" to="/statistic/examination">
                        <span class="tab-link" @click="hideSlide">矿权审批</span>
                    </router-link>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    <router-link tag="div" class="tab-item" to="/statistic/geologic">
                        <span class="tab-link" @click="hideSlide">地质环境类</span>
                    </router-link>
                </div>
                <div class="menu-item">
                    <router-link tag="div" class="tab-item" to="/statistic/disaster">
                        <span class="tab-link" @click="hideSlide">地质灾害</span>
                    </router-link>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    <router-link tag="div" class="tab-item" to="/statistic/mapping">
                        <span class="tab-link" @click="hideSlide">测绘类</span>
                    </router-link>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    <router-link tag="div" class="tab-item" to="/statistic/forestry">
                        <span class="tab-link" @click="hideSlide">林业类</span>
                    </router-link>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    <router-link tag="div" class="tab-item" to="/statistic/synthesize">
                        <span class="tab-link" @click="hideSlide">综合类</span>
                    </router-link>
                </div>
                <div class="menu-item">
                    <router-link tag="div" class="tab-item" to="/statistic/urbanland">
                        <span class="tab-link" @click="hideSlide">城市地价</span>
                    </router-link>
                </div>
                <div class="menu-item">
                    <router-link tag="div" class="tab-item" to="/statistic/gdpconsumption">
                        <span class="tab-link" @click="hideSlide">GDP地耗</span>
                    </router-link>
                </div>
                <div class="menu-item">
                    <router-link tag="div" class="tab-item" to="/statistic/macroeconomy">
                        <span class="tab-link" @click="hideSlide">宏观经济</span>
                    </router-link>
                </div>
                <div class="menu-item">
                    <router-link tag="div" class="tab-item" to="/statistic/estate">
                        <span class="tab-link" @click="hideSlide">不动产</span>
                    </router-link>
                </div>
            </div>
        </div>
        </transition>
    </div>
</template>

<script>
    import './tab.styl'


    export default {
        data(){
            return{
                moveInTab:false,
                moveInTabSlide:false
            }
        },
        computed:{
            showSlide(){
                return this.moveInTab || this.moveInTabSlide
            }
        },
        methods:{
            mouseOverTab(){
                this.moveInTab = true
            },
            mouseOutTab(){
                setTimeout(()=>{
                    this.moveInTab = false
                },200)
            },
            mouseOverTabSlide(){
                this.moveInTabSlide = true
            },
            mouseOutTabSlide(){
                this.moveInTabSlide = false
            },
            hideSlide(){
                this.moveInTab = false
                this.moveInTabSlide = false
            }
        }
    }
</script>