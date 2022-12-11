<template>
  <div style="display: inline-block; width: 100%">
    <div style="width: 100%">
      <el-input v-model="email" class="mail-content" placeholder="请输入您的邮箱"/>
    </div>
    <div style="display: flex; width: 100%">
      <el-input v-model="viaCode" class="mail-content" style="margin-right: 0; width: 260px" placeholder="请输入验证码"/>
      <el-button @click="getViaCode" class="code-button" style="height: 40px;">获取验证码</el-button>
    </div>
    <el-button type="primary" style="height: 40px; margin: 50px auto auto 43%" @click="changeFather">提交申请</el-button>
  </div>
</template>

<script>
import {applyAxios} from "@/axios";

export default {
  name: "MyMail",
  data() {
    return {
      email: null,
      viaCode: null,
    }
  },
  methods: {
    changeFather() {
      this.$emit('activate', this.email, this.viaCode);
    },
    getViaCode() {
      applyAxios.post('scholar/email-verify-code/', {
        "email": this.email
      }).then(() => {
        this.$message.success("验证码发送成功！");
      })
    },
    mailIdentify() {
      let msg = null;
      applyAxios.post('scholar/email-identify', {
        "email" : this.email,
        "scholar_id" : this.scholar_id,
        "verify_code" : this.viaCode,
      }).then((res) => {
        msg = res.data.msg;
      })
      if(msg !== null) {
        this.$message.warning(msg);
      }
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