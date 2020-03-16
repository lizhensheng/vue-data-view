<!--test.vue-->
<template>
  <div class="c-text" :style="{...getTextStyle(props[0].fields)}">
    {{getText(props[0].fields)}}
  </div>
</template>

<script>
	import {ALIGNMENT} from '../../../common/js/vars'
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
			},
			name: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				defaultStyle: {
					height: 40
				}
			}
		},
		methods:{
			getTextStyle(item){
				let lineHeight = item[4].value[0].value.value
				let alignment = item[4].value[1].value.value
				return {
					'line-height': lineHeight + 'px',
					'text-align': ALIGNMENT[alignment]
				}
			},
			getText(item){
				return item[3].value.value
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
