<template>
  <div class="MvPaper">
    <el-input v-model="id" size="large" class="id-input" placeholder="请输入文献ID" prefix-icon="Document" clearable/>
    <el-input v-model="owner_id" size="large" class="id-input" style="margin-left: 220px" placeholder="请输入学者ID" prefix-icon="User" clearable/>
    <div style="display: flex">
      <div class="border">
        <el-empty class="no_data" v-if="tab_show === false"/>
        <div style="height: 500px; width: 750px" v-loading="loading" v-if="tab_show === true">
          <el-table border :data="documents" style="width: 100%;" height="120">
            <el-table-column align="center" fixed prop="name" label="文件名称" width="250"/>
            <el-table-column align="center" label="作者列表">
              <el-table-column align="center" v-for="item in max_authors" :key="item" :label="'作者'+item" width="100">
                <template v-slot="scope">
                  <span>{{scope.row.authors[item-1]}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <el-table border :data="writers" style="width: 100%" height="380">
            <el-table-column fixed align="center" prop="name" label="作者名称" width="250"/>
            <el-table-column align="center" prop="institution" label="作者机构" width="300"/>
            <el-table-column align="center" prop="position" label="作者职称" width="200"/>
            <el-table-column align="center" prop="mailbox" label="作者邮箱" width="300"/>
            <el-table-column align="center" fixed="right" label="操作" width="100">
              <template #default="scope">
                <el-button :type="buttonType(scope.$index)" icon="Check" @click="chose(scope.$index)" circle/>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div style="width: 450px; height: 500px; margin-top: 30px">
        <div class="border" style="width: 450px; height: 320px;">
          <el-empty class="no_data" v-if="owner_show === false" style="margin-top: 10px"/>
          <el-table border :data="scholars" style="width: 100%;" height="320" v-loading="loading1" v-if="owner_show === true" :show-header="false" :row-style="{height: '80px'}" :cell-style="cellStyle">
            <el-table-column align="center" prop="label" label="相关标签" width="150" />
            <el-table-column align="center" prop="value" label="相关内容" width="300"/>
          </el-table>
        </div>
        <el-button style="margin-top: 75px; margin-left: 50%" type="primary">转让文章</el-button>
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
      tab_show: false,
      owner_show: false,
      loading: true,
      loading1: true,
      documents: [
        {
          name: "人工智能理论研究",
          authors: ["姜星如","赵正阳","龙亿舟","刘禹宏","高亦天","王逸风","蔡徐坤"],
        },
      ],
      writers: [
        {
          name: "姜星如",
          institution: "北京航空航天大学",
          position: "学生",
          mailbox: "boxuan10258@qq.com",
          chose: false,
        },
        {
          name: "赵正阳",
          institution: "北京航空航天大学",
          position: "学生",
          mailbox: "boxuan10258@qq.com",
          chose: false,
        },
        {
          name: "龙亿舟",
          institution: "北京航空航天大学",
          position: "学生",
          mailbox: "boxuan10258@qq.com",
          chose: false,
        },
        {
          name: "刘禹宏",
          institution: "北京航空航天大学",
          position: "学生",
          mailbox: "boxuan10258@qq.com",
          chose: false,
        },
        {
          name: "高亦天",
          institution: "北京航空航天大学",
          position: "学生",
          mailbox: "boxuan10258@qq.com",
          chose: false,
        },
        {
          name: "王逸风",
          institution: "北京航空航天大学",
          position: "学生",
          mailbox: "boxuan10258@qq.com",
          chose: false,
        },
        {
          name: "蔡徐坤",
          institution: "ikun俱乐部",
          position: "个人练习生",
          mailbox: "ikun@xiaoheizi.com",
          chose: false,
        }
      ],
      scholars: [
        {
          label: "学者姓名",
          value: "姜星如",
        },
        {
          label: "学者机构",
          value: "北京航空航天大学",
        },
        {
          label: "学者职称",
          value: "学生",
        },
        {
          label: "学者邮箱",
          value: "boxuan10258@qq.com",
        }
      ],
      max_authors: -1,
    }
  },
  watch: {
    id (newData) {
      for(let i = 0; i < this.documents.length; i++) {
        if(this.max_authors < this.documents.at(i).authors.length) {
          this.max_authors = this.documents.at(i).authors.length;
        }
      }
      // 检查newData的格式
      this.$nextTick(() => {
        this.loading = false;
        // newData是更新后的数据
        this.tab_show = !(newData === null || newData === "");
      })
    },
    owner_id (newData) {
      this.$nextTick(() => {
        this.loading1 = false;
        // newData是更新后的数据
        this.owner_show = !(newData === null || newData === "");
      })
    },
  },
  methods: {
    buttonType(val) {
      if(this.writers[val].chose === false) {
        return "default";
      }
      else {
        return "success";
      }
    },
    chose(index) {
      console.log(this.writers[index]);
      this.writers[index].chose = !this.writers[index].chose;
    },
    // eslint-disable-next-line no-unused-vars
    cellStyle({row, column, rowIndex, columnIndex}) {
      if(columnIndex === 0) {
        return {
          background: '#f5f7fa',
          color: '#909399',
          'font-weight': '700',
        }
      }
    }
  }
}
</script>

<style scoped>
.MvPaper {
  min-width: 1350px;
  max-width: 1350px;
  min-height: 700px;
  margin: 50px auto auto auto;
  border-radius: 5px;
  box-shadow: 0 0 14px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
  background-color: white;
}

.id-input {
  width: 400px;
  margin: 50px 0 auto 250px;
}

.border {
  width: 750px;
  height: 500px;
  border: 2px solid rgba(0,0,0,0.15);
  border-radius: 5px;
  margin: 40px 0 auto 47px;
}

.no_data {
  margin-top: 14%;
}
</style>