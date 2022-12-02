<template>
<!--  顶部栏-->
  <div class="main_body">


    <el-aside class="navigation">
      <el-menu
          :default-active="this.activeName.toString()"
          @select="this.navigate"
      >
        <el-menu-item index="0">
          <el-icon><HomeFilled /></el-icon>
          <template #title>基本信息</template>
        </el-menu-item>
        <el-menu-item index="1">
          <el-icon><TrendCharts /></el-icon>
          <template #title>成果统计</template>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><Aim /></el-icon>
          <template #title>学者关系</template>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><Reading /></el-icon>
          <template #title>论文列表</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><Histogram /></el-icon>
          <template #title>领域贡献</template>
        </el-menu-item>
      </el-menu>
    </el-aside>


    <div class="main_left">
        <div class="left_inform" id="inform" @click="clickInform">
          <el-icon size="20" style="margin-right: 5px;vertical-align: bottom"><User /></el-icon>个人信息
        </div>
        <div class="left_scholar" id="scholar" @click="clickScholar">
          <el-icon size="20" style="margin-right: 5px;vertical-align: bottom"><View /></el-icon>关注学者
        </div>
        <div class="left_paper" id="paper" @click="clickPaper">
          <el-icon size="20" style="margin-right: 5px;vertical-align: bottom"><Star /></el-icon>收藏论文
        </div>
    </div>
    <div class="main_right">
        <div v-if="pageType===0" style="margin-bottom: 30px">
            <div class="main_right_inform_top">
              <el-icon size="30" style="color: lightgrey;vertical-align: bottom;margin-right: 10px"><InfoFilled /></el-icon>
              <span style="color:midnightblue;font-family: 幼圆;">个人信息</span>
            </div>
            <div class="main_right_inform_left">
              <el-avatar :size="160" :src="userPhoto" />
            </div>
            <div class="main_right_inform_right">
              <el-form :model="form" label-width="120px">
                <el-form-item label="昵称:">
                  <span style="margin-left: 30px">
                    {{userinfo.nickName}}
                  </span>
                </el-form-item>
                <el-form-item label="email:">
                  <span style="margin-left: 30px">
                    {{userinfo.email}}
                  </span>
                </el-form-item>
                <el-form-item label="求助次数:">
                  <span style="margin-left: 30px">
                    {{userinfo.n_request}}
                  </span>
                </el-form-item>
                <el-form-item label="应助次数:">
                  <span style="margin-left: 30px">
                    {{userinfo.n_help}}
                  </span>
                </el-form-item>
                <el-form-item label="关注学者数:">
                  <span style="margin-left: 30px">
                    {{userinfo.follows}}
                  </span>
                </el-form-item>
                <el-form-item label="投诉次数:">
                  <span style="margin-left: 30px">
                    {{userinfo.complaints}}
                  </span>
                </el-form-item>
                <el-form-item label="财富值:">
                  <span style="margin-left: 30px">
                    {{userinfo.wealth}}
                  </span>
                </el-form-item>
              </el-form>
            </div>
        </div>
        <div v-if="pageType===1" style="margin-bottom: 30px">
          <div style="margin-top: 20px">
            <span style="margin-left: 30px;font-size: 15px;color: #73767a">
              关注的学者:
            </span>
          </div>
          <div v-for="(item,index) in scholars" :key="index"
               style=" height: 150px; width: 410px;
                    display: inline-block;  margin-left: 30px;margin-top: 20px;">
            <scholar-list :name="item.name" :paper_num="item.paper_num" :institution="item.institution"></scholar-list>
          </div>
        </div>
        <div v-if="pageType===2" style="margin-bottom: 30px">
          <div style="margin-top: 20px">
            <span style="margin-left: 30px;font-size: 15px;color: #73767a">
              收藏的论文:
            </span>
          </div>
          <div v-for="(item,index) in papers" :key="index">
            <paper-show :author="item.authors[0].name" :abstract="item.abstract" :org="item.publisher"
                        :paper-name="item.title" :type="type" :num="item.n_citation"
                        style="margin-left: 10%;margin-top: 20px;width: 80%"></paper-show>
          </div>
        </div>
    </div>
  </div>

</template>

<script>
import {userAxios} from "@/axios/index";
export default {
  name: "UserHome",
  data(){
    return{
      form:[],
      pageType:0,//0-个人信息，1-关注学者，2-收藏论文,
      userPhoto:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      userinfo: {
        nickName:'MyShirt',
        email:"111@qq.com",
        n_request: "121", // 求助次数
        n_help: "131", // 应助次数
        follows:0,//关注学者量
        complaints:0,//投诉次数
        wealth: "0" // 财富值
      },
      scholars:[
        {
          "id":"",
          "name":"刘伟",
          "institution":"安全",
          "paper_num":111,
        },
        {
          "id":"",
          "name":"张本",
          "institution":"不安全",
          "paper_num":111,
        },
        {
          "id":"",
          "name":"蒋子",
          "institution":"无敌",
          "paper_num":111,
        },
        {
          "id":"",
          "name":"翔子",
          "institution":"摆烂",
          "paper_num":111,
        },
        {
          "id":"",
          "name":"桑杰",
          "institution":"质疑",
          "paper_num":111,
        },
        {
          "id":"",
          "name":"桑杰",
          "institution":"质疑",
          "paper_num":111,
        },
        {
          "id":"",
          "name":"桑杰",
          "institution":"质疑",
          "paper_num":111,
        },
        {
          "id":"",
          "name":"桑杰",
          "institution":"质疑",
          "paper_num":111,
        },
      ],
      papers:[
        {
          "title": "test0",
          "abstract": "000",
          "authors": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "publisher": "aaa", //期刊
        },
        {
          "title": "test1",
          "abstract": "111",
          "authors": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "publisher": "aaa", //期刊
        },
        {
          "title": "test2",
          "abstract": "111",
          "authors": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "publisher": "aaa", //期刊
        },
        {
          "title": "test3",
          "abstract": "111",
          "authors": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "publisher": "aaa", //期刊
        },
        {
          "title": "test4",
          "abstract": "111",
          "authors": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "publisher": "aaa", //期刊
        },
        {
          "title": "test5",
          "abstract": "111",
          "authors": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "publisher": "aaa", //期刊
        },
        {
          "title": "test6",
          "abstract": "111",
          "authors": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "publisher": "aaa", //期刊
        },
        {
          "title": "test7",
          "abstract": "111",
          "authors": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "publisher": "aaa", //期刊
        },
        {
          "title": "test8",
          "abstract": "111",
          "authors": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "publisher": "aaa", //期刊
        },
        {
          "title": "test9",
          "abstract": "111",
          "authors": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "publisher": "aaa", //期刊
        },
        {
          "title": "test10",
          "abstract": "111",
          "authors": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "publisher": "aaa", //期刊
        },
        {
          "title": "test11",
          "abstract": "111",
          "authors": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "publisher": "aaa", //期刊
        },
      ],
    }
  },
  methods:{
    clickInform(){
      this.pageType=0;
      document.getElementById('inform').style.color='#007dfa';
      document.getElementById('scholar').style.color='#000000';
      document.getElementById('paper').style.color='#000000'
    },
    clickScholar(){
      this.pageType=1;
      document.getElementById('inform').style.color='#000000';
      document.getElementById('scholar').style.color='#007dfa';
      document.getElementById('paper').style.color='#000000'
    },
    clickPaper(){
      this.pageType=2;
      document.getElementById('inform').style.color='#000000';
      document.getElementById('scholar').style.color='#000000';
      document.getElementById('paper').style.color='#007dfa'
    }
  },
  created() {
      userAxios({
        method:"post",
        url:'user/user-infor'
      }).then((res)=>{
        console.log(res.data);
      });

  }
}
</script>

<style scoped>

.main_body{
  /*background-color: #FAF9F6;*/
  background: #f3f3f3
}

.navigation{
  position: fixed;
  z-index: 100;
  width: 130px;
  margin-left: -120px;
  margin-top: 30px;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
}

.main_left{
  background-color: white;
  display: inline-block;
  vertical-align: top;
  border: 3px white solid;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
  margin-left: 50px;
  margin-top: 50px;
  width: 15%;
  height: 170px;
}

.main_right{
  background-color: white;
  display: inline-block;
  vertical-align: top;
  border: 3px white solid;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
  margin-left: 50px;
  margin-top: 50px;
  width: 60%;
  /*height: 1000px;*/
}

.left_inform{
  margin-top: 20px;
  /*border: 3px saddlebrown solid;*/
  font-size: 15px;
  text-align: center;
  height: 50px;
  transition: 0.2s;
}

.left_inform:hover{
  margin-top: 20px;
  /*border: 3px saddlebrown solid;*/
  font-size: 17px;
  color: #007dfa;
  cursor: pointer;
  text-align: center;
  height: 50px;
  transition: 0.2s;
}

.left_inform:active{
  margin-top: 20px;
  /*border: 3px saddlebrown solid;*/
  font-size: 22px;
  color: #007dfa;
  cursor: pointer;
  text-align: center;
  height: 50px;
  transition: 0.2s;
}


.left_paper{
  /*border: 3px seagreen solid;*/
  font-size: 15px;
  text-align: center;
  height: 50px;
  transition: 0.2s;
  color: #333333;
}

.left_paper:hover{
  /*border: 3px saddlebrown solid;*/
  font-size: 17px;
  color: #007dfa;
  cursor: pointer;
  text-align: center;
  height: 50px;
  transition: 0.2s;
}

.left_scholar{
  /*border: 3px skyblue solid;*/
  font-size: 15px;
  text-align: center;
  height: 50px;
  transition: 0.2s;
  color: #333333;
}

.left_scholar:hover{
  /*border: 3px saddlebrown solid;*/
  font-size: 17px;
  color: #007dfa;
  cursor: pointer;
  text-align: center;
  height: 50px;
  transition: 0.2s;
}

.main_right_inform_top{
  margin-top: 20px;
  margin-left: 30px;
  font-size: 25px;
}

.main_right_inform_left{
  vertical-align: top;
  display: inline-block;
  /*border: 3px midnightblue solid;*/
  width: 160px;
  height: 160px;
  margin-top: 50px;
  margin-left: 50px;
}

.main_right_inform_right{
  vertical-align: top;
  display: inline-block;
  /*border: 3px midnightblue solid;*/
  margin-top: 20px;
  margin-left: 30px;
  height: 500px;
  width: 500px;
}

.main_right_inform_right_box{
  font-size: 20px;
  margin-top: 30px;
  /*font-family: 幼圆;*/
  color: #333333;
}

.span_box{
  text-align: right;
  font-family: '微软雅黑', sans-serif;
  margin-right: 20px;
  width: 100px;
  color: #333333;
}
</style>