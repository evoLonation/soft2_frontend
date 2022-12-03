<template>
  <div class="basic-info">
    <div
      class="avatar-border"
    >
      <el-avatar
          :src="url"
          :size="120"
          shape="circle"
          :fit="'cover'"
          style="margin: auto"
      />
    </div>
    <div class="info">
      <div class="name-pos">
        <span class="name">学者姓名</span>
        <span class="pos">学者职称</span>
        <div class="icon">
          <el-icon
              style="height: 100%; width: 100%"
          >
            <Share style="color: white;"/>
          </el-icon>
        </div>
        <div class="ID">
          <div class="ID_title">
            <p>学者ID号</p>
          </div>
          <div class="ID_content">
            <p>scholarID</p>
          </div>
        </div>
      </div>
      <div class="indexes">
        <div class="index">
          <div class="index_title">
            <span>被引频次</span>
          </div>
          <div class="index_num">
            <span>ref_num</span>
          </div>
        </div>
        <div class="index">
          <div class="index_title">
            <span>成果数</span>
          </div>
          <div class="index_num">
            <span>ach_num</span>
          </div>
        </div>
        <div class="index_last">
          <div class="index_title">
            <span>H指数</span>
          </div>
          <div class="index_num">
            <span>h_index</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Share from "@element-plus/icons-vue"

export default {
  name: "BasicInfo",
  components: {
    Share
  },
  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    }
  },
}
</script>

<style scoped>
.basic-info {
  background-color: white;
  min-width: 900px;
  max-width: 900px;
  width: 1000px;
  height: 200px;
  display: flex;
  margin: auto 0 auto 50px;
  align-items: center;
  font-family: '微软雅黑',sans-serif;
  border-radius: 5px;
  box-shadow: 0 0 14px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
}

.avatar-border {
  width: 130px;
  height: 130px;
  border-radius: 65px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 4px rgba(0,0,0,0.40),0 0 6px rgba(0,0,0,0.15);
  cursor: pointer;
  margin: auto auto auto 50px;
}

.avatar-border:hover {
  box-shadow: 0 0 4px rgba(0,0,0,0.50),0 0 6px rgba(0,0,0,0.20);
}

.info {
  width: 80%;
  height: 100%;
}

.name-pos {
  height: 40px;
  width: 87%;
  margin: 45px auto auto 40px;
  vertical-align: bottom;
  display: flex;
}

.name {
  font-size: 27px;
  color: #333333;
  cursor: pointer;
}

.pos {
  font-size: 14px;
  cursor: pointer;
  margin-top: 15px;
  margin-left: 20px;
  color: #73767a;
}

.icon {
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  background-color: #0066FF;
  margin-top: 5px;
  margin-left: 30px;
  cursor: pointer;
  align-items: center;
}

.icon:hover {
  box-shadow: 0 0 4px rgba(0,0,0,0.40),0 0 6px rgba(0,0,0,0.15);
}

.indexes {
  width: 80%;
  height: 60%;
  margin: 0 auto auto 20px;
}

.index {
  margin-top: 20px;
  width: 19%;
  height: 50%;
  border-right: 1px dashed rgba(0,0,0,0.40);
  text-align: center;
  display: inline-block;
}

.index_title {
  width: 100%;
  height: 25%;
  font-size: 14px;
  line-height: 15px;
  color: rgba(0,0,0,0.40);
  margin-top: 5px;
}

.index_num {
  width: 100%;
  height: 25%;
  line-height: 15px;
  font-size: 14px;
  margin-top: 15px;
  color: rgba(0,0,0,0.40);
}

.index_last {
  margin-top: 20px;
  width: 19%;
  height: 50%;
  /*border-right: 1px dashed rgba(0,0,0,0.40);*/
  text-align: center;
  display: inline-block;
}

.ID {
  width: 30%;
  height: 100%;
  border: 1px dashed #a0cfff;
  margin: auto 0 auto auto;
  border-radius: 20px;
  display: flex;
}

.ID:hover {
  box-shadow: 0 0 1px rgba(0,0,0,0.20),0 0 6px rgba(0,0,0,0.06);
}

.ID_title {
  width: 40%;
  height: 100%;
  line-height: 14px;
  font-size: 14px;
  border-right: 1px dashed #a0cfff;
  text-align: center;
  color: #73767a;
}

.ID_content {
  width: 60%;
  height: 100%;
  line-height: 14px;
  font-size: 14px;
  text-align: center;
  color: #73767a;
}
</style>