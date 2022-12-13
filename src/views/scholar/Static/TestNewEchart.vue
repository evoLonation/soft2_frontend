<template>
  <div id="charts-contianer" class="charts-container" v-if="show"/>
</template>

<script>
// 引入echarts核心模块，核心模块提供了echarts使用必须要的接口
import * as echarts from 'echarts';
import {paperScholarAxios} from "@/axios";

export default {
  name: "TestNewEchart",
  data() {
    return {
      show: true,
    };
  },
  mounted() {
    this.init();
  },
  props: {
    "scholarId": String,
  },
  methods: {
    /**
     * 初始化charts
     */
    init() {

      //基于准备好的dom，初始化chart实例
      let myChart = echarts.init(document.getElementById('charts-contianer'));
      let tmp = [];
      let years = [];
      let achievements = [];
      let references = [];
      paperScholarAxios.post('scholar/barchart/', {
        "scholar_id": this.scholarId,
      }).then((res) => {
        tmp = res.data.statistic;
        console.log(res.data.statistic);
        tmp.sort((a, b) => a.year < b.year ? 1 : a.year > b.year ? -1 : 0);
        for(let i = 0; i < tmp.length; i++) {
          years.push(tmp[i].year);
          achievements.push(tmp[i].achievements);
          references.push(tmp[i].references);
          if((i < i - 1) && (tmp[i].year - tmp[i + 1].year > 1)) {
            for(let j = tmp[i].year - 1; j >= tmp[i + 1].year + 1; j--) {
              years.push(j);
              achievements.push(0);
              references.push(0);
            }
          }
        }
        if(years.length === 0) {
          this.show = false;
        }

        let xAxisData = years.reverse();
        let data1 = achievements.reverse();
        let data2 = references.reverse();
        let data1_max = Math.max(...data1);
        let data2_max = Math.max(...data2);

        var option={
          legend: {
            data: ['历年成果数', '历年被引量']
          },
          toolbox: {},
          tooltip: {},
          // color: ['#409EFF', '#67C23A'],
          xAxis: {
            data: xAxisData,
            splitLine: {
              show: false
            }
          },
          dataZoom: [{
            type: 'slider',
            show: true,
            height: 15,
            left: '10%',
            right: '10%',
            bottom: '2%',
            start: 60,
            end: 100,
            zoomLoxk: true,
            xAxisIndex: [0],
            showDataShadow: false,
          }, {
            type: 'inside'
          }],
          yAxis: [
            {
              type: 'value',
              name: "历年成果数",
              position: 'left',
              min: 0,
              max: data1_max,
              splitNumber: 5,
              axisLine: {
                show: true
              },
              axisTick: {
                show: true,
                interval: Math.ceil((data1_max)/5),
              },
              axisLabel: {
                textStyle: {
                  color: "#999"
                },
                formatter: function(v) {
                  return v;
                }
              },
              splitLine: {
                show: false,
                lineStyle: {
                  type: "dashed"
                }
              }
            },
            {
              type: 'value',
              name: "历年被引量",
              position: "right",
              min: 0,
              max: data2_max,
              splitNumber: 5,
              axisLine: {
                show: true
              },
              axisTick: {
                show: true,
                interval: Math.ceil((data2_max)/5),
              },
              axisLabel: {
                textStyle: {
                  color: "#999"
                },
                formatter: function(v) {
                  return v;
                }
              },
              splitLine: {
                show: false,
                lineStyle: {
                  type: "dashed"
                }
              }
            }
          ],
          series: [
            {
              name: '历年成果数',
              type: 'bar',
              data: data1,
              left: 0,
              emphasis: {
                focus: 'series'
              },
              animationDelay: function (idx) {
                return idx * 10;
              }
            },
            {
              name: '历年被引量',
              type: 'bar',
              data: data2,
              left: 0,
              yAxisIndex: 1,
              emphasis: {
                focus: 'series'
              },
              animationDelay: function (idx) {
                return idx * 10 + 100;
              }
            }
          ],
          animationEasing: 'elasticOut',
          animationDelayUpdate: function (idx) {
            return idx * 5;
          }
        };
        myChart.setOption(option);
        window.addEventListener('resize', function () {myChart.resize();});
      })
     }
  },
}

export class ChartView {
}
</script>

<style lang="scss" scoped>
.charts-container {
  min-width: 900px;
  max-width: 900px;
  width: 1000px;
  display: flex;
  padding: 2% 0 2% 0;
  margin: auto 0 auto 50px;
  height: 410px;
  min-height: 410px;
  border-radius: 5px;
  box-shadow: 0 0 14px rgba(0,0,0,0.08),0 0 6px rgba(0,0,0,0.06);
  background-color: white;
}
</style>