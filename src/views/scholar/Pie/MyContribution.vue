<template>
  <div style="width: 350px; margin-left: 30px; min-width: 350px; max-width: 350px;">
    <div class="contribution">
      <div class="contri_title">
        <p>领域贡献</p>
      </div>
      <div id="pies-container" class="pies-container" v-if="contri"/>
      <el-empty v-if="contri === false"/>
    </div>
  </div>
</template>

<script>

import * as echarts from "echarts/core";
import {paperScholarAxios} from "@/axios";

export default {
  name: "MyContribution",
  data() {
    return {
      // 是否显示相关信息
      contri: true,
    }
  },
  props: {
    scholarId: String,
  },
  async mounted() {
    this.init();
  },
  methods: {
    /**
     * 初始化charts
     */
    init() {
      //基于准备好的dom，初始化chart实例
      let myPie = echarts.init(document.getElementById(`pies-container`));
      paperScholarAxios.post('scholar/basic/', {
        "scholar_id": this.scholarId,
      }).then((res) => {
        let tags = res.data.tags;

        if(tags.length === 0) {
          this.contri = false;
          return;
        }

        // data变量，用来记录相关情况
        let data = [];
        let l = tags.length <= 5 ? tags.length: 5;
        for(let i = 0; i < l; i++) {
          data.push({value: tags[i].w, name: tags[i].t});
        }

        var option = {
          tooltip: {
            trigger: 'item',
            show: true,
            formatter: function (params) {
              return params.data.name + "&nbsp;&nbsp;" + params.data.value;
            }
          },
          series: [
            {
              width: '100%',
              type: 'pie',
              radius:['70px', '100px'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 2,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: data,
            }
          ]
        };
        myPie.setOption(option);
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.pies-container {
  width: 250px;
  margin: auto;
  height: 350px;
  display: flex;
  // border: 1px solid #f00;
}
</style>

<style scoped>
.contribution {
  width: 350px;
  height: 450px;
  margin-right: 40px;
  display: inline-block;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 14px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
}

.contri_title {
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
</style>