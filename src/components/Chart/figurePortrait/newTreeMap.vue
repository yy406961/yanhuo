<!--人物画像 APP使用 APP使用占比-->
<template>
    <div :style="chartStyle" ref="stacked"></div>
</template>

<script>
    let activateBar = -1;
    const buildData = (data) => {
        let categories = []
        let datas = []
        if (data) {
            data.forEach((item, index) => {
                categories.push(item.name || '')
                if (index === (activateBar - 1)) {
                    datas.push({
                        name: item.name,
                        value: item.value || 0,
                        info: item.info,
                        dataObj: item,
                        itemStyle: {
                            color: 'rgba(0,164,255,0.5)',
                            borderColor: 'rgba(0,164,255,1)',
                            borderWidth: 1
                        }
                    })
                } else {
                    datas.push({
                        name: item.name,
                        value: item.value || 0,
                        info: item.info,
                        dataObj: item,
                        itemStyle: {
                            color: 'rgba(0,164,255,0.5)'
                        }
                    })
                }
            })
        }
        let seriesObj = {
            type: 'treemap',
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: 'rgba(162,238,255,1)' // color of value
                    },
                    textAlign: 'center',
                    formatter: '{b} {c}%'
                }
            },
            itemStyle: {
//                gapWidth: 3,
                borderWidth: 3,
                borderColor: 'transparent'
            },
            left: 'left',
            width: '100%',
            height: '100%',
            roam: false,
            nodeClick: false,
            breadcrumb: {
                show: false
            },
            animation: false
//            animationDuration: 500
        }
        seriesObj.data = datas;
        let option = {
            series: [seriesObj],
            color: ['rgba(0,164,255,0.5)'],
            tooltip: {
                show: true,
//                formatter: '{b0}: {c0}%'
                formatter: function (params) {
                    if (params.name === '') {
                        return ''
                    } else {
                        return `${params.name} ${params.value}%`
                    }
                }
            },
            animation: false,
            animationDuration: 500
        }
        return option
    }
    export default {
        name: 'stacked',
        data () {
            return {
                width: 100,
                height: 100
            }
        },
        props: [
            'option',
            'renderData'
        ],
        computed: {
            chartStyle () {
                return {
                    width: this.width,
                    height: this.height
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
            this.width = this.option.width
            this.height = this.option.height
        },
        mounted () {
            this.initChart()
            this.loadData(this.renderData)
        },
        methods: {
            initChart () {
                this.EC = echarts.init(this.$el)
            },
            loadData (data) {
                let me = this;
                let op = buildData(data || [], this.option.props);
                if (this.EC) {
                    this.clear()
                }
                this.EC.setOption(op)
                this.EC.on('click', function (params) {
                    me.clear()
                    activateBar = params.dataIndex
                    let opNew = buildData(data || [], me.option.props);
                    me.EC.setOption(opNew)
                    activateBar = null
                    if (params.componentType === 'series') {
                        me.$emit('treeMapToAppTime', params.data.dataObj)
                    }
                })
            },
            resize () {
                this.EC.resize()
            },
            clear () {
                this.EC.clear()
            },
            resizeComp (newVal) {
                if (newVal) {
                    this.width = newVal.width
                    this.height = newVal.height
                    this.$nextTick(() => {
                        this.EC.resize()
                    })
                }
            }
        }
    }
</script>

<style>
</style>
