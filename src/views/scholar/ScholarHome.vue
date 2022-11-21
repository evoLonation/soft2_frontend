<template>
  <el-menu
      :default-active="this.activeName.toString()"
      class="navigation"
      @select="this.navigate"
  >
    <el-menu-item index="0">
      <el-icon><HomeFilled /></el-icon>
      <template #title>详情</template>
    </el-menu-item>
    <el-menu-item index="1">
      <el-icon><Reading /></el-icon>
      <template #title>参考文献</template>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><Opportunity /></el-icon>
      <template #title>关系网</template>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><Comment /></el-icon>
      <template #title>评论</template>
    </el-menu-item>
  </el-menu>

  <div class="wrap-paper" @scroll="this.handleScroll">
    <ChartView style="top: 50px"/>
  </div>
</template>

<script>
import ChartView from "./TestNewEchart"

export default {
  name: "ScholarHome",
  components: {
    ChartView,
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  data(){
    return{
      activeName: 0,

    }
  },
  methods: {
    // handleScroll(){
    //   let ele =  document.getElementsByName("part")
    //   for( let i = ele.length - 1; i >= 0 ; i-- ) {
    //     if(window.pageYOffset >= ele[i].offsetTop-50) {
    //       this.activeName = i
    //       break
    //     }
    //   }
    // },
    // navigate(index){
    //   this.activeName = index
    //   let ele =  document.getElementsByName("part")[index]
    //   ele.scrollIntoView({
    //     behavior:"smooth",
    //     block: "start"
    //   })
    // },
  }
}
</script>

<style scoped>
.wrap-paper {
  margin-left: 200px;
}
.navigation{
  position: fixed;
  z-index: 100;
  width: 120px;
  margin-left: 30px;
  margin-top: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06)
}
</style>