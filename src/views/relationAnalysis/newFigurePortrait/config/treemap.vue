<template lang="html">
      <div :style="chartStyle" ref="bar" style="z-index:2"></div>
</template>

<script>
import { buildData } from './chartTreeMap'
export default {
    name: 'treemap',
    props: [
        'option',
        'renderData'
    ],
    data () {
        return {
            width: 100,
            height: 100
        }
    },
    computed: {
        chartStyle () {
            return {
                width: this.width,
                height: this.height + 'px'
            }
        }
    },
    watch: {
        'renderData' (newVal) {
            if (newVal && newVal.length) {
                this.loadData(newVal)
            }
        },
        'option': {
            deep: true,
            handler (newval) {
                if (newval.width && newval.height) {
                    this.width = newval.width;
                    this.height = newval.height;
                    this.$nextTick(() => {
                        this.resize()
                    })
                }
            }
        }
    },
    created () {
//        this.width = this.option.width
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
            this.EC.setOption(op)
            let me = this;
            this.EC.on('click', function (params) {
                if (params.componentType === 'series') {
                    me.$emit('treeMapToAppTime', params.data.dataObj)
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
