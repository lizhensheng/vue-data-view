<!--button.vue-->
<template>
  <div class="c-button">
    {{text}}
  </div>
</template>

<script>
	export default {
		name: 'CButton', // 这个名字很重要，它就是未来的标签名
		props: {
			text: {
				type: String,
				default: '按 钮'
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
