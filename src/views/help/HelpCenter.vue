<template>
  <div>

    <el-container>

      <el-container
        style="
        margin-right: 40px;"
      >

        <el-header>
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
                <el-button :icon="Search" @click="SearchRequest" />
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
          style="margin-top: 20px;">
          <el-card class="box-card"
                   style="margin-bottom: 20px"
                   v-for="item in requestList"
                   :key="item.request_id">
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
                  {{ item.request_time}}
                </p>
              </div>

              <el-button type="primary"
                          @click="beforeHelp(item.request_id)"
                         style="margin: auto 0">
                我来应助
              </el-button>

              <el-dialog
                  v-model="uploadDialog"
                  title="上传文件"
                  width="30%"
              >
                <span>请上传文件</span>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="uploadDialog = false">取消</el-button>
                    <el-button type="primary" @click="uploadDialog = false">
                      上传
                    </el-button>
                  </span>
                </template>
              </el-dialog>

              <el-dialog
                  v-model="rejectDialog"
                  title="该求助已被应助"
                  width="30%"
              >
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="rejectDialog = false">确定</el-button>
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
            第{{page+1}} / {{parseInt(requestLength/10) + 1}}页
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

      <el-aside>

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
                {{user_request}}
              </p>
              我的求助
            </div>
            <div style="float: left; width: 34%; text-align: center;">
              <p>
                {{user_help}}
              </p>
              我的应助
            </div>
            <div style="float: left; width: 33%; text-align: center;">
              <p>
                {{user_wealth}}
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
import {ElMessage} from 'element-plus'
import {helpAxios} from '@/axios'

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
      user_request: "",
      user_help: "",
      user_wealth: "",
      searchContent: "",
      searching: "",
      uploadDialog: false,
      rejectDialog: false,
      page: 0,
      order: 0,
      backUp: [],
      jumpPage: "",
      requestLength: "",
      requestList: [
        {
          title: "分段计费题别忘列方程1",
          link: "http://doc.paperpass.com/journal/20150299jrzxs.html",
          user: "杨航1234",
          time: "2022-11-09 11:16:51",
          wealth: 6,
        },
      ]
    }
  },
  methods:{
    SearchRequest(){
      console.log("searching");
      this.page = 0
      if (this.searchContent === "") this.searching = false
      else this.searching = true
      this.getRequest()
    },
    beforeHelp(request_id){
      console.log("before help")
      helpAxios.post('help/before-help', {
        "request_id": request_id
      }).then(res =>{
        console.log("before help res data:")
        console.log(res.data)
        if (res.data.status === 1){
          this.uploadDialog = true;
        }else {
          this.rejectDialog = true;
        }
      }).catch(e=>{
        ElMessage('获取失败，发生错误')
        console.log(e)
      })
    },
    goTOFirstPage(){
      console.log("go first")
      this.page = 0
      this.getRequest()
    },
    goBack(){
      if (this.page <= 0){
        ElMessage('已经是第一页了')
        return
      }
      this.page--
      this.getRequest()
    },
    goAhead(){
      if (this.page >= parseInt(this.requestLength/10)){
        ElMessage('已经是最后一页了')
        return
      }
      this.page++
      this.getRequest()
    },
    goToLastPage(){
      console.log("go last")
      this.page = parseInt(this.requestLength/10)
      this.getRequest()
    },
    orderByTime(){
      console.log("order by time")
      this.page = 0
      this.order = 0
      this.getRequest()
      console.log(this.requestList)
    },
    orderByWealth(){
      console.log("order by wealth")
      this.page = 0
      this.order = 1
      this.getRequest()
      console.log(this.requestList)
    },
    jump(){
      if (this.jumpPage-1 > parseInt(this.requestLength/10) || this.jumpPage < 1){
        ElMessage('无法跳转到该页面')
        return
      }
      this.page = this.jumpPage-1
      this.getRequest()
    },
    getRequest(){
      if (this.page*10 > this.requestLength){
        ElMessage('已无更多数据')
        return
      }

      if (this.searching){
        helpAxios.post('help/search', {
          "start": this.page*10,
          "end": this.  page*10 + 10,
          "search_content": this.searchContent,
        }).then(res =>{
          console.log(res.data.requests_num)
          console.log(res.data.requests)
          this.requestList = res.data.requests
          this.requestLength = res.data.requests_num
          ElMessage('已更新数据')
        }).catch(e=>{
          ElMessage('获取失败，发生错误')
          console.log(e)
        })
      }
      else {
        helpAxios.post('help/requests', {
          "start": this.page*10,
          "end": this.  page*10 + 10,
          "order": this.order,
        }).then(res =>{
          console.log(res.data.requests_num)
          console.log(res.data.requests)
          this.requestList = res.data.requests
          this.requestLength = res.data.requests_num
          ElMessage('已更新数据')
        }).catch(e=>{
          ElMessage('获取失败，发生错误')
          console.log(e)
        })
      }
    }
  },
  created() {
    this.getRequest();
    helpAxios.post('help/user-info', {
    }).then(res =>{
      console.log(res.data)
      this.user_request = res.data.request
      this.user_help = res.data.help
      this.user_wealth = res.data.wealth
    }).catch(e=>{
      ElMessage('获取失败，发生错误')
      console.log(e)
    })
  }
}
</script>

<style scoped>
</style>