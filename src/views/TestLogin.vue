<template>
  <button @click="quitLogin">点击退出登录</button>
  <button @click="checkJwt">点击检查jwt</button>
  <p>{{loginState}}</p>
  <p>{{store}}</p>
  <button style="z-index: 100;" @click="$router.push({name:'Home'})">gotohome</button>
</template>

<script>
import {loginStore} from "@/store";
import axios from "axios";
import {testAxios} from "@/axios";

export default {
  name: "TestLogin",
  setup(){
    const loginState = loginStore();
    const quitLogin = () => {
      loginState.isLogin = false;
      loginState.token = "";
      axios.defaults.headers.common['Authorization'] = loginStore().token;
    }
    const checkJwt = () => {
      testAxios.post('check-jwt').then((res) => {
        console.log(res);
        console.log("检查成功");
      });
    }
    const store = loginStore();
    return {
      loginState,
      quitLogin,
      checkJwt,
      store,
    }
  }
}
</script>

<style scoped>

</style>