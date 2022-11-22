<template>
  <div class="operator">
    <div class="op_title">
      <p>操作：</p>
      <el-icon
        style="margin: 20px 85px auto auto; cursor: pointer"
      ><Tools/></el-icon>
    </div>
    <div class="op_content">
      <el-button
          style="margin: auto auto auto 60px"
          type="primary"
          v-if="isMe === false"
      >
        学者认证
      </el-button>
      <el-button
          style="margin: auto auto auto 60px"
          type="danger"
          v-if="isMe === true"
      >
        成果添加
      </el-button>
      <el-button
          style="margin: auto 60px auto auto"
          type="success"
      >
        学者订阅
      </el-button>
    </div>
  </div>
</template>

<script>
import Tools from "@element-plus/icons-vue"

export default {
  name: "MyOperator",
  components: {
    Tools,
  },
  data() {
    return {
      isMe: false,
    }
  }
}
</script>

<style scoped>
.operator {
  width: 350px;
  height: 200px;
  border-radius: 10px;
  box-shadow: 0 0 4px rgba(0,0,0,0.40),0 0 6px rgba(0,0,0,0.15);
  margin-right: 40px;
  display: inline-block;
}

.op_title {
  width: 100%;
  height: 30%;
  line-height: 18px;
  padding-top: 20px;
  padding-left: 40px;
  font-size: 18px;
  font-weight: 600;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  display: flex;
}

.op_content {
  width: 100%;
  height: 30%;
  margin-top: 15px;
  display: flex;
}
</style>