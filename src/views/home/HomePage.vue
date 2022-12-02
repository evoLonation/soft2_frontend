<template>
  <div class="home-root">
    <div class="up-area" ref="upArea">
      <img src="@/assets/home.png" alt="123">
      <div class="content">
        <div class="logo">
          <div>
            <span style="font-size: 100px"> 这里是主页</span>
          </div>

        </div>
        <div class="search-box">
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
              <el-icon size="large" @click="gotoField"><search /></el-icon>
            </template>
          </el-autocomplete>
        </div>
      </div>
      <div class="block" v-for="field in fieldInfos" :key="field">
        <div class="header">
          物理科学与工程
        </div>
        <div class="body">
          <div class="paper">
            <div class="header">热门论文</div>
            <div class="item" v-for="paper in field.papers" :key="paper">
              <div class="title clickable">{{paper.name}}</div>
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
                <div class="name clickable overflow">{{scholar.name}}</div>
                <div class="cite">总被引量：{{scholar.ref_num}}</div>
              </div>
            </div>
            <div class="journal">
              <div class="header">热门期刊</div>
              <div class="item" v-for="journal in field.journals" :key="journal">
                <div class="clickable">{{journal}}</div>
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
import {ref, onMounted} from "vue";
import {loginStore, navigationStore} from "@/store";
import {useRouter} from "vue-router";
export default {
  name: "HomePage",
  // components: {NavigationBar},
  setup(){
    const router = useRouter();
    const navigationState = navigationStore();
    const upArea = ref(null);
    const isHomeTop = ref(true);
    const setNavigationBar = (isOnTop) => {
      navigationState.isOpacity = isOnTop;
      navigationState.isDisplaySearchBox = !isOnTop;
    }
    setNavigationBar(true);
    const scrollListener = () => {
      console.log("scroll");
      let top = upArea.value.getBoundingClientRect().top + 400 - 50;
      if(top > 0){
        setNavigationBar(true);
        console.log("top > 0!");
      }else{
        setNavigationBar(false);
        console.log("top < 0!");
      }
    };
    window.addEventListener("scroll", scrollListener,true);


    const fieldSearchContent = ref('');
    const gotoField = () => {
      router.push({name : "Field", query: {content: fieldSearchContent.value,}})
    }


    const querySearch = (queryString , cb) => {
      const results = [{value : '人工智能'}, {value: '深度学习'}, {value: '自动生成'},]
      cb(results);
    }
    const paperAuthorText = (authors) => {
      return authors.join(", ");
    }
    const fieldInfos = ([data, data, data, data]);

    onMounted(() => scrollListener());


    const loginState = loginStore();
    return{
      upArea,
      isHomeTop,
      querySearch,
      fieldSearchContent,
      gotoField,
      fieldInfos,
      paperAuthorText,
      loginState,
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
  height: 800px;
  display: flex;
  flex-direction: column;
  width: 100%;
  //opacity: 50%;
  //background-image: url("@/assets/home.png");
  //background-position: center;
  img{
    height: 800px;
    width: 100%;
    position: absolute;
    opacity: 70%;
    top:0;
    z-index: 0;
    object-fit: cover;
  }
  .content{
    z-index: 2;
    .logo{
      height: 400px;
      text-align: center;
      color: #ffffff;
    }
    .search-box{
      height: 80px;
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
    .header{
      font-size: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #b0b2b3;
      margin-bottom: 40px;
      font-weight: bold;
      color: #87bdd8;
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
        color: #87bdd8;
      }
      .overflow{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .header{
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
          margin-bottom: 15px;
          .title{
            font-size: 20px;
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
            margin-bottom: 20px;
            .name{
              font-size: 20px;
              margin-left: 10px;
              max-width: 200px;
            }
            .cite{
              font-size: 17px;
              margin-right: 10px;
            }
          }
        }
        .journal{

          .item{
            margin-bottom: 20px;
            font-size: 20px;
          }
        }
      }

    }

  }
}

</style>