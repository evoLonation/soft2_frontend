<template>
  <el-container style="margin: auto; width: 1560px">
    <el-menu
        :default-active="this.activeName.toString()"
        class="navigation"
        active-text-color="#87bdd8"
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
        <template #title>参考关系网</template>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><InfoFilled /></el-icon>
        <template #title>相似文献</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><Opportunity /></el-icon>
        <template #title>相似关系网</template>
      </el-menu-item>
      <el-menu-item index="5">
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
      <RefNet name="part"></RefNet>
      <Similar name="part"></Similar>
      <SimNet name="part"></SimNet>
      <PaperComment name="part"></PaperComment>
    </div>
  </el-container>

</template>

<script>
import Info from "@/views/paper/Info/Info";
import RefNet from "@/views/paper/RefNet/RefNet";
import Operation from "@/views/paper/Side/Operation";
import Reference from "@/views/paper/Reference/Reference";
import PaperComment from "@/views/paper/Comment/Comment";
import {HomeFilled, Opportunity, Comment, Reading, InfoFilled} from "@element-plus/icons";
import PaperInfo from "@/views/paper/Data/PaperInfo";
import { useRoute } from "vue-router";
import {paperStore, loginStore} from "@/store";
import {onBeforeMount} from "vue";
import {paperScholarAxios, userAxios} from "@/axios";
import Similar from "@/views/paper/Similar/Similar";
import SimNet from "@/views/paper/SimNet/SimNet";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Paper",
  components: {
    InfoFilled,
    SimNet,
    Similar, Opportunity, HomeFilled, Reading, Comment, Reference, Operation, RefNet, Info, PaperComment},
  props: [],
  setup() {//读路由参调用接口，用接口获取详情和关系网并存入state，子组件mount时再从state获取
    // eslint-disable-next-line no-unused-vars
    const router = useRoute();
    const paperStore1 = paperStore();
    const loginStore1 = loginStore();
    onBeforeMount(()=>{
      const paperId = router.params.paperId;
      paperStore1.paperId = paperId
      let got = false

      paperScholarAxios.post('paper', {
        "id": paperId,
      }).then((res) => {
        paperStore1.paperInfo = res.data
        got = true
      }).catch(e=>{
        console.log(e)
      })

      if (!got){
        paperStore1.paperInfo = PaperInfo.info
        console.log('未获取到详情，使用本地测试数据')
      }

      if (!loginStore1.isLogin){
        paperStore1.paperInfo.starred = 1
        console.log('return')
        return{
          checkStar
        }; //没登录就不获取收藏状态
      }

      userAxios.post('paper/is-star', {
        "paper_id": paperId
      }).then(res=>{
        paperStore1.paperInfo.starred = res.data.is_star
      }).catch((e)=>{
        console.log(e)
        console.log('未获取或未登录，默认没有收藏过')
        paperStore1.paperInfo.starred = 1
      })
    })

    const checkStar = loginStore1.$onAction(
        ({
           name,
           store,
           args,
           after,
           onError
         })=>{
          console.log(name, store, args, onError)
          after(()=>{
            userAxios.post('paper/is-star', {
              "paper_id": router.params.paperId,
            }).then(res=>{
              paperStore1.paperInfo.starred = res.data.is_star
            }).catch((e)=>{
              console.log(e)
              console.log('未获取或未登录，默认没有收藏过')
              paperStore1.paperInfo.starred = 1
            })
          })
        })
    return{
      checkStar
    }
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll, true)
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
    watch: {
      '$route'() {
        this.$router.go(0);
      },
    },
  },
}
</script>

<style scoped>
.wrap-paper {
  margin:20px auto;
  width: 1250px;
}
.navigation{
  position: fixed;
  z-index: 100;
  width: 130px;
  margin-top: 30px;
  border-radius: 4px;
  box-shadow: 0 0 14px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
}
</style>