<template>
<div class="Paper">
  <div v-for="item in 20" :key="item">
    <list
        :type="books.at(0).type"
        :author="books.at(0).author"
        :abstract="books.at(0).abstract"
        :num="books.at(0).num"
        :org="books.at(0).org"
        :paper-name="books.at(0).name"
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
      ]
    }
  }
}
</script>

<style scoped>
.Paper {
  width: 1000px;
  margin: auto auto auto 50px;
}
</style>