<template>
    <dv-water-level-pond :config="userConfig" :style="{'width': width + 'px', 'height': height + 'px'}" />
</template>

<script>
import componentRefresh from '@/mixins/componentRefresh'
export default {
    name: 'DWaterlevel',
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
                return this.getNumArray(JSON.parse(result))
            }
            else{
                return []
            }
      },
      shape(){
        return this.props[0].fields[3].value[0].value.value
      },
      colors(){
        return this.props[0].fields[3].value[1].value.value
      },
      userConfig(){
        let config = {
          data: this.dataTrigger,
          shape: this.shape,
          colors: this.colors,
        }
        return { ... config}
      }
    },
    methods:{
        getNumArray(jsonArray){
            return jsonArray.map(j => {
                return j.num
            })
        }
    }
}
</script>