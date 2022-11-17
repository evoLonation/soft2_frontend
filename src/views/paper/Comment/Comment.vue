<template>
  <div class="wrap-comment">
    <el-row class="part-cmt">
      <el-col :span="3">热门评论</el-col>
      <el-col :span="3" :offset="18">
        <el-button round @click="this.showComment=true" class="more">更多<el-icon><DArrowRight /></el-icon></el-button>
      </el-col>
    </el-row>
    <el-card shadow="never" v-if="this.comment !== null">
      <el-row class="user-info">
        <el-col>{{this.comment.userName}}:</el-col>
      </el-row>
      <el-row class="content">
        <el-col>{{this.comment.content}}</el-col>
      </el-row>
      <el-row class="like-date" gutter="2">
        <el-col :span="0.5" style="float:right;" :offset="19">
          <el-button circle v-if="this.comment.liked" @click="dislike(this.comment.id)" style="cursor: pointer">
            <el-icon ><StarFilled /></el-icon>
          </el-button>
          <el-button circle v-else @click="this.like(this.comment.id)" style="cursor: pointer">
            <el-icon ><Star /></el-icon>
          </el-button>
        </el-col>
        <el-col :span="1" class="likes1">{{this.comment.likes}}</el-col>
        <el-col :span="2" class="date1">{{this.comment.date}}</el-col>
      </el-row>
    </el-card>
    <div v-else style="padding: 20px 20px 20px 20px">暂无评论</div>
  </div>
<!--右侧评论区-->
  <el-drawer v-model="this.showComment"
             :direction="'rtl'"
             title="评论区"
             custom-class="drawer">
    <el-row gutter="5">
      <el-col :span="30">
        <el-input type="textarea" :rows="2" placeholder="请输入评论" v-model="commentText" style="width: 420px"/>
      </el-col>
      <el-col :span="1">
        <el-button circle size="large"><el-icon><Promotion /></el-icon></el-button>
      </el-col>
    </el-row>
    <el-row style="height: 20px"></el-row>
    <el-card v-for="cmt in this.comments" :key="cmt" shadow="hover" custom-class="card" >
      <el-row class="user-info">
        <el-col>{{cmt.userName}}:</el-col>
      </el-row>
      <el-row class="content">
        <el-col>{{cmt.content}}</el-col>
      </el-row>
      <el-row class="like-date">
        <el-col :span="1.5" style="float:right;" :offset="16">
          <el-button circle size="small" v-if="cmt.liked" @click="dislike(cmt.id)" style="cursor: pointer">
            <el-icon ><StarFilled /></el-icon>
          </el-button>
          <el-button circle size="small" v-else @click="this.like(cmt.id)" style="cursor: pointer">
            <el-icon ><Star /></el-icon>
          </el-button>
        </el-col>
        <el-col :span="1.5" class="likes">{{cmt.likes}}</el-col>
        <el-col :span="4" class="date">{{cmt.date}}</el-col>
      </el-row>
    </el-card>
  </el-drawer>
</template>

<script>
import Data from "@/views/paper/Info/Data";
import {DArrowRight, Promotion, Star, StarFilled} from "@element-plus/icons";
import {ref} from "vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "PaperComment",
  props:[],
  components: {Promotion, DArrowRight, Star, StarFilled},
  setup(){
    return {
      commentText: ref('')
    }
  },
  mounted() {
    this.getComments();
  },
  data(){
    return {
      comments: [
        {
          userName: '',
          userId: '',
          id: '',
          content: '',
          likes: '',
          date: '',
          liked: Boolean,
        },
      ],
      comment: null,
      showComment: false,
    }
  },
  methods: {
    getComments(){
      this.comments = Data.info.comments
      this.comment = this.comments[0]
    },
    like(id){

      this.comments.forEach((cmt)=>{
        if (cmt.id === id){
          cmt.likes++
          cmt.liked = true
        }
      })
    },
    dislike(id){

      this.comments.forEach((cmt)=>{
        if (cmt.id === id){
          cmt.likes--
          cmt.liked = false
        }
      })
    },
  },
}
</script>

<style scoped>
.wrap-comment{
  margin-top: 30px;
  width: 1265px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15),0 0 6px rgba(0,0,0,0.06);
  padding-top: 2px;
}
.part-cmt {
  font-weight: bold;
  line-height: 1.5;
  font-size: 20px;
  margin-left: 20px;
  margin-top: 20px;
}
.user-info{
  font-weight: bold;
  line-height: 1;
  font-size: 13px;
}
.content {
  line-height: 1;
  font-size: 10px;
  margin-top: 10px;
  color: dimgrey;
}
.like-date {
  margin-top: 1%;
  height: 5%;
}
.date{
  margin-top: 1%;
  margin-left: 3%;
  font-size: 10px;
}
.date1{
  margin-top: 0.5%;
  margin-left: 3%;
  font-size: 12px;
}
.more{
  font-size: 15px;
  margin-bottom: 10px;
}
.likes{
   margin-top: 1%;
   font-size: 10px
 }
.likes1{
  margin-top: 0.5%;
  font-size: 12px
}
</style>