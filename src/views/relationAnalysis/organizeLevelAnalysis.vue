 <template>
    <div style="width: 100%;height: 100%">
        <div class='ga-select'>
            <buttonComp :option="btnOpt"></buttonComp>
        </div>
        <!-- 目标选择弹出框 -->
        <bookSMSQueryDialog size="small" title="目标选择" :okFn="okFn" :cancleFn="cancleFn" :dialogVisible="popShow">
            <el-row>
                <el-col :span="24">
                    <p>请选择善心会检测任务目标团伙组织层级分析所需要的目标号码</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <bookSMSQueryTable :option="tableOptTarget" :comSize="tableTargetSize" @handleSelectionChange="handleSelectionChange"></bookSMSQueryTable>
                </el-col>
            </el-row>
        </bookSMSQueryDialog>
        <!-- 主要内容 -->
        <div class='ga-mainContent'>
            <!--左侧下拉列表-->
            <el-row>
                <el-col :span="8" id="leftTable">
                    <div class='ga-mainContent__leftTable' ref="popLeftTable">
                        <div class="ga-mainContent__leftTable--moniTar">
                            组织(个)
                        </div>
                        <div :class="leftToggleIcon" @click="leftToggle"></div>
                        <div class="nxPolice-table">
                            <bookSMSQueryTable :option="leftTableOpt" v-show="leftTableToggle" :comSize="comSizeLeft"></bookSMSQueryTable>
                        </div>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class='ga-mainContent__grafShow'>
                        <div id="grafShow"></div>
                    </div>
                    <!--<div v-if="cover" @click="cancelDialog" style="position: fixed;top: 0; right: 0; bottom: 0;left: 0;opacity: 1">-->
                    <!--</div>-->
                    <div v-show="lineDialog" id="lineDialog" class="ga-mainContent__lineDialog">
                        <el-row class="ga-mainContent__lineDialog--title">
                            <el-col :span="23">
                                {{lineDialogMsg}}
                            </el-col>
                            <el-col :span="1">
                                <button class="ga-mainContent__lineDialog--close" @click="closeDialog">&#10005</button>
                            </el-col>
                        </el-row>
                        <el-row class="ga-mainContent__lineDialog--table">
                            内容
                        </el-row>
                    </div>
                    <!-- 节点点击弹出框 -->
                    <div v-show="nodeDialog" id="nodeDialog" class="ga-mainContent__nodeDialog">
                        我是节点点击事件
                        <!--<el-row class="ga-inTimeAppAnalysis__appDialog&#45;&#45;title">-->
                        <!--<el-col :span="23">-->
                        <!--{{treeMapTitle}}使用详情（共使用{{treeMapUsageCounter}}次）-->
                        <!--</el-col>-->
                        <!--<el-col :span="1">-->
                        <!--<button class="ga-inTimeAppAnalysis__appDialog&#45;&#45;close" @click="closeDialog">&#10005</button>-->
                        <!--</el-col>-->
                        <!--</el-row>-->

                        <!--<el-row class="ga-inTimeAppAnalysis__appDialog&#45;&#45;table">-->
                        <!--<tableComp :option="treeMapTableOpt" :comSize="{height: 120}"></tableComp>-->
                        <!--</el-row>-->
                    </div>
                </el-col>
            </el-row>
        </div>
        <!--<div v-if="cover" @click="cancelDialog" style="position: fixed;top: 0; right: 0; bottom: 0;left: 0;opacity: 1">-->
        <!--</div>-->
    </div>
</template>

<script>
    import axios from 'axios'
    import buttonComp from 'components/Form/button'
    import bookSMSQueryTable from 'components/Table'
    import bookSMSQueryDialog from 'components/common/dialog'
    import { getTargetist } from 'api/relationAnalysis/orgLevelAnalysis'
    import { mapGetters } from 'vuex'
    export default {
        name: 'targetMsgSeach',
        data () {
            const me = this;
            return {
                leftTable: 0,
                tree: {},
                popShow: false,
                leftTableToggle: false,
                lineDialog: false,
                lineDialogMsg: '',
                nodeDialog: false,
                cover: false,
                leftToggleIcon: 'ga-mainContent__leftTable--topIcon',
                formBookObj: {
                    goalOwner: ''
                },
                orgUrl: '',
                orgData: {},
                btnOpt: {
                    id: 'btn1',
                    value: '目标选择',
                    disabled: false,
                    click: function () {
                        me.popShow = !me.popShow;
                        me.getTargetContent();
                    }
                },
                tableOptTarget: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '手机号', value: 'goalMsisdn', width: 140, align: 'center' },
                        { name: '卡号', value: 'goalIMSI', width: 120, align: 'center' },
                        { name: '机身码', value: 'goalIMEI', width: 120, align: 'center' },
                        { name: '用户名', value: 'goalName', align: 'center' },
                        { name: '', value: 'selection', align: 'center' }
                    ],
                    data: []
                },
                tableTargetSize: {
                    height: 350
                },
                leftTableOpt: {
                    width: 330,
                    listLoading: false,
                    // 	是否为斑马纹 table
                    stripe: false,
                    column: [
                        // 首列是否显示序号、复选框index/selection
                        { name: '序号', value: 'index', width: 70, align: 'center' },
                        { name: '组织描述', value: 'msisdn', width: 180, align: 'center' },
                        { name: '人数', value: 'num', width: 80, align: 'center' }
                    ],
                    data: [
                        { groupId: 'org1', msisdn: '赵大团伙1', num: '20' },
                        { groupId: 'org2', msisdn: '赵大团伙2', num: '20' },
                        { groupId: 'org3', msisdn: '赵大团伙3', num: '20' },
                        { groupId: 'org4', msisdn: '赵大团伙4', num: '20' },
                        { groupId: 'org5', msisdn: '赵大团伙5', num: '20' }
                    ],
                    // 是否分页
                    pagination: false,
                    // 分页参数
                    pageOpt: {
                        total: 100,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    },
                    rowClick: function (row) {
                        console.log(row);
                        me.fetchData();
//                        me.orgData = {};
                        if (row.groupId === 'org1') {
                            me.orgData = me.orgUrl.data[0]
                        } else if (row.groupId === 'org2') {
                            console.log(222);
                            me.orgData = me.orgUrl.data[1];
                            console.log(me.orgData);
                        } else if (row.groupId === 'org3') {
                            console.log(333);
                            me.orgData = me.orgUrl.data[2];
                            console.log(me.orgData);
                        } else {
                            me.orgData = me.orgUrl.data[3]
                        }
                        me.tree.changeData(me.orgData);
                        me.tree.autoSize();
                    }
                },
                comSizeLeft: 350
            }
        },
        methods: {
            cancelDialog () {
//                this.cover = false;
//                this.lineDialog = false;
//                this.nodeDialog = false;
            },
//            确认函数
            okFn () {
                this.popShow = false;
            },
            cancleFn () {
                this.popShow = false
            },
            handleSelectionChange (val) {
                console.log(val);
            },
            //            左侧表格切换
            leftToggle () {
                let leftTable = this.$refs.popLeftTable;
                if (!this.leftTableToggle) {
                    $(leftTable).animate({ height: '350px' });
                    this.leftTableToggle = true;
                    this.leftToggleIcon = 'ga-mainContent__leftTable--bottomIcon'
                } else {
                    $(leftTable).animate({ height: '35px' });
                    this.leftTableToggle = false;
                    this.leftToggleIcon = 'ga-mainContent__leftTable--topIcon'
                }
            },
//            线点击事件弹框显示
            lineDialogShow (val, x, y) {
                this.lineDialogMsg = val;
                this.lineDialog = true;
                let w = this.leftTable;
                $('#lineDialog').css(
                    {
                        'left': x + w - 390, 'top': y
                    }
                );
                this.cover = true;
            },
//            节点点击事件弹框显示
            nodeDialogShow (x, y) {
                this.nodeDialog = true;
                let w = this.leftTable;
                $('#nodeDialog').css(
                    {
                        'left': x + w - 390, 'top': y
                    }
                );
                this.cover = true;
            },
            closeDialog () {
                this.lineDialog
            },
//            关系表展示
            async fetchData () {
                this.orgUrl = await axios.get('/static/mock/orgLevelAnalysis.json');
//                console.log(this.orgUrl.data);
//                this.init(this.orgUrl.data[0])
            },
            init () {
                let me = this;
                let tree = new G6.Tree({
                    id: 'grafShow',            // 容器ID
                    height: 600,         // 画布高
                    fitView: 'cc', // 自动缩放
                    layoutFn: G6.Layout.CompactBoxTree,
                    layoutCfg: {
                        direction: 'TB', // 方向（LR/RL/H/TB/BT/V）
                        getHGap: function (/* d */) { // 横向间距
                            return 10;
                        },
                        getVGap: function (/* d */) { // 竖向间距
                            return 50;
                        }
                    }
                });
                tree.source({});
                tree.node()
                    .label(function (obj) {
                        return obj.name;
                    })
                    .style({
                        fillOpacity: 1
                    })
                tree.on('mouseenter', function (ev) {
                    console.log(ev);
                    if (ev.itemType === 'node') {
                        console.log(ev.domX);
                        console.log(ev.domY);
                        me.nodeDialogShow(ev.domX, ev.domY);
                    } else if (ev.itemType === 'edge') {
//                        me.nodeDialog = true;
                        me.lineDialogShow(ev.item._attrs.id, ev.domX, ev.domY);
                    }
                });
                tree.on('mouseleave', function () {
                    me.lineDialog = false;
                    me.nodeDialog = false;
                });
//                tree.edge().shape('smooth');
                return tree;
            },
    //            获取订票短信检测目标列表
            async getTargetContent () {
                this.tableOptTarget.listLoading = true;
                this.formBookObj.goalOwner = this.ownerId;
                let resp = await getTargetist(this.formBookObj);
                if (resp) {
                    this.tableOptTarget.listLoading = false;
                    this.tableOptTarget.data = resp.rows;
                }
            }
        },
        watch: {
            orgData (val) {
                this.orgData = val;
            }
        },
        components: {
            buttonComp,
            bookSMSQueryTable,
            bookSMSQueryDialog
        },
        mounted () {
            this.fetchData();
            this.tree = this.init();
            this.leftTable = $('#leftTable').width()
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'userName': 'global/userName'
            }),
            taskId () {
                return localStorage.getItem('taskId');
            },
            ownerId () {
                return this.taskId ? this.taskId : this.owner;
            }
        }
    }
</script>

<style scoped>
    @component-namespace ga {
        @b mainContent {
            width: 100%;
            height: calc(111% - 70px);
            position: relative;
            /*内容左上方下拉框*/
            @e leftTable {
                display: inline-block;
                position: relative;
                top: 28px;
                left: 0;
                width: 350px;
                height: 35px;
                line-height: 35px;
                color: #ffffff;
                font-size: 14px;
                background-color: #243966;
                padding-left: 10px;
                overflow: hidden;
                opacity: 0.9;
                @m topIcon {
                    background: url("~assets/images/allInterAnalyze/pullDown.png") no-repeat center center;
                    height: 25px;
                    width: 25px;
                    float: right;
                    margin-top: -27px;
                    margin-right: 3px;
                    cursor: pointer;
                }
                @m bottomIcon {
                    background: url("~assets/images/allInterAnalyze/pullUp.png") no-repeat center bottom;
                    height: 25px;
                    width: 25px;
                    float: right;
                    margin-top: -27px;
                    margin-right: 3px;
                    cursor: pointer;
                }
            }
            /*线点击事件框*/
            @e lineDialog {
                position: absolute;
                width: 390px;
                height: 165px;
                z-index: 9999;
                color: #ffffff;
                border: 1px solid #4782D1;
                background-color: #03121F;
                @m title {
                    margin-left: 5px;
                    margin-right: 10px;
                    width: 375px;
                    margin-top: 5px;
                }
                @m table {
                    margin-left: 5px;
                    margin-right: 5px;
                    width: 380px;
                    font-size: 14px;
                }
                @m close {
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    border-radius: 50%;
                    border: none;
                    outline: none;
                    color: #fff;
                    cursor: pointer;
                    background-color: transparent;
                }
                @m close:hover {
                    color: #00a2ff;
                }
            }
            @e nodeDialog {
                position: absolute;
                width: 390px;
                height: 165px;
                z-index: 9999;
                color: #ffffff;
                border: 1px solid #4782D1;
                background-color: #03121F;
                @m title {
                    margin-left: 5px;
                    margin-right: 10px;
                    width: 375px;
                    margin-top: 5px;
                }
                @m table {
                    margin-left: 5px;
                    margin-right: 5px;
                    width: 380px;
                    font-size: 14px;
                }
                @m close {
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    border-radius: 50%;
                    border: none;
                    outline: none;
                    color: #fff;
                    cursor: pointer;
                    background-color: transparent;
                }
                @m close:hover {
                    color: #00a2ff;
                }
            }
        }
    }
</style>
