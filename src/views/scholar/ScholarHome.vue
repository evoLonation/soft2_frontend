<template>
  <el-container>
      <el-aside class="navigation">
        <el-menu
            :default-active="this.activeName.toString()"
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
    </el-aside>

    <el-main class="wrap-paper" @scroll="this.handleScroll">
      <div class="style_need">
        <InfoView style="margin-top: 10px"/>
        <OpView style="margin-top: 10px"/>
      </div>
      <div class="style_need">
        <ChartView style="margin-top: 40px"/>
        <RelView style="margin-top: 40px"/>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import ChartView from "./Static/TestNewEchart"
import InfoView from "./Basic/BasicInfo"
import OpView from "./Operator/MyOperator"
import RelView from "./Relations/MyRelations"

export default {
  name: "ScholarHome",
  components: {
    ChartView,
    InfoView,
    OpView,
    RelView,
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
  margin-left: 150px;
}

.navigation{
  position: fixed;
  z-index: 100;
  width: 120px;
  margin-left: 30px;
  margin-top: 30px;
  border-radius: 10px;
  box-shadow: 0 0 4px rgba(0,0,0,0.40),0 0 6px rgba(0,0,0,0.15);
}

.style_need {
  display: flex;
}
</style>