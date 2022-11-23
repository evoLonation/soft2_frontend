<template>
  <!--  顶部栏-->
  <div style="height: 56px;text-align: center;background-color: #007dfa">
      顶部栏
  </div>
  <div class="main_skeleton">
    <p class="main_title">
        学者主页
    </p>
    <div class="main_search">
      <el-input v-model="inputName" placeholder="请输入要搜索的学者名"  size="large"  style=" width: 20%;
               margin-left: 20%;">
        <template #prepend>学者名</template>
      </el-input>
      <el-input v-model="inputOrg" placeholder="请输入该学者的机构名" size="large"  style="width: 30%;
               margin-left: 0px">
        <template #prepend>机构名</template>
      </el-input>
      <el-icon size="40" style="margin-left: 50px;vertical-align: top"><Search/></el-icon>
    </div>
    <div class="main_result">
        <div style="margin-top: 10px;margin-left: 5%"><span style="font-size: 20px">为您检索到{{ this.num }}条结果：</span></div>
        <div class="scholar_searched">
            <div v-for="(item,index) in scholars.slice(0,6)" :key="index"
                 style=" height: 150px; width: 400px;
                    display: inline-block;  margin-left: 40px;margin-top: 20px;">
                    <scholar-list :name="item.name" :paper_num="item.paper_num" :institution="item.institution"></scholar-list>
            </div>
        </div>
        <el-pagination background layout="prev, pager, next, jumper" :total="this.num" page-size="6" v-model:current-page="nowPage" @current-change="handleCurrentChange()"
                        />
    </div>
  </div>
</template>

<script>
import ScholarList from "@/components/scholarList";
export default {
  name: "ScholarSearch",
  components: {ScholarList},
  data(){
    return{
      inputOrg:'',
      inputName:'',
      num:120,
      nowPage:1,
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
      ]
    }
  },
  methods:{
    handleCurrentChange(){
      let toSend={
        page:this.nowPage,//一次性返回的学者条目（1page为6条）
        name:this.inputName,//学者名
        institution:this.inputOrg//机构名
      };
      //todo:axios
      this.axios({
        method:'post',
        url:'/api/search/scholar',
        data:JSON.stringify(toSend),
      }).then((res)=>{
        console.log(res.data);
      })

      console.log(this.nowPage);
    }
  }
}
</script>

<style scoped>
.main_skeleton{
  /*border: 3px mediumpurple solid;*/
  /*height: 800px;*/
}

.main_title{
  /*border: 3px red solid;*/
  margin-top: 47px;
  margin-bottom: 26px;
  height: 32.24px;
  font-size: 21px;
  text-align: center;
}

.main_search{
  /*border: 3px blue solid;*/
}

.main_result{
  /*border: 3px green solid;*/
  margin-top: 20px;
  /*height: 500px;*/
}

.scholar_searched{
  /*border: 3px yellow solid;*/
  margin-left: 5%;
  margin-right: 5%;
  /*height: 300px;*/
}
 .el-pagination {
  margin:50px auto 10px;
   width: 40%;
}
</style>