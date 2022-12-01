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
    <div style="display: flex">
      <Info name="part"></Info>
      <Operation></Operation>
    </div>
    <Reference name="part"></Reference>
    <RelationNet name="part"></RelationNet>
    <PaperComment name="part"></PaperComment>
  </div>
</template>

<script>
import Info from "@/views/paper/Info/Info";
import RelationNet from "@/views/paper/RelationNet/RelationNet";
import Operation from "@/views/paper/Side/Operation";
import Reference from "@/views/paper/Reference/Reference";
import PaperComment from "@/views/paper/Comment/Comment";
import {HomeFilled, Opportunity, Comment,  Reading} from "@element-plus/icons";
import PaperInfo from "@/views/paper/Data/PaperInfo";
import { useRoute } from "vue-router";
import {paperStore} from "@/store";
import {onBeforeMount} from "vue";
import {paperScholarAxios, userAxios} from "@/axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Paper",
  components: {Opportunity, HomeFilled, Reading, Comment, Reference, Operation, RelationNet, Info, PaperComment},
  props: [],
  setup() {//读路由参调用接口，用接口获取详情和关系网并存入state，子组件mount时再从state获取
    // eslint-disable-next-line no-unused-vars
    const router = useRoute();
    const store = paperStore();
    onBeforeMount(()=>{
      const paperId = router.params.paperId;
      store.paperId = paperId
      let got = false
      paperScholarAxios.post('paper/', {
        "id": paperId,
      }).then((res) => {
        store.paperInfo = res.data
        got = true
      })
      if (!got){
        store.paperInfo = PaperInfo.info
        console.log('未获取到详情，使用本地测试数据')
      }
      got = false
      userAxios.post('paper/is-star', {
        "paper_id": paperId
      }).then(res=>{
        got = true
        store.paperInfo.starred = res.data.is_star
      })
      if (!got){
        console.log('未获取或未登录，默认没有收藏过')
        store.paperInfo.starred = 1
      }
    })
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
  watch: {
    '$route' () {
      // 路由发生变化页面刷新
      this.$router.go(0);
    }
  },
}
</script>

<style scoped>
.wrap-paper {
  margin-top: 2%;
  margin-left: 13%;
  margin-right: 13%;
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