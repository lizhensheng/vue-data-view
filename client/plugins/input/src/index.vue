<!--test.vue-->
<template>
  <div class="c-input">
    <el-input v-model="props[0].fields[3].value.value" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
export default {
  name: 'CInput',
  data(){
    return {
    }
  },
   props: {
		props:{
			type: Array,
			default: function(){
				return [{
					fields:[]
				}]
			}
		}
	}
}
</script>