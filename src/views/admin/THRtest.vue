<template>
  <div>
    <el-table :data="complaintList" style="width: 100%">
      <el-table-column prop="time" label="求助时间" width="180" />
      <el-table-column prop="title" label="标题" width="300" />
      <el-table-column prop="content" label="求助描述" width="500" />

      <el-table-column>

        <el-button>
          下载文件
        </el-button>

        <el-button>
          申诉通过
        </el-button>

        <el-button>
          申诉退回
        </el-button>

      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "THRtest",
  data(){
    return {
      complaintList: [
        {
          request_id: "",
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态3",
          content: "sdfasodfjasodfasdfjo;saidjf o;ij",
        },
        {
          request_id: "",
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态3",
          content: "Vue (发音为 /vjuː/，类似 view) 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面。无论是简单还是复杂的界面，Vue 都可以胜任",
        },
        {
          request_id: "",
          time: "2022-11-09 14:18",
          title: "劳动伦理的基本内涵及其当代形态3",
          content: "sdfasodfjasodfasdfjo;saidjf o;ij",
        }


      ]


    }
  }
}
</script>

<style scoped>

</style>