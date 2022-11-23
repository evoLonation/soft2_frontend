<template>
  <div
      style="background-color: white"
  >
    <el-tabs stretch=stretch
             @tab-change="handleClick">
      <el-tab-pane label="全部" name="all_request"/>
      <el-tab-pane label="待应助" name="TobeHelp"/>
      <el-tab-pane label="待确认" name="TobeConfirmed_request"/>
      <el-tab-pane label="投诉中" name="complaint_request"/>
      <el-tab-pane label="应助成功" name="success_request"/>
      <el-tab-pane label="应助失败" name="failed_request"/>
      <el-tab-pane label="发布求助" name="createRequest"/>
    </el-tabs>

    <router-view/>
  </div>


</template>

<script>
export default {
  name: "MyRequest",


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