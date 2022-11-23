<template>
  <router-view/>
  <button @click="jump">跳转</button>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  methods: {
    jump(){
      this.$router.push({
        path: '/help/myRequest/createRequest',
        params: {
          title:'这篇学术成果的标题',
          author: ['赵正阳', '刘禹宏', '姜星如', '蓝色妖姬', '宇将军'],
          magazine: 'Science' ,
        }
      })
    }
  }
}
</script>

<style></style>
