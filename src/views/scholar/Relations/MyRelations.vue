<template>
  <div class="relations" v-show="rel">
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
            <p>{{ item.name }}</p>
          </div>
          <div class="insti">
            <p>{{ item.institution[0] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NetView from "../RelationNet/RelationNet"
import {paperScholarAxios} from "@/axios";

export default {
  name: "MyRelations",
  components: {
    NetView,
  },
  props: {
    "scholarId": String,
  },
  data() {
    return {
      coopList: [],
      urls:[],
      rel: true,
    }
  },
  methods: {
    getCoopList() {
      paperScholarAxios.post("scholar/coop-list/", {
        "scholar_id": this.scholarId,
      }).then((res) => {
        if(res.data.coop_list !== null) {
          this.coopList = res.data.coop_list;
        }
        for(var i = 0; i < this.coopList.length; i++) {
          let url;
          paperScholarAxios.post('scholar/get-avatar', {
            "scholar_id": this.coopList[i].id,
          }).then((res) => {
            url = res.data.url;
            this.urls.push(url);
          })
        }
        console.log(this.coopList);
        console.log(this.urls);
      })
    }
  },
  created() {
    this.getCoopList();
    if(this.coopList.length === 0) {
      // eslint-disable-next-line no-unused-vars
      this.rel = false;
    }
  }
}
</script>

<style scoped>
.relations {
  min-width: 350px;
  max-width: 350px;
  width: 350px;
  height: 470px;
  margin-left: 30px;
  border-radius: 5px;
  box-shadow: 0 0 14px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
  display: inline-block;
  background-color: white;
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