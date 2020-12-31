<template>
    <div class="ga-taskConfig">
        <div class="ga-layout__bodyTitle">
            <span class="ga-layout__titleTopLeft"></span>
            <span class="ga-layout__titleLeft"></span>
            <span class="ga-layout__titleCenter">{{ title }}</span>
            <span class="ga-layout__titleRight"></span>
            <span class="ga-layout__titleRightLeft"></span>
        </div>
        <!-- 表格配置 -->
        <div class="ga-taskConfig__contantWrap">
            <frameCom>
                <el-row class="ga-taskConfig__tabWrap">
                    <el-tabs type="card"
                            v-model="activeName"
                            @tab-click="tabClick">
                        <!-- <div class="ga-taskConfig__secTitle--configBox"> -->
                            <!--<el-tab-pane label="关键词配置"-->
                                        <!--:disabled="editKeyWord"-->
                                        <!--name="fifth">-->
                                <!--<template v-if='!editKeyWord'>-->
                                    <!--<keyWord :keywordHeight="tableHeight"-->
                                            <!--:taskId="taskId"-->
                                            <!--:isLoad="isLoadKeyWords"-->
                                            <!--:approverStatus="approverStatus"-->
                                            <!--:operateStatusProp="operateStatus"-->
                                            <!--:taskType="operateStatus"-->
                                    <!--&gt;</keyWord>-->
                                <!--</template>-->
                            <!--</el-tab-pane>-->
                            <el-tab-pane label="基本信息"
                                        name="first">
                                <template>
                                    <basicInfo :taskIdProp="taskId"
                                            :approverStatusProp="approverStatus"
                                            :operateStatusProp="operateStatus"
                                            @selectedFun="changeFun"
                                            @setTaskId="getTaskId"></basicInfo>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane label="功能选择"
                                        :disabled="editFun"
                                        name="second">
                                <template v-if='!editFun'>
                                    <selectFunc :taskIdProp="taskId"
                                                :operateStatusProp="operateStatus"
                                                :approverStatusProp="approverStatus"
                                                @TargetNum="changeTargetNum"
                                                @KeyWord="changeKeyWord"
                                                @areaRange="changeAreaRange"></selectFunc>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane label="目标号码"
                                        :disabled="editTargetNum"
                                        name="third">
                                <template v-if='!editTargetNum'>
                                    <targetNum :targetNumberHeight="tableHeight"
                                            :taskId="taskId"
                                            :isLoad="isLoadTarNum"
                                            :approverStatus="approverStatus"
                                            :operateStatusProp="operateStatus"
                                            :taskType="operateStatus"></targetNum>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane label="区域范围"
                                        :disabled="editAreaRange"
                                        name="fourth">
                                <template v-if="!editAreaRange">
                                    <areaRange :taskIdProp="taskId"
                                            :isLoad="isLoadAreaRange"
                                            :approverStatusProp="approverStatus"
                                            :operateStatusProp="operateStatus"></areaRange>
                                </template>
                            </el-tab-pane>
                            <!--<el-tab-pane label="有害短信关键词配置"-->
                                <!--:disabled="editKeyWord"-->
                                <!--name="fifth">-->
                                <!--<template v-if='!editKeyWord'>-->
                                <!--<keyWord :keywordHeight="tableHeight"-->
                                <!--:taskId="taskId"-->
                                <!--:isLoad="isLoadKeyWords"-->
                                <!--:approverStatus="approverStatus"-->
                                <!--:operateStatusProp="operateStatus"-->
                                <!--:taskType="operateStatus"-->
                                <!--&gt;</keyWord>-->
                                <!--</template>-->
                            <!--</el-tab-pane>-->
                        <!-- </div> -->
                    </el-tabs>
                </el-row>
            </frameCom>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import sysDialog from 'components/common/dialog'
    import frameCom from 'components/monitor/frame'
    //    新增
    import basicInfo from './basicInfo'
    import areaRange from './areaRange'
    import keyWord from '../../keywordsManage'
    import selectFunc from './selectFunc'
    import targetNum from '../../targetNumberManage'
    export default {
        name: 'taskCreate',
        data () {
            return {
                newTaskId: '',
                typeTitle: this.$route.params.title,
                operateStatus: this.$route.params.operateStatus,
                approverStatus: this.$route.params.approverStatus,
                // greenChannel: this.$route.params.greenChannel,
                isAdd: this.$route.params.isAdd,
                activeName: 'first',
                editTargetNum: true,
                editAreaRange: true,
                editKeyWord: true,
                editFun: true,
                isLoadTarNum: false,
                isLoadKeyWords: false,
                isLoadAreaRange: false,
                taskName: ''
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            }),
            tableSize () {
                return {
                    height: this.vsHeight - 150
                }
            },
            contentHeight () {
                return {
                    height: this.vsHeight - 70 + 'px'
                }
            },
            tableHeight () {
                return this.vsHeight - 170
            },
            title () {
                return this.typeTitle || '任务新增'
            },
            taskId () {
                return this.$route.params.taskId ? this.$route.params.taskId : this.newTaskId
            }
        },
        created () {
            if (this.taskId) {
                localStorage.setItem('SFtaskId', this.taskId)
            }
            if (this.operateStatus !== undefined) {
                localStorage.setItem('operateStatus', this.operateStatus)
            }
            if (this.approverStatus !== undefined) {
                if (this.approverStatus.toString()) {
                    localStorage.setItem('approverStatus', this.approverStatus)
                }
            }
            // if (this.greenChannel) {
            //     localStorage.setItem('greenChannel', this.greenChannel)
            // }
            if (this.isAdd) {
                localStorage.setItem('isAdd', this.isAdd)
            }
            if (localStorage.getItem('operateStatus') === '1') {
                this.typeTitle = '任务修改'
            } else if (localStorage.getItem('operateStatus') === '2') {
                this.typeTitle = '任务追加'
            } else if (localStorage.getItem('operateStatus') === '3') {
                this.typeTitle = '任务查看'
            }
        },
        destroyed () {
            localStorage.removeItem('SFtaskId');
            localStorage.removeItem('operateStatus');
            localStorage.removeItem('approverStatus');
            localStorage.removeItem('isAdd');
            // localStorage.removeItem('greenChannel');
        },
        methods: {
            // 接收基本信息页签新增任务时生成的任务ID
            getTaskId (TID) {
                this.newTaskId = TID
            },
            // 控制后边页签是否加载
            tabClick (val) {
                if (val.index === '2') {
                    this.isLoadTarNum = true;
                }
                if (val.index === '3') {
                    this.isLoadAreaRange = true
                }
                if (val.index === '3') {
                    this.isLoadKeyWords = true;
                }
            },
            // 功能选择是否可用
            changeFun (isdisabled) {
                this.editFun = isdisabled
            },
            // 目标号码按钮是否关闭
            changeTargetNum (isdisabled) {
                this.editTargetNum = isdisabled
            },
            // 关键词是否可用
            changeKeyWord (isdisabled) {
                this.editKeyWord = isdisabled
            },
            // 区域管理是否可用
            changeAreaRange (isdisabled) {
                this.editAreaRange = isdisabled
            }
        },
        components: {
            sysDialog, basicInfo, areaRange,
            keyWord, selectFunc, targetNum,
            frameCom
        }
    }
</script>
<style scoped>
@component-namespace ga {
    @b taskConfig {
        @e contantWrap{
                height: calc(100% - 74px);
                width: 99%;
                margin: 0 auto;
                margin-top: 8px;
        }
        @e tabWrap{
        }
    }
}
</style>
