<template lang="html">
      <div>
        <el-row>
            <el-col :span='12'>
                <Bar :option="barOp" :renderData="barData"></Bar>
            </el-col>
            <el-col :span='12'></el-col>
        </el-row>
      </div>
</template>

<script>
import Bar from 'components/Chart/bar'
export default {
    name: 'home',
    data () {
        return {
            barOp: {
                width: '500',
                height: '350',
                props: {
                    xName: '开机次数',
                    yName: '地域'
                }
            },
            barData: []
        }
    },
    components: {
        Bar
    },
    mounted () {
        this.barData = [
         { name: '银川市政府', value: '10' },
         { name: '万达广场', value: '2' },
         { name: '火车站', value: '3' },
         { name: '汽车站', value: '4' }
        ]
    }
}
</script>

<style lang="css">
</style>
