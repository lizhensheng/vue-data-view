<template>
    <el-select v-model="value" placeholder="请选择">
        <el-option-group
                v-for="group in options"
                :key="group.label"
                :label="group.label">
            <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
        </el-option-group>
    </el-select>
</template>

<script>
    import {normalize} from 'common/js/observer'

    export default {
        data() {
            return {
                options: [{
                    label: '热门城市',
                    options: [{
                        value: 'Shanghai',
                        label: '上海'
                    }, {
                        value: 'Beijing',
                        label: '北京'
                    }]
                }, {
                    label: '城市名',
                    options: [{
                        value: 'Chengdu',
                        label: '成都'
                    }, {
                        value: 'Shenzhen',
                        label: '深圳'
                    }, {
                        value: 'Guangzhou',
                        label: '广州'
                    }, {
                        value: 'Dalian',
                        label: '大连'
                    }]
                }],
                value: ''
            }
        },
        mounted() {
            this.options = normalize()
        }
    }
</script>