<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in  dataTrigger" :key="index">
            <a v-if="item.href" :href="item.href">{{item.title}}</a>
            <span v-else>{{item.title}}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
const DATA = [{href: '/', title: '首页'}]
export default {
    name: 'CBreadcrumb',
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
                return DATA
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
            let fieldHref = model[0].field
            let mappingHref =model[0].mapping
            let keyHref = mappingHref || fieldHref

            let fieldTitle = model[1].field
            let mappingTitle =model[1].mapping
            let keyTitle = mappingTitle || fieldTitle

            if(jsonArray.length > 0){
                let outJson = []
                jsonArray.forEach(element => {
                    outJson.push({
                        href: element[keyHref],
                        title: element[keyTitle]
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