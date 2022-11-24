<template>
<div class="Paper">
  <div class="tol_select">
    <p
        style="margin-left: 15px; font-size: 19px; margin-top: 27px"
    >
      总计
    </p>
    <p
        style="margin-left: 10px; font-size: 27px; margin-top: 22px"
    >
      {{years.length}}篇
    </p>
    <el-select
        v-model="year"
        class="select_item"
        placeholder="全部年份"
        size="large"
        style="margin-left: auto"
    >
      <el-option
          v-for="item in years"
          :key="item"
          :value="item"
      />
    </el-select>
    <el-select
        v-model="author"
        class="select_item"
        placeholder="全部作者"
        size="large"
    >
      <el-option
          v-for="item in authors"
          :key="item"
          :value="item"
      />
    </el-select>
    <el-select
        v-model="time"
        class="select_item"
        placeholder="按时间排序"
        size="large"
    >
      <el-option
          v-for="item in times"
          :key="item"
          :value="item"
      />
    </el-select>
  </div>
  <div v-if="isShow === true">
    <div v-for="item in 15" :key="item">
      <list
          :type="books.at(0).type"
          :author="books.at(0).author"
          :abstract="books.at(0).abstract"
          :num="books.at(0).num"
          :org="books.at(0).org"
          :paper-name="books.at(0).name"
          style="margin: auto auto 10px auto"
      />
    </div>
  </div>
  <div style="display: flex">
    <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="1000"
        @current-change="change_page"
    />
  </div>
</div>
</template>

<script>
import list from "../../../components/paperShow"

export default {
  name: "PaperList",
  components: {
    list,
  },
  data() {
    return {
      books: [
          {
            type: 0,
            author: "柯南道尔",
            abstract: "这是一篇侦探故事",
            num: 11,
            org: "爱丁堡大学",
            name: "福尔摩斯探案全集",
          }
      ],
      books1: [
        {
          type: 0,
          author: "大仲马",
          abstract: "这是达达尼昂的故事",
          num: 12,
          org: "巴黎圣母院",
          name: "三个火枪手",
        }
      ],
      books2: [
        {
          type: 0,
          author: "柯南道尔",
          abstract: "这是一篇侦探故事",
          num: 11,
          org: "爱丁堡大学",
          name: "福尔摩斯探案全集",
        }
      ],
      years: [
        2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022
      ],
      authors: [
          "第一作者","通讯作者",
      ],
      times: [
        "按时间降序","按时间升序"
      ],
      year: null,
      author: null,
      time: "按时间降序",
      isShow: true,
    }
  },
  methods: {
    change_page() {
      this.isShow = false;
      this.$nextTick(()=> {
        if(this.books === this.books2) {
          this.books = this.books1;
        }
        else {
          this.books = this.books2;
        }
        this.isShow = true;
      })
    }
  }
}
</script>

<style scoped>
.Paper {
  width: 1000px;
  margin: auto auto auto 50px;
  horiz-align: center;
}

.tol_select {
  width: 100%;
  height: 70px;
  display: flex;
}

.select_item {
  width: 150px;
  height: 50px;
  border: none;
  margin: auto 10px auto 20px;
}

.pagination {
  margin: 40px auto 40px auto;
}
</style>