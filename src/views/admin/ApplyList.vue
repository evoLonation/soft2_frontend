<template>
  <div class="list">
    <h1 style="text-align: center; padding-bottom: 30px">学者认证列表</h1>

    <el-table  :data="records" style="width: 69%; margin-left: 200px" >
      <el-table-column fixed align="center" prop="scholar_name" label="姓名" width="160"/>
      <el-table-column align="center"  label="申请方式" width="160" >
        <template #default="scope">
          {{scope.row.apply_type === 1 ? "邮箱认证" : "图片认证"}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="institution" label="所属机构" width="160"/>

      <el-table-column  align="center" label="查看详情" width="250">
        <template #default="scope">
          <div v-if="scope.row.apply_type === 2">
            <el-button round @click="download(scope.row.url)" style="align-items: center">
              下载图片
            </el-button>
          </div>

          <div v-else style="text-align: center">{{scope.row.email}}</div>
        </template>

      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" round @click="agree(scope.row.apply_id)">同意</el-button>
          <el-button type="danger" round @click="disagree(scope.row.apply_id)">拒绝</el-button>
        </template>

      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import {applyAxios} from "@/axios";
export default {
  name: "ApplyList",
  data() {
    return {
      records: [],
      dialogVisible: false,
    }
  },
  methods: {
    getList() {
      applyAxios.post('admin/get-scholar-apply', {
        "start": 0,
        "end": 10
      }).then(res=>{
        console.log(res.data.records)
        this.records = res.data.records
      }).catch(e=> {
        console.log(e)
      })
    },
    download(url) {
      window.open(url)
      // let fileURL = window.URL.createObjectURL(new Blob([url], {type: 'application/zip'}));
      // let fileLink = document.createElement('a');
      //
      // console.log(fileURL)
      // fileLink.href = fileURL;
      // fileLink.download = "图片认证"
      // fileLink.click();

    },
    agree(id) {
      applyAxios.post('admin/deal-scholar-apply', {
        "apply_id": id,
        "is_agree": true
      }).then(res=>{
        console.log(res)
        this.getList()
      })
    },
    disagree(id) {
      applyAxios.post('admin/deal-scholar-apply', {
        "apply_id": id,
        "is_agree": false
      }).then(res=>{
        console.log(res)
        this.getList()
      })
    }
  },
  mounted() {
    this.getList()
  }
}

</script>

<style scoped>
.list{
  min-width: 1350px;
  max-width: 1350px;
  min-height: 700px;
  margin: 50px auto auto auto;
  border-radius: 5px;
  box-shadow: 0 0 14px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
  background-color: white;
}
</style>