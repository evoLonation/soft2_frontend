<template>
  <div class="list">
    <h1 style="text-align: center; padding-bottom: 30px">应助申诉列表</h1>
    <el-table :data="complaintList" style="width: 1100px; margin-left: 150px">
      <el-table-column prop="request_time" label="求助时间" width="180" />
      <el-table-column prop="request_title" label="标题" width="300" />
      <el-table-column prop="content" label="申诉理由" width="300" >

      </el-table-column>

      <el-table-column width="">

        <template #default="scope">
            <el-button  @click="download(scope.row.url)" size="small" >
              查看文件
            </el-button>

            <el-button type="primary" @click="deal(scope.row.request_id, 0)" size="small" >
              申诉通过
            </el-button>

            <el-button type="danger" @click="deal(scope.row.request_id, 1)" size="small" >
              申诉退回
            </el-button>
        </template>


      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {helpAxios} from '@/axios'
import {ElMessage} from 'element-plus'

export default {
  name: "ComplainList",
  data(){
    return {
      complaintList: []
    }
  },
  methods: {
    download(url){
      window.open(url)
    },
    deal(id, res){
      helpAxios.post('admin/complait-deal', {
        "request_id": id,
        "res": res,
      }).then(res=>{
        console.log(res.status)
        console.log(res.data)
        ElMessage({
          message: '处理成功',
          type: 'success',
        })
        this.getComplait()
      }).catch((e)=>{
        ElMessage({
          message: '处理失败',
          type: 'error',
        })
        console.log(e)
      })
    },
    getComplait(){
      helpAxios.post('admin/complait-list', {
        "start": 0,
        "end": 100,
      }).then(res=>{
        console.log(res.status)
        console.log(res.data)
        this.complaintList = res.data.list;
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
    this.getComplait()
  }
}
</script>

<style scoped>
.list{
  min-width: 1350px;
  max-width: 1350px;
  min-height: 700px;
  margin: 50px auto auto auto;
  border-radius: 5px;
  box-shadow: 0 0 14px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
  background-color: white;
}
</style>