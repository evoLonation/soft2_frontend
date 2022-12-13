<template>
  <el-card class="box-card" style="min-height: 600px">
    <el-tabs stretch=stretch
             v-model="listFilter"
    >
      <el-tab-pane label="全部" name="0"/>
      <el-tab-pane label="待应助" name="1"/>
      <el-tab-pane label="待确认" name="2"/>
      <el-tab-pane label="应助成功" name="3"/>
      <el-tab-pane label="投诉中" name="4"/>
      <el-tab-pane label="应助失败" name="5"/>
    </el-tabs>

    <el-table :data="showList" style="width: 100%;">
      <el-table-column prop="type" label="状态" width="80" >
        <template #default="scope">
          <el-icon>
            <Clock v-if="scope.row.type === 0"/>
            <Edit v-if="scope.row.type === 1"/>
            <CircleCheck v-if="scope.row.type === 2" />
            <Warning v-if="scope.row.type === 3" />
            <CircleClose v-if="scope.row.type === 4" />
          </el-icon>
        </template>
      </el-table-column>

      <el-table-column prop="request_time" label="求助时间" width="180" />

      <el-table-column prop="title" label="标题" width="200" />

      <el-table-column prop="res" label="结果" width="100" >
        <template #default="scope">
          <p v-if="scope.row.type === 0">待应助</p>
          <p v-if="scope.row.type === 1">待确认</p>
          <p v-if="scope.row.type === 2">应助成功</p>
          <p v-if="scope.row.type === 3">投诉中</p>
          <p v-if="scope.row.type === 4">应助失败</p>
        </template>
      </el-table-column>

      <el-table-column width="200" >
        <template #default="scope">
          <el-button @click="preInfo(scope.row)">
            查看详情
          </el-button>
        </template>
      </el-table-column>


      <el-table-column label="操作">

        <template #default="scope">

          <div v-if="1 === scope.row.type">
            <el-button type="primary" @click="download(scope.row.request_id)">
              查看文件
            </el-button >
            <el-button type="success" @click="fileRight(scope.row.request_id)">
              确认文献正确
            </el-button>

            <el-button type="danger" @click="fileError(scope.row.request_id)">
              文件错误，投诉
            </el-button>

          </div>

          <div v-else-if="4 === scope.row.type">
            <el-button type="success" @click="requestAgain(scope.row.request_id)">
              再次求助
            </el-button>
          </div>

          <div v-else>
            <p>无可执行操作</p>
          </div>
        </template>

      </el-table-column>
    </el-table>

    <el-dialog v-model="errorDialog" title="请输入申诉理由">
      <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
          v-model="content" />

      <template #footer>
        <el-button type="primary" @click="complaint()">
          确认
        </el-button>
      </template>

    </el-dialog>

    <el-dialog v-model="infoDialog" title="求助详情">
      <el-descriptions
          :column="2"
      >
        <el-descriptions-item label="标题">
          {{showInfo.title}}
        </el-descriptions-item>
        <el-descriptions-item >
        </el-descriptions-item>
        <el-descriptions-item label="求助时间">
          {{showInfo.request_time}}
        </el-descriptions-item>
        <el-descriptions-item label="财富值">
          {{showInfo.wealth}}
        </el-descriptions-item>
        <el-descriptions-item label="备注">
          {{showInfo.request_content}}
        </el-descriptions-item>
      </el-descriptions>

      <el-button type="primary" style="margin-left: 300px" @click="infoDialog = false">
        确定
      </el-button>
    </el-dialog>
  </el-card>

</template>

<script>
import { ElMessage } from 'element-plus'
import {helpAxios} from '@/axios'
export default {
  name: "MyRequest",

  data(){
    return {
      listFilter: "0",
      select_id: "",
      infoDialog: false,
      showInfo: "",
      content: "",
      errorDialog: false,
      requestList: [],
    }
  },

  computed : {
    showList(){
      return this.requestList.filter(item => item.type === parseInt(this.listFilter)-1 || this.listFilter === "0")
    },
  },

  methods: {
    preInfo(item){
      this.infoDialog = true;
      this.showInfo = item
    },
    download(request_id){
      console.log("downloading " + request_id)
      helpAxios.post('help/download ', {
        "request_id": request_id
      }).then(res=>{
        console.log(res.status)
        console.log(res.data)
        window.open(res.data.url)
        ElMessage({
          message: '正在下载文件',
          type: 'success',
        })
      }).catch((e)=>{
        ElMessage({
          message: '文件下载失败',
          type: 'error',
        })
        console.log(e)
      })
    },
    fileRight(request_id){
      console.log("file right " + request_id)
      helpAxios.post('help/confirmed', {
        "request_id": request_id
      }).then(res=>{
        console.log(res.status)
        console.log(res.data)
        this.getRequest();
        ElMessage({
          message: '确认文件正确',
          type: 'success',
        })
      }).catch((e)=>{
        ElMessage({
          message: '确认失败',
          type: 'error',
        })
        console.log(e)
      })
    },
    fileError(request_id){
      this.select_id = request_id;
      this.errorDialog = true
    },
    complaint(){
      console.log("complaint  " + this.select_id)
      helpAxios.post('help/complaint', {
        "request_id": this.select_id,
        "content": this.content
      }).then(res=>{
        console.log(res.status)
        console.log(res.data)
        this.errorDialog = false
        this.getRequest();
        ElMessage({
          message: '已提交申诉',
          type: 'success',
        })
      }).catch((e)=>{
        ElMessage({
          message: '提交申诉失败',
          type: 'error',
        })
        console.log(e)
      })
    },

    requestAgain(id){

      helpAxios.post('help/request-again', {
        "request_id": id
      }).then(res=>{
        console.log(res.status)
        console.log(res.data)
        ElMessage({
          message: '再次求助成功',
          type: 'success',
        })
        this.getRequest();
      }).catch((e)=>{
        ElMessage({
          message: '创建失败',
          type: 'error',
        })
        console.log(e)
      })
    },

    getRequest(){
      helpAxios.post('help/user-request', {
        "start": -1,
        "end": -1,
        "type": parseInt(this.listFilter),
      }).then(res=>{
        console.log(res.status)
        console.log(res.data)
        this.requestList = res.data.requests;
        ElMessage({
          message: '获取成功',
          type: 'success',
        })
      }).catch((e)=>{
        ElMessage({
          message: '获取失败',
          type: 'error',
        })
        console.log(e)
      })
    }
  },
  created() {
    this.getRequest()
  }
}
</script>

<style scoped>

</style>