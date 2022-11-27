<template>
  <div class="wrap">
    <el-button round >全部已读<el-icon style="margin-left: 5px" @click="this.allRead"><Checked /></el-icon></el-button>
    <el-button round >全部删除<el-icon style="margin-left: 5px" ><DeleteFilled/></el-icon></el-button>
    <el-menu
        :default-active="'1'"
        class="el-menu-demo"
        mode="horizontal"
        @select="this.changeType"
    >
      <el-menu-item index="1">全部</el-menu-item>
      <el-menu-item index="2">互动</el-menu-item>
      <el-menu-item index="3">申诉</el-menu-item>
      <el-menu-item index="4">文献互助</el-menu-item>
      <el-menu-item index="5">系统</el-menu-item>
    </el-menu>
    <el-table
      :data="this.curMessages" table-layout="fixed">
      <el-table-column prop="content" label="内容" width="600" resizable></el-table-column>
      <el-table-column prop="date" label="日期" width="150" resizable></el-table-column>
      <el-table-column fixed="right" label="操作" resizable>
        <template #default="scope">
          <el-row>
            <el-col :span="8" v-if="!scope.row.read">
              <el-button round size="small" @click="this.read(scope.row.id)">标记已读</el-button>
            </el-col>
            <el-col :span="8" v-else>
              <div  style="margin-left: 10px; font-size: small">已读</div>
            </el-col>
            <el-col :span="6" v-if="scope.row.type==='1' || scope.row.type==='2' || scope.row.type==='4' || scope.row.type==='6'">
              <el-button link type="primary" @click="this.openPaper(scope.row.pid)">前往文献</el-button>
            </el-col>
            <el-col :span="5" v-if="scope.row.type==='4'">
              <el-button link type="primary" @click="this.openAuthor(scope.row.uid)">申诉者</el-button>
            </el-col>
            <el-col :span="5" v-if="scope.row.type==='1' || scope.row.type==='2' || scope.row.type==='3'">
              <el-button link type="primary" @click="this.openAuthor(scope.row.uid)">学者页</el-button>
            </el-col>
            <el-col :span="6" v-if="scope.row.type==='7' || scope.row.type==='8'">
              <el-button link type="primary" @click="this.openHelp(scope.row.rid)">打开互助</el-button>
            </el-col>
            <el-col :span="5" v-if="scope.row.type==='4'">
              <el-popconfirm
                  confirm-button-text="同意"
                  cancel-button-text="拒绝"
                  icon-color="#626AEF"
                  title="建议核实信息"
                  @confirm="this.accept(scope.row.gid)"
                  @cancel="this.refuse(scope.row.gid)">
                <template #reference>
                  <el-button round size="small" @click="this.showConfirm=true">审批</el-button>
                </template>
              </el-popconfirm>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column fixed="right" style="float:right;" width="50"><template #default="scope">
        <el-button circle size="small" @click="del(scope.row.id)"><el-icon><Delete></Delete></el-icon></el-button>
      </template></el-table-column>
    </el-table>
  </div>

</template>

<script>
import {Checked, Delete, DeleteFilled} from "@element-plus/icons";
import Messages from "@/views/message/Data";
import {ElMessage} from "element-plus";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Message",
  components: {DeleteFilled, Delete, Checked},
  mounted() {
    this.getMessages()
  },
  data(){
    return {
      messages: [],
      curMessages: [],
      showConfirm: false,
    }
  },
  methods:{
    getMessages(){
      let got = false
      this.axios.post('message/get-all-messages',{

      }).then(res=>{
        const code = res.data.code
        if (code === '1'){
          ElMessage('请先登录')
        }else {
          this.messages = this.curMessages = res.data.messages
          got = true
        }
      })
      if (!got){
        console.log('未能获取，使用本地数据')
        this.messages = this.curMessages = Messages.Messages
      }
    },
    changeType(key){
      let tmp = [];
      switch (key){
        case "1":
          this.curMessages = this.messages;
          break;
        case "2":
          this.messages.forEach((m)=>{
            if (m.type === '1' || m.type === '2' || m.type === "3"){
              tmp.push(m);
            }
          });
          this.curMessages = tmp;
          break;
        case "3":
          this.messages.forEach((m)=>{
            if (m.type === '4' || m.type === '6'){
              tmp.push(m);
            }
          });
          this.curMessages = tmp;
          break;
        case "4":
          this.messages.forEach((m)=>{
            if (m.type === '7' || m.type === '8'){
              tmp.push(m);
            }
          });
          this.curMessages = tmp;
          break;
        case "5":
          this.messages.forEach((m)=>{
            if (m.type === '0' || m.type === '5'){
              tmp.push(m);
            }
          });
          this.curMessages = tmp;
          break;
        default: console.log("err")
      }
    },
    read(id){
      this.axios.post('message/read', {
        "id": id
      }).then(res=>{
        const code = res.data.code
        if (code === '1'){
          ElMessage('已读失败')
        }else {
          this.messages.forEach((m)=>{
            if (m.id === id){
              m.read = true
            }
          })
          this.curMessages.forEach((m)=>{
            if (m.id === id){
              m.read = true
            }
          })
        }
      })
    },
    allRead(){
      this.messages.forEach((m)=>{
        this.read(m.id)
      })
    },
    openPaper(id){
      this.$router.push({name: 'Paper', params:{paperId: id}});
    },
    openAuthor(id){
      //TODO: 跳转到学者主页
      console.log(id)
    },
    openHelp(id){
      //TODO: 跳转到那条互助页
      console.log(id)
    },
    del(id){
      this.axios.post('message/delete',{
        "id": id
      }).then(res=>{
        const code = res.data.code
        if (code === '1'){
          ElMessage('删除失败')
        }else {
          this.messages.forEach(m=>{
            if (m.id === id){
              this.messages.splice(this.messages.indexOf(m))
            }
          });
          this.curMessages.forEach(m=>{
            if (m.id === id){
              this.curMessages.splice(this.curMessages.indexOf(m))
            }
          });
        }
      })
    },
    allDel(){
      this.messages.forEach(m=>{
        this.del(m.id)
      })
    },
    accept(id){
      this.axios.post('grievance/accept', {
        "id": id
      }).then(res=>{
        const code = res.data.code
        if (code === '1'){
          ElMessage('审批失败')
        }else {
          ElMessage('已同意')
        }
      })
    },
    refuse(id){
      this.axios.post('grievance/refuse', {
        "id": id
      }).then(res=>{
        const code = res.data.code
        if (code === '1'){
          ElMessage('审批失败')
        }else {
          ElMessage('已拒绝')
        }
      })
    },
  }
}
</script>

<style scoped>
.wrap{
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 20px;
  padding: 30px 30px 30px 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06)
}
.el-menu-demo{
  margin-top: 20px;
}
</style>