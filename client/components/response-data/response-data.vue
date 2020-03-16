<template>
    <div class="response-data">
         <monaco :value="jsonStr" id="response-data"></monaco>
    </div>
</template>

<script>
import Monaco from '../monaco/monaco'
export default  {
   name:'ResponseData',
   data() {
    return {
      
    }
  },
  props:{
    value: Object
  },
  computed:{
    jsonStr(){
      let json = this.value.json
      return json
    }
  },
  mounted(){
  },
  components:{
    Monaco
  }
}
</script>