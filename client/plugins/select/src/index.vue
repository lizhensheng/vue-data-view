<template>
    <div>
        <el-select v-model="props[0].fields[3].value.value" placeholder="请选择" clearable >
            <el-option
                v-for="item in this.dataTrigger"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
        </el-select>
    </div>
</template>

<script>
import componentRefresh from '@/mixins/componentRefresh'
export default {
    name:'CSelect',
    data() {
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
		}
   },
   computed:{
        dataTrigger(){
            if(this.props[1].fields[0].value.dataJson.json){
                let result = this.props[1].fields[0].value.dataJson.json
                return this.getResult(result)
            }
            else{
                return []
            }
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
            let fieldLabel = model[0].field
            let mappingLabel =model[0].mapping
            let keyLabel = mappingLabel || fieldLabel

            let fieldValue = model[1].field
            let mappingValue =model[1].mapping
            let keyValue = mappingValue || fieldValue

            if(jsonArray.length > 0){
                let outJson = []
                jsonArray.forEach(element => {
                    outJson.push({
                        label: element[keyLabel],
                        value: element[keyValue]
                    })
                })
                return outJson
            }
            else {
                return jsonArray
            }
        }
    }
}
</script>