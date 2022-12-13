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
          @click="toIdentify(this.scholar_id)"
          :disabled="dis"
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
          id="subscribe_icon"
          :type="sub_type"
          @click="subscribe(this.sub_type)"
      >
        {{ sub_content }}
      </el-button>
    </div>
  </div>
</template>

<script>
import Tools from "@element-plus/icons-vue";
import router from "@/router";
import {applyAxios, userAxios} from "@/axios"
import {loginStore} from "@/store";

export default {
  name: "MyOperator",
  components: {
    Tools,
  },
  props: {
    "scholar_id": String,
  },
  data() {
    return {
      isMe: false,
      sub_content: "学者订阅",
      sub_type: "success",
      dis: true,
      uid: '',
      nickname: '',
      email: '',
    }
  },
  methods: {
    toIdentify(id) {
      this.login.checkLogin().then((res) => {
        if(!res) {
          this.login.displayLoginWindow = true;
        }
        else {
          if(!this.dis) {
            router.push({
              name: 'Identify',
              params: {
                scholarId: id,
              }
            })
          } else {
            userAxios.post('user/get-nickname/', {
              "user_id": this.uid,
            }).then((res) => {
              this.nickname = res.data.nickname;
              this.email = res.data.email;
              var msg = "你的邮件已被" + this.nickname + "认证\n" + "邮箱:" + this.email;
              this.$message.warning(msg);
            })
          }
        }
      })
    },
    subscribe(val) {
      if(val === "success") {
        userAxios.post('scholar/subscribe/', {
          "scholar_id": this.scholar_id,
        }).then((res) => {
          let code = res.data.code;
          console.log(code);
          if (code === 0) {
            this.$message.success("订阅成功!");
            this.sub_content = "取消订阅";
            this.sub_type = "danger";
          }
        })
      } else if(val === "danger") {
        userAxios.post('scholar/delete-subscribe/', {
          "scholar_id": this.scholar_id,
        }).then((res) => {
          console.log("have res");
          let code = res.data.code;
          console.log(code);
          if (code === 0) {
            this.$message.success("取消订阅成功!");
            this.sub_content = "学者订阅";
            this.sub_type = "success";
          }
        })
      }
    }
  },
  setup() {
    const login = loginStore();
    return {
      login
    }
  },
  created() {
    this.login.checkLogin().then(async (res) => {
      if(!res) {
        this.dis = false;
        this.sub_content = "学者订阅";
        this.sub_type = "success";
      }
      else {
        await userAxios.post('scholar/if-subscribe/', {
          "scholar_id": this.scholar_id,
        }).then((res) => {
          let code = res.data.code;
          if(code === 0) {
            this.sub_content = "学者订阅";
            this.sub_type = "success";
          }
          else if(code === 1) {
            this.sub_content = "取消订阅";
            this.sub_type = "danger";
          }
        })
        await applyAxios.post('scholar/check-user/', {
          "scholar_id": this.scholar_id,
        }).then((res) => {
          let code = res.data.code;
          if(code === 0) {
            this.dis = true;
            this.uid = res.data.user_id;
          }
          else {
            this.dis = false;
          }
        })
      }
    })
    this.login.$subscribe((mutation, state) => {
      if (!state.displayLoginWindow) {
        this.login.checkLogin().then(async (res) => {
          if (!res) {
            this.dis = false;
            this.sub_content = "学者订阅";
            this.sub_type = "success";
          } else {
            await userAxios.post('scholar/if-subscribe/', {
              "scholar_id": this.scholar_id,
            }).then((res) => {
              let code = res.data.code;
              if (code === 0) {
                this.sub_content = "学者订阅";
                this.sub_type = "success";
              } else if (code === 1) {
                this.sub_content = "取消订阅";
                this.sub_type = "danger";
              }
            })
            await applyAxios.post('scholar/check-user/', {
              "scholar_id": this.scholar_id,
            }).then((res) => {
              let code = res.data.code;
              if (code === 0) {
                this.dis = true;
                this.uid = res.data.user_id;
              } else {
                this.dis = false;
              }
            })
          }
        })
      }
    });
  }
}
</script>

<style scoped>
.operator {
  width: 350px;
  min-width: 350px;
  max-width: 350px;
  height: 200px;
  border-radius: 5px;
  box-shadow: 0 0 14px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
  margin-left: 30px;
  display: inline-block;
  background-color: white;
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