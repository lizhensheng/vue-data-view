<template>
    <div class="d-rank-form">
        <dv-scroll-ranking-board :config="userConfig"  :style="{'width': width + 'px', 'height': height + 'px'}" />
    </div>
</template>
<script>
    import componentRefresh from '@/mixins/componentRefresh'
    const DATA = [
        {
            name: '周口',
            value: 55
        },
        {
            name: '南阳',
            value: 120
        },
        {
            name: '西峡',
            value: 78
        },
        {
            name: '驻马店',
            value: 66
        },
        {
            name: '新乡',
            value: 80
        }
    ]
    export default {
        name:'DRankForm',
        data(){
            return {
                config: {}
            }
        },
        mixins: [componentRefresh],
        props:{
            props:{
                type: Array,
                default: function(){
                    return [{
                        fields:[]
                    }]
                }
            },
            width:{
                type: Number,
                default: 300
            },
            height:{
                type: Number,
                default: 300
            },
            ratio:{
                type: Number,
                default: 1
            },
        },
        computed:{
            dataTrigger(){
                if(this.props[1].fields[0].value.dataJson.json){
                    let result = this.props[1].fields[0].value.dataJson.json
                    return JSON.parse(result)
                }
                else{
                    return DATA
                }
            },
            rowNum(){
                return this.props[0].fields[3].value[0].value.value
            },
            waitTime(){
                return this.props[0].fields[3].value[1].value.value
            },
            carousel(){
                return this.props[0].fields[3].value[2].value.value
            },
            unit(){
                return this.props[0].fields[3].value[3].value.value
            },
            sort(){
                return this.props[0].fields[3].value[4].value.value
            },
            userConfig(){
                let config = {
                    data: this.dataTrigger,
                    rowNum: this.rowNum,
                    waitTime: this.waitTime,
                    carousel: this.carousel,
                    unit: this.unit,
                    sort: this.sort
                }
                return { ... config}
            }
        },
    }
</script>

<style lang="stylus" scoped>
    .d-scroll-form{
        position: relative;
        width: 100%;
        height: 100%;
        .header{
            display: flex;
            flex-direction: row;
            height: 30px;
            align-items: center;
            padding: 0px 10px;
            .header-item
            {
                flex: 1;
            }
        }
        .row
        {
            overflow: hidden;
            .row-item
            {
                display: flex;
                transition: all 0.9s;
                padding: 0px 10px;
                .col-item
                {
                    flex: 1;
                }
            }
        }
    }
</style>
