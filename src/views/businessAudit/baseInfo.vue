<template>
    <div :style="mainHeight" class="ga-businessBasic">
        <div class="ga-businessBasic__top">
            <p class="ga-configBasic__title"><i></i>基本信息</p>
            <span class="ga-businessBasic__topLable">任务名称</span>
            <span class="ga-businessBasic__topValue">{{ baseInfo.taskName }}</span>
            <span class="ga-businessBasic__topLable">开始时间</span>
            <span class="ga-businessBasic__topValue">{{ baseInfo.beginTime }}</span>
            <span class="ga-businessBasic__topLable">结束时间</span>
            <span class="ga-businessBasic__topValue">{{ baseInfo.endTime }}</span>
            <span class="ga-businessBasic__topLable">任务创建时间</span>
            <span class="ga-businessBasic__topValue">{{ baseInfo.taskCreateTime }}</span>
            <span class="ga-businessBasic__topLable">任务状态</span>
            <span class="ga-businessBasic__topValue">{{ baseInfo.taskStatus }}</span>
            <span class="ga-businessBasic__topLable">任务管理员</span>
            <span class="ga-businessBasic__topValue">{{ baseInfo.owner }}</span>
            <span class="ga-businessBasic__topLable">任务审批人</span>
            <span class="ga-businessBasic__topValue">{{ baseInfo.approver }}</span>
            <span class="ga-businessBasic__topLable">任务使用人</span>
            <span class="ga-businessBasic__topValue">{{ baseInfo.taskUser }}</span>
        </div>
        <div class="ga-configBasic__table">
            <p class="ga-configBasic__title"><i></i>审批信息</p>
            <tableDemo :option="tableOpt"
                        :comSize="comSize"
                        @handleCurrentPageChange="handleCurrentPageChange"
                        @handleSizePageChange = "handleSizePageChange"></tableDemo>
        </div>
        <div class="ga-businessBasic__bottom">
            <p class="ga-businessBasic__title"><i></i>任务功能</p>
            <p class="ga-businessBasic__bottomTitle">
                <span class="ga-businessBasic__topLable">目标号码</span>
                <span class="ga-businessBasic__topValue">{{ baseInfo.taskTargetCount }}个</span>
                <span class="ga-businessBasic__topLable">目标区域</span>
                <span class="ga-businessBasic__topValue">{{ baseInfo.taskAreaCount }}个</span>
            </p>
            <ul class="ga-businessBasic__funUl">
                <li v-for="item in funList" :key="item.menuId">{{item.menuName}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import tableDemo from 'components/Table'
    import checkboxComp from 'components/Form/checkbox'
    import formSelect from 'components/Form'
    import { taskFun, approvalInfo } from 'api/businessAudit'
    import { mapGetters } from 'vuex'
    export default {
        name: '',
        props: {
            // 'operateStatusProp', 'taskIdProp', 'approverStatusProp'
        },
        data () {
            return {
                // 基本信息
                baseInfo: {},
                //  任务功能
                funList: [],
                comSize: {},
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '批准文号', value: 'fileNo', align: 'center', tooltip: true },
                        { name: '批准人/单位', value: 'approvalUnit', align: 'center', tooltip: true },
                        { name: '批准时间', value: 'approvalTime', width: 150, align: 'center' }
                        // { name: '审批状态', value: 'imsi', align: 'center' }
                    ],
                    data: [],
                    pagination: true,
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                },
                formObj: {
                    page: 1,
                    rows: 10,
                    approverStatus: 0,
                    taskBaseId: ''
                }
            }
        },
        created () {
            // 在配置任务中刷新界面
            if (localStorage.getItem('businessAudit')) {
                let item = localStorage.getItem('businessAudit')
                this.baseInfo = JSON.parse(item)
            }
            if (localStorage.getItem('taskId')) {
                this.formObj.taskBaseId = localStorage.getItem('taskId').slice(1);
            }
            this.fetchTaskFun()
            this.fetchData()
        },
        mounted () {
            this.comSize = {
                height: this.vsHeight - 200 - 240
            }
        },
        methods: {
            // 查询任务功能
            async fetchTaskFun () {
                let resp = await taskFun({ taskBaseId: this.formObj.taskBaseId, approverStatus: 0 })
                if (resp) {
                    let { rows } = resp
                    let funArr = []
                    let alarmArr = []
                    rows.map(item => {
                        if (item.dictType === 'funType' || item.dictType === 'importantArea') {
                            if (item.funStatus === '1') {
                                funArr.push(item)
                            }
                        } else if (item.dictType === 'alarmType') {
                            if (item.alarmStatus === '1') {
                                alarmArr.push(item)
                            }
                        }
                    })
                    this.funList = funArr.concat(alarmArr)
                }
            },
            async fetchData () {
                this.tableOpt.data = [];
                this.tableOpt.listLoading = true;
                let resp = await approvalInfo(this.formObj);
                if (resp) {
                    // resp.rows.forEach((item) => {
                    //     if (+item.taskStatus === 1) {
                    //         item.taskStatus = '在控'
                    //     } else if (+item.taskStatus === 2) {
                    //         item.taskStatus = '中止'
                    //     } else if (+item.taskStatus === 3) {
                    //         item.taskStatus = '过期'
                    //     }
                    // })
                    this.tableOpt.data = resp.rows;
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
            handleCurrentPageChange (val) {
                this.formObj.page = val;
                this.fetchData();
            },
            handleSizePageChange (val) {
                this.formObj.rows = val;
                //                备注：是否跳回第一页
                this.formObj.page = 1;
                this.tableOpt.pageOpt.currentPage = 1;
                this.fetchData();
            }
        },
        components: {
            checkboxComp,
            tableDemo,
            formSelect
        },
        computed: {
            tableHeight () {
                return this.vsHeight - 400
            },
            mainHeight () {
                return {
                    overflow: 'auto',
                    height: this.vsHeight - 90 + 'px'
                }
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            })
        },
        watch: {
            // taskId () {
            //     this.fetchTaskFun()
            //     this.fetchData()
            // }
        }
    }
</script>
<style lang="postcss" scoped>
    @component-namespace ga {
        @b businessBasic {
            color:rgba(162,238,255,1);
            padding: 0 6px;
            @e left {
                text-align: left;
                text-indent: 15px;
            }
            @e top{
                margin-top:-6px;
                margin-bottom: 6px;
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
            @e topLable{
                padding-right:6px;
                color:rgba(162,238,255,0.75);
            }
            @e topValue{
                padding-right:12px;
                color:rgba(162,238,255,1);
            }
            @e bottom{
                height: 240px;
                overflow-y: auto;
            }
            @e bottomTitle{
                margin-bottom:6px;
            }
            @e funUl{
            li{
                float: left;
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
                &:nth-child(n+7){
                    margin-top:12px;
                }
            }
        }
        }
        @b warnConfigBox {
            margin-top: 10px;
        }
    }

</style>
