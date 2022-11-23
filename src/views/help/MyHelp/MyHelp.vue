<template>
  <div
    style="background-color: white"
  >
    <el-tabs stretch=stretch
             @tab-change="handleClick">
      <el-tab-pane label="全部" name="all_help"/>
      <el-tab-pane label="待确认" name="TobeConfirmed_help"/>
      <el-tab-pane label="投诉中" name="complaint_help"/>
      <el-tab-pane label="应助成功" name="success_help"/>
      <el-tab-pane label="应助失败" name="failed_help"/>
    </el-tabs>
    <router-view/>


  </div>
</template>

<script>
export default {
  name: "MyHelp",


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