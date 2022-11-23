<template>
<div>
  <el-form
      :label-position="'right'"
      label-width="100px"
      :model="formData"
      style="width: 60%; margin: 0 auto"
  >
    <el-form-item label="标题">
      <el-input v-model="formData.title" />
    </el-form-item>
    <el-form-item label="作者">
      <el-input v-model="formData.author" />
    </el-form-item>
    <el-form-item label="杂志与期刊">
      <el-input v-model="formData.magazine" />
    </el-form-item>
    <el-form-item label="全文链接">
      <el-input v-model="formData.link" />
    </el-form-item>
    <el-form-item label="备注">
      <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
          v-model="formData.notes" />
    </el-form-item>
    <el-form-item label="悬赏财富值">
      <el-input v-model="formData.wealth"
        style="
          width: 40px;
          float: left;
      "/>
      <el-button type="success"
        style="float: right;margin: 0 auto"
      >
        发布求助
      </el-button>
    </el-form-item>
  </el-form>

</div>
</template>

<script>
export default {
  name: "CreateRequest",
  data(){
    return {
      formData: {
        title: "",
        author: "",
        magazine: "",
        link: "",
        notes: "",
        wealth: "",
      }
    }
  }
}
</script>

<style scoped>

</style>