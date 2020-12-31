<template>
    <div class="ga-taskAgree">
        <div class="ga-taskAgree__basicWrap">
            <div class="ga-taskAgree__title ga-taskAgree__marginTop0">
                <i></i>{{titleData[0]}}
            </div>
            <taskApprove :child="agreeData" :taskIdProp="taskId" :tableData="listData" :approverStatusProp="this.agreeData.approverStatus"></taskApprove>
        </div>
        <div class="ga-taskAgree__funcWrap">
            <div class="ga-taskAgree__title">
                <i></i>{{titleData[1]}}
            </div>
            <selectFun :taskIdProp="taskId" :approverStatusProp="this.agreeData.approverStatus"></selectFun>
        </div>
        <div class="ga-taskAgree__numWrap">
            <div class="ga-taskAgree__title">
                <i></i>{{titleData[2]}}
            </div>
            <targetNum :taskIdProp="taskId" :approverStatusProp="this.agreeData.approverStatus"></targetNum>
        </div>
        <div class="ga-taskAgree__areaWrap">
            <div class="ga-taskAgree__title">
                <i></i>{{titleData[3]}}
            </div>
            <areaRanger :taskIdProp="taskId" :approverStatusProp="this.agreeData.approverStatus"></areaRanger>
        </div>
        <div class="ga-taskAgree__areaWrap">
            <div class="ga-taskAgree__title">
                <i></i>{{titleData[4]}}
            </div>
            <tableComp :option="tableOpt" :comSize="tableSize"></tableComp>
        </div>
        <div class="ga-taskAgree__formWrap">
            <formComp :option="formOpt"></formComp>
        </div>
        <!--提交确认框-->
        <sysDialog :dialogVisible="passYesShow" title="任务审批" size="tiny" @change="dialogChange" :okFn="confirmPass">
            <span>确认该任务通过审核</span>
        </sysDialog>
        <!--删除确认框-->
        <sysDialog :dialogVisible="passNoShow" title="任务审批" size="tiny" @change="dialogChange" :okFn="confirmNoPass">
            <span>确认该任务未通过审核</span>
        </sysDialog>
    </div>
</template>
<script>
    import formComp from 'components/Form/index'
    import tableComp from 'components/Table/'
    import sysDialog from 'components/common/dialog'
    import { mapGetters } from 'vuex'
    import { getApproverInfo, setStatus } from 'api/system/taskAgree.js'
    import taskApprove from './taskAgreeConfig/taskApprove'
    import selectFun from './taskAgreeConfig/selectFun'
    import targetNum from './taskAgreeConfig/targetNum'
    import areaRanger from './taskAgreeConfig/areaRanger'
    import keyWord from './taskAgreeConfig/keyWord'
    import frameCom from 'components/monitor/frame'
    export default {
        name: 'taskAgree',
        data () {
            const me = this;
            return {
                passYesShow: false,
                passNoShow: false,
                titleData: ['任务审批', '功能配置', '目标号码', '区域范围', '审批人'],
                agreeData: {
                    approverStatus: '',
                    approvalId: '',
                    taskBaseId: ''
                    // dialogShow: false
                },
                formObj: {
                    approverStatus: '',
                    approvalId: '',
                    taskBaseId: ''
                },
                taskName: '',
                approverStatus: '',
                taskId: '',
                listData: {},
                dialogShow: true,
                // activeName: 'firstTab',
                // ownerProp: '',
                searchOpt: {
                    approverStatus: '1',
                    greenChannel: '0',
                    rows: 10,
                    page: 1
                },
                formOpt: {
                    // form 表单true横排，false竖排
                    inline: true,
                    btnPos: 'center',
                    // 表单项
                    items: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '通过',
                                disabled: false,
                                click: function () {
                                    me.passYesShow = true;
                                }
                            }
                        },
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '未通过',
                                disabled: false,
                                click: function () {
                                    me.passNoShow = true;
                                }
                            }
                        }
                    ]
                },
                tableOpt: {
                    // 不设置width ，默认自适应
                    listLoading: false,
                    // 是否为斑马纹 table
                    stripe: false,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '审批人', value: 'approver', align: 'center' },
                        { name: '审批时间', value: 'approverTime', align: 'center' },
                        { name: '审批状态', value: 'approverStatus', align: 'center' }
                    ],
                    data: [],
                    // 是否分页
                    pagination: false,
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                }
            }
        },
        computed: {
            tableSize () {
                return {
                    height: Math.floor((this.vsHeight - 180) / 4)
                }
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            })
        },
        created () {
            let passData = this.$route.params;
            if (!localStorage.getItem('taskId')) {
                localStorage.setItem('taskId', passData.taskId);
                this.taskId = passData.taskId;
            } else {
                this.taskId = localStorage.getItem('taskId');
            }

            if (!localStorage.getItem('approvalId')) {
                localStorage.setItem('approvalId', passData.approvalId);
            } else {
                passData.taskId = localStorage.getItem('taskId');
            }
            if (!localStorage.getItem('taskBaseId')) {
                localStorage.setItem('taskBaseId', passData.taskBaseId);
            } else {
                passData.taskBaseId = localStorage.getItem('taskBaseId');
            }
            if (localStorage.getItem('approverStatus') === null) {
                localStorage.setItem('approverStatus', passData.approverStatus);
            } else {
                passData.approverStatus = localStorage.getItem('approverStatus');
            }
            this.listData = passData.listData;
            this.agreeData.approvalId = passData.approvalId;
            this.agreeData.taskBaseId = passData.taskBaseId;
            this.agreeData.approverStatus = Number(passData.approverStatus);
            this.formObj = _.cloneDeep(this.agreeData)
            // 2是 审批未通过，3 审批已通过 时禁用 通过 未通过 按钮
            if (this.agreeData.approverStatus === 3 || this.agreeData.approverStatus === 2) {
                this.formOpt.items[0].comOpt.disabled = true;
                this.formOpt.items[1].comOpt.disabled = true;
            }
        },
        mounted() {
            this.getApproverData()
        },
        beforeDestroy () {
            localStorage.removeItem('taskId')
            localStorage.removeItem('approvalId')
            localStorage.removeItem('taskBaseId')
            localStorage.removeItem('approverStatus')
        },
        components: { formComp, tableComp, sysDialog, taskApprove, selectFun, targetNum, areaRanger, keyWord, frameCom },
        methods: {
            // 获取审批人表格数据
            async getApproverData () {
                this.tableOpt.data = []
                let resp = await getApproverInfo({
                    taskBaseId: this.taskId.slice(1)
                });
                if (resp) {
                    this.tableOpt.data = _.cloneDeep(resp.rows);
                    this.tableOpt.data.forEach(item => {
                        if (item.approverStatus === 2) {
                            item.approverStatus = '未通过'
                        } else if (item.approverStatus === 3) {
                            item.approverStatus = '通过'
                        }
                    })
                }
            },
            async setStatus () {
                let resp = await setStatus(this.formObj);
                if (resp && this.formObj.approverStatus === '3') {
                    this.$message({
                        type: 'success',
                        message: '审批通过'
                    })
                    this.$router.go(-1)
                } else if (resp && this.formObj.approverStatus === '2') {
                    this.$message({
                        type: 'warning',
                        message: '审批未通过'
                    })
                }
            },
            agreeClick () {
                this.dialogShow = true;
            },
            dialogChange (val) {
                this.dialogShow = val;
                this.passYesShow = val;
                this.passNoShow = val;
                // this.activeName = 'firstTab';
            },
            confirmPass () {
                this.getPass();
            },
            confirmNoPass () {
                this.getPassNo();
            },
            getPass () {
                this.formObj.approverStatus = '3';
                this.setStatus();
                this.passYesShow = false;
            },
            getPassNo () {
                this.formObj.approverStatus = '2';
                this.setStatus();
                this.passNoShow = false;
            }
        }
    }
</script>
<style scoped>
    .box {
        border: 1px solid rgb(71, 130, 209);
        padding: 20px 10px;
    }
    @component-namespace ga {
        @b taskAgree {
            overflow: auto;
            color:rgba(162,238,255,1);
            padding: 0 12px !important;
            @e title{
                font-size: 14px;
                height:24px;
                line-height:24px;
                margin-top: 6px;
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
            @e marginTop0{
                margin-top:0;
            }
            @e formWrap{
                text-align: center;
                /*position: absolute;*/
                /*bottom: -5px;*/
                /*left: 50%;*/
                /*margin-left: -77px;*/
                /* display: flex;
                justify-content: center; */
            }
        }
    }
</style>
