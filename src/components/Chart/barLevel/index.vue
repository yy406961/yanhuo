<template lang="html">
    <div :style="chartStyle" ref="bar"> </div>
</template>

<script>
    import { buildLevelData } from './chartLevel'
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
                let op = buildLevelData(data, this.option.props || {});
                this.EC.setOption(op)
                let me = this;
                this.EC.on('click', function (params) {
                    me.$emit('barToSelect', params.dataIndex)
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
