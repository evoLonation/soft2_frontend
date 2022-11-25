<template>
<!--  <el-button text @click="dialogVisible = true">-->
<!--    click to open the login dialog-->
<!--  </el-button>-->

  <el-dialog
      v-model="store.displayLoginWindow"
      title="Tips"
      width="30%"
  >
    <div v-if="viewType">
      <span>登录到你的账户</span>
      <div style="height: 30px"></div>
      <el-input
          v-model="account"
          size="large"
          placeholder="用户名/邮箱"
      >
        <template #prefix>
          <el-icon size="large"><search /></el-icon>
        </template>
      </el-input>
      <div style="height: 30px"></div>
      <el-input
          v-model="password"
          size="large"
          placeholder="密码"
      >
        <template #prefix>
          <el-icon size="large"><search /></el-icon>
        </template>
      </el-input>
      <span @click="viewType=false">注册新用户</span>
      <el-button type="primary" round style="width: 350px; height: 40px" @click="login">登录</el-button>
    </div>
    <div v-else>


      <span>注册</span>
      <div style="height: 30px"></div>
      <el-input
          v-model="userId"
          size="large"
          placeholder="用户名"
      >
        <template #prefix>
          <el-icon size="large"><search /></el-icon>
        </template>
      </el-input>
      <div style="height: 30px"></div>
      <el-input
          v-model="password1"
          size="large"
          placeholder="密码"
      >
        <template #prefix>
          <el-icon size="large"><search /></el-icon>
        </template>
      </el-input>
      <el-input
          v-model="password2"
          size="large"
          placeholder="确认密码"
      >
        <template #prefix>
          <el-icon size="large"><search /></el-icon>
        </template>
      </el-input>
      <el-input
          v-model="nickname"
          size="large"
          placeholder="昵称"
      >
        <template #prefix>
          <el-icon size="large"><search /></el-icon>
        </template>
      </el-input>
      <div @click="viewType=true">已有帐户?登录</div>
      <el-button type="primary" round style="width: 350px; height: 40px" @click="register">注册</el-button>
    </div>


  </el-dialog>
</template>

<script>
import {ref} from "vue";
import axios from "axios"
import {loginStore} from "@/store"
import {ElMessage} from "element-plus";
export default {
  name: "loginWindow",

  setup(){

    const store = loginStore();
    // true为登录，false为注册
    const viewType = ref(true);

    const account = ref("");
    const password = ref("");
    const login = () => {
      console.log("我应该点击登陆了啊");
      axios.post("get-jwt", {
        user_id : account.value,
        password : password.value
      }).then((res) => {
        if(res.data.code === 0){
          store.token = res.data.token;
          store.userId = res.data.user_id;
          store.nickname = res.data.nickname;
          store.displayLoginWindow = false;
          store.isLogin = true;
          axios.defaults.headers.common['Authorization'] = loginStore().token;
        }else if(res.data.code === 1){
          ElMessage({message: "用户名/邮箱不存在", type : "warning"});
        }else if(res.data.code === 2){
          ElMessage({message: "密码错误", type : "warning"});
        }
      });
    };


    const userId = ref("");
    const password1 = ref("");
    const password2 = ref("");
    const nickname = ref("");
    const register = () => {
      if(password1.value !== password2.value){
        ElMessage({message: "两次输入密码不一致", type : "warning"});
      }else{
        axios.post("register", {
          "userId" : userId.value,
          "nickname" : nickname.value,
          "password" : password.value
        }).then((res) => {
          if(res.data.code === 0){
            store.token = res.data.token;
            store.userId = res.data.user_id;
            store.nickname = res.data.nickname;
            store.displayLoginWindow = false;
            store.isLogin = true;
            axios.defaults.headers.common['Authorization'] = loginStore().token;
          }else if(res.data.code === 1){
            ElMessage({message: "用户名已存在", type : "warning"});
          }
        })
      }
    };

    return {
      account,
      password,
      userId,
      nickname,
      password1,
      password2,
      login,
      register,
      viewType,
      store,
    }
  }
}
</script>

<style scoped>

</style>