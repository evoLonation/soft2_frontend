<template>
  <div class="wrap-ref">
    <div class="part-ref">参考文献</div>
    <el-table :data="this.references" class="table" @row-click="this.openPaper"
              empty-text="无参考文献" max-height="700px">
      <el-table-column prop="title" style="cursor: pointer" min-width="500px"></el-table-column>
      <el-table-column prop="author" style="cursor: pointer"></el-table-column>
      <el-table-column prop="year" style="cursor: pointer"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {paperStore} from "@/store";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Reference",
  mounted() {
    paperStore().$onAction(({name, store, args, after, onError})=>{
      console.log(name, store, args, onError)
      after(() => {
        this.getRefs()
      })
    })
  },
  data(){
    return{
      references: null,
    }
  },
  methods: {
    getRefs(){
      const store = paperStore()
      this.references = store.paperInfo.references
    },
    openPaper(row){
      const id = row.id
      console.log(id)
      window.removeEventListener('scroll', this.handleScroll, true)
      this.$router.push({name: 'Paper', params:{paperId: id}})
    }
  },
}
</script>

<style scoped>
.wrap-ref{
  margin-top: 30px;
  width: 100%;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 14px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
  padding-top: 2px;
  padding-bottom: 10px;
}
.part-ref{
  font-weight: bold;
  color: #87bdd8;
  line-height: 1.5;
  font-size: 20px;
  margin-left: 20px;
  margin-top: 20px;
}
.table {
  cursor: pointer;
}
</style>