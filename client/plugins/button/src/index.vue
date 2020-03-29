<!--button.vue-->
<template>
   <el-button type="primary" @click="onClick">{{props[0].fields[3].value.value}}</el-button>
</template>

<script>
import bus from '@/eventBus/index'
export default {
	name: 'CButton',
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
	methods: {
		onClick(){
			let eventData = this.props[1].fields[0].value.value
			bus.$emit('button-click', eventData)
		}
	}
}
</script>