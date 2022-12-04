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
// eslint-disable-next-line no-unused-vars
import {helpAxios} from '@/axios'

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

      if ((this.formData.title === "") || (this.formData.authorNames === "")
          || (this.formData.magazine === "") || (this.formData.link === "")
          || (this.formData.notes === "") || (this.formData.wealth === "")){
        ElMessage({
          message: '请完整填写表单',
          type: 'warning',
        })
        return
      }

      helpAxios.post('help/new-requests', {
        "title": this.formData.title,
        "author": this.formData.authorNames.split(' '),
        "magazine": this.formData.magazine,
        "link": this.formData.link,
        "content": this.formData.notes,
        "wealth": parseInt(this.formData.wealth),
      }).then(res=>{
        console.log(res.status)
        console.log(res.data)
        ElMessage({
          message: '创建成功',
          type: 'success',
        })
      }).catch((e)=>{
        ElMessage({
          message: '创建失败',
          type: 'error',
        })
        console.log(e)
      })
    },
  },

  created() {
    console.log("inter creaetRequest");
    console.log(this.$route.query);
    if (!(this.$route.query.title === undefined)){
      this.formData.title = this.$route.query.title;
      this.formData.magazine = this.$route.query.magazine;
      this.formData.author = qs.parse(this.$route.query.author)
      console.log(this.$route.query.author)
      this.formData.authorNames = "";
      let i = 0;
      while(!(this.formData.author[i] === undefined)){
        this.formData.authorNames += (this.formData.author[i] + " ");
        console.log(this.formData.author[i])
        i++;
      }
      console.log(this.formData.authorNames)
    }
  }
}
</script>

<style scoped>

</style>