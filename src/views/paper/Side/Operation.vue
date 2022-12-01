<template>
  <div class="wrap-op">
    <el-row class="op"><el-col>操作
        <el-icon class="icon"><Tools /></el-icon>
      </el-col>
    </el-row>
    <div style="display: flex">
      <el-row class="op">
        <el-tooltip class="item" effect="light" content="收藏" placement="top">
          <el-button circle v-if="this.starred===1" @click="this.star" class="button" size="large" color=" #66b1ff">
            <el-icon ><Star /></el-icon>
          </el-button>
          <el-button circle v-else @click="this.deStar" class="button" size="large">
            <el-icon color="#FFFFFF"><StarFilled /></el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="引用" placement="top">
          <el-button circle @click="this.cite" class="button" size="large" color=" #66b1ff"><el-icon><Share/></el-icon></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="发起互助" placement="top">
          <el-button circle @click="this.help" class="button" size="large" color=" #66b1ff"><el-icon><Help /></el-icon></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="认领" placement="top">
          <el-button circle class="button" size="large" @click="this.showClaim=true" color=" #66b1ff"><el-icon><Avatar /></el-icon></el-button>
        </el-tooltip>
      </el-row>
    </div>
    <el-row class="op"><el-col>原文链接
        <el-icon class="icon"><Link /></el-icon>
    </el-col>
    </el-row>
    <el-row class="op" v-for="url in this.urls" :key="url">
      <el-link :href="url" type="primary" style="font-size: large">{{"原文链接" + (this.urls.indexOf(url)+1)}}</el-link>
    </el-row>
  </div>

<!--引用格式对话框-->
  <el-dialog v-model="this.showCite" custom-class="dialog">
    <template #title>
      <el-menu
      :default-active="'1'"
      class="el-menu-demo"
      mode="horizontal"
      @select="this.changeCite"
      >
      <el-menu-item index="1">GB/T 7714</el-menu-item>
      <el-menu-item index="2">MLA</el-menu-item>
      <el-menu-item index="3">APA</el-menu-item>
      <el-menu-item index="4">BibTex</el-menu-item>
      <el-menu-item index="5">CAJ-CD</el-menu-item>
      </el-menu>
    </template>
    <div>{{this.citation}}</div>
    <template #footer>
      <el-button style="float: right; margin-right: 20px;" @click="this.copyCitation()" circle size="large"  color=" #66b1ff"><el-icon color="#FFFFFF"><DocumentCopy /></el-icon></el-button>
    </template>
  </el-dialog>
<!--  认领文献对话框-->
  <el-dialog v-model="this.showClaim" custom-class="dialog" style="width: 400px">
    <template #title>请完善认领信息</template>
    <el-input v-model="this.input" placeholder="您的学者ID"></el-input>
    <template #footer>
      <el-button circle @click="this.showClaim=false" style="float: left" size="large"><el-icon><Close></Close></el-icon></el-button>
      <el-button circle @click="this.adopt;this.showClaim=false" size="large" color=" #66b1ff"><el-icon color="#FFFFFF"><Check></Check></el-icon></el-button>
    </template>
  </el-dialog>
<!--  是否申诉对话框-->
  <el-dialog v-model="this.showGrievance" custom-class="dialog" title="发起申诉" center style="max-width: 500px">
    文献的同名作者已经被关联到其他学者，是否发起申诉？
    <template #footer>
      <el-button round @click="this.showGrievance=false">取消</el-button>
      <el-button round @click="this.grievance" color=" #66b1ff" style="color: #ffffff">确定</el-button>
    </template>
  </el-dialog>
</template>


<script>
import {Help, Link, Share, Star, Tools, DocumentCopy, StarFilled, Avatar, Close, Check} from "@element-plus/icons";
import {ElMessage} from "element-plus";
import {paperStore} from "@/store";
import {userAxios} from "@/axios";
import {paperScholarAxios} from "@/axios";
import {ref} from "vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Operation",
  props: [],
  components: {Check, Close, StarFilled, Help, Share, Tools, Star, Link, DocumentCopy, Avatar},
  setup(){
    return{
      store: paperStore(),
      input: ref('')
    }
  },
  mounted() {// 从state获取信息
    this.getInfo()
  },
  data(){
    return{
      showCite: false,
      title: "",
      author: [],
      magazine: "",
      urls: null,
      starred: false,
      citations: {
        gb: "gb", //GB/T 7714格式
        mla: "mla",//MLA格式
        apa: "apa",//APA格式
        bibtex: "bibtex",//BibTex格式
        caj_cd: "caj_cd",//CAJ-CD格式
      },
      citation: '',
      griScholarId: "",
      showClaim: false,
      showGrievance: false,
    }
  },
  methods: {
    getInfo(){
      this.urls = this.store.paperInfo.urls
      this.starred = this.store.paperInfo.starred
      this.title = this.store.paperInfo.title
      const authors = this.store.paperInfo.authors
      authors.forEach((au)=>{
        this.author.push(au.name)
      })
      this.magazine = this.store.paperInfo.publisher
    },
    cite(){
      this.showCite = true;
      paperScholarAxios.post('paper/cite',{
        'id': this.store.paperId
      }).then(res=>{
        this.citations = res.data
      })
      this.citation = this.citations.gb
    },
    changeCite(key){
      switch (key) {
        case '1': this.citation = this.citations.gb; break;
        case '2': this.citation = this.citations.mla; break;
        case '3': this.citation = this.citations.apa; break;
        case '4': this.citation = this.citations.bibtex; break;
        case '5': this.citation = this.citations.caj_cd; break;
        default: console.log("err")
      }
    },
    copyCitation(){
      let inputElement = document.createElement('input')
      inputElement.value = this.citation
      document.body.appendChild(inputElement)
      inputElement.select()
      document.execCommand('Copy')
      inputElement.remove()
      ElMessage("已复制")
    },
    star(){
      userAxios.post('paper/star', {
        'paper_id': this.store.paperId
      }).then(res=>{
        const code = res.data.code
        console.log(code)
        if (code === '0'){
          ElMessage('收藏成功')
        }else {
          ElMessage('发生错误，已经收藏过')
        }
      })
    },
    deStar(){
      userAxios.post('paper/star/cancel', {
        'id': this.store.paperId
      }).then(res=>{
        const code = res.data.code
        console.log(code)
        if (code === '0'){
          ElMessage('取消了')
        }else {
          ElMessage('发生错误，没有收藏过')
        }
      })
    },
    help(){ //跳转到互助
      this.$router.push({
        name: 'createRequest',
        params: {
          title: this.title,
          author: this.author,
          magazine: this.magazine
        }
      })
    },
    adopt(){
      userAxios.post('paper/claim', {
        "paper_id": this.store.paperId,
        "scholar_id": this.input,
      }).then(res=>{
        if (!res.status === 200){
          ElMessage('认领失败，没有您的关联信息')
        }
        else {
          const code = res.data.code
          if (code === '0'){
            ElMessage('认领成功')
          }else if (code === '1'){
            this.griScholarId = res.data.scholar_id
            this.showGrievance = true
          }
        }
      })
    },
    grievance(){
      let got = false
      userAxios.post('paper/grievance',{
        "paper_id": this.store.paperId,
        "scholar_id": this.griScholarId,
      }).then(()=>{
        ElMessage('发起成功')
        got = true
      })
      if (!got){
        ElMessage('发起失败，发生了错误')
      }
    }
  }
}
</script>

<style scoped>
.wrap-op {
  padding: 10px 20px 15px 15px;
  max-height: 500px;
  margin-left: 2%;
  width: auto;
  border-radius: 3%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
}
.op {
  margin-top: 10px;
}
.icon {
  float: right;
  margin-top: 4px;
}
.el-menu-demo{
  height: 30px;
}
.button{
  color: #ecf5ff;
}
</style>
<style>
.dialog{
  min-height: 200px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06)
}
</style>

