<template>
  <div class="scholar_skeleton">
      <el-avatar :size="100" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" style="margin-top: 25px;margin-left: 20px"/>
      <div style="display: inline-block;vertical-align: top;height: 100%;width: 275px">
        <div style="font-size: 23px;margin-left: 20px;margin-top: 15px; color: #007dfa; cursor:pointer;overflow: hidden;
                      width: 60%;white-space: nowrap;text-overflow: ellipsis" @click="gotoScholar">{{name}}</div>
        <div style="font-size: 18px;margin-left: 20px;margin-top: 15px; color: #b0b2b3;">{{institution}}</div>
        <div style="font-size: 18px;margin-left: 20px;margin-top: 15px; color: #b0b2b3;">发表的论文数:{{paper_num}}</div>
      </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";

export default {
  name: "scholarList",
  props:[
      'name','paper_num','institution','id'
  ],
  setup(props){
    const router = useRouter();
    const gotoScholar = () => {
      router.push({
        name:'Scholar',
        params:{
          scholarId:props.id
        }
      })
    }
    return{
      gotoScholar
    }
  },
  methods:{
    jumpToScholar(){
      // this.$router.push({name: 'Paper', params:{paperId: id}});
    }
  },
  created() {
    // this.sid=id;
  }
}
</script>

<style scoped>
.scholar_skeleton{
  background-color: white;
  height: 150px;
  width: 400px;
  display: inline-block;
  margin-left: 40px;
  margin-top: 20px; border: 3px white solid;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
}

.scholar_skeleton:hover{
  background-color: white;
  height: 150px;
  width: 400px;
  display: inline-block;
  border-radius: 4px;
  border: 1px lightgray solid;
  box-shadow:  3px 3px 3px lightgray;
}
</style>