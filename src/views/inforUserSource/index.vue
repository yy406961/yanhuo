<template lang="html">
      <div class="ga-informationSource">
          <el-row style='margin-bottom: 10px;'>
             <ButtonComp :option="buttonAddTask"></ButtonComp>
             <ButtonComp :option="buttonSearchTask"></ButtonComp>
          </el-row>
          <el-row style='margin-bottom: 10px;'>
              <el-col :span="24" >
                  <p class="textTop" v-if="textTopShow">
                      <span>任务名称：</span>{{taskName}} &nbsp;&nbsp;
                      <span>起止日期：</span>{{taskTime}} &nbsp;&nbsp;
                      <span>号码个数：</span>{{num}} &nbsp;&nbsp;
                      <ButtonComp :option="buttonStat"></ButtonComp>
                  </p>
              </el-col>
          </el-row>
          <el-row >
               <TableComp  class="gutterNone" ref="table"
                   :option="myTable"
                   :comSize="tableHeight"
                   @handleCurrentPageChange="currentPageChange"
                   @handleSizePageChange = "pageSizeChange">
               </TableComp>
          </el-row>
          </el-row>
          <sysDialog size="large" v-if="showPerson"
                     title="信源访问统计"
                     @change="keyChange('showPerson')"
                     :dialogVisible="showPerson"
                     :showCancel='false'
                     :showConfirm='false'>
                <personSource :propData="optionData" :taskId="taskId"></personSource>
          </sysDialog>
          <sysDialog v-if="showKey" size="large"
                     title="用户访问信源统计"
                     @change="keyChange('showKey')"
                     :dialogVisible="showKey"
                     :showCancel='false'
                     :showConfirm='false'>
                <keySource :propData="optionData"></keySource>
          </sysDialog>
            <!-- 查看任务弹框 -->
          <checkTask @closeDialog="closeCheckTask" :option="checkTaskchangeNum"></checkTask>
          <!-- 个人访问信息详细 -->
          <singDetails :option="optionData"></singDetails>
          <!-- 创建任务 -->
          <createTask :option="createTaskchangeNum"></createTask>
      </div>
</template>

<script>
import TableComp from 'components/Table'
import ButtonComp from 'components/Form/button'
import keySource from './components/keySource'
import checkTask from './checkTask'
import singDetails from './singDetails'
import createTask from './createTask'
import sysDialog from 'components/common/dialog'
import personSource from './components/personSource'
import { ajax } from 'common'
import { mapGetters } from 'vuex'

export default {
    name: 'ga-informationSource',
    data() {
        const me = this
        return {
            // 创建查询任务
            createTaskchangeNum: 0,
            // 查看任务弹框相关参数
            checkTaskchangeNum: 0,
            // 个人访问信息源详细
            optionData: {
                startTime: '',
                endTime: '',
                phone: '',
                taskId: '',
                changeNum: 0
            },
            // 接口请求参数
            dialogChartVisible: false,
            // propData: {}, // 重点信源组件传参
            // 任务信息
            taskName: '',
            taskTime: '',
            num: '',
            textTopHeight: 0,
            textTopShow: false,
            showKey: false, // 重点信源统计
            showPerson: false, // 个人访问信源弹框
            // button
            buttonAddTask: {
                id: 'buttonAddTask',
                value: '添加任务',
                disabled: false,
                click: function() {
                    me.createTaskchangeNum++
                }
            },
            buttonSearchTask: {
                id: 'buttonSearchTask',
                value: '查看任务',
                disabled: false,
                click: function() {
                    me.checkTaskchangeNum++
                }
            },
            buttonStat: {
                id: 'buttonStat',
                value: '用户统计',
                disabled: false,
                click: function() {
                    // if (me.taskId) {
                    me.showPersonDetail()
                    // }
                }
            },

            // table
            currentPage: 1,
            pageSize: 10,
            count: 0,
            taskId: '',
            myTable: {
                listLoading: false,
                stripe: false,
                highlightRow: true,
                defaultSort: { prop: 'visitNum', order: 'descending' },
                sortChange(e) {
                    let { prop, order } = e
                    let orderStr
                    ['asc', 'desc'].forEach(it => {
                        if (order.startsWith(it)) orderStr = it
                    })
                    me.sort = prop
                    me.order = orderStr
                    if (me.myTable.data.length) {
                        me.query()
                    }
                },
                column: [
                    { name: '序号', value: 'index', align: 'center', width: 60 },
                    // 200 280 200 200
                    // { name: '信源名称', value: 'siteName', align: 'center', width: 200 },
                    { name: '信源域名', value: 'siteDomain', align: 'center', width: 400, tooltip: true },
                    {
                        name: '访问用户数',
                        prop: 'userNum',
                        align: 'center',
                        width: 250
                    },
                    {
                        name: '访问次数',
                        prop: 'visitNum',
                        align: 'center',
                        width: 250
                    },
                    {
                        name: '使用情况',
                        value: '',
                        align: 'center',
                        operations: [
                            // {
                            //     label: '详情',
                            //     type: 'label',
                            //     callback: function() {},
                            //     click: e => {
                            //         me.optionData.siteDomain = e.siteDomain
                            //         me.optionData.changeNum++
                            //     }
                            // },
                            {
                                label: '统计',
                                type: 'label',
                                callback: function() {},
                                click: function(e) {
                                    me.showPerson = true
                                    me.optionData.siteDomain = e.siteDomain
                                    // me.optionData.siteName = e.siteName
                                    me.optionData.userNum = e.userNum
                                }
                            }
                        ]
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
    mounted() {
    },
    computed: {
        ...mapGetters({
            vsHeight: 'global/visualHeight',
            userName: 'global/userName'
        }),
        tableHeight() {
            return { height: this.vsHeight - this.textTopHeight - 80 }
        }
        // taskId() {
        //     return localStorage.getItem('taskId')
        // },
        // ownerId() {
        //     return this.taskId ? this.taskId : this.userName
        // }
        // defaultSortCom() {
        //     const orderArr = ['ascending', 'descending']
        //     let orderStr
        //     if (this.sort === 'asc') {
        //         orderStr = orderArr[0]
        //     } else {
        //         orderStr = orderArr[1]
        //     }
        //     return { prop: this.sort, order: orderStr }
        // }
    },
    methods: {
        // 查询接口分页
        currentPageChange(val) {
            this.myTable.pageOpt.currentPage = val
            this.currentPage = val
            if (this.myTable.data.length !== 0) {
                this.query()
            }
        },
        pageSizeChange(val) {
            this.myTable.pageOpt.pageSize = val
            this.pageSize = val
            this.myTable.pageOpt.currentPage = 1
            this.currentPage = 1
            if (this.myTable.data.length !== 0) {
                this.query()
            }
        },
        query() {
            this.myTable.data = []
            this.myTable.listLoading = true
            let pload = {
                page: this.currentPage,
                rows: this.pageSize,
                taskId: this.taskId,
                sort: this.sort,
                order: this.order
            }
            ajax.post(`keyPersonInforSource/selectTaskResult`, pload).then(resp => {
                const { rows, total } = resp
                if (rows && rows.length) {
                    this.myTable.data = rows
                    this.myTable.pageOpt.total = total
                } else {
                    this.myTable.data = []
                    this.myTable.pageOpt.total = 0
                }
                this.myTable.listLoading = false
            })
            .catch(error => {
                this.myTable.listLoading = false
                console.log(error)
            })
        },
        // 查看任务相关函数
        closeCheckTask(data) {
            let { startTime, endTime, taskId, personNum, taskName } = data
            let startTimeSlice = startTime.slice(0, 10)
            let endTimeSlice = endTime.slice(0, 10)
            this.optionData.startTime = startTimeSlice
            this.optionData.endTime = endTimeSlice
            this.optionData.taskId = taskId
            this.optionData.personNum = personNum
            this.optionData.taskName = taskName
            // 主页面相关
            this.textTopShow = true
            this.textTopHeight = 28
            this.initTable()
            this.taskName = taskName

            this.num = personNum + '个'
            this.taskTime = startTimeSlice + '——' + endTimeSlice
            this.taskId = taskId
            // 跟人统计弹框数据
            // this.propData.startTime = startTimeSlice
            // this.propData.endTime = endTimeSlice
            // this.propData.personNum = personNum
            // this.propData.taskName = taskName
            // this.propData.taskId = taskId

            this.query()
        },
        showPersonDetail() {
            this.showKey = true
        },
        keyChange(val) {
            if (val === 'showKey') {
                this.showKey = false
            } else {
                this.showPerson = false
            }
        },
        // 表格页码相关初始化
        initTable() {
            this.myTable.pageOpt.currentPage = 1
            this.currentPage = 1
            this.myTable.pageOpt.pageSize = 10
            this.pageSize = 10
            this.sortStatus()
            this.sort = 'visitNum'
            this.order = 'desc'
            this.$refs.table.sort(this.sort, 'descending')
        },
        // 表格排序状态显示
        sortStatus() {
            this.myTable.column.map(item => {
                if (item.prop) {
                    item.sortable = true
                }
            })
        }
    },
    components: {
        TableComp,
        ButtonComp,
        personSource,
        sysDialog,
        keySource,
        checkTask,
        singDetails,
        createTask
    }
}
</script>

<style scoped>
.textTop > span {
    color: #fff;
}
</style>
