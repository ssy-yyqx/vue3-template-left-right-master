<template>
  <div class="home-container">
    <div class="info-section">欢迎您，admin! 现在时间：{{state.date}}</div>
    <a-row style="margin-top: 20px;" :gutter="16">
      <a-col :span="12">
        <div class="chart-item" id="Chart1"></div>
      </a-col>
      <a-col :span="12">
        <div class="chart-item" id="Chart2"></div>
      </a-col>
    </a-row>
    <a-row style="margin-top: 20px;" :gutter="16">
      <a-col :span="12">
        <div class="chart-item" id="Chart3"></div>
      </a-col>
      <a-col :span="12">
        <div class="chart-item" id="Chart4"></div>
      </a-col>
    </a-row>
    <a-row style="margin-top: 20px;" :gutter="16">
      <a-col :span="24">
        <div class="chart-item chart-item-map" id="Chart5"></div>
      </a-col>
    </a-row>
    <a-row style="margin-top: 20px;" :gutter="16">
      <a-col :span="24">
        <div class="chart-item chart-item-map chart-item-padding10" id="Chart6"></div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { parseTime } from '@/utils/index'
import { initLineChart, initAreaChart, initPieChart, initRoseChart } from './charts'
import { initMap } from './map'
import { initCustomizeChart } from './customizeChart'
export default defineComponent({
  name: 'Home',
  setup () {
    const state = reactive({
      date: parseTime(new Date())
    })
    // 时间
    setInterval(() => {
      state.date = parseTime(new Date())
    }, 1000)
    onMounted(() => {
      // 初始化折线图
      initLineChart('Chart1')
      // 初始化饼图
      initAreaChart('Chart2')
      // 初始饼图
      initPieChart('Chart3')
      // 初始化玫瑰
      initRoseChart('Chart4')
      // 加载地图
      initMap('Chart5')
      // 加载自定义图表
      initCustomizeChart('Chart6')
    })
    return {
      state
    }
  }
})
</script>
<style lang="scss" scoped>
.home-container{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 20px;
  .info-section{
    width: 100%;
    padding: 20px;
    border: 1px solid #dfdfdf;
    border-radius: 4px;
    font-size: 16px;
  }
  .chart-item{
    height: 300px;
    border: 1px solid #dfdfdf;
    border-radius: 4px;
    &-map{
      height: 600px;
    }
    &-padding10{
      padding: 10px;
    }
  }
}
</style>
