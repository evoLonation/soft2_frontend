<template>
  <div id="charts-contianer" class="charts-container" />
</template>

<script>
// 引入echarts核心模块，核心模块提供了echarts使用必须要的接口
import * as echarts from 'echarts/core';
// 引入折线图图表，图表后缀都为Chart
import {LineChart} from 'echarts/charts';
// 引入提示框，标题，直接坐标系组件，组件后缀都为Component
import { TitleComponent, GridComponent} from 'echarts/components';
// 引入legend组件
import { LegendComponent } from  'echarts/components';
// 引入toolBox组件
import { ToolboxComponent } from  'echarts/components';
// 引入toolTip组件
import { TooltipComponent } from 'echarts/components';
// 引入BarChart组件
import { BarChart } from 'echarts/charts';
// 引入Canvas渲染器，注意引入CanvasRenderer或者SVGRenderer是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([CanvasRenderer, LineChart, TitleComponent, GridComponent]);
echarts.use([LegendComponent, ToolboxComponent, TooltipComponent, BarChart]);

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
            num = num * (Math.random() % 5);
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
            num = num * (Math.random() % 5);
          }
        }
        return arr;
      };

      var xAxisData = CalxAxis();
      var data1 = CalData1();
      var data2 = CalData2();

      var option={
        legend: {
          data: ['历年成果数', '历年被引量']
        },
        toolbox: {
          // y: 'bottom',
          feature: {
            magicType: {
              type: ['stack']
            },
            dataView: {},
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false
          }
        },
        yAxis: {},
        series: [
          {
            name: '历年成果数',
            type: 'bar',
            data: data1,
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
     }
  }
}
</script>

<style lang="scss" scoped>
.charts-container {
  width: 80%;
  margin: 100px auto;
  height: 410px;
  // border: 1px solid #f00;
}
</style>