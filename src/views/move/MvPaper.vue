<template>
  <div class="MvPaper">
    <el-input v-model="id" size="large" class="id-input" placeholder="请输入文献ID" prefix-icon="Document" clearable/>
    <el-input v-model="owner_id" size="large" class="id-input" style="margin-left: 220px" placeholder="请输入学者ID" prefix-icon="User" clearable/>
    <div style="display: flex">
      <div class="border">
        <el-empty class="no_data" v-if="tab_show === false"/>
        <div style="height: 500px; width: 750px" v-loading="loading" v-if="tab_show === true">
          <el-table border :data="documents" style="width: 100%;" height="170">
            <el-table-column align="center" fixed prop="name" label="文件名称" width="250"/>
            <el-table-column align="center" label="作者列表">
              <el-table-column align="center" v-for="item in max_authors" :key="item" :label="'作者'+item">
                <template v-slot="scope">
                  <span>{{scope.row.authors[item-1]}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <el-table border :data="writers" style="width: 100%" height="320">
            <el-table-column fixed align="center" prop="name" label="作者名称" width="250"/>
            <el-table-column align="center" prop="institution" label="作者机构" width="300"/>
            <el-table-column align="center" prop="position" label="作者职称" width="200"/>
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
        <el-button @click="transfer" style="margin-top: 75px; margin-left: 50%" type="primary">转让文章</el-button>
      </div>
    </div>
  </div>
</template>

<script>

import {paperScholarAxios} from "@/axios";

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
      documents: [],
      writers: [],
      scholars: [],
      max_authors: -1,
      index: -1,
    }
  },
  watch: {
    id (newData) {
      let module = new RegExp("^OA:W[0-9]{10}$");
      // newData是更新后的数据
      this.tab_show = !(newData === null || newData === "");
      this.$nextTick(() => {
        this.loading = true;
        this.index = -1;
      })
      if(newData === null) {
        return;
      }
      if(newData.match(module)) {
        paperScholarAxios.post('paper/', {
          "id": newData,
        }).then(async (res) => {
          let name = res.data.title;
          let authors = res.data.authors;
          this.documents = [];
          let my_authors = [];
          this.writers = [];
          for (let i = 0; i < authors.length; i++) {
            my_authors.push(authors[i].name);
            await paperScholarAxios.post('scholar/basic/', {
              "scholar_id": authors[i].id,
            }).then((res) => {
              let name = res.data.name;
              let pos = res.data.pos;
              let institution = res.data.institution[0];
              this.writers.push({
                name: name,
                institution: institution,
                position: pos,
                id: authors[i].id,
                chose: false,
              })
            })
          }
          this.documents.push({name: name, authors: my_authors});
          for (let i = 0; i < this.documents.length; i++) {
            if (this.max_authors < this.documents.at(i).authors.length) {
              this.max_authors = this.documents.at(i).authors.length;
            }
          }
          // 检查newData的格式
          this.$nextTick(() => {
            this.loading = false;
          })
        })
      }
    },
    owner_id (newData) {
      let module = new RegExp("^OA:A[0-9]{10}$");
      // newData是更新后的数据
      this.owner_show = !(newData === null || newData === "");
      if(newData === null) {
        return;
      }
      if(newData.match(module)) {
        paperScholarAxios.post('scholar/basic/', {
          "scholar_id": newData,
        }).then((res) => {
          let name = res.data.name;
          let pos = res.data.pos;
          let institution = res.data.institution[0];
          this.scholars = [];
          this.scholars.push({label: "学者姓名", value: name});
          this.scholars.push({label: "学者职称", value: pos});
          this.scholars.push({label: "学者机构", value: institution});
          this.$nextTick(() => {
            this.loading1 = false;
          })
        })
      }
      else {
        this.$nextTick(() => {
          this.loading1 = true;
        })
      }
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
      if(this.writers[index].chose === true) {
        this.writers[index].chose = !this.writers[index].chose;
        this.index = -1;
      }
      else {
        if(this.index === -1) {
          this.writers[index].chose = !this.writers[index].chose;
          this.index = index;
        }
        else {
          this.$message.warning("不能选择超过1人!");
        }
      }
    },
    transfer() {
      if(this.index === -1) {
        this.$message.warning("尚未选择原作者!");
        return;
      }
      console.log(this.id);
      console.log(this.writers[this.index].id);
      console.log(this.owner_id);
      paperScholarAxios.post('admin/move-paper/', {
        "paper_id" : this.id,
        "owner_id" : this.writers[this.index].id,
        "target_id": this.owner_id,
      }).then(() => {
        this.$message.success("转让成功!");
        location.reload();
      })
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