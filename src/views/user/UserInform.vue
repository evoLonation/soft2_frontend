<template>
<!--  顶部栏-->
  <div class="main_body">
    <el-container style="margin: auto;width: 1400px">
      <el-aside class="navigation">
        <div class="left_inform" id="inform" @click="clickInform">
          <el-icon size="20" style="margin-right: 5px;vertical-align: bottom"><User /></el-icon>个人信息
        </div>
        <div class="left_scholar" id="scholar" @click="clickScholar">
          <el-icon size="20" style="margin-right: 5px;vertical-align: bottom"><View /></el-icon>关注学者
        </div>
        <div class="left_paper" id="paper" @click="clickPaper">
          <el-icon size="20" style="margin-right: 5px;vertical-align: bottom"><Star /></el-icon>收藏论文
        </div>
      </el-aside>

<!--      <div class="main_left">-->

<!--      </div>-->
      <el-main class="main_right">

          <div v-if="pageType===0" style="margin-bottom: 30px">
              <div class="main_right_inform_top">
                <el-icon size="30" style="color: lightgrey;vertical-align: bottom;margin-right: 10px"><InfoFilled /></el-icon>
                <span style="color:midnightblue;font-family: 幼圆;">个人信息</span>
              </div>
              <div class="main_right_inform_left">
                <el-avatar :size="160" :src="userPhoto" />
                <div style="margin-left: 27px;margin-top: 19px;">
                  <el-upload
                      action="#"
                      class="avatar-uploader"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :http-request="upload"
                  >
                    <el-button type="primary" color="#D3E7FB">
                      上传头像<el-icon class="el-icon--right"><Upload /></el-icon>
                    </el-button>
                  </el-upload>

                </div>
              </div>
              <div class="main_right_inform_right">
                <el-form :model="form" label-width="120px" >
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
            <div style="margin-left: 431px;margin-top: 30px;"><el-button type="danger" round @click="logout">退出登录</el-button></div>
          </div>

          <div v-if="pageType===1" style="margin-bottom: 30px">
            <div style="margin-top: 20px">
              <span style="margin-left: 30px;font-size: 15px;color: #73767a">
                关注的学者:
              </span>
            </div>
            <div v-for="(item,index) in scholars.slice((pageScholar-1)*6,pageScholar*6)" :key="index" style="display: inline-block;margin-left: 72px;margin-top: 20px;">
              <scholar-list :name="item.scholar_name" :paper_num="item.paper_num" :institution="item.org" :id="item.scholar_id"
                              :type="1"
                            ></scholar-list>
              <el-divider  style="width: 100%; margin: 10px"/>
            </div>
            <el-pagination background layout="prev, pager, next,jumper" :total="this.pageScholarCount" v-model:current-page="pageScholar" :page-size="6"
            />
          </div>

          <div v-if="pageType===2" style="margin-bottom: 30px">
            <div style="margin-top: 20px">
              <span style="margin-left: 30px;font-size: 15px;color: #73767a">
                收藏的论文:
              </span>
            </div>
            <div v-for="(item,index) in papers.slice((pagePaper-1)*6,pagePaper*6)" :key="index" style="margin-top: 20px;">
              <paper-show :author="item.author" :abstract="item.abstract" :org="item.org"
                          :paper-name="item.paper_name" :type="1" :num="item.n_citation"
                          style="margin-left: auto;margin-top: 20px;"></paper-show>
              <el-divider  style="width: 100%; margin: 10px"/>
            </div>
            <el-pagination background layout="prev, pager, next,jumper" :total="this.pagePaperCount"  v-model:current-page="pagePaper" :page-size="6"
            />
          </div>
      </el-main>
    </el-container>
  </div>

</template>

<script>
import {userAxios,fileAxios} from "@/axios/index";
import {loginStore} from "@/store"
import {useRouter} from "vue-router";
export default {
  name: "UserHome",
  inject: ['reload'],
  setup(){
    const store = loginStore()
    const route = useRouter();
    const logout = () =>{
      store.logout();
      route.push({
        name:'Home',
      })
    }
    const flash = (ava) =>{
      store.avatarUrl=ava;
    }

    return{
      store,
      logout,
      flash
    }
  },
  data(){
    return{
      form:[],
      pagePaper:1,
      pagePaperCount:12,
      pageScholar:1,
      pageScholarCount:8,
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
          "scholar_id":"1",
          "scholar_name":"刘伟",
          "org":"安全",
          "paper_num":111,
        },
        {
          "scholar_id":"1",
          "scholar_name":"张本",
          "org":"不安全",
          "paper_num":111,
        },
        {
          "scholar_id":"1",
          "scholar_name":"蒋子",
          "org":"无敌",
          "paper_num":111,
        },
        {
          "scholar_id":"1",
          "scholar_name":"翔子",
          "org":"摆烂",
          "paper_num":111,
        },
        {
          "scholar_id":"1",
          "scholar_name":"桑杰",
          "org":"质疑",
          "paper_num":111,
        },
        {
          "scholar_id":"",
          "scholar_name":"桑杰",
          "org":"质疑",
          "paper_num":111,
        },
        {
          "scholar_id":"",
          "scholar_name":"桑杰",
          "org":"质疑",
          "paper_num":111,
        },
        {
          "scholar_id":"",
          "scholar_name":"桑杰",
          "org":"质疑",
          "paper_num":111,
        },
      ],
      papers:[
        {
          "paper_id":"0",
          "paper_name": "test0",
          "abstract": "000",
          "author": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "org": "aaa", //期刊
        },
        {
          "paper_name": "test1",
          "abstract": "111",
          "author": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "org": "aaa", //期刊
        },
        {
          "paper_name": "test2",
          "abstract": "111",
          "author": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "org": "aaa", //期刊
        },
        {
          "paper_name": "test3",
          "abstract": "111",
          "author": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "org": "aaa", //期刊
        },
        {
          "paper_name": "test4",
          "abstract": "111",
          "author": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "org": "aaa", //期刊
        },
        {
          "paper_name": "test5",
          "abstract": "111",
          "author": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "org": "aaa", //期刊
        },
        {
          "paper_name": "test6",
          "abstract": "111",
          "author": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "org": "aaa", //期刊
        },
        {
          "paper_name": "test7",
          "abstract": "111",
          "author": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "org": "aaa", //期刊
        },
        {
          "paper_name": "test8",
          "abstract": "111",
          "author": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "org": "aaa", //期刊
        },
        {
          "paper_name": "test9",
          "abstract": "111",
          "author": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "org": "aaa", //期刊
        },
        {
          "paper_name": "test10",
          "abstract": "111",
          "author": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "org": "aaa", //期刊
        },
        {
          "paper_name": "test11",
          "abstract": "111",
          "author": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "org": "aaa", //期刊
        },
      ],
    }
  },
  methods:{
    // switchPaper(){
    //
    // },
    // switchScholar(){
    //
    // },

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
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file)
      // this.value = URL.createObjectURL(file.raw)// 可以获取一段data:base64的字符串
    },
    beforeAvatarUpload(file) {
      const isPNG = file.type === 'image/jpeg' ||
          file.type === 'image/png' ||
          file.type === 'image/jpg';
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isPNG) {
        this.$message.error('上传头像图片只能是 PNG/jpg/jpeg 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isPNG && isLt2M
    },
    upload(res) {
      let that=this;
      if (res.file) {
        let form=new FormData();
        form.append("file",res.file);
          fileAxios({
            method:'post',
            url:"user/upload-avatar",
            data:form
          }).then((res) => {
            console.log(res);
            userAxios({
              method:'post',
              url:'user/user-info'
            }).then((res) =>{
              this.userPhoto=res.data.avatar_url;
              that.flash(res.data.avatar_url);
              this.reload();
            })
          })
      }
    },
  },
  mounted() {
      userAxios({
        method:"post",
        url:'user/user-info'
      }).then((res)=>{
        this.userinfo.nickName=res.data.nickname;
        this.userinfo.wealth=res.data.wealth;
        this.userinfo.complaints=res.data.complaints;
        this.userinfo.follows=res.data.follows;
        this.userinfo.n_help=res.data.n_help;
        this.userinfo.n_request=res.data.n_request;
        this.userinfo.email=res.data.email;
        this.userPhoto=res.data.avatar_url;
        console.log(res.data);
      });
      userAxios({
        method:'post',
        url:'paper/all-star'
      }).then((res) =>{
        this.papers=res.data.all_star;
        console.log(res.data);
      })
      userAxios({
        method:'post',
        url:'scholar/all-subscribe'
      }).then((res) =>{
        this.scholars=res.data.all_subscribe;
        console.log(res.data);
      })

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
  margin-left: 10px;
  margin-top: 30px;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
  background-color: white;
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
  margin-top: 2%;
  margin-left: 15%;
  margin-right: 15%;
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
  font-size: 14px;
  color: #007dfa;
  cursor: pointer;
  text-align: center;
  height: 50px;
  transition: 0.2s;
}

.left_inform:active{
  margin-top: 20px;
  /*border: 3px saddlebrown solid;*/
  font-size: 17px;
  color: #007dfa;
  cursor: pointer;
  text-align: center;
  height: 50px;
  transition: 0.2s;
}


.left_paper{
  /*border: 3px seagreen solid;*/
  font-size: 14px;
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
  font-size: 14px;
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
  margin-top: 80px;
  margin-left: 90px;
}

.main_right_inform_right{
  vertical-align: top;
  display: inline-block;
  /*border: 3px midnightblue solid;*/
  margin-top: 20px;
  margin-left: 130px;
  /*height: 500px;*/
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

.el-pagination {
  margin:50px auto 10px;
  width: 40%;
}
</style>