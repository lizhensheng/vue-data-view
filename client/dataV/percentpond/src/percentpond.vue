<template>
    <dv-percent-pond v-if="isShow" :config="userConfig" :style="{'width': width + 'px', 'height': height + 'px'}" />
</template>

<script>
export default {
    name: 'DPercentpond',
    data(){
        return {
            isShow: true
        }
    },
    props: {
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
    watch:{
      width(){
        this.isShow = false
        this.$nextTick(()=>{
          this.isShow = true
        })
      },
      height(){
          this.isShow = false
          this.$nextTick(()=>{
            this.isShow = true
          })
      }
    },
    computed:{
      value(){
        return this.props[0].fields[3].value[0].value.value
      },
      colors(){
        return this.props[0].fields[3].value[1].value.value
      },
      textColor(){
          return this.props[0].fields[3].value[2].value.value
      },
      userConfig(){
        let config = {
          value: this.value,
          colors: this.colors,
          textColor: this.textColor
        }
        return { ... config}
      }
    }
}
</script>