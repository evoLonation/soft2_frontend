<template>
  <el-button class="more" round @click="this.initGraph()">more>></el-button>
  <el-dialog v-model="this.showNet" center id="dialog" custom-class="dialog">
    <template #header>{{this.value}}
      <el-tooltip :content="this.value" placement="top" effect="light">
        <el-switch
            style="margin-left: 20px"
            v-model="this.value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="合作关系"
            inactive-value="引用关系"
            size="large">
        </el-switch>
      </el-tooltip>
    </template>
    <div id="co_net" class="g6-graph" v-if="this.showNet" v-show="this.value==='合作关系'"></div>
    <div id="ci_net" class="g6-graph" v-if="this.showNet" v-show="this.value==='引用关系'"></div>
  </el-dialog>
</template>

<script>
import {Graph} from "@/views/scholar/RelationNet/Graph";
import Data from "@/views/scholar/RelationNet/Data"
import {paperScholarAxios} from "@/axios";

export default {
  name: "testNet",
  components: {},
  props:["id"],
  beforeUnmount () {
    window.removeEventListener('message', (e) => {
      this.openAuthor(e.data)
    })
  },
  mounted() {
    this.initData()
    window.addEventListener('message', (e) => {
      console.log('catch: ',e.data)
      this.openAuthor(e.data)
    })
  },
  data(){
    return{
      co_net: null,
      co_net_data: null,
      ci_net: null,
      ci_net_data: null,
      value: '合作关系',
      showNet: false,
    }
  },
  methods: {
    openAuthor(id){
      //TODO: push到学者主页
      this.$router.push({name: "Scholar", params:{id: id
        }})
    },
    initData(){
      let got = false;
      paperScholarAxios.post('scholar/relation-net', {
        "scholar_id": this.id
      }).then(res=>{
        this.co_net_data = res.data.co_net;
        this.ci_net_data = res.data.ci_net;
        got = true
      })
      if (!got){
        console.log("未获取到关系网，使用本地数据")
        this.co_net_data = Data.co_net
        this.ci_net_data = Data.ci_net
      }
    },
    initGraph(){
      this.showNet = true
      setTimeout(()=>{
        this.initCo()
        this.initCi()
      },100)
    },
    initCo(){
      this.co_net = new Graph(
          450,
          400,
          document.getElementById("co_net")
      );
      this.co_net.loadData(this.co_net_data)
      this.co_net.render()
      this.co_net.initListener()
    },
    initCi(){
      this.ci_net = new Graph(
          450,
          400,
          document.getElementById("ci_net")
      );
      this.ci_net.loadData(this.ci_net_data)
      this.ci_net.render()
      this.ci_net.initListener()
    }
  }
}
</script>

<style scoped>
.more {
  border: none;
  margin: 10px 77px auto auto;
  color: #73767a;
}

.more:hover {
  background: white;
}
</style>
<style>
.dialog{
  border-radius: 10px;
  height: 500px;
  width: 500px;
}
</style>