<template>
    <div class="panel-box">
        <div class="header">
            <div class="title">{{title}}</div>
            <div class="detail">
                <router-link tag="div" class="tab-item" :to="detailLink">
                    <span class="tab-link">查看详情</span>
                </router-link>
            </div>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import './panel.styl'

    export default {
        props:{
            title:String,
            detailLink:String
        }
    }
</script>
