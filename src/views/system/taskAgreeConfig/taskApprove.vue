<template>
    <div class="ga-taskApprove">
        <p class="ga-taskApprove__basicText">
            <span class="ga-taskApprove__basicLabel">任务名称：</span>
            <span class="ga-taskApprove__basicValue">{{taskParm.taskName}}</span>
            <span class="ga-taskApprove__basicLabel">起始时间：</span>
            <span class="ga-taskApprove__basicValue">{{taskParm.beginTime}}</span>
            <span class="ga-taskApprove__basicLabel">结束时间：</span>
            <span class="ga-taskApprove__basicValue">{{taskParm.endTime}}</span>
            <span class="ga-taskApprove__basicLabel">任务使用人：</span>
            <span class="ga-taskApprove__basicValue">{{taskParm.taskUser}}</span>
            <span class="ga-taskApprove__basicValue">本任务共有{{taskParm.funCount}}个功能，{{taskParm.taskTargetCount}}个重点人，{{taskParm.taskAreaCount}}个重点区域</span>
        </p>
        <p class="ga-taskApprove__title">批准文号</p>
        <tableComp :option = "approveTable" :comSize="comSize"></tableComp>
        <!-- <el-row class="ga-warnConfigBox">
            <el-col :span="5" v-model="taskParm.taskName">任务名称：{{taskParm.taskName}}</el-col>
            <el-col :span="5" v-model="taskParm.beginTime">起始时间：{{taskParm.beginTime}}</el-col>
            <el-col :span="5" v-model="taskParm.endTime">结束时间：{{taskParm.endTime}}</el-col>
        </el-row> -->
        <!-- <el-row class="ga-warnConfigBox">
            <el-col :span="24" v-model="taskParm.funCount">本任务共有{{taskParm.funCount}}个功能，{{taskParm.taskTargetCount}}个重点人，{{taskParm.taskAreaCount}}个重点区域</el-col>
        </el-row> -->
        <!-- <el-row class="ga-warnConfigBox">
            <el-col :span="2">任务使用人：</el-col>
            <el-col :span="22" v-model="taskParm.taskUser">{{taskParm.taskUser}}</el-col>
        </el-row> -->
        <!-- <el-row class="ga-approveTable">
            <el-col :span="2">批准文号</el-col>
            <el-col :span="21" :offset="1">
                <tableComp :option = "approveTable" :comSize="comSize"></tableComp>
            </el-col>
        </el-row> -->
    </div>
</template>
<script>
    import square from 'components/common/square'
    import tableComp from 'components/Table/'
    // import { taskBaseInfoQuery } from 'api/task/taskDetail'
    import { taskBaseQuery } from 'api/task/taskConfig'
    import { mapGetters } from 'vuex'
    export default {
        name: 'basicInfo',
        data () {
            return {
                tableDataShow: {},
                approverStatus: '',
                taskId: '',
                taskName: '',
                beginTime: '',
                endTime: '',
                funCount: '',
                taskTargetCount: '',
                taskAreaCount: '',
                taskUser: '',
                approveTable: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 65, align: 'center' },
                        { name: '批准文号', value: 'fileNo', align: 'center' },
                        { name: '批准人/单位', value: 'approvalUnit', align: 'center' },
                        { name: '批准时间', value: 'approvalTime', align: 'center' }
                    ],
                    data: []
                },
                selectedFun: [],
                selectedWarn: [],
                sendTaskId: '',
                taskParm: {
                    taskName: '',
                    beginTime: '',
                    endTime: '',
                    funCount: '',
                    taskTargetCount: '',
                    taskUser: ''
                }
            }
        },
        props: {
            taskIdProp: {
                type: String
            },
            tableData: {
                type: Object
            },
            approverStatusProp: {
                type: Number
            }
        },
        methods: {
            // 基础数据功能告警树的信息
            // async taskBaseInfoQuery () {
            //     let resp = await taskBaseInfoQuery({ taskBaseId: this.sendTaskId })
            //     if (resp) {
            //         let { rows } = resp
            //         rows.map(item => {
            //             if (item.dictType === 'funType') {
            //                 if (item.funStatus === '1') {
            //                     this.selectedFun.push(item)
            //                 }
            //             } else if (item.dictType === 'alarmType') {
            //                 if (item.alarmStatus === '1') {
            //                     this.selectedWarn.push(item)
            //                 }
            //             }
            //         })
            //     }
            // },
            // 基础信息查询
            async getTaskBaseQuery () {
                let resp = await taskBaseQuery({ taskBaseId: this.sendTaskId, approverStatus: this.approverStatus })
                if (resp) {
                    let { data } = resp
                    this.taskParm = data
                    this.taskParm.taskUser = data.userNick;
                    this.approveTable.data = data.list
                }
            }
        },
        components: {
            square,
            tableComp
        },
        computed: {
            comSize () {
                return { 'height': Math.floor((this.vsHeight - 180) / 4) }
            },
            topSquare () {
                return {
                    height: this.vsHeight - 160 + 'px'
                }
            },
            bottomSquare () {
                return 100
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            })
        },
        mounted () {
            this.approverStatus = this.approverStatusProp;
            this.taskId = this.taskIdProp;
            // 刷新页面
            // if (this.taskId) {
            //     localStorage.setItem('SFtaskId', this.taskId)
            //     localStorage.setItem('SFtaskName', this.taskName)
            //     localStorage.setItem('SFtaskST', this.taskST)
            //     localStorage.setItem('SFtaskET', this.taskET)
            // }
            // if (localStorage.getItem('SFtaskId')) {
            //     this.taskId = localStorage.getItem('SFtaskId')
            //     this.taskName = localStorage.getItem('SFtaskName')
            //     this.taskST = localStorage.getItem('SFtaskST')
            //     this.taskET = localStorage.getItem('SFtaskET')
            // }
            // console.log(this.taskId)
            if (this.taskId.charAt(0) === 'T') {
                this.sendTaskId = this.taskId.substr(1)
            } else {
                this.sendTaskId = this.taskId
            }
            // console.log(this.sendTaskId)
            this.$emit('oneToTaskAgr', this.sendTaskId)
            this.getTaskBaseQuery()
        }
    }
</script>
<style scoped>
    @component-namespace ga {
        @b taskApprove{
            font-size:12px;
            color:rgba(162,238,255,1);
            @e basicText{
                height: 20px;
                line-height: 20px;
            }
            @e basicLabel{
                /* font-size: 12px; */
                color:rgba(162,238,255,0.75);
            }
            @e basicValue{
                padding-right:20px;
                /* overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap; */
            }
        }
        @b warnConfigBox {
            margin-top: 5px;
        }
        @b approveTable {
            margin-top: 12px;
        }
        @b taskFun {
            margin-top: 10px;
            @e selected {
                height: 30px;
            }
        }
        @b list {
            width: 15%;
            float: left;
        }
    }
</style>
