<template>
    <div style="display: flex;margin:auto;">
      <el-autocomplete
          v-model="input"
          class=""
          style="width: 600px;margin-right: 12px;margin-left: auto"
          placeholder="输入你要检索的..."
          :fetch-suggestions="querySearch"
      >
        <template #suffix>
          <el-icon size="large" @click="normalSearch" ><search /></el-icon>
        </template>
        <template #prepend>
          <el-select v-model="selectedType" key="" placeholder="Select" size="large" style="width: 120px">
            <el-option
                v-for="item in searchTypes"
                :key="item.id"
                :label="item.type"
            />
          </el-select>
        </template>
      </el-autocomplete>
      <div style="display: flex;flex-direction: column;margin-right: auto;">
        <div class="other-option" id="option1" @click="toScholarSearch">检索学者</div>
        <div class="other-option" id="option2" @click="toAdvancedSearch">高级检索</div>
      </div>
    </div>



</template>

<script>
import {ref} from "vue";
import searchType from "@/assets/searchType.json"
import {useRouter} from "vue-router"

export default {
  name: "SearchBox",
  setup(){
    const router = useRouter();
    const input = ref("");
    const searchTypes = ref(searchType.searchType);
    const selectedType = ref(searchTypes.value[0].type);
    const content = ref("");

    const typeIdMap = {};
    for (let type of searchTypes.value) {
      typeIdMap[type.type] = type.id;
    }
    const findTypeId = (type) => {
      return typeIdMap[type];
    }

    const querySearch = (queryString , cb) => {
      const results = [{value : '人工智能'}, {value: '深度学习'}, {value: '自动生成'},]
      cb(results)
    }

    const getPageParam = (type, content) => {
      return {
        "content" : content,
        "searchType" : findTypeId(type),
      }
    }

    const normalSearch = () => {
      router.push({name : "search", params : getPageParam(selectedType, content)});
    }
    const toScholarSearch = () =>{
      router.push({name : "scholarSearch"});
    }
    const toAdvancedSearch = () => {
      router.push({name : "search"});
    }


    return{
      input,
      querySearch,
      searchTypes,
      selectedType,
      content,
      normalSearch,
      toScholarSearch,
      toAdvancedSearch,

    }
  }
}
</script>

<style scoped>
.other-option{
  font-size: 13px;
  color: #667292;
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