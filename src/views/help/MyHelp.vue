<template>
  <div>
    <el-tabs stretch=stretch
             v-model="listFilter"
             @tab-change="handleClick">
      <el-tab-pane label="全部" name="1"/>
      <el-tab-pane label="待确认" name="2"/>
      <el-tab-pane label="投诉中" name="3"/>
      <el-tab-pane label="应助成功" name="4"/>
      <el-tab-pane label="应助失败" name="5"/>
    </el-tabs>


    <el-table :data="showList" style="width: 100%">
      <el-table-column prop="status" label="状态" width="90" >

        <template #default="scope">
          <el-icon>
            <Edit v-if="scope.row.status === '2'"/>
            <Warning v-if="scope.row.status === '3'" />
            <CircleCheck v-if="scope.row.status === '4'" />
            <CircleClose v-if="scope.row.status === '5'" />
          </el-icon>
        </template>

      </el-table-column>
      <el-table-column prop="time" label="求助时间" width="180" />
      <el-table-column prop="res" label="结果" width="180" />
      <el-table-column prop="title" label="标题"  />
    </el-table>
  </div>
</template>

<script>
export default {
  name: "MyHelp",

  data(){
    return {
      listFilter: "1",
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
      return this.helpList.filter(item => item.status === this.listFilter || this.listFilter === '1')
    }
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