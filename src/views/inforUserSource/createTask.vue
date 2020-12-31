<template lang="html">
      <!-- 查看任务弹框 -->
      <div class="ga-createTask">
          <sysDialog size="small"
                   title="添加任务"
                   v-if="show"
                   @change="dialogChange"
                   @openCallback="openCallBack"
                   :dialogVisible="show"
                   :okFn="okFn"
                   :cancleFn="cancleFn">
            <FormComp :option="formOpt" ref="form"></FormComp>
            <transfer :option="transferData" ref="transfer"></transfer>
            <!-- <el-transfer
                    v-model="value3"
                    filterable
                    ref="trans"
                    :filter-method="filterMethod"
                    :render-content="renderFunc"
                    :titles="['目标号码', '已选目标']"
                    @change="handleChange"
                    :data="transferData">
                    <span style="margin-left: 30px" slot="left-footer">搜索结果：{{filterArrLengthLeft}} 项</span>
                    <span style="margin-left: 30px" slot="right-footer">搜索结果：{{filterArrLengthRight}} 项</span>
                </el-transfer> -->
        </sysDialog>
      </div>
</template>

<script>
import FormComp from 'components/Form'
import sysDialog from 'components/common/dialog'
import transfer from 'components/transfer'
import { forbiddenDate, getIntervalDate } from 'utils'
import { ajax } from 'common'
export default {
    props: ['option'],
    data() {
        const me = this
        return {
            // 接口请求参数
            formObj: {
                endTime: '',
                startTime: '',
                taskName: '',
                // 父模块任务id  存当前ls
                parentTaskId: ''
            },

            // 查询重点人数据
            detailList: [],
            transferValue: [],
            transferData: {
                // titles: ['', ''],
                // spanBool: true,
                data: [],
                handleChange(val) {
                    me.transferValue = val
                }
            },
            filterArrLengthLeft: 0,
            filterArrLengthRight: 0,
            // 弹框恒显示
            show: false,
            // 表单相关参数
            formOpt: {
                inline: true,
                labelPos: 'right',
                labelWidth: '80',
                btnPos: 'right',
                items: [
                    {
                        label: '任务名称',
                        type: 'text',
                        required: true,
                        wrap: true,
                        comOpt: {
                            id: 'taskName',
                            value: '',
                            width: 510,
                            disabled: false
                        }
                    },
                    {
                        label: '开始日期',
                        type: 'date',
                        required: true,
                        comOpt: {
                            id: 'startTime',
                            value: getIntervalDate(1),
                            type: 'date',
                            disabled: false,
                            width: '210',
                            format: 'yyyy-MM-dd',
                            pickOptions: {
                                disabledDate(time) {
                                    return forbiddenDate(time)
                                }
                            }
                        }
                    },
                    {
                        label: '截止日期',
                        type: 'date',
                        required: true,
                        comOpt: {
                            id: 'endTime',
                            value: getIntervalDate(),
                            disabled: false,
                            type: 'date',
                            width: '210',
                            format: 'yyyy-MM-dd',
                            pickOptions: {
                                disabledDate(time) {
                                    return forbiddenDate(time)
                                }
                            }
                        }
                    }
                ]
            }
        }
    },
    mounted() {
        this.loadSourceTree()
    },
    computed: {
        // 模块任务ID
        taskMainId() {
            return localStorage.getItem('taskId') || ''
        }
    },
    methods: {
        // 得到穿梭框的数据
        async loadSourceTree() {
            let treeObj = {
                approverStatus: 3,
                owner: this.taskMainId
            }
            let { rows } = await ajax.post('/targetNumberManage/tarNumQuery', treeObj)
            if (rows && rows.length) {
                this.transferData.data = []
                rows.map((item, index) => {
                    this.transferData.data.push({
                        name: `${item.name}`,
                        msisdn: `${item.msisdn}`,
                        label: `${item.name} - ${item.msisdn}`,
                        key: index + 1,
                        resourceId: `${item.resourceId}`
                    })
                })
            }
        },
        // 查看任务列表
        createTask() {
            window.GALoading.open('创建任务中,请耐心等会儿...')
            ajax
                .post(`/keyPersonInforSource/addKeyPersonInforSourceTask`, {
                    jsonStr: JSON.stringify(this.formObj)
                })
                .then(resp => {
                    if (resp) {
                        this.$message.success('创建任务成功！')
                        this.$refs.form.clearValue()
                        this.$refs.transfer.clearValue()
                        this.initTime()
                        // window.GALoading.close()
                        // this.show = false
                    }
                })
                .catch(error => {
                    if (error.status === 300) {
                        this.show = true
                    }
                    window.GALoading.close()
                })
        },
        dialogChange(val) {
            this.show = val
        },
        openCallBack() {
            this.loadSourceTree()
            // 初始化时间组件
            // let yesterDay = new Date().getTime() - 24 * 60 * 60 * 1000
            // this.$refs.form.setValue([
            //     { id: 'startTime', value: yesterDay },
            //     { id: 'endTime', value: new Date() }
            // ])
        },
        okFn() {
            let getVals = this.$refs.form.getValue()
            let { startTime, endTime, taskName } = getVals
            if (startTime === '' || endTime === '') {
                this.$alert('开始时间不能为空！', {
                    confirmButtonText: '确定'
                })
                return
            }
            if (startTime > endTime) {
                this.$alert('开始时间不能大于结束时间！', {
                    confirmButtonText: '确定'
                })
                return
            }

            let recx = /^[0-9A-Za-z\u4e00-\u9fa5]{1,20}$/
            if (!recx.test(taskName)) {
                this.$alert('请输入由1~20位汉字、字母、数字组成的的任务名称', {
                    confirmButtonText: '确定'
                })
                return
            }
            this.formObj.endTime = getVals.endTime
            this.formObj.startTime = getVals.startTime
            this.formObj.taskName = getVals.taskName
            let slist = this.getTransferData()
            console.log(slist)
            if (slist && slist.length === 0) {
                this.$alert('重点人不能为空', {
                    confirmButtonText: '确定'
                })
                return
            }
            this.formObj.detailList = slist
            this.formObj.personNum = slist.length
            // if (slist && slist.length > 20) {
            //     this.$alert('信源不能超过20个！', {
            //         confirmButtonText: '确定'
            //     })
            //     return
            // }

            // this.formObj.detailVOList = slist.map(item => {
            //     return item.dataObj
            // })
            // this.formObj.inforsourceNum = this.formObj.detailVOList.length
            this.formObj.parentTaskId = this.taskMainId
            this.createTask()
        },
        cancleFn() {
            // 清空表单和树形数据
            this.$refs.form.clearValue()
            this.$refs.transfer.clearValue()
            this.show = false
        },
        // 得到请求参数的值detailList
        getTransferData() {
            this.detailList = []
            this.transferValue.map(item => {
                this.detailList.push({
                    personId: this.transferData.data[item - 1].resourceId,
                    personName: this.transferData.data[item - 1].name,
                    msisdn: this.transferData.data[item - 1].msisdn
                })
            })
            return this.detailList
        },
        // 初始化时间组件
        initTime() {
            // let yesterDay = getDate().getTime() - 24 * 60 * 60 * 1000
            // this.$refs.form.setValue([
            //     { id: 'startTime', value: yesterDay },
            //     { id: 'endTime', value: getDate() }
            // ])
            window.GALoading.close()
            this.$nextTick(() => {
                this.show = false
            })
            // this.show = false
        }
    },
    watch: {
        option() {
            this.show = true
        }
    },
    components: {
        FormComp,
        sysDialog,
        transfer
    }
}
</script>

<style >
</style>
