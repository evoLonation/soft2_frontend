<template>
  <el-container style="margin: auto; width: 1400px;">
      <el-aside class="navigation">
        <el-menu
            :default-active="this.activeName.toString()"
            @select="this.navigate"
        >
          <el-menu-item index="0">
            <el-icon><HomeFilled /></el-icon>
            <template #title>基本信息</template>
          </el-menu-item>
          <el-menu-item index="1">
            <el-icon><TrendCharts /></el-icon>
            <template #title>成果统计</template>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><Aim /></el-icon>
            <template #title>学者关系</template>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><Reading /></el-icon>
            <template #title>论文列表</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><Histogram /></el-icon>
            <template #title>领域贡献</template>
          </el-menu-item>
        </el-menu>
    </el-aside>

    <el-main class="wrap-paper" @scroll="this.handleScroll">
      <div class="style_need">
        <InfoView name="part" style="margin-top: 10px" :scholar_id="scholar_id"/>
        <OpView style="margin-top: 10px" :scholar_id="scholar_id"/>
      </div>
      <div class="style_need">
        <ChartView :scholar-id="this.scholar_id" name="part" style="margin-top: 30px"/>
        <RelView :scholar-id="this.scholar_id" name="part" style="margin-top: 30px"/>
      </div>
      <div class="style_need">
        <PaperView name="part" style="margin-top: 30px"/>
        <PieView name="part" style="margin-top: 30px"/>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import ChartView from "./Static/TestNewEchart"
import InfoView from "./Basic/BasicInfo"
import OpView from "./Operator/MyOperator"
import RelView from "./Relations/MyRelations"
import PieView from "./Pie/MyContribution"
import PaperView from "./Paper/PaperList"
import {Reading, TrendCharts, Aim, Histogram} from "@element-plus/icons";

export default {
  name: "ScholarHome",
  components: {
    Histogram,
    Reading,
    TrendCharts,
    ChartView,
    InfoView,
    OpView,
    RelView,
    PieView,
    PaperView,
    Aim
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  data(){
    return{
      activeName: 0,
      scholar_id: '',
    }
  },
  methods: {
    handleScroll(){
      let ele =  document.getElementsByName("part")
      for( let i = ele.length - 1; i >= 0 ; i-- ) {
        if(window.pageYOffset >= ele[i].offsetTop-50) {
          this.activeName = i
          break
        }
      }
    },
    navigate(index){
      this.activeName = index
      let ele =  document.getElementsByName("part")[index]
      ele.scrollIntoView({
        behavior:"smooth",
        block: "start"
      })
    },
  },
  created() {
    this.scholar_id = this.$route.params.scholarId;
  }
}
</script>

<style scoped>
.wrap-paper {
  /*margin-left: 150px;*/
}

.navigation{
  position: fixed;
  z-index: 100;
  width: 130px;
  margin-left: -85px;
  margin-top: 30px;
  border-radius: 5px;
  box-shadow: 0 0 4px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
}

.style_need {
  display: flex;
}
</style>