<template lang="html">
      <div :style="chartStyle" ref="bar" style="z-index:2"> </div>
</template>

<script>
import { buildData } from './barChartUtil'
export default {
    name: 'bar',
    props: [
        'option',
        'renderData'
    ],
    data () {
        return {
            width: 500,
            height: 400
        }
    },
    computed: {
        chartStyle () {
            return {
                width: this.width + 'px',
                height: this.height + 'px'
            }
        }
    },
    watch: {
        'renderData' (newVal) {
            if (newVal && newVal.length) {
                this.loadData(newVal)
            }
        }
    },
    created () {
        this.width = this.option.width
        this.height = this.option.height
    },
    mounted () {
        this.initChart()
    },
    methods: {
        initChart () {
            this.EC = echarts.init(this.$el)
        },
        loadData (data) {
            let op = buildData(data, this.option.props || {});
            this.EC.setOption(op);
            let me = this;
            this.EC.on('click', function (params) {
                let x = event.clientX;
                let y = event.clientY;
                if (params.componentType === 'series') {
                    me.$emit('barToAppShow', true, x, y, params.data.dataObj)
                }
            })
        },
        resize () {
            this.EC.resize()
        }
    }
}
</script>

<style lang="css">
</style>
