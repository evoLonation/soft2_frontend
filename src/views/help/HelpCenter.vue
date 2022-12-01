<template>
  <div>

    <el-container>

      <el-container
        style="
        margin-right: 40px;"
      >

        <el-header
            style="background-color: white"
        >
          <div
              style="
                margin: 10px 0;"
          >
            <el-input
                v-model="searchContent"
                size="large"
                placeholder="搜索互助信息"
            >

              <template #append>
                <el-button :icon="Search" />
              </template>

            </el-input>
          </div>

          <el-breadcrumb separator="/">
            <el-breadcrumb-item @click="orderByTime">
              按时间排序
            </el-breadcrumb-item>
            <el-breadcrumb-item @click="orderByWealth">
              按财富值排序
            </el-breadcrumb-item>
          </el-breadcrumb>

        </el-header>

        <el-main
          style="
            margin-top: 20px;
            background-color: white"
        >
          <el-card class="box-card"
                   style="margin-bottom: 20px"
                   v-for="item in requestList"
                   :key="item.user">
            <div>

              <div style="
                width: 80%;
                ">
                <h1>
                  {{ item.title }}
                </h1>
                <p>
                  {{ item.link }}
                </p>
                <p>
                  {{ item.user }}
                </p>
                <p>
                  {{ item.time }}
                </p>
              </div>

              <el-button type="primary"
                          @click="dialogVisible = true"
                         style="margin: auto 0">
                我来应助
              </el-button>

              <el-dialog
                  v-model="dialogVisible"
                  title="上传文件"
                  width="30%"
              >
                <span>请上传文件</span>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
                      上传
                    </el-button>
                  </span>
                </template>
              </el-dialog>

            </div>
          </el-card>



          <el-button @click="goTOFirstPage">
            <el-icon><DArrowLeft /></el-icon>
          </el-button>

          <el-button @click="goBack">
            <el-icon><ArrowLeft /></el-icon>
          </el-button>

          <span>
            第{{page}}页
          </span>

          <el-button @click="goAhead">
            <el-icon><ArrowRight /></el-icon>
          </el-button>

          <el-button @click="goToLastPage">
            <el-icon><DArrowRight /></el-icon>
          </el-button>

          <el-input v-model="jumpPage" style="width: 150px; float: right" placeholder="跳转到">
            <template #append>
              <el-button :icon="Right" @click="jump"/>
            </template>
          </el-input>

        </el-main>

      </el-container>

      <el-aside style="
                  background-color: white;" >

        <el-card class="box-card"
                 style="
                  height: 290px;
                  width: 290px">

          <div style="height: 60%; text-align: center;">
            <el-avatar :size="100" :src="circleUrl" style="margin-top: 40px"/>
          </div>

          <div>
            <div style="float: left; width: 33%; text-align: center;">
              <p>
                12
              </p>
              我的求助
            </div>
            <div style="float: left; width: 34%; text-align: center;">
              <p>
                12
              </p>
              我的应助
            </div>
            <div style="float: left; width: 33%; text-align: center;">
              <p>
                12
              </p>
              我的财富值
            </div>

          </div>

        </el-card>


      </el-aside>

    </el-container>

  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { Search, Right} from '@element-plus/icons-vue';

export default {

  name: "HelpCenter",

  setup(){
    return {
      Search,
      Right,
    }
  },

  data(){
    return {
      searchContent: "",
      dialogVisible: false,
      order: 1,
      page: 1,
      backUp: [],
      jumpPage: "",
      requestList: [
        {
          title: "分段计费题别忘列方程1",
          link: "http://doc.paperpass.com/journal/20150299jrzxs.html",
          user: "杨航1234",
          time: "2022-11-09 11:16:51",
          wealth: 6,
        },
        {
          title: "分段计费题别忘列方程2",
          link: "http://doc.paperpass.com/journal/20150299jrzxs.html",
          user: "杨航1234",
          time: "2022-11-09 11:16:52",
          wealth: 5,
        },
        {
          title: "分段计费题别忘列方程3",
          link: "http://doc.paperpass.com/journal/20150299jrzxs.html",
          user: "杨航1234",
          time: "2022-11-09 11:16:53",
          wealth: 4,
        },
        {
          title: "分段计费题别忘列方程4",
          link: "http://doc.paperpass.com/journal/20150299jrzxs.html",
          user: "杨航1234",
          time: "2022-11-09 11:16:54",
          wealth: 3,
        },
        {
          title: "分段计费题别忘列方程5",
          link: "http://doc.paperpass.com/journal/20150299jrzxs.html",
          user: "杨航1234",
          time: "2022-11-09 11:16:55",
          wealth: 2,
        },
        {
          title: "分段计费题别忘列方程6",
          link: "http://doc.paperpass.com/journal/20150299jrzxs.html",
          user: "杨航1234",
          time: "2022-11-09 11:16:56",
          wealth: 1,
        }
      ]
    }
  },
  methods:{
    goTOFirstPage(){

    },
    goBack(){
      this.requestList = this.backUp;

    },
    goAhead(){
      this.backUp = this.requestList;
      this.requestList = [];
    },
    goToLastPage(){

    },
    orderByTime(){
      console.log("order by time")
      this.requestList.sort((a, b) => {
        return a.time - b.time;
      })
      console.log(this.requestList)
    },
    orderByWealth(){
      console.log("order by wealth")
      this.requestList.sort((a, b) => {
        return a.wealth - b.wealth;
      })
    },
    jump(){

    }
  }
}
</script>

<style scoped>

</style>