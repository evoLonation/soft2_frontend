<template>
  <div>

    <h1>
      Help
    </h1>

    <el-tabs
        v-model="activeName"
        type="card"
        class="demo-tabs"
        @tab-change="handleClick"
    >
      <el-tab-pane label="互助中心" name="helpCenter"/>
      <el-tab-pane label="我的求助" name="myRequest"/>
      <el-tab-pane label="我的应助" name="myHelp"/>
      <el-tab-pane label="帮助中心" name="helpTips"/>

      <router-view/>
    </el-tabs>




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
    }
  }


}
</script>

<style scoped>

</style>