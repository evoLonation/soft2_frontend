<template>

  <div class="field" style="position: relative">
    <h1 style="text-align: center; padding: 10px">{{ field_name }}</h1>

    <el-input
        v-model="input"
        style="width: 400px; margin-left: 650px; padding-top: 20px"
        placeholder="请输入搜索领域"
    >
      <template #suffix>
        <el-icon size="large" @click="normalSearch" ><search /></el-icon>
      </template>
    </el-input>
  </div>
  <div class="show">

    <div class="paper" id="paper" >
      <div v-for="(item, index) in PaperList" :key="index">
        <div>
          <list
              :type="item.type"
              :author="item.author"
              :abstract="item.abstract"
              :num="item.num"
              :org="item.org"
              :paperName="item.paperName"
              style="padding-bottom: 0"
          />
          <el-divider  style="width: 100%;"/>
        </div>
      </div>
      <div class="loading">
        <el-icon class="iconfont" v-show="loading1"><Loading /></el-icon>
        <span>{{loading1 ? '正在加载中……' : '再怎么找都没有了~'}}</span>
      </div>
    </div>

    <div class="scholar" id="scholar">
      <h1 style="text-align: center">领域杰出学者</h1>
      <el-divider style="margin: 8px"/>
      <div v-for="(item, index) in ScholarList" :key="index">
        <div class="show_scholar">
          <div class="scholar_name">
            <el-icon ><User /></el-icon>
            <div style="display: inline-block; padding-left: 10px; font-size: 20px; font-weight: bold">{{item.name}}</div> <br/>
          </div>

          <div style="display: flex;">
            <div style=" margin-top: 10px">
              <el-divider style="height: 90px; " direction="vertical" />
            </div>
            <div style=" margin-left: 10px; ">
              <div style="padding-top: 10px">论文数量：{{item.n_paper}}</div>
              <div style="padding-top: 10px">被引量：{{item.n_citation}}</div>
              <div style="padding-top: 10px">领域指数：{{item.weight}}</div>
            </div>
          </div>

        </div>
      </div>
      <div class="loading">
        <el-icon class="iconfont" v-show="loading2"><Loading /></el-icon>
        <span>{{loading2 ? '正在加载中……' : '再怎么找都没有了~'}}</span>
      </div>
    </div>

  </div>

</template>

<script>
import list from "../../components/paperShow"
import {paperScholarAxios} from "@/axios";
export default {
  name: 'FieldPage',
  components: {
    list
  },
  data() {
    return {
      paper_num: 0, //领域总文献数
      scholar_num: 0,
      field_name: "机器学习",
      input: "",
      start1: 0,
      end1: 9,
      start2: 0,
      end2: 9,
      loading1: true,
      loading2: true,
      PaperList: [
        {
          type: 4,
          author: "赵正阳",
          abstract: "游戏发生在一个被称作“提瓦特”的幻想世界，在这里，被神选中的人将被授予“神之眼”，导引元素之力。",
          num: "114514",
          org: "北京工地大学软件安装学院",
          paperName: "深度分析鲁迅《论他妈的》中的文学风骨",
        },
        {
          type: 4,
          author: "赵正阳",
          abstract: "不知不觉间，今年的最后一个新番季已经过去一半了，也是时候开始关注明年一月番的消息了",
          num: "11",
          org: "北京工地大学软件安装学院",
          paperName: "浅谈近年日本番剧清一色异世界龙傲天后宫厕纸剧情的内在驱动力",
        }
      ],
      ScholarList: [
        {
          name: 'Ameame',
          n_paper: 8,
          n_citation: 20,
          weight: '70%'
        },
        {
          name: 'Ameame',
          n_paper: 8,
          n_citation: 20,
          weight: '70%'
        },
      ]
    }
  },
  methods: {
    getPaperList() {
      paperScholarAxios.post('field/paper', {
        "field": this.field_name,
        "start": this.start1,
        "end": this.end1,
      }).then(res=>{
        this.paper_num = res.data.paper_num
        this.PaperList = res.data.papers
        this.start1 = this.start1 + 9
        this.end1 = this.end1 + 9
      })
    },
    getScholarList() {
      paperScholarAxios.post('field/scholar', {
        "field": this.field_name,
        "start": this.start2,
        "end": this.end2,
      }).then(res=>{
        this.scholar_num = res.data.scholar_num
        this.ScholarList = res.data.scholars
        this.start2 = this.start2 + 9
        this.end2 = this.end2 + 9
      })
    },
    scrollFn() {
      console.log('1滚动')
      // let st1 = document.getElementById("paper").scrollTop;
      let docHeight1 = document.getElementById("paper").scrollHeight;
      let winHeight1 = document.getElementById("paper").offsetHeight
      // let st2 = document.getElementById("scholar").scrollTop;
      let docHeight2 = document.getElementById("scholar").scrollHeight;
      let winHeight2 = document.getElementById("scholar").offsetHeight
      let st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      document.getElementById("paper").style.height = docHeight1 + "px"
      document.getElementById("scholar").style.height = docHeight2 + "px"

      if(winHeight1 + st >= docHeight1) {
        console.log('1触底了')
        console.log('1st', st)
        if(this.PaperList.length >= 14) {
          console.log('1需要固定')
          this.loading1 = false
          // document.getElementById("paper").setAttribute('vertical-align', 'bottom')
          document.getElementById("paper").style.position = "sticky"
          document.getElementById("paper").style.bottom = "0"
        }
        else {
          //TODO: 调用加载函数
          this.getPaperList()
          this.PaperList.push(
              {
                type: 4,
                author: "刘禹宏",
                abstract: "蓝色妖姬是一种加工花卉，由月季和蔷薇多种杂交及研制所得。它通常是用一种染色剂和助染剂调合成着色剂，将鲜花喷染成型，最早来自荷兰",
                num: "0",
                org: "红色风暴",
                paperName: "历史风云（3）————蓝色妖姬与她的黄金切尔西",
              }
          )

          docHeight1 = document.getElementById("paper").scrollHeight;
          document.getElementById("paper").style.height = docHeight1 + "px"
        }
      }
      if(winHeight2 + st >= docHeight2) {
        console.log('2触底了')
        console.log('2st', st)
        if(this.ScholarList.length >= 20) {
          this.loading2 = false
          console.log('2需要固定')
          // document.getElementById("scholar").setAttribute('vertical-align', 'bottom')
          document.getElementById("scholar").style.position = "sticky"
          document.getElementById("scholar").style.bottom = "0"
        }
        else {
          //TODO: 调用加载函数
          this.getScholarList()
          this.ScholarList.push({
            name: '赵正阳',
            n_paper: 0,
            n_citation: 1,
            weight: '2%'
          })
          docHeight2 = document.getElementById("scholar").scrollHeight;
          document.getElementById("scholar").style.height = docHeight2 + "px"
        }
      }
    },
  },
  mounted() {
    this.field_name = this.$route.query.content
    window.addEventListener("mousewheel", this.scrollFn);
    this.getPaperList()
    this.getScholarList()
  },
  beforeUnmount() {
    window.removeEventListener("mousewheel", this.scrollFn);
  }
}

</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.field {
  width: 100%;
  height: 150px;
  border: 1px solid;
  background-color: rgb(136, 160, 181);
}

.show {
  margin-top: 50px;

}

.paper {
  width: 45%;
  margin-left: 10%;
  display: inline-block;
  /*vertical-align: center;*/
  /*float: left;*/
  /*position: sticky;*/
  padding-left: 50px;
  padding-right: 50px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06)
}

.scholar {
  width: 20%;
  /*vertical-align: top;*/
  display: inline-block;
  /*float: left;*/
  position: sticky;
  margin-left: 200px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06)
}

.show_scholar {
  margin-top: 25px;
}

.scholar .show_scholar .scholar_name div:hover {
  color: aquamarine;
  cursor: pointer;
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