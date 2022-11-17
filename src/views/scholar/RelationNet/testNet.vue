<template>
  <el-tooltip :content="this.value" placement="top">
    <el-switch
        v-model="this.value"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-value="合作关系"
        inactive-value="引用关系"
    >
    </el-switch>
  </el-tooltip>
  <div  v-show="this.value === '合作关系'">
    <div id="co_net" class="g6-graph"></div>
  </div >
  <div v-show="this.value === '引用关系'">
    <div id="ci_net" class="g6-graph"></div>
  </div>
</template>

<script>
import {Graph} from "@/views/scholar/RelationNet/Graph";
import Data from "@/views/scholar/RelationNet/Data"
export default {
  name: "testNet",
  mounted() {
    const co_net_data = Data.co_net
    this.co_net = new Graph(
        1000,
        400,
        document.getElementById("co_net")
    );
    this.co_net.loadData(co_net_data)
    this.co_net.render()
    this.co_net.initListener()

    const ci_net_data = Data.ci_net
    this.ci_net = new Graph(
        1000,
        400,
        document.getElementById("ci_net")
    );
    this.ci_net.loadData(ci_net_data)
    this.ci_net.render()
    this.ci_net.initListener()
  },
  data(){
    return{
      co_net: null,
      ci_net: null,
      value: '合作关系'
    }
  },
  methods: {
    openAuthor(){

    }
  }
}
</script>

<style scoped>

</style>