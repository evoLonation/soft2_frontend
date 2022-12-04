<template>
  <div>
    <el-tabs stretch=stretch
             v-model="listFilter"
             >
      <el-tab-pane label="全部" name="0"/>
      <el-tab-pane label="待应助" name="1"/>
      <el-tab-pane label="待确认" name="2"/>
      <el-tab-pane label="投诉中" name="3"/>
      <el-tab-pane label="应助成功" name="4"/>
      <el-tab-pane label="应助失败" name="5"/>
    </el-tabs>

    <el-table :data="showList" style="width: 100%">
      <el-table-column prop="type" label="状态" width="90" >
        <template #default="scope">
          <el-icon>
            <Clock v-if="scope.row.type === 1"/>
            <Edit v-if="scope.row.type === 2"/>
            <Warning v-if="scope.row.type === 3" />
            <CircleCheck v-if="scope.row.type === 4" />
            <CircleClose v-if="scope.row.type === 5" />
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="request_time" label="求助时间" width="180" />
      <el-table-column prop="request_title" label="标题" width="300" />
      <el-table-column prop="res" label="结果" width="180" >
        <template #default="scope">
            <p v-if="scope.row.type === 1">待应助</p>
            <p v-if="scope.row.type === 2">待确认</p>
            <p v-if="scope.row.type === 3">投诉中</p>
            <p v-if="scope.row.type === 4">应助成功</p>
            <p v-if="scope.row.type === 5">应助失败</p>
        </template>
      </el-table-column>


      <el-table-column>

        <template #default="scope">

          <div v-if="showOp('3', scope.row.status)">
            <el-button type="primary" @click="download">
              下载文件
            </el-button >
            <el-button type="success" @click="fileRight">
              确认文献正确
            </el-button>
            <el-button type="danger" @click="fileError">
              文件错误，投诉
            </el-button>
          </div>

          <div v-if="showOp('6', scope.row.status)">
            <el-button type="success" @click="requestAgain">
              再次求助
            </el-button>
          </div>
        </template>

      </el-table-column>
    </el-table>

  </div>


</template>

<script>
import { ElMessage } from 'element-plus'
import {helpAxios} from '@/axios'
export default {
  name: "MyRequest",

  data(){
    return {
      listFilter: '0',
      requestList: [
        {
          status: '2',
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态1",
          res: "待应助"
        },
      ],
    }
  },

  computed : {
    showList(){
      return this.requestList.filter(item => item.type === this.listFilter || this.listFilter === '0')
    },
  },

  methods: {
    showOp(type, status){
      return status === type;
    },
    download(){

    },
    fileRight(){

    },
    fileError(){

    },
    requestAgain(){
      ElMessage({
        message: '再次求助成功',
        type: 'success',
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