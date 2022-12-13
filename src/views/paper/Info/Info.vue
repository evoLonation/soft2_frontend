<template>
  <div class="wrap-info">
    <el-row>
      <el-col  class="title">{{this.info.title}}</el-col>
    </el-row>
    <el-row>
      <el-col  class="abstract">{{this.info.abstract}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="keyword" v-for="keyword in this.info.keywords" :key="keyword">{{keyword}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="author" v-for="author in this.info.authors" :key="author" @click="this.openAuthor(author)">{{author.name}}</el-col>
    </el-row>
    <el-row>
      <el-col  class="org">{{this.info.org}}</el-col>
    </el-row>
    <el-row>
      <el-col  :span="5" class="doi-isbn">doi: {{this.info.doi}}</el-col>
      <el-col  :span="5" class="doi-isbn">issn: {{this.info.issn}}</el-col>
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
import {paperStore} from "@/store"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Info",
  props: [],
  components: {},
  setup(){
  },
  mounted(){
    let store = paperStore()
    store.$onAction(({name, store, args, after, onError}) => {
        console.log(name, store, args, onError)
        after(() => {
          this.info = store.paperInfo
          this.processInfo()
        })
    })
  },
  data(){
    return{
      info: {}
    }
  },
  methods: {
    processInfo(){
      if (this.info.title === ''){
        this.info.title = '无标题'
      }
      if (this.info.abstract === ''){
        this.info.abstract = '无摘要'
      }
      if (this.info.authors.length === 0){
        this.info.authors = [{name: '作者未知', id: '-1'}]
      }
      if (this.info.keywords.length === 0){
        this.info.keywords = ['无关键词']
      }
      if (this.info.org === ''){
        this.info.org = '发布组织未知'
      }
      if (this.info.year === ''){
        this.info.year = '年份未知'
      }
      if (this.info.publisher === ''){
        this.info.publisher = '版号未知'
      }
      if (this.info.doi === ''){
        this.info.doi = '未知'
      }
      if (this.info.issn === ''){
        this.info.issn = '未知'
      }
      if (this.info.n_citation === ''){
        this.info.n_citation = '未知'
      }
      if (this.info.starred === ''){
        this.info.starred = 1;
      }
      if (this.info.urls === null){
        this.info.urls = []
      }
    },
    openAuthor(author){
      this.$router.push({name:'Scholar', params:{scholarId: author.id}});
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
  color: #3375b9;
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
  font-size: 12px;
  line-height: 1.25;
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
  background-color: white;
  width: 76%;
  min-height: 300px;
  max-height: 800px;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 0 14px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
}
</style>