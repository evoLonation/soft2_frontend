<template>
  <div class="selection">
    <el-card class="selection-card" @click="changeFather(1)">
      <el-icon class="select-icon"><Message/></el-icon>
      <p class="select-content">邮箱认证</p>
    </el-card>
    <el-card class="selection-card" @click="changeFather(2)">
      <el-icon class="select-icon"><CreditCard/></el-icon>
      <p class="select-content">身份认证</p>
    </el-card>
  </div>
</template>

<script>
import {Message} from "@element-plus/icons";
import {CreditCard} from "@element-plus/icons";
export default {
  name: "MySelect",
  components: {CreditCard, Message},
  methods: {
    changeFather(select) {
      this.$emit('activate', select);
    }
  }
}
</script>

<style scoped>
.selection {
  display: flex;
}

.selection-card {
  width: 323px;
  height: 200px;
  box-shadow: none;
  border: 1.5px solid lightgrey;
  margin: 70px 0 auto 50px;
  cursor: pointer;
  border-radius: 10px;
  display: inline-block;
}

.selection-card:hover {
  box-shadow: 0 0 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.08);;
}

.select-icon {
  font-size: 45px;
  color: #79bbff;
  width: 100%;
  height: 45px;
  margin-top: 25px;
}

.select-content {
  font-weight: 700;
  text-align: center;
}
</style>