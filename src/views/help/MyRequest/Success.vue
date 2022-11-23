<template>
  <el-table :data="helpList" style="width: 100%">
    <el-table-column prop="status" label="状态" width="90" />
    <el-table-column prop="time" label="求助时间" width="180" />
    <el-table-column prop="title" label="标题" width="300" />
    <el-table-column prop="res" label="结果" width="90" />
    <el-table-column>
      <el-button>
        操作
      </el-button>
      <el-button>
        操作
      </el-button>
      <el-button>
        操作
      </el-button>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "Success-",

  data(){
    return {
      helpList: [
        {
          status: 1,
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态",
          res: 1
        },
        {
          status: 1,
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态",
          res: 1
        },
        {
          status: 1,
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态",
          res: 1
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>