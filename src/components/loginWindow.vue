<template>
  <el-button text @click="dialogVisible = true">
    click to open the login dialog
  </el-button>

  <el-dialog
      v-model="dialogVisible"
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
import {useStore} from "@/store"
import {ElMessage} from "element-plus";
export default {
  name: "loginWindow",

  setup(){
    const dialogVisible = ref(false);

    // 添加响应拦截器
    axios.interceptors.response.use(null, function (error) {
      // 超出 2xx 范围的状态码都会触发该函数。
      const response = error.response;
      if(response.status === 401 && response.data.needLogin === true){
        dialogVisible.value = true;
      }else{
        if(response.data.msg !== undefined){
          ElMessage({message: response.data.msg, type : "warning"});
        }else{
          ElMessage({message: "其他未知错误", type : "warning"});
        }
      }
    });
    // 添加默认请求配置
    axios.defaults.headers.common['HTTP2_HEADER_AUTHORIZATION'] = "";

    const store = useStore();
    // true为登录，false为注册
    const viewType = ref(true);

    const account = ref("");
    const password = ref("");
    const login = () => {
      axios.post("login", {
        "account" : account.value,
        "password" : password.value
      }).then((res) => {
        if(res.data.code === 0){
          store.token = res.headers['HTTP2_HEADER_AUTHORIZATION'];
          store.userId = res.data.userId;
          store.nickname = res.data.nickname;
          dialogVisible.value = false;
        }else if(res.data.code === 1){
          ElMessage({message: "用户名/邮箱不存在", type : "warning"});
        }else if(res.data.code === 2){
          ElMessage({message: "密码错误", type : "warning"});
        }
      })
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
            store.token = res.headers['HTTP2_HEADER_AUTHORIZATION'];
            store.userId = res.data.userId;
            store.nickname = res.data.nickname;
            dialogVisible.value = false;
          }else if(res.data.code === 1){
            ElMessage({message: "用户名已存在", type : "warning"});
          }
        })
      }
    };

    return {
      dialogVisible,
      account,
      password,
      userId,
      nickname,
      password1,
      password2,
      login,
      register,
      viewType
    }
  }
}
</script>

<style scoped>

</style>