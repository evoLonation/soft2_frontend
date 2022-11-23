<template>
  <div style="
    height: 100%;
    padding-bottom: 30px;
    padding-top: 30px">

    <div style="
      background-color: white;
      width: 90%;
      height: 40px;
      margin: 0 auto;
      position: relative;
    ">

      <div style=" float: left; margin: auto 0">
        <el-tabs
            v-model="activeName"
            type="card"
            class="demo-tabs"
            @tab-change="handleClick"
        >
          <el-tab-pane label="互助中心" name="helpCenter"/>
          <el-tab-pane label="我的求助" name="myRequest"/>
          <el-tab-pane label="我的应助" name="myHelp"/>
          <el-tab-pane label="发布求助" name="createRequest"/>
          <el-tab-pane label="帮助中心" name="helpTips"/>

        </el-tabs>
      </div>

      <el-button
          type="success"
          @click="gotoCreateRequest"
          style="float: right; margin: auto 0">
        发布求助
      </el-button>
    </div>


    <div style="
      background-color: #F2F2F2;

      width: 90%;
      margin: 30px auto;
    ">
      <router-view/>
    </div>



  </div>
</template>

<script>

export default {
  name: "Help-",

  data() {
    return {
      activeName: 'helpCenter',

    }
  },
  methods: {
    handleClick(name) {
      this.$router.push({
        name: name,

      })
    },
    gotoCreateRequest() {
      this.$router.push({
       path: '/help/myRequest/createRequest'
      })
    }
  }


}
</script>

<style scoped>

</style>