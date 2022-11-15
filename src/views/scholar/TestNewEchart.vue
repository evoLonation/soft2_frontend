<template>
  <div id="charts-contianer" class="charts-container" />
</template>

<script>
// 引入二charts核心模块，核心模块提供了echarts使用必须要的接口
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

      var xAxisData = [];
      var data1 = [];
      var data2 = [];
      for(var i = 0; i < 100; i++) {
        xAxisData.push('A' + i);
        data1.push((Math.sin(i/5)*(i/5-10)+i/6)*5);
        data2.push((Math.cos(i/5)*(i/5-10)+i/6)*5);
      }
      var option={
        legend: {
          data: ['bar1', 'bar2']
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
            name: 'bar1',
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
            name: 'bar2',
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