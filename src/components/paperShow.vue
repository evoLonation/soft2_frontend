/*使用时注意传参，具体传参方式参考testSearch，
  其中type代表类型：
      普通请使用0（int），在添加学术成功页面使用1-3，分别代表申请认领、已经认领和论文申诉
*/
<template>
  <div class="paper_skeleton" v-if="type==0">
    <div class="paper_name">{{this.paperName}}</div>
    <div class="paper_abstract_1">论文简介: {{this.abstract}}</div>
    <div class="paper_author">{{this.author}}  -  {{this.org}}  -  被引量:{{this.num}}</div>
  </div>
  <div class="paper_skeleton" v-else>
    <div class="inf_divide" style="width: 600px; height: 167px">
      <div class="paper_name" style="margin-top: 38px;width: 600px;" >{{this.paperName}}</div>
      <div class="paper_author" style="margin-top: 30px;width: 600px;">{{this.author}}  -  {{this.org}}  -  被引量:{{this.num}}</div>
    </div>
    <div class="inf_divide" style="width: 375px; height: 167px">
      <el-button class="button_type" type="primary" v-if="type==1">申请认领</el-button>
      <el-button class="button_type" type="success" v-if="type==2">已经认领</el-button>
      <el-button class="button_type" type="danger" v-if="type==3">论文申诉</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "paperShow",
  props:[
      'paperName','abstract','author','org','num','type'
  ],
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
  margin-left: 200px;
  margin-top: 68px;
}

.paper_skeleton{
  border: 2px #777755 solid;
  border-radius: 3px;
  box-shadow: 1px 1px 3px #888888;
  width: 975px;
  height: 167px;
}

.paper_name{
  /*border: 2px red solid;*/
  margin-left: 48px;
  margin-top: 20px;
  font-size: 20px;
  text-decoration: underline;
  color: #007dfa;
}

.paper_abstract_1{
  /*border: 2px blue solid;*/
  margin-left: 48px;
  margin-top: 20px;
  margin-right: 48px;
  font-size: 16px;
  color: #b0b2b3;
}

.paper_abstract_2{
  /*border: 2px blue solid;*/
  margin-left: 48px;
  margin-top: 20px;
  margin-right: 300px;
  font-size: 16px;
  color: #b0b2b3;
}

.paper_author{
  /*border: 2px green solid;*/
  margin-left: 48px;
  margin-top: 18px;
  font-size: 16px;
  color: #b0b2b3;
}

</style>