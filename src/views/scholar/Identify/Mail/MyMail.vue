<template>
  <div style="display: inline-block; width: 100%">
    <div style="width: 100%">
      <el-input class="mail-content" placeholder="请输入您的邮箱"/>
    </div>
    <div style="display: flex; width: 100%">
      <el-input class="mail-content" style="margin-right: 0; width: 260px" placeholder="请输入验证码"/>
      <el-button class="code-button" style="height: 40px;">获取验证码</el-button>
    </div>
    <el-button type="primary" style="height: 40px; margin: 50px auto auto 43%" @click="changeFather">提交申请</el-button>
  </div>
</template>

<script>
export default {
  name: "MyMail",
  methods: {
    changeFather() {
      this.$emit('activate');
    }
  }
}
</script>

<style lang="scss">
.mail-content {
  width: 400px;
  height: 40px;
  margin: 50px auto auto 25%;
  .el-input__wrapper {
    border-radius: 5px !important;
  }
}

.code-button {
  margin: 50px auto auto 40px;
}
</style>