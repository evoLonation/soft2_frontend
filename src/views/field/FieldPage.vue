<template>

  <div class="header">
    <h1 style="text-align: center; padding: 25px">导航栏</h1>
  </div>
  <div class="field" style="position: relative">
    <h1 style="text-align: center; padding: 10px">{{ field_name }}</h1>
    <el-input
        v-model="input"
        style="width: 400px; margin-left: 400px"
        placeholder="请输入搜索领域"
        :prefix-icon="Search"
    />
  </div>
  <div class="show">

    <div class="paper" id="paper" @mousewheel="scrollFn1">
      <div v-for="(item, index) in PaperList" :key="index">
        <div>
          <list
              :type="item.type"
              :author="item.author"
              :abstract="item.abstract"
              :num="item.num"
              :org="item.org"
              :paperName="item.paperName"
              style="margin: auto"
          />
        </div>
      </div>
      <div class="loading">
        <el-icon class="iconfont" v-show="loading1"><Loading /></el-icon>
        <span>{{loading1 ? '正在加载中……' : '再怎么找都没有了~'}}</span>
      </div>
    </div>

    <div class="scholar" id="scholar" @mousewheel="scrollFn2">
      <h1 style="text-align: center">领域杰出学者</h1>
      <el-divider />
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
export default {
  name: 'FieldPage',
  components: {
    list
  },
  data() {
    return {
      field_name: "机器学习",
      input: "",
      loading1: true,
      loading2: true,
      count1: 3,
      count2: 5,
      flag1: false,
      PaperList: [
        {
          type: "0",
          author: "赵正阳",
          abstract: "游戏发生在一个被称作“提瓦特”的幻想世界，在这里，被神选中的人将被授予“神之眼”，导引元素之力。",
          num: "114514",
          org: "北京工地大学软件安装学院",
          paperName: "深度分析鲁迅《论他妈的》中的文学风骨",
        },
        {
          type: "0",
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
    scrollFn1() {
      console.log('1滚动')
      // let winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      // let st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // let docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      let st = document.getElementById("paper").scrollTop;
      let docHeight = document.getElementById("paper").scrollHeight;
      let winHeight = document.getElementById("paper").offsetHeight
      console.log('1', winHeight, st, docHeight)
      document.getElementById("paper").style.height = docHeight + "px"
      if(winHeight + st >= docHeight) {
        //TODO: 调用加载函数
        console.log('1触底了')
        if(this.PaperList.length >= 20) {
          this.loading1 = false
          if(!this.flag1) {
            document.getElementById("paper").style.position = "sticky"
            document.getElementById("paper").style.bottom = "0"
            this.flag1 = true
          }
        }
        else {
          this.count1++
          this.PaperList.push(
              {
                type: "0",
                author: "刘禹宏",
                abstract: "蓝色妖姬是一种加工花卉，由月季和蔷薇多种杂交及研制所得。它通常是用一种染色剂和助染剂调合成着色剂，将鲜花喷染成型，最早来自荷兰",
                num: "0",
                org: "红色风暴",
                paperName: "历史风云（3）————蓝色妖姬与她的黄金切尔西",
              }
          )
        }
      }
    },
    scrollFn2() {
      console.log('2滚动')
      // let winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      // let st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // let docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      let st = document.getElementById("scholar").scrollTop;
      let docHeight = document.getElementById("scholar").scrollHeight;
      let winHeight = document.getElementById("scholar").offsetHeight
      console.log('2', winHeight, st, docHeight)
      document.getElementById("scholar").style.height = docHeight + "px"
      if(winHeight + st >= docHeight) {
        console.log('2触底了')
        if(this.ScholarList.length >= 12) {
          this.loading2 = false

          document.getElementById("scholar").style.position = "sticky"
          document.getElementById("scholar").style.bottom = "0"
          // document.getElementById("scholar").style.left= "600px"
          // document.getElementById("scholar").style.top= "-" + st + "px"
        }
        else {
          //TODO: 调用加载函数
          this.count2++
          this.ScholarList.push({
            name: '赵正阳',
            n_paper: 0,
            n_citation: 1,
            weight: '2%'
          })
        }
      }
    }
  },
  // mounted() {
  //   window.addEventListener("mousewheel", this.scrollFn, true);
  // },
  // beforeUnmount() {
  //   window.removeEventListener("scroll", this.scrollFn);
  // }
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
}

.header {
  width: 100%;
  height: 150px;
  border: 1px solid;
}

.show {
  margin-top: 50px;
  display: flex;
}

.paper {
  width: 50%;
  margin-left: 10%;
  top: 0;
}

.scholar {
  width: 20%;
  /*height: 1000px;*/
  margin-left: 100px;
  top: 0;
  /*bottom: 0;*/
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