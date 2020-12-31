<template lang="html">
    <div style="width: 100%;height:100%;position: relative">
        <el-row style="position: relative">
            <el-col :span="10">
               <tableComp :option="tableOpt"
                          :comSize="tableHeight"
                          @handleCurrentPageChange="handleCurrentPageChange"
                          @handleSizePageChange = "handleSizePageChange">
               </tableComp>
            </el-col>
            <el-col :span="14">
                  <graphComp :options="opts" :size="sizeStyle" @graphClick="clickHandler" ref="chart"></graphComp>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import gis from './activeAreaMap.vue'
    import tableComp from 'components/Table'
    import graphComp from './graph'
    import { getContactInfo } from 'api/relationAnalysis/figurePortrait/index'
    export default {
        name: 'figurePortrait',
        data () {
            return {
                chartWidth: '',
                mapData: {},
                formObj: {
                    page: 1,
                    rows: 20,
                    msisdn: ''
                },
                opts: {
                    // 重点人信息列表 (号码 , 通联人数, 类型)
                    phoneData: [],
                    // 重点人关系列表
                    relData: []
                },
                sizeStyle: {},
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    highlightRow: true,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '手机号码', value: 'msisdn', width: 110, align: 'center' },
                        { name: '手机归属地', value: 'homecode', align: 'center', tooltip: true },
                        { name: '运营商', value: 'spcode', width: 70, align: 'center' },
                        { name: '通联次数', value: 'count', width: 70, align: 'center' },
                        { name: '电话', value: 'callcount', width: 70, align: 'center' },
                        { name: '短信', value: 'msgcount', width: 70, align: 'center' }
                    ],
                    rowClick: function (row) {
                        console.log(row)
                    },
                    data: [],
                    pagination: true,
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [20, 30, 40, 50, 60],
                        pageSize: 20
                    }
                },
                tableHeight: {
                    height: ''
                }
            }
        },
        created () {
            this.tableHeight.height = this.option.height - 90
        },
        mounted () {
            this.chartWidth = $('.ga-communication__chart').width()
            $('.ga-activeArea__gis').css({
                'height': this.option.height - 90 + 'px'
            })
        },
        props: [
            'option',
            'renderData'
        ],
        watch: {
            'renderData' () {
                this.sizeStyle = {
                    width: '100%',
                    height: this.option.height - 10 + 'px'
                }
                this.getContactInfoFun();
            }
        },
        methods: {
            async getContactInfoFun () {
                this.formObj.msisdn = this.renderData.msisdn
                if (!this.formObj.msisdn) return
                this.tableOpt.data = [];
                this.tableOpt.listLoading = true;
                let resp = await getContactInfo(this.formObj);
                let { rows } = resp
                let center = this.renderData.msisdn
                if (rows) {
                    this.tableOpt.data = rows
                    this.tableOpt.pageOpt.total = resp.total;
                    if (this.tableOpt.data.length) {
                        this.tableOpt.listLoading = false;
                    }
                    let me = this;
                    if (resp.rows.length === 0) {
                        setTimeout(() => {
                            me.tableOpt.listLoading = false;
                        }, 200)
                    }
                    let point = [];
                    let msg = 0;
                    let call = 0;
                    let mms = 0;
                    rows.forEach((item) => {
                        point.push({
                            'name': item.msisdn + '',
                            'call': item.callcount,
                            'msg': item.msgcount + '',
                            'mms': item.mulmsg + '',
                            'image': 'image://./static/phone.png',
                            'type': 1
                        })
                        call += item.callcount - 0;
                        msg += item.msgcount - 0;
                        mms += item.mulmsg - 0;
                    });
                    point.push({
                        'name': this.renderData.msisdn + '',
                        'call': call,
                        'msg': msg + '',
                        'mms': mms + '',
                        'image': 'circle',
                        'type': 1
                    })
                    this.opts.phoneData = point;
                    let line = [];
                    rows.forEach((item) => {
                        line.push({
                            'name': center + '',
                            'targetName': item.msisdn + '',
                            'count': 1
                        })
                    });
                    this.opts.relData = line;
                }
            },
            clickHandler (arg) {
                if (arg) {
                    this.$refs.chart.setNodeFocus(arg.name)
                }
            },
            handleCurrentPageChange (val) {
                this.formObj.page = val;
                this.getContactInfoFun();
            },
            handleSizePageChange (val) {
                this.formObj.rows = val;
                this.formObj.page = 1;
                this.tableOpt.pageOpt.currentPage = 1;
                this.getContactInfoFun();
            }
        },
        computed: {
        },
        components: {
            gis,
            graphComp,
            tableComp
        }
    }
</script>

<style lang="postcss">
    @component-namespace ga {
        @b communication {
            @e chart {
                /*position: absolute;*/
                width: 100%;
            }
        }
    }
</style>
