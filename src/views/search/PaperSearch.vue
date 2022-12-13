<template>
  <div class="home_root">
    <div class="top_search">
      <div class="top_search_mid" >
            <div class = "right-head-choose-tab"  @click="showNormal">
              <span class = "font-1" id="normal-search-btn" style="margin: 100px"> 普通检索</span>
            </div>
            <div class = "right-head-choose-tab"  @click="showAdvance">
              <span class = "font-1" id="advanced-search-btn" style="margin: 100px"> 高级检索</span>
            </div>
            <div class = "right-head-choose-tab"  @click="showProfession">
              <span class = "font-1" id="profession-search-btn" style="margin: 100px"> 专业检索</span>
            </div>
      </div>
    </div>
    <div class="search_main">
        <div class="normal_search" v-if="this.searchType===0">
          <el-select v-model="value[0]" class="m-2" placeholder="Select" size="middle" style="width: 100px;margin-left: 110px ">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
          <el-autocomplete v-model="inputValue[0]" tabindex="s"
                           placeholder="Please input" clearable :fetch-suggestions="querySearch" :trigger-on-focus="false"
                           style="width: 800px; margin-left: 30px;margin-top: 30px"/>
          <el-button style="margin-left: 40px;vertical-align: top;margin-top: 30px;margin-bottom: 25px" color="#15AB00" @click="NormalSearch(1)">
            <template #icon>
              <el-icon size="15px" ><Search/></el-icon>
            </template>
            搜索
          </el-button>

        </div>

        <div class="advance_search" v-else-if="searchType===1">
          <div v-for="index in searchNum" :key="index">
            <el-select v-if="index===1" disabled v-model="ANvalue[index-1]" class="m-2" placeholder="Select" size="middle" style="width: 75px;margin-left: 110px">
              <el-option
                  v-for="item in ANoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
            <el-select v-else v-model="ANvalue[index-1]" class="m-2" placeholder="Select" size="middle" style="width: 75px;margin-left: 110px">
              <el-option
                  v-for="item in ANoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
            <el-select v-model="value[index-1]" class="m-2" placeholder="Select" size="middle" style="width: 100px;margin-left: 30px">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
            <el-autocomplete v-model="inputValue[index-1]"  :fetch-suggestions="querySearch" @select="handleSelect" :trigger-on-focus="false"
                             placeholder="Please input" clearable style="width: 800px; margin-left: 30px;margin-top: 30px">
              <template #append>
                <el-select v-model="exact[index-1]" placeholder="Select" style="width: 90px">
                  <el-option label="精确" value="0" />
                  <el-option label="模糊" value="1" />
                </el-select>
              </template>
            </el-autocomplete>
            <el-icon v-if="index>2" size="20px" style="margin-left: 20px;vertical-align: top;margin-top: 34px" @click="decreaseNum(index-1)"><Minus /></el-icon>
            <el-icon v-if="index===searchNum" size="20px" style="margin-left: 20px;vertical-align: top;margin-top: 34px" @click="addNum"><Plus /></el-icon>
          </div>
          <div style="display: inline-block;margin-left: 216px;margin-top: 40px;">年份范围</div>
          <el-date-picker
              v-model="beginYear"
              type="year"
              placeholder="Pick a year"
              style="width: 130px; margin-left: 40px"
              value-format="YYYY"
          /> ----
          <el-date-picker
              v-model="endYear"
              type="year"
              placeholder="Pick a year"
              style="width: 130px; margin-left: 5px"
              value-format="YYYY"
          />

          <el-button style="margin-left: 101px;vertical-align: top;margin-top: 36px;margin-bottom: 20px;color: white" color="#79B4F1" @click="toProfession(true)">
            <template #icon>
              <el-icon size="15px" ><Switch/></el-icon>
            </template>
            生成检索式
          </el-button>

          <el-button style="margin-left: 101px;vertical-align: top;margin-top: 36px;margin-bottom: 20px" color="#15AB00" @click="AdvanceSearch">
            <template #icon>
              <el-icon size="15px" ><Search/></el-icon>
            </template>
            搜索
          </el-button>
        </div>

        <div class="profession_search" v-else-if="searchType===2">
          <div class="profession_search_left">
            <el-input
                v-model="inputProfession"
                :rows="8"
                type="textarea"
                placeholder="请输入检索式"
                style="width: 800px;margin-left: 100px;margin-top: 10px"
            />
            <div style="display: inline-block;margin-left: 100px;margin-top: 30px;">年份范围</div>
            <el-date-picker
                v-model="beginYear"
                type="year"
                placeholder="Pick a year"
                style="width: 130px; margin-left: 40px"
                value-format="YYYY"
            /> ----
            <el-date-picker
                v-model="endYear"
                type="year"
                placeholder="Pick a year"
                style="width: 130px; margin-left: 5px"
                value-format="YYYY"
            />
            <el-button style="margin-left: 313px;vertical-align: top;margin-top: 30px;" color="#15AB00" @click="ProfessionSearch">
              <template #icon>
                <el-icon size="15px" ><Search/></el-icon>
              </template>
              搜索
            </el-button>
          </div>
          <div class="profession_search_right">
              <div style="margin-top: 20px"><span style="font-size: 20px;margin-left: 20px;margin-top: 20px">专业检索规则:</span></div>
              <el-divider style="margin:10px auto;width: 90%"></el-divider>
              <div style="width:296px;margin: auto">
                <el-scrollbar height="224px">
                  <div><span style="font-size: 18px">可检索字段：</span></div>
                  <div style="margin-top: 10px"><span style="font-size: 16px;color: #b0b2b3;line-height: 28px">title=标题 abstract=摘要 keywords=关键字 doi=DOI号 authors.org=作者机构 authors.name=作者名称 venue=发布期刊</span></div>
                  <div style="margin-top: 20px"><span style="font-size: 18px">示例：</span></div>
                  <div style="margin-top: 10px"><span style="font-size: 16px;color: #b0b2b3;line-height: 28px">
                    1）title:machine OR title:interesting
                    <br/>
                    2）title:生态 AND keywords:"环境 卫生" OR title:标准
                    <br/>
                    3）abstract:发展 AND keywords:可持续发展 AND keywords:(经济~ AND 发展~)</span></div>
                </el-scrollbar>
              </div>
          </div>
        </div>
    </div>

    <div class="paper_main" v-if="searchBegin">
      <div class="paper_main_top">
        <div style="width: 300px">
          <span style="font-family: 微软雅黑; font-size: 13px;color: #B0B2B3;" >筛选</span>
        </div>
        <div style="margin-left: 50px;width: 900px">
          <span style="font-family: 微软雅黑; font-size: 13px;color:#B0B2B3;">一共为您找到{{this.paperNum}}条数据:</span>
        </div>
        <div style="flex: 1">
          <el-select  v-model="sortType"  @change="dealSort" placeholder="按相关性降序" style="border-radius: 4px;box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);">
            <el-option
                v-for="item in sorts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="paper_main_left">
        <el-collapse style="margin-left: 30px;margin-right: 20px" v-model="activeNames">
          <el-collapse-item name="1">
            <template #title >
              <span style="font-size: 15px">主题</span>
            </template>
            <div v-for="index in themes.length" :key="index">
              <el-checkbox v-model="themesCheck[index-1]" @change="dealFilter" style="margin-left: 10px;font-size: 13px">{{ this.themes[index-1].name }}</el-checkbox>
            </div>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template #title >
              <span style="font-size: 15px">会议/期刊</span>
            </template>
            <div v-for="index in venues.length" :key="index">
              <el-checkbox v-model="venuesCheck[index-1]" @change="dealFilter" style="margin-left: 10px;font-size: 13px">{{ this.venues[index-1].name }}</el-checkbox>
            </div>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template #title >
              <span style="font-size: 15px">机构</span>
            </template>
            <div v-for="index in institutions.length" :key="index">
              <el-checkbox v-model="institutionsCheck[index-1]" @change="dealFilter" style="margin-left: 10px;font-size: 13px">{{ this.institutions[index-1].name }}</el-checkbox>
            </div>
          </el-collapse-item>
          <el-collapse-item name="4">
            <template #title >
              <span style="font-size: 15px">年份</span>
            </template>
            <div v-for="index in years.length" :key="index">
              <el-checkbox v-model="yearsCheck[index-1]" @change="dealFilter" style="margin-left: 10px;font-size: 13px">{{ this.years[index-1].name }}</el-checkbox>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="paper_main_right">
        <div class="example-pagination-block">
          <div v-for="(item,index) in papers" :key="item">
            <paper-show :author="item.authors" :abstract="item.abstract" :org="item.publisher"
                        :paper-name="item.title" :type="0" :num="item.n_citation" :paperId="item.id"
                        style="margin-left: 50px;margin-top: 10px;vertical-align: top" v-if="index<10"></paper-show>
          </div>
          <el-pagination background layout="prev, pager, next,jumper" :total="this.paperNum" @current-change="handleCurrentChange()" v-model:current-page="nowPage"
                  />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import PaperShow from "@/components/paperShow";
import qs from "qs";
import {paperScholarAxios} from "@/axios/index";

export default {
  components: {PaperShow},
  data(){
    return{
      inputProfession:'',
      searchBegin:false,
      exact:['精确','精确','精确'],
      activeNames:['1','2','3','4'],
      nowPage:1,
      type:0,
      searchType:false,
      value:['标题','标题','标题','标题'],
      searchNum:3,
      paperNum:100, //一共找到的论文数
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
          value:'按相关性降序',
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
      inputValue:[''],
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
          "id":"1",
          "title": "test0",
          "abstract": "000",
          "authors": [{name: "a", id: "1"},{name: 'b',id:'2'},{name: "a", id: "1"},{name: "a", id: "1"},{name: "a", id: "1"},{name: "a", id: "1"}], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "publisher": "aaa", //期刊
        },
        {
          "id":"2",
          "title": "test1",
          "abstract": "111",
          "authors": [{name: "a", id: "1"},], //作者：[{名字，id}]，一作在前
          "year": 123, //发布年份
          "n_citation": 123, //被引量
          "publisher": "aaa", //期刊
        },
        {
          "id":"3",
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
          "abstract": "顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶电得到的撒大大撒旦但是打赏大撒到撒打的啊收到阿松大阿松大撒旦昂啥打赏打赏打但是打大大撒旦阿松大阿达",
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
      years:[{name:2001},{name:2002}],
      yearsCheck:[false,false],
      venues:[{name:'NATURE'},{name:'北航学报'}],
      venuesCheck:[false,false],
      institutions:[{name:'BUAA'},{name:'beili'}],
      institutionsCheck:[false,false]
    }
  },
  methods:{
    querySearch(queryString, cb) {
      // console.log(queryString)
      let toSend={
        text:queryString,
        size:5
      };
      paperScholarAxios({
        method:'post',
        url:'search/auto-complete',
        data:toSend
      }).then((res) =>{
        // console.log("auto");
        // console.log(res);
        var toSuggest=[];
        for(let i=0;i<res.data.auto_completes.length;i++){
          toSuggest.push({
            value:res.data.auto_completes[i]
          });
        }
        // console.log(toSuggest);
        cb(toSuggest);
      })
    },
    handleSelect(item){
      console.log(item)
    },
    showNormal() {
      this.searchType=0;
      document.getElementById("normal-search-btn").style.borderBottom = "4px solid lightblue";
      document.getElementById("advanced-search-btn").style.borderBottom = "0px solid white";
      document.getElementById("profession-search-btn").style.borderBottom = "0px solid white";
    },
    showAdvance() {
      this.searchType=1;
      document.getElementById("advanced-search-btn").style.borderBottom = "4px solid lightblue";
      document.getElementById("normal-search-btn").style.borderBottom = "0px solid white";
      document.getElementById("profession-search-btn").style.borderBottom = "0px solid white";
    },
    showProfession() {
      this.searchType=2;
      document.getElementById("profession-search-btn").style.borderBottom = "4px solid lightblue";
      document.getElementById("normal-search-btn").style.borderBottom = "0px solid white";
      document.getElementById("advanced-search-btn").style.borderBottom = "0px solid white";
    },
    decreaseNum(index){
      this.inputValue.splice(index,1);
      this.value.splice(index,1);
      this.ANvalue.splice(index,1);
      this.exact.splice(index,1);
      this.searchNum--;
    },
    addNum(){
      this.value[this.searchNum]='标题';
      this.ANvalue[this.searchNum]='AND';
      this.exact[this.searchNum]='精确';
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
    toTop(step){
      //参数step表示时间间隔的幅度大小，以此来控制速度
      //当回到页面顶部的时候需要将定时器清除
      document.documentElement.scrollTop-=step;
      if (document.documentElement.scrollTop>0) {
        var time=setTimeout(()=>this.toTop(step),15);
      }else {
        clearTimeout(time);
      }
    },
    handleCurrentChange(){
      //todo:axios 页面变换 !
      // console.log(this.nowPage)
      let that=this;
      let toSend=this.getFilter(this.nowPage);
      paperScholarAxios({
        method:'post',
        url:"search/paper",
        data:toSend
      }).then((res)=>{
        let response=res.data;
        that.papers=response.papers;
        console.log(res.data);
        this.toTop(100);
      })
    },
    toIntSearchType(str){
      switch (str){
        case '标题':
          return 0;
        case '作者':
          return 1;
        case '关键字':
          return 2;
        case '摘要':
          return 3;
        case 'DOI':
          return 4;
        case '期刊':
          return 5;
        case '作者单位':
          return 6;
      }
    },
    proSwitch(str){
      switch (str){
        case '标题':
          return "title";
        case '摘要':
          return "abstract";
        case '关键字':
          return "keywords";
        case 'DOI':
          return "doi";
        case '作者单位':
          return "authors.org";
        case '作者':
          return "authors.name";
        case '期刊':
          return "venue";
      }
    },
    dealTextArea(str,isExact){
      let strs=str.split(' ');
      if(strs.length===1){
        if(isExact){
          return str;
        }
        return str+'~';
      }
      else {
        if(isExact){
          return "\""+str+"\"";
        }
        let ans='(';
        for(let i=0;i<strs.length;i++){
          console.log(strs[i]);
          if(strs[i]!==''){
            ans+=strs[i]+'~';
          }
            if(i!==strs.length-1&&strs[i+1]!==''){
              ans+=' AND ';
            }

        }
        ans+=')';
        return ans;
      }
    },
    toProfession(jump){
      let ans='';
      for(let i=0;i<this.inputValue.length;i++){
        if(this.inputValue[i]===''){
          continue;
        }
        if(i===0){
          ans+=this.proSwitch(this.value[0])+':';
          ans+=this.dealTextArea(this.inputValue[0],this.exact[0]==='精确');
        }
        else {
          if(this.ANvalue[i]==='NOT'){
            ans+=' AND NOT ';
          }
          else {
            ans+=' '+this.ANvalue[i]+' ';
          }
          ans+=this.proSwitch(this.value[i])+':';
          ans+=this.dealTextArea(this.inputValue[i],this.exact[i]==='精确');
        }
      }
      if(jump){
        this.inputProfession=ans;
        this.showProfession();
      }
      else {
        return ans;
      }
    },
    toIntExact(str){
      return (str==='精确')?0:1;
    },
    toIntType(str){
      return (str==='AND')?0:1;
    },
    toIntSortType(str){
      switch (str){
        case '按相关性降序':
          return 0;
        case '按被引量降序':
          return 1;
        case '按时间降序':
          return 2;
      }
    },
    NormalSearch(page){
      let that=this;
      var toSend={
        need_filter_statistics:true,
        query:this.toProfession(false),
        start_year:0,
        end_year:0,
        years:[],
        themes:[],
        venues:[],
        institutions:[],
        sort_type:this.toIntSortType(this.sortType),
        start:10*(page-1),
        end:10*page,
      };
      paperScholarAxios({
        method:'post',
        url:"search/paper",
        data:toSend,
      }).then((res)=>{
        let response=res.data;
        that.paperNum=response.paper_num;
        that.papers=response.papers;
        that.themes=response.themes;
        that.venues=response.venues;
        that.institutions=response.institutions;
        that.years=response.years;
        that.themesCheck=[];
        that.yearsCheck=[];
        that.venuesCheck=[];
        that.institutionsCheck=[];
        that.nowPage=1;
        // console.log(res.data);
        that.searchBegin=true;
      })
    },
    AdvanceSearch(){
      var toSend={
        need_filter_statistics:true,
        query:this.toProfession(false),
        start_year:parseInt(this.beginYear),
        end_year:parseInt(this.endYear),
        years:[],
        themes:[],
        venues:[],
        institutions:[],
        sort_type:this.toIntSortType(this.sortType),
        start:0,
        end:10,
      };
      // console.log(toSend)
      let that=this;
      paperScholarAxios({
        method:'post',
        url:"search/paper",
        data:toSend
      }).then((res)=>{
        let response=res.data;
        that.paperNum=response.paper_num;
        that.papers=response.papers;
        that.themes=response.themes;
        that.years=response.years;
        that.venues=response.venues;
        that.institutions=response.institutions;
        that.themesCheck=[];
        that.yearsCheck=[];
        that.venuesCheck=[];
        that.institutionsCheck=[];
        that.nowPage=1;
        // console.log(res.data);
        that.searchBegin=true;
      })
    },
    //todo:专业检索
    ProfessionSearch(){
      var toSend={
        query:this.inputProfession,
        start_year:parseInt(this.beginYear),
        end_year:parseInt(this.endYear),
        years:[],
        themes:[],
        venues:[],
        institutions:[],
        sort_type:this.toIntSortType(this.sortType),
        start:0,
        end:10,
      };
      let that=this;
      paperScholarAxios({
        method:'post',
        url:"search/paper",
        data:toSend
      }).then((res)=>{
        let response=res.data;
        that.paperNum=response.paper_num;
        that.papers=response.papers;
        that.themes=response.themes;
        that.years=response.years;
        that.venues=response.venues;
        that.institutions=response.institutions;
        that.themesCheck=[];
        that.yearsCheck=[];
        that.venuesCheck=[];
        that.institutionsCheck=[];
        that.nowPage=1;
        // console.log(res.data);
        that.searchBegin=true;
      })
    },
    getFilter(page){
      var toSend={
        query:this.toProfession(false),
        start_year:parseInt(this.beginYear),
        end_year:parseInt(this.endYear),
        years:[],
        themes:[],
        venues:[],
        institutions:[],
        sort_type:this.toIntSortType(this.sortType),
        start:10*(page-1),
        end:10*page,
      };
      for(let i=0;i<this.themesCheck.length;i++){
        if(this.themesCheck[i]===true){
          toSend.themes.push(this.themes[i].name);
        }
      }
      for(let i=0;i<this.yearsCheck.length;i++){
        if(this.yearsCheck[i]===true){
          toSend.years.push(this.years[i].name);
        }
      }
      for(let i=0;i<this.venuesCheck.length;i++){
        if(this.venuesCheck[i]===true){
          toSend.venues.push(this.venues[i].name);
        }
      }
      for(let i=0;i<this.institutionsCheck.length;i++){
        if(this.institutionsCheck[i]===true){
          toSend.institutions.push(this.institutions[i].name);
        }
      }
      return toSend;
    },
    //todo:筛选
    dealFilter(){
      let that=this;
      var toSend=this.getFilter(1);
      // console.log(toSend);
      paperScholarAxios({
        method:'post',
        url:"search/paper",
        data:toSend
      }).then((res)=>{
        let response=res.data;
        that.paperNum=response.paper_num;
        that.papers=response.papers;
        that.nowPage=1;
        // console.log(res.data);
        this.toTop(100);
      })
    },
    dealSort(val){
      let that=this;
      let toSend=this.getFilter(1);
      toSend.sort_type=this.toIntSortType(val);
      paperScholarAxios({
        method:'post',
        url:"search/paper",
        data:toSend
      }).then((res)=>{
        let response=res.data;
        that.papers=response.papers;
        that.nowPage=1;
        // console.log(res.data);
      })
    },
  },
  mounted() {
    let searchType=qs.parse(this.$route.query.searchType);
    this.inputValue[0]=this.$route.query.content;
    this.value[0]=searchType.type;
    if(this.$route.query.type==null){
      this.showNormal();
      if(this.inputValue[0]!=='')
      this.NormalSearch(1);
    }
    else {
      this.showAdvance();
    }
  },
}

</script>

<style scoped>
.home_root{
  background-color: #f3f3f3;
  position: relative;
  width: 1690px;
  min-width: 1500px;
  height: 100%;
  flex-direction: column;
  margin: auto;
}

.top_search{
  /*background-color: lavender;*/
}


.top_search_mid{
  vertical-align:top;
  display: flex;
  margin-top: 50px;
  margin-right: auto;
  margin-left: auto;
  width: 900px;
  /*height: 100px;*/
}

.right-head-choose-tab {
  height: 37px;
  font-size: 22px;
  width: 300px;
  margin: auto;
  color: #7F8488;
  transition: all 0.25s;
}
.right-head-choose-tab:hover {
  background-color: white;
  border-radius: 4px;
  margin: auto;
  cursor: pointer;
  font-size: 25px;
}
#normal-search-btn{
  border-bottom: 4px solid lightblue;
  transition: all 0.5s;
}
#advanced-search-btn{
  transition: all 0.5s;
}
#profession-search-btn{
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
  background-color: white;
  border: 1px white solid;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
  /*box-shadow: 1px 1px 3px #888888;*/
  border-radius: 4px;
  /*height: 300px;*/
  margin-left: auto;
  margin-right: auto;
  width: 1400px;
  /*margin-bottom: 20px;*/
}

.advance_search{
  background-color: white;
  border: 1px white solid;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
  /*box-shadow: 1px 1px 3px #888888;*/
  border-radius: 4px;
  /*height: 300px;*/
  margin-left: auto;
  margin-right: auto;
  width: 1400px;
  /*margin-bottom: 20px;*/
}

.profession_search{
  /*background-color: white;*/
  /*border: 1px white solid;*/
  /*box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);*/
  /*border-radius: 4px;*/
  /*height: 300px;*/
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
  margin-right: auto;
  width: 1400px;
  /*margin-bottom: 20px;*/
}
.profession_search_left{
  padding: 20px;
  background-color: white;
  border: 1px white solid;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
  /*box-shadow: 1px 1px 3px #888888;*/
  border-radius: 4px;
  width: 1000px;
}

.profession_search_right{
  background-color: white;
  border: 1px white solid;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
  /*box-shadow: 1px 1px 3px #888888;*/
  border-radius: 4px;
  margin-left: 20px;
  flex: 1;
}

.paper_main{
  /*border: 3px red solid;*/
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  width: 1400px;
  height: 900px;
  display: flex;
  flex-wrap: wrap;
}

.paper_main_top{
  width: 1400px;
  border: 3px white ;
  display: flex;
}


.paper_main_left{
  background-color: white;
  border: 1px white solid;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
  vertical-align: top;
  display: inline-block;
  margin-top: 10px;
  width: 300px;
  height: 100%;
}

.paper_main_right{
  /*border: 1px white solid;*/
  /*border-radius: 10px;*/
  /*box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);*/
  vertical-align: top;
  width: 1000px;
  flex: 1;
}

.example-pagination-block{
  margin-top: 10px;
}

.el-pagination {
  margin:50px auto 10px;
  width: 40%;
}

</style>