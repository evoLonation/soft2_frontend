<template>
  <el-button text @click="dialogVisible = true">
    click to open the Dialog
  </el-button>

  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
  >
    <span>登录到你的账户</span>
    <div style="height: 30px"></div>
    <el-input
        v-model="input1"
        size="large"
        placeholder="用户名/邮箱"
    >
      <template #prefix>
      <el-icon size="large"><search /></el-icon>
      </template>
    </el-input>
    <div style="height: 30px"></div>
    <el-input
        v-model="input1"
        size="large"
        placeholder="密码"
    >
      <template #prefix>
        <el-icon size="large"><search /></el-icon>
      </template>
    </el-input>
    <div>注册新用户</div>
    <el-button type="primary" round style="width: 350px; height: 40px">Primary</el-button>
  </el-dialog>
</template>

<script>
import {ref} from "vue";
export default {
  name: "loginWindow",

  setup(){
    const dialogVisible = ref(false);
    return {
      dialogVisible,
    }
  }
}
</script>

<style scoped>

</style>