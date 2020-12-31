<template>
    <div class="ga-taskConfig">
        <div class="ga-layout__bodyTitle">
            <span class="ga-layout__titleTopLeft"></span>
            <span class="ga-layout__titleLeft"></span>
            <span class="ga-layout__titleCenter">业务审计</span>
            <span class="ga-layout__titleRight"></span>
            <span class="ga-layout__titleRightLeft"></span>
        </div>
        <frameCom class="ga-taskConfig__mainWrap">
            <el-row :style="contentHeight">
                <el-tabs type="card"
                     v-model="activeName"
                     @tab-click="tabClick">
                <!-- <div class="ga-taskConfig__secTitle--configBox"> -->
                    <el-tab-pane label="基本信息"
                                 name="first">
                        <template>
                            <basicInfo></basicInfo>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="目标号码"
                                 name="second">
                        <template>
                            <targetNum :isLoadTarNum="isLoadNum"
                                       ></targetNum>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="目标区域"
                                 name="third">
                        <template>
                            <targetArea :isLoadArea="isLoadArea"></targetArea>
                        </template>
                    </el-tab-pane>
                <!-- </div> -->
                </el-tabs>
            </el-row>
        </frameCom>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import sysDialog from 'components/common/dialog'
    import frameCom from 'components/monitor/frame'
    //    新增
    import basicInfo from './baseInfo'
    import targetArea from './targetArea'
    import targetNum from './targetNumber'
    export default {
        name: 'taskCreate',
        data () {
            return {
                newTaskId: '',
                activeName: 'first',
                selectedArea: true,
                editTargetNum: true,
                isLoadNum: false,
                isLoadArea: false,
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
                    height: this.vsHeight - 40 + 'px'
                }
            },
            tableHeight () {
                return this.vsHeight - 160
            },
            taskId () {
                return this.$route.params.taskId ? this.$route.params.taskId : this.newTaskId
            }
        },
        created () {
            if (this.taskId) {
                localStorage.setItem('SFtaskId', this.taskId)
            }
        },
        destroyed () {
            localStorage.removeItem('SFtaskId');
            localStorage.removeItem('operateStatus');
            localStorage.removeItem('approverStatus');
//            localStorage.removeItem('greenChannel');
        },
        methods: {
            // 接收基本信息页签新增任务时生成的任务ID
            getTaskId (TID) {
                this.newTaskId = TID
            },
            // 控制后边页签是否加载
            tabClick (val) {
                if (val.index === '1') {
                    this.isLoadNum = true;
                }
                if (val.index === '2') {
                    this.isLoadArea = true
                }
            }
        },
        components: {
            sysDialog, basicInfo, targetArea,
            targetNum,
            frameCom
        }
    }
</script>

<style lang="postcss" scoped>
    .ga-taskConfig__mainWrap {
        width: 99%!important;
        margin: 4px auto;
    }
    .ga-taskConfig {
        margin-top: 0;
        height:calc(100% - 74px)!important;
        width: 100%;
    }
</style>
