<template>
  <div class="MvPaper">
    <el-input v-model="id" size="large" class="id-input" placeholder="请输入文献ID" prefix-icon="Document" clearable/>
    <el-select v-model="author" class="author-select" size="large" placeholder="请选择作者类型">
      <el-option v-for="item in authors" :key="item" :value="item.value"/>
    </el-select>
    <el-input v-model="owner_id" size="large" class="id-input" style="margin-left: 230px" placeholder="请输入学者ID" prefix-icon="User" clearable/>
    <div style="display: flex">
      <div class="border">
        <el-empty class="no_data" v-if="tab_show === false"/>
        <el-table border :data="documents" style="width: 100%;" height="500" v-loading="loading" v-if="tab_show === true">
          <el-table-column fixed prop="name" label="文件名称" width="200"/>
          <el-table-column align="center" label="作者列表">
            <el-table-column align="center" v-for="item in max_authors" :key="item" :label="'作者'+item" width="100">
              <template v-slot="scope">
                <span>{{scope.row.authors[item-1]}}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button :type="buttonType(scope.$index)" icon="Check" @click="chose(scope.$index)" circle/>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="width: 450px; height: 500px; margin-right: 90px">
        <div class="border" style="width: 450px; height: 430px;">
          <el-empty class="no_data" v-if="owner_show === false"/>
          <el-table border :data="scholars" style="width: 100%;" height="430" v-loading="loading1" v-if="owner_show === true">
            <el-table-column fixed align="center" prop="name" label="学者名称" width="150"/>
            <el-table-column prop="institution" align="center" label="学者机构" width="200"/>
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button :type="buttonType1(scope.$index)" icon="Check" @click="choseScholar(scope.$index)" circle/>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-button style="margin-top: 35px; margin-left: 50%" type="primary">转让文章</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "MvPaper",
  data() {
    return {
      id: null,
      author: null,
      owner_id: null,
      authors: [
        {value: "全部记录"},
        {value: "第一作者"},
        {value: "通讯作者"},
      ],
      tab_show: false,
      owner_show: false,
      loading: true,
      loading1: true,
      documents: [
        {
          name: "人工智能理论研究",
          authors: ["姜星如","赵正阳","龙亿舟","刘禹宏","高亦天","王逸风"],
          chose: false,
        },
        {
          name: "人工智能理论研究___实践性规律拓展研究",
          authors: ["姜星如","赵正阳"],
          chose: false,
        },
        {
          name: "人工智能理论研究___实践性规律拓展研究",
          authors: ["姜星如","赵正阳"],
          chose: false,
        },
        {
          name: "人工智能理论研究___实践性规律拓展研究",
          authors: ["姜星如","赵正阳"],
          chose: false,
        },
        {
          name: "人工智能理论研究___实践性规律拓展研究",
          authors: ["姜星如","赵正阳"],
          chose: false,
        },
        {
          name: "人工智能理论研究___实践性规律拓展研究",
          authors: ["姜星如","赵正阳"],
          chose: false,
        },
        {
          name: "人工智能理论研究___实践性规律拓展研究",
          authors: ["姜星如","赵正阳"],
          chose: false,
        },
        {
          name: "人工智能理论研究___实践性规律拓展研究",
          authors: ["姜星如","赵正阳"],
          chose: false,
        },
      ],
      scholars: [
        {
          name: "赵正阳",
          institution: "北京航空航天大学",
          chose: false,
        },
        {
          name: "赵正阳",
          institution: "北京航空航天大学",
          chose: false,
        },
        {
          name: "赵正阳",
          institution: "北京航空航天大学",
          chose: false,
        }
      ],
      max_authors: -1,
    }
  },
  watch: {
    id (newData) {
      // newData是更新后的数据
      this.tab_show = !(newData === null || newData === "");
      for(let i = 0; i < this.documents.length; i++) {
        if(this.max_authors < this.documents.at(i).authors.length) {
          this.max_authors = this.documents.at(i).authors.length;
        }
      }
      // 检查newData的格式
      this.$nextTick(() => {
        this.loading = false;
      })
    },
    owner_id (newData) {
      // newData是更新后的数据
      this.owner_show = !(newData === null || newData === "");
      this.$nextTick(() => {
        this.loading1 = false;
      })
    },
  },
  methods: {
    buttonType(val) {
      if(this.documents[val].chose === false) {
        return "default";
      }
      else {
        return "success";
      }
    },
    buttonType1(val) {
      if(this.scholars[val].chose === false) {
        return "default";
      }
      else {
        return "success";
      }
    },
    chose(index) {
      console.log(this.documents[index]);
      this.documents[index].chose = !this.documents[index].chose;
    },
    choseScholar(index) {
      console.log(this.scholars[index]);
      this.scholars[index].chose = !this.scholars[index].chose;
    },
  }
}
</script>

<style scoped>
.MvPaper {
  min-width: 1500px;
  max-width: 1500px;
  min-height: 700px;
  margin: 50px auto auto 105px;
  border-radius: 10px;
  box-shadow: 0 0 4px rgba(0,0,0,0.40),0 0 6px rgba(0,0,0,0.15);;
}

.id-input {
  width: 300px;
  margin: 50px 0 auto 100px;
}

.author-select {
  width: 270px;
  margin: 50px 0 auto 180px;
}

.border {
  width: 850px;
  height: 500px;
  border: 2px solid rgba(0,0,0,0.15);
  border-radius: 5px;
  margin: 40px auto auto 45px;
}

.no_data {
  margin-top: 14%;
}
</style>