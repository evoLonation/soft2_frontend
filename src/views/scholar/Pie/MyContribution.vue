<template>
  <div style="width: 350px; margin-left: 60px">
    <el-carousel
        trigger="click"
        height="490px"
        style="border-radius: 10px;
    box-shadow: 0 0 4px rgba(0,0,0,0.40),0 0 6px rgba(0,0,0,0.15);"
        :autoplay="false"
    >
      <el-carousel-item v-for="(item,index) in Areas" :key="item.name">
        <div class="contribution">
          <div class="contri_title">
            <p>{{ item.name }}</p>
          </div>
          <div class="contri_title">
            <p>领域贡献</p>
          </div>
          <div :id="`pies-container${index+1}`" class="pies-container"/>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>

import * as echarts from "echarts/core";

export default {
  name: "MyContribution",
  data() {
    return {
      Areas:[
        {name:"领域1", contri: 16},
        {name:"领域2", contri: 15},
        {name:"领域3", contri: 14},
        {name:"领域4", contri: 13},
      ],
    }
  },
  mounted() {
    for(var i = 0; i < this.Areas.length; i++) {
      this.init(i + 1);
    }
  },
  methods: {
    /**
     * 初始化charts
     */
    init(index) {
      //基于准备好的dom，初始化chart实例
      let myPie = echarts.init(document.getElementById(`pies-container${index}`));

      var value1 = this.Areas.at(index - 1).contri;

      // data变量，用来记录相关情况
      var data = [
        { value: value1, name: '本学者' },
        { value: 100 - value1, name: '其他' },
      ];

      var option = {
        tooltip: {
          trigger: 'item',
          show: true,
          formatter: function (params) {
            return params.data.name + "&nbsp;&nbsp;" + params.data.value + "%";
          }
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        color: ['#409EFF', '#b1b3b8'],
        series: [
          {
            width: '100%',
            type: 'pie',
            radius:['80px', '100px'],
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
    },
  }
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