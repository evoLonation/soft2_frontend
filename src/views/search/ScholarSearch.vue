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
                    display: inline-block;  margin-left: 40px;margin-top: 20px; border: 3px white solid;
                                border-radius: 10px;box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);">
                    <el-avatar :size="100" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" style="margin-top: 25px;margin-left: 20px"/>
              <div style="display: inline-block;vertical-align: top;height: 100%;width: 275px">
                <div style="font-size: 23px;margin-left: 20px;margin-top: 15px; color: #007dfa;">{{item.name}}</div>
                <div style="font-size: 18px;margin-left: 20px;margin-top: 15px; color: #b0b2b3;">{{item.institution}}</div>
                <div style="font-size: 18px;margin-left: 20px;margin-top: 15px; color: #b0b2b3;">发表的论文数:{{item.paper_num}}</div>
              </div>
            </div>
        </div>
        <el-pagination background layout="prev, pager, next, jumper" :total="this.num" page-size="6" v-model:current-page="nowPage" @current-change="handleCurrentChange()"
                        />
    </div>
  </div>
</template>

<script>
export default {
  name: "ScholarSearch",
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
      //todo:axios
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