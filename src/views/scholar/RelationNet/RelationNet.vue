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
    <div v-loading="this.loading_co" element-loading-text="合作关系网计算中..." id="co_net" class="g6-graph" v-if="this.showNet" v-show="this.value==='合作关系'"></div>
    <div v-loading="this.loading_ci" element-loading-text="引用关系网计算中..." id="ci_net" class="g6-graph" v-if="this.showNet" v-show="this.value==='引用关系'"></div>
  </el-dialog>
</template>

<script>
import {Graph} from "@/views/scholar/RelationNet/Graph";
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
      loading_co: true,
      loading_ci: true,
    }
  },
  watch: {
    '$route'() {
      this.$router.go(0);
    },
  },
  methods: {
    openAuthor(id){
      this.$router.push({name: "Scholar", params:{scholarId: id
        }})
    },
    initData(){
      paperScholarAxios.post('scholar/relation-net', {
        "scholar_id": this.id
      }).then(res=>{
        this.co_net_data = res.data.co_net;
        this.ci_net_data = res.data.ci_net;
        console.log(this.ci_net_data)
        this.co_net.loadData(this.co_net_data)
        this.co_net.render()
        this.loading_co = false
        this.co_net.initListener()
        this.ci_net.loadData(this.ci_net_data)
        this.ci_net.render()
        this.loading_ci = false
        this.ci_net.initListener()
      })
    },
    initGraph(){
      this.showNet = true
      setTimeout(()=>{
        this.initCo()
        this.initCi()
        this.initData()
      },100)
    },
    initCo(){
      this.co_net = new Graph(
          750,
          550,
          document.getElementById("co_net")
      );
    },
    initCi(){
      this.ci_net = new Graph(
          750,
          550,
          document.getElementById("ci_net")
      );
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
  height: 700px;
  width: 800px;
}
</style>