<template>
<p>{{query}}</p>
</template>

<script>
import {  useRoute } from 'vue-router'
import {ref} from "vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "test",
  setup(){
    const query = ref(useRoute().query);
    return{
      query
    }
  }
}
</script>

<style scoped>

</style>