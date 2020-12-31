<template lang="html">
    <el-row class="ga-warningDesktop">
        <el-col :span="8" class="ga-warningDesktop__leftWrap">
            <div class="ga-warningDesktop__leftTop">
                <p class='ga-warningDesktop__titleWrap'>{{leftTitle}}</p>
                <div class='ga-warningDesktop__numWrap'
                    @click='numClick($event)'>
                    <numberComp :options="numOpt"
                                :renderData="numData"></numberComp>
                </div>
            </div>
            <div class="ga-warningDesktop__leftBottom">
                <frameComp :title='rankingTitle'>
                    <rowBar :option='rowBarOpt' :areaIndex='rowBarIndex'></rowBar>
                </frameComp>
            </div>
        </el-col>
        <el-col :span="16" class="ga-warningDesktop__table">
            <tableComp :option="tableOpt"
                        :comSize="tableHeight"
                        @handleCurrentPageChange="handleCurrentPageChange"
                        @handleSizePageChange = "handleSizePageChange">
            </tableComp>
        </el-col>
    </el-row>
</template>
<script>
    import tableComp from 'components/Table'
    import { mapGetters } from 'vuex'
    import frameComp from 'components/monitor/frame'
    import numberComp from 'components/monitor/numberFlip'
    import rowBar from './areaBars'
    import Io from 'utils/websocket'
    import { getAllAlarms, getTaskAlarms, getFirstList, getSecondList } from 'api/system/warningDesktop'
    const apiUrl = process.env.NODE_ENV === 'production'
        ? '' : 'ws://10.8.0.2:8080/policeBusiness'
    export default {
        name: 'warningDesktop',
        data () {
            let me = this;
            return {
                //  点击 状态 0 所有 1 点击第一个bar条 2 点击第二个bar条
                type: 0,
                leftTitle: '当前预警总数',
                rankingTitle: '预警数按任务排行',
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    highlightRow: true,
                    column: [
                        { name: '排行', value: 'index', width: 60, align: 'center' },
                        { name: '预警时间', value: 'alarmTime', width: 120, align: 'center' },
                        { name: '预警名称', value: 'alarmName', align: 'center' },
                        { name: '预警类型', value: 'alarmTypeName', width: 130, align: 'center' },
                        { name: '所属任务', value: 'taskName', width: 100, align: 'center' },
                        { name: '操作', value: 'loc', width: 70, align: 'center', operations: [
                            {
                                label: '查看', type: 'label', click: me.viewWarning
                            }
                        ] }
                    ],
                    data: [],
                    pagination: true,
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [20, 30, 40, 50, 60],
                        pageSize: 20
                    }
                },
                numOpt: {
                    height: 60
                },
                numData: [
                    { value: 0 }
                ],
                rowBarOpt: {
                    secondShow: true,
                    data: [],
                    click: true, // 能否点击展开，TRUE为能，FALSE不能
                    barClick (item, index) {
                        let jump = index * 30
                        me.changBarScrollHeight(jump)
                        me.type = 1;
                        me.firstListObj.taskId = item.taskId
                        me.firstListObj.page = 1
                        me.tableOpt.pageOpt.currentPage = 1;
                        me.getFirstListFun()
                    },
                    secondBarClick (item) {
                        me.type = 2;
                        me.secondListObj.alarmTypeId = item.alarmTypeId
                        me.secondListObj.taskId = item.taskId
                        // me.secondListObj.page = item.page
                        me.tableOpt.pageOpt.currentPage = 1;
                        me.getSecondListFun()
                    }
                },
                rowBarIndex: '',
                allAlarmsObj: {
                    page: 1,
                    rows: 20,
                    type: 0
                },
                firstListObj: {
                    page: 1,
                    rows: 20,
                    type: 1,
                    taskId: ''
                },
                secondListObj: {
                    page: 1,
                    rows: 20,
                    taskId: '',
                    type: 2,
                    alarmTypeId: ''
                },
                socket: new Io()
            }
        },
        props: [],
        created () {
            this.getAllAlarmsFun()
            this.getTaskAlarmsFun()
        },
        mounted () {
            // 连接websocket
            this.socketFun()
        },
        beforeDestroy () {
            this.socket.disconnect()
        },
        methods: {
            //  右侧所有告警列表
            async getAllAlarmsFun () {
                this.tableOpt.data = []
                this.tableOpt.listLoading = true
                this.tableOpt.emptyText = ' ';
                let resp = await getAllAlarms(this.allAlarmsObj)
                if (resp.total) {
                    this.numData = [{ value: resp.total }]
                }
                this.dealTableData(resp)
            },
            //  左侧 任务条
            async getTaskAlarmsFun () {
                let resp = await getTaskAlarms()
                let { rows } = resp
                if (rows) {
                    for (let i in rows) {
                        rows[i].name = rows[i].taskName
                        rows[i].data = []
                    }
                    this.rowBarOpt.data = rows
                }
            },
            //  左侧任务条 一级点击事件
            async getFirstListFun () {
                this.tableOpt.data = []
                this.tableOpt.listLoading = true
                this.tableOpt.emptyText = ' ';
                let resp = await getFirstList(this.firstListObj)
                let { data } = resp
                this.dealTableData(resp)
                if (data) {
                    for (let i in data) {
                        data[i].name = data[i].alarmTypeName
                    }
                    this.$nextTick(() => {
                        this.rowBarOpt.data.forEach(item => {
                            if (item.taskId === this.firstListObj.taskId) {
                                item.data = data
                            }
                        })
                    })
                }
            },
            //  左侧任务条 二级点击事件
            async getSecondListFun () {
                this.tableOpt.data = []
                this.tableOpt.listLoading = true
                this.tableOpt.emptyText = ' ';
                let resp = await getSecondList(this.secondListObj)
                this.dealTableData(resp)
            },
            // websocket
            socketFun () {
                this.socket.connect(`${apiUrl}/websocket/alarmDesktopSocket`)
                this.socket.on('error', () => {
                    // window.alert('连接失败')
                    return;
                })
                this.socket.on('open', () => {
                    // console.log('SOCKET连接成功')
                })
                this.socket.on('message', () => {
                    // console.log(data)
                    this.tableOpt.pageOpt.currentPage = 1
                    this.getAllAlarmsFun();
                    this.getTaskAlarmsFun();
                    this.rowBarOpt.secondShow = false
                })
            },
            viewWarning (row) {
                this.$router.push({
                    name: '告警模块详情',
                    path: '/warningCom',
                    params: {
                        alarmTaskIds: row.alarmTaskIds,
                        alarmTaskId: row.alarmTaskId,
                        alarmId: row.alarmTypeId,
                        alarmName: row.alarmTypeName,
                        eventName: row.taskName,
                        taskId: row.taskId
                    }
                })
            },
            dealTableData (resp) {
                let { rows } = resp
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
                }
            },
            //  不同type 调用不同 table请求
            judgeType (type, val) {
                let setObj = ''
                if (type === 0) {
                    setObj = (obj) => {
                        obj.page = val
                    }
                } else {
                    setObj = (obj) => {
                        obj.rows = val;
                        obj.page = 1
                    }
                }
                setObj(this.allAlarmsObj)
                setObj(this.firstListObj)
                setObj(this.secondListObj)
                switch (this.type) {
                    case 0:
                        // setObj(this.allAlarmsObj)
                        this.getAllAlarmsFun();
                        break;
                    case 1:
                        // setObj(this.firstListObj)
                        this.getFirstListFun();
                        break;
                    case 2:
                        // setObj(this.secondListObj)
                        this.getSecondListFun();
                        break;
                }
            },
            changBarScrollHeight (height) {
                $('.ga-frame__content').animate({ scrollTop: height }, 500);
            },
            handleCurrentPageChange (val) {
                this.judgeType(0, val)
            },
            handleSizePageChange (val) {
                this.tableOpt.pageOpt.currentPage = 1;
                this.judgeType(1, val)
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            }),
            tableHeight () {
                return {
                    height: this.vsHeight - 18
                }
            },
            rankingHeight () {
                return {
                    height: this.vsHeight - 136 + 'px'
                }
            }
        },
        components: {
            tableComp,
            frameComp,
            numberComp,
            rowBar
        }
    }
</script>

<style scoped>
    /*登录页面*/
    @component-namespace ga {
        @b warningDesktop {
            width: 100%;
            height: 100%;
            @e leftWrap{
                padding:10px;
                height:100%;
            }
            @e leftTop{
                /* height: 20%; */
                margin-bottom: 12px;
            }
            @e titleWrap{
                /* width: 100%;
                height: 30px;
                line-height: 30px;
                position: relative;
                font-size: 14px;
                box-sizing: border-box; */
                color: #FF9D6B;
            }
            @e numWrap {
                line-height: 1
            }
            @e leftBottom{
                height: 80%;
                line-height:1.5;
            }
            @e title {
                color: #fff;
                font-size: 20px;
            }
            @e table{
                margin-top:12px;
            }
        }
    }
</style>
