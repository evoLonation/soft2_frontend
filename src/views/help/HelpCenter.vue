<template>
  <div>

    <el-container>

      <el-container
        style="
        margin-right: 40px;"
      >

        <el-header>

          <el-card class="box-card">

            <el-input
                v-model="searchContent"
                size="large"
                placeholder="搜索互助信息"
            >

              <template #append>
                <el-button :icon="Search" @click="SearchRequest" />
              </template>

            </el-input>

            <el-breadcrumb separator="/">
              <el-breadcrumb-item @click="orderByTime">
                按时间排序
              </el-breadcrumb-item>
              <el-breadcrumb-item @click="orderByWealth">
                按财富值排序
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-card>

        </el-header>

        <el-main
          style="
          margin-top: 20px;
          min-height: 100%;
          position: relative">


          <el-card class="box-card"
                   style="margin-bottom: 20px; position: relative"
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
                  {{item.request_content}}
                </p>
                <p style="font-size: 75%">
                  {{ item.link }}
                </p>
                <p style="font-size: 50%">
                  {{item.request_time}}
                </p>
              </div>

              <el-button type="primary"
                          @click="beforeHelp(item.request_id)"
                         style="position: absolute; right: 30px; top: 50px">
                <el-icon><Coin /></el-icon>{{item.wealth}} &nbsp;我来应助
              </el-button>

            </div>
          </el-card>

          <el-dialog
              v-model="uploadDialog"
              title="上传文件"
              width="30%"
          >
            <span>请上传pdf文件</span>
            <template #footer>
                  <span class="dialog-footer">

                    <el-button style="float: left" @click="uploadDialog = false">取消</el-button>

                    <el-upload
                        action="#"
                        :show-file-list="false"
                        :on-success="handleFileSuccess"
                        :before-upload="beforeFileUpload"
                        :http-request="upload"
                    >
                      <el-button type="primary" @click="uploadDialog = false">
                      上传
                      </el-button>

                    </el-upload>

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


          <div style="
          width: 90%;
          margin: auto 0;
          position: absolute;
          bottom: 30px">
            <el-button @click="goTOFirstPage">
              <el-icon><DArrowLeft /></el-icon>
            </el-button>

            <el-button @click="goBack">
              <el-icon><ArrowLeft /></el-icon>
            </el-button>

            <span>
            &nbsp;第{{page+1}} / {{parseInt(requestLength/10) + 1}}页&nbsp;
          </span>

            <el-button @click="goAhead">
              <el-icon><ArrowRight /></el-icon>
            </el-button>

            <el-button @click="goToLastPage">
              <el-icon><DArrowRight /></el-icon>
            </el-button>

            <el-input v-model="jumpPage" style="width: 120px; float: right" placeholder="跳转到">
              <template #append>
                <el-button :icon="Right" @click="jump"/>
              </template>
            </el-input>

          </div>


        </el-main>

      </el-container>

      <el-aside>

        <el-card class="box-card"
                 style="
                  height: 290px;
                  width: 290px">

          <div style="height: 60%; text-align: center;">
            <el-avatar :size="100" :src="this.user_url" style="margin-top: 40px"/>
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
import {fileAxios, helpAxios, userAxios} from '@/axios'

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
      user_url:"",
      searchContent: "",
      searching: "",
      uploadDialog: false,
      rejectDialog: false,
      loadingId: "",
      page: 0,
      order: 0,
      backUp: [],
      jumpPage: "",
      requestLength: "",
      requestList: []
    }
  },

  methods:{
    handleFileSuccess(res, file) {
      console.log(res, file)
      // this.value = URL.createObjectURL(file.raw)// 可以获取一段data:base64的字符串
    },
    beforeFileUpload(file) {
      console.log(file.type)
      const isPDF = file.type === 'application/pdf'
      const isLt100M = file.size / 1024 / 1024 < 100
      if (!isPDF)
        this.$message.error('请上传pdf文件')
      if (!isLt100M)
        this.$message.error('上传文件大小不能超过 100MB!')
      return isPDF && isLt100M
    },
    upload(res) {
      console.log(res)
      if (res.file) {
        let form=new FormData();
        form.append("file",res.file);
        form.append("request_id", this.loadingId)
        fileAxios({
          method:'post',
          url:"help/upload",
          data:form
        }).then((res) => {
          console.log(res.data)
          ElMessage({
            message: "应助成功",
            type: "success"
          })
          this.getRequest()
        }).catch(e => {
          ElMessage({
            message: "应助失败",
            type: "success"
          })
          console.log(e)
        })
      }
    },

    SearchRequest(){
      console.log("searching");
      this.page = 0
      if (this.searchContent === "") this.searching = false
      else this.searching = true
      this.getRequest()
    },
    beforeHelp(request_id){
      console.log("before help")
      this.loadingId = request_id;
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
    userAxios.post('user/user-info', {
    }).then(res =>{
      console.log(res.data)
      this.user_url = res.data.avatar_url
    }).catch(e=>{
      ElMessage('头像获取失败，发生错误')
      console.log(e)
    })
  }
}
</script>

<style scoped>
</style>