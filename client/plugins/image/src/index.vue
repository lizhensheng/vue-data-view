<!--test.vue-->
<template>
  <div class="c-image">
    <a v-if="dataTrigger.link" :href="dataTrigger.link" :target="targetField?'_blank':'_self'">
      <img :src="dataTrigger.imageSrc"/>
    </a>
    <img :src="dataTrigger.imageSrc"/>
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
        getResult(json){
            let jsonArray = []
            try
            {
                jsonArray = JSON.parse(json)
            }
            catch(e){
                console.warn(e.message)
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

<style  lang="stylus" scoped>
.c-image{
    width: 100%;
    height: 100%;
    img{
        width: 100%;
        height: 100%;
    }
}
</style>
