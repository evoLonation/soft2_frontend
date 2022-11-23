<template>
  <div class="navigation-bar-root" :class="{opacity: !isHomeTop}">
    <div class="left-area">
      <p style="font-size: 25px;line-height: 25px;margin: 0">学术成果分享平台</p>
    </div>
    <div class="mid-area">
      <search-box v-if="!isHomeTop"></search-box>
    </div>
    <div class="right-area">
      <el-avatar class="avatar" :size="30"></el-avatar>
      <div @click="toUserView">
        赵正阳
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

export default {
  name: "NavigationBar",
  components: {},
  props: {
    isHomeTop : Boolean,
  },
  setup(){
    const router = useRouter();
    const toUserView = () => {
      router.push({name: "userInfo"});
    }
    const toMessageView = () => {
      router.push({name: "message"});
    }
    const toHelpView = () => {
      router.push({name : "help"});
    }


    return {
      toHelpView,
      toUserView,
      toMessageView,
    }
  },
}
</script>

<style scoped>
.navigation-bar-root{
  display: flex;
  height: 50px;
  border: 1px solid #b0b2b3;
  margin: 0;
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
  font-size: 10px;
}
.right-area > div:hover{
  color: #007dfa;
}
.opacity{
  opacity: 100%;
  background-color: #007dfa;
}

</style>