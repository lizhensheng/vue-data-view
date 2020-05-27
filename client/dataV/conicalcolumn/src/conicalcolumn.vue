<template>
    <dv-conical-column-chart :config="userConfig" :style="{'width': width + 'px', 'height': height + 'px'}" />
</template>

<script>
import componentRefresh from '@/mixins/componentRefresh'
const DATA = [
    {
      name: '南阳',
      value: 167
    },
    {
      name: '周口',
      value: 67
    },
    {
      name: '漯河',
      value: 123
    },
    {
      name: '郑州',
      value: 55
    },
    {
      name: '西峡',
      value: 98
    }
  ]
export default {
    name: 'DConicalcolumn',
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
      img(){
        return this.props[0].fields[3].value[0].value.value
      },
      fontSize(){
        return this.props[0].fields[3].value[1].value.value
      },
      imgSideLength(){
        return this.props[0].fields[3].value[2].value.value
      },
      columnColor(){
        return this.props[0].fields[3].value[3].value.value
      },
      textColor(){
        return this.props[0].fields[3].value[4].value.value
      },
      showValue(){
        return this.props[0].fields[3].value[5].value.value
      },
      userConfig(){
        let config = {
          data: this.dataTrigger,
          img: this.img,
          fontSize: this.fontSize,
          imgSideLength: this.imgSideLength,
          columnColor: this.columnColor,
          textColor: this.textColor,
          showValue: this.showValue
        }
        return { ... config}
      }
    }
}
</script>
