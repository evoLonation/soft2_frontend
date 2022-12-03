<template>
  <div class="scholar_skeleton" v-if="type===0">
      <el-avatar :size="100" :src="src" style="margin-top: 25px;margin-left: 20px"/>
      <div style="display: inline-block;vertical-align: top;height: 100%;width: 275px">
        <div style="font-size: 23px;margin-left: 20px;margin-top: 15px; color: #007dfa; cursor:pointer;overflow: hidden;
                      width: 60%;white-space: nowrap;text-overflow: ellipsis" @click="gotoScholar">{{name}}</div>
        <div style="font-size: 18px;margin-left: 20px;margin-top: 15px; color: #b0b2b3;">{{institution}}</div>
        <div style="font-size: 18px;margin-left: 20px;margin-top: 15px; color: #b0b2b3;">发表的论文数:{{paper_num}}</div>
      </div>
  </div>
  <div class="scholar_skeleton_1" v-if="type===1">
    <el-avatar :size="60" :src="src" style="margin-top: 30px;margin-left: 13px"/>
    <div style="display: inline-block;vertical-align: top;height: 100%;width: 275px">
      <div style="font-size: 20px;margin-left: 20px;margin-top: 17px; color: #007dfa; cursor:pointer;overflow: hidden;
                      width: 220px;white-space: nowrap;text-overflow: ellipsis;display: inline-block" @click="gotoScholar">{{name}}</div>
      <div style="width: 30px;display: inline-block;cursor: pointer" @click="cancelStar"><el-icon size="20"><Hide /></el-icon></div>
      <div style="font-size: 16px;margin-left: 20px;margin-top: 9px; color: #b0b2b3;">{{institution}}</div>
      <div style="font-size: 16px;margin-left: 20px;margin-top: 9px; color: #b0b2b3;">发表的论文数:{{paper_num}}</div>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import {userAxios} from "@/axios"

export default {
  name: "scholarList",
  props:[
      'name','paper_num','institution','id','type'
  ],
  data(){
    return{
      src:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    }
  },
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
    const cancelStar = () =>{
      let toSend={
        scholar_id:props.id
      }
      userAxios({
        method:'post',
        url:'scholar/delete-subscribe',
        data:JSON.stringify(toSend)
      }).then((res)=>{
        if(res.data.code==="0")this.$message('success',"取关成功");
        else this.$message('error',"取关失败");
      })
    }
    return{
      gotoScholar,cancelStar
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
  margin-top: 20px;
  border: 1px white solid;
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

.scholar_skeleton_1{
  background-color: white;
  height: 130px;
  width: 350px;
  border: 1px white solid;
  display: inline-block;
}

.scholar_skeleton_1:hover{
  background-color: #F1F5F9;
  height: 130px;
  width: 350px;
  border: 1px white solid;
  display: inline-block;
}
</style>