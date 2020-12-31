<template lang="html">
      <!-- 查看任务弹框 -->
      <div class="ga-singDetails">
          <sysDialog size="large" class="ga-informationSource__dialog"
                   title="个人访问信源详情"
                   @change="dialogResultChange"
                   @openCallback="openCallBack"
                   :dialogVisible="show"
                   :okFn="okFn"
                   :cancleFn="cancleFn">
            <p class="textTop">
                <span>用户号码：</span>{{phoneMsd}} &nbsp;&nbsp;
                <span>起止日期：</span>{{querytime}} &nbsp;&nbsp;
                <span>信源个数：</span>{{inforsourceNum}}个
            </p>
            <FormComp :option="formOpt" ref="singleForm"></FormComp>
            <tableComp ref="table" class="gutterNone" :option = "detailTable" :comSize="height"
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
import { phoneNumChange } from 'utils/index'
export default {
    data() {
        const me = this
        return {
            // 接口参数
            formObj: {
                phoneNum: '',
                inforsourceDomain: '',
                inforsourceId: '',
                taskId: '',
                time: '',
                // 排序方式
                order: 'desc',
                // 排序字段
                sort: 'visitTime',
                page: 1,
                rows: 10
            },
            taskId: '',
            phone: '',
            phoneMsd: '',
            querytime: '',
            inforsourceNum: 0,
            treeData: [],
            show: false,
            formOpt: {
                inline: true,
                labelWidth: '60',
                items: [
                    {
                        label: '信源',
                        type: 'select',
                        comOpt: {
                            id: 'site',
                            data: [],
                            width: 200,
                            disabled: false,
                            change: function(val) {
                                if (me.treeData.length) {
                                    me.treeData.map(item => {
                                        if (item.value === val) {
                                            me.detailTable.data = []
                                            me.detailTable.pageOpt.total = 0
                                            me.detailTable.pageOpt.pageSize = 10
                                            me.detailTable.pageOpt.currentPage = 1
                                            me.formObj.inforsourceDomain = item.name
                                            me.formObj.inforsourceId = item.value
                                            me.singDetailsList()
                                        }
                                    })
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
                    let orderStr
                    ['asc', 'desc'].forEach(it => {
                        if (order.startsWith(it)) orderStr = it
                    })
                    me.formObj.sort = prop
                    me.formObj.order = orderStr
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
                    { name: '信源名称', value: 'inforsourceName', align: 'center', width: 200 },
                    { name: '信源域名', value: 'inforsourceDomain', align: 'center', width: 250 },
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
            visualHeight: 'global/visualHeight',
            isPhoneJM: 'global/isPhoneJM'
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
            ajax.post(`/informationSource/selectByPhoneNum`, this.formObj).then(resp => {
                let { rows, total } = resp
                this.detailTable.data = rows
                this.detailTable.pageOpt.total = total
                this.detailTable.listLoading = false
            })
            .catch(error => {
                console.log(error)
                this.detailTable.listLoading = false
            })
            // .then(resp => {
            // this.detailTable.listLoading = true
            //     let { rows, total } = resp
            //     this.detailTable.data = rows
            //     this.detailTable.pageOpt.total = total
            //     this.detailTable.listLoading = false
            // })
        },
        // 获得信源数据
        sourceTree() {
            ajax
                .post(`/informationSource/selectCheckedSource`, {
                    taskId: this.taskId,
                    phoneNum: this.phone
                })
                .then(resp => {
                    let { rows } = resp
                    this.treeData = []
                    rows.map(item => {
                        this.treeData.push({
                            name: item.inforsourceDomain,
                            value: item.inforsourceId
                        })
                    })
                    this.treeData.unshift({
                        name: '全部',
                        value: ''
                    })
                    if (this.$refs.singleForm) {
                        this.$refs.singleForm.setItemData('site', this.treeData)
                    }
                })
        },
        dialogResultChange(val) {
            this.detailTable.listLoading = false
            this.show = val
        },
        openCallBack() {
            this.$refs.singleForm.setValue([{ id: 'site', value: '' }])
            // this.detailTable.data = []
            // this.detailTable.pageOpt.total = 0
            // this.detailTable.pageOpt.currentPage = 1
            // this.detailTable.pageOpt.pageSize = 10
            // this.formObj.page = 1
            // this.formObj.rows = 10
            this.formObj.inforsourceDomain = '全部'
            this.formObj.inforsourceId = ''
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
            // this.show = false
            // 清空表单
            // this.$refs.singleForm.clearValue()
            this.initData()
        },
        cancleFn() {
            // this.show = false
            // 清空表单
            // this.$refs.singleForm.clearValue()
            this.initData()
        },
        initData() {
            this.detailTable.listLoading = false
            this.treeData = []
            this.$refs.singleForm.clearValue()
            this.formObj.sort = 'visitTime'
            this.formObj.order = 'desc'
            this.$refs.table.sort(this.formObj.sort, 'descending')
            this.detailTable.data = []
            this.detailTable.pageOpt.total = 0
            this.detailTable.pageOpt.pageSize = 10
            this.detailTable.pageOpt.currentPage = 1
            this.formObj.page = 1
            this.formObj.rows = 10
            this.show = false
        }
    },
    watch: {
        'option.changeNum'() {
            this.taskId = this.option.taskId
            this.phone = this.option.phone
            this.phoneMsd = this.isPhoneJM ? phoneNumChange(this.option.phone) : this.option.phone
            this.sourceTree()
            this.show = true
            this.querytime = this.option.startTime + '——' + this.option.endTime
            this.inforsourceNum = this.option.inforsourceNum
            this.formObj.phoneNum = this.option.phone
            this.formObj.time = this.option.startTime
            this.formObj.taskId = this.option.taskId
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
