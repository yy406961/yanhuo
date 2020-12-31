<template>
    <div :style="mainHeight">
        <div class="ga-warnConfigBox__formBox">
            <div  class="ga-warnConfigBox__leftForm">
                <div class="ga-warnConfigBox__formWrap">
                    <span class="ga-warnConfigBox__formLabel">任务名称</span>
                    <span class="ga-warnConfigBox__formInner">
                <el-input placeholder="请输入任务名称"
                          v-model="formData.taskName"
                          :disabled="operateStatus === 2 || approverStatus === 3 || operateStatus === 3 || operateStatus === 4"></el-input>
            </span>
                </div>
                <div class="ga-warnConfigBox">
                    <formSelect :option='formOpt'
                                ref="form"></formSelect>
                </div>
                <div class="ga-warnConfigBox__formWrap">
                    <span class="ga-warnConfigBox__formLabel">任务使用人</span>
                    <span class="ga-warnConfigBox__formInner">
                <el-select v-model="formData.taskUser"
                           placeholder="任务使用人"
                           multiple
                           :disabled="operateStatus === 3 || operateStatus === 4">
                    <el-option v-for="item in taskUser"
                               :key="item.userId"
                               :label="item.userNick"
                               :value="item.userId">
                        {{item.userNick}}
                    </el-option>
                </el-select>
            </span>
                </div>
            </div>
            <div class="ga-warnConfigBox__rightForm">
                <formSelect :option='approvalFormOpt'
                            ref="approvalPerson"></formSelect>
            </div>
        </div>
        <el-row class="ga-warnConfigBox">
            <el-col :span="24">
                <el-table :data="approveData"
                          style="width: 100%"
                          :height="tableHeight">
                    <el-table-column align="center"
                                     label="序号"
                                     width="80">
                        <template slot-scope="scope">
                            <span>{{scope.row.id}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center"
                                     prop="fileNo"
                                     label="批准文号"
                                     width="120">
                        <template slot-scope="scope">
                            <span>{{ scope.row.fileNo }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center"
                                     prop="approvalUnit"
                                     label="批准人/单位">
                        <template slot-scope="scope">
                            <span>{{ scope.row.approvalUnit }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center"
                                     prop="approvalTime"
                                     label="批准时间">
                        <template slot-scope="scope">
                            <span>{{ scope.row.approvalTime }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <formSelect :option="approvalList"
                    ref="approval"></formSelect>
        <el-row class="ga-warnConfigBox" v-show="operateStatus !== 2">
            <el-col :span="2">
                <checkboxComp :option="checkOption"></checkboxComp>
            </el-col>
            <el-col :span="2" v-show="Number(greenChannel)">领导签字</el-col>
            <el-col :span="2" v-show="Number(greenChannel)">
                <el-input v-model="formData.taskSign"></el-input>
            </el-col>
        </el-row>
        <el-row class="ga-btnBox" v-show="operateStatus !== 3">
            <el-col :span="4"
                    :offset="10"
                    style="text-align: center;">
                <el-button type="primary"
                           @click.native="confirm">保存</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import checkboxComp from 'components/Form/checkbox'
import formSelect from 'components/Form'
import { taskBaseInfoSave, taskUpdate, taskBaseQuery, delayTask } from 'api/task/taskConfig'
import { userQuery } from 'api/task/taskCreate'
import { mapGetters } from 'vuex'
import { forbiddenDate } from 'utils'
import { ajax } from 'common'

let yesterDay1 = new Date().getTime() - 24 * 60 * 60 * 1000
export default {
    name: '',
    props: ['operateStatusProp', 'taskIdProp', 'approverStatusProp'],
    data () {
        let me = this
        return {
            selectedFunType: true,
            taskUser: [],
            taskUserName: '',
            taskUserId: '',
            approveData: [],
            greenChannel: '',
            formData: {
                taskName: '',
                beginTime: '',
                endTime: '',
                taskUser: [],
                approveList: '',
                taskSign: '',
                greenChannel: ''
            },
            checkOption: {
                id: 'aa',
                value: [],
                disabled: false,
                data: [
                    {
                        name: '绿色通道',
                        value: '1'
                    }
                ],
                change: function (val) {
                    if (val.length) {
                        me.greenChannel = '1'
                    } else {
                        me.greenChannel = '0'
                    }
                }
            },
            isDisabled: false,
            taskUpdateObj: {
                taskBaseId: '',
                isAdd: '',
                greenChannel: ''
            },
            // 任务起止时间 form 配置
            formOpt: {
                inline: true,
                labelPos: 'right',
                labelWidth: '106',
                items: [
                    {
                        label: '开始时间',
                        type: 'date',
                        comOpt: {
                            id: 'start',
                            value: '',
                            disabled: false,
                            type: 'datetime',
                            pickOptions: {
                                disabledDate (time) {
                                    return !forbiddenDate(time, yesterDay1)
                                }
                            }
                        }
                    },
                    {
                        label: '结束时间',
                        type: 'date',
                        comOpt: {
                            id: 'end',
                            value: '',
                            disabled: false,
                            type: 'datetime',
                            pickOptions: {
                                disabledDate (time) {
                                    return !forbiddenDate(time, yesterDay1)
                                }
                            }
                        }
                    }
                ]
            },
            taskId: '',
            operateStatus: null,
            approverStatus: '',
            // 一级审批和二级审批
            approvalData: [],
            approvalFormOpt: {
                // form 表单true横排，false竖排
                inline: true,
                labelPos: 'right',
                labelWidth: '106',
                // 表单项
                items: [
                    {
                        label: '一级审批',
                        type: 'select',
                        comOpt: {
                            id: 'firstOrg',
                            value: 0,
                            disabled: false,
                            width: 200,
                            data: {
                                'name': '请选择',
                                'value': 0
                            },
                            change: function (val) {
                                me.approvalChange(1, val)
                            }
                        }
                    },
                    {
                        label: '',
                        type: 'select',
                        wrap: true,
                        comOpt: {
                            id: 'approvalFirst',
                            value: 0,
                            disabled: false,
                            width: 200,
                            data: {
                                'name': '请选择',
                                'value': 0
                            },
                            change: function () {
                            }
                        }
                    },
                    {
                        label: '二级审批',
                        type: 'select',
                        comOpt: {
                            id: 'secondOrg',
                            value: 0,
                            disabled: false,
                            width: 200,
                            data: {
                                'name': '请选择',
                                'value': 0
                            },
                            change: function (val) {
                                me.approvalChange(2, val)
                            }
                        }
                    },
                    {
                        label: '',
                        type: 'select',
                        comOpt: {
                            id: 'approvalSecond',
                            value: 0,
                            disabled: false,
                            width: 200,
                            data: {
                                'name': '请选择',
                                'value': 0
                            },
                            change: function () {
                            }
                        }
                    }
                ]
            },
            // 审批条件
            approvalList: {
                inline: true,
                labelWidth: '100',
                btnPos: 'right',
                items: [
                    {
                        label: '批准文号',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'fileNo',
                            width: 220,
                            disabled: false,
                            value: ''
                        }
                    },
                    {
                        label: '批准人/单位',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'approvalUnit',
                            width: 220,
                            disabled: false,
                            value: ''
                        }
                    },
                    {
                        label: '批准时间',
                        type: 'date',
                        required: true,
                        comOpt: {
                            id: 'approvalTime',
                            value: '',
                            width: 220,
                            disabled: false,
                            type: 'date'
                        }
                    }
                ],
                btns: [
                    {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '添加',
                            disabled: false,
                            click () {
                                me.btnAdd()
                            }
                        }
                    }
                ]
            },
            userId: null,
            isMustChoosed: false
        }
    },
    created () {
        // this.taskId = this.taskIdProp
        this.operateStatus = this.operateStatusProp
        this.approverStatus = this.approverStatusProp
        //            this.greenChannel = this.greenChannelProp

        // 在配置任务中刷新界面
        if (localStorage.getItem('SFtaskId')) {
            this.taskId = localStorage.getItem('SFtaskId')
        }
        if (localStorage.getItem('operateStatus') !== undefined) {
            this.operateStatus = Number(localStorage.getItem('operateStatus'))
        }
        if (localStorage.getItem('approverStatus') !== undefined) {
            this.approverStatus = Number(localStorage.getItem('approverStatus'))
        }
        if (sessionStorage.getItem('userId')) {
            this.userId = sessionStorage.getItem('userId')
        }
        if (localStorage.getItem('isAdd') !== undefined) {
            this.taskUpdateObj.isAdd = localStorage.getItem('isAdd')
        }
        //            if (localStorage.getItem('greenChannel')) {
        //                this.greenChannel = localStorage.getItem('greenChannel');
        //            }
        // 是否勾选绿色通道
        //            if (this.greenChannel === '1') {
        //                this.checkOption.value.push('1');
        //            }
        // 判断是新增还是修改operateStatus:  0 为新增， 1 为修改， 2 为追加, 3为查看 4为延期
        if (this.operateStatus === 0) {
            this.formData = {
                taskName: '',
                beginTime: '',
                endTime: '',
                taskUser: [],
                approveList: '',
                taskSign: ''
            }
            this.approveData = []
        } else if (this.operateStatus === 1) {
            // 是否勾选绿色通道
            // 如果任务不是审批通过的，功能告警模块页签可以点击
            if (this.approverStatus !== 3) {
                this.$emit('selectedFun', false)
            } else {
                for (let i = 0; i < 4; i++) {
                    this.approvalFormOpt.items[i].comOpt.disabled = true
                }
                this.formOpt.items[0].comOpt.disabled = true
                this.formOpt.items[1].comOpt.disabled = true
            }
            this.taskBaseQuery()
        } else if (
            this.operateStatus === 2 ||
            this.approverStatus === 3 ||
            this.operateStatus === 3
        ) {
            this.forbiddenApproval()
            this.formOpt.items[0].comOpt.disabled = true
            this.formOpt.items[1].comOpt.disabled = true
            this.taskBaseQuery()
        }
        if (this.operateStatus === 3) {
            this.forbiddenApproval()
            this.approvalList.items[0].comOpt.disabled = true
            this.approvalList.items[1].comOpt.disabled = true
            this.approvalList.items[2].comOpt.disabled = true
            this.approvalList.btns[0].comOpt.disabled = true
            this.$emit('selectedFun', false)
        }
        if (this.operateStatus === 4) {
            this.forbiddenApproval()
            this.formOpt.items[0].comOpt.disabled = true
            this.formOpt.items[1].comOpt.disabled = false
            this.taskBaseQuery()
        }
        if (this.taskUpdateObj.isAdd === '1') {
            this.forbiddenApproval()
        }
        // this.$emit('selectedFun', true)
        this.getTaskUser()
    },
    mounted() {
        this.approvalGovern()
    },
    methods: {
        // 禁用一级审批和二级审批
        forbiddenApproval() {
            for (let i = 0; i < 4; i++) {
                this.approvalFormOpt.items[i].comOpt.disabled = true
            }
        },
        // 查询一级审批机构和二级审批机构
        approvalGovern () {
            ajax.post('approval/getApprovalStaff').then(resp => {
                let { data } = resp
                if (data) {
                    this.approvalData = _.cloneDeep(data)
                    let { first, second } = data
                    let firstValue = 0
                    let secondValue = 0
                    if (first && first.length) {
                        first.forEach(item => {
                            item.name = item.orgName
                            item.value = item.orgId
                        })
                        firstValue = first[0].orgId
                    }
                    if (second && second.length) {
                        second.forEach(item => {
                            item.name = item.orgName
                            item.value = item.orgId
                        })
                        secondValue = second[0].orgId
                    }
                    this.$refs.approvalPerson.setItemData('firstOrg', first);
                    this.$refs.approvalPerson.setItemData('secondOrg', second);
                    if (this.operateStatus === 0) {
                        this.$refs.approvalPerson.setValue([
                            { id: 'firstOrg', value: firstValue },
                            { id: 'secondOrg', value: secondValue }
                        ])
                        this.approvalChange(1, firstValue)
                        this.approvalChange(2, secondValue)
                    }
                }
            }).catch(error => {
                console.log('请求接口错误信息：', error)
            })
        },
        approvalChange(type, val) {
            // type 1 一级审批 2 二级审批
            let formId = type === 1 ? 'approvalFirst' : 'approvalSecond'
            let list = type === 1 ? this.approvalData.first : this.approvalData.second
            let arr = []
            list.forEach(item => {
                if (val === item.orgId) {
                    arr = item.approval
                }
            })
            let value = 0
            if (arr.length) {
                arr.forEach(item => {
                    item.name = item.userName
                    item.value = item.userId
                })
                value = arr[0].userId
            }
            this.$refs.approvalPerson.setItemData(formId, arr);
            this.$refs.approvalPerson.setValue([
                { id: formId, value: value }
            ])
        },
        // ------------------新增-------------------------
        // 查询任务使用者
        async getTaskUser () {
            let resp = await userQuery()
            if (resp) {
                this.taskUser = resp.rows
                for (let i in this.taskUser) {
                    if (this.taskUser[i].userId === this.userId) {
                        this.formData.taskUser.push(this.taskUser[i].userId)
                        this.isMustChoosed = true
                    }
                }
            }
        },
        // 任务新增保存
        async taskBaseInfoSave (obj) {
            let resp = await taskBaseInfoSave(obj)
            //                this.formData.taskUser = this.formData.taskUser.split(',')
            if (resp) {
                this.$emit('selectedFun', false)
                this.$emit('setTaskId', `T${resp.data.taskBaseId}`)
                //                    this.formData.taskUser = this.formData.taskUser.split(',')
            }
        },
        // -------------------修改-----------------------
        // 基础信息查询
        async taskBaseQuery () {
            let resp = await taskBaseQuery({
                taskBaseId: this.sendTaskId,
                approverStatus: this.approverStatus
            })
            if (resp) {
                this.formData = resp.data
                this.taskUserId = resp.data.userId
                this.taskUserName = resp.data.userNick
                this.formData.taskUser = resp.data.userId.split(',')
                for (var i = 0; i < resp.data.list.length; i++) {
                    resp.data.list[i].id = i + 1
                }
                this.approveData = resp.data.list
                this.formOpt.items[0].comOpt.value = resp.data.beginTime
                this.formOpt.items[1].comOpt.value = resp.data.endTime
                this.$refs.approvalPerson.setValue([
                    { id: 'firstOrg', value: resp.data.firstOrg },
                    { id: 'secondOrg', value: resp.data.secondOrg }
                ])
                this.approvalChange(1, resp.data.firstOrg)
                this.approvalChange(2, resp.data.secondOrg)
                this.$refs.approvalPerson.setValue([
                    { id: 'approvalFirst', value: resp.data.approvalFirst },
                    { id: 'approvalSecond', value: resp.data.approvalSecond }
                ])
                this.greenChannel = resp.data.greenChannel
                if (resp.data.greenChannel === '1') {
                    this.checkOption.value.push('1')
                }
            }
        },
        // 基础信息修改保存
        async taskUpdate (obj) {
            this.formData.taskUser = this.formData.taskUser.split(',')
            let resp = await taskUpdate(obj)
            if (resp) {
                if (this.operateStatus === 2) {
                    this.$emit('selectedFun', false)
                }
                //                    this.formData.taskUser = this.formData.taskUser.split(',')
            }
        },
        // 任务延期
        async delayTask (obj) {
            this.formData.taskUser = this.formData.taskUser.split(',')
            let resp = await delayTask(obj)
            if (resp) {
                this.$message(resp.message)
            }
        },
        // -------------- 点击添加按钮------------------
        btnAdd () {
            let list = {}
            list.fileNo = this.$refs.approval.getValue().fileNo.trim()
            list.approvalUnit = this.$refs.approval.getValue().approvalUnit.trim()
            list.approvalTime = this.$refs.approval.getValue().approvalTime
            list.id = this.approveData.length + 1
            if (!list.fileNo) {
                this.$message('非绿色通道 批准文号不能为空')
                return
            } else if (!list.approvalUnit) {
                this.$message('非绿色通道 批准人单位不能为空')
                return
            } else if (!list.approvalTime) {
                this.$message('非绿色通道 批准时间不能为空')
                return
            }
            let isRepeat = false
            if (list.fileNo && list.approvalUnit && list.approvalTime) {
                this.approveData.forEach(item => {
                    if (item.fileNo === list.fileNo) {
                        this.$message('批准文号重复,请重新输入')
                        isRepeat = true
                    }
                })
                if (isRepeat) {
                    return
                } else {
                    this.approveData.push(list)
                }
                this.$refs.approval.setValue([{ id: 'fileNo', value: '' }])
                this.$refs.approval.setValue([{ id: 'approvalUnit', value: '' }])
                this.$refs.approval.setValue([{ id: 'approvalTime', value: '' }])
            } else {
                this.$message('请填写完整信息')
            }
        },
        // -------------- 点击保存按钮------------------
        confirm () {
            this.formData.beginTime = this.$refs.form.getValue().start
            this.formData.endTime = this.$refs.form.getValue().end
            let time = this.$refs.form.getValue()
            let timeRange = (new Date(time.end).getTime() - new Date(time.start).getTime()) / 1000
            if (this.formData.taskName.trim() === '') {
                this.$message('请输入任务名称')
                return
            } else if (this.formData.taskName.length > 18) {
                this.$message('任务名称不能超过18个字符，请重新输入')
                return
            }
            if (!this.formData.beginTime) {
                this.$message('请选择开始时间')
                return
            }
            if (!this.formData.endTime) {
                this.$message('请选择结束时间')
                return
            }
            if (timeRange <= 0) {
                this.$message('开始时间不能大于或等于结束时间')
                return
            }
            if (!this.formData.taskUser.length) {
                this.$message('请选择任务使用人')
                return
            } else if (this.isMustChoosed) {
                if (!this.formData.taskUser.includes(this.userId)) {
                    this.$message('任务人必须包含本人')
                    return
                }
            }
            let approvalData = this.$refs.approvalPerson.getValue()
            if (!approvalData.approvalFirst) {
                this.$message('请选择一级审批员')
                return
            }
            if (!approvalData.approvalSecond) {
                this.$message('请选择二级审批员')
                return
            }
            Object.assign(this.formData, approvalData);
            if (this.greenChannel === '1') {
                // 任务为绿色通道
                if (this.formData.taskSign.trim() === '') {
                    this.$message('请输入领导签字')
                } else {
                    if (this.taskId === '') {
                        // 新增
                        this.formData.greenChannel = '1'
                        this.formData.taskUser = this.formData.taskUser.join(',')
                        this.taskBaseInfoSave(this.formData)
                        this.formData.taskUser = this.formData.taskUser.split(',')
                    } else {
                        let list = this.approveData
                        let arr = []
                        list.forEach(item => {
                            let info = []
                            info.push(item.fileNo)
                            info.push(item.approvalUnit)
                            info.push(item.approvalTime)
                            arr.push(info.join('!'))
                        })
                        let str = arr.join(',')
                        this.formData.approveList = str
                        // 修改
                        this.taskUpdateObj.taskBaseId = this.sendTaskId
                        this.taskUpdateObj.greenChannel = this.greenChannel
                        this.taskUpdateObj.taskName = this.formData.taskName
                        this.taskUpdateObj.beginTime = this.formData.beginTime
                        this.taskUpdateObj.endTime = this.formData.endTime
                        this.taskUpdateObj.approveList = this.formData.approveList
                        this.taskUpdateObj.taskUser = this.formData.taskUser.join(',')
                        Object.assign(this.taskUpdateObj, approvalData)
                        this.formData.taskUser = this.formData.taskUser.join(',')
                        //                            this.taskUpdateObj = Object.assign(this.taskUpdateObj, this.formData)
                        if (this.operateStatus === 1) {
                            // 修改
                            // this.taskUpdateObj.isAdd = '0'
                            this.taskUpdate(this.taskUpdateObj)
                        } else if (this.operateStatus === 2) {
                            // 追加
                            this.taskUpdateObj.isAdd = '1'
                            this.taskUpdate(this.taskUpdateObj)
                        } else if (this.operateStatus === 4) {
                            this.delayTask({
                                taskBaseId: this.sendTaskId,
                                endTime: this.formData.endTime
                            })
                        }
                    }
                }
            } else {
                // 任务非绿色通道
                if (!this.approveData.length) {
                    this.$message('请添加完整批准信息！')
                } else {
                    let list = this.approveData
                    let arr = []
                    list.forEach(item => {
                        let info = []
                        info.push(item.fileNo)
                        info.push(item.approvalUnit)
                        info.push(item.approvalTime)
                        arr.push(info.join('!'))
                    })
                    let str = arr.join(',')
                    this.formData.approveList = str
                    if (this.taskId === '') {
                        // 新增
                        this.formData.taskUser = this.formData.taskUser.join(',')
                        this.taskBaseInfoSave(this.formData)
                        this.formData.taskUser = this.formData.taskUser.split(',')
                    } else {
                        // 修改
                        this.taskUpdateObj.taskBaseId = this.sendTaskId
                        this.taskUpdateObj.greenChannel = this.greenChannel
                        this.taskUpdateObj.taskName = this.formData.taskName
                        this.taskUpdateObj.beginTime = this.formData.beginTime
                        this.taskUpdateObj.endTime = this.formData.endTime
                        this.taskUpdateObj.approveList = this.formData.approveList
                        this.taskUpdateObj.taskUser = this.formData.taskUser.join(',')
                        this.formData.taskUser = this.formData.taskUser.join(',')
                        Object.assign(this.taskUpdateObj, approvalData)
                        //                            this.taskUpdateObj = Object.assign(this.taskUpdateObj, this.formData)
                        if (this.operateStatus === 1) {
                            // this.taskUpdateObj.isAdd = '0'
                            this.taskUpdate(this.taskUpdateObj)
                        } else if (this.operateStatus === 2) {
                            this.taskUpdateObj.isAdd = '1'
                            this.taskUpdate(this.taskUpdateObj)
                            // this.$emit('selectedFun', false)
                        } else if (this.operateStatus === 4) {
                            this.delayTask({
                                taskBaseId: this.sendTaskId,
                                endTime: this.formData.endTime
                            })
                        }
                    }
                }
            }
        }
    },
    components: {
        checkboxComp,
        // timeComp,
        formSelect
    },
    computed: {
        sendTaskId () {
            if (this.taskId) {
                if (this.taskId.charAt(0) === 'T') {
                    return this.taskId.substr(1)
                } else {
                    return this.taskId
                }
            }
        },
        tableHeight () {
            return this.vsHeight - 400
        },
        mainHeight () {
            return {
                overflow: 'auto',
                height: this.vsHeight - 100 + 'px'
            }
        },
        ...mapGetters({
            vsHeight: 'global/visualHeight'
        })
    },
    watch: {
        taskId () {
            if (this.operateStatus !== 0) {
                this.taskBaseQuery()
            }
        }
    }
}
</script>
<style scoped>
@component-namespace ga {
    @b warnConfigBox {
        margin-top: 12px;
        @e formBox {
            display: flex;
        }
        @e rightForm {
            margin-top: -21px;
        }
        @e formWrap{
            display: flex;
            justify-content: flex-start;
        }
        @e formLabel{
            display: inline-block;
            color: rgba(255,255,255,0.75);
            font-size: 14px;
            line-height: 26px;
            padding: 0 8px 0 0;
            width: 106px;
            padding-right:8px;
            text-align: right;
        }
        @e formInner{
            display: inline-block;
            width:557px;
        }
    }
}

.ga-taskConfig__secTitle--configBox {
    .el-col-2 {
        text-align: right;
        padding-right: 8px;
    }
}
</style>
