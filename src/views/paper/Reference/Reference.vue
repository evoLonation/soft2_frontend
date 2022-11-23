<template>
  <div class="wrap-ref">
    <div class="part-ref">参考文献</div>
    <el-table :data="this.references" class="table" @row-click="this.openPaper">
      <el-table-column prop="title" style="cursor: pointer" min-width="300px"></el-table-column>
      <el-table-column prop="author" style="cursor: pointer"></el-table-column>
      <el-table-column prop="year" style="cursor: pointer"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {useStore} from "@/store";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Reference",
  mounted() {
    this.getRefs()
  },
  data(){
    return{
      references: null,
    }
  },
  methods: {
    getRefs(){
      const store = useStore()
      this.references = store.paperInfo.references
    },
    openPaper(row){
      const id = row.id
      console.log(id)
      this.$router.push({name: 'Paper', params:{paperId: id}})
    }
  }
}
</script>

<style scoped>
.wrap-ref{
  margin-top: 30px;
  width: 1265px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
  padding-top: 2px;
  padding-bottom: 10px;
}
.part-ref{
  font-weight: bold;
  line-height: 1.5;
  font-size: 20px;
  margin-left: 20px;
  margin-top: 20px;
}
.table {
  cursor: pointer;
}
</style>