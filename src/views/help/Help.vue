<template>
  <div style="
    height: 100%;
    padding-bottom: 30px;
    padding-top: 30px">

    <el-card class="box-card"
             style="
              width: 80%;
              min-width: 1200px;
              margin: 0 auto;
              position: relative;">

      <el-tabs
          v-model="activeName"
          type="card"
          class="demo-tabs"
          style=" float: left;"
          @tab-change="handleClick"
      >
        <el-tab-pane label="互助中心" name="HelpCenter"/>
        <el-tab-pane label="我的求助" name="MyRequest"/>
        <el-tab-pane label="我的应助" name="MyHelp"/>
        <el-tab-pane label="发布求助" name="CreateRequest"/>
        <el-tab-pane label="帮助中心" name="HelpTips"/>

      </el-tabs>

      <el-button
          type="success"
          @click="gotoCreateRequest"
          style="float: right; margin: auto 0">
        发布求助
      </el-button>
    </el-card>


    <div >

      <div style=" float: left; margin: auto 0">

      </div>


    </div>


    <div style="
      width: 80%;
      min-width: 1200px;
      min-height: 900px;
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
       name: 'CreateRequest'
      })
    }
  },
  created() {
    console.log("create!");
    console.log(this.$route.query.title);
    if (this.$route.query.title === undefined){
      this.$router.push({name: "HelpCenter"});
    }
  }


}
</script>

<style scoped>

</style>