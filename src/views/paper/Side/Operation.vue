<template>
  <div class="wrap-op">
    <el-row class="op"><el-col>操作
        <el-icon class="icon"><Tools /></el-icon>
      </el-col>
    </el-row>
    <div style="display: flex">
      <el-row class="op">
        <el-tooltip class="item" effect="light" content="收藏" placement="top">
          <el-button circle v-if="!this.starred" @click="this.star" class="button" size="large">
            <el-icon ><Star /></el-icon>
          </el-button>
          <el-button circle v-else @click="this.deStar" class="button" size="large">
            <el-icon ><StarFilled /></el-icon>
          </el-button>
        </el-tooltip>
      </el-row>
      <el-row class="op">
        <el-tooltip class="item" effect="light" content="引用" placement="top">
          <el-button circle @click="this.cite" class="button" size="large"><el-icon><Share/></el-icon></el-button>
        </el-tooltip>
      </el-row>
      <el-row class="op">
        <el-tooltip class="item" effect="light" content="发起互助" placement="top">
          <el-button circle @click="this.help" class="button" size="large"><el-icon><Help /></el-icon></el-button>
        </el-tooltip>
      </el-row>
      <el-row class="op">
        <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon-color="#626AEF"
            title="确认认领？"
            @confirm="this.adopt">
          <template #reference>
            <el-button circle class="button" size="large"><el-icon><Avatar /></el-icon></el-button>
          </template>
        </el-popconfirm>
      </el-row>
    </div>
    <el-row class="op"><el-col>原文链接
        <el-icon class="icon"><Link /></el-icon>
    </el-col>
    </el-row>
    <el-row class="op" v-for="url in this.urls" :key="url">
      <el-image></el-image>
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
      <el-button style="float: right; margin-right: 20px;" @click="this.copyCitation()" circle size="large"><el-icon><DocumentCopy /></el-icon></el-button>
    </template>
  </el-dialog>
<!--  是否申诉对话框-->
  <el-dialog v-model="this.showGrievance" custom-class="dialog" title="发起申诉" center style="max-width: 500px">
    文献的同名作者已经被关联到其他学者，是否发起申诉？
    <template #footer>
      <el-button round @click="this.showGrievance=false">取消</el-button>
      <el-button round @click="this.grievance">确定</el-button>
    </template>
  </el-dialog>
</template>


<script>
import {Help, Link, Share, Star, Tools, DocumentCopy, StarFilled, Avatar} from "@element-plus/icons";
import {ElMessage} from "element-plus";
import {useStore} from "@/store";


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Operation",
  props: [],
  components: {StarFilled, Help, Share, Tools, Star, Link, DocumentCopy, Avatar},
  setup(){
    return{
      store: useStore()
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
      this.axios.post('paper/cite',{
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
      this.axios.post('paper/star', {
        'id': this.store.paperId
      }).then(res=>{
        const code = res.data.code
        console.log(code)
        if (code === '0'){
          ElMessage('收藏成功')
        }else {
          ElMessage('请先登录')
        }
      })
    },
    deStar(){
      this.axios.post('paper/star/cancel', {
        'id': this.store.paperId
      }).then(res=>{
        const code = res.data.code
        console.log(code)
        if (code === '0'){
          ElMessage('取消了')
        }else {
          ElMessage('请先登录')
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
      // this.showGrievance = true //for test
      this.axios.post('paper/adopt', {
        "id": this.store.paperId
      }).then(res=>{
        const code = res.data.code
        if (code === '0'){
          ElMessage('认领成功')
        }else if (code === '1'){
          ElMessage('请先登录')
        }else if (code === '2'){
          ElMessage('无同名作者，请联系管理员')
        }else {
          this.showGrievance = true
        }
      })
    },
    grievance(){
      this.axios.post('paper/grievance',{
        "id": this.store.paperId
      }).then(res=>{
        const code = res.data.code
        if (code === '0'){
          ElMessage('发起成功')
        }else {
          ElMessage('发起失败')
        }
      })
    }
  }
}
</script>

<style scoped>
.wrap-op {
  margin-left: 30px;
  margin-top: 30px;
  width: 290px;
  max-height: 500px;
  border-radius: 3%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
}
.op {
  margin-top: 10px;
  margin-left: 15px;
}
.icon {
  float: right;
  margin-top: 4px;
  margin-right: 20px;
}
.el-menu-demo{
  height: 30px;
}
.button{

}
</style>
<style>
.dialog{
  min-height: 200px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06)
}
</style>

