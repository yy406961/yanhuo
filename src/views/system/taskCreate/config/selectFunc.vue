<template>
    <div class="ga-selectFunc">
        <div class="ga-selectFunc__warnWrap">
            <p class="ga-selectFunc__title">
                <i></i>{{warnTitle}}
                <span class="ga-selectFunc__title--allCheck">
                    <el-checkbox v-model="checkWarnAll"
                        :indeterminate="isWarnInde"
                        :disabled="warnAllDisabled"
                        @change="handleWarnCheckAllChange">全选</el-checkbox>
                </span>
            </p>
            <div class="ga-selectFunc__content">
                <el-checkbox-group v-model="checkedWarnCities" @change="handleWarnCheckedChange">
                    <el-checkbox border v-for="item in citiesWarn"
                        :checked="item.checked" :disabled="item.disabled"
                        :label="item.compKey" :key="item.compKey">{{item.compValue}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <!-- <el-tree :data="warnData"
                        ref="warn"
                        node-key="compKey"
                        :default-checked-keys="editWarnData"
                        show-checkbox=""
                        default-expand-all=""
                        :props="warnProps"
                        @check-change="getWarnArray">
            </el-tree> -->
        </div>
        <div class="ga-selectFunc__FuncWrap" :style="FuncWrapStyle">
            <p class="ga-selectFunc__title">
                <i></i>{{funcTitle}}
                <span class="ga-selectFunc__title--allCheck">
                    <el-checkbox v-model="checkFuncAll"
                        :indeterminate="isFuncInde"
                        :disabled="funcAllDisabled"
                        @change="handleFuncCheckAllChange">全选</el-checkbox>
                </span>
            </p>
            <div class="ga-selectFunc__content">
                <el-checkbox-group v-model="checkedFuncCities" @change="handleFuncCheckedChange">
                    <el-checkbox border v-for="item in citiesFunc"
                        :checked="item.checked" :disabled="item.disabled"
                        :label="item.compKey" :key="item.compKey">{{item.compValue}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <!-- <div class="ga-funcBox"> -->
                <!-- <el-tree :data="funcData"
                            ref="func"
                            node-key="compKey"
                            :props="funcProps"
                            :default-checked-keys="editFuncData"
                            show-checkbox=""
                            default-expand-all=""
                            @check-change="getFuncArray">
                </el-tree> -->
            <!-- </div> -->
        </div>
        <el-row class="ga-btnBox" v-show="operateStatus !== 3">
            <el-col :span="4"
                    :offset="10"
                    style="text-align: center;">
                <el-button type="primary"
                           @click.native="confirm">保存</el-button>
                <!-- <el-button type="primary" @click.native="cancel">取消</el-button> -->
            </el-col>
        </el-row>
    </div>
</template>
<script>
    // -------------------------联调----------------------------
    // import { taskConfInit, taskBaseInfoSave } from 'api/task/taskConfig'
    import { taskBaseInfoSave, taskUpdate, initFunInfoList, initAlaInfoList } from 'api/task/taskConfig'
    import { taskBaseInfoQuery } from 'api/task/taskDetail'
    import square from '@/components/common/square'
    import { mapGetters } from 'vuex'
    export default {
        name: 'taskConfig',
        data () {
            return {
                warnTitle: '目标告警选择',
                funcTitle: '功能选择',
                checkWarnAll: false,
                isWarnInde: false,
                checkedWarnCities: [],
                citiesWarn: [],
                warnAllDisabled: false,
                checkFuncAll: false,
                isFuncInde: false,
                checkedFuncCities: [],
                citiesFunc: [],
                funcAllDisabled: false,
                formData: {
                    taskBaseId: '',
                    functionList: [],   // 功能列表
                    alarmList: []      // 告警列表
                },
                editWarnData: [],   // 修改返回的数据，tree默认选中值
                editFuncData: [],   // 修改返回的功能列表
                taskId: '',
                operateStatus: null,
                approverStatus: ''
            }
        },
        props: ['taskIdProp', 'operateStatusProp', 'approverStatusProp'],
        mounted () {
            this.taskId = this.taskIdProp;
            this.operateStatus = this.operateStatusProp;
            this.approverStatus = this.approverStatusProp;
            // 在配置任务中刷新界面
            if (localStorage.getItem('SFtaskId')) {
                this.taskId = localStorage.getItem('SFtaskId');
            }
            if (localStorage.getItem('operateStatus') !== undefined) {
                this.operateStatus = Number(localStorage.getItem('operateStatus'));
            }
            if (localStorage.getItem('approverStatus') !== undefined) {
                this.approverStatus = Number(localStorage.getItem('approverStatus'));
            }
            if (localStorage.getItem('isAdd') !== undefined) {
                this.formData.isAdd = localStorage.getItem('isAdd')
            }
            // 如果存在ID,将数据赋值并修改
            if (this.operateStatus === 1 || this.operateStatus === 2 || this.operateStatus === 3) {
                this.taskBaseInfoQuery()
            } else {
                this.$emit('KeyWord', true);
                this.$emit('TargetNum', true);
                this.$emit('areaRange', true)
                initFunInfoList().then(resp => {
                    this.citiesFunc = resp.rows
                })
                initAlaInfoList().then(resp => {
                    this.citiesWarn = resp.rows
                })
            }
        },
        methods: {
            handleWarnCheckAllChange(val) {
                let arr = this.citiesWarn.map(item => {
                    if (item.disabled) {
                        return item.compKey
                    }
                })
                arr = arr.filter(item => item)
                this.checkedWarnCities = val ? this.getCheck(this.citiesWarn) : arr;
                this.isWarnInde = false;
            },
            handleWarnCheckedChange(value) {
                let checkedCount = value.length;
                this.checkWarnAll = checkedCount === this.citiesWarn.length;
                this.isWarnInde = checkedCount > 0 && checkedCount < this.citiesWarn.length;
            },
            getCheck(source) {
                let target = []
                source.map(item => {
                    target.push(item.compKey)
                })
                return target
            },
            handleFuncCheckAllChange(val) {
                let arr = this.citiesFunc.map(item => {
                    if (item.disabled) {
                        return item.compKey
                    }
                })
                arr = arr.filter(item => item)
                this.checkedFuncCities = val ? this.getCheck(this.citiesFunc) : arr;
                this.isFuncInde = false;
            },
            handleFuncCheckedChange(value) {
                let checkedCount = value.length;
                this.checkFuncAll = checkedCount === this.citiesFunc.length;
                this.isFuncInde = checkedCount > 0 && checkedCount < this.citiesFunc.length;
            },
            // 功能告警保存
            confirm () {
                // 修改告警模块改变告警配置里的告警类型下拉框的告警类型
                if (localStorage.getItem('SFtaskId')) {
                    this.taskId = localStorage.getItem('SFtaskId')
                }
                if (this.taskId) {
                    if (this.taskId.charAt(0) === 'T') {
                        this.formData.taskBaseId = this.taskId.substr(1)
                    } else {
                        this.formData.taskBaseId = this.taskId
                    }
                }
                this.formData.alarmList = this.getWarnArray(this.checkedWarnCities)
                this.formData.functionList = this.getWarnArray(this.checkedFuncCities)
                if (!this.formData.functionList.length && !this.formData.alarmList.length) {
                    this.$message.warning('请至少选择一个功能或告警！')
                    let isAreaRange = true
                    let isTargetNumOff = true
                    this.$emit('TargetNum', isTargetNumOff);
                    this.$emit('areaRange', isAreaRange)
                    return
                }
                // 点击除了新增以外的按钮（修改，追加）
                if (this.operateStatus !== 0) {
                    // 修改
                    // if (this.operateStatus === 1) {
                    //     this.formData.isAdd = 0
                    //     // 追加
                    // } else if (this.operateStatus === 2) {
                    //     this.formData.isAdd = 1
                    // }
                    if (this.operateStatus === 2) {
                        this.formData.isAdd = 1
                    }
                    taskUpdate(this.formData).then((resp) => {
                        if (resp.status === 201) {
                            this.$message(resp.message)
                            let isKeyWordOff = true
                            let isTargetNumOff = true
                            let isAreaRange = true
                            this.formData.functionList.split(',').map(v => {
                                if (['30001', '30002', '30003', '30004', '30005'].indexOf(v) !== -1) {
                                    isKeyWordOff = false
                                }
                                if (['90001', '90002', '4', '5', '7', '14', '80001', '80002', '80003', '18'].indexOf(v) !== -1) {
                                    isTargetNumOff = false
                                }
                                if (['70004', '90003', '90004'].indexOf(v) !== -1) {
                                    isAreaRange = false
                                    isTargetNumOff = false
                                }
                            })
                            // 只要选择告警，目标号码和区域管理都可用
                            if (this.formData.alarmList.length) {
                                isTargetNumOff = false
                                isAreaRange = false
                            }
                            this.$emit('KeyWord', isKeyWordOff);
                            this.$emit('TargetNum', isTargetNumOff);
                            this.$emit('areaRange', isAreaRange)
                        }
                    })
                } else if (this.operateStatus === 0) {
                    taskBaseInfoSave(this.formData).then((resp) => {
                        if (resp.status === 201) {
                            // localStorage.setItem('SFtaskId', `T${resp.data.taskBaseId}`)
                            let isKeyWordOff = true
                            let isTargetNumOff = true
                            let isAreaRange = true
                            if (this.formData.functionList.length) {
                                this.formData.functionList.split(',').map(v => {
                                    if (['30001', '30002', '30003', '30004', '30005'].indexOf(v) !== -1) {
                                        isKeyWordOff = false
                                    }
                                    if (['90001', '90002', '4', '5', '7', '14',
                                        '80001', '80002', '80003', '18'].indexOf(v) !== -1) {
                                        isTargetNumOff = false
                                    }
                                    if (['70004', '90003', '90004'].indexOf(v) !== -1) {
                                        isAreaRange = false
                                        isTargetNumOff = false
                                    }
                                })
                            }
                            if (this.formData.alarmList.length) {
                                isAreaRange = false
                                isTargetNumOff = false
                            }
                            this.$emit('KeyWord', isKeyWordOff);
                            this.$emit('TargetNum', isTargetNumOff);
                            this.$emit('areaRange', isAreaRange)
                        }
                    })
                }
            },
            // 功能告警查询
            async taskBaseInfoQuery () {
                let resp = await taskBaseInfoQuery({
                    taskBaseId: this.sendTaskId,
                    approverStatus: this.approverStatus
                })
                if (resp) {
                    let funCheckKey = []
                    let alarmCheckKey = []
                    let funTree = []
                    let alarmTree = []
                    let isKeyWordOff = true
                    let isTargetNumOff = true
                    let isAreaRange = true
                    resp.rows.map(v => {
                        if (v.dictType === 'funType' || v.dictType === 'importantArea') {
                            funTree.push({ 'compKey': v.menuId, 'compValue': v.menuName, 'approverStatus': v.approverStatus })
                            if (v.funStatus === '1') {
                                // 将返回的数据中funStatus为1的menuId  push 到数组里，表示已选择的
                                funCheckKey.push(v.menuId)
                            }
                            // 按钮是否可点击
                            if (v.funStatus === '1' && ['30001', '30002', '30003', '30004', '30005'].indexOf(v.menuId) !== -1) {
                                isKeyWordOff = false
                            }
                            if (v.funStatus === '1' && ['90001', '90002', '4', '5', '7', '14',
                                '80001', '80002', '80003', '18'].indexOf(v.menuId) !== -1) {
                                isTargetNumOff = false
                            }
                            if (v.funStatus === '1' && ['70004', '90003', '90004'].indexOf(v.menuId) !== -1) {
                                isTargetNumOff = false
                                isAreaRange = false
                            }
                        } else if (v.dictType === 'alarmType') {
                            alarmTree.push({ 'compKey': v.menuId, 'compValue': v.menuName, 'approverStatus': v.approverStatus })
                            if (v.alarmStatus === '1') {
                                alarmCheckKey.push(v.menuId)
                                isTargetNumOff = false
                                isAreaRange = false
                            }
                        }
                    })
                    this.$emit('KeyWord', isKeyWordOff);
                    this.$emit('TargetNum', isTargetNumOff);
                    this.$emit('areaRange', isAreaRange)
                    if (this.operateStatus === 1 || this.operateStatus === 2) {
                        // this.citiesFunc = funTree.map(item => {
                        //     funCheckKey.map(item1 => {
                        //         // 审批已通过的任务追加后在未提交列表里，此时之前审批过的（功能，告警，区域）不能再操作
                        //         if (item.compKey === item1 && item.approverStatus === 3) {
                        //             item.disabled = true;
                        //         }
                        //     })
                        //     return item;
                        // });
                        this.citiesWarn = this.getDisabled(alarmTree, alarmCheckKey).target
                        this.citiesFunc = this.getDisabled(funTree, funCheckKey).target
                        this.warnAllDisabled = this.getDisabled(alarmTree, alarmCheckKey).bool
                        this.funcAllDisabled = this.getDisabled(funTree, funCheckKey).bool
                        // 操作状态为3是查看，隐藏保存按钮，所有树节点禁用
                    } else if (this.operateStatus === 3) {
                        // this.citiesFunc = funTree.map(item => {
                        //     item.disabled = true;
                        //     return item;
                        // });
                        this.citiesWarn = this.getDisabled(alarmTree).target
                        this.citiesFunc = this.getDisabled(funTree).target
                        this.warnAllDisabled = this.getDisabled(alarmTree).bool
                        this.funcAllDisabled = this.getDisabled(funTree).bool
                    } else {
                        this.citiesFunc = _.cloneDeep(funTree)
                        this.citiesWarn = _.cloneDeep(alarmTree)
                    }
                    this.checkedWarnCities = _.cloneDeep(alarmCheckKey)
                    this.checkedFuncCities = _.cloneDeep(funCheckKey)
                    this.handleWarnCheckedChange(this.checkedWarnCities)
                    this.handleFuncCheckedChange(this.checkedFuncCities)
                    // 勾选已选的树的节点
                    // this.$nextTick(() => {
                    //     this.checkedWarnCities = _.cloneDeep(alarmCheckKey)
                    //     this.checkedFuncCities = _.cloneDeep(funCheckKey)
                    // })
                }
            },
            cancel () {},
            goHome () {
                this.$router.push({
                    path: '/task'
                })
            },
            // 得到disabled
            getDisabled(source1, source2 = []) {
                let target = []
                let bool = false
                source1.forEach((item1, index) => {
                    target.push(item1)
                    if (this.operateStatus === 3) {
                        target[index].disabled = true;
                        bool = true
                    } else {
                        source2.forEach(item2 => {
                            if (item1.compKey === item2 && item1.approverStatus === 3) {
                                target[index].disabled = true;
                            }
                        })
                    }
                });
                return {
                    target: target,
                    bool: bool
                }
            },
            // 警告数组
            getWarnArray (checkArr) {
                // 获得已选ID
                let target = ''
                let chooseData = []
                if (checkArr.length) {
                    // 封装发送数据
                    checkArr.map(val => {
                        chooseData.push(val)
                    })
                    target = chooseData.join(',')
                }
                return target
            }
            // 功能选择数组
            // getFuncArray () {
            //     // 获得已选功能树的ID
            //     let backData = this.$refs.func.getCheckedNodes()
            //     let chooseData = []
            //     if (backData.length) {
            //         backData.map((val) => {
            //             if (val.compKey) {
            //                 chooseData.push(val.compKey)
            //                 this.formData.functionList = chooseData.join(',')
            //             }
            //         })
            //     } else {
            //         this.formData.functionList = ''
            //     }
            // }
        },
        components: {
            square
        },
        computed: {
            ...mapGetters({
                vsHeight: 'global/visualHeight'
            }),
            sendTaskId () {
                if (this.taskId) {
                    if (this.taskId.charAt(0) === 'T') {
                        return this.taskId.substr(1)
                    } else {
                        return this.taskId
                    }
                }
            },
            editFuncDataChecked () {
                return this.editFuncData
            },
            FuncWrapStyle() {
                let wranRows = Math.ceil(this.citiesWarn.length / 5)
                let marginHeight = wranRows > 0 ? wranRows * 6 : 6
                let wranHeight = wranRows * 36 + marginHeight + 24 + 32 + 12
                let height = this.vsHeight - wranHeight - 140
                return { height: height + 'px' }
            }
        },
        watch: {
            operateStatus (val) {
                if (val === 0) {
                    this.$emit('KeyWord', true);
                    this.$emit('TargetNum', true);
                    this.$emit('alarmConfig', true);
                    this.$emit('areaRange', true)
                    this.$emit('importantArea', true)
                    initFunInfoList().then(resp => {
                        this.citiesFunc = resp.rows
                    })
                    initAlaInfoList().then(resp => {
                        this.citiesWarn = resp.rows
                    })
                }
            },
            taskId (val) {
                this.taskId = val;
                // operateStatus: 操作状态 1修改  2 追加  3 查看
                if (this.operateStatus === 1 || this.operateStatus === 2 || this.operateStatus === 3) {
                    this.taskBaseInfoQuery()
                } else {
                    this.$emit('KeyWord', true);
                    this.$emit('TargetNum', true);
                    this.$emit('alarmConfig', true);
                    this.$emit('areaRange', true)
                    this.$emit('importantArea', true)
                    initFunInfoList().then(resp => {
                        this.citiesFunc = resp.rows
                    })
                    initAlaInfoList().then(resp => {
                        this.citiesWarn = resp.rows
                    })
                }
            },
            backAlaList (val) {
                this.citiesWarn = val
            },
            backFuncList (val) {
                this.citiesFunc = val
            },
            taskIdProp (val) {
                if (val) {
                    if (val.charAt(0) === 'T') {
                        this.taskId = val.substr(1)
                    } else {
                        this.taskId = val
                    }
                }
            }
        }
    }
</script>
<style>
    @component-namespace ga {
        @b selectFunc{
            color:rgba(162,238,255,1);
            padding:0 12px;
            @e warnWrap{

            }
            @e FuncWrap{
                margin-top:12px;
            }
            @e title{
                height: 32px;
                line-height: 32px;
                font-size: 14px;
                i{
                    display:inline-block;
                    width:4px;
                    height:20px;
                    margin-right:12px;
                    position: relative;
                    top: 6px;
                    background: rgba(0,170,255,1);
                }
                @m allCheck{
                    margin-left: 12px;
                }
            }
            @e content{
                padding:12px 0;
            }
        }
        @b btnBox {
            margin-top: 20px;
        }
        @b funcBox {
            height: 300px;
            overflow-y: scroll;
        }
    }
</style>
