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
      <span class="center">登录到你的账户</span>
      <div style="height: 30px"></div>
      <el-input
          class="input-box"
          v-model="account"
          size="large"
          placeholder="用户名/邮箱"
      >
        <template #prefix>
          <el-icon size="large"><search /></el-icon>
        </template>
      </el-input>
      <el-input
          class="input-box"
          v-model="password"
          size="large"
          placeholder="密码"
      >
        <template #prefix>
          <el-icon size="large"><search /></el-icon>
        </template>
      </el-input>
      <span @click="viewType=false">注册新用户</span>
      <el-button type="primary" round style="width: 250px; height: 40px" @click="clickLogin">登录</el-button>
    </div>
    <div v-else>
      <span>注册新用户</span>
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
      <el-button type="primary" round style="width: 350px; height: 40px" @click="clickRegister">注册</el-button>
    </div>


  </el-dialog>
</template>

<script>
import {ref} from "vue";
import {loginStore} from "@/store"
import {ElMessage} from "element-plus";
import {
  applyAxios,
  checkLoginAxios,
  fileAxios,
  helpAxios,
  messageAxios,
  paperScholarAxios,
  testAxios,
  userAxios
} from "@/axios";
export default {
  name: "loginWindow",

  setup(){
    const store = loginStore();
    //axios的弹窗拦截器
    const initialInterceptor = (instance) => {
      // 添加响应拦截器
      instance.interceptors.response.use((res) => {return res;},  (error) => {
        console.log(error);
        // 超出 2xx 范围的状态码都会触发该函数。
        const response = error.response;
        if(response.status === 401){
          store.displayLoginWindow = true;
        }else{
          if(response.data.msg !== undefined) {
            ElMessage({message: response.data.msg, type : "warning"});
          }else{
            ElMessage({message: "其他未知错误", type : "warning"});
          }
        }
        return Promise.reject(error);
      });
    }
    initialInterceptor(userAxios);
    initialInterceptor(messageAxios);
    initialInterceptor(applyAxios);
    initialInterceptor(helpAxios);
    initialInterceptor(paperScholarAxios);
    initialInterceptor(fileAxios);
    initialInterceptor(testAxios);
    // 重新设置header头，在初始化和token变化时调用
    const setHeaderAuth =  (token) => {
      checkLoginAxios.defaults.headers.common['Authorization'] = token;
      userAxios.defaults.headers.common['Authorization'] = token;
      messageAxios.defaults.headers.common['Authorization'] = token;
      applyAxios.defaults.headers.common['Authorization'] = token;
      helpAxios.defaults.headers.common['Authorization'] = token;
      paperScholarAxios.defaults.headers.common['Authorization'] = token;
      fileAxios.defaults.headers.common['Authorization'] = token;
      testAxios.defaults.headers.common['Authorization'] = token;
    }

    // true为登录，false为注册
    const viewType = ref(true);
    const account = ref("");
    const password = ref("");
    const login = (userId, nickname, token) => {
      console.log("开始登陆");
      console.log(userId);
      console.log(nickname);
      console.log(token);
      store.isLogin = true;
      store.userId = userId;
      store.nickname = nickname;
      store.token = token;
      store.displayLoginWindow = false;
    }
    const clickLogin = () => {
      userAxios.post("user/login", {
        login_id : account.value,
        password : password.value
      }).then((res) => {
          if(res.data.code === 0){
            login(res.data.user_id, res.data.nick_name, res.data.token);
          }else if(res.data.code === 1){
            ElMessage({message: "用户名/邮箱不存在", type : "warning"});
          }else if(res.data.code === 2){
            ElMessage({message: "密码错误", type : "warning"});
          }
      });
    };
    store.$subscribe((mutation, state) => {
      setHeaderAuth(state.token);
      console.log(state.token);
    });

    const userId = ref("");
    const password1 = ref("");
    const password2 = ref("");
    const nickname = ref("");
    const clickRegister = () => {
      if(password1.value !== password2.value){
        ElMessage({message: "两次输入密码不一致", type : "warning"});
      }else{
        testAxios.post("user/register", {
          "login_id" : userId.value,
          "nickname" : nickname.value,
          "password" : password.value
        }).then((res) => {
          if(res.data.code === 0){
            const data = res.data;
            login(data.user_id, data.nick_name, data.token);
          }else if(res.data.code === 1) {
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
      clickLogin,
      clickRegister,
      viewType,
      store,
    }
  }
}
</script>

<style scoped>
.container{

}
.center{
  margin: auto;
}
.input-box{
  width: 300px;
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>