<!--test.vue-->
<template>
  <div class="c-text">
    {{name}}
  </div>
</template>

<script>
	export default {
		name: 'CText', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
		props: {
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
		}
	}
</script>

<style lang="scss" scoped>

</style>
