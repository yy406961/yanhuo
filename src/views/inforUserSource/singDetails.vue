<template lang="html">
      <!-- 查看任务弹框 -->
      <div class="ga-singDetails">
          <sysDialog size="large" class="ga-informationSource__dialog"
                   title="微信访问详情"
                   @change="dialogResultChange"
                   @openCallback="openCallBack"
                   :dialogVisible="show"
                   :okFn="okFn"
                   :cancleFn="cancleFn">
            <!-- <p class="textTop">
                <span>用户号码：</span>{{phone}} &nbsp;&nbsp;
                <span>起止日期：</span>{{querytime}} &nbsp;&nbsp;
                <span>信源个数：</span>{{inforsourceNum}}个
            </p> -->
            <FormComp :option="formOpt" ref="singleForm"></FormComp>
            <tableComp  class="gutterNone" :option = "detailTable" :comSize="height"
                @handleCurrentPageChange="currentPageChange"
                @handleSizePageChange="sizePageChange">
            </tableComp>
        </sysDialog>
      </div>
</template>

<script>
import TableComp from 'components/Table'
import FormComp from 'components/Form'
import sysDialog from 'components/common/dialog'
import { ajax } from 'common'
import { mapGetters } from 'vuex'
export default {
    data() {
        const me = this
        return {
            // 接口参数
            formObj: {
                siteDomain: '',
                taskId: '',
                msisdn: '',
                // 排序方式
                order: 'desc',
                // 排序字段
                sort: 'visitTime',
                page: 1,
                rows: 10
            },
            querytime: '',
            // inforsourceNum: 0,
            show: false,
            formOpt: {
                inline: true,
                labelPos: 'right',
                labelWidth: '100',
                btnPos: 'right',
                items: [
                    {
                        label: '目标号码',
                        type: 'text',
                        comOpt: {
                            id: 'msisdn',
                            value: '',
                            width: 200,
                            disabled: false
                        }
                    }
                ],
                btns: [
                    {
                        comOpt: {
                            id: 'query',
                            value: '查询',
                            width: 200,
                            disabled: false,
                            click: function() {
                                let bool = me.msisdnConfirm()
                                if (bool === false) {
                                } else {
                                    me.detailTable.data = []
                                    me.detailTable.pageOpt.total = 0
                                    me.detailTable.pageOpt.pageSize = 10
                                    me.detailTable.pageOpt.currentPage = 1
                                    me.formObj.page = 1
                                    me.formObj.rows = 10
                                    me.singDetailsList()
                                }
                            }
                        }
                    }
                ]
            },
            detailTable: {
                listLoading: false,
                stripe: false,
                highlightRow: true,
                defaultSort: { prop: 'visitTime', order: 'descending' },
                sortChange(e) {
                    let { prop, order } = e
                    if (order === null) {
                        me.sort = 'visitNum'
                        me.order = 'desc'
                    } else {
                        let orderStr
                        ;['asc', 'desc'].forEach(it => {
                            if (order.startsWith(it)) orderStr = it
                        })
                        me.formObj.sort = prop
                        me.formObj.order = orderStr
                    }
                    if (me.detailTable.data.length) {
                        me.singDetailsList()
                    }
                },
                column: [
                    { name: '序号', value: 'index', align: 'center', width: 60 },
                    {
                        name: '访问时间',
                        prop: 'visitTime',
                        sortable: true,
                        align: 'center',
                        width: 150
                    },
                    { name: '目标号码', value: 'msisdn', align: 'center', width: 150 },
                    { name: '归属地', value: 'homeCode', align: 'center', width: 150 },
                    { name: 'IP', value: 'ipAddress', align: 'center', width: 150 },
                    {
                        name: 'URL',
                        value: 'url',
                        align: 'center',
                        tooltip: true,
                        tooltipClass: 'dialogTooltip'
                        // dialogTooltip: true
                    }
                ],
                data: [],
                pagination: true,
                pageOpt: {
                    currentPage: 1,
                    pageSize: 10,
                    pageSizes: [10, 20, 30, 40, 50],
                    total: 0
                }
            }
        }
    },
    mounted() {},
    props: ['option'],
    computed: {
        ...mapGetters({
            visualHeight: 'global/visualHeight'
        }),
        height() {
            return {
                // height: 360
                height: this.visualHeight * 0.8 - 120
            }
        },
        defaultSort() {
            const orderArr = ['ascending', 'descending']
            let orderStr
            if (this.sort === 'asc') {
                orderStr = orderArr[0]
            } else {
                orderStr = orderArr[1]
            }
            return { prop: this.sort, order: orderStr }
        }
    },
    methods: {
        // 查看任务列表
        async singDetailsList() {
            this.detailTable.data = []
            this.detailTable.listLoading = true
            let resp = await ajax.post(`keyPersonInforSource/selectByDomain`, this.formObj)
            let { rows, total } = resp
            this.detailTable.data = rows
            this.detailTable.pageOpt.total = total
            this.detailTable.listLoading = false
        },
        dialogResultChange(val) {
            this.show = val
        },
        openCallBack() {
            this.singDetailsList()
        },
        currentPageChange(val) {
            this.detailTable.pageOpt.currentPage = val
            this.formObj.page = this.detailTable.pageOpt.currentPage
            if (this.detailTable.data.length !== 0) {
                this.singDetailsList()
            }
        },
        sizePageChange(val) {
            this.detailTable.pageOpt.pageSize = val
            this.formObj.rows = this.detailTable.pageOpt.pageSize
            this.detailTable.pageOpt.currentPage = 1
            this.formObj.page = this.detailTable.pageOpt.currentPage
            if (this.detailTable.data.length !== 0) {
                this.singDetailsList()
            }
        },
        okFn() {
            this.initData()
        },
        cancleFn() {
            this.initData()
        },
        initData() {
            this.$refs.singleForm.clearValue()
            this.formObj.msisdn = ''
            this.detailTable.data = []
            this.detailTable.pageOpt.total = 0
            this.detailTable.pageOpt.pageSize = 10
            this.detailTable.pageOpt.currentPage = 1
            this.formObj.page = 1
            this.formObj.rows = 10
            this.show = false
        },
        // 目标号码验证
        msisdnConfirm() {
            let number = this.$refs.singleForm.getValue().msisdn
            this.formObj.msisdn = number
            let phoneReg = /^1[3,4,5,7,8]\d{9,20}$/
            if (number !== '' && !phoneReg.test(number)) {
                this.$alert('请输入正确格式的目标号码', {
                    confirmButtonText: '确定'
                })
                return false
            }
        }
    },
    watch: {
        'option.changeNum'() {
            this.formObj.taskId = this.option.taskId
            this.show = true
            this.formObj.siteDomain = this.option.siteDomain
        }
    },
    components: {
        TableComp,
        FormComp,
        sysDialog
    }
}
</script>

<style scoped>
.textTop > span {
    color: #fff;
}
</style>
