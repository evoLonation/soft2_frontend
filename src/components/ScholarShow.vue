<template>
  <div class="show_scholar">
    <div class="scholar_name">
      <el-icon ><User /></el-icon>
      <div style="display: inline-block; padding-left: 10px; font-size: 20px; font-weight: bold">{{this.name}}</div> <br/>
    </div>

    <div style="display: flex;">
      <div style=" margin-top: 10px">
        <el-divider style="height: 110px; " direction="vertical" />
      </div>
      <div style=" margin-left: 10px; ">
        <div style="padding-top: 15px">论文数量：{{this.n_paper}}</div>
        <div style="padding-top: 20px">被引量：{{this.n_citation}}</div>
        <div style="padding-top: 20px">领域指数：{{this.weight}}</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ScholarShow",
  props:[
    'name', 'n_paper', 'n_citation', 'weight'
  ],
}
</script>

<style scoped>

</style>