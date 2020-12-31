<template>
    <div>
        <!-- <div class="ga-layout__body-title">{{ title }}</div> -->
        <div class="ga-layout__bodyTitle">
            <span class="ga-layout__titleTopLeft"></span>
            <span class="ga-layout__titleLeft"></span>
            <span class="ga-layout__titleCenter">{{ title }}</span>
            <span class="ga-layout__titleRight"></span>
            <span class="ga-layout__titleRightLeft"></span>
        </div>
        <div class="ga-taskConfig">
            <!-- 表格配置 -->
            <frameCom>
                <div :style="contentHeight">
                    <el-tabs type="card" v-model="activeName">
                        <el-tab-pane label="基本信息" name="first">
                            <template>
                                <basicInfo :taskIdProp="taskId"></basicInfo>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="告警配置" name="second">
                            <template>
                                <warnConfig :taskIdProp="taskId" :taskStatus="taskStatus"></warnConfig>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="区域监测配置" name="third" :disabled="editArea">
                            <template v-if="!editArea">
                                <importantArea :taskIdProp="taskId" :taskStatus="taskStatus"></importantArea>
                            </template>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </frameCom>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import frameCom from 'components/monitor/frame'
    import warnConfig from './config/warnConfig'
    import importantArea from './config/importantArea'
    import basicInfo from './config/basicInfo'
    import { taskBaseInfoQuery } from 'api/task/taskDetail'
    import { taskBaseQuery } from 'api/task/taskConfig'
    export default {
        name: 'taskConfig',
        data () {
            return {
                title: this.$route.params.handleType === 'addTask' ? '新建任务' : '配置任务',
                taskId: this.$route.params.handleType,
                taskST: this.$route.params.startTime,
                taskET: this.$route.params.endTime,
                taskName: this.$route.params.detailTitle,
                activeName: 'first',
                editArea: true,
                sendTaskId: '',
                selectedFun: [],
                taskStatus: ''
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            }),
            contentHeight () {
                return {
                    height: this.vsHeight - 40 + 'px'

                }
            }
        },
        mounted () {
            if (this.taskId) {
                localStorage.setItem('SFtaskId', this.taskId)
            }
            // 在配置任务中刷新界面
            if (localStorage.getItem('SFtaskId')) {
                this.taskId = localStorage.getItem('SFtaskId')
            }
            if (this.taskStatus) {
                localStorage.setItem('taskStatus', this.taskStatus)
            }
            if (this.taskId.charAt(0) === 'T') {
                this.sendTaskId = this.taskId.substr(1)
            } else {
                this.sendTaskId = this.taskId
            }
            this.taskBaseInfoQuery()
            this.getTaskBaseQuery()
        },
        methods: {
            // 基础数据功能告警树的信息(如果功能选择里面有重点区域监测在任务配置里面此页签才可以使用)
            async taskBaseInfoQuery () {
                let resp = await taskBaseInfoQuery({ taskBaseId: this.sendTaskId, isDetail: '1' })
                if (resp) {
                    let { rows } = resp
                    rows.map(item => {
                        if (item.menuId === '70004' && item.funStatus === '1') {
                            this.editArea = false
                        }
                    })
                }
            },
            // 基础信息查询(获取任务状态)
            async getTaskBaseQuery () {
                let resp = await taskBaseQuery({ taskBaseId: this.sendTaskId, approverStatus: '3' })
                if (resp) {
                    this.taskStatus = resp.data.taskStatus
                }
            }
        },
        destroyed () {
            localStorage.removeItem('SFtaskId');
            localStorage.removeItem('taskStatus');
        },
        components: {
            warnConfig,
            frameCom,
            importantArea,
            basicInfo
        }
    }
</script>
<style scope>
    .ga-taskConfig__secTitle--configBox {
        border: 1px solid rgb(71, 130, 209);
        padding: 10px 10px;
        margin: 0 5px;
    }
@component-namespace ga {
    @b taskConfig {
        height: calc(100% - 74px);
        /*width: 99%;*/
        margin: 0 auto;
        /*margin-top: 8px;*/
    }
}
</style>


