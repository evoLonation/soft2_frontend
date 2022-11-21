<template>
  <div id="pies-container" class="pies-container"/>
</template>

<script>
// 引入echarts核心模块，核心模块提供了echarts使用必须要的接口
import * as echarts from 'echarts/core';
// 引入并图图表，图表后缀都为Chart
import { PieChart } from 'echarts/charts';
// 引入Canvas渲染器，注意引入CanvasRenderer或者SVGRenderer是必须的
import { CanvasRenderer } from "echarts/renderers";
// 引入toolTip组件
import { TooltipComponent } from "echarts/components";
// 引入legend组件
import { LegendComponent } from "echarts/components";

echarts.use([PieChart, CanvasRenderer, TooltipComponent, LegendComponent]);

export default {
  name: "TestNewContribute",
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
      let myPie = echarts.init(document.getElementById('pies-container'));

      // data变量，用来记录相关情况
      var data = [
        { value: 10.6, name: '本学者' },
        { value: 90.4, name: '其他' },
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
    }
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