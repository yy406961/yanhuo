<template>
    <div class="ga-showKey">
        <div class="ga-showKey__title">
            <p><span>任务名称：</span>{{propData.taskName}}</p>
            <p><span>起止日期：</span>{{propData.startTime}} —— {{propData.endTime}}</p>
            <!-- <p><span>用户：</span>{{propData.personNum }}个</p> -->
        </div>
        <el-row>
            <el-col :span="8">
                <titleCom title="用户访问信源排行"></titleCom>
                <TableComp
                    :option="myTable"
                    :comSize="tableHeight">
                </TableComp>
            </el-col>
            <el-col :span="7">
                <titleCom :title="personTableTitle"></titleCom>
                <TableComp
                    :option="personTable"
                    :comSize="tableHeight">
                </TableComp>
            </el-col>
            <el-col :span="9">
                <el-row>
                    <el-col :span="24" class="echartsWidth">
                        <titleCom title="用户访问趋势" :option="titleOp"></titleCom>
                        <linesArea ref="visitTrend" :option="echartsSize[2]"></linesArea>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <titleCom title="访问时段分布" :option="titleOp"></titleCom>
                        <BarChart ref="visitTime" :option="echartsSize[2]" ></BarChart>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { ajax } from 'common'
import { phoneNumChange } from 'utils/index'
import { mapGetters } from 'vuex'
import linesArea from '../../informationSource/charts/linesArea'
import TableComp from 'components/Table'
import BarChart from '../../informationSource/charts/barChart' // 柱图
import titleCom from '../../informationSource/components/titleCom'

export default {
    name: 'showKey',
    data() {
        let me = this
        return {
            // 请求参数相关
            msisdn: '',
            commonSartTime: '',
            // 区别接口赋值
            status: true,
            // 排序方式
            order: 'desc',
            // 排序字段
            sort: 'usernum',
            dialogHeight: '',
            personTableTitle: '访问信源排行',
            echartsSize: [
                { width: 400, height: 300 },
                { width: 400, height: 300 },
                { width: 400, height: 300 }
            ],
            myTable: {
                listLoading: false,
                stripe: false,
                highlightRow: true,
                column: [
                    { name: '序号', value: 'index', width: 50, align: 'center' },
                    { name: '目标号码', value: 'msisdn', width: 150, align: 'center' },
                    { name: '访问信源个数', value: 'visitTotal', width: 90, align: 'center' },
                    { name: '访问信源次数', value: 'visitNum', align: 'center' }
                ],
                data: [],
                pagination: false,
                rowClick: function(row) {
                    let phone = me.isPhoneJM ? phoneNumChange(row.msisdn) : row.msisdn
                    me.status = false
                    me.personTableTitle = '访问信源排行 (' + phone + ')'
                    me.msisdn = row.msisdn
                    me.changeTable(row)
                }
            },
            personTable: {
                listLoading: false,
                stripe: false,
                highlightRow: true,
                column: [
                    { name: '序号', value: 'index', width: 60, align: 'center' },
                    // { name: '信源名称', value: 'siteName', width: 60, align: 'center', tooltip: true },
                    { name: '信源域名', value: 'siteDomain', align: 'center', width: 180, tooltip: true },
                    { name: '访问信源次数', value: 'visitNum', align: 'center' }
                ],
                data: [],
                pagination: false
            },
            titleOp: {
                domain: ''
            }
        }
    },
    props: ['propData', 'taskId'],
    created() {
        this.initChartsHeight()
    },
    mounted() {
        this.chartsHeight()
        this.commonSartTime = this.propData.startTime
        this.tenData()
    },
    computed: {
        ...mapGetters({
            isPhoneJM: 'global/isPhoneJM'
        }),
        defaultSort() {
            const orderArr = ['ascending', 'descending']
            let orderStr
            if (this.sort === 'asc') {
                orderStr = orderArr[0]
            } else {
                orderStr = orderArr[1]
            }
            return { prop: this.sort, order: orderStr }
        },
        ...mapGetters({
            visualHeight: 'global/visualHeight'
        }),
        tableHeight() {
            return {
                height: this.visualHeight * 0.8 - 70
            }
        }
    },
    methods: {
        tenData() {
            let formData = {
                msisdn: this.msisdn,
                taskId: this.propData.taskId
            }
            if (this.status) {
                this.myTable.listLoading = true
            }
            this.personTable.data = []
            this.personTable.listLoading = true
            this.$refs.visitTrend.startLoading()
            this.$refs.visitTime.startLoading()
            ajax.post('keyPersonInforSource/selectKeyPersonStat', formData).then(resp => {
                let { sourceLevel, tableData, lineData, barData } = resp
                if (this.status) {
                    this.myTable.data = sourceLevel
                }
                this.personTable.data = tableData
                this.$refs.visitTrend.loadData(lineData)
                this.$refs.visitTime.loadData(barData)
                this.myTable.listLoading = false
                this.personTable.listLoading = false
                this.$refs.visitTrend.endLoading()
                this.$refs.visitTime.endLoading()
            })
        },
        // 6-10个时表格点击回调
        changeTable(row) {
            this.titleOp.domain = this.isPhoneJM ? phoneNumChange(row.msisdn) : row.msisdn
            this.tenData()
        },
        // 初始高度
        initChartsHeight() {
            // 弹框高度
            let dialogHeight = $(window).height() * 0.85 - 25
            // 高度
            let twoHeight = dialogHeight / 2 - 28 * 2 - 53
            // // 三等列宽度
            this.echartsSize.map((item) => {
                item.width = $('.echartsWidth').width()
                item.height = twoHeight
            })
        },
        // 改变宽高
        chartsHeight() {
            // 弹框高度
            let dialogHeight = $(window).height() * 0.85 - 25
            // 两行时高度
            let twoHeight = dialogHeight / 2 - 28 * 2 - 53
            // 三等列宽度
            // 页面图表宽度
            let sizeObj = {
                width: $('.echartsWidth').width(),
                height: twoHeight
            }
            this.$refs.visitTrend.resizeComp(sizeObj)
            this.$refs.visitTime.resizeComp(sizeObj)
        }
    },
    components: {
        TableComp,
        BarChart,
        linesArea,
        titleCom
    }
}
</script>
<style>
@component-namespace ga {
    @b showKey {
        .el-col{
            padding-right:8px;
        }
        @e title {
            margin-bottom: 10px;
            span {
                color: #fff;
                /* margin-right: 20px; */
            }
            p {
                font-size: 14px;
                margin-right: 30px;
                display: inline-block;
            }
        }

        @e information {
            color: #fff;
            font-size: 16px;
            font-weight: bold;
        }
    }
}
</style>
