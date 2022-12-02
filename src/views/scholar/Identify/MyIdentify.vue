<template>
  <div style="width: 100%;">
    <div class="identify">
      <el-steps :active="active" align-center style="padding-top: 50px">
        <el-step title="选择方式" icon="Edit" @click="reset" style="cursor: pointer"/>
        <el-step title="填写内容" icon="Upload"/>
        <el-step title="认证完成" icon="Picture"/>
      </el-steps>
      <select-view @activate="branch_activate" v-show="active === 1"/>
      <mail-view ref="mail" @activate="activate" v-if="active === 2 && branch === 1"/>
      <id-view ref="id" @activate="activate" v-if="active === 2 && branch === 2"/>
      <success-view v-show="active === 3"/>
    </div>
  </div>
</template>

<script>
import selectView from "./Selection/MySelect"
import idView from "./ID_upload/MainWnd"
import successView from "./Success/MySuccess"
import mailView from "./Mail/MyMail"

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
    }
  },
  methods: {
    branch_activate(select) {
      this.branch = select;
      this.activate();
      console.log(this.active, this.branch)
    },
    activate() {
      if(this.active < 3) {
        this.active = this.active + 1;
      }
    },
    reset() {
      if(this.active === 2) {
        this.active = 1;
        this.branch = -1;
      }
    }
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
