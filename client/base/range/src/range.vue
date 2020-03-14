<template>
    <div class="ui-range">
        <i class="el-icon-minus" @click="onMinus"></i>
        <input type="range" class="ui-range_input" :value="valueInt" :min="min" :max="max" :step="step"
               :style="{'background':`linear-gradient(to right, rgb(0, 251, 255), rgb(0, 176, 255) ${colorLeft}%, rgb(38, 42, 53) ${colorRight}%, rgb(38, 42, 53))`}"
               @input="onInput"
        />
        <i class="el-icon-plus" @click="onPlus"></i>
    </div>
</template>

<script>
export default {
    name: 'YRange',
    props:{
        value: Number,
        min:  {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        step: {
            type: Number,
            default: 5
        }
    },
    computed:{
        valueInt(){
            return parseInt(this.value)
        },
        colorLeft(){
            let range = this.max - this.min
            return Math.floor(this.valueInt / range /10*100)
        },
        colorRight(){
            let range = this.max - this.min
            return Math.floor(this.valueInt / range*100)
        }
    },
    methods: {
        onPlus(){
            let tempVal = this.valueInt;
            if(this.value < (this.max- this.step)){
                tempVal = this.valueInt + this.step
            } 
            else{
                tempVal = this.max
            }
            this.$emit('input',tempVal)
            this.$emit('change')
        },
        onMinus(){
             let tempVal = this.valueInt;
            if(this.value > (this.min+this.step)){
                tempVal = this.valueInt -this.step
            }
            else{
                tempVal = this.min
            }
            this.$emit('input',tempVal)
            this.$emit('change')
        },
        onInput(e){
            this.$emit('input',Math.floor(e.target.value))
            this.$emit('change')
        }
    }
}
</script>