/****
  使用时注意传参，具体传参方式如下：
<!--    <paper-show :author="authors" :abstract="abstract" :org="publisher"-->
<!--                  :paper-name="title" :type="0" :num="n_citation" :paperid="id"-->
<!--                      ></paper-show>-->
  其中type代表类型：
      普通请使用0（int），
      无阴影使用4
      取消收藏使用1
      author为对象，其结构必须包括id和name，即
          author=[
            {id:'1',name:'张三'}
          ]
****/
<template>
  <div class="paper_skeleton" v-if="type===0">
    <div class="paper_name" @click.prevent="gotoPaper">
        {{this.paperName}}
    </div>
    <div class="paper_abstract_1">论文简介: {{this.abstract}}</div>
    <div class="paper_author" style="margin-bottom: 10px" v-if="author!=null">

      <span v-for="(item,index) in author.slice(0,4)" :key="index">
        <span @click.prevent="gotoScholar(index)" class="author_name">{{item.name}}，</span>
        <span v-if="index===3">...-</span>
      </span>

      <span class="org_name">{{this.org}}</span>  -  被引量:{{this.num}}</div>
    <div class="paper_author" style="margin-bottom: 10px" v-else>
      作者不详-
      {{this.org}}  -  被引量:{{this.num}}</div>
  </div>

  <div class="paper_skeleton_3" v-else-if="type===4">
    <div class="paper_name" @click.prevent="gotoPaper">
      {{this.paperName}}
    </div>
    <div class="paper_abstract_1">论文简介: {{this.abstract}}</div>
    <div class="paper_author" style="margin-bottom: 10px" v-if="author!=null">
      <span v-for="(item,index) in author.slice(0,4)" :key="index">
        <span @click="gotoScholar(index)" class="author_name">{{item.name}}，</span>
        <span v-if="index===3">...-</span>
      </span>
      {{this.org}}  -  被引量:{{this.num}}</div>
    <div class="paper_author" style="margin-bottom: 10px" v-else>
      作者不详-
      {{this.org}}  -  被引量:{{this.num}}</div>
  </div>

  <div class="paper_skeleton_2" v-else>
    <div class="inf_divide" style="width: 80%; height: 100%">
      <div class="paper_name" style="margin-top: 3%" @click.prevent="gotoPaper">{{this.paperName}}</div>
      <div class="paper_author" style="margin-top: 10px" v-if="author!=null">
        <span v-for="(item,index) in author.slice(0,4)" :key="index">
        <span @click="gotoScholar(index)" class="author_name">{{item.name}}，</span>
        <span v-if="index===3">...-</span>
      </span>  {{this.org}}  </div>
      <div class="paper_author" style="margin-bottom: 10px" v-else>
        作者不详-
        {{this.org}}</div>
    </div>
    <div class="inf_divide" style="width: 20%; height: 100%">
      <el-button type="danger" plain class="button_type" @click.prevent="cancelStar">取消收藏</el-button>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import {userAxios} from "@/axios";
import {ElMessage} from "element-plus";

export default {
  name: "paperShow",
  props:[
      'paperName','abstract','author','org','num','type','paperId'
  ],
  setup(props){
    const router = useRouter();

    const gotoPaper = () => {
      router.push({
        name:'Paper',
        params:{
          paperId:props.paperId
        }
      });
    }
    const gotoScholar = (index) => {
      router.push({
        name:'Scholar',
        params:{
          scholarId:props.author[index].id
        }
      })
    }

    const cancelStar = () =>{
      let toSend={
        paper_id:props.paperId
      };
      console.log(props.paperId);
        userAxios({
          method:'post',
          url:'paper/star/cancel',
          data:toSend
        }).then((res) =>{
          router.go();
          if(res.data.code===0){
            ElMessage({
              message: '取消成功！',
              type: 'success',
            });
          }
          else ElMessage({
            message: '取消失败！',
            type: 'error',
          });
        })
    }

    return {
      gotoPaper,gotoScholar,cancelStar
    }
  },
  data(){
    return{

    }
  },
  methods:{
    switchType(type){
      if(type==0){
        return true;
      }
      else {
        return false;
      }
    }
  }
}
</script>

<style scoped>

.inf_divide{
  vertical-align:top;
  display: inline-block;
  margin-top: 0px;
}

.button_type{
  /*margin-right: 50px;*/
  margin-top: 21%;
}

.paper_skeleton{
  background-color: white;
  border: 0.001px white solid;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
  min-width: 600px;
  padding-bottom: 20px;
  /*min-height: 150px;*/
  /*position: relative;*/
}

.paper_skeleton_3{
  background-color: white;
  border: 0.001px white solid;
  border-radius: 4px;
  /*box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);*/
  min-width: 600px;
  padding-bottom: 20px;
  /*padding-top: 1px;*/
  /*min-height: 150px;*/
  /*position: relative;*/
}
.paper_skeleton_3:hover{
  background-color: #F1F5F9;
  transition:  .3s ease;
  /*border: 0.001px ghostwhite solid;*/
  border-radius: 4px;
  /*box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);*/
  min-width: 600px;
  padding-bottom: 20px;
  /*min-height: 150px;*/
  /*position: relative;*/
}

.paper_skeleton:hover{
  background-color: white;
  border-radius: 4px;
  /*border: 1px #777755 solid;*/
  box-shadow: -0.5px 2px 5px rgba(0,0,0,0.21),
              0 -1px 5px rgba(0,0,0,0.21),
              2px 2px 5px rgba(0,0,0,0.21);
  min-width: 600px;
  padding-bottom: 20px;
  /*min-height: 150px;*/
  /*position: relative;*/
}

.paper_skeleton_2{
  background-color: white;
  border: 0.001px white solid;
  border-radius: 4px;
  /*box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);*/
  min-width: 600px;
  padding-bottom: 35px;
  /*min-height: 150px;*/
  /*position: relative;*/
}

.paper_skeleton_2:hover{
  background-color: #F1F5F9;
  transition:  .3s ease;
  border-radius: 4px;
  border: 1px white solid;
  /*box-shadow: -0.5px 2px 5px rgba(0,0,0,0.15),*/
  /*            0 -1px 5px rgba(0,0,0,0.10),*/
  /*            4px 4px 10px rgba(0,0,0,0.10);*/
  min-width: 600px;
  padding-bottom: 35px;
  /*min-height: 150px;*/
  /*position: relative;*/
}
.paper_name{
  vertical-align: top;
  cursor: pointer;
  position: relative;
  margin-left: 48px;
  margin-top: 30px;
  font-size: 20px;
  height: 25%;
  text-decoration: underline;
  color: #007dfa;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.paper_abstract_1{
  position: relative;
  /*border: 2px blue solid;*/
  margin-left: 48px;
  margin-top: 12px;
  margin-right: 48px;
  font-size: 16px;
  color: #b0b2b3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -moz-box;
  -moz-line-clamp: 2;
  -moz-box-orient: vertical;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
}


.paper_author{
  margin-left: 48px;
  position: relative;
  margin-top: 10px;
  font-size: 16px;
  color: #b0b2b3;
}

.author_name{
  vertical-align: bottom;
  display: inline-block;
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.author_name:hover{
  vertical-align: bottom;
  display: inline-block;
  max-width: 100px;
  color: #79bbff;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.org_name{
  vertical-align: bottom;
  display: inline-block;
  max-width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.button_cancel{
  margin-bottom: 10px;
}

</style>