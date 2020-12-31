<template>
    <div class="ga-all">
        <p class="ga-all__title" v-if="renderData">{{names}}({{msisdn}})上网详情</p>
        <p class="ga-all__title" v-else>上网详情</p>
        <el-radio v-model="radio" label="1">昨天</el-radio>
        <el-radio v-model="radio" label="2">近一周</el-radio>
        <el-radio v-model="radio" label="3">近一月</el-radio>
        <el-radio v-model="radio" label="4">按月统计</el-radio>
        <el-select v-model="value" placeholder="请选择"
        :disabled="radio !== '4'">
            <el-option
                  v-for="item in selectArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
            </el-option>
        </el-select>
        <el-radio v-model="radio" label="5">全部</el-radio>
        <el-row>
            <el-col :span="12">
                <frameCom>
                    <p class="ga-all__smallT">敏感网站</p>
                    <tableComp :option="table1" :comSize="tableHeight1"></tableComp>
                </frameCom>
            </el-col>
            <el-col :span="12">
                <frameCom>
                    <p class="ga-all__smallT">上网次数</p>
                    <div class="bars" ref="bar" :style="barStyle"></div>
                </frameCom>
            </el-col>
        </el-row>
        <el-row style="margin-top: 5px;">
            <el-col :span="12">
                <frameCom>
                    <p class="ga-all__smallT">其他网站</p>
                    <tableComp :option="table2" :comSize="tableHeight2"></tableComp>
                </frameCom>
            </el-col>
            <el-col :span="12">
                <frameCom>
                    <p class="ga-all__smallT">上网时段分布</p>
                    <transverse :option="option" :renderBar="renderBar"></transverse>
                </frameCom>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import formComp from 'components/Form'
    import tableComp from 'components/Table'
    import frameCom from 'components/monitor/frame'
    import transverse from './compo/transverse'
    import { internetData } from 'api/relationAnalysis/igurePortrait/stability'
    import { mapGetters } from 'vuex'
    export default {
        props: ['renderData'],
        data () {
            return {
                // 人物名称，手机号
                names: '',
                msisdn: '',
                // 柱图数据相关
                option: 'ss',
                options: 'ss',
                renderBar: 'ss',
                EC: '',
                barDataAll: [
                    { name: '直接访问', value: 320, type: 3 },
                    { name: '直接访问', value: 332, type: 4 },
                    { name: '直接访问', value: 301, type: 5 },
                    { name: '直接访问', value: 334, type: 8 },
                    { name: '直接访问', value: 390, type: 12 },
                    { name: '直接访问', value: 330, type: 13 },
                    { name: '直接访问', value: 320, type: 20 },
                    { name: '邮件营销', value: 120, type: 1 },
                    { name: '邮件营销', value: 132, type: 2 },
                    { name: '邮件营销', value: 101, type: 4 },
                    { name: '邮件营销', value: 134, type: 15 },
                    { name: '邮件营销', value: 90, type: 18 },
                    { name: '邮件营销', value: 230, type: 21 },
                    { name: '邮件营销', value: 210, type: 23 },
                    { name: '联盟广告', value: 220, type: 2 },
                    { name: '联盟广告', value: 182, type: 4 },
                    { name: '联盟广告', value: 191, type: 6 },
                    { name: '联盟广告', value: 234, type: 13 },
                    { name: '联盟广告', value: 290, type: 24 },
                    { name: '联盟广告', value: 330, type: 11 },
                    { name: '联盟广告', value: 410, type: 23 },
                    { name: '搜索引擎', value: 862, type: 14 },
                    { name: '搜索引擎', value: 1018, type: 23 },
                    { name: '搜索引擎', value: 964, type: 1 },
                    { name: '搜索引擎', value: 1026, type: 6 },
                    { name: '搜索引擎', value: 1679, type: 23 },
                    { name: '搜索引擎', value: 1600, type: 21 },
                    { name: '搜索引擎', value: 1570, type: 24 }
                ],
                barData: [],
                yAxisData: [],
                seriesAll: [],
                // 选择框相关
                radio: '1',
                value: '',
                selectArr: [
                    { value: 1, label: '1月' },
                    { value: 2, label: '2月' },
                    { value: 3, label: '3月' },
                    { value: 4, label: '4月' },
                    { value: 5, label: '5月' },
                    { value: 6, label: '6月' }
                ],
                // 表格
                table1: {
                    listLoading: false,
                    column: [
                        { name: '序号', value: 'index', width: 60 },
                        { name: '敏感网站', value: 'urls', width: 120 },
                        { name: '使用次数', value: 'count', width: 100 },
                        { name: '第一次使用时间', value: 'startTime', width: 160 },
                        { name: '最后一次使用时间', value: 'lastTime', width: 160 }
                    ],
                    data: []
                },
                table2: {
                    listLoading: false,
                    column: [
                        { name: '序号', value: 'index', width: 60 },
                        { name: '敏感网站', value: 'urls', width: 120 },
                        { name: '使用次数', value: 'count', width: 100 },
                        { name: '第一次使用时间', value: 'startTime', width: 160 },
                        { name: '最后一次使用时间', value: 'lastTime', width: 160 }
                    ],
                    data: []
                }
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            }),
            tableHeight1 () {
                return {
                    height: (this.vsHeight - 145) / 2 - 25
                }
            },
            tableHeight2 () {
                return {
                    height: (this.vsHeight - 145) / 2 - 25
                }
            },
            barStyle () {
                return {
                    height: (this.vsHeight - 145) / 2 - 35 + 'px'
                }
            }
        },
        watch: {
            'radio' () {
                if (this.radio === '1') {
                    this.internetDataFun()
                } else if (this.radio === '2') {
                    this.internetDataFun()
                } else if (this.radio === '3') {
                    this.internetDataFun()
                } else if (this.radio === '4') {
                    // 要获取下拉框的值
                    this.internetDataFun()
                } else if (this.radio === '5') {
                    this.internetDataFun()
                }
            },
            'renderData' () {
                if (this.renderData.name && this.renderData.msisdn) {
                    this.names = this.renderData.name;
                    this.msisdn = this.renderData.msisdn;
                    // 右下角的点
                    this.internetDataFun()
                    this.option = this.barDataAll;
                }
            }
        },
        mounted () {
            this.EC = echarts.init(this.$refs.bar);
        },
        methods: {
            // 请求各种数据
            async internetDataFun () {
                this.table1.listLoading = true;
                this.table2.listLoading = true;
                this.table1.data = [];
                this.table2.data = [];
                let resp = await internetData();
                if (resp) {
                    this.table1.data = resp.rows.data1;
                    this.table2.data = resp.rows.data2;
                    this.table1.listLoading = false;
                    this.table2.listLoading = false;
                    this.$nextTick(() => {
                        this.barData = resp.rows.barArr;
                        this.handleRan(this.barData);
                        this.draw();
                    })
                } else {
                    this.table1.listLoading = false;
                    this.table2.listLoading = false;
                }
            },
            // 模拟数据处理函数
            handleRan (arr) {
                this.seriesAll = [];
                this.yAxisData = [];
                arr.forEach(item => {
                    this.seriesAll.push(item.value);
                    this.yAxisData.push(item.name);
                })
            },
            draw () {
                let option = {
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
                        right: '70px',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        name: '次数',
                        nameLocation: 'end',
                        axisLine: {
                            lineStyle: {
                                color: '#DDB926'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        // 取消显示坐标刻度线
                        axisTick: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: '#DDB926'
                            }
                        },
                        // 取消显示坐标刻度线
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        data: this.yAxisData
                    },
                    dataZoom: [
                        {
                            type: 'slider',
                            orient: 'vertical',
                            height: '70%',
                            width: 20,
                            start: 0,
                            end: 1,
                            handleSize: '80%',
                            zoomLock: true,
                            handleStyle: {
                                color: '#fff',
                                shadowBlur: 3,
                                shadowColor: 'rgba(0, 0, 0, 0.6)',
                                shadowOffsetX: 2,
                                shadowOffsetY: 2
                            },
                            top: 23,
                            right: '0%',
                            textStyle: {
                                color: '#fff'
                            },
                            backgroundColor: '#DDB926'
                        }
                    ],
                    series: [
                        {
                            type: 'bar',
                            // barMaxWidth: 12,
                            barWidth: 8,
                            barCategoryGap: 20,
                            data: this.seriesAll,
                            itemStyle: {
                                normal: {
                                    color: '#DDB926'
                                }
                            },
                            z: 3,
                            zlevel: 3
                        }
                    ]
                }
                this.EC.setOption(option, { notMerge: true });
            }
        },
        components: {
            formComp,
            frameCom,
            tableComp,
            transverse
        }
    }
</script>

<style scoped>
    .bars {
        width: 600px;
    }
    @component-namespace ga {
        @b all {
            width: 100%;
            height: 100%;
            & .yq-form {
                padding: 0;
            }
            @e title {
                width: 100%;
                height: 20px;
                margin: 0 0 5px 0;
                font-size: 17px;
                line-height: 20px;
                color: #9af5f6;
            }
            @e smallT {
                width: 97%;
                height: 20px;
                font-size: 14px;
                line-height: 20px;
                color: #9af5f6;
                margin-left: 3%;
            }
        }
    }
</style>
