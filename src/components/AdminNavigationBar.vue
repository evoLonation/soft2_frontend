<template>
  <div class="outside">
    <div class="up-area">
      <div class="main" @click="toHome">
        金刚石学术
      </div>
      <div class="vice">
        管理员界面
      </div>
    </div>
    <div class="down-area">
      <div class="option" @click="toApplyDeal">
        <div class="content">
          <el-icon class="icon"><Avatar /></el-icon>
          <div>
            学者认证处理
          </div>
        </div>
      </div>
      <div class="option" @click="toComplianDeal">
        <div class="content">
          <el-icon class="icon"><Phone /></el-icon>
          <div>
            应助申诉处理
          </div>
        </div>
      </div>
      <div class="option" @click="toMovePaper">
        <div class="content">
          <el-icon class="icon"><Switch /></el-icon>
          <div>
            文献归属处理
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";

export default {
  name: "AdminNavigationBar",
  setup() {
    const router = useRouter();
    const toMovePaper = () => {
      router.push({name: "MovePaper"});
    }
    const toApplyDeal = () => {
      router.push({name: "ApplyList"});
    }
    const toComplianDeal = () => {
      router.push({name: "ComplainList"});
    }
    const toHome = () => {
      router.push({name: "Home"});
    }
    return{
      toMovePaper,
      toApplyDeal,
      toComplianDeal,
      toHome
    }
  }
}
</script>

<style scoped lang="scss">
.outside{
  box-shadow: 0 0 30px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.08);
  //background-color: #cfe0e8bb;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 1000;
  min-width: 200px;
  height: 100vh;
}
.up-area{
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  .main{
    margin: 30px auto;
    font-size: 20px;
  }
  .main div:hover{
    cursor: pointer;
  }
  .vice{
    margin: auto;
    font-size: 15px;
  }
}
.down-area{
  display: flex;
  flex-direction: column;
  font-size: 13px;
  .option{
    height: 50px;
    margin: 0;
    display: flex;
    .content{
      font-size: 15px;
      display: flex;
      margin: auto auto auto 30px;
      .icon{
        width: 15px;
        margin: auto;
      }
      div{
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 15px;
      }
    }
  }
  .option:hover{
    background-color: #8fd0d8;
    transition:  .6s ease;
    cursor: pointer;
  }
}
</style>