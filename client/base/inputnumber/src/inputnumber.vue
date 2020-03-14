<template>
    <div class="ui-inputnumber">
        <div class="ui-inputnumber_wrap">
            <input type="number" :value="value" :min="min" :max="max" @change="onChange" :class="{'warn': warn}"/>
        </div>
        <div class="ui-inputnumber_spwrap">
            <div class="ui-inputnumber_add" @click="onAdd">+</div>
            <div class="ui-inputnumber_dec" @click="onDec">-</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'YInputNumber',
    data(){
        return {
            warn: false
        }
    },
    props:{
        value: {
            type: Number
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        }
    },
    methods:{
        onAdd(){
            this.$emit('input',Math.min(this.value + 1,this.max))
            this.warn = false
        },
        onDec(){
            this.$emit('input', Math.max(this.value - 1,this.min))
            this.warn = false
        },
        onChange(e){
            let value = e.target.value
            value = parseInt(value) || 0
            if(value>=this.min && value <= this.max){
                this.$emit('input', value)
                this.$emit('change', e)
                this.warn = false
            } else {
                this.warn = true

                this.$msgbox({
                    title: '数据校验',
                    message: '数据检查结果: 输入的数值超出范围 !',
                    iconClass: 'el-icon-success'
                })
                console.warn('输入的数值超出范围')
            }
        }
    }
}
</script>

