<template>
  <div class="id-view">
    <div style="margin: 50px auto auto 225px; display: flex;">
      <p style="margin-top: 5px;">请上传身份证正反面照片：</p>
      <el-button style="margin-left: 95px" type="primary" icon="ArrowRight" @click="changeFather"/>
    </div>
    <id-view ref="id"/>
  </div>
</template>

<script>
import idView from "./ID_upload"

export default {
  name: "MainWnd",
  components: {
    idView,
  },
  methods: {
    changeFather() {
      console.log(this.$refs.id.fileList.length);
      if(this.$refs.id.fileList.length !== 2) {
        this.$message.warning("上传照片数量少于2张！");
        return;
      }
      this.$emit('activate');
    },
  }
}
</script>

<style scoped>
.id-view {
  font-family: '微软雅黑',sans-serif;
}
</style>