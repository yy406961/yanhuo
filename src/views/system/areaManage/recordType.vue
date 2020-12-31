<template>
    <div>
        <recordForm :option="recordFormOpt" ref="recordForm"></recordForm>
        <el-row v-if="toggleGis" class="ga-areaRang__recordTable">
            <el-col :span="24">
                <el-table :data="recordData" :height="recordTableSize">
                    <el-table-column align="center" prop="ispCode" label="运营商" width="120">
                        <template slot-scope="scope">
                            <el-select v-show="scope.row.edit" v-model="scope.row.ispCode">
                                <el-option
                                    v-for="item in ispCode"
                                    :key="item.compKey"
                                    :label="item.compValue"
                                    :value="item.compKey">
                                </el-option>
                            </el-select>
                            <span v-show="!scope.row.edit">{{ scope.row.ispCode }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="lac" label="大区(LAC)代码">
                        <template slot-scope="scope">
                            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.lac"></el-input>
                            <span v-show="!scope.row.edit">{{ scope.row.lac }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="ci" label="小区(CI)代码">
                        <template slot-scope="scope">
                            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.ci"></el-input>
                            <span v-show="!scope.row.edit">{{ scope.row.ci }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="编辑" width="90">
                        <template slot-scope="scope">
                            <i v-show='!scope.row.edit' @click='scope.row.edit=true' class="fa fa-edit"></i>
                            <i v-show='scope.row.edit' @click='scope.row.edit=false' class="fa fa-check"></i>
                            &nbsp;&nbsp;
                            <i class="fa fa-trash-o" @click="recordLineDelete(scope.$index)"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <div v-else>
            <showGis :style="littleMapStyle" :option="mapData"></showGis>
        </div>
        <div class="centerBtn">
            <buttonComp :option="recordSaveBtnOpt" v-show="recordBtn"></buttonComp>
            <buttonComp :option="recordReviseBtnOpt" v-show="!recordBtn"></buttonComp>
            <!--<buttonComp :option="recordCancelBtnOpt" v-show="!recordBtn"></buttonComp>-->
        </div>
    </div>
</template>
<script>
    import recordForm from 'components/Form/index'
    import buttonComp from 'components/Form/button'
    import showGis from '../taskCreate/config/showMapArea'
    import { getDictionary } from 'api/platform/dictionary'
    import { recordAreaRangeSave, reviseArea, getCellCoordinate, upService } from 'api/task/taskArea'
    import { mapGetters } from 'vuex'
    export default {
        name: 'recordType',
        data () {
            let me = this
            return {
                isUpLoad: false,
                recordFormObj: {
                    areaSourceType: '4',
                    areaName: '',
                    owner: '',
                    list: []
                },
                ispCode: [],
                recordData: [],
                recordFormHeight: '',
                recordBtn: true,
                alertMsg: '',
                recordFormOpt: {
                    inline: true,
                    items: [{
                        label: '区域名称',
                        type: 'text',
                        comOpt: {
                            id: 'areaName',
                            value: '',
                            disabled: false
                        }
                    }, {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '添加',
                            disabled: false,
                            click: function () {
                                let list = {};
                                list.edit = true;
                                list.ispCode = me.ispCode[0].compValue;
                                me.recordData.push(list)
                            }
                        }
                    }, {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '上传到服务器',
                            disabled: false,
                            click: function () {
                                me.uploadFun()
                            }
                        }
                    }]
                },
                recordSaveBtnOpt: {
                    id: 'recordSave',
                    value: '保存',
                    disabled: false,
                    click: function () {
                        if (me.isUpLoad || me.reviseAreaId) {
                            me.getMapArea()
                        } else {
                            me.$message.warning('请先上传到服务器')
                        }
                    }
                },
                recordReviseBtnOpt: {
                    id: 'recordReviseBtnOp',
                    value: '保存',
                    disabled: false,
                    click: function () {
                        if (me.isUpLoad || me.reviseAreaId) {
                            me.getMapArea()
                        } else {
                            me.$message.warning('请先上传到服务器')
                        }
//                        let areaName = me.$refs.recordForm.getValue().areaName;
//                        let list = me.recordData
//                        let listObj = {}
//                        list.forEach(item => {
//                            listObj = item
//                        })
//                        if (!areaName) {
//                            me.$message.warning('请输入名称')
//                        } else if (me.recordData.length === 0) {
//                            me.alertMsg = '请添加数据';
//                        } else if (!listObj.lac || !listObj.ci) {
//                            me.$message.warning('请输入录入信息')
//                        } else {
//
//                        }
                    }
                },
                recordCancelBtnOpt: {
                    id: 'recordCancel',
                    value: '取消',
                    disabled: false,
                    click: function () {}
                },
                mapData: {
                    areaBorder: [],
                    cellInfo: []
                },
                toggleGis: true,
                sysOwner: '',
                reviseAreaId: '',
                areaName: '',
                areaInclude: []
            }
        },
        methods: {
            // 上传到服务器
            async uploadServer (areaName) {
                let resp = await upService({
                    'areaSourceType': '3',
                    'areaName': areaName,
                    'list': this.recordFormObj.list,
                    'owner': this.sysOwner
                })
                let { data } = resp
                if (resp) {
                    this.toggleGis = false
                    this.mapData = {
                        areaBorder: [],
                        cellInfo: []
                    }
                    this.isUpLoad = true
                    localStorage.setItem('areaBorder', JSON.stringify(data.areaBorderInfoVO))
                    localStorage.setItem('cellInfo', JSON.stringify(data.areaIncludeCellVO))
                    data.areaBorderInfoVO.map(item => {
                        let point = JSON.stringify(item);
                        this.mapData.areaBorder.push(point)
                    })
                    data.areaIncludeCellVO.map(item => {
                        let point = JSON.stringify(item);
                        this.mapData.cellInfo.push(point)
                    })
                }
            },
            judgeIsRight () {
                let areaName = this.$refs.recordForm.getValue().areaName;
                let isRight = false
                let basicInfo = this.recordData
                let basicInfoObj = {}
                basicInfo.forEach(item => {
                    basicInfoObj = item
                })
                if (!areaName) {
                    this.$message.warning('请输入名称')
                } else if (this.recordData.length === 0) {
                    this.$message.warning('请添加数据')
                } else if (!basicInfoObj.lac || !basicInfoObj.ci) {
                    this.$message.warning('请输入录入信息')
                } else {
                    isRight = true
                    let arr = []
                    let basicInfo = this.recordData
                    basicInfo.forEach(item => {
                        let info = []
                        if (item.ispCode === '移动') {
                            item.ispStr = '00';
                        } else if (item.ispCode === '联通') {
                            item.ispStr = '01';
                        } else {
                            item.ispStr = '03'
                        }
                        info.push(item.ispStr)
                        info.push(item.lac)
                        info.push(item.ci)
                        arr.push(info.join('!'))
                    })
                    let str = arr.join(',')
                    this.recordFormObj.list = str
                }
                return { areaName, isRight }
            },
            uploadFun () {
                let judgeObj = this.judgeIsRight()
                if (judgeObj.isRight) {
                    this.uploadServer(judgeObj.areaName)
                }
            },

//            数据字典获取运营商类型
            async getDictionaryIspType () {
                let resp = await getDictionary('ispType')
                if (resp) {
                    let { rows } = resp;
                    if (rows) {
                        rows.forEach((item) => {
                            item.compKey = item.compValue;
                            return item
                        })
                        this.ispCode = _.cloneDeep(rows);
                    }
                }
            },
            // 区域范围（录入）保存
            async saveRecordAreaRange () {
                let resp = await recordAreaRangeSave(this.recordFormObj)
                if (resp) {
                    this.$message.success(resp.message)
                    this.toggleGis = false
//                    this.reviseAreaId = resp.data.resourceId
//                    this.getCellCoordinate({ resourceId: this.reviseAreaId })
                    this.$router.push({ name: '区域管理' })
                }
            },
            // 区域范围（录入）修改
            async reviseArea (obj) {
                let resp = await reviseArea(obj);
                if (resp) {
                    this.$message.success(resp.message);
                    this.toggleGis = false
                    this.mapCoordinate = []
//                    this.getCellCoordinate({ resourceId: this.reviseAreaId })
                    this.$router.push({ name: '区域管理' })
                }
            },
            // 基站信息查询
            async getCellCoordinate (obj) {
                let resp = await getCellCoordinate(obj)
                let { data } = resp
                if (resp) {
                    this.mapData = {
                        areaBorder: [],
                        cellInfo: []
                    }
                    data.areaBorderInfoVO.map(item => {
                        let point = JSON.stringify(item);
                        this.mapData.areaBorder.push(point)
                    })
                    data.areaIncludeCellVO.map(item => {
                        let point = JSON.stringify(item);
                        this.mapData.cellInfo.push(point)
                    })
                }
            },
            recordLineDelete (index) {
                this.recordData.splice(index, 1)
            },
            // 根据lac ci画图(上传到服务器按钮)
            getMapArea () {
                let areaName = this.$refs.recordForm.getValue().areaName;
                let basicInfo = this.recordData
                let basicInfoObj = {}
                basicInfo.forEach(item => {
                    basicInfoObj = item
                })
                if (!areaName) {
                    this.$message.warning('请输入名称')
                } else if (this.recordData.length === 0) {
                    this.$message.warning('请添加数据')
                } else if (!basicInfoObj.lac || !basicInfoObj.ci) {
                    this.$message.warning('请输入录入信息')
                } else {
                    if (this.reviseAreaId) {
                        let list = this.recordData
//                        let listObj = {}
//                        list.forEach(item => {
//                            listObj = item
//                        })
                        let arr = []
                        list.forEach(item => {
                            let info = []
                            if (item.ispCode === '移动') {
                                item.ispStr = '00';
                            } else if (item.ispCode === '联通') {
                                item.ispStr = '01';
                            } else {
                                item.ispStr = '03'
                            }
                            info.push(item.ispStr)
                            info.push(item.lac)
                            info.push(item.ci)
                            arr.push(info.join('!'))
                        })
                        let str = arr.join(',')
                        this.recordFormObj.owner = this.sysOwner
                        this.recordFormObj.areaName = areaName
                        this.recordFormObj.list = str
                        this.recordFormObj.resourceId = this.reviseAreaId
                        this.reviseArea(this.recordFormObj)
                    } else {
                        let arr = []
                        basicInfo.forEach(item => {
                            let info = []
                            if (item.ispCode === '移动') {
                                item.ispStr = '00';
                            } else if (item.ispCode === '联通') {
                                item.ispStr = '01';
                            } else {
                                item.ispStr = '03'
                            }
                            info.push(item.ispStr)
                            info.push(item.lac)
                            info.push(item.ci)
                            arr.push(info.join('!'))
                        })
                        let str = arr.join(',')
                        this.recordFormObj.owner = this.sysOwner
                        this.recordFormObj.areaName = areaName
                        this.recordFormObj.list = str
                        this.saveRecordAreaRange()
                    }
                }
            }
        },
        destroyed () {
            localStorage.removeItem('resourceId');
            localStorage.removeItem('areaName');
            localStorage.removeItem('areaInclude');
            localStorage.removeItem('areaBorder');
            localStorage.removeItem('cellInfo');
        },
        components: {
            recordForm,
            buttonComp,
            showGis
        },
        mounted () {
            if (this.userName.charAt('0') === 'U') {
                this.sysOwner = this.userName.substr(1)
                this.sysOwner = `S${this.sysOwner}`
            }
            this.getDictionaryIspType()
            if (this.$route.params.list) {
                localStorage.setItem('resourceId', this.$route.params.list.resourceId)
                localStorage.setItem('areaName', this.$route.params.areaName)
                localStorage.setItem('areaInclude', JSON.stringify(this.$route.params.list.areaInclude))
            }
            this.recordFormHeight = this.$refs.recordForm.getContainerHeight();
            if (this.$route.params.list) {
                this.recordBtn = false
                this.reviseAreaId = this.$route.params.list.resourceId
                this.areaName = this.$route.params.areaName
                this.$route.params.list.areaInclude.map(item => {
                    if (item.ispCode === '00') {
                        item.ispCode = '移动'
                    } else if (item.ispCode === '01') {
                        item.ispCode = '联通'
                    } else if (item.ispCode === '03') {
                        item.ispCode = '电信'
                    }
                    return item
                })
                this.areaInclude = this.$route.params.list.areaInclude
                localStorage.setItem('resourceId', this.$route.params.list.resourceId)
                localStorage.setItem('areaName', this.$route.params.areaName)
                localStorage.setItem('areaInclude', this.$route.params.list.areaInclude)
            }
            // 刷新页面
            if (localStorage.getItem('resourceId')) {
                this.reviseAreaId = localStorage.getItem('resourceId')
            }
            if (localStorage.getItem('areaName')) {
                this.areaName = localStorage.getItem('areaName')
            }
//            if (localStorage.getItem('areaBorder')) {
//                this.areaInclude = JSON.parse(localStorage.getItem('areaInclude'))
//            }
            this.$refs.recordForm.setValue([
                { id: 'areaName', value: this.areaName }
            ])
            if (this.areaInclude) {
                let arr = [];
                arr = _.cloneDeep(this.areaInclude);
                arr.forEach((item) => {
                    item.edit = false;
                })
                this.recordData = arr;
            }
        },
        computed: {
            ...mapGetters({
                'visualHeight': 'global/visualHeight',
                'userName': 'global/userName'
            }),
            recordTableSize () {
                return this.visualHeight - this.recordFormHeight - 70
            },
            littleMapStyle () {
                return {
                    height: this.visualHeight - 130 + 'px',
                    width: '100%'
                }
            }
        }
    }
</script>
<style>
    .centerBtn {
        text-align:center
    }
</style>
