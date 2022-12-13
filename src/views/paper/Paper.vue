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
import {Comment, HomeFilled, InfoFilled, Opportunity, Reading} from "@element-plus/icons";
import {useRoute} from "vue-router";
import {loginStore, paperStore} from "@/store";
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
  setup() {
    const router = useRoute();
    const paperStore1 = paperStore();
    const loginStore1 = loginStore();
    const paperId = router.params.paperId;
    paperStore1.storeId(paperId)

    const checkStar = loginStore1.$onAction(
        ({name, store, args, after, onError}) => {
          console.log(name, store, args, onError)
          after(() => {
            if (name === 'login'){
              userAxios.post('paper/is-star', {
                "paper_id": router.params.paperId,
              }).then(res => {
                paperStore1.storeStar(res.data.is_star)
              })
            }
          })
        })
    return {
      checkStar,
      paperStore1,
      loginStore1,
      paperId
    }

  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll, true)
  },
  mounted() {
    paperScholarAxios.post('paper', {
      "id": this.paperId,
    }).then((res) => {
      this.paperStore1.storeInfo(res.data)
      this.loginStore1.checkLogin().then(res=>{
        if (res){
          userAxios.post('paper/is-star', {
            "paper_id": this.paperId
          }).then(res=>{
            this.paperStore1.storeStar(res.data.is_star)
          })
        }else {
          this.paperStore1.paperInfo.starred = 1
        }
      })
    })
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