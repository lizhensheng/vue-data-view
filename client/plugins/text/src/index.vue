<!--test.vue-->
<template>
  <div class="c-text" :style="{...getTextStyle(props[0].fields)}">
    {{dataTrigger}}
  </div>
</template>

<script>
	import componentRefresh from '@/mixins/componentRefresh'
	import {ALIGNMENT} from '@/common/js/vars'
	export default {
		name: 'CText', 
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
		mixins: [componentRefresh],
		mounted(){
		},
		computed:{
			dataTrigger(){
				if(this.props[1].fields[0].value.dataJson.json){
					return this.getResult(this.props[1].fields[0].value.dataJson.json)
				}
				else{
					return this.props[0].fields[3].value.value
				}
			}
		},
		methods:{
			getTextStyle(item){
				let lineHeight = item[4].value[0].value.value
				let alignment = item[4].value[1].value.value
				let fontSize = item[4].value[2].value.value
				let fontColor = item[4].value[3].value.value
				return {
					'line-height': lineHeight + 'px',
					'text-align': ALIGNMENT[alignment],
					'font-size': fontSize + 'px',
					'color': fontColor
				}
			},
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
				let field = model[0].field
				let mapping =model[0].mapping
				let key = mapping || field
				return jsonArray.length > 0 ? jsonArray[0][key] : ''
			}
		}
	}
</script>

<style lang="stylus" scoped>
.c-text{
	overflow: hidden;
	text-overflow: clip;
	white-space: nowrap;
}
</style>
