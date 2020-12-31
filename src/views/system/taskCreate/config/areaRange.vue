<template>
    <div class="ga-areaRange">
        <el-row>
            <el-col :span="12" class="ga-areaRange__leftWrap">
                    <div class="ga-areaRange__borderBox" :style="squareHeight">
                        <div class="ga-areaRange__borderTitle">已选区域</div>
                        <div class="ga-areaRange__leftTableWrap">
                            <tableComp :option="tableOptChosed"
                                   :comSize="comSize1"
                                   ref="selectedArea"
                                   @handleCurrentPageChange="chosedHandleCurrentPageChange"
                                   @handleSizePageChange="chosedHandleSizePageChange">
                            </tableComp>
                        </div>
                        <el-button type="primary" v-show="operateStatus !== 3"
                            @click="addArea"
                            class="ga-areaRange__addBtn">新 增</el-button>
                    </div>
            </el-col>
            <el-col :span="12">
                <div class="ga-areaRange__borderBox" :style="squareHeight">
                    <div v-if="scanArea">
                        <el-tabs type="card"
                                    v-model="activeName"
                                    @tab-click="handleClick">
                            <el-tab-pane label="系统内置重点区域" name="first">
                                <div class="ga-areaRange__tabContent">
                                    <tableComp :option="tableOptSysArea"
                                                :comSize="comSize2"
                                                ref="sysArea"
                                                @handleCurrentPageChange="handleCurrentPageChange"
                                                @handleSizePageChange="handleSizePageChange"
                                                @handleSelectionChange="handleSelectionChange">
                                    </tableComp>
                                    <div class="ga-areaRange__centerBtn" v-show="operateStatus !== 3">
                                        <buttonComp :option="sysAreaSaveBtnOpt"></buttonComp>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="地图框选" name="second">
                                <div class="ga-areaRange__tabContent">
                                    <el-row>
                                        <el-col :span="4">区域名称：</el-col>
                                        <el-col :span="20">
                                            <textComp :option="textOptMap"
                                                        ref="mapArea"></textComp>
                                        </el-col>
                                    </el-row>
                                    <el-row v-if="loadLittleGis">
                                        <el-col :span="24">
                                            <div @click="mapSelect">
                                                <littleGis :style="littleMapStyle"
                                                            @mapCoordinate="getMapCoordinate"
                                                            ref="clear"
                                                            :option="mapData"
                                                            v-if="reloadGis"></littleGis>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <div class="ga-areaRange__centerBtn" v-show="operateStatus !== 3">
                                        <buttonComp :option="mapSaveBtnOpt"
                                                    v-show="mapBtn"></buttonComp>
                                        <buttonComp :option="mapReviseBtnOpt"
                                                    v-show="!mapBtn"></buttonComp>
                                        <!--<buttonComp :option="mapCancelBtnOpt"-->
                                                    <!--v-show="!mapBtn"></buttonComp>-->
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="导入" name="third">
                                <div class="ga-areaRange__tabContent">
                                    <el-row>
                                        <el-col :span="4">区域名称：</el-col>
                                        <el-col :span="7">
                                            <textComp :option="textOptImport"
                                                        ref="importArea"></textComp>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-upload ref="upload"
                                                        class="upload-demo"
                                                        :action="upLoadUrl"
                                                        :data="importParam"
                                                        accept=".xls"
                                                        :on-success="uploadSuccess"
                                                        :on-error="uploadError"
                                                        :file-list="fileList">
                                                <el-button size="small"
                                                            type="primary">导 入</el-button>
                                                <span slot="tip"
                                                        class="ga-areaRange__uploadTip">{{ msg }}</span>
                                            </el-upload>
                                        </el-col>
                                        <el-col :span="3" :offset="2" class="ga-areaRange__tabDownload">
                                            <a :href="downloadModel">模板下载</a>
                                        </el-col>
                                    </el-row>
                                    <el-row v-if="loadLittleGis">
                                        <el-col :span="24">
                                            <div>
                                                <littleGis :style="littleMapStyle"
                                                            :option="mapData"
                                                            v-if="!reloadGis"></littleGis>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <div class="ga-areaRange__centerBtn" v-show="operateStatus !== 3">
                                        <buttonComp :option="importSaveBtnOpt"
                                                    v-show="importBtn"></buttonComp>
                                        <buttonComp :option="importReviseBtnOpt"
                                                    v-show="!importBtn"></buttonComp>
                                        <!--<buttonComp :option="importCancelBtnOpt"-->
                                                    <!--v-show="!importBtn"></buttonComp>-->
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="录入" name="fourth">
                                <div class="ga-areaRange__tabContent">
                                    <el-row>
                                        <el-col :span="4">区域名称：</el-col>
                                        <el-col :span="16">
                                            <textComp :option="textOptRecord"
                                                        ref="record"></textComp>
                                        </el-col>
                                        <el-col :span="4">
                                            <el-button type="primary"
                                                        @click="btnRecord"
                                                        class="ga-areaRange__btnRecord">添 加</el-button>
                                        </el-col>
                                    </el-row>
                                    <el-row class="ga-areaRange__recordTable">
                                        <el-col :span="24">
                                            <el-table :data="recordData"
                                                        style="width: 100%"
                                                        :height="recordHeight">
                                                <el-table-column align="center"
                                                                    prop="ispCode"
                                                                    label="运营商"
                                                                    width="120">
                                                    <template slot-scope="scope">
                                                        <el-select v-show="scope.row.edit"
                                                                    v-model="scope.row.ispCode">
                                                            <el-option v-for="item in ispCode"
                                                                        :key="item.compKey"
                                                                        :label="item.compValue"
                                                                        :value="item.compKey">
                                                            </el-option>
                                                        </el-select>
                                                        <span v-show="!scope.row.edit">{{ scope.row.ispCode }}</span>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column align="center"
                                                                    prop="lac"
                                                                    label="大区(LAC)代码">
                                                    <template slot-scope="scope">
                                                        <el-input v-show="scope.row.edit"
                                                                    size="small"
                                                                    v-model="scope.row.lac"></el-input>
                                                        <span v-show="!scope.row.edit">{{ scope.row.lac }}</span>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column align="center"
                                                                    prop="ci"
                                                                    label="小区(CI)代码">
                                                    <template slot-scope="scope">
                                                        <el-input v-show="scope.row.edit"
                                                                    size="small"
                                                                    v-model="scope.row.ci"></el-input>
                                                        <span v-show="!scope.row.edit">{{ scope.row.ci }}</span>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column align="center"
                                                                    label="编辑"
                                                                    width="90">
                                                    <template slot-scope="scope">
                                                        <i v-show='!scope.row.edit'
                                                            @click='scope.row.edit=true'
                                                            class="fa fa-edit"></i>
                                                        <i v-show='scope.row.edit'
                                                            @click='scope.row.edit=false'
                                                            class="fa fa-check"></i>
                                                            &nbsp;&nbsp;
                                                        <i class="fa fa-trash-o"
                                                            @click="recordLineDelete(scope.$index)"></i>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </el-col>
                                    </el-row>
                                    <div class="ga-areaRange__centerBtn" v-show="operateStatus !== 3">
                                        <buttonComp :option="recordSaveBtnOpt"
                                                    v-show="recordBtn"></buttonComp>
                                        <buttonComp :option="recordReviseBtnOpt"
                                                    v-show="!recordBtn"></buttonComp>
                                        <!--<buttonComp :option="recordCancelBtnOpt"-->
                                                    <!--v-show="!recordBtn"></buttonComp>-->
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div v-if="!scanArea && isLoad">
                        <!--<el-row :span="24">-->
                            <!--<el-col :span="2" :offset="20">-->
                                <!--<buttonComp :option="cellBtn" class="cellBtn"></buttonComp>-->
                            <!--</el-col>-->
                        <!--</el-row>-->
                        <div class="ga-areaRange__borderBox--detailBtn">
                            <buttonComp :option="cellBtn" class="cellBtn"></buttonComp>
                        </div>
                        <littleGis :style="showMap"
                                    :option="mapData"
                                    @mapCoordinate="getMapCoordinate"></littleGis>
                    </div>
                </div>
            </el-col>
        </el-row>
        <sysDialog size="large"
                   title="基站详情"
                   @change="dialogCellChange"
                   :dialogVisible="dialogCellVisible"
                   :showCancel='false'
                   :okFn="okCellFn">
            <tableComp :option="tableOptCellInfo"
                       :comSize="cellTableSize"
                       @handleCurrentPageChange="cellHandleCurrentPageChange"
                       @handleSizePageChange="cellHandleSizePageChange"></tableComp>
        </sysDialog>
        <sysDialog size="tiny"
                   title="提示"
                   @change="dialogChange"
                   :dialogVisible="dialogVisible"
                   :showCancel='false'
                   :okFn="okFn">
            <span>{{ alertMsg }}</span>
        </sysDialog>
        <!-- <sysDialog size="tiny"
                   title="警告"
                   @change="dialogDeleteChange"
                   :dialogVisible="dialogDeleteVisible"
                   :okFn="okDeleteFn">
            <span>确认删除？</span>
        </sysDialog> -->
        <sysDialog size="large"
                   title="地图框选"
                   @change="dialogMapChange"
                   :dialogVisible="dialogMapVisible"
                   :okFn="okMapFn">
            <div v-if="dialogMapVisible">
                <buttonComp :option="clearMap"></buttonComp>
                <gis :style="mapStyle"
                     ref="gisMap"
                     :option="mapData"
                     @mapCoordinate="getMapCoordinate"
                     :mapTool="bigMap"></gis>
            </div>
        </sysDialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import square from 'components/common/square'
    import FormComp from 'components/Form/index'
    import tableComp from 'components/Table/'
    import textComp from 'components/Form/text'
    import buttonComp from 'components/Form/button'
    import radioComp from 'components/Form/radio'
    import sysDialog from 'components/common/dialog'
    import upload from 'components/common/upload'
    import gis from './mapAreaUtil'
    import littleGis from './showMapArea'
    import { selectedAreaInfoQuery, sysBuiltInAreaScope, sysBuiltInAreaScopeSave, selectedAreaDelete, getSysSelArea } from 'api/task/taskArea'
    import { mapSelectAreaRangeSave, recordAreaRangeSave, importAreaRangeSave, reviseArea, reviseImportArea } from 'api/task/taskArea'
    import { getCellCoordinate, getCellInfoList } from 'api/task/taskArea'
    import { getDictionary } from 'api/platform/dictionary'
    import { mapGetters } from 'vuex'
    export default {
        name: 'areaRang',
        props: {
            // 任务ID
            taskIdProp: {
                type: String
            },
            isLoad: {
                default: false
            },
            operateStatusProp: {
                type: Number
            },
            approverStatusProp: {
                type: Number,
                default: 0
            }
        },
        data () {
            let me = this;
            return {
                // 左侧已选区域
                checkedAreaData: [],
                taskId: '',
                operateStatus: null,
                approverStatus: 0,
                reloadGis: true,
                scanMap: {
                    showdraw: false,
                    zoom: 15
                },
                bigMap: {
                    showdraw: true,
                    zoom: 15
                },
                smallMap: {
                    showdraw: false,
                    zoom: 15
                },
                scanArea: false,
                loadLittleGis: false,
                downloadModel: '',
                recordFormObj: {
                    flag: 2,
                    areaSourceType: '4',
                    areaName: '',
                    owner: '',
                    list: []
                },
                fileList: [],
                activeName: 'first',
                dialogCellVisible: false,
                dialogVisible: false,
                dialogMapVisible: false,
                dialogDeleteVisible: false,
                // dialogImportVisible: false,
                deleteAreaId: '',
                reviseAreaId: '',
                mapBtn: true,
                recordBtn: true,
                importBtn: true,
                alertMsg: '',
                ispCode: [],
                // 已选区域信息
                tableOptChosed: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 65, align: 'center' },
                        { name: '区域名称', value: 'areaName', align: 'center' },
                        { name: '来源', value: 'source', align: 'center' },
                        {
                            name: '操作', value: '', width: 120, align: 'center', operations: [
                                {
                                    label: '修改', type: 'label', callback: function (row) {
                                        // 查看操作和审批状态不是未提交的不能编辑（操作按钮0 为新增， 1 为修改， 2 为追加, 3为查看）
                                        // 审批状态（0为未提交 1为已提交未审批 2为已审批未通过 3为审批通过）
                                        if (me.operateStatus === 3 || row.approverStatus !== 0) {
                                            this.disabled = true;
                                            return 'is-disabled'
                                        }
                                    }, click: me.editClick },
                                {
                                    label: '删除', type: 'label', isConfirm: true, text: '确定删除该区域？',
                                    callback: function (row) {
                                        if (me.operateStatus === 3 || row.approverStatus !== 0) {
                                            this.disabled = true;
                                            return 'is-disabled'
                                        }
                                    }, click: me.deleteClick }]
                        }
                    ],
                    data: [],
                    // 是否分页
                    pagination: true,
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    },
                    rowClick: function (row) {
                        me.getCellCoordinate({ resourceId: row.resourceId })
                        // me.mapData = {
                        //     areaBorder: [],
                        //     cellInfo: []
                        // }
                        // row.areaBorderInfoVO.map(item => {
                        //     let point = JSON.stringify(item);
                        //     me.mapData.areaBorder.push(point)
                        // })
                        // row.cellInfo.map(item => {
                        //     let point = JSON.stringify(item);
                        //     me.mapData.cellInfo.push(point)
                        // })
                        me.scanArea = false
                        // me.rowClickHandler(row)
                    }
                },
                // 系统内置重点区域
                choseArea: [],
                tableOptSysArea: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '系统内置重点区域', value: 'areaName', align: 'center' },
                        { name: '操作', value: 'selection', width: 80, align: 'center' }
                    ],
                    data: [],
                    // 是否分页
                    pagination: true,
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                },
                // 基站详情列表
                tableOptCellInfo: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '运营商', value: 'ispCode', width: 80, align: 'center' },
                        { name: 'LAC', value: 'lac', width: 120, align: 'center' },
                        { name: 'CI', value: 'ci', width: 120, align: 'center' },
                        { name: '经度', value: 'longtitude', width: 120, align: 'center' },
                        { name: '纬度', value: 'latitude', width: 120, align: 'center' },
                        { name: '地址', value: 'address', align: 'center' }
                    ],
                    data: [],
                    // 是否分页
                    pagination: true,
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                },
                // 系统内置重点区域保存
                sysAreaSaveBtnOpt: {
                    id: 'btn1',
                    value: '保存',
                    disabled: false,
                    click: function () {
                        let sysAreaSaveObj = {}
                        let systemId = [];
                        me.choseArea.map(item => {
                            systemId.push(item.resourceId)
                        })
                        sysAreaSaveObj.owner = me.taskId
                        sysAreaSaveObj.resourceIds = systemId.join(',')
                        sysAreaSaveObj.areaSourceType = '1'
                        if (me.choseArea.length === 0) {
                            me.dialogVisible = true;
                            me.alertMsg = '请选择区域'
                        } else {
                            me.sysBuiltInAreaScopeSave(sysAreaSaveObj)
                            // me.sysBuiltInAreaScope(this.tableOptSysArea.pageOpt.pageSize, 1)
//                            me.getSysSelArea()
                        }
                    }
                },
                // 地图框选
                textOptMap: {
                    id: 'map',
                    value: '',
                    disabled: false
                },
                clearMap: {
                    id: 'clear',
                    value: '清除已框选的区域',
                    click: function () {
                        me.$refs.gisMap.clearAll()
                    }
                },
                cellBtn: {
                    id: 'cell',
                    value: '基站详情',
                    click: function () {
                        me.dialogCellVisible = true
                        me.getCellInfoList(me.tableOptCellInfo.pageOpt.pageSize, 1)
                    }
                },
                mapSaveBtnOpt: {
                    id: 'btn2',
                    value: '保存',
                    disabled: false,
                    click: function () {
                        let areaName = me.$refs.mapArea.getValue().map;
                        if (!areaName) {
                            me.alertMsg = '请输入区域名称';
                            me.dialogVisible = true;
                        } else if (me.mapCoordinate.length === 0) {
                            me.alertMsg = '请选择区域';
                            me.dialogVisible = true;
                        } else if (me.mapCoordinate[0] === 'false') {
                            me.alertMsg = '只能框选一个区域，请重新框选';
                            me.dialogVisible = true;
                        } else {
                            let list = []
                            if (me.mapCoordinate[0] === 'circle') {
                                let arr = [];
                                arr.push(me.mapCoordinate[2])
                                arr.push(me.mapCoordinate[3])
                                list.push(arr.join(' '))
                                me.mapRange.radius = me.mapCoordinate[1]
                                me.mapRange.acreage = me.mapCoordinate[4]
                            } else {
                                me.mapCoordinate.map(item => {
                                    let arr = [];
                                    arr.push(item.lng)
                                    arr.push(item.lat)
                                    list.push(arr.join(' '))
                                })
                                me.mapRange.radius = 0
                                me.mapRange.acreage = me.acreage
                            }
                            me.mapRange.coordinates = list.join(',')
                            me.mapSelectAreaRangeSave(areaName, me.mapRange)
                        }
                    }
                },
                mapReviseBtnOpt: {
                    id: 'mapReviseBtnOpt',
                    value: '修改',
                    disabled: false,
                    click: function () {
                        let areaName = me.$refs.mapArea.getValue().map.trim();
                        if (!areaName) {
                            me.alertMsg = '请输入名称';
                            me.dialogVisible = true;
                        } else if (me.mapCoordinate.length === 0) {
                            me.alertMsg = '请选择区域';
                            me.dialogVisible = true;
                        } else if (me.mapCoordinate[0] === 'false') {
                            me.alertMsg = '只能框选一个区域，请重新框选';
                            me.dialogVisible = true;
                        } else {
                            let list = []
                            if (me.mapCoordinate[0] === 'circle') {
                                let arr = [];
                                arr.push(me.mapCoordinate[2])
                                arr.push(me.mapCoordinate[3])
                                list.push(arr.join(' '))
                                me.mapRange.radius = me.mapCoordinate[1]
                                me.mapRange.acreage = me.mapCoordinate[4]
                                me.mapRange.coordinates = list.join(',')
                            } else {
                                me.mapCoordinate.map(item => {
                                    let arr = [];
                                    arr.push(item.lng)
                                    arr.push(item.lat)
                                    list.push(arr.join(' '))
                                })
                                me.mapRange.radius = 0
                                //  me.mapRange.acreage = me.mapCoordinate[1]
                                me.mapRange.acreage = me.acreage
                                me.mapRange.coordinates = list.join(',')
                            }
                            me.reviseArea1({
                                flag: 2,
                                areaSourceType: '2',
                                resourceId: me.reviseAreaId,
                                areaName: areaName,
                                radius: me.mapRange.radius,
                                coordinates: me.mapRange.coordinates,
                                owner: me.taskId,
                                acreage: me.mapRange.acreage
                            })
                        }
                    }
                },
                mapCancelBtnOpt: {
                    id: 'mapCancelBtnOpt',
                    value: '取消',
                    disabled: false,
                    click: function () {
                        me.mapBtn = true;
                        me.$refs.mapArea.value = '';
                        me.reviseAreaId = '';
                        this.scanArea = false
                    }
                },
                mapData: {
                    areaBorder: [],
                    cellInfo: []
                },
                // 导入
                textOptImport: {
                    id: 'import',
                    value: '',
                    disabled: false
                },
                importSaveBtnOpt: {
                    id: 'btn3',
                    value: '保存',
                    disabled: false,
                    click: function () {
                        let areaName = me.$refs.importArea.getValue().import;
                        if (!areaName) {
                            me.alertMsg = '请输入区域名称';
                            me.dialogVisible = true;
                        } else {
                            me.importParam.areaName = areaName
                            me.importParam.owner = me.taskId
                            me.saveImportArea(me.importParam)
                        }
                    }
                },
                importReviseBtnOpt: {
                    id: 'importReviseBtnOpt',
                    value: '修改',
                    disabled: false,
                    click: function () {
                        let areaName = me.$refs.importArea.getValue().import.trim();
                        if (!areaName) {
                            me.alertMsg = '请输入名称';
                            me.dialogVisible = true;
                        } else {
                            // 导入修改只修改名称，保留之前数据发给后台
                            if (this.importData && this.importData.length) {
                                let arr = [];
                                me.importData.map(item => {
                                    let info = [];
                                    info.push(item.ispCode)
                                    info.push(item.lac)
                                    info.push(item.ci)
                                    arr.push(info.join('!'))
                                })
                                me.importParam.list = arr.join(',')
                                me.reviseImportArea({
                                    areaSourceType: '3',
                                    resourceId: me.reviseAreaId,
                                    list: me.importParam.list,
                                    areaName: areaName,
                                    owner: me.taskId
                                })
                            } else {
                                // 重新导入数据修改获取新的导入信息
                                me.reviseImportArea({
                                    areaSourceType: '3',
                                    resourceId: me.reviseAreaId,
                                    list: me.importParam.list,
                                    areaName: areaName,
                                    owner: me.taskId
                                })
                            }
                        }
                    }
                },
                importCancelBtnOpt: {
                    id: 'importCancelBtnOpt',
                    value: '取消',
                    disabled: false,
                    click: function () {
                        me.importBtn = true;
                        me.$refs.importArea.value = '';
                        me.reviseAreaId = '';
                        me.importData = [];
                        this.scanArea = false
                    }
                },
                textOptImportDialog: {
                    id: 'recordDialog',
                    value: '',
                    disabled: false
                },
                importData: [],
                // 录入
                textOptRecord: {
                    id: 'record',
                    value: '',
                    disabled: false
                },
                recordSaveBtnOpt: {
                    id: 'btn4',
                    value: '保存',
                    disabled: false,
                    click: function () {
                        let areaName = me.$refs.record.getValue().record.trim();
                        let list = me.recordData
                        let listObj = {}
                        list.forEach(item => {
                            listObj = item
                        })
                        if (!areaName) {
                            me.alertMsg = '请输入名称';
                            me.dialogVisible = true;
                        } else if (me.recordData.length === 0) {
                            me.alertMsg = '请添加数据';
                            me.dialogVisible = true;
                        } else if (!listObj.lac || !listObj.ci) {
                            me.alertMsg = '请输入录入信息';
                            me.dialogVisible = true;
                        } else {
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
                            me.recordFormObj.owner = me.taskId;
                            me.recordFormObj.areaName = areaName
                            me.recordFormObj.list = str
                            me.saveRecordAreaRange()
                        }
                    }
                },
                recordReviseBtnOpt: {
                    id: 'recordReviseBtnOp',
                    value: '修改',
                    disabled: false,
                    click: function () {
                        let areaName = me.$refs.record.getValue().record.trim();
                        let list = me.recordData
                        let listObj = {}
                        list.forEach(item => {
                            listObj = item
                        })
                        if (!areaName) {
                            me.alertMsg = '请输入名称';
                            me.dialogVisible = true;
                        } else if (me.recordData.length === 0) {
                            me.alertMsg = '请添加数据';
                            me.dialogVisible = true;
                        } else if (!listObj.lac || !listObj.ci) {
                            me.alertMsg = '请输入录入信息';
                            me.dialogVisible = true;
                        } else {
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
                            me.recordFormObj.areaName = areaName
                            me.recordFormObj.list = str
                            me.reviseArea(me.recordFormObj)
                        }
                    }
                },
                recordCancelBtnOpt: {
                    id: 'recordCancelBtnOpt',
                    value: '取消',
                    disabled: false,
                    click: function () {
                        me.recordBtn = true;
                        me.$refs.record.value = '';
                        me.reviseAreaId = '';
                        me.recordData = [];
                        this.scanArea = false
                    }
                },
                recordData: [],
                areaImportType: [],
                importParam: {
                    'areaName': '',
                    'owner': '',
                    'areaSourceType': '3',
                    'list': ''
                },
                msg: '只能上传xls文件',
                upLoadUrl: '',
                selectedAreaObj: {
                    owner: '',
                    rows: null,
                    page: 1
                },
                cellListObj: {
                    areaBaseInfoId: '',
                    rows: null,
                    page: 1
                },
                mapRange: {
                    radius: '',
                    coordinates: '',
                    acreage: ''
                },
                mapCoordinate: [],
                areaId: '',
                acreage: '',
                mapInfo: {},
                sysAreaId: [],
                areaBaseInfoId: ''
            }
        },
        created () {
            this.taskId = this.taskIdProp
            this.operateStatus = this.operateStatusProp
            this.approverStatus = this.approverStatusProp
        },
        mounted () {
            if (this.isLoad) {
                this.selectedAreaInfoQuery();
                this.showFirstMap()
            }
            // 在配置任务中刷新界面
            if (localStorage.getItem('SFtaskId')) {
                this.taskId = localStorage.getItem('SFtaskId')
            }
            if (localStorage.getItem('operateStatus') !== undefined) {
                this.operateStatus = Number(localStorage.getItem('operateStatus'));
            }
            if (localStorage.getItem('approverStatus') !== undefined) {
                this.approverStatus = Number(localStorage.getItem('approverStatus'));
            }
            this.selectedAreaObj.owner = this.taskId;
            this.selectedAreaObj.rows = this.tableOptChosed.pageOpt.pageSize;
            this.apiUrl = process.env.NODE_ENV === 'production'
                ? '/policeBusiness' : 'http://192.168.3.186:8080/policeBusiness'
            this.downloadModel = this.apiUrl + '/goalArea/downloadModel'
            this.upLoadUrl = this.apiUrl + '/goalArea/uploadFile'
            this.getDictionaryType();
            this.getDictionaryAreaImport();
//            this.sysBuiltInAreaScope(this.tableOptSysArea.pageOpt.pageSize, 1);
            // 使禁用图表不能点击
//            setTimeout(() => {
//                $('.fa-ban').each(function () {
//                    $(this).attr('disabled', true)
//                })
//            }, 400)
        },
        computed: {
            comSize1 () {
                return { 'height': this.vsHeight - 189 }
            },
            comSize2 () {
                return { 'height': this.vsHeight - 224 }
            },
            cellTableSize () {
                return { 'height': this.vsHeight - 150 }
            },
            mapStyle () {
                return {
                    height: this.vsHeight - 180 + 'px',
                    width: '100%'
                }
            },
            littleMapStyle () {
                return {
                    height: this.vsHeight - 230 + 'px',
                    width: '100%'
                }
            },
            showMap () {
                return {
                    height: this.vsHeight - 164 + 'px',
                    width: '100%'
                }
            },
            squareHeight () {
                return { height: this.vsHeight - 100 + 'px' }
            },
            recordHeight () {
                return this.vsHeight - 230 - 10
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            })
        },
        methods: {
            // 调用数字字典，运营商类型
            async getDictionaryType () {
                let resp = await getDictionary('ispType');
                if (resp) {
                    let { rows } = resp;
                    if (rows) {
                        // 点击对号文字变为数字（compValue变为compKey）,将key和value都变为value
                        rows.forEach((item) => {
                            item.compKey = item.compValue;
                            return item
                        })
                        this.ispCode = _.cloneDeep(rows);
                    }
                }
            },
            // 调用数字字典，区域范围录入方式
            async getDictionaryAreaImport () {
                let resp = await getDictionary('areaImportType');
                if (resp.rows) {
                    this.areaImportType = _.cloneDeep(resp.rows);
                }
            },
            // 查询已选区域信息
            async selectedAreaInfoQuery () {
                // 操作按钮 0 为新增， 1 为修改， 2 为追加, 3为查看, 4为延期
                // 点击修改按钮（1）或查看按钮（3）查询已选区域向后端传的审批状态从返回的那一行取
                if (this.operateStatus === 3 || this.operateStatus === 1) {
                    this.selectedAreaObj.approverStatus = this.approverStatus
                    // 点击追加按钮（2）传的审批状态为0
                } else {
                    this.selectedAreaObj.approverStatus = 0
                }
                let resp = await selectedAreaInfoQuery(this.selectedAreaObj);
                if (resp) {
                    let { rows, total } = resp;
                    if (rows) {
                        rows.forEach((item1) => {
                            if (item1.areaSourceType === '1') {
                                item1.source = '系统内置重点区域'
                            } else if (item1.areaSourceType === '2') {
                                item1.source = '地图框选'
                            } else if (item1.areaSourceType === '3') {
                                item1.source = '导入'
                            } else if (item1.areaSourceType === '4') {
                                item1.source = '录入'
                            }
                        })
                        this.tableOptChosed.data = rows;
                        this.tableOptChosed.pageOpt.total = total;
                        // 使禁用图表不能点击
//                        setTimeout(() => {
//                            $('.fa-ban').each(function () {
//                                $(this).attr('disabled', true)
//                            })
//                        }, 400)
                    }
                }
            },
            // 默认显示第一条已选区域的区域信息
            showFirstMap () {
                setTimeout(() => {
                    let rows = this.tableOptChosed.data;
                    if (rows.length !== '') {
                        this.$nextTick(() => {
                            if (this.$refs.selectedArea) {
                                this.$refs.selectedArea.setRow(this.tableOptChosed.data[0]);
                            }
                        })
                        if (rows.length) {
                            this.getCellCoordinate({ resourceId: rows[0].resourceId })
                        }
                    }
                }, 100)
            },
            // 获取此任务所选的系统内置重点区域
            async getSysSelArea () {
                let resp = await getSysSelArea({ owner: this.taskId })
                let { data } = resp
                this.checkedAreaData = data
                let arr = []
                if (resp) {
                    data.forEach(item1 => {
                        this.sysAreaId.forEach((item2, index) => {
                            if (item2 === item1) {
                                arr.push(index)
                            }
                        })
                    })
                    let getSelAreaArr = []
                    arr.forEach(item => {
                        getSelAreaArr.push(this.tableOptSysArea.data[item])
                    })
                    this.$nextTick(() => {
                        //  勾选
//                        this.$refs.sysArea.handleToggleRowSelection(getSelAreaArr, true);
                        // this.$refs.sysArea.isSelectable(getSelAreaArr);
                    })
                }
            },
            // 系统内置重点区域
            async sysBuiltInAreaScope (pageSize, page) {
                let resp = await sysBuiltInAreaScope({
                    'rows': pageSize,
                    'page': page
                });
                if (resp) {
                    this.tableOptSysArea.data = resp.rows;
                    resp.rows.map(item => {
                        this.sysAreaId.push(item.resourceId)
                    })
                    this.tableOptSysArea.pageOpt.total = resp.total;
                }
            },
            // 系统内置重点区域选择，保存
            async sysBuiltInAreaScopeSave (obj) {
                let resp = await sysBuiltInAreaScopeSave(obj);
                if (resp) {
                    this.$message.success('保存成功！')
                    this.selectedAreaInfoQuery();
                    this.getSysSelArea()
                }
            },
            // （区域范围）地图框选区域范围保存
            async mapSelectAreaRangeSave (areaName, obj) {
                let resp = await mapSelectAreaRangeSave({
                    'flag': 1,
                    'areaSourceType': '2',
                    'areaName': areaName,
                    'radius': obj.radius,
                    'coordinates': obj.coordinates,
                    'acreage': obj.acreage,
                    'owner': this.taskId
                });
                if (resp) {
                    this.$message.success(resp.message)
                    this.mapRange = {
                        radius: '',
                        coordinates: '',
                        acreage: ''
                    }
                    let areaId = resp.data.resourceId
                    this.getCellCoordinate({ resourceId: areaId })
                    this.scanArea = false
                    this.selectedAreaInfoQuery();
                }
            },
            // 区域范围（录入）添加
            async saveRecordAreaRange () {
                this.recordFormObj.owner = this.taskId
                delete this.recordFormObj.resourceId;
                let resp = await recordAreaRangeSave(this.recordFormObj)
                if (resp) {
                    let areaId = resp.data.resourceId
                    this.$message.success('保存成功！')
                    this.getCellCoordinate({ resourceId: areaId })
                    this.scanArea = false
                    this.selectedAreaInfoQuery();
                }
            },
            // 已选区域删除
            async selectedAreaDelete (id) {
                let resp = await selectedAreaDelete(id);
                if (resp) {
                    this.$message.success('删除成功！')
                    this.selectedAreaInfoQuery();
                    this.showFirstMap()
                }
            },
            // 区域范围（导入）保存
            async saveImportArea (obj) {
                let resp = await importAreaRangeSave(obj);
                let areaId = resp.data.resourceId
                if (resp) {
                    this.$message.success(resp.message)
                    this.getCellCoordinate({ resourceId: areaId })
                    this.scanArea = false
                    this.selectedAreaInfoQuery();
                }
            },
            // 区域范围（地图框选）修改
            async reviseArea1 (obj) {
                let resp = await reviseArea(obj);
                if (resp) {
                    this.$message.success('修改成功');
                    this.getCellCoordinate({ resourceId: this.reviseAreaId })
                    this.scanArea = false
                    this.selectedAreaInfoQuery();
                }
            },
            // 区域范围（录入）修改
            async reviseArea (obj) {
                let resp = await reviseArea(obj);
                if (resp) {
                    this.$message.success('修改成功');
                    this.getCellCoordinate({ resourceId: this.reviseAreaId })
                    this.scanArea = false
                    this.selectedAreaInfoQuery();
                }
            },
            // 区域范围（导入）修改
            async reviseImportArea (obj) {
                let resp = await reviseImportArea(obj);
                if (resp) {
                    this.$message.success('修改成功');
                    this.scanArea = false
                    this.getCellCoordinate({ resourceId: this.reviseAreaId })
                    this.selectedAreaInfoQuery();
                }
            },
            // 基站信息查询（打点）
            async getCellCoordinate (obj) {
                let resp = await getCellCoordinate(obj)
                let { data } = resp
                if (resp) {
                    this.mapData = {
                        areaBorder: [],
                        cellInfo: []
                    }
                    this.areaBaseInfoId = data.resourceId;
                    data.areaBorderInfoVO.map(item => {
                        let point = JSON.stringify(item);
                        this.mapData.areaBorder.push(point)
                    })
                    data.areaIncludeCellVO.map(item => {
                        let point = JSON.stringify(item);
                        this.mapData.cellInfo.push(point)
                    })
                    this.acreage = data.acreage
                    this.mapInfo = data
                }
            },
            // 基站信息列表查询（表格数据）
            async getCellInfoList (pageSize, page) {
                let resp = await getCellInfoList({
                    areaBaseInfoId: this.areaBaseInfoId,
                    'rows': pageSize,
                    'page': page
                })
                if (resp) {
                    resp.rows.forEach((item) => {
                        if (item.ispCode === '00') {
                            item.ispCode = '移动';
                        } else if (item.ispCode === '01') {
                            item.ispCode = '联通';
                        } else if (item.ispCode === '03') {
                            item.ispCode = '电信'
                        }
                    })
                    this.tableOptCellInfo.data = resp.rows
                    this.tableOptCellInfo.pageOpt.total = resp.total;
                }
            },
            // 接收地图框选坐标
            getMapCoordinate (val) {
                // 圆形区域坐标信息
                if (_.isArray(val)) {
                    let circleData = []
                    let circleCoordinate = {}
                    circleCoordinate.radius = val[1]
                    circleCoordinate.longtitude = val[2]
                    circleCoordinate.latitude = val[3]
                    circleData.push(circleCoordinate)
                    this.mapData = {
                        areaBorder: [],
                        cellInfo: []
                    }
                    let areaBorderArr = [];
                    circleData.map(item => {
                        let point = JSON.stringify(item);
                        areaBorderArr.push(point)
                    })
                    this.mapData = {
                        areaBorder: areaBorderArr,
                        cellInfo: []
                    }
                    this.mapCoordinate = val
                } else {
                    if (val.mapLength === 1) {
                        this.mapData = {
                            areaBorder: [],
                            cellInfo: []
                        }
                        val.path.map(item => {
                            // let { lng, lat } = item
                            item.longtitude = item.lng
                            item.latitude = item.lat
                        })
                        val.path.map(item => {
                            let point = JSON.stringify(item);
                            this.mapData.areaBorder.push(point)
                        })
                        this.mapCoordinate = val.path
                        this.acreage = val.acreage
                    } else {
                        this.$message.warning('每次只能框选一个区域')
                        this.mapCoordinate = ['false']
                    }
                }
            },
            // 已选区域，修改
            editClick (row) {
                event.stopPropagation()
                this.scanArea = true
                this.reviseAreaId = row.resourceId;
                if (row.areaSourceType === '1') {
                    this.activeName = 'first';
                    this.dialogVisible = true;
                    this.alertMsg = '系统内置重点区域只能删除，不能修改！'
                } else if (row.areaSourceType === '2') {
                    this.activeName = 'second';
                    this.mapBtn = false;
                    this.loadLittleGis = true;
                    this.reloadGis = true
                    this.$nextTick(() => {
                        this.$refs.mapArea.setValue(row.areaName);
                    })
                    // this.mapData = _.cloneDeep(row.areaBorderInfoVO);
                    this.getCellCoordinate({ resourceId: row.resourceId })
                    this.mapCoordinate = [];
                    // 点击修改，如果只修改名称，不修改区域，保存上次的区域坐标信息传给后台
                    if (this.mapData.areaBorder.length === 1) {
                        this.mapCoordinate[0] = 'circle'
                        this.mapCoordinate[1] = this.mapInfo.areaBorderInfoVO[0].radius
                        this.mapCoordinate[2] = this.mapInfo.areaBorderInfoVO[0].longtitude
                        this.mapCoordinate[3] = this.mapInfo.areaBorderInfoVO[0].latitude
                        this.mapCoordinate[4] = this.mapInfo.acreage
                    } else {
                        this.mapInfo.areaBorderInfoVO.map(item => {
                            item.lng = item.longtitude
                            item.lat = item.latitude
                        })
                        this.mapCoordinate = this.mapInfo.areaBorderInfoVO
                    }
                } else if (row.areaSourceType === '3') {
                    this.activeName = 'third';
                    this.importBtn = false;
                    this.loadLittleGis = true;
                    this.reloadGis = false
                    this.$nextTick(() => {
                        this.$refs.importArea.setValue(row.areaName)
                    })
                    this.getCellCoordinate({ resourceId: row.resourceId })
                    this.importData = _.cloneDeep(this.mapInfo.areaIncludeCellVO);
                } else if (row.areaSourceType === '4') {
                    this.getCellCoordinate({ resourceId: row.resourceId })
                    this.recordFormObj.resourceId = row.resourceId
                    this.activeName = 'fourth';
                    this.recordBtn = false;
                    this.$nextTick(() => {
                        this.$refs.record.setValue(row.areaName)
                    })
                    let tab4Arr = [];
                    tab4Arr = _.cloneDeep(this.mapInfo.areaIncludeCellVO);
                    tab4Arr.forEach((item) => {
                        if (item.ispCode === '00') {
                            item.ispCode = '移动';
                        } else if (item.ispCode === '01') {
                            item.ispCode = '联通';
                        } else if (item.ispCode === '03') {
                            item.ispCode = '电信'
                        }
                        item.edit = false;
                    })
                    this.recordData = tab4Arr;
                }
            },
            // 已选区域，删除
            deleteClick (row) {
                this.$confirm('是否确认删除？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    // event.stopPropagation()
                    this.deleteAreaId = row.resourceId;
                    this.selectedAreaDelete({ resourceId: this.deleteAreaId })
                })
                // this.dialogDeleteVisible = true;
            },
            // dialogDeleteChange (val) {
            //     this.dialogDeleteVisible = val
            // },
            // okDeleteFn () {
            //     this.selectedAreaDelete({ resourceId: this.deleteAreaId })
            //     this.dialogDeleteVisible = false
            // },
            // 已选区域页码
            chosedHandleCurrentPageChange (val) {
                this.selectedAreaObj.page = val
                this.selectedAreaInfoQuery();
            },
            chosedHandleSizePageChange (val) {
                this.selectedAreaObj.rows = val
                this.tableOptChosed.pageOpt.currentPage = 1
                this.selectedAreaInfoQuery();
            },
            // 系统内置重点区域页码，选择
            handleCurrentPageChange (val) {
                this.tableOptSysArea.currentPage = val
                let pageSize = this.tableOptSysArea.pageOpt.pageSize;
                if (this.tableOptSysArea.data.length !== 0) {
                    this.sysBuiltInAreaScope(pageSize, val);
                }
            },
            handleSizePageChange (val) {
                this.tableOptSysArea.pageOpt.currentPage = 1
                this.tableOptSysArea.pageOpt.pageSize = val;
                if (this.tableOptSysArea.data.length !== 0) {
                    this.sysBuiltInAreaScope(val, 1);
                }
            },
            handleSelectionChange (val) {
                this.choseArea = val;
            },
            // 基站详情信息页码
            cellHandleCurrentPageChange (val) {
                this.tableOptCellInfo.currentPage = val
                let pageSize = this.tableOptCellInfo.pageOpt.pageSize;
                if (this.tableOptCellInfo.data.length !== 0) {
                    this.getCellInfoList(pageSize, val);
                }
            },
            cellHandleSizePageChange (val) {
                this.tableOptCellInfo.pageOpt.currentPage = 1
                this.tableOptCellInfo.pageOpt.pageSize = val;
                if (this.tableOptCellInfo.data.length !== 0) {
                    this.getCellInfoList(val, 1);
                }
            },
            // 通用信息提示框
            dialogChange (val) {
                this.dialogVisible = val
            },
            // 基站详情弹框
            dialogCellChange (val) {
                this.dialogCellVisible = val
            },
            okFn () {
                this.dialogVisible = false
            },
            okCellFn () {
                this.dialogCellVisible = false
            },
            // 地图框选
            mapSelect () {
                this.dialogMapVisible = true
            },
            dialogMapChange (val) {
                this.dialogMapVisible = val
            },
            okMapFn () {
                this.dialogMapVisible = false;
                this.$refs.gisMap.finishMap()
                // 虚拟框选的数据
                //                this.mapData = [30, 40, 50, 60];
            },
            // 录入（添加）
            btnRecord () {
                let list = {};
                list.edit = true;
                list.ispCode = this.ispCode[0].compValue;
                this.recordData.push(list)
            },
            // 录入（删除）
            recordLineDelete (index) {
                this.recordData.splice(index, 1)
            },
            // 上传成功
            uploadSuccess (resp) {
                this.$message.success(resp.message)
                if (resp) {
                    this.importData = []
                    let arr = []
                    resp.rows.map(item => {
                        let info = []
                        info.push(item.ispCode)
                        info.push(item.lac)
                        info.push(item.ci)
                        arr.push(info.join('!'))
                    })
                    let str = arr.join(',')
                    // 上传成功后，将上传的列表保存在importParam中，如果导入修改只修改名称，将上次上传东西重新传给后台
                    this.importParam.list = str
                }
            },
            // 上传失败
            uploadError (err) {
                this.$message.error(err)
            },
            // 新增区域
            addArea () {
                this.sysBuiltInAreaScope(this.tableOptSysArea.pageOpt.pageSize, 1)
                this.scanArea = true
                this.mapBtn = true
                this.importBtn = true
                this.recordBtn = true
                if (this.$refs.mapArea) {
                    this.$refs.mapArea.setValue('');
                }
                if (this.$refs.importArea) {
                    this.$refs.importArea.setValue('');
                }
                if (this.$refs.record) {
                    this.$refs.record.setValue('');
                }
                this.recordData = []
                this.mapData = {
                    areaBorder: [],
                    cellInfo: []
                }
                this.activeName = 'first';
                this.loadLittleGis = false
                this.getSysSelArea()
            },
            rowClickHandler (row) {
                this.rowMapData = _.cloneDeep(row.areaBorderInfoVO);
                this.scanArea = false
            },
            // tab切换点击事件
            handleClick (val) {
                this.mapData = {
                    areaBorder: [],
                    cellInfo: []
                }
                this.$nextTick(() => {
                    this.$refs.mapArea.setValue('');
                    this.$refs.importArea.setValue('')
                    this.$refs.record.setValue('')
                    this.recordData = []
//                    this.mapBtn = true
                    this.importBtn = true
                    this.recordBtn = true
                })
                if (val.index === '0') {
                    this.loadLittleGis = false
                } else if (val.index === '1') {
                    this.loadLittleGis = true
                    this.reloadGis = true
                } else if (val.index === '2') {
                    this.loadLittleGis = true
                    this.reloadGis = false
                } else if (val.index === '3') {
                    this.loadLittleGis = false
                }
            }
        },
        components: {
            square,
            FormComp,
            tableComp,
            textComp,
            buttonComp,
            radioComp,
            sysDialog,
            upload,
            gis,
            littleGis
        },
        watch: {
            'isLoad' (val) {
                this.isLoad = val;
                // if (val) {
                //     this.isLoad = val;
                // }
            },
            taskId () {
                // 操作状态不是新增
                if (this.operateStatus !== 0) {
                    this.selectedAreaInfoQuery()
                    setTimeout(() => {
                        this.showFirstMap()
                    }, 1000);
                }
            },
            approverStatusProp (val) {
                this.approverStatus = val;
            }
        }
    }
</script>

<style scoped>
    /* .dialogForm {
        margin-bottom: 10px;
        box-sizing: border-box;
    }
    .btnRecord {
        width: 80px;
    }
    .boxsBorder {
        border: 1px solid rgb(71, 130, 209);
        padding: 10px;
        box-shadow: rgb(71, 130, 209) 0px 0px 10px inset;
    }
    .centerBtn {
        width: 100%;
        text-align: center;
    }
    .mapSelect {
        width: 100%;
        min-height: 178px;
        margin: 10px 0;
        background: url('~@/assets/images/task/map-select.png') no-repeat;
        background-size: 100% 100%;
    } */



    /* .add {
        position: absolute;
        left: 5px;
        bottom: 5px;
        cursor: pointer;
    } */
    @component-namespace ga {
        @b areaRange {
            .el-col{
                padding-right:12px!important;
            }
            @e leftWrap{
                padding-left:12px;
            }
            @e leftTableWrap{
                padding: 0 5px;
            }
            @e borderBox {
                width: 100%;
                height: 100%;
                border: 1px solid rgba(60,164,255,1);
                position: relative;
                @m detailBtn {
                    height: 50px;
                    line-height: 55px;
                    text-align: right;
                    padding-right: 16px;
                }
            }
            @e addBtn{
                position: absolute;
                left: 5px;
                bottom: 5px;
                cursor: pointer;
            }
            @e btnRecord {
                width: 80px;
            }
            @e borderTitle{
                height:38px;
                line-height:38px;
                padding:0 12px;
                margin-bottom:15px;
                background: rgba(27,117,184,0.20);
                box-shadow: inset 0 -1px 0 0 rgba(255,255,255,0.10);
            }
            @e tabContent{
                padding:0 12px;
            }
            @e uploadTip{
                padding-left: 5px;
                color: rgba(255,255,255,0.35);
            }
            @e tabDownload{
                text-align: right;
                color: rgba(0,197,255,1);
            }
            @e recordTable {
                margin: 10px 0;
            }
            @e toolChose {
                text-align: right;
            }
            @e centerBtn {
                width: 100%;
                text-align: center;
            }
            @e dialogMap {
                width: 100%;
                min-height: 400px;
                margin-top: 10px;
                /*background: url('~@/assets/images/task/map-select-big.png') no-repeat;*/
                background-size: 100% 100%;
            }
        }
    }
</style>

