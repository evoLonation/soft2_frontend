<template>
  <div class="home-root">
    <div class="up-area" ref="upArea">
<!--      <img src="@/assets/home2.jpg" alt="123">-->
      <div class="content">
        <div class="logo">
          <div>
            <div class="main">金刚石学术</div>
<!--            <button @click="loginState.logout()">退出登录</button>-->
            <div class="vice">在学术的海洋中探索宝藏</div>
          </div>

        </div>
        <div class="search-box">
          <div style="width: 30px;height: 10px"></div>
          <search-box>
          </search-box>
        </div>
      </div>

    </div>
    <div class="field-area">
      <div class="top">
        <div class="header">
          探索你想探索的领域....
        </div>
        <div class="search-box">
          <el-autocomplete
              v-model="fieldSearchContent"
              class=""
              style="width: 300px;margin-right: 12px;"
              placeholder="输入特定领域..."
              :fetch-suggestions="querySearch"
          >
            <template #suffix>
              <el-icon size="large" @click="gotoField(fieldSearchContent)"><search /></el-icon>
            </template>
          </el-autocomplete>
        </div>
      </div>
      <div class="block" v-for="field in fieldInfos" :key="field">
        <div class="header">
          <p class="big-field">
            {{field.type}}
          </p>
          <div class="small-field">
            相关领域： <div v-for="smallfield in field.fields" :key="smallfield" @click="gotoField(smallfield)"><span>{{ smallfield }}</span></div>
          </div>
        </div>
        <div class="body">
          <div class="paper">
            <div class="header">热门论文</div>
            <div class="item" v-for="paper in field.papers" :key="paper">
              <div class="title clickable" @click="gotoPaper(paper.paper_id)">{{paper.name}}</div>
              <div class="foot other-info">
                <div class="authors overflow">{{paperAuthorText(paper.authors)}}</div>
                <div class="cite">{{paper.n_citation}}次被引</div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="scholar">
              <div class="header">热门学者</div>
              <div class="item" v-for="scholar in field.scholars" :key="scholar">
                <div class="name clickable overflow" @click="gotoScholar(scholar.scholar_id)">{{scholar.name}}</div>
                <div class="cite other-info" >总被引量：{{scholar.ref_num}}</div>
              </div>
            </div>
            <div class="journal">
              <div class="header">热门期刊</div>
              <div class="item" v-for="journal in field.journals" :key="journal">
                <div class="clickable" @click="searchJournal(journal)">{{journal}}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>

</template>

<script>
import data from "@/assets/homedata.json";
import {ref, onMounted, onBeforeUnmount} from "vue";
import {loginStore, navigationStore} from "@/store";
import {useRouter} from "vue-router";
import searchType from "@/assets/searchType.json";
import qs from "qs";
import {paperScholarAxios} from "@/axios";
export default {
  name: "HomePage",
  // components: {NavigationBar},
  setup(){
    const router = useRouter();
    const navigationState = navigationStore();
    const upArea = ref(null);
    const isHomeTop = ref(true);
    const setNavigationBar = (isOnTop) => {
      navigationState.isOnTop = isOnTop;
      // navigationState.isOpacity = isOnTop;
      // navigationState.isDisplaySearchBox = !isOnTop;
    }
    setNavigationBar(true);
    const scrollListener = () => {
      // console.log("scroll");
      let top = upArea.value.getBoundingClientRect().top + 700 - 50;
      if(top > 0){
        setNavigationBar(true);
        // console.log("top > 0!");
      }else{
        setNavigationBar(false);
        // console.log("top < 0!");
      }
    };

    const fieldSearchContent = ref('');
    const gotoField = (field) => {
      router.push({name : "Field", query: {content: field,}})
    }
    const gotoPaper = (paperId) => {
      router.push({name : "Paper", params: {paperId : paperId}})
    }
    const gotoScholar = (scholarId) => {
      router.push({name : "Scholar", params: {scholarId : scholarId}})
    }
    const searchJournal = (journal) => {
      router.push({name: "PaperSearch", query : {searchType : qs.stringify(searchType.searchType[5]), content: journal}})
    }


    const querySearch = (queryString , cb) => {
      const results = [{value : '人工智能'}, {value: '深度学习'}, {value: '自动生成'},]
      cb(results);
    }
    const paperAuthorText = (authors) => {
      return authors.join(", ");
    }
    let fieldInfos = ([data, data, data, data]);
    paperScholarAxios.post("home/info", {
      "paper_num" : 6,//每个大类显示的最多论文数量
      "scholar_num" : 6,//每个大类显示的最多学者数量
      "journal_num" : 6,//每个大类显示的最多期刊数量
    }).then((res) => {
      fieldInfos = res.data;
    });

    window.addEventListener("scroll", scrollListener,true);
    onMounted(() => scrollListener());
    onBeforeUnmount(() => window.removeEventListener("scroll", scrollListener, true))

    const loginState = loginStore();
    return {
      upArea,
      isHomeTop,
      querySearch,
      fieldSearchContent,
      gotoField,
      fieldInfos,
      paperAuthorText,
      loginState,
      gotoPaper,
      gotoScholar,
      searchJournal,
    }
  },


}
</script>

<style lang="scss" scoped >

*{
  margin: auto;
}
.home-root{
  background-color: #f3f3f3;
  position: relative;
  top: -70px;
  width: 100%;
  min-width: 1500px;

  display: flex;
  flex-direction: column;
}
.up-area{
  height: 1000px;
  display: flex;
  flex-direction: column;
  width: 100%;
  //opacity: 50%;
  background-position: center;
  //background-image: linear-gradient(to bottom, #00000000, #f3f3f3ff), url("@/assets/home2.jpg") ;
  background-image: url("@/assets/home2.jpg") ;
  //background-position: center;
  img{
    height: 800px;
    width: 100%;
    position: absolute;
    opacity: 70%;
    background: -ms-linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,0.9));
    top:0;
    z-index: 0;
    object-fit: cover;
  }
  .content{
    .logo{
      //font-family: STZhongsong,serif;
      .main{
        font-weight: bold;
        font-size: 60px;
        color: #f1e3dd;
        margin-bottom: 30px;
      }
      .vice{
        font-size: 30px;
        //text-align : right;
        //width: 1200px;
        color: #7a3b2e;
      }
      height: 300px;
      text-align: center;

    }
    .search-box{
      display: flex;
      margin-left: auto;
      margin-right: auto;
    }
  }

}
.field-area{
  //min-width: 1000px;
  .top{
    height: 70px;
    display: flex;
    margin-top: 30px;
    margin-bottom: 20px;
    .header{
      font-size: 20px;
      margin-left: 0;
      margin-right: auto;
    }
    .search-box{
      margin-right: 0;
      margin-left: auto;
    }
  }
  .block{
    background-color: #ffffff;
    //max-width: 1300px;
    padding: 50px;
    border-radius: 5px;
    //box-shadow: 0 0 4px #dddddd,0 0 6px rgba(0,0,0,0.07);
    //border: .5px solid #b0b2b3;
    margin-bottom: 30px;
    box-shadow: 0 0 14px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
    //border-bottom: 1px solid #b0b2b3;
    .header{
      padding-bottom: 20px;
      border-bottom: 2px solid #b0b2b3;
      margin-bottom: 40px;
      font-weight: bold;
      //color: #79bbff;
      .big-field{
        font-size: 30px;
        color: #87bdd8;
      }
      .small-field{
        margin-top: 10px;
        display: flex;
        color: #8d9db6;
        *{
          margin-left: 0;
          margin-right: 20px;
        }
        * :hover{
          cursor: pointer;
          color: #8d9db6aa;
        }
      }
    }
    .body{
      display: flex;
      .clickable{
        color: #7682a2;
      }
      .clickable:hover{
        color: #bccad6;
        text-decoration: underline;
        cursor : pointer;
        transition:  .3s ease;
      }
      .other-info{
        color: #477da8;
        //color: #d9ad7c;

      }
      .overflow{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .header{
        color: #454140;
        font-size: 25px;
        padding-bottom: 15px;
        border-bottom: 1px solid #b0b2b3;
        margin-bottom: 20px;
      }
      .paper{
        width: 500px;
        margin-right: 30px;
        margin-top: 0;
        .item{
          margin-top: 10px;
          margin-bottom: 25px;
          .title{
            font-size: 18px;
          }
          .foot{
            display: flex;
            font-size: 15px;
            margin-top: 5px;
            .authors{
              margin-left: 0;
              margin-right: auto;
              max-width: 400px;
            }
            .cite{
              margin-left: auto;
              margin-right: 0;

            }
          }

        }

      }
      .right{
        margin-top: 0;
        width: 350px;
        .scholar{
          margin-bottom: 30px;
          .item{
            display: flex;
            margin-bottom: 15px;
            .name{
              font-size: 17px;
              margin-left: 10px;
              max-width: 200px;
            }
            .cite{
              padding-top: 4px;
              font-size: 13px;
              margin-right: 10px;
            }
          }
        }
        .journal{

          .item{
            margin-bottom: 15px;
            font-size: 18px;
          }
        }
      }

    }

  }
}

</style>