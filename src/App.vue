<template>
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
  provide (){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
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
    },
    reload (){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style></style>
