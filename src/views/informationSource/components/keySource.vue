<template>
    <div class="ga-showKey">
        <div class="ga-showKey__title">
            <p><span>任务名称：</span>{{propData.taskName}}</p>
            <p><span>起止日期：</span>{{propData.startTime}} —— {{propData.endTime}}</p>
            <p><span>信源个数：</span>{{propData.inforsourceNum }}个</p>
        </div>
        <el-row :gutter="20" v-if="propData.inforsourceNum == 1">
        <!-- <el-row :gutter="20" v-if="false"> -->
            <el-col :span="8">
                <titleCom title="信源访问趋势"></titleCom>
                <linesArea ref="line" :option="lineObj"></linesArea>
            </el-col>
            <el-col :span="8">
                <titleCom title="访问时段分布"></titleCom>
                <polarBar ref="bar" :option="echartsSize[0]"></polarBar>
            </el-col>
            <el-col :span="8">
                <titleCom title="用户访问信源次数Top10"></titleCom>
                <levelBarComp ref="levelObj" :option="echartsSize[0]"></levelBarComp>
            </el-col>
        </el-row>
        <template v-if="propData.inforsourceNum > 1 && propData.inforsourceNum < 6">
        <!-- <template v-if="true"> -->
            <el-row>
                <el-col :span="8">
                    <titleCom title="信源用户访问排行"></titleCom>
                    <levelBarComp ref="sort" :option="sortObj"></levelBarComp>
                </el-col>
                <el-col :span="8">
                    <titleCom title="信源访问趋势" :option="titleOp"></titleCom>
                    <linesArea ref="visitTrend" :option="echartsSize[1]"></linesArea>
                </el-col>
                <el-col :span="8">
                    <titleCom title="用户访问信源次数Top10" :option="titleOp"></titleCom>
                    <levelBarComp ref="visitNum" :option="echartsSize[1]"></levelBarComp>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <titleCom title="信源访问次数"></titleCom>
                    <annularMap ref="pie" :option="pieOpt"></annularMap>
                </el-col>
                <el-col :span="8">
                    <titleCom title="访问时段分布" :option="titleOp"></titleCom>
                    <BarChart ref="visitTime" :option="echartsSize[1]" ></BarChart>
                </el-col>
                <el-col :span="8">
                    <titleCom title="用户访问信源个数Top10"></titleCom>
                    <levelBarComp ref="userNum" :option="echartsSize[1]"></levelBarComp>
                </el-col>
            </el-row>
        </template>
        <template v-if="propData.inforsourceNum > 5">
        <!-- <template v-if="false"> -->
            <el-row>
                <el-col :span="8">
                    <titleCom title="信源用户访问排行"></titleCom>
                    <TableComp
                        :option="myTable"
                        :comSize="tableHeight">
                    </TableComp>
                </el-col>
                <el-col :span="16">
                    <el-row>
                        <el-col :span="12">
                            <titleCom title="信源访问趋势" :option="titleOp"></titleCom>
                            <linesArea ref="visitTrend" :option="echartsSize[2]"></linesArea>
                        </el-col>
                        <el-col :span="12">
                            <titleCom title="用户访问信源次数Top10" :option="titleOp"></titleCom>
                            <levelBarComp ref="visitNum" :option="echartsSize[2]"></levelBarComp>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <titleCom title="访问时段分布" :option="titleOp"></titleCom>
                            <BarChart ref="visitTime" :option="echartsSize[2]" ></BarChart>
                        </el-col>
                        <el-col :span="12">
                            <titleCom title="用户访问信源个数Top10"></titleCom>
                            <levelBarComp ref="userNum" :option="echartsSize[2]"></levelBarComp>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </template>
    </div>
</template>

<script>
import { ajax } from 'common'
import { mapGetters } from 'vuex'
import levelBarComp from '../charts/levelBar' // 柱图
import polarBar from '../charts/polarBar' // 上网时段
import linesArea from '../charts/linesArea'
import annularMap from '../charts/annularMap' // 饼图
import TableComp from 'components/Table'
import BarChart from '../charts/barChart' // 柱图
import titleCom from './titleCom'

// 信源状态 1：单信源  2： 2- 5个信源时候 3： 大于5个时候
const DOMAIN_STATUS = {
    ONE: 1,
    FIVE: 2,
    MORE: 3
}

export default {
    name: 'showKey',
    data() {
        let me = this
        return {
            commonSartTime: '',
            // 信源状态 1：单信源  2： 2- 5个信源时候 3： 大于5个时候
            domainStatus: DOMAIN_STATUS.ONE,
            // 当前级联的父图ref
            cascadeRef: '',

            // 排序方式
            order: 'desc',
            // 排序字段
            sort: 'usernum',
            dialogWidth: '',
            dialogHeight: '',
            lineObj: {
                width: 400,
                height: 300,
                onClick(o) {
                    let { data } = o
                    if (data && data.dataObj) {
                        me.inforsourceDomain = data.dataObj.site
                        me.titleOp.domain = data.dataObj.site
                        me.commonSartTime = data.dataObj.name
                        me.cascadeRef = 'line'
                        me.singleData()
                    }
                }
            },
            sortObj: {
                width: 400,
                height: 300,
                onClick(o) {
                    let { data } = o
                    if (data && data.dataObj) {
                        me.inforsourceDomain = data.dataObj.site
                        me.titleOp.domain = data.dataObj.site
                        me.cascadeRef = 'sort'
                        me.fiveData()
                    }
                }
            },
            pieOpt: {
                width: 400,
                height: 300,
                onClick(o) {
                    let { data } = o
                    if (data && data.dataObj) {
                        me.inforsourceDomain = data.dataObj.site
                        me.titleOp.domain = data.dataObj.site
                        me.cascadeRef = 'pie'
                        me.fiveData()
                    }
                }
            },
            echartsSize: [
                { width: 400, height: 300 },
                { width: 400, height: 300 },
                { width: 400, height: 300 }
            ],
            myTable: {
                listLoading: false,
                stripe: false,
                highlightRow: true,
                // defaultSort: me.defaultSort,
                defaultSort: { prop: 'usernum', order: 'descending' },
                column: [
                    { name: '序号', value: 'ordernum', align: 'center' },
                    { name: '信源名称', value: 'name', align: 'center' },
                    { name: '访问用户数', prop: 'usernum', align: 'center', sortable: true },
                    { name: '访问次数', prop: 'count', align: 'center', sortable: true }
                ],
                data: [],
                pagination: false,
                pageOpt: {
                    currentPage: 1,
                    pageSize: 10,
                    pageSizes: [10, 20, 30, 40, 50],
                    total: 0
                },
                sortChange(e) {
                    let { prop, order } = e
                    let orderStr
                    ['asc', 'desc'].forEach(it => {
                        if (order.startsWith(it)) orderStr = it
                    })
                    me.sort = prop
                    me.order = orderStr

                    if (me.myTable.data.length) {
                        me.tableData()
                    }
                },
                rowClick: function(row) {
                    me.changeTable(row)
                }
            },

            titleOp: {
                domain: ''
            },

            inforsourceDomain: '' // 域名
        }
    },
    props: ['propData', 'taskId'],
    created() {
        this.initChartsHeight()
    },
    mounted() {
        this.chartsHeight()
        this.commonSartTime = this.propData.startTime
        this.loadData()
        if (this.propData.inforsourceNum > 5) {
            this.tableData()
        }
        // this.tableData()
    },
    computed: {
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
                height: this.visualHeight * 0.8 - 120
            }
        }
    },
    methods: {
        loadData() {
            if (this.propData.inforsourceNum === 1) {
                this.singleData()
            }
            if (this.propData.inforsourceNum > 1 && this.propData.inforsourceNum < 6) {
                this.fiveData()
            }
            if (this.propData.inforsourceNum > 5) {
                // this.tableData()
                this.tenData()
            }
        },
        // 单个信源
        singleData() {
            this.domainStatus = DOMAIN_STATUS.ONE

            let formData = {
                inforsourceDomain: this.inforsourceDomain,
                insourceNum: this.propData.inforsourceNum,
                statTime: this.commonSartTime,
                taskId: this.taskId
            }
            this.$refs.levelObj.startLoading()
            this.$refs.bar.startLoading()
            if (this.cascadeRef !== 'line') {
                this.$refs.line.startLoading()
            }
            ajax.post('/informationSource/selectInforSourceStatOne', formData).then(resp => {
                let { timeTop10, barData, lineData } = resp
                if (this.cascadeRef === '') {
                    this.$refs.levelObj.loadData(timeTop10) // 上网TOP10
                    this.$refs.bar.loadData(barData) // 上网时段
                    this.$refs.line.loadData(lineData) // 访问趋势
                } else if (this.cascadeRef === 'line') {
                    this.$refs.levelObj.loadData(timeTop10) // 上网TOP10
                    this.$refs.bar.loadData(barData) // 上网时段
                }
                this.$refs.levelObj.endLoading()
                this.$refs.bar.endLoading()
                this.$refs.line.endLoading()
            })
        },
        // 2-5个信源
        fiveData() {
            this.domainStatus = DOMAIN_STATUS.FIVE

            let formData = {
                inforsourceDomain: this.inforsourceDomain,
                insourceNum: this.propData.inforsourceNum,
                taskId: this.taskId
            }
            if (this.cascadeRef !== 'sort') {
                this.$refs.sort.startLoading()
            }
            if (this.cascadeRef !== 'pie') {
                this.$refs.pie.startLoading()
            }
            this.$refs.visitTrend.startLoading()
            this.$refs.visitNum.startLoading()
            this.$refs.visitTime.startLoading()
            this.$refs.userNum.startLoading()
            ajax.post('/informationSource/selectInforSourceStat', formData).then(resp => {
                let leftTopData = resp.sourceLevel.map(item => {
                    // 用户访问量 作为柱图值
                    if (item.usernum) {
                        item.value = item.usernum
                    }
                    return item
                })
                // 初始化加载个数
                let { pieData, lineData, barData, timeTop10, visitTop10 } = resp
                // 初始化加载个数
                console.log('aaa', this.cascadeRef)
                if (this.cascadeRef === '') {
                    this.$refs.sort.loadData(leftTopData)
                    this.$refs.pie.loadData(pieData)
                    this.$refs.visitTrend.loadData(lineData)
                    this.$refs.visitNum.loadData(timeTop10)
                    this.$refs.visitTime.loadData(barData)
                    this.$refs.userNum.loadData(visitTop10)
                }
                if (this.cascadeRef === 'sort') {
                    this.$refs.visitTrend.loadData(lineData)
                    this.$refs.visitNum.loadData(timeTop10)
                    this.$refs.visitTime.loadData(barData)
                } else if (this.cascadeRef === 'pie') {
                    this.$refs.visitTrend.loadData(lineData)
                    this.$refs.visitNum.loadData(timeTop10)
                    this.$refs.visitTime.loadData(barData)
                }
                this.$refs.sort.endLoading()
                this.$refs.pie.endLoading()
                this.$refs.visitTrend.endLoading()
                this.$refs.visitNum.endLoading()
                this.$refs.visitTime.endLoading()
                this.$refs.userNum.endLoading()
            })
        },
        // 6-10个信源
        tenData() {
            this.domainStatus = DOMAIN_STATUS.MORE

            let formData = {
                inforsourceDomain: this.inforsourceDomain,
                insourceNum: this.propData.inforsourceNum,
                taskId: this.taskId
            }
            this.$refs.visitTrend.startLoading()
            this.$refs.visitNum.startLoading()
            this.$refs.visitTime.startLoading()
            this.$refs.userNum.startLoading()
            ajax.post('/informationSource/selectInforSourceStat', formData).then(resp => {
                let { lineData, timeTop10, barData, visitTop10 } = resp
                if (this.cascadeRef === '') {
                    this.$refs.visitTrend.loadData(lineData)
                    this.$refs.visitNum.loadData(timeTop10)
                    this.$refs.visitTime.loadData(barData)
                    this.$refs.userNum.loadData(visitTop10)
                } else if (this.cascadeRef === 'table') {
                    this.$refs.visitTrend.loadData(lineData)
                    this.$refs.visitNum.loadData(timeTop10)
                    this.$refs.visitTime.loadData(barData)
                }
                this.$refs.visitTrend.endLoading()
                this.$refs.visitNum.endLoading()
                this.$refs.visitTime.endLoading()
                this.$refs.userNum.endLoading()
            })
        },
        // 6-10个信源左侧表格/informationSource/selectSortList
        tableData() {
            let formObj = {
                insourceNum: this.propData.inforsourceNum,
                taskId: this.taskId,
                order: this.order,
                sort: this.sort
            }
            ajax.post('/informationSource/selectSortList', formObj).then(resp => {
                this.myTable.listLoading = true
                let { sourceLevel } = resp
                this.myTable.data = sourceLevel
                this.myTable.listLoading = false
            })
        },
        // 6-10个时表格点击回调
        changeTable(row) {
            this.cascadeRef = 'table'
            this.inforsourceDomain = row.site
            this.titleOp.domain = row.site
            this.loadData()
        },
        // 初始高度
        initChartsHeight() {
            this.dialogWidth = $(window).width() * 0.9
            // // 弹框高度
            let dialogHeight = $(window).height() * 0.85 - 25
            // 高度
            let oneHeigth = $(window).height() * 0.85 - 110 - 28 * 2
            let twoHeight = dialogHeight / 2 - 28 * 2 - 53
            // // 三等列宽度
            let threeWidth = this.dialogWidth / 3 - 50
            this.lineObj.height = oneHeigth
            this.lineObj.width = threeWidth
            this.sortObj.height = twoHeight
            this.sortObj.width = threeWidth
            this.pieOpt.height = twoHeight
            this.pieOpt.width = threeWidth
            this.echartsSize.map((item, index) => {
                item.width = threeWidth
                if (index === 0) {
                    item.height = oneHeigth
                } else {
                    item.height = twoHeight
                }
            })
        },
        // 改变宽高
        chartsHeight() {
            this.dialogWidth = $(window).width() * 0.9
            // 弹框高度
            let dialogHeight = $(window).height() * 0.85 - 25
            // 两行时高度
            let twoHeight = dialogHeight / 2 - 28 * 2 - 53
            // 三等列宽度
            let threeWidth = this.dialogWidth / 3 - 50
            // 页面图表宽度
            let sizeObj = {
                width: threeWidth,
                height: twoHeight
            }
            if (this.propData.inforsourceNum === 1) {
                let oneHeigth = $(window).height() * 0.85 - 110 - 28 * 2
                let oneOp = {
                    width: threeWidth,
                    height: oneHeigth
                }
                this.$refs.levelObj.resizeComp(oneOp)
                this.$refs.line.resizeComp(oneOp)
                this.$refs.bar.resizeComp(oneOp)
            }
            if (this.propData.inforsourceNum > 1) {
                this.$refs.visitTrend.resizeComp(sizeObj)
                this.$refs.visitNum.resizeComp(sizeObj)
                this.$refs.visitTime.resizeComp(sizeObj)
                this.$refs.userNum.resizeComp(sizeObj)
                // 2-5个时加载
                if (this.propData.inforsourceNum < 6) {
                    this.$refs.pie.resizeComp(sizeObj)
                    this.$refs.sort.resizeComp(sizeObj)
                }
            }
        }
    },
    components: {
        TableComp,
        levelBarComp,
        polarBar,
        BarChart,
        linesArea,
        annularMap,
        titleCom
    }
}
</script>
<style>
@component-namespace ga {
    @b showKey {
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
