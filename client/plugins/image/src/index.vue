<!--test.vue-->
<template>
  <div class="c-image">
    <a v-if="dataTrigger.link" :href="dataTrigger.link" :target="targetField?'_blank':'_self'">
      <img :src="dataTrigger.imageSrc" :style="{...getImageStyle(props[0].fields)}"/>
    </a>
    <img :src="dataTrigger.imageSrc" :style="{...getImageStyle(props[0].fields)}"/>
  </div>
</template>

<script>
import componentRefresh from '@/mixins/componentRefresh'
export default {
    name: 'CImage', 
    mixins: [componentRefresh],
    props:{
        props:{
            type: Array,
            default: function(){
                return [{
                    fields:[]
                }]
            }
        }
    },
    computed:{
        dataTrigger(){
            if(this.props[1].fields[0].value.dataJson.json){
                let result = this.getResult(this.props[1].fields[0].value.dataJson.json)
                return result
            }
            else{
                let link = this.props[0].fields[4].value[0].value.value
                let imageSrc = this.props[0].fields[3].value[0].value.value
                return {link,imageSrc}
            }
        },
        targetField(){
          return this.props[0].fields[4].value[1].value.value
        }
    },
    methods:{
        getImageStyle(item){
            let width = item[0].value[0].value.value
            let height = item[0].value[1].value.value
            return {
                'width': width+ 'px',
                'height': height+ 'px'
            }
        },
        getResult(json){
            let jsonArray = []
            try
            {
                jsonArray = JSON.parse(json)
            }
            catch(e){
                console.warn(e)
            }
            let model = this.props[1].fields[0].value.dataJson.model
            let fieldSrc = model[0].field
            let mappingSrc =model[0].mapping
            let keySrc = fieldSrc || mappingSrc

            let fieldLink = model[1].field
            let mappingLink =model[1].mapping
            let keyLink = mappingLink || fieldLink
            return jsonArray.length > 0 ? 
                    {
                        imageSrc: jsonArray[0][keySrc],
                        link: jsonArray[1][keyLink] 
                    }
                    : {}
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
