<template>
  <div class="top_search">
    <div class="top_search_img">
      <img src="../../assets/logo.png" width="100" height="100"/>
    </div>
    <div class="top_search_mid" >
        <div style="width: 40% ;margin-left: 30%;margin-top: 70px">
          <div class = "right-head-choose-tab" id="normal-search-btn" @click="showNormal">
            <span class = "font-1"> 普通检索</span>
          </div>
          <div class = "right-head-choose-tab" id="advanced-search-btn" style="margin-left: 220px" @click="showAdvance">
            <span class = "font-1"> 高级检索</span>
          </div>
        </div>
    </div>
    <div class="top_search_right">
      <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          style="margin-left: 30%;margin-top: 10%"
      />
    </div>
  </div>
  <div class="search_main">
      <div class="normal_search" v-if="this.searchType===false">
        <el-select v-model="value[0]" class="m-2" placeholder="Select" size="middle" style="width: 100px;margin-top: 30px;margin-left: 110px">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
        <el-input v-model="inputValue[0]" placeholder="Please input" clearable style="width: 450px; margin-left: 30px;margin-top: 30px"/>
        <el-icon size="30px" style="margin-left: 40px;vertical-align: top;margin-top: 31px;margin-bottom: 25px"><Search/></el-icon>
      </div>

      <div class="advance_search" v-else>
        <div v-for="index in searchNum" :key="index">
          <el-select v-if="index==1" disabled v-model="ANvalue[index-1]" class="m-2" placeholder="Select" size="middle" style="width: 75px;margin-top: 30px;margin-left: 30px">
            <el-option
                v-for="item in ANoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
          <el-select v-else v-model="ANvalue[index-1]" class="m-2" placeholder="Select" size="middle" style="width: 75px;margin-top: 30px;margin-left: 30px">
            <el-option
                v-for="item in ANoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
          <el-select v-model="value[index-1]" class="m-2" placeholder="Select" size="middle" style="width: 100px;margin-top: 30px;margin-left: 30px">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
          <el-input v-model="inputValue[index-1]" placeholder="Please input" clearable style="width: 450px; margin-left: 30px;margin-top: 30px"/>
          <el-icon v-if="index>2" size="20px" style="margin-left: 20px;vertical-align: top;margin-top: 34px" @click="decreaseNum(index)"><Minus /></el-icon>
          <el-icon v-if="index===searchNum" size="20px" style="margin-left: 20px;vertical-align: top;margin-top: 34px" @click="addNum"><Plus /></el-icon>
        </div>
        <div style="display: inline-block;margin-left: 30px;margin-top: 40px">年份范围</div>
        <el-date-picker
            v-model="beginYear"
            type="year"
            placeholder="Pick a year"
            style="width: 130px; margin-left: 40px"
        /> ----
        <el-date-picker
            v-model="endYear"
            type="year"
            placeholder="Pick a year"
            style="width: 130px; margin-left: 5px"
        />
        <el-icon size="30px" style="margin-left: 400px;vertical-align: top;margin-top: 50px;margin-bottom: 10px"><Search/></el-icon>
      </div>
  </div>
  <div class="paper_main">
    <div class="paper_main_left">
      <el-collapse style="margin-left: 10px;margin-right: 10px">
        <el-collapse-item>
          <template #title >
            <span style="margin-left: 40%;font-size: 25px">主题</span>
          </template>
          <div v-for="index in themes.length" :key="index">
            <el-checkbox v-model="themesCheck[index-1]" style="margin-left: 40%">{{ this.themes[index-1].name }}</el-checkbox>
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template #title >
            <span style="margin-left: 40%;font-size: 25px">领域</span>
          </template>
          <div v-for="index in fields.length" :key="index">
            <el-checkbox v-model="fieldsCheck[index-1]" style="margin-left: 40%">{{ this.fields[index-1].name }}</el-checkbox>
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template #title >
            <span style="margin-left: 40%;font-size: 25px">年份</span>
          </template>
          <div v-for="index in years.length" :key="index">
            <el-checkbox v-model="yearsCheck[index-1]" style="margin-left: 40%">{{ this.years[index-1].name }}</el-checkbox>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="paper_main_right">
      <div style="margin-left: 30px;margin-top: 20px;display: inline-block;width: 80%"><span style="font-family: 幼圆; font-size: 20px;">一共为您找到{{this.paperNum}}条数据:</span></div>
      <div style="display: inline-block;width: 15%;">
        <el-select v-model="sortType" placeholder="按相关性降序" style="width: 80%;border-radius: 10px;box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);">
          <el-option
              v-for="item in sorts"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="example-pagination-block">
        <div v-for="(item,index) in papers" :key="item">
          <paper-show :author="item.authors[0].name" :abstract="item.abstract" :org="item.publisher"
                      :paper-name="item.title" :type="type" :num="item.n_citation"
                      style="margin-left: 50px;margin-top: 20px" v-if="index-(nowPage-1)*10<=10&&index>(nowPage-1)*10"></paper-show>
        </div>
        <el-pagination background layout="prev, pager, next,jumper" :total="this.paperNum" @current-change="handleCurrentChange()" v-model:current-page="nowPage"
                />
      </div>
    </div>

  </div>
</template>

<script>

import PaperShow from "@/components/paperShow";
import qs from "qs";

export default {
  components: {PaperShow},
  data(){
    return{
      nowPage:1,
      type:0,
      searchType:false,
      value:['标题','标题','标题'],
      searchNum:3,
      paperNum:20, //一共找到的论文数
      options:[
        {
          value: '标题',
          label: '标题',
        },
        {
          value: '作者',
          label: '作者',
        },
        {
          value: '关键字',
          label: '关键字',
        },
        {
          value: '摘要',
          label: '摘要',
        },
        {
          value: 'DOI',
          label: 'DOI',
        },
        {
          value: '期刊',
          label: '期刊',
        },
        {
          value: '作者单位',
          label: '作者单位',
        },
      ],
      sortType:'',
      sorts:[
        {
          label:'按相关性降序',
          value:'按相关性降序'
        },
        {
          label:'按被引量降序',
          value:'按被引量降序'
        },
        {
          label:'按时间降序',
          value:'按时间降序'
        }
      ],
      inputValue:['',''],
      ANvalue:['AND','AND','AND'],
      ANoptions:[
        {
          value: 'AND',
          label: 'AND',
        },
        {
          value: 'OR',
          label: 'OR',
        },
        {
          value: 'NOT',
          label: 'NOT',
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
      beginYear:0,
      endYear:0,
      themes:[{name :'theme1'},{name:"theme2"}],
      themesCheck:[false,false],
      fields:[{name:"aa"},{name:"bb"}],
      fieldsCheck:[false,false],
      years:[{name:"2001"},{name:"2002"}],
      yearsCheck:[false,false],
    }
  },
  methods:{

    showNormal() {
      this.searchType=false;
      document.getElementById("normal-search-btn").style.borderBottom = "4px solid lightblue";
      document.getElementById("advanced-search-btn").style.borderBottom = "0px solid white";
    },
    showAdvance() {
      this.searchType=true;
      document.getElementById("advanced-search-btn").style.borderBottom = "4px solid lightblue";
      document.getElementById("normal-search-btn").style.borderBottom = "0px solid white";
    },
    decreaseNum(index){
      this.inputValue.splice(index-1,1);
      this.value.splice(index-1,1);
      this.ANvalue.splice(index-1,1);
      this.searchNum--;
    },
    addNum(){
      this.value[this.searchNum]='标题';
      this.ANvalue[this.searchNum]='AND';
      this.searchNum++;
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: '主题' }, { name: '年份' },{name: '领域' }]);
      }
      if (node.level > 2) return resolve([]);

      var hasChild1=false,hasChild2=false,hasChild3=false;
      if (node.data.name === '主题') {
        hasChild1 = true;
      } else if (node.data.name === '年份') {
        hasChild2 = true;
      } else if (node.data.name === '领域') {
        hasChild3 = true;
      }
      setTimeout(() => {
        var data;
        if (hasChild1) {
          data = this.themes;
        } else if(hasChild2){
          data = this.years;
        }else if (hasChild3){
          data=this.fields;
        }else {
          data=[];
        }
        resolve(data);
      }, 500);
    },
    handleCurrentChange(){
      //todo:axios 页面变换
      let toSend={
        search_content: [{"type":0,"search_type":0,"content":"","is_exact":0}],
        start_year:2000,
        end_year:2020,
        page: this.nowPage,
        sort_type:0,
      };
      this.axios({
        method:'post',
        url:'/api/search/paper',
        data:JSON.stringify(toSend)
      }).then((res) =>{
        console.log(res.data);

      })

      console.log(this.nowPage);
    }
  },
  created() {
    let searchType=qs.parse(this.$route.query.searchType);
    this.inputValue[0]=this.$route.query.content;
    this.value[0]=searchType.type;
  }
}

</script>

<style scoped>

.top_search{
  background-color: lavender;
}

.top_search_img{
  vertical-align:top;
  display: inline-block;
  width: 20%;
  text-align: center;
  height: 100px;
}

.top_search_mid{
  vertical-align:top;
  display: inline-block;
  width: 60%;
  height: 100px;
}

.right-head-choose-tab {
  height: 37px;
  margin-left: 2%;
  display: inline-block;
  position: absolute;
  font-size: 22px;
  color: firebrick;
  transition: all 0.25s;
}
.right-head-choose-tab:hover {
  background-color: aliceblue;
  border-radius: 5px;
  cursor: pointer;
  font-size: 24px;
}
#normal-search-btn{
  transition: all 0.5s;
}
#advanced-search-btn{
  transition: all 0.5s;
}
.font-1 {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
}

.top_search_right{
  vertical-align:top;
  display: inline-block;
  width: 20%;
  height: 100px;
}

.search_main{
  margin-top: 20px;
  /*border: 3px solid rosybrown;*/
  /*height: 300px;*/
}

.normal_search{
  border: 1px #777755 solid;
  box-shadow: 1px 1px 3px #888888;
  border-radius: 20px;
  /*height: 300px;*/
  margin-left: 20%;
  margin-right: 20%;
  /*margin-bottom: 20px;*/
}

.advance_search{
  border: 1px #777755 solid;
  box-shadow: 1px 1px 3px #888888;
  border-radius: 20px;
  /*height: 300px;*/
  margin-left: 20%;
  margin-right: 20%;
  /*margin-bottom: 20px;*/
}

.paper_main{
  /*border: 3px red solid;*/
  margin-top: 30px;
  height: 900px;
}

.paper_main_left{
  border: 1px #777755 solid;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
  vertical-align: top;
  display: inline-block;
  width: 20%;
  height: 100%;
}

.paper_main_right{
  border: 1px #777755 solid;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
  vertical-align: top;
  margin-left: 3%;
  display: inline-block;
  width: 76%;
}

.example-pagination-block{
  margin-top: 30px;
}

.el-pagination {
  margin:50px auto 10px;
  width: 40%;
}

</style>