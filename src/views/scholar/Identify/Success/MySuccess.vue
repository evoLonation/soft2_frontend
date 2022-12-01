<template>
  <div style="display: inline-block; width: 100%">
    <p style="width: 100%; font-weight: 700; text-align: center; margin-top: 80px">您的认证已经提交，请耐心等待</p>
    <el-button style="align-items: center; margin-top: 40px; margin-left: 43%" type="primary" @click="this.$router.push({name: 'Scholar'})">返回学者主页</el-button>
  </div>
</template>

<script>
export default {
  name: "MySuccess"
}
</script>

<style scoped>

</style>