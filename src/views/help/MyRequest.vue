<template>
  <div
      style="background-color: white"
  >
    <el-tabs stretch=stretch
             v-model="listFilter"
             >
      <el-tab-pane label="全部" name="1"/>
      <el-tab-pane label="待应助" name="2"/>
      <el-tab-pane label="待确认" name="3"/>
      <el-tab-pane label="投诉中" name="4"/>
      <el-tab-pane label="应助成功" name="5"/>
      <el-tab-pane label="应助失败" name="6"/>
    </el-tabs>

    <el-table :data="showList" style="width: 100%">
      <el-table-column prop="status" label="状态" width="90" >
        <template #default="scope">
          <el-icon>
            <Clock v-if="scope.row.status === '2'"/>
            <Edit v-if="scope.row.status === '3'"/>
            <Warning v-if="scope.row.status === '4'" />
            <CircleCheck v-if="scope.row.status === '5'" />
            <CircleClose v-if="scope.row.status === '6'" />
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="求助时间" width="180" />
      <el-table-column prop="title" label="标题" width="300" />
      <el-table-column prop="res" label="结果" width="180" />


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
export default {
  name: "MyRequest",

  data(){
    return {
      listFilter: '1',
      helpList: [
        {
          status: '2',
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态1",
          res: "待应助"
        },
        {
          status: '3',
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态2",
          res: "待确认"
        },
        {
          status: '4',
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态3",
          res: "投诉中"
        },
        {
          status: '4',
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态4",
          res: "投诉中"
        },
        {
          status: '5',
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态5",
          res: "应助成功"
        },
        {
          status: '6',
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态5",
          res: "应助失败"
        },
      ],
    }
  },

  computed : {
    showList(){
      return this.helpList.filter(item => item.status === this.listFilter || this.listFilter === '1')
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
    }
  }
}
</script>

<style scoped>

</style>