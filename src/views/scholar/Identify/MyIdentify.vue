<template>
  <div style="width: 100%;">
    <div class="identify">
      <el-steps :active="active" align-center style="padding-top: 50px">
        <el-step title="选择方式" icon="Edit" @click="reset" style="cursor: pointer"/>
        <el-step title="填写内容" icon="Upload"/>
        <el-step title="认证完成" icon="Picture"/>
      </el-steps>
      <select-view @activate="branch_activate" v-show="active === 1"/>
      <mail-view ref="mail" @activate="mailIdentify" v-if="active === 2 && branch === 1"/>
      <id-view ref="id" :scholar-id="this.scholar_id" @activate="idIdentify" v-if="active === 2 && branch === 2"/>
      <success-view v-show="active === 3"/>
    </div>
  </div>
</template>

<script>
import selectView from "./Selection/MySelect"
import idView from "./ID_upload/MainWnd"
import successView from "./Success/MySuccess"
import mailView from "./Mail/MyMail"
import {applyAxios, fileAxios} from "@/axios";

export default {
  name: "MyIdentify",
  components: {
    idView,
    selectView,
    successView,
    mailView
  },
  data() {
    return {
      bounce: true,
      active: 1,
      branch: -1,
      scholar_id: '',
    }
  },
  methods: {
    branch_activate(select) {
      this.branch = select;
      this.activate();
    },
    activate() {
      if(this.active < 3) {
        this.active = this.active + 1;
      }
    },
    mailIdentify(email, viaCode) {
      let msg = null;
      applyAxios.post('scholar/email-identify/', {
        "email" : email,
        "scholar_id": this.scholar_id,
        "verify_code" : viaCode,
      }).then((res) => {
        msg = res.data.msg;
        if(msg === "验证码正确!") {
          this.activate();
        }
        else {
          this.$message.warning(msg);
        }
      })
    },
    async idIdentify(formList) {
      await fileAxios.post('scholar/file-identify/', formList);
      this.activate();
    },
    reset() {
      if(this.active === 2) {
        this.active = 1;
        this.branch = -1;
      }
    }
  },
  created() {
    this.scholar_id = this.$route.params.scholarId;
  }
}
</script>

<style scoped>
.identify {
  width: 800px;
  min-width: 800px;
  max-width: 800px;
  height: 500px;
  margin: 100px auto auto auto;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 14px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
}
</style>
