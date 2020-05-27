<template>
    <dv-active-ring-chart :config="userConfig" :style="{'width': width + 'px', 'height': height + 'px'}" />
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
    name: 'DRingchart',
    data(){
        return {
            
        }
    },
    mixins: [componentRefresh],
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
      radius(){
        return this.props[0].fields[3].value[0].value.value
      },
      activeRadius(){
        return this.props[0].fields[3].value[1].value.value
      },
      color(){
        return this.props[0].fields[3].value[2].value.value
      },
      showOriginValue(){
        return this.props[0].fields[3].value[3].value.value
      },
      userConfig(){
        let config = {
          data: this.dataTrigger,
          radius: this.radius,
          activeRadius: this.activeRadius,
          color: this.color,
          showOriginValue: this.showOriginValue
        }
        return { ... config}
      }
    }
}
</script>