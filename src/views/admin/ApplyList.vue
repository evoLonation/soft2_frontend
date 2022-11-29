<template>
  <div class="list">
    <h2 style="text-align: center">学者认证列表</h2>
    <table >
      <thead>
        <tr>
          <th style="width: 200px">姓名</th>
          <th style="width: 200px">申请方式</th>
          <th style="width: 200px">申请机构</th>
          <th style="width: 250px">详情</th>
          <th>操作</th>
        </tr>
      <tr v-for="(item, index) in records" :key="index">
        <td style="text-align: center">{{item.scholar_name}}</td>
        <td style="text-align: center">{{item.apply_type === 1 ? "邮箱认证" : "图片认证"}}</td>
        <td style="text-align: center">{{item.institution}}</td>
        <td v-if="item.apply_type === 2" style="text-align: center">
          <el-button round @click="dialogVisible = true" style="align-items: center">
            查看图片
          </el-button>
          <el-dialog
              v-model="dialogVisible"
              title="图片详情"
              width="25%"
              :before-close="handleClose"
          >
            <img :src="item.url"/>
            <template #footer>
                <span class="dialog-footer">
                  <el-button type="primary" @click="dialogVisible = false">
                    关闭
                  </el-button>
                </span>
            </template>
          </el-dialog>
        </td>
        <td v-else style="text-align: center">{{item.email}}</td>
        <td style="text-align: center"><el-button type="success" round @click="agree(item.apply_id)">同意</el-button>
            <el-button type="danger" round @click="disagree(item.apply_id)">拒绝</el-button>
        </td>
        <el-divider />
      </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import Records from './Data'
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
      let got = false
      applyAxios.get('admin/get-scholar-apply', {

      }).then(res=>{
        this.records = res.data.records
        got = true
      })
      if(!got) {
        console.log('未能获取，使用本地数据')
        this.records = Records.Records
      }
    },
    agree(id) {
      applyAxios.post('admin/deal-scholar-apply', {
        "apply_id": id,
        "is_agree": true
      })
    },
    disagree(id) {
      applyAxios.post('admin/deal-scholar-apply', {
        "apply_id": id,
        "is_agree": false
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
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 20px;
  padding: 30px 30px 30px 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06)
}
</style>