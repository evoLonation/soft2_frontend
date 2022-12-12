<template>
  <div class="list">
    <h1 style="text-align: center; padding-bottom: 30px">应助申诉列表</h1>
    <el-table :data="complaintList" style="width: 1100px; margin-left: 150px">
      <el-table-column prop="time" label="求助时间" width="180" />
      <el-table-column prop="title" label="标题" width="300" />
      <el-table-column prop="content" label="申诉理由" width="300" >

      </el-table-column>

      <el-table-column width="">

        <template #default="scope">
            <el-button  @click="download(scope)" size="small" >
              下载文件
            </el-button>

            <el-button type="primary" @click="pass" size="small" >
              申诉通过
            </el-button>

            <el-button type="danger" @click="fail" size="small" >
              申诉退回
            </el-button>
        </template>


      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ComplainList",
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
  },
  methods: {
    download(){

    },
    pass(){

    },
    fail(){

    }

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