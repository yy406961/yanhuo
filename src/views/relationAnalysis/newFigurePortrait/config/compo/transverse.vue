<template>
    <div :style="boxStyle" ref="bars" style="margin: 1px auto"></div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'transverse',
        props: ['option', 'renderBar'],
        data () {
            return {
                // 堆叠类型
                stack: ['one', 'two', 'three'],
                seriesAll: []
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            }),
            boxStyle () {
                return {
                    width: '600px',
                    height: (this.vsHeight - 145) / 2 - 35 + 'px'
                }
            }
        },
        mounted () {
            this.EC = echarts.init(this.$refs.bars);
            this.draw()
        },
        watch: {
            'option' () {
                // 对于所有网站
                this.option.forEach(item => {
                    let obj = {};
                    let items = item.name;
                    obj.name = item.name;
                    obj.data = new Array(24);
                    let num = Math.ceil(Math.random() * 3) - 1;
                    obj.type = 'bar';   // 柱图类型
                    obj.stack = this.stack[num];  // 堆叠类型
                    // 存储每一项对应的值， 并缩减数组
                    for (let i = 0; i < this.option.length; i++) {
                        if (items === this.option[i].name) {
                            obj.data[this.option[i].type - 1] = this.option[i].value;
                            this.option.splice(i, 1)
                            i = i - 1;
                        }
                    }
                    this.seriesAll.push(obj)
                })
                this.draw()
            },
            'renderBar' () {
                let obj = {};
                obj.type = 'bar';
                obj.name = this.renderBar[0].name;
                obj.data = [];
                this.renderBar.forEach(item => {
                    obj.data.push(item.value);
                })
                this.seriesAll.push(obj)
                this.draw();
            }
        },
        methods: {
            draw () {
                let op = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '5px',
                        bottom: '0px',
                        top: '10px',
                        containLabel: true,
                        show: false
                    },
                    xAxis: [
                        {
                            type: 'category',
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#ffffff'
                                }
                            },
                            // 取消显示坐标刻度线
                            axisTick: {
                                show: false
                            },
                            boundaryGap: true,
                            data: [
                                '1', '2', '3', '4', '5', '6', '7', '8',
                                '9', '10', '11', '12', '13', '14', '15', '16',
                                '17', '18', '19', '20', '21', '22', '23', '24'
                            ]
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#ffffff'
                                }
                            },
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            }
                        }
                    ],
                    series: this.seriesAll
                }
                this.EC.setOption(op, true);
            }
        }
    }
</script>

<style scoped>

</style>
