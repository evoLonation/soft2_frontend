<template>
  <div class="wrap">
    <el-button round >全部已读<el-icon style="margin-left: 5px" @click="this.allRead"><Checked /></el-icon></el-button>
    <el-button round >全部删除<el-icon style="margin-left: 5px" ><DeleteFilled/></el-icon></el-button>
    <el-menu
        :default-active="'1'"
        class="el-menu-demo"
        mode="horizontal"
        active-text-color="#87bdd8"
        @select="this.changeType"
    >
      <el-menu-item index="1" >全部</el-menu-item>
      <el-menu-item index="2">互动</el-menu-item>
      <el-menu-item index="3">申诉</el-menu-item>
      <el-menu-item index="4">文献互助</el-menu-item>
      <el-menu-item index="5">系统</el-menu-item>
    </el-menu>
    <el-table
      :data="this.curMessages" table-layout="fixed">
      <el-table-column prop="content" label="内容" width="600" resizable>
      </el-table-column>
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
              <el-button link type="primary" @click="this.openPaper(scope.row.pid)" class="msg-op">前往文献</el-button>
            </el-col>
            <el-col :span="5" v-if="scope.row.type==='4'">
              <el-button link type="primary" @click="this.openAuthor(scope.row.uid)" class="msg-op">申诉者</el-button>
            </el-col>
            <el-col :span="5" v-if="scope.row.type==='1' || scope.row.type==='2' || scope.row.type==='3'">
              <el-button link type="primary" @click="this.openAuthor(scope.row.uid)" class="msg-op">学者页</el-button>
            </el-col>
            <el-col :span="6" v-if="scope.row.type==='7' || scope.row.type==='8'">
              <el-button link type="primary" @click="this.openHelp(scope.row.rid)" class="msg-op">打开互助</el-button>
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
import {messageAxios, userAxios} from "@/axios";
import {loginStore} from "@/store";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Message",
  components: {DeleteFilled, Delete, Checked},
  setup(){
    const loginStore1 = loginStore()
    let messages , curMessages
    const checkGet = loginStore1.$onAction(
        ({
          name,
          store,
          args,
          after,
          onError
        })=>{
          console.log(name,store,args,onError)
          after(()=>{
            messageAxios.post('message/get-all-messages',{
            }).then(res=>{
              messages = curMessages = res.data.messages
            }).catch(()=>{
              console.log('未能获取，使用本地数据')
              messages = curMessages = Messages.Messages
              console.log(curMessages)
            })
          })
        })
    return{
      loginStore1,
      messages,
      curMessages,
      checkGet,
    }
  },
  mounted() {
    this.getMessages()
    console.log(this.curMessages)
  },
  data(){
    return {
      showConfirm: false,
    }
  },
  methods:{
    getMessages(){
      if (!this.loginStore1.isLogin){
        this.messages = this.curMessages = Messages.Messages
        return
      }
      messageAxios.post('message/get-all-messages',{
      }).then(res=>{
        this.messages = this.curMessages = res.data.messages
      }).catch(()=>{
        console.log('未能获取，使用本地数据')
        this.messages = this.curMessages = Messages.Messages
      })
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
      messageAxios.post('message/read', {
        "id": id
      }).then(()=>{
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
      messageAxios.post('message/delete',{
        "id": id
      }).then(()=>{
        this.messages.forEach(m=>{
          if (m.id === id){
            this.messages.splice(this.messages.indexOf(m))
          }
        });
        this.curMessages.forEach(m=>{
          if (m.id === id){
            this.curMessages.splice(this.curMessages.indexOf(m))
          }
        })
      }).catch(e=>{
        console.log(e)
      })
    },
    allDel(){
      this.messages.forEach(m=>{
        this.del(m.id)
      })
    },
    accept(id){
      userAxios.post('grievance/accept', {
        "id": id
      }).then(()=>{
          ElMessage('已同意')
      }).catch(e=>{
        ElMessage('操作失败，发生错误')
        console.log(e)
      })
    },
    refuse(id){
      userAxios.post('grievance/refuse', {
        "grievance_id": id
      }).then(()=>{
        ElMessage('已拒绝')
      }).catch(e=>{
        ElMessage('操作失败，发生错误')
        console.log(e)
      })
    },
  }
}
</script>

<style scoped>
.wrap{
  background-color: white;
  margin: 20px auto;
  width: 1250px;
  padding: 30px 30px 30px 30px;
  border-radius: 5px;
  box-shadow: 0 0 14px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
}
.el-menu-demo{
  margin-top: 20px;
}
.msg-field{
  color: #87bdd8;
}
.msg-op{
  color: #7682a2;
}
</style>