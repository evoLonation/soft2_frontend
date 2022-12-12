<template>
  <div class="wrap-comment">
    <el-row class="part-cmt">
      <el-col :span="3">热门评论</el-col>
      <el-col :span="3" :offset="18">
        <el-button round @click="this.showComment=true" class="more">
          <div style="color: #7682a2; font-weight: bold">更多</div>
        </el-button>
      </el-col>
    </el-row><el-card shadow="never" v-if="this.comment.username!=='username'" :key="this.key">
      <el-row :key="this.key">
        <el-col :span="2" class="user">{{ this.comment.username }}:</el-col>
        <el-col :span="0.5" :offset="17" class="date-like">
          <el-button round size="small" v-if="this.comment.is_liked===0" @click="dislike(this.comment.comment_id)" style="cursor: pointer" :key="this.key">
            <el-icon color=" #66b1ff" size="large">
              <StarFilled/>
            </el-icon><div style="margin-left: 5px">{{ this.comment.likes }}</div>
          </el-button>
          <el-button round size="small" v-else @click="this.like(this.comment.comment_id)" style="cursor: pointer" :key="this.key">
            <el-icon color=" #66b1ff" size="large">
              <Star/>
            </el-icon><div style="margin-left: 5px">{{ this.comment.likes }}</div>
          </el-button>
        </el-col>
        <el-col :span="2" class="date1">{{ this.comment.date }}</el-col>
      </el-row>
      <el-row class="content">
        <el-col>{{ this.comment.content }}</el-col>
      </el-row>
    </el-card>
    <div v-else style="padding: 20px 20px 20px 20px; margin: auto">暂无评论</div>
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
        <el-button circle size="large" @click="this.publish" color=" #87bdd8">
          <el-icon color="#ffffff">
            <Promotion/>
          </el-icon>
        </el-button>
      </el-col>
    </el-row>
    <el-row style="height: 20px"></el-row>
    <div :key="this.key">
      <div v-for="cmt in this.comments" :key="cmt">
        <el-card shadow="hover" custom-class="card" v-if="cmt.username!=='username'">
          <el-row>
            <el-col :span="3" class="user">{{ cmt.username }}:</el-col>
            <el-col :span="3" style="float:right;" :offset="10" class="date-like">
              <el-button round size="small" v-if="cmt.is_liked===0" @click="dislike(cmt.comment_id)" style="cursor: pointer" :key="this.key">
                <el-icon color=" #66b1ff" size="large">
                  <StarFilled/>
                </el-icon><div style="margin-left: 5px">{{ cmt.likes }}</div>
              </el-button>
              <el-button round size="small" v-else @click="this.like(cmt.comment_id)" style="cursor: pointer" :key="this.key">
                <el-icon color=" #66b1ff" size="large">
                  <Star/>
                </el-icon><div style="margin-left: 5px">{{ cmt.likes }}</div>
              </el-button>
            </el-col>
            <el-col :span="6" class="date">{{ cmt.date }}</el-col>
            <el-col :span="1" class="delete" v-if="cmt.user_id === this.loginStore1.userId" :key="this.key">
              <el-button circle size="small" @click="this.del(cmt.comment_id)">
                <el-icon color=" #b25252">
                  <DeleteFilled/>
                </el-icon>
              </el-button>
            </el-col>
          </el-row>
          <el-row class="content">
            <el-col>{{ cmt.content }}</el-col>
          </el-row>
        </el-card>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import {DeleteFilled, Promotion, Star, StarFilled} from "@element-plus/icons";
import {ref} from "vue";
import {ElMessage} from "element-plus";
import {paperStore, loginStore} from "@/store";
import {userAxios} from "@/axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "PaperComment",
  props: [],
  components: {DeleteFilled, Promotion, Star, StarFilled},
  setup() {
    const loginStore1 = loginStore()
    const paperStore1 = paperStore()
    let comments = [{username: 'username'}]
    const checkLike = loginStore1.$onAction(
        ({name, store, args, after, onError,}) => {
          console.log(name, store, args, onError)
          after(() => {
            if (!loginStore1.isLogin) {
              if (comments.length>0)
                comments.forEach(cmt => {
                  cmt.is_liked = 1
                })
            } else {
              userAxios.post('paper/comment-liked', {
                "paper_id": paperStore1.paperId
              }).then(res => {
                const comments_liked = res.data.comments_liked
                for (let i = 0; i < this.comments.length; i++) {
                  comments[i].is_liked = comments_liked[i].is_liked
                }
              })
            }
          })
        }
    )
    return {
      commentText: ref(''),
      store: paperStore(),
      loginStore1,
      paperStore1,
      checkLike,
      comments,
    }
  },
  mounted() {
    paperStore().$onAction(({name, store, args, after, onError})=>{
      console.log(name, store, args, onError)
      after(() => {
        this.getCommentsAPI()
        this.key++
      })
    })
  },
  data() {
    return {
      comment: {username: 'username'},
      showComment: false,
      key: 1,
    }
  },
  methods: {
    getCommentsAPI() {
      userAxios.post('paper/get-comment', {
        "paper_id": this.paperStore1.paperInfo.id
      }).then(res => {
        console.log(res.data)
        const hasComment = res.data.hasComment;
        if (hasComment === 0){
          console.log('cmts:', res.data.comments)
          this.comments = res.data.comments
          this.comment = this.comments[0]
          this.key++
        }
        else {
          console.log('no cmt')
          this.comments = [{username: 'username'}]
          this.key++
        }
      })
      this.getLiked()
    },
    getLiked() {
      if (!this.loginStore1.isLogin) {
        if (this.comments.length>0)
          this.comments.forEach(cmt => {
            cmt.is_liked = 1
          })
        this.key++
      }else {
        userAxios.post('paper/comment-liked', {
          "paper_id": this.paperStore1.paperId
        }).then(res => {
          const comments_liked = res.data.comments_liked
          for (let i = 0; i < this.comments.length; i++) {
            this.comments[i].is_liked = comments_liked[i].is_liked
          }
          this.comment = this.comments[0]
          this.key++
        })
      }
    },
    like(id) {
      userAxios.post('paper/comment/like', {
        'comment_id': id
      }).then(() => {
        const tmp = []
        this.comments.forEach((cmt) => {
          if (cmt.comment_id === id) {
            cmt.likes++
            cmt.is_liked = 0
          }
          tmp.push(cmt)
        })
        this.comments = tmp
        this.key++
      })
    },
    dislike(id) {
      userAxios.post('paper/comment/cancel', {
        'comment_id': id
      }).then(() => {
        const tmp = []
        this.comments.forEach((cmt) => {
          if (cmt.comment_id === id) {
            cmt.likes--
            cmt.is_liked = 1
          }
          tmp.push(cmt)
        })
        this.comments = tmp
        this.key++
      })
    },
    publish() {
      if (this.commentText.length === 0) {
        ElMessage('评论不能为空')
        return
      }
      console.log('id: ', this.paperStore1.paperId, 'cnt: ', this.commentText)
      userAxios.post('paper/comment', {
        'paper_id': this.paperStore1.paperId,
        'content': this.commentText
      }).then(() => {
        this.commentText = ''
        setTimeout(() => {
          this.getCommentsAPI()
          this.key++
        }, 1000)
        this.key++
      })
    },
    del(id) {
      userAxios.post('paper/comment/delete', {
        'comment_id': id
      }).then(() => {
        ElMessage("删除成功")
        setTimeout(() => {
          this.getCommentsAPI()
          this.key++
        }, 500)
        this.key++
      })
    },
  }
}
</script>

<style scoped>
.wrap-comment {
  margin-top: 30px;
  background-color: white;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.06);
  padding-top: 2px;
}

.part-cmt {
  font-weight: bold;
  color: #87bdd8;
  line-height: 1.5;
  font-size: 20px;
  margin-left: 20px;
  margin-top: 20px;
}

.user {
  font-weight: bold;
  color: #7682a2;
  line-height: 1;
}

.date-like {
  line-height: 1;
}

.content {
  line-height: 1;
  font-size: 10px;
  margin-top: 10px;
  color: dimgrey;
}

.date {
  margin-top: 1.5%;
  margin-left: 3%;
  font-size: 10px;
}

.date1 {
  margin-top: 0.6%;
  margin-left: 3%;
  font-size: 12px;
}

.more {
  font-size: 15px;
  margin-bottom: 10px;
}
</style>