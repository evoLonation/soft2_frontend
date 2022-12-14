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
      <el-menu-item index="4">互助</el-menu-item>
      <el-menu-item index="5">系统</el-menu-item>
    </el-menu>
    <el-table
      :data="this.curMessages" table-layout="fixed" :key="this.flush">
      <template #empty>
        <h1 style="margin:20px auto;">暂无消息</h1>
      </template>
      <el-table-column prop="content" label="内容" width="550" resizable :key="this.key"></el-table-column>
      <el-table-column prop="msg_time" label="日期" width="200" resizable :key="this.key"></el-table-column>
      <el-table-column fixed="right" label="操作" resizable :key="this.key">
        <template #default="scope">
          <el-row>
            <el-col :span="8" v-if="!scope.row.read">
              <el-button round size="small" @click="this.read(scope.row.id)">标记已读</el-button>
            </el-col>
            <el-col :span="8" v-else>
              <div  style="margin-left: 10px; font-size: small">已读</div>
            </el-col>
            <el-col :span="6" v-if="scope.row.type===1 || scope.row.type===2 || scope.row.type===4 || scope.row.type===6">
              <el-button link type="primary" @click="this.openPaper(scope.row.pid)" class="msg-op">前往文献</el-button>
            </el-col>
            <el-col :span="5" v-if="scope.row.type===4">
              <el-button link type="primary" @click="this.openScholar(scope.row.sid)" class="msg-op">学者信息</el-button>
            </el-col>
            <el-col :span="5" v-if="scope.row.type===1 || scope.row.type===2 || scope.row.type===3">
              <el-button link type="primary" @click="this.openUser(scope.row.uid)" class="msg-op">用户信息</el-button>
            </el-col>
            <el-col :span="6" v-if="scope.row.type===7 || scope.row.type===8">
              <el-button link type="primary" @click="this.openHelp(scope.row.rid)" class="msg-op">互助中心</el-button>
            </el-col>
            <el-col :span="5" v-if="scope.row.type===4 && !scope.row.read">
              <el-popconfirm
                  confirm-button-text="同意"
                  cancel-button-text="拒绝"
                  icon-color="#626AEF"
                  title="建议核实信息"
                  @confirm="this.accept(scope.row.gid, scope.row.id)"
                  @cancel="this.refuse(scope.row.gid, scope.row.id)">
                <template #reference>
                  <el-button round size="small" @click="this.showConfirm=true">审批</el-button>
                </template>
              </el-popconfirm>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column fixed="right" style="float:right;" width="50" :key="this.key"><template #default="scope">
        <el-button circle size="small" @click="del(scope.row.id)"><el-icon><Delete></Delete></el-icon></el-button>
      </template></el-table-column>
    </el-table>
  </div>

  <el-dialog custom-class="dialog" v-model="this.showInfo" center>
    <template #title>
      <el-icon size="30" style="color: lightgrey;vertical-align: bottom;margin-right: 10px"><InfoFilled /></el-icon>
      个人信息
    </template>
      <el-form label-width="100px" >
        <el-form-item label="昵称:">
                <span style="margin-left: 30px">
                  {{this.userInfo.nickname}}
                </span>
        </el-form-item>
        <el-form-item label="邮箱:">
                <span style="margin-left: 30px">
                  {{this.userInfo.email}}
                </span>
        </el-form-item>
      </el-form>
  </el-dialog>
</template>

<script>
import {Checked, Delete, DeleteFilled, InfoFilled} from "@element-plus/icons";
import {ElMessage} from "element-plus";
import {messageAxios, userAxios} from "@/axios";
import {loginStore} from "@/store";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Message",
  components: {InfoFilled, DeleteFilled, Delete, Checked},
  setup(){
    const loginStore1 = loginStore()
    let messages , curMessages
    const checkGet = loginStore1.$onAction(
        ({name, store, args, after, onError
        })=>{
          console.log(name,store,args,onError)
          after(()=>{
            messageAxios.post('message/get-all-messages',{
            }).then(res=>{
              messages = curMessages = res.data.messages
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
    this.flush++;
  },
  data(){
    return {
      showConfirm: false,
      flush: 0,
      key: 1,
      userInfo: {
        username: '',
        email: '',
      },
      showInfo: false,
    }
  },
  methods:{
    getMessages(){
      if (!this.loginStore1.checkLogin){
        return
      }
      messageAxios.post('message/get-all-messages',{
      }).then(res=>{
        console.log(res.data)
        this.messages = this.curMessages = res.data.messages
        this.flush++;
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
            if (m.type === 1 || m.type === 2 || m.type === 3){
              tmp.push(m);
            }
          });
          this.curMessages = tmp;
          break;
        case "3":
          this.messages.forEach((m)=>{
            if (m.type === 4 || m.type === 6){
              tmp.push(m);
            }
          });
          this.curMessages = tmp;
          break;
        case "4":
          this.messages.forEach((m)=>{
            if (m.type === 7 || m.type === 8){
              tmp.push(m);
            }
          });
          this.curMessages = tmp;
          break;
        case "5":
          this.messages.forEach((m)=>{
            if (m.type === 0 || m.type === 5){
              tmp.push(m);
            }
          });
          this.curMessages = tmp;
          break;
        default: console.log("err")
      }
      this.flush++;
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
        this.flush++;
        this.curMessages.forEach((m)=>{
          if (m.id === id){
            m.read = true
          }
        })
        this.flush++;
      })

    },
    allRead(){
      this.messages.forEach((m)=>{
        this.read(m.id)
      })
      this.flush++;
    },
    openPaper(id){
      this.$router.push({name: 'Paper', params:{paperId: id}});
    },
    openScholar(id){
      this.$router.push({name:'Scholar', params:{scholarId: id}});
    },
    openUser(id){
      this.showInfo = true;
      userAxios.post('user/get-nickname', {
        "user_id": id,
      }).then(res=>{
        console.log(res.data)
        this.userInfo.nickname = res.data.nickname
        this.userInfo.email = res.data.email===''?'暂无': res.data.email;
      })
    },
    openHelp(id){
      console.log(id)
      this.$router.push({name: 'HelpCenter'})
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
        this.flush++;
      }).catch(e=>{
        console.log(e)
      })
    },
    allDel(){
      this.messages.forEach(m=>{
        this.del(m.id)
      })
    },
    accept(gid, id){
      userAxios.post('grievance/accept', {
        "grievance_id": gid
      }).then(()=>{
          ElMessage('已同意')
        this.read(id)
        this.flush++;
      })
    },
    refuse(gid, id){
      userAxios.post('grievance/refuse', {
        "grievance_id": gid
      }).then(()=>{
        ElMessage('已拒绝')
        this.read(id)
        this.flush++;
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
.msg-op{
  color: #7682a2;
}
</style>
<style>
.dialog{
  width: 500px;
  min-height: 230px;
  border-radius: 5px;
  box-shadow: 0 0 14px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
}
</style>