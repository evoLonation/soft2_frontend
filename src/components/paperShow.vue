/*
  使用时注意传参，具体传参方式参考testSearch，
  其中type代表类型：
      普通请使用0（int），在添加学术成功页面使用1-3，分别代表申请认领、已经认领和论文申诉
*/
<template>
  <div class="paper_skeleton" v-if="type==0">
    <div class="paper_name" @click="gotoPaper">
        {{this.paperName}}
    </div>
    <div class="paper_abstract_1">论文简介: {{this.abstract}}</div>
    <div class="paper_author" style="margin-bottom: 10px">{{this.author}}  -  {{this.org}}  -  被引量:{{this.num}}</div>
  </div>
  <div class="paper_skeleton_2" v-else>
    <div class="inf_divide" style="width: 80%; height: 100%">
      <div class="paper_name" style="margin-top: 3%" >{{this.paperName}}</div>
      <div class="paper_author" style="margin-top: 10px">{{this.author}}  -  {{this.org}}  -  被引量:{{this.num}}</div>
    </div>
    <div class="inf_divide" style="width: 20%; height: 100%">
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
      'paperName','abstract','author','org','num','type','id'
  ],
  setup(prop){
    const gotoPaper = () => {
      console.log(prop.id)

    }
    return {
      gotoPaper
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
  margin-right: 50px;
  margin-top: 60px;
}

.paper_skeleton{
  border: 0.001px ghostwhite solid;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
  min-width: 600px;
  padding-bottom: 20px;
  /*min-height: 150px;*/
  /*position: relative;*/
}

.paper_skeleton:hover{
  border-radius: 10px;
  border: 1px #777755 solid;
  box-shadow:  1px 3px 5px lightgray;
  min-width: 600px;
  padding-bottom: 20px;
  /*min-height: 150px;*/
  /*position: relative;*/
}

.paper_skeleton_2{
  border: 0.001px ghostwhite solid;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
  min-width: 600px;
  padding-bottom: 35px;
  /*min-height: 150px;*/
  /*position: relative;*/
}

.paper_skeleton_2:hover{
  border-radius: 10px;
  border: 1px #777755 solid;
  box-shadow:  1px 3px 5px lightgray;
  min-width: 600px;
  padding-bottom: 35px;
  /*min-height: 150px;*/
  /*position: relative;*/
}
.paper_name{
  position: relative;
  margin-left: 48px;
  margin-top: 30px;
  font-size: 20px;
  height: 25%;
  text-decoration: underline;
  color: #007dfa;
}

.paper_abstract_1{
  position: relative;
  /*border: 2px blue solid;*/
  margin-left: 48px;
  margin-top: 12px;
  margin-right: 48px;
  font-size: 16px;
  color: #b0b2b3;
}


.paper_author{
  margin-left: 48px;
  position: relative;
  margin-top: 10px;
  font-size: 16px;
  color: #b0b2b3;
}

</style>