<template>
  <div class="navigation-bar-root" :class="{opacity: navigationState.isOpacity, 'no-opacity': !navigationState.isOpacity}">
    <div class="left-area" @click="toHomeView">
      <p style="font-size: 25px;line-height: 25px;margin: 0">学术成果分享平台</p>
    </div>
    <div class="mid-area">
      <search-box v-if="navigationState.isDisplaySearchBox"></search-box>
    </div>
    <div class="right-area">
      <el-avatar class="avatar" :size="40"></el-avatar>
      <div @click="toUserView">
        {{nickname}}
      </div>
      <div @click="toHelpView">
        文献互助
      </div>
      <div @click="toMessageView">
        消息通知
      </div>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import {loginStore, navigationStore} from "@/store";
import {ref} from "vue";

export default {
  name: "NavigationBar",
  components: {},
  props: {
    isHomeTop : Boolean,
  },
  setup(){
    const store = loginStore();

    const router = useRouter();
    const toUserView = () => {
      store.checkLogin().then((res) => {
        if(res){
          router.push({name: "UserInfo"});
        }else{
          store.displayLoginWindow = true;
        }
      });
    }
    const toMessageView = () => {
      store.checkLogin().then((res) => {
        if(res){
          router.push({name: "Message"});
        }else{
          store.displayLoginWindow = true;
        }
      });
    }
    const toHelpView = () => {
      store.checkLogin().then((res) => {
        if(res){
          router.push({name: "Help"});
        }else{
          store.displayLoginWindow = true;
        }
      });
    }
    const toHomeView = () =>{
      router.push({name: "Home"});
    }


    const nickname = ref('');

    const setNickName = () => {
      if(store.isLogin){
        nickname.value = store.nickname;
      }else{
        nickname.value = "点击登录";
      }
    }
    //初始化
    store.checkLogin().then(() => {
        setNickName();
    });

    store.$subscribe(() => {
      setNickName();
      console.log("navigation bar : state change");
    });

    const navigationState = navigationStore();
    router.beforeEach(() => {
      navigationState.isDisplaySearchBox = true;
      navigationState.isOpacity = false;
    });

    return {
      toHelpView,
      toUserView,
      toMessageView,
      nickname,
      navigationState,
      toHomeView
    }
  },
}
</script>

<style scoped>
.navigation-bar-root{
  min-width: 1500px;
  display: flex;
  height: 60px;
  margin: 0;
  z-index: 1000;

}
.opacity{
  background-color: #ecf5ff00;
}
.no-opacity{
  background-color: #ecf5ffff;
  box-shadow: 0 0 4px rgba(0,0,0,0.40),0 0 6px rgba(0,0,0,0.15);
  border-bottom: 1px solid #b0b2b3;

}
.left-area{
  margin: auto auto auto 30px;
}
.mid-area{
  margin: auto;
}
.right-area{
  display: flex;
  margin: auto 30px auto auto;
}
.right-area > *{
  margin: auto 10px auto 10px;
}
.right-area > div{
  font-size: 14px;
}
.right-area > div:hover{
  color: #007dfa;
}
.opacity{
  /*opacity: 100%;*/
  /*background-color: #007dfa;*/
}

</style>