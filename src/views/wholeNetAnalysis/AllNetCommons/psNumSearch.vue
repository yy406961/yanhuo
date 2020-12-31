<template>
    <div class="ga-psNum">
        <div class='ga-psNum__searchCondition unOpacity'>
            <formComp :option='searchConditionOpt' ref="searchForm" style="margin: 3px 0px"></formComp>
        </div>
        <div class='ga-psNum__mainContent'>
            <gis :option="mapData"
                 :part="part">
            </gis>
            <div class="ga-psNum__mainContent--right"
                 ref="popRightTable"
                 v-if="rightContent">
                <el-row style="background-color: rgba(9,94,179,0.8);color: #fff;">
                    <!--title-->
                    <el-col :span="20"
                            :offset="1">
                        <span>基本信息</span>
                        <!--<span>&nbsp;{{rightBaseData.name}} {{rightBaseData.msisdn}}</span>-->
                    </el-col>
                    <!--折叠按钮-->
                    <el-col :span="2"
                            style="cursor: pointer;">
                        <div @click="rightToggleShow">
                            <div :class="[isRightToggle ? 'arrowDown' : 'arrowUp']"></div>
                        </div>
                    </el-col>
                </el-row>
                <!---->
                <el-row style="height: 153px;background-color: rgba(0,0,0,0.7);">
                    <el-col :span="22" :offset="1" class="ga-title">
                        <!--<el-row>-->
                            <!--<span></span>位置信息-->
                        <!--</el-row>-->
                    </el-col>
                    <div class="nxPolice-table">
                        <!--<div v-loading="rightTableLoading" style="position: absolute;top: 59%;left: 45%"></div>-->
                        <tableComp :option="rightTableOpt" :comSize="{height: 130}"></tableComp>
                    </div>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import tableComp from 'components/Table'
    import formComp from 'components/Form'
    import gis from './mapPsNum.vue'
    import { getNationPsNumData, getPartPsNumData } from 'api/allNetAnalyze/psNumQuery'
    export default {
        data () {
            let me = this;
            return {
                rightContent: false,
                searchObj: {
                    condition: '',
                    conditionVal: ''
                },
                mapData: {},
                //      查询条件
                selectConditions: [
                    { name: '机身码', value: 'imei' },
//                    { name: '请选择查询条件', value: '' },
                    { name: '目标号码', value: 'msisdn' },
                    { name: '卡号', value: 'imsi' }
                ],
                //      所选查询条件
                selectCondition: '',
                //      所选查询条件 值
                selectConditionVal: '',
                //      placeholder
                searchPlaceholder: '',
                searchConditionOpt: {
                    inline: true,
                    labelPos: 'left',
                    labelWidth: '80',
                    items: [{
                        label: '',
                        type: 'select',
                        comOpt: {
                            id: 'searchConditions',
                            value: 'imei',
                            disabled: false,
                            data: [],
                            width: 150,
                            change (val) {
                                me.selectCondition = val;
                            }
                        }
                    }, {
                        label: '',
                        type: 'text',
                        comOpt: {
                            id: 'searchCondition',
                            placeholder: '请输入机身码',
                            disabled: false
                        }
                    }, {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '查询',
                            disabled: false,
                            click () {
                                let isCorrect = me.judgeCondition()
                                let param = me.searchObj;
                                if (isCorrect) {
                                    me.rightTableOpt.listLoading = true;
                                    me.searchData(param);
                                }
                            }
                        }
                    }]
                },
                //      是否折叠
                isRightToggle: true,
                //      右 表格
                rightTableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '姓名', value: 'name', width: 140, align: 'center', tooltip: true },
                        { name: '手机号', value: 'msisdn', width: 140, align: 'center' },
                        { name: '机身码', value: 'imei', width: 140, align: 'center' },
                        { name: '卡号', value: 'imsi', widht: 140, align: 'center' }
                    ],
                    data: [],
                    pagination: false
                }
            }
        },
        props: ['part', 'owner'],
        created () {
            this.searchConditionOpt.items[0].comOpt.data = this.selectConditions;
        },
        mounted () {
        },
        watch: {
//            监听查询条件
            'selectCondition' (val) {
                if (val === 'msisdn') {
                    this.searchPlaceholder = '请输入目标号码'
                } else if (val === 'imei') {
                    this.searchPlaceholder = '请输入机身码'
                } else if (val === 'imsi') {
                    this.searchPlaceholder = '请输入卡号'
                } else if (val === '') {
                    this.searchPlaceholder = '请选择查询条件'
                }
            },
            'searchPlaceholder' (val) {
                this.searchConditionOpt.items[1].comOpt.placeholder = val;
            }
        },
        methods: {
            async dynamicInterface (nation, part, args) {
                if (this.part === 'nation') {
                    return await nation(args);
                } else {
                    if (part !== '' || part !== null) {
                        return await part(args);
                    }
                }
            },
            //  查询条件判断
            judgeCondition () {
                let condition = this.$refs.searchForm.getValue().searchConditions;
                let conditionVal = this.$refs.searchForm.getValue().searchCondition;
                let me = this;
                let conditionTest;
                function rule (val) {
                    if (conditionTest.test(conditionVal)) {
                        return true;
                    } else {
                        me.$message({
                            type: 'warning',
                            message: '请输入正确的' + val
                        })
                        return false;
                    }
                }
                if (condition !== '') {
                    this.searchObj.condition = this.selectCondition
                    this.searchObj.conditionVal = condition;
                    if (conditionVal !== '') {
                        if (condition === 'msisdn') {
                            conditionTest = /^1[3,4,5,7,8]\d{9}$/;
                            return rule('手机号')
                        } else if (condition === 'imei') {
                            conditionTest = /^\d{15,17}$/;
                            return rule('机身码')
                        } else if (condition === 'imsi') {
                            conditionTest = /^\d{15,16}$/;
                            return rule('卡号')
                        }
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '号码不能为空'
                        })
                        return false;
                    }
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请选择查询条件'
                    })
                    return false;
                }
            },
            searchData (param) {
                let me = this;
                me.rightContent = true;
                this.dynamicInterface(getNationPsNumData, getPartPsNumData, param).then((resp) => {
                    if (resp && resp.rows) {
                        me.rightTableOpt.listLoading = false;
                        me.rightTableOpt.data = resp.rows;
                        me.dealTableData(resp.rows);
                    } else {
                        console.log('查询失败/数据返回失败')
                    }
                })
            },
//            处理表格数据 给地图 传数据
            dealTableData (data) {
                let mapData = [];
                for (let i in data) {
                    let { name, msisdn, imei, longtitude, latitude, imsi, lastLocation, userTime } = data[i];
                    let point = { longtitude, latitude }
                    mapData.push({ name, msisdn, imei, point, imsi, lastLocation, userTime })
                }
                this.mapData = {
                    info: mapData
                }
            },
            // 右侧 折叠 按钮
            rightToggleShow () {
                let tab = $('.ga-psNum__mainContent--right');
                this.isRightToggle = !this.isRightToggle;
                if (tab.height() > 50) {
                    tab.animate({
                        'height': '28px'
                    });
                    this.rightTableOpt.listLoading = false
                } else {
                    tab.animate({
                        'height': '158px'
                    });
//                    if (!this.rightTableOpt.data.length) {
//                        this.rightTableOpt.listLoading = true
//                    }
                }
            }
        },
        components: {
            tableComp,
            formComp,
            gis
        }
    }
</script>

<style scoped lang="postcss">
    @media only screen and (min-width: 1440px) {
        .ga-psNum__mainContent {
            width: 103%;
            // height: calc(105% - 70px);
            height:101%;
            position: relative;
            top: -5%;
            left:-12px;
        }
    }
    @media only screen and (max-width: 1440px) {
        .ga-psNum__mainContent {
            width: 103%;
            height:101%;
            // height: calc(107% - 70px);
            position: relative;
            top: -5%;
            left:-12px;
        }
    }
    .arrowDown {
        background: url("~assets/images/warning/arrow.png") no-repeat center;
        background-size: 100% 100%;
        background-origin: content-box;
        height: 26px;
        width: 26px;
        cursor: pointer;
    }
    .arrowUp {
        background: url("~assets/images/warning/arrow.png") no-repeat center;
        background-size: 100% 100%;
        background-origin: content-box;
        height: 26px;
        width: 26px;
        margin-right: 6px;
        cursor: pointer;
        transform:rotate(180deg);
        -moz-transform:rotate(180deg);
        -webkit-transform:rotate(180deg);
        -o-transform:rotate(180deg);
    }
    @component-namespace ga {
        @b psNum {
            /*查询*/
            height:100%;
            width:100%;
            position: relative;
            top:-30px;
            @e searchCondition {
                width: 100%;
                position: relative;
                z-index: 11;
                left: 1px;
                top:20px;
            }
            /*下方内容样式*/
            @e mainContent {
                @m right {
                    box-shadow: 3px 1px 3px rgba(0,0,0,0.3);
                    display: inline-block;
                    position: absolute;
                    padding:0 0 25px 0 ;
                    font-size: 14px;
                    overflow: hidden;
                    z-index: 555;
                    // right: 15px;
                    right:24px;
                    top: 20px;
                    width: 560px;
                    height: 158px;
                    border-bottom-left-radius: 18px;
                    & span {
                        color: #fff;
                    }
                    @m location {
                        height: 153px;
                        background-color: rgba(0,0,0,0.7);
                    }
                }
            }
        }
    }
</style>
