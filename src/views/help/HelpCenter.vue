<template>
  <div>

    <el-container>

      <el-container
        style="
        margin-right: 40px;"
      >

        <el-header
            style="background-color: white"
        >
          <div
              style="
                margin: 10px 0;"
          >
            <el-input
                v-model="input1"
                size="large"
                placeholder="Please Input"
                :suffix-icon="Search"
            >
            </el-input>
          </div>

          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              按时间排序
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              按财富值排序
            </el-breadcrumb-item>
          </el-breadcrumb>

        </el-header>

        <el-main
          style="margin-top: 20px; background-color: white"
        >
          <div v-for="item in requestList" :key="item.user">
            <h1>
              {{ item.title }}
            </h1>
            <p>
              {{ item.link }}
            </p>
            <p>
              {{ item.user }}
            </p>
            <p>
              {{ item.time }}
            </p>

            <el-button>
              我来应助
            </el-button>
          </div>
        </el-main>

      </el-container>

      <el-aside style="
        background-color: white;
        height: 300px;
        width: 300px">

        <div
          style="height: 60%;
          text-align: center;"
        >
          <el-avatar :size="100" :src="circleUrl"
            style="margin-top: 40px"
          />
        </div>

        <div>
          <div
            style="float: left; width: 33%; text-align: center;"
          >
            <p>
              12
            </p>
            我的求助
          </div>
          <div
              style="float: left; width: 34%; text-align: center;"
          >
            <p>
              12
            </p>
            我的应助
          </div>
          <div
              style="float: left; width: 33%; text-align: center;"
          >
            <p>
              12
            </p>
            我的财富值
          </div>

        </div>


      </el-aside>

    </el-container>

  </div>
</template>

<script>
export default {

  name: "HelpCenter",

  data(){
    return {
      requestList: [
        {
          title: "分段计费题别忘列方程",
          link: "http://doc.paperpass.com/journal/20150299jrzxs.html",
          user: "杨航1234",
          time: "2022-11-09 11:16:56",
        },
        {
          title: "分段计费题别忘列方程",
          link: "http://doc.paperpass.com/journal/20150299jrzxs.html",
          user: "杨航1234",
          time: "2022-11-09 11:16:56",
        },
        {
          title: "分段计费题别忘列方程",
          link: "http://doc.paperpass.com/journal/20150299jrzxs.html",
          user: "杨航1234",
          time: "2022-11-09 11:16:56",
        },
        {
          title: "分段计费题别忘列方程",
          link: "http://doc.paperpass.com/journal/20150299jrzxs.html",
          user: "杨航1234",
          time: "2022-11-09 11:16:56",
        },
        {
          title: "分段计费题别忘列方程",
          link: "http://doc.paperpass.com/journal/20150299jrzxs.html",
          user: "杨航1234",
          time: "2022-11-09 11:16:56",
        },
        {
          title: "分段计费题别忘列方程",
          link: "http://doc.paperpass.com/journal/20150299jrzxs.html",
          user: "杨航1234",
          time: "2022-11-09 11:16:56",
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>