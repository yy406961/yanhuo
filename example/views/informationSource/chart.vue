<template lang="html">
      <div>
          <el-row>
              <el-col :span="12">
                  <h2>访问时段分布</h2>
                  <polarBar ref="bar" :option="pBarObj"></polarBar>
              </el-col>
               <el-col :span="12">
                    <h2>手机访问排名</h2>
                   <levelBarComp ref="levelObj" :option="levelObj"></levelBarComp>
               </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                   <h2>饼图</h2>
                   <annularMap ref="pie" :option="pieObj"></annularMap>
              </el-col>
               <el-col :span="12">
                    <h2>折线图</h2>
                    <linesArea ref="line" :option="lineObj"></linesArea>
               </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                   <h2>饼图2</h2>
                   <circularMap ref="pie2" :option="pieObj2"></circularMap>
              </el-col>
               <el-col :span="12">
                   <h2>柱图</h2>
                   <barChart ref="barChart" :option="barObj"></barChart>
               </el-col>
          </el-row>
      </div>
</template>

<script>
import polarBar from 'views/informationSource/charts/polarBar'
import levelBarComp from 'views/informationSource/charts/levelBar'
import linesArea from 'views/informationSource/charts/linesArea'
import annularMap from 'views/informationSource/charts/annularMap'
import circularMap from 'views/informationSource/charts/circularMap'
import barChart from 'views/informationSource/charts/barChart'
import { ajax } from 'common'
export default {
    name: 'ex-is',
    data() {
        return {
            pBarObj: {
                width: 600,
                height: 400
            },
            levelObj: {
                width: 400,
                height: 400
            },
            lineObj: {
                width: 500,
                height: 400
            },
            pieObj: {
                width: 600,
                height: 300
            },
            pieObj2: {
                width: 500,
                height: 400
            },
            barObj: {
                width: 500,
                height: 300
            }
        }
    },
    mounted() {
        this.initPolarBar()
    },
    methods: {
        initPolarBar() {
            ajax.get('/informationSource/selectInforSourceStatOne').then(resp => {
                this.$refs.bar.loadData(resp.barData)
                this.$refs.levelObj.loadData(resp.timeTop10)
                this.$refs.line.loadData(resp.lineData)
                let arr = [
                    { name: '1号网站ABC', value: 60, tipsText: 'xxxxxxxxxx' },
                    { name: '2号网站DEF', value: 20, tipsText: 'dasdasdas' },
                    { name: '3号网站GMN', value: 40, tipsText: 'sdfdsfdsf' },
                    { name: '4号网站OPQ', value: 10, tipsText: 'gdfgdgfdg' },
                    { name: '5号网站XYZ', value: 11, tipsText: 'dfgfdgfdg' }
                ]
                this.$refs.pie.loadData(arr)
                this.$refs.pie2.loadData(arr)
                this.$refs.barChart.loadData(resp.barData)
            })
        }
    },
    components: {
        linesArea,
        polarBar,
        annularMap,
        circularMap,
        levelBarComp,
        barChart
    }
}
</script>

<style lang="css">
</style>
