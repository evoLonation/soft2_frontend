<template>
  <div class="wrap-comment">
    <el-row class="part-cmt">
      <el-col :span="3">热门评论</el-col>
      <el-col :span="3" :offset="18">
        <el-button round @click="this.showComment=true" class="more" color="#66b1ff">更多<el-icon><DArrowRight /></el-icon></el-button>
      </el-col>
    </el-row>
    <el-card shadow="never" v-if="this.comment !== null">
      <el-row class="user-info">
        <el-col :span="2">{{this.comment.userName}}:</el-col>
        <el-col :span="0.5" :offset="17">
          <el-button circle size="small" v-if="this.comment.liked" @click="dislike(this.comment.id)" style="cursor: pointer">
            <el-icon color=" #66b1ff"><StarFilled /></el-icon>
          </el-button>
          <el-button circle size="small" v-else @click="this.like(this.comment.id)" style="cursor: pointer">
            <el-icon color=" #66b1ff"><Star /></el-icon>
          </el-button>
        </el-col>
        <el-col :span="1" class="likes1">{{this.comment.likes}}</el-col>
        <el-col :span="2" class="date1">{{this.comment.date}}</el-col>
      </el-row>
      <el-row class="content">
        <el-col>{{this.comment.content}}</el-col>
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
        <el-button circle size="large" @click="this.publish" color=" #66b1ff"><el-icon color="#ffffff"><Promotion /></el-icon></el-button>
      </el-col>
    </el-row>
    <el-row style="height: 20px"></el-row>
    <el-card v-for="cmt in this.comments" :key="cmt" shadow="hover" custom-class="card" >
      <el-row class="user-info">
        <el-col :span="3">{{cmt.userName}}:</el-col>
        <el-col :span="1.5" style="float:right;" :offset="10">
          <el-button circle size="small" v-if="cmt.liked===0" @click="dislike(cmt.id)" style="cursor: pointer">
            <el-icon color=" #66b1ff"><StarFilled /></el-icon>
          </el-button>
          <el-button circle size="small" v-else @click="this.like(cmt.id)" style="cursor: pointer">
            <el-icon color=" #66b1ff"><Star /></el-icon>
          </el-button>
        </el-col>
        <el-col :span="2" class="likes">{{cmt.likes}}</el-col>
        <el-col :span="4" class="date">{{cmt.date}}</el-col>
        <el-col :span="1" class="delete" v-if="cmt.userId === this.store.userId">
          <el-button circle size="small" @click="this.del(cmt.id)">
            <el-icon color=" #b25252"><DeleteFilled/></el-icon>
          </el-button>
        </el-col>
      </el-row>
      <el-row class="content">
        <el-col>{{cmt.content}}</el-col>
      </el-row>
    </el-card>
  </el-drawer>
</template>

<script>
import {DArrowRight, DeleteFilled, Promotion, Star, StarFilled} from "@element-plus/icons";
import {ref} from "vue";
import {ElMessage} from "element-plus";
import {paperStore} from "@/store";
import {paperScholarAxios, userAxios} from "@/axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "PaperComment",
  props:[],
  components: {DeleteFilled, Promotion, DArrowRight, Star, StarFilled},
  setup(){
    return {
      commentText: ref(''),
      store: paperStore()
    }
  },
  mounted() {
    this.getComments();
    this.getLiked();
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
          liked: Number,
        },
      ],
      comment: null,
      showComment: false,
    }
  },
  methods: {
    getComments(){ //这个地方是从store拿，更新后从接口拿
      this.comments = this.store.paperInfo.comments
      this.comment = this.comments[0]
    },
    getCommentsAPI(){
      paperScholarAxios.post('paper/comment/get-comment', {
        "paper_id": this.store.paperInfo.id
      }).then(res=>{
        this.comments = res.data.comments
        //store的comments也要更新：
        this.store.paperInfo.comments = this.comments
      }).catch(()=>{
        console.log('评论更新失败，从本地获取')
        this.getComments()
      })
    },
    getLiked(){
      userAxios.post('paper/comment-liked', {
        "paper_id": this.store.paperId
      }).then(res=>{
        const comment_liked = res.data.comment_liked
        for (let i = 0; i < this.comments.length; i++) {
          this.comments[i].liked = comment_liked[i].is_liked
        }
      }).catch(()=>{
        console.log('未获取，默认全false')
        this.comments.forEach(cmt=>{
          cmt.liked = 1
        })
      })
      },
    like(id){
      userAxios.post('paper/comment/like', {
        'comment_id': this.comment.id
      }).then(()=>{
        this.comments.forEach((cmt)=>{
          if (cmt.id === id){
            cmt.likes++
            cmt.liked = true
          }
        })
      }).catch(e=>{
        ElMessage('操作失败')
        console.log(e)
      })
    },
    dislike(id){
      userAxios.post('paper/comment/dislike', {
        'comment_id': this.comment.id
      }).then(()=>{
        this.comments.forEach((cmt)=>{
          if (cmt.id === id){
            cmt.likes--
            cmt.liked = false
          }
        })
      }).catch(e=>{
        ElMessage('操作失败')
        console.log(e)
      })
    },
    publish(){
      if (this.commentText.length === 0){
        ElMessage('评论不能为空')
        return
      }
      userAxios.post('paper/comment', {
        'paper_id': this.comment.id,
        'content': this.commentText
      }).then(()=>{
        setTimeout(()=>{
          this.getCommentsAPI()
        },500)
      }).catch(e=>{
        console.log(e)
        ElMessage('操作失败')
      })
    },
    del(id){
      userAxios.post('paper/comment/delete', {
        'comment_id': id
      }).then(()=>{
        ElMessage("删除成功")
        setTimeout(()=>{
          this.getCommentsAPI()
        },500)
      }).catch(e=>{
        console.log(e)
        ElMessage('操作失败')
      })
    },
  }
}
</script>

<style scoped>
.wrap-comment{
  margin-top: 30px;
  width: 100%;
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
  line-height: 1;
}
.content {
  line-height: 1;
  font-size: 10px;
  margin-top: 10px;
  color: dimgrey;
}
.date{
  margin-top: 1.5%;
  margin-left: 3%;
  font-size: 10px;
}
.date1{
  margin-top: 0.6%;
  margin-left: 3%;
  font-size: 12px;
}
.more{
  font-size: 15px;
  margin-bottom: 10px;
  color: #ecf5ff;
}
.likes{
   margin-top: 1.5%;
   font-size: 10px
 }
.likes1{
  margin-top: 0.6%;
  font-size: 12px
}
</style>