<template>
  <el-button @click="jump">
    jump
  </el-button>
  <router-view/>
</template>

<script>
import LoginWindow from "@/components/loginWindow";
import qs from 'qs'

export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    LoginWindow,
  },
  methods:{
    jump(){
      this.$router.push(
          {
            name: 'CreateRequest',
            query: {
              title:'这篇学术成果的标题',
              author: qs.stringify(['赵正阳', '刘禹宏', '姜星如', '蓝色妖姬', '宇将军']),
              magazine: 'Science' ,
            }
          });
    }
  }
}
</script>

<style></style>
