<template>
  <div>
    <el-tabs stretch=stretch
             v-model="listFilter"
             @tab-change="handleClick">
      <el-tab-pane label="全部" name="0"/>
      <el-tab-pane label="待确认" name="1"/>
      <el-tab-pane label="投诉中" name="2"/>
      <el-tab-pane label="应助成功" name="3"/>
      <el-tab-pane label="应助失败" name="4"/>
    </el-tabs>


    <el-table :data="showList" style="width: 100%">
      <el-table-column prop="type" label="状态" width="90" >

        <template #default="scope">
          <el-icon>
            <Edit v-if="scope.row.type === '2'"/>
            <Warning v-if="scope.row.type === '3'" />
            <CircleCheck v-if="scope.row.type === '4'" />
            <CircleClose v-if="scope.row.type === '5'" />
          </el-icon>
        </template>

      </el-table-column>
      <el-table-column prop="request_time" label="求助时间" width="180" />
      <el-table-column prop="res" label="结果" width="180" >
        <template #default="scope">
            <p v-if="scope.row.type === 1">待确认</p>
            <p v-if="scope.row.type === 2">投诉中</p>
            <p v-if="scope.row.type === 3">应助成功</p>
            <p v-if="scope.row.type === 4">应助失败</p>
        </template>
      </el-table-column>
      <el-table-column prop="request_title" label="标题"  />
    </el-table>
  </div>
</template>

<script>
import {helpAxios} from '@/axios'
import {ElMessage} from 'element-plus'

export default {
  name: "MyHelp",

  data(){
    return {
      listFilter: "0",
      helpList: [
        {
          status: '2',
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态1",
          res: "待确认"
        },
        {
          status: '3',
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态2",
          res: "投诉中"
        },
        {
          status: '4',
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态3",
          res: "应助成功"
        },
        {
          status: '5',
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态3",
          res: "应助失败"
        }
      ],
    }
  },

  computed : {
    showList(){
      return this.helpList.filter(item => item.type === this.listFilter || this.listFilter === '0')
    }
  },

  methods: {
    showOp(type, status){
      return status === type;
    },
    getHelp(){
      helpAxios.post('help/user-help', {
        "start": -1,
        "end": -1,
        "type": parseInt(this.listFilter),
      }).then(res=>{
        console.log(res.status)
        console.log(res.data)
        // this.helpList = res.data.requests;
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
    this.getHelp()
  }
}
</script>

<style scoped>

</style>