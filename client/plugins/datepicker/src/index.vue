<template>
     <el-date-picker
        v-model="props[0].fields[3].value.value"
        type="date"
        placeholder="选择日期">
    </el-date-picker>
</template>

<script>
export default {
    name: 'CDate',
    data(){
        return {
            dateValue: ''
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