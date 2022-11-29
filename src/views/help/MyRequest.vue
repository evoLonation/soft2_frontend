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
      <el-table-column prop="status" label="状态" width="90" />
      <el-table-column prop="time" label="求助时间" width="180" />
      <el-table-column prop="title" label="标题" width="300" />
      <el-table-column prop="res" label="结果" width="90" />


      <el-table-column>

        <template #default="scope">

          <div v-if="showOp('3', scope.row.status)">
            <el-button>
              下载文件
            </el-button>
            <el-button>
              确认文献正确
            </el-button>
            <el-button>
              文件错误，投诉
            </el-button>
          </div>

          <div v-if="showOp('6', scope.row.status)">
            <el-button>
              再次求助
            </el-button>
          </div>
        </template>

      </el-table-column>
    </el-table>

  </div>


</template>

<script>
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
          res: 1
        },
        {
          status: '3',
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态2",
          res: 1
        },
        {
          status: '4',
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态3",
          res: 1
        },
        {
          status: '4',
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态4",
          res: 1
        },
        {
          status: '5',
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态5",
          res: 1
        },
        {
          status: '6',
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态5",
          res: 1
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
    }
  }
}
</script>

<style scoped>

</style>