<template>
  <div class="relations">
    <div class="rel_title">
      <p>合作学者：</p>
      <NetView/>
    </div>
    <div class="rel_content" v-for="(item, index) in coopList" :key="item">
      <div class="rel_item">
        <el-avatar
            :src="urls.at(index)"
            :size="50"
            shape="circle"
            :fit="'cover'"
            style="margin: auto 15px auto 32px"
        />
        <div class="name-insti">
          <div class="name">
            <p>{{item.name}}</p>
          </div>
          <div class="insti">
            <p>{{item.institution}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NetView from "../RelationNet/RelationNet"

export default {
  name: "MyRelations",
  components: {
    NetView,
  },
  data() {
    return {
      coopList: [
        {name: "学者1", institution: "学者单位1"},
        {name: "学者2", institution: "学者单位2"},
        {name: "学者3", institution: "学者单位3"},
        {name: "学者4", institution: "学者单位4"},
      ],
      urls:[
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      ]
    }
  }
}
</script>

<style scoped>
.relations {
  width: 350px;
  height: 470px;
  margin-right: 40px;
  border-radius: 10px;
  box-shadow: 0 0 4px rgba(0,0,0,0.40),0 0 6px rgba(0,0,0,0.15);
  display: inline-block;
}

.rel_title {
  width: 100%;
  height: 10%;
  line-height: 18px;
  padding-top: 20px;
  padding-left: 40px;
  font-size: 18px;
  font-weight: 600;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  display: flex;
}

.rel_item {
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  height: 70px;
  display: flex;
  border-top: 1px dashed #a0cfff;
  border-bottom: 1px dashed #a0cfff;
}

.rel_item:hover {
  background: radial-gradient(white,  #ecf5ff);
}

.name-insti {
  width: 70%;
  height: 100%;
  display: inline-block;
}

.name {
  width: 100%;
  height: 25%;
  font-size: 15px;
  color: rgba(0,0,0,0.70);
  line-height: 15px;
}

.insti {
  width: 100%;
  height: 30%;
  font-size: 13px;
  color: rgba(0,0,0,0.40);
  line-height: 13px;
}
</style>