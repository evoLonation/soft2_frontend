<template>
  <div class="wrap-net">
    <div id="sim-net" class="g6-graph" v-loading="this.loading" element-loading-text="参考关系网计算中..."></div>
    <div class="info">
      <el-row>
        <el-col :span="30" class="title" @click="this.openPaper(this.info.id)">{{this.info.title}}</el-col>
      </el-row>
      <el-row style="display: flex">
        <el-col :span="6" class="author" v-for="author in this.info.authors" :key="author" @click="this.openAuthor(author)">{{author.name}}</el-col>
<!--        <el-col :span="author.name.length<6?2:24/this.info.authors.length" class="author" v-for="author in this.info.authors" :key="author" @click="this.openAuthor(author)">{{author.name}}</el-col>-->
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
import {Graph} from "@/views/paper/RefNet/Graph";
import {paperStore} from "@/store";
import {paperScholarAxios} from "@/axios";

export default {
  name: "RefNet",
  props: [],
  components: [],
  beforeUnmount () {
    this.graph.destroy()
     window.removeEventListener('message', (e) => {
       if (e.data[0] === 'ref')
         this.showInfo(e.data[1])
     })
  },
  setup(){
    const store = paperStore()
    return{
      store
    }
  },
  mounted() {
    paperStore().$onAction(({name, store, args, after, onError})=>{
      console.log(name, store, args, onError)
      after(() => {
        console.log('info updated')
        this.showInfo(this.store.paperInfo)
      })
    })
    this.paperId = this.store.paperId
    this.initGraph()
    window.addEventListener('message', (e) => {
      if (e.data[0] === 'ref')
        this.showInfo(e.data[1])
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
    processSize(nodes){
      let ret = []
      nodes.forEach(n=>{
        if (n.type === 'major'){
          n.fx = 350
          n.fy = 250
        }
        ret.push(n)
      })
      return ret
    },
    initGraph(){
      this.graph = new Graph(
          700,
          500,
          document.getElementById("sim-net"));
      paperScholarAxios.post('paper/relation-net', {
        'id': this.store.paperId
      }).then(res=>{
        let data = res.data
        data.nodes = this.processSize(data.nodes)
        this.graph.loadData(data)
        this.graph.render()
        this.graph.initListener()
        this.loading = false
        console.log(res.data)
      })
    },
    showInfo(info) { //显示详细信息
      const limit = 600;
      let tmp = []
      info.authors.forEach(a=>{
        if (tmp.length<=10){
          tmp.push(a)
        }
      })
      info.authors = tmp
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
      this.$router.push({name:'Scholar', params:{scholarId: author.id}});
    },
  },
  watch: {
    '$route'() {
      // 路由发生变化页面刷新
      console.log('changed')
      this.$router.go(0);
    },
  },
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
  line-height:1.5;
  font-size: 20px;
  font-weight: bold;
}
.title:hover{
  text-decoration: underline;
}
.author{
  color:  #3375b9;
  cursor: pointer;
  line-height:1.25;
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
  line-height: 1.25;
}
.g6-graph {
  width: 60%;
  height: 500px;
  margin-right: 0;
  background-color: white;
  box-shadow: 0 0 14px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
  border-radius: 5px;
}
.info {
  float: right;
  background-color: white;
  padding: 10px 15px;
  max-height: 500px;
  min-width: 495px;
  margin-left: 2%;
  border-radius: 5px;
  box-shadow: 0 0 14px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
}

</style>