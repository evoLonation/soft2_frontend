<template>
  <div class="navigation-bar-root" :class="{opacity: navigationState.isOpacity, 'no-opacity': !navigationState.isOpacity}">
    <div class="valid-content">
      <div class="left-area" @click="toHomeView" >
        <p style="font-size: 20px;line-height: 25px;margin: 0;color:#337ecc" v-if="navigationState.isDisplaySearchBox">金刚石学术</p>
      </div>
      <div class="mid-area">
        <search-box v-if="navigationState.isDisplaySearchBox"></search-box>
      </div>
      <div class="right-area" >
        <div  class="avatar">
          <el-avatar v-if="store.isLogin" :size="40" :src="store.avatarUrl"></el-avatar>
        </div>
        <div @click="toUserView" :class="{'opacity-text': navigationState.isOpacity, 'no-opacity-text' : !navigationState.isOpacity}">
          {{nickname}}
        </div>
        <div @click="toHelpView" :class="{'opacity-text': navigationState.isOpacity, 'no-opacity-text' : !navigationState.isOpacity}">
          文献互助
        </div>
        <div @click="toMessageView" :class="{'opacity-text': navigationState.isOpacity, 'no-opacity-text' : !navigationState.isOpacity}">
          消息通知
        </div>
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
      toHomeView,
      store
    }
  },
}
</script>

<style scoped>
.navigation-bar-root{
  height: 60px;
  z-index: 1000;

}
.valid-content{
  margin: auto;
  height: 60px;
  width: 1690px;
  display: flex;
}
.avatar{
  width: 40px;
}
.opacity{
  background-color: #ecf5ff00;
}
.no-opacity{
  background-color: #ffffff;
  box-shadow: 0 0 30px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.08);
  /*border-bottom: 1px solid #b0b2b3;*/
}
.left-area{
  margin: auto auto auto 30px;
  width: 200px;
}
.left-area:hover{
  cursor: pointer;
}
.mid-area{
  margin: auto;
}
.right-area{
  display: flex;
  margin: auto 30px auto auto;
  /*width: 40px;*/
}
.right-area > *{
  margin: auto 10px auto 10px;
}
.opacity-text{
  font-weight: bold;
  color: #ecf5ff;
  font-size: 14px;
}
.opacity-text:hover{
  cursor: pointer;
  font-weight: bold;
  color: #ecf5ffaa;
}
.no-opacity-text{
  font-size: 14px;
  color: #679da8;
}
.no-opacity-text:hover{
  color: #daebe8cc;
  cursor: pointer;
}

</style>