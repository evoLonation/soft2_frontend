<template>
  <!--  顶部栏-->
  <div class="main_skeleton">
    <p class="main_title">
        学者主页
    </p>
    <div class="main_search">
      <el-input v-model="inputName" placeholder="请输入要搜索的学者名"  size="large"  style=" width: 20%;
               margin-left: 20%;">
        <template #prepend>学者名</template>
      </el-input>
      <el-input v-model="inputOrg" placeholder="请输入该学者的机构名" size="large"  style="width: 35%;
               margin-left: 0px">
        <template #prepend>机构名</template>
        <template #append>
          <el-icon size="20" style="width: 30px;" @click="scholarSearch"><Search/></el-icon>
        </template>
      </el-input>

    </div>
    <div class="main_result">
        <div style="margin-top: 10px;margin-left: 5%"><span style="font-size: 20px">为您检索到{{ this.num }}条结果：</span></div>
        <div class="scholar_searched">
            <div v-for="(item,index) in scholars.slice(0,6)" :key="index"
                 style=" height: 150px; width: 400px;
                    display: inline-block;  margin-left: 40px;margin-top: 20px;">
                    <scholar-list  :id="item.id" :name="item.name" :paper_num="item.paper_num" :institution="item.institution" :type="0"></scholar-list>
            </div>
        </div>
        <el-pagination background layout="prev, pager, next, jumper" :total="this.num" page-size="6" v-model:current-page="nowPage" @current-change="scholarSearch"
                        />
    </div>
  </div>
</template>

<script>
import ScholarList from "@/components/scholarList";
import {paperScholarAxios} from "@/axios/index"
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
          "id":"1",
          "name":"刘伟",
          "institution":"安全",
          "paper_num":111,
        },
        {
          "id":"1",
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
    scholarSearch(){
      let that=this;
      let toSend={
        name:this.inputName,
        institution:this.inputOrg,
        start:this.nowPage*10,
        end:(this.nowPage+1)*10
      };
      paperScholarAxios({
        method:'post',
        url:'search/scholar',
        data:JSON.stringify(toSend)
      }).then((res)=>{
        let response=res.data;
        that.scholars=response.scholar;
        that.num=response.scholar_num;
        that.nowPage=1;
        console.log(res.data);
      })

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

 .search_button:hover{
   size: 30;
 }
</style>