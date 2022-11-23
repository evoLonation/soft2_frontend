<template>
  <div class="wrap-net">
    <div id="net" class="g6-graph" v-loading="this.loading" element-loading-text="论文关系网计算中..."></div>
    <div class="info">
      <el-row>
        <el-col :span="30" class="title" @click="this.openPaper(this.info.id)">{{this.info.title}}</el-col>
      </el-row>
      <el-row style="display: flex">
        <el-col :span="5" class="author" v-for="author in this.info.authors" :key="author" @click="this.openAuthor(author)">{{author.name}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="30" class="year">{{this.info.year}}</el-col>
      </el-row>
      <el-row>
        <el-col span="30" class="abstract">{{this.info.abstract}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {Graph} from "@/views/paper/RelationNet/Graph";
import Data from "@/views/paper/RelationNet/Data";
import {useStore} from "@/store";
import qs from "qs";
import searchType from "@/assets/searchType.json";

export default {
  name: "RelationNet",
  props: [],
  components: [],
  beforeUnmount () {
     window.removeEventListener('message', (e) => {
       this.showInfo(e.data)
     })
  },
  setup(){
    const store = useStore()
    return{
      store
    }
  },
  mounted() {
    setTimeout(()=>{
      this.initGraph()
      this.loading = false
    },5000) //模拟等待时间
    this.info = this.store.paperInfo
    this.paperId = this.store.paperId
    window.addEventListener('message', (e) => {
      this.showInfo(e.data)
    })
  },
  data(){
    return{
      graph: null,
      info: {
        title: 'title',
        abstract: 'abstract',
        authors: ['author1', 'author2'],
        year: 'date',
      },
      paperId: "",
      loading: true,
    }
  },
  methods: {
    sleep(time) {
      let timeStamp = new Date().getTime();
      let endTime = timeStamp + time;
      // eslint-disable-next-line no-constant-condition
      while (true) if (new Date().getTime() > endTime) return;
    },
    initGraph(){
      this.graph = new Graph(
          700,
          500,
          document.getElementById("net"));
      let data = this.getData()
      this.graph.loadData(data)
      this.graph.render()
      this.graph.initListener()
    },
    getData(){
      let gotData = false
      let data = null
      this.axios.post('paper/relationNet', {
        'id': this.store.paperId
      }).then(res=>{
        data = res.data
        gotData = true
      })
      if (!gotData){
        data = Data.data
        console.log('获取关系网失败，使用本地测试数据')
      }
      return data
    },
    showInfo(info) { //显示详细信息
      const limit = 800;
      if(info.abstract.length > limit){
        info.abstract = info.abstract.substring(0, limit) + "......";
      }
      this.info = info
    },
    openPaper(id){
      console.log(id)
      this.$router.push({path: `/paper/${id}`})
    },
    openAuthor(author){
      if (author.hasId){
        //TODO: push到学者主页， 未完
        this.$router.push({name:'UserInfo'});
      }else {
        this.$router.push({
          name:'PaperSearch',  //跳转路由
          query:{
            searchType: qs.stringify(searchType.searchType[1]), //json类型先转码，num代表的类型可以在searchType.josn中查看
            content:author.name}});  //搜索内容
      }
    },
  }
}
</script>

<style scoped>
.wrap-net{
  margin-top: 30px;
  display: flex;
  max-height: 500px;
}
.title{
  cursor: pointer;
  font-family: '微软雅黑',sans-serif;
  line-height:2;
  font-size: 22px;
  font-weight: bold;
}
.title:hover{
  text-decoration: underline;
}
.author{
  color: darkgrey;
  cursor: pointer;
  line-height:2;
  font-size: 12px;
}
.author:hover{
  text-decoration: underline;
}
.year{
  line-height: 2;
  font-size: 12px;
}
.abstract{
  line-height: 1.5;
}
.g6-graph {
  width: 700px;
  height: 500px;
  margin-right: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
  border-radius: 3%;
}
.info {
  float: left;
  width: 500px;
  padding: 10px 15px;
  max-height: 500px;
  margin-left: 2%;
  border-radius: 3%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06)
}

</style>