<template>
  <paper-show style="margin-top: 30px;margin-left: 30px"
              :paper-name="paperName" :abstract="this.abstract"
                :author="this.author" :org="org"  :num="num" :type="type"
  ></paper-show>
  <el-button @click="JumpToSearch">test</el-button>
</template>

<script>
import PaperShow from "@/components/paperShow";
export default {
  name: "testSearch",
  components: {PaperShow},
  data(){
    return{
      paperName:"论文标题",
      abstract:"test abstract:城市的生态基础设施是城市及其居民持续获得自然生态服务的保障.面对中国未来巨大的城市化前景,前瞻性的城市生态基础设施建设具有非常重要的战略意义.为此,本文提出",
      author:"MyShirt",
      org:"北航",
      num:12,
      type:0,
    }
  },
  methods:{
    JumpToSearch(){
      this.$router.push({
        path:'/paperSearch',
        params:{

        }
      })
    }
  }
}
</script>

<style scoped>

</style>