<template>
  <div id="charts-contianer" class="charts-container" />
</template>

<script>
// 引入echarts核心模块，核心模块提供了echarts使用必须要的接口
import * as echarts from 'echarts';

export default {
  name: "TestNewEchart",
  data() {
    return {

    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * 初始化charts
     */
    init() {

      //基于准备好的dom，初始化chart实例
      let myChart = echarts.init(document.getElementById('charts-contianer'));

      let CalxAxis = function () {
        let arr = [];
        for(let index = 2003; index <= 2022; index ++) {
          arr.push(index);
        }
        return arr;
      };

      let CalData1 = function () {
        let arr = [];
        var num = 1;
        for(let index = 1; index <= 20; index++) {
          arr.push(num);
          num = num + 5;
          if(num > 20) {
            num = num % 2;
            num = Math.round(num * (Math.random() % 5));
          }
        }
        return arr;
      };

      let CalData2 = function() {
        let arr = [];
        var num = 3;
        for(let index = 1; index <= 20; index++) {
          arr.push(num);
          num = num + 7;
          if(num > 100) {
            num = num % 4;
            num = Math.round(num * (Math.random() % 5));
          }
        }
        return arr;
      };

      let CalMax = function (arr) {
        return arr.max;
      }

      var xAxisData = CalxAxis();
      var data1 = CalData1();
      var data2 = CalData2();
      var data1_max = CalMax(data1);
      var data2_max = CalMax(data2);

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
              interval: (data2_max-0)/5,
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
              interval: (data2_max-0)/5,
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
     }
  }
}

export class ChartView {
}
</script>

<style lang="scss" scoped>
.charts-container {
  min-width: 1000px;
  max-width: 1000px;
  width: 1000px;
  display: flex;
  padding: 2% 0 2% 0;
  margin: auto 0 auto 50px;
  height: 410px;
  min-height: 410px;
  border-radius: 10px;
  box-shadow: 0 0 4px rgba(0,0,0,0.40),0 0 6px rgba(0,0,0,0.15);
}
</style>