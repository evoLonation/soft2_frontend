<template>
  <div class="wrap-info">
    <el-row>
      <el-col  class="title">{{this.info.title}}</el-col>
    </el-row>
    <el-row>
      <el-col  class="abstract">{{this.info.abstract}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="2" class="keyword" v-for="keyword in this.info.keywords" :key="keyword">{{keyword}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="2" class="author" v-for="author in this.info.authors" :key="author" @click="this.openAuthor(author.id)">{{author.name}}</el-col>
    </el-row>
    <el-row>
      <el-col  class="org">{{this.info.org}}</el-col>
    </el-row>
    <el-row>
      <el-col  :span="5" class="doi-isbn">doi: {{this.info.doi}}</el-col>
      <el-col  :span="5" class="doi-isbn">isbn: {{this.info.isbn}}</el-col>
    </el-row>
    <el-row>
      <el-col  class="year">被引量: {{this.info.n_citation}}</el-col>
    </el-row>
    <el-row>
      <el-col  class="year">{{this.info.year}}</el-col>
    </el-row>
  </div>
</template>

<script>
import Data from "@/views/paper/Info/Data";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Info",
  props: [],
  components: {},
  setup(){

  },
  mounted(){
    this.getInfo()
  },
  data(){
    return{
      info: {}
    }
  },
  methods: {
    getInfo(){ // 从state获取文献信息
      this.info = Data.info
    },
    openAuthor(id){
      //TODO: push到学者主页
      console.log(id)
    },
  },
}
</script>

<style scoped>
.title{
  font-family: '微软雅黑',sans-serif;
  line-height:2;
  font-size: 25px;
  font-weight: bold;
}
.author{
  color: steelblue;
  cursor: pointer;
  line-height:2;
  font-size: 14px;
}
.author:hover{
  text-decoration: underline;
}
.year{
  line-height: 1.5;
  font-size: 12px;
}
.abstract{
  margin-top: 10px;
  line-height: 1.5;
}
.keyword {
  margin-top: 5px;
  font-size: 15px;
  line-height: 2;
  font-weight: bold;
}
.org {
  font-size: 12px;
  line-height: 1.5;
  color: grey;
}
.doi-isbn {
  font-size: 12px;
  line-height: 1.5;
  color: dimgrey;
}
.wrap-info {
  width: 900px;
  min-height: 300px;
  max-height: 800px;
  margin-top: 30px;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
}
</style>