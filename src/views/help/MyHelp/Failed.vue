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
  name: "Failed-",

  data(){
    return {
      helpList: [

      ]
    }
  }
}
</script>

<style scoped>

</style>