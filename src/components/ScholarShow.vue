<template>
  <div class="show_scholar">
    <div class="scholar_name">
      <el-icon ><User /></el-icon>
      <div style="display: inline-block; padding-left: 10px; font-size: 20px; font-weight: bold" @click="gotoScholar">
        {{this.name}}</div> <br/>
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
import {useRouter} from "vue-router";
export default {
  name: "ScholarShow",
  props:[
    'name', 'n_paper', 'n_citation', 'weight', 'scholar_id'
  ],
  setup(props) {
    const router = useRouter();
    const gotoScholar = () => {
      router.push({
        name:'Scholar',
        params:{
          scholarId: props.scholar_id
        }
      })
    }
    return {
      gotoScholar
    }
  }
}
</script>

<style scoped>
.show_scholar {
  background-color: white;
  border: 0.001px white solid;
  border-radius: 4px;
  padding-left: 15px;
  padding-top: 10px;
}

.show_scholar .scholar_name div:hover {
  color: aquamarine;
  cursor: pointer;
}
</style>