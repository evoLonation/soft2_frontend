<template>
  <el-button round @click="this.initGraph()">打开学者关系网</el-button>
  <el-dialog v-model="this.showNet" center id="dialog">
    <template #header>
      <el-tooltip :content="this.value" placement="top" effect="light">
        <el-switch
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
export default {
  name: "testNet",
  beforeUnmount () {
    window.removeEventListener('message', (e) => {
      this.openAuthor(e.data)
    })
  },
  mounted() {
    window.addEventListener('message', (e) => {
      this.openAuthor(e.data)
    })
  },
  data(){
    return{
      co_net: null,
      ci_net: null,
      value: '合作关系',
      showNet: false,
    }
  },
  methods: {
    openAuthor(id){
      console.log('学者id：'+id)
    },
    initGraph(){
      this.showNet = true
      setTimeout(()=>{
        this.initCo()
        this.initCi()
      },100)
    },
    initCo(){
      const co_net_data = Data.co_net
      this.co_net = new Graph(
          630,
          400,
          document.getElementById("co_net")
      );
      this.co_net.loadData(co_net_data)
      this.co_net.render()
      this.co_net.initListener()
    },
    initCi(){
      const ci_net_data = Data.ci_net
      this.ci_net = new Graph(
          630,
          400,
          document.getElementById("ci_net")
      );
      this.ci_net.loadData(ci_net_data)
      this.ci_net.render()
      this.ci_net.initListener()
    }
  }
}
</script>

<style scoped>

</style>