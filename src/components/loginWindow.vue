<template>
<!--  <el-button text @click="dialogVisible = true">-->
<!--    click to open the login dialog-->
<!--  </el-button>-->

  <el-dialog
      v-model="store.displayLoginWindow"
      title="Tips"
      width="450px"
      :show-close="false"
      :center="true"
      style="border-radius: 15px"
  >
    <template #header>
      <div class="header">
        <span >{{viewType?"登录到你的账户":"注册新用户"}}</span>
      </div>
    </template>
    <div v-if="viewType" class="content">
      <el-input
          class="input"
          v-model="loginInput.login_id"
          size="large"
          placeholder="用户名/邮箱"
          input-style="height: 50px;"
      >
        <template #prefix>
          <el-icon size="large"><search /></el-icon>
        </template>
      </el-input>
      <el-input
          class="input"
          v-model="loginInput.password"
          size="large"
          placeholder="密码"
          input-style="height: 50px;"
      >
        <template #prefix>
          <el-icon size="large"><search /></el-icon>
        </template>
      </el-input>
      <span @click="viewType=false" class="side">注册新用户</span>
      <el-button type="primary" round class="button" @click="clickLogin">登录</el-button>
    </div>
    <div v-else class="content">
      <el-input
          v-model="registerInput.login_id"
          size="large"
          placeholder="用户名"
          class="input"
          input-style="height: 50px;"
      >
        <template #prefix>
          <el-icon size="large"><search /></el-icon>
        </template>
      </el-input>
      <el-input
          v-model="registerInput.password1"
          size="large"
          placeholder="密码"
          class="input"
          input-style="height: 50px;"
      >
        <template #prefix>
          <el-icon size="large"><search /></el-icon>
        </template>
      </el-input>
      <el-input
          v-model="registerInput.password2"
          size="large"
          placeholder="确认密码"
          class="input"
          input-style="height: 50px;"

      >
        <template #prefix>
          <el-icon size="large"><search /></el-icon>
        </template>
      </el-input>
      <el-input
          v-model="registerInput.nickname"
          size="large"
          placeholder="昵称"
          class="input"
          input-style="height: 50px;"
      >
        <template #prefix>
          <el-icon size="large"><search /></el-icon>
        </template>
      </el-input>
      <div @click="viewType=true" class="side">已有帐户?登录</div>
      <el-button type="primary" round  @click="clickRegister" class="button">注册</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {ref, reactive} from "vue";
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
      console.log("set header auth down, key:")
      console.log(token)
    }
    setHeaderAuth(store.token);

    // true为登录，false为注册
    const viewType = ref(true);

    const loginInput = reactive({
      login_id : "",
      password : "",
    });

    const clickLogin = () => {
      console.log("发送登录请求")
      userAxios.post("user/login", {
        login_id : loginInput.login_id,
        password : loginInput.password
      }).then((res) => {
          if(res.data.code === 0){
            store.login(res.data.user_id, res.data.nick_name, res.data.token, res.data.avatar_url);
          }else if(res.data.code === 1){
            ElMessage({message: "用户名/邮箱不存在", type : "warning"});
          }else if(res.data.code === 2){
            ElMessage({message: "密码错误", type : "warning"});
          }
      });
    };
    store.$onAction(({store, after,}) => {
      after(() => {
        console.log("after login, store.token is " + store.token);
        setHeaderAuth(store.token);
      });
    });
    const registerInput = reactive({
      login_id : "",
      password1 : "",
      password2 : "",
      nickname : "",
    });
    const clickRegister = () => {
      if(registerInput.password1 !== registerInput.password2){
        ElMessage({message: "两次输入密码不一致", type : "warning"});
      }else{
        userAxios.post("user/register", {
          login_id : registerInput.login_id,
          nickname : registerInput.nickname,
          password : registerInput.password1,
        }).then((res) => {
          if(res.data.code === 0){
            const data = res.data;
            store.login(data.user_id, data.nick_name, data.token, data.avatar_url);
          }else if(res.data.code === 1) {
            ElMessage({message: "用户名已存在", type : "warning"});
          }
        })
      }
    };

    return {
      loginInput,
      registerInput,
      clickLogin,
      clickRegister,
      viewType,
      store,
    }
  }
}
</script>

<style scoped>
.header{
  font-size: 20px;
  margin-top: 20px;
  /*margin-bottom: 10px;*/
}
.content{
  margin: auto;
  width: 300px;
  display: flex;
  flex-direction: column;
}
.input{
  width: 300px;
  margin: 15px auto;
}
.button{
  height: 50px;
  margin: 20px auto;
  width: 300px;
}
.side{
  margin-left: auto;
  color: #b0b2b3;
}
.side:hover{
  text-decoration: underline;
  cursor: pointer;
}
.container{
  display: flex;
  flex-direction: column;
  align-content: center;
}
.center{
  text-align: center;
  margin: auto;
}
.input-inside{
  height: 60px;
}

</style>