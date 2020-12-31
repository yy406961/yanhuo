<template>
    <div style="width: 100%;height: 100%">
        <div class='ga-select'>
            <buttonComp :option="btnOpt"></buttonComp>
        </div>
        <!--主要内容-->
        <div class='ga-mainContent'>
            <realTable :option="listTable"
                :comSize="tableSize">
            </realTable>
        </div>
        <!--添加号码弹出框-->
        <addDialog size="small" title="添加任务"
                            :okFn="okFn"
                            :okText="okText"
                            :isRightBtn="false"
                            :showCancel="false"
                            :dialogVisible="popShow"
                            @change="keyChange"
                            @openCallback="dialogOpendCallback">
            <el-row>
                <el-col :span="24">
                    <addForm :option="formOpt" ref="form"></addForm>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <realTable :option="taskTable"
                        :comSize="taskTableSize"></realTable>
                </el-col>
            </el-row>
        </addDialog>
    </div>
</template>

<script>
import addForm from 'components/Form'
import realTable from 'components/Table'
import addDialog from 'components/common/dialog'
import buttonComp from 'components/Form/button'
import { mapGetters } from 'vuex'
import { ajax } from 'common'
import Io from 'utils/websocket'
const apiUrl = process.env.NODE_ENV === 'production'
        ? '' : 'ws://192.168.31.107:8080/policeBusiness'
export default {
    name: 'targetMsgSeach',
    data() {
        let me = this
        return {
            okText: '关闭',
            // 通联实时推送接口参数
            formObj: {
                msisdn: '',
                queryBeginTime: '',
                queryEndTime: '',
                rows: 10,
                page: 1
            },
            // 添加号码----添加接口参数
            addObj: {
                msisdn: '',
                name: ''
            },
            // 添加号码----查询接口参数
            queryObj: {
                taskId: ''
            },
            // 添加号码----删除接口参数
            deleteObj: {
                msisdn: ''
            },
            // 控制弹框是否显示
            popShow: false,
            taskTableSize: {
                height: 350
            },
            addBool: true,
            formOpt: {
                inline: true,
                btnPos: 'right',
                labelWidth: '80',
                // 表单项
                items: [
                    {
                        label: '手机号码',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'msisdn',
                            value: '',
                            disabled: false,
                            type: 'text',
                            width: 180
                        }
                    },
                    {
                        label: '姓名代号',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'name',
                            value: '',
                            disabled: false,
                            type: 'text',
                            width: 180
                        }
                    }
                ],
                btns: [
                    {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '添加',
                            disabled: false,
                            click: function () {
                                if (me.addBool) {
                                    me.validation()
                                }
                            }
                        }
                    }
                ]
            },
            listTable: {
                listLoading: false,
                highlightRow: true,
                stripe: false,
                column: [
                    { name: '序号', value: 'index', width: 60, align: 'center' },
                    { name: '本端代号', value: 'name', width: 60, align: 'center' },
                    { name: '手机号码', value: 'userNum', width: 100, align: 'center' },
                    { name: 'IMEI', value: 'imei', width: 120, align: 'center' },
                    { name: 'IMSI', value: 'imsi', width: 120, align: 'center' },
                    { name: 'ULI', value: 'uli', width: 60, align: 'center', tooltip: true },
                    { name: 'LAC+CI', value: 'lacCi', width: 140, align: 'center', tooltip: true },
                    { name: '通联类型', value: 'type', width: 80, align: 'center' },
                    { name: '对端代号', value: 'relateName', width: 100, align: 'center' },
                    { name: '对方号码', value: 'relateNum', width: 100, align: 'center' },
                    { name: '通联时间', value: 'time', width: 130, align: 'center' },
                    { name: '通话时长/短信内容', value: 'timesContent', align: 'center', tooltip: true }
                ],
                data: [],
                pagination: false,
                pageOpt: {
                    currentPage: 1,
                    total: 0,
                    pageSizes: [10, 20, 30, 40, 50],
                    pageSize: 10
                }
            },
            taskTable: {
                listLoading: false,
                stripe: false,
                column: [
                    { name: '序号', value: 'index', width: 80, align: 'center' },
                    { name: '姓名代号', value: 'name', width: 260, align: 'center' },
                    { name: '手机号', value: 'msisdn', width: 260, align: 'center' },
                    {
                        name: '操作',
                        value: '',
                        align: 'center',
                        operations: [
                            {
                                label: '删除',
                                text: '确认删除此号码？',
                                isConfirm: true,
                                type: 'label',
                                callback: function() {},
                                click: function(e) {
                                    me.$confirm('是否确认删除？', '删除提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消'
                                    }).then(() => {
                                        me.deleteObj.msisdn = e.msisdn
                                        me.deleteTask()
                                    })
                                }
                            }
                        ]
                    }
                ],
                data: [],
                pagination: false
            },
            btnOpt: {
                id: 'btn1',
                value: '添加号码',
                disabled: false,
                click: function() {
                    me.popShow = true
                }
            },
            // webscoket相关
            unTableData: [],
            socket: new Io(),
            webscoketURL: `${apiUrl}/websocket/communicationsDetail`
        }
    },
    computed: {
        ...mapGetters({
            vsHeight: 'global/visualHeight',
            userName: 'global/userName'
        }),
        // 模块任务ID
        taskMainId() {
            return localStorage.getItem('taskId') || ''
        },
        ownerId() {
            return this.taskMainId ? this.taskMainId : this.userName
        },
        tableSize() {
            return {
                height: this.vsHeight - 60
            }
        }
    },
    mounted() {
        this.queryList()
        this.webscoket()
    },
    methods: {
        // 通联实时推送列表
        async queryList() {
            this.listTable.data = []
            this.listTable.listLoading = true
            let resp = await ajax.get(`/CommunicationsDetail//queryDetails`)
            let { rows } = resp
            if (resp && _.isArray(rows)) {
                this.listTable.data = rows
                this.unTableData = rows
            }
            this.listTable.listLoading = false
        },
        // dialog显示回调
        dialogOpendCallback() {
            this.taskTable.data = []
            // this.queryObj.taskId = this.ownerId
            this.queryDialog()
        },
        keyChange(val) {
            this.$refs.form.clearValue()
            this.taskTable.listLoading = false
            this.popShow = val
        },
        // 添加号码弹框-----查询接口
        async queryDialog() {
            this.taskTable.listLoading = true
            this.taskTable.data = []
            let resp = await ajax.post(`/lUserInfo/selectLUserInfos`)
            let { data } = resp
            if (data) {
                this.taskTable.data = data
            }
            this.addBool = true
            this.formOpt.btns[0].comOpt.disabled = !this.addBool
            this.taskTable.listLoading = false
        },
        // 添加号码弹框-----添加接口
        addTask() {
            this.addBool = false
            this.formOpt.btns[0].comOpt.disabled = !this.addBool
            ajax.post(`/lUserInfo/insertLUserInfo`, this.addObj).then(resp => {
                if (resp) {
                    this.$message.success('添加成功！')
                    this.queryDialog()
                } else {
                    this.$message.error('添加失败！')
                }
            })
        },
        // 添加号码弹框-----删除接口
        deleteTask() {
            ajax.post(`/lUserInfo/deleteLUserInfo`, this.deleteObj).then(resp => {
                if (resp) {
                    this.$message.success('删除成功！')
                    this.queryDialog()
                } else {
                    this.$message.error('删除失败！')
                }
            })
        },
        // 确认函数
        okFn() {
            this.$refs.form.clearValue()
            this.taskTable.listLoading = false
            this.popShow = false
        },
        // 目标号码和对方号码相关验证
        validation() {
            let queryList = this.$refs.form.getValue()
            let phoneReg = /^1[3,4,5,7,8]\d{9,20}$/
            // let phoneGu = /^(\\ + \\d{2}-)? 0 \\d{2, 3}\\d{7, 8}$/
            let phoneGu = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
            if (queryList.msisdn === '') {
                this.$alert('手机号码不能为空', {
                    confirmButtonText: '确定'
                })
                return
            }
            if (!phoneGu.test(queryList.msisdn) && !phoneReg.test(queryList.msisdn)) {
                this.$alert('请输入正确格式的目标号码', {
                    confirmButtonText: '确定'
                })
                return
            }
            if (queryList.name === '') {
                this.$alert('姓名代号不能为空', {
                    confirmButtonText: '确定'
                })
                return
            }
            this.addObj = queryList
            this.addTask()
        },
        // webscoket
        webscoket () {
            // 与后端建立 socket 连接
            this.socket.connect(this.webscoketURL)
            // 0表示尚未链接，1表示连接已建立，可以进行通信，2表示连接正在进行关闭， 表示连接已经关闭或者连接不能打开
            // 监听连接是否建立
            this.socket.on('open', () => {
                // 触发自定义事件，传递的数据为对象，对象里面的数据为数组
                // this.socket.emit('webScoketData');
            })
            // 监听事件
            this.socket.on('message', resp => {
                // 对接收到的数据进行转换
                let data = this.socket.JSONparse(resp.data);
                // 接收到后端传过来得数据时对数据包得标签进行判断，判断条件为 emit 中的 eventName
                if (data) {
                    data.map(item => {
                        this.unTableData.unshift(item)
                    })
                    this.listTable.data = []
                    this.listTable.data = this.unTableData
                }
            })
        },
        beforeDestroy () {
            this.socket.disconnect();
        },
        // 时间限制
        timeLimit() {
            let yesterDay = new Date().getTime() - 24 * 60 * 60 * 1000
            this.$refs.form.setValue([
                { id: 'queryBeginTime', value: yesterDay },
                { id: 'queryEndTime', value: yesterDay }
            ])
        }
        // @handleCurrentPageChange="currentPageChange"
        // @handleSizePageChange="sizePageChange"
        // currentPageChange(val) {
        //     this.listTable.pageOpt.currentPage = val
        //     this.formObj.page = val
        //     if (this.listTable.data.length) {
        //         this.queryList()
        //     }
        // },
        // sizePageChange(val) {
        //     this.listTable.pageOpt.pageSize = val
        //     this.listTable.pageOpt.currentPage = 1
        //     this.formObj.page = 1
        //     this.formObj.rows = val
        //     if (this.listTable.data.length) {
        //         this.queryList()
        //     }
        // },
    },
    components: {
        addForm,
        realTable,
        addDialog,
        buttonComp
    }
}
</script>

<style scoped>
@component-namespace ga {
    /*上方选择框*/
    @b select {
        padding-top: 5px;
        margin-bottom: 15px;
        /*目标选择*/
        @e targetSelect {
            width: 81px;
            height: 38px;
            background-color: rgb(39, 141, 227);
            border: none;
            color: #fff;
            border-radius: 4px;
        }
        @e targetSelect:hover {
            cursor: pointer;
        }
    }
}
</style>
