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
      {{ paper_num }}篇
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
    <div v-for="item in papers" :key="item">
      <list
          :type="0"
          :author="item.authors"
          :abstract="item.abstract"
          :num="item.n_citation"
          :org="item.publisher"
          :paper-name="item.title"
          :paper-id="item.id"
          style="margin: auto auto 10px auto"
      />
    </div>
  </div>
  <div style="display: flex">
    <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :page-count="page_count"
        @current-change="change_page"
    />
  </div>
</div>
</template>

<script>
import list from "../../../components/paperShow"
import {paperScholarAxios} from "@/axios";

export default {
  name: "PaperList",
  components: {
    list,
  },
  props: {
    "scholarId": String,
  },
  data() {
    return {
      papers: [],
      years: [],
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
      current_page: 1,
      paper_num: 0,
      page_count: 1,
    }
  },
  watch: {
    async year() {
      this.isShow = false;
      this.current_page = 1;
      this.page_count = 1;
      await this.getPaperList(this.year, this.author, this.time);
    },
    async author() {
      this.isShow = false;
      this.current_page = 1;
      this.page_count = 1;
      await this.getPaperList(this.year, this.author, this.time);
    },
    async time() {
      this.isShow = false;
      this.current_page = 1;
      this.page_count = 1;
      await this.getPaperList(this.year, this.author, this.time);
    },
  },
  methods: {
    getPaperList(year, author, time, init) {
      let axios_year, is_first, time_order;
      if(year === null) {
        axios_year = 0;
      }
      else {
        axios_year = year;
      }
      if(author === null) {
        is_first = 0;
      }
      else if(author === "第一作者") {
        is_first = 1;
      }
      else {
        is_first = 2;
      }
      time_order = time !== "按时间降序";
      console.log((this.current_page - 1) * 15);
      console.log(this.current_page * 15 - 1);
      paperScholarAxios.post('scholar/papers/', {
        "scholar_id": this.scholarId,
        "is_first": is_first,
        "year": axios_year,
        "time_order": time_order,
        "start": (this.current_page - 1) * 15,
        "end": this.current_page * 15 - 1,
      }).then((res) => {
        this.paper_num = res.data.paper_num;
        let start_year = res.data.start_year;
        let end_year = res.data.end_year;
        this.papers = res.data.papers;
        this.years = [];
        if(start_year !== 3000) {
          for (let i = start_year; i <= end_year; i++) {
            this.years.push(i);
          }
        }
        if(init === 0) {
          this.$nextTick(()=> {
            this.isShow = true;
          })
        }
        else if(init === 1) {
          if(this.paper_num % 15 === 0) {
            this.page_count = this.paper_num / 15;
          }
          else {
            this.page_count = Math.ceil(this.paper_num / 15);
          }
        }
        else {
          this.$nextTick(()=> {
            if(this.paper_num % 15 === 0) {
              this.page_count = this.paper_num / 15;
            }
            else {
              this.page_count = Math.ceil(this.paper_num / 15);
            }
            this.isShow = true;
          })
        }
      })
    },
    async change_page(val) {
      this.isShow = false;
      this.current_page = val;
      await this.getPaperList(this.year, this.author, this.time, 0);
    }
  },
  async created() {
    await this.getPaperList(this.year, this.author, this.time, 1);
  }
}
</script>

<style lang="scss">
.Paper {
  width: 900px;
  min-width: 900px;
  max-width: 900px;
  margin: auto 0 auto 50px;
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