<!--矩形边框-->
<template>
  <div class="c-rectangle-border" :style="{...getStyle()}">

  </div>
</template>

<script>
	export default {
		name: 'CRectangleBorder',
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
		methods:{
			getStyle(){
				let showBorder = this.props[0].fields[3].value.value
				let borderColor = this.props[0].fields[4].value.value
				let borderStyle = this.props[0].fields[5].value.value
				let borderRadius = this.props[0].fields[6].value.value
				let backgroundColor = this.props[0].fields[7].value.value
				return {
					'borderWidth': showBorder ? '1px' : '0px',
					'borderColor': borderColor,
					'borderStyle': borderStyle,
					'borderRadius': borderRadius + 'px',
					'backgroundColor': backgroundColor
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
.c-rectangle-border{
    width: 100%;
	height: 100%;
}
</style>