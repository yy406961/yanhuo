<template>
    <div class="ga-configBasic">
        <div class="ga-configBasic__taskBasic">
            <div class="ga-configBasic__title">
                <i></i>基本信息
            </div>
            <div class="ga-configBasic__basicContent">
                <p class="ga-configBasic__basicText">
                    <span class="ga-configBasic__basicLabel">任务名称：</span>
                    <span class="ga-configBasic__basicValue">{{taskParm.taskName}}</span>
                    <span class="ga-configBasic__basicLabel">起始时间：</span>
                    <span class="ga-configBasic__basicValue">{{taskParm.beginTime}}</span>
                    <span class="ga-configBasic__basicLabel">结束时间：</span>
                    <span class="ga-configBasic__basicValue">{{taskParm.endTime}}</span>
                    <span class="ga-configBasic__basicLabel">任务使用人：</span>
                    <span class="ga-configBasic__basicValue">{{taskParm.userNick}}</span>
                    <span class="ga-configBasic__basicValue">本任务共有{{taskParm.funCount}}个功能，{{taskParm.taskTargetCount}}个重点人，{{taskParm.taskAreaCount}}个重点区域</span>
                </p>
                <p class="ga-configBasic__title">批准文号</p>
                <tableComp :option="approveTable" :comSize="comSize"></tableComp>
            </div>
        </div>
        <div class="ga-configBasic__taskFunWrap" :minHeight="bottomSquare">
            <div class="ga-configBasic__title">
                <i></i>任务功能
            </div>
            <div class="ga-configBasic__taskFunContent" :style="bottomSquareMax">
                <ul class="ga-configBasic__funUl">
                    <li v-for="item in selectedFun" :key="item.menuId">{{item.menuName}}</li>
                </ul>
                <ul class="ga-configBasic__warnUl">
                    <li v-for="item in selectedWarn" :key="item.menuId">{{item.menuName}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import square from 'components/common/square'
    import tableComp from 'components/Table/'
    import { taskBaseInfoQuery } from 'api/task/taskDetail'
    import { taskBaseQuery } from 'api/task/taskConfig'
    import { mapGetters } from 'vuex'
    export default {
        name: 'basicInfo',
        data () {
            return {
                taskId: '',
                taskName: '',
                beginTime: '',
                endTime: '',
                funCount: '',
                taskTargetCount: '',
                taskAreaCount: '',
                approveTable: {
                    listLoading: false,
                    stripe: true,
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
                    userNick: ''
                }
            }
        },
        props: {
            taskIdProp: {
                type: String
            }
        },
        methods: {
            // 基础数据功能告警树的信息
            async taskBaseInfoQuery () {
                let resp = await taskBaseInfoQuery({
                    taskBaseId: this.sendTaskId,
                    approverStatus: 3
                })
                if (resp) {
                    let { rows } = resp
                    rows.map(item => {
                        if (item.dictType === 'funType' || item.dictType === 'importantArea') {
                            if (item.funStatus === '1') {
                                this.selectedFun.push(item)
                            }
                        } else if (item.dictType === 'alarmType') {
                            if (item.alarmStatus === '1') {
                                this.selectedWarn.push(item)
                            }
                        }
                    })
                }
            },
            // 基础信息查询
            async getTaskBaseQuery () {
                let resp = await taskBaseQuery({ taskBaseId: this.sendTaskId, approverStatus: '3' })
                if (resp) {
                    this.taskParm = resp.data
                    this.approveTable.data = resp.data.list
                }
            }
        },
        components: {
            square,
            tableComp
        },
        computed: {
            comSize () {
                return { 'height': 240 }
            },
            topSquare () {
                return this.vsHeight - 240
            },
            bottomSquareMax () {
                return {
                    'height': this.vsHeight - 400 - 44 + 'px',
                    'overflowY': 'auto'
                }
            },
            bottomSquare () {
                return this.vsHeight - 400
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            })
        },
        mounted () {
            this.taskId = this.taskIdProp
            if (this.taskId) {
                localStorage.setItem('SFtaskId', this.taskId)
            }
            // 刷新页面
            if (localStorage.getItem('SFtaskId')) {
                this.taskId = localStorage.getItem('SFtaskId')
            }
            if (this.taskId.charAt(0) === 'T') {
                this.sendTaskId = this.taskId.substr(1)
            } else {
                this.sendTaskId = this.taskId
            }
            // 基础信息功能告警查询
//            taskBaseInfoQuery({ taskBaseId: this.sendTaskId }).then(resp => {
//                let { rows } = resp
//                rows.map(item => {
//                    if (item.dictType === 'funType') {
//                        if (item.funStatus === '1') {
//                            this.selectedFun.push(item)
//                        }
//                    } else if (item.dictType === 'alarmType') {
//                        if (item.alarmStatus === '1') {
//                            this.selectedWarn.push(item)
//                        }
//                    }
//                })
//            })
            this.taskBaseInfoQuery()
            this.getTaskBaseQuery()
        }
    }
</script>
<style>
@component-namespace ga {
    @b configBasic {
        color:rgba(162,238,255,1);
        padding:0 12px;
        @e taskFun{
            margin-top: 10px;
        }
        @e title{
            font-size: 14px;
            /* color:rgba(162,238,255,1); */
            height:32px;
            line-height:32px;
            i{
                display:inline-block;
                width:4px;
                height:16px;
                margin-right:8px;
                position: relative;
                top: 2px;
                background:rgba(0,170,255,1);
            }
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
        @e taskFunWrap{
            margin-top:18px;
            li{
                display: inline-block;
                height: 32px;
                line-height: 32px;
                text-align: center;
                margin-right: 12px;
                width: calc((100% - 60px)/6);
                background: rgba(189,240,255,0.10);
                box-shadow: inset 0 -1px 0 0 rgba(110,222,255,0.40), inset 0 1px 0 0 rgba(110,222,255,0.40);
                &:nth-child(6n){
                    margin-right:0;
                }
            }
        }
        @e funUl{
            li{
                &:nth-child(n+7){
                    margin-top:12px;
                }
            }
        }
        @e warnUl{
            li{
                margin-top:12px;
            }
        }
    }
}
</style>
