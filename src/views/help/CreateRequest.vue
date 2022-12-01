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
      <el-input v-model="formData.authorNames" />
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
                 @click="createRequest"
                 style="float: right;margin: 0 auto"
      >
        发布求助
      </el-button>
    </el-form-item>
  </el-form>

</div>
</template>

<script>
import qs from 'qs'
import { ElMessage } from 'element-plus'

export default {
  name: "CreateRequest",
  data(){
    return {
      formData: {
        title: "",
        author: [],
        authorNames: "",
        magazine: "",
        link: "",
        notes: "",
        wealth: "",
      },
    }
  },

  methods :{
    createRequest(){
      ElMessage({
        message: '创建成功',
        type: 'warning',
      })
    },
  },

  created() {
    console.log("create");
    console.log(this.$route.query);
    if (!(this.$route.query.title === undefined)){
      this.formData.title = this.$route.query.title;
      this.formData.magazine = this.$route.query.magazine;
      this.formData.author = qs.parse(this.$route.query.author)
    }
  }
}
</script>

<style scoped>

</style>