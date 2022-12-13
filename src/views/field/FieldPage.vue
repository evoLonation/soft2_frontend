<template>

  <div class="field" style="position: relative; text-align: center">
    <h1 style="text-align: center; padding: 10px">{{field_name === undefined ? "-下方输入领域查询哦-" : field_name}}</h1>

    <el-autocomplete
        v-model="input"
        class=""
        style="width: 450px;margin-right: 12px;"
        placeholder="输入特定领域..."
        :fetch-suggestions="querySearch"
    >
      <template #suffix>
        <el-icon size="large" @click="gotoField()"><search /></el-icon>
      </template>
    </el-autocomplete>
  </div>
  <div class="show">

    <div class="paper" id="paper" >
      <h1 style="text-align: center; padding-top: 15px">领域热门论文</h1>
      <el-divider style=" margin: 8px 0 " />
      <div v-for="(item, index) in PaperList" :key="index">
        <div>
          <list
              :type=4
              :author="item.authors"
              :abstract="item.abstract"
              :num="item.n_citation"
              :org="item.publisher"
              :paperName="item.title"
              :paperId="item.id"
          />
          <el-divider  style="width: 100%;"/>
        </div>
      </div>
      <div class="loading">
        <el-icon class="iconfont" v-show="loading1"><Loading /></el-icon>
        <span>{{loading1 === true ? '正在加载中' : '再怎么找都没有了'}}</span>
      </div>
    </div>

    <div class="scholar" id="scholar">
      <h1 style="text-align: center;padding-top: 15px">领域杰出学者</h1>
      <el-divider style="margin: 8px 0"/>
      <div v-for="(item, index) in ScholarList" :key="index">
        <list2
            :name="item.name"
            :n_citation="item.n_citation"
            :n_paper="item.n_paper"
            :weight="item.weight * 1000"
            :scholar_id="item.scholar_id"
          />
      </div>
      <div class="loading">
        <el-icon class="iconfont" v-show="loading2"><Loading /></el-icon>
        <span>{{loading2 === true ? '正在加载中' : '再怎么找都没有了'}}</span>
      </div>
    </div>

  </div>

</template>

<script>
import list from "../../components/paperShow"
import list2 from "../../components/ScholarShow"
import {paperScholarAxios} from "@/axios";
export default {
  name: 'FieldPage',
  components: {
    list, list2
  },
  setup() {
    const querySearch = (queryString , cb) => {
      paperScholarAxios.post("search/auto-complete", {
        search_type : 2,
        text : queryString,
      }).then((res) => {
        cb(res.data.auto_completes.map((value) => {return {value : value}}))
      })
      // const results = [{value : '人工智能'}, {value: '深度学习'}, {value: '自动生成'},]
      // cb(results);
    }
    return {
      querySearch
    }
  },
  data() {
    return {
      paper_num: 0, //领域总文献数
      scholar_num: 0,
      field_name: "",
      input: "",
      start1: 0,
      end1: 5,
      start2: 0,
      end2: 5,
      loading1: true,
      loading2: true,
      PaperList: [],
      ScholarList: [],
    }
  },
  methods: {
    getPaperList() {
      console.log('paper:',this.field_name, this.start1, this.end1)
      paperScholarAxios.post('field/paper', {
        "field": this.field_name,
        "start": this.start1,
        "end": this.end1,
      }).then(res=>{
        console.log('获取论文成功',res.data.paper_num)
        console.log(res.data.papers)
        this.paper_num = res.data.paper_num
        if(this.paper_num === 0) {
          this.loading1 = false
        }
        for(let i = 0; i < res.data.papers.length; i++) {
          this.PaperList.push(res.data.papers[i])
        }
        console.log(this.PaperList)
        this.start1 = this.start1 + 5
        this.end1 = this.end1 + 5
      }).catch(e=>{
        console.log(e)
      })
    },
    getScholarList() {
      console.log('scholar:',this.field_name, this.start2, this.end2)
      paperScholarAxios.post('field/scholar', {
        "field": this.field_name,
        "start": this.start2,
        "end": this.end2,
      }).then(res=>{
        console.log('获取学者成功',res.data.scholar_num)
        this.scholar_num = res.data.scholar_num
        if(this.scholar_num === 0) {
          this.loading2 = false
        }
        for(let i = 0; i < res.data.scholars.length; i++) {
          this.ScholarList.push(res.data.scholars[i])
        }
        this.start2 = this.start2 + 5
        this.end2 = this.end2 + 5
      })
    },
    gotoField() {
      this.$router.push({name : "Field", query: {content: this.input,}})
    },
    scrollFn() {
      let windowHeight = window.innerHeight;
      let st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let sectionTop1 = document.getElementById("paper").offsetTop;//card_section距离顶部的偏移高度（card_section为你的照片或div元素ID）
      let sectionHeight1 = document.getElementById("paper").offsetHeight;//card_section的高度
      let sectionTop2 = document.getElementById("scholar").offsetTop;//card_section距离顶部的偏移高度（card_section为你的照片或div元素ID）
      let sectionHeight2 = document.getElementById("scholar").offsetHeight;//card_section的高度
      // console.log('窗口高度', windowHeight,st, sectionTop1, sectionHeight1)
      let docHeight1 = document.getElementById("paper").scrollHeight;
      let docHeight2 = document.getElementById("scholar").scrollHeight;

      document.getElementById("paper").style.height = docHeight1 + "px"
      document.getElementById("scholar").style.height = docHeight2+ "px"

      let height = document.documentElement.clientHeight
      let tmp1 = height - docHeight1
      let tmp2 = height - docHeight2

      if(this.loading1 === false) {
        document.getElementById("paper").style.top = tmp1 + "px"
      }
      if(this.loading2 === false) {
        document.getElementById("scholar").style.top = tmp2 + "px"
      }
      if(sectionHeight1 + sectionTop1 - 50 < st + windowHeight && this.paper_num > 0) {
      // if(winHeight1 + st >= docHeight1) {
        if(this.PaperList.length >= this.paper_num) {
          this.loading1 = false
        }
        else {
          this.getPaperList()
        }
      }
      if(sectionHeight2 + sectionTop2 - 50 < st + windowHeight && this.scholar_num > 0) {
      // if(winHeight2 + st >= docHeight2) {
        if(this.ScholarList.length >= this.scholar_num) {
          this.loading2 = false
        }
        else {
          this.getScholarList()
        }
      }
    },
  },
  mounted() {
    this.field_name = this.$route.query.content
    console.log(this.field_name)
    window.addEventListener("mousewheel", this.scrollFn);
    this.getPaperList()
    this.getScholarList()
  },
  beforeUnmount() {
    window.removeEventListener("mousewheel", this.scrollFn);
  },
  watch: {
    $route() {
      this.$router.go()
    },
  },
}

</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.field {
  height: 150px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
  background-color: rgb(107, 160, 191);
}

.show {
  margin-top: 50px;
  display: flex;
  align-items: flex-start;
}

.paper {
  width: 800px;
  margin-left: 240px;
  position: sticky;
  display: block;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06)
}

.scholar {
  width: 420px;
  position: sticky;
  display: block;
  margin-left: 80px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
}

.loading {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading .iconfont {
  margin-right: 10px;
  animation: loading 1s linear infinite;
}

@keyframes loading {
  from {transform: rotate(0);}
  to {transform: rotate(360deg);}
}
</style>