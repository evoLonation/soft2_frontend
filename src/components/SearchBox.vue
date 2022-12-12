<template>
    <div style="display: flex;margin:auto;">
      <el-autocomplete
          v-model="input"
          class=""
          style="width: 600px;margin-right: 12px;margin-left: auto"
          placeholder="输入你要检索的..."
          :fetch-suggestions="autoComplete"
      >
        <template #suffix>
          <el-icon size="large" @click="normalSearch" style="cursor: pointer"><search /></el-icon>
        </template>
        <template #prepend>
          <el-select v-model="selectedTypeId" key="" placeholder="Select" size="large" style="width: 120px">
            <el-option
                v-for="item in searchTypes"
                :key="item.id"
                :label="item.type"
                :value="item.id"
            />
          </el-select>
        </template>
      </el-autocomplete>
      <div style="display: flex;flex-direction: column;margin-right: auto;">
        <div :class="{'other-option-home' : store.isOnTop, 'other-option' : !store.isOnTop}" id="option1" @click="toScholarSearch">检索学者</div>
        <div :class="{'other-option-home' : store.isOnTop, 'other-option' : !store.isOnTop}" id="option2" @click="toAdvancedSearch">高级检索</div>
      </div>
    </div>

</template>

<script>
import {ref} from "vue";
import searchType from "@/assets/searchType.json"
import {useRouter} from "vue-router"
import {navigationStore} from "@/store";
import qs from "qs";
import {paperScholarAxios} from "@/axios";
export default {
  name: "SearchBox",
  setup(){
    const store = navigationStore();
    const router = useRouter();
    const input = ref("");
    const content = ref("");


    const autoComplete = (queryString , cb) => {
      paperScholarAxios.post("/search/auto-complete", {
        "text" : queryString,
        "size" : 5,
      }).then((res) => {
        cb(res.data.auto_completes.map((value) => {return {value : value}}))
      })
      // const results = [{value : '人工智能'}, {value: '深度学习'}, {value: '自动生成'},]
    }
    const searchTypes = searchType.searchType;
    const selectedTypeId = ref(0);
    const normalSearch = () => {
      router.push({name : "PaperSearch", query:{
          searchType: qs.stringify(searchType.searchType[selectedTypeId.value]),
          content: input.value}});  //搜索内容});
    }
    const toScholarSearch = () =>{
      router.push({name : "ScholarSearch"});
    }
    const toAdvancedSearch = () => {
      router.push({name : "Search"});
    }

    return{
      input,
      autoComplete,
      searchTypes,
      selectedTypeId,
      content,
      normalSearch,
      toScholarSearch,
      toAdvancedSearch,
      store,
    }
  }
}
</script>

<style scoped>
.other-option{
  font-size: 13px;
  color: #667292;
}
.other-option-home{
  font-size: 13px;
  color: #ffffff;
}
.other-option-home:hover{
  color: #ffffffaa;
  cursor: pointer;
}

.other-option:hover{
  color: #8692b2;
  cursor: pointer;
}
#option1{
  margin-top: 1px;
  margin-bottom: auto;
}
#option2{
  margin-top: auto;
  margin-bottom: 1px;
}
.search-type{
  width: 150px;
}

</style>