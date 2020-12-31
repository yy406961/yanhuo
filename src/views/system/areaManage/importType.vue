<template>
    <div class="ga-importType">
        <el-row>
            <el-col :span="2">区域名称</el-col>
            <el-col :span="4"><importForm :option="importTextOpt" ref="importArea"></importForm></el-col>
            <el-col :span="2">
                <a :href="downloadModel">模板下载</a>
            </el-col>
            <el-col :span="4">
                <el-upload
                    class="upload-demo importType"
                    :action="upLoadUrl"
                    accept=".xls"
                    :on-success="uploadSuccess"
                    :file-list="fileList">
                    <el-button size="small" type="primary">导 入</el-button>
                    <span slot="tip" class="msgTip">{{ msg }}</span>
                </el-upload>
            </el-col>
            <el-col :span="3"><el-button type="primary" @click="uploadFun">上传到服务器</el-button></el-col>
        </el-row>
        <el-row>
            <div :style="littleMapStyle">
                <showGis :style="littleMapStyle" :option="mapData" ></showGis>
            </div>
        </el-row>
        <div class="centerBtn">
            <buttonComp :option="importSaveBtnOpt" v-show="importBtn"></buttonComp>
            <buttonComp :option="importReviseBtnOpt" v-show="!importBtn"></buttonComp>
            <!--<buttonComp :option="importCancelBtnOpt" v-show="!importBtn"></buttonComp>-->
        </div>
    </div>
</template>
<script>
    import importForm from 'components/Form/text'
    import buttonComp from 'components/Form/button'
    import showGis from '../taskCreate/config/showMapArea'
    import { mapGetters } from 'vuex'
    import { importAreaRangeSave, getCellCoordinate, reviseImportArea, upService } from 'api/task/taskArea'
    export default {
        name: 'importType',
        data () {
            let me = this;
            return {
                isUpLoad: false,
                upLoadUrl: '',
                msg: '只能上传xls文件',
                sysOwner: '',
                fileList: [],
                importTextOpt: {
                    id: 'areaName',
                    value: '',
                    disabled: false,
                    width: 200
                },
                importFormOpt: {
                    inline: true,
                    items: [{
                        label: '区域名称',
                        type: 'text',
                        comOpt: {
                            id: 'areaName',
                            value: '',
                            disabled: false
                        }
                    }]
                },
                mapData: {
                    areaBorder: [],
                    cellInfo: []
                },
                importParam: {
                    'areaName': '',
                    'owner': '',
                    'areaSourceType': '3',
                    'list': ''
                },
                importSaveBtnOpt: {
                    id: 'btn3',
                    value: '保存',
                    disabled: false,
                    click: function () {
                        if (me.isUpLoad || me.reviseAreaId) {
                            me.getMapArea()
                        } else {
                            me.$message.warning('请先上传到服务器')
                        }
//                        let areaName = me.$refs.importArea.getValue().areaName;
//                        if (!areaName) {
//                            me.$message.warning('请输入区域名称')
//                        } else {
//                            me.importParam.areaName = areaName
//                            me.importParam.owner = me.sysOwner
//                            me.saveImportArea(me.importParam)
//                        }
                    }
                },
                importReviseBtnOpt: {
                    id: 'importReviseBtnOpt',
                    value: '保存',
                    disabled: false,
                    click: function () {
                        if (me.isUpLoad || me.reviseAreaId) {
                            me.getMapArea()
                        } else {
                            me.$message.warning('请先上传到服务器')
                        }
//                        let areaName = me.$refs.importArea.getValue().areaName;
//                        if (!areaName) {
//                            me.$message.warning('请输入区域名称')
//                        } else {
//                            let arr = [];
//                            me.importData.map(item => {
//                                let info = [];
//                                info.push(item.ispCode)
//                                info.push(item.lac)
//                                info.push(item.ci)
//                                arr.push(info.join('!'))
//                            })
//                            me.importParam.list = arr.join(',')
//                            me.reviseImportArea({
//                                areaSourceType: '3',
//                                resourceId: me.reviseAreaId,
//                                list: me.importParam.list,
//                                areaName: areaName,
//                                owner: me.sysOwner
//                            })
//                        }
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
                apiUrl: '',
                downloadModel: '',
                importBtn: true,
                importData: [],
                reviseAreaId: '',
                cellInfo: [],
                areaName: '',
                areaBorder: []
            }
        },
        methods: {
            // 上传到服务器
            async uploadServer (areaName) {
                let resp = await upService({
                    'areaSourceType': '3',
                    'areaName': areaName,
                    'list': this.importParam.list,
                    'owner': this.sysOwner
                })
                let { data } = resp
                if (resp) {
                    this.mapData = {
                        areaBorder: [],
                        cellInfo: []
                    }
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
                let areaName = this.$refs.importArea.getValue().areaName;
                let isRight = false
                if (!areaName) {
                    this.$message.warning('请输入区域名称')
                } else {
                    if (this.importParam.list) {
                        isRight = true
                    } else {
                        this.$message.warning('请先导入')
                    }
                }
                return { areaName, isRight }
            },
            uploadFun () {
                let judgeObj = this.judgeIsRight()
                if (judgeObj.isRight) {
                    this.uploadServer(judgeObj.areaName)
                    this.isUpLoad = true
                }
            },
            uploadSuccess (resp) {
                this.importParam.list = ''
                this.$message.success(resp.message)
                if (resp.status === 201) {
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
                    this.importParam.list = str
                    this.isUpLoad = false
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
            // 区域范围（导入）保存
            async saveImportArea (obj) {
                let resp = await importAreaRangeSave(obj);
                if (resp) {
                    this.reviseAreaId = resp.data.resourceId
                    this.$message.success(resp.message)
//                    this.getCellCoordinate({ resourceId: this.reviseAreaId })
                    this.$router.push({ name: '区域管理' })
                }
            },
            // 修改保存
            async reviseImportArea (obj) {
                let resp = await reviseImportArea(obj);
                if (resp) {
                    this.$message.success('修改成功');
                    this.scanArea = false
//                    this.getCellCoordinate({ resourceId: this.reviseAreaId })
                    this.$router.push({ name: '区域管理' })
                }
            },
            // 根据lac ci 画图
            getMapArea () {
                let areaName = this.$refs.importArea.getValue().areaName;
                if (!areaName) {
                    this.$message.warning('请输入区域名称')
                } else {
                    // 导入修改
                    if (this.reviseAreaId) {
                        if (this.importData && this.importData.length) {
                            let arr = [];
                            this.importData.map(item => {
                                let info = [];
                                info.push(item.ispCode)
                                info.push(item.lac)
                                info.push(item.ci)
                                arr.push(info.join('!'))
                            })
                            this.importParam.list = arr.join(',')
                            this.reviseImportArea({
                                areaSourceType: '3',
                                resourceId: this.reviseAreaId,
                                list: this.importParam.list,
                                areaName: areaName,
                                owner: this.sysOwner
                            })
                        } else {
                            // 重新导入数据修改获取新的导入信息
                            this.reviseImportArea({
                                areaSourceType: '3',
                                resourceId: this.reviseAreaId,
                                list: this.importParam.list,
                                areaName: areaName,
                                owner: this.sysOwner
                            })
                        }
                        // 导入保存
                    } else {
                        this.importParam.areaName = areaName
                        this.importParam.owner = this.sysOwner
                        this.saveImportArea(this.importParam)
                    }
                }
            }
        },
        components: {
            importForm,
            buttonComp,
            showGis
        },
        computed: {
            littleMapStyle () {
                return {
                    height: this.vsHeight - 86 + 'px',
                    width: '100%'
                }
            },
            ...mapGetters({
                'userName': 'global/userName',
                'vsHeight': 'global/visualHeight'
            })
        },
        mounted () {
            if (this.userName.charAt('0') === 'U') {
                this.sysOwner = this.userName.substr(1)
                this.sysOwner = `S${this.sysOwner}`
            }
            this.apiUrl = process.env.NODE_ENV === 'production'
                ? '/policeBusiness' : 'http://10.8.0.24:8080/policeBusiness'
            this.downloadModel = this.apiUrl + '/goalArea/downloadModel'
            this.upLoadUrl = this.apiUrl + '/goalArea/uploadFile'
            if (this.$route.params.list) {
                this.importBtn = false
                this.reviseAreaId = this.$route.params.list.resourceId
                this.areaBorder = this.$route.params.list.areaBorder
                this.areaName = this.$route.params.areaName
                this.cellInfo = this.$route.params.list.areaInclude
                this.importData = this.$route.params.list.areaInclude
                localStorage.setItem('resourceId', this.$route.params.list.resourceId)
                localStorage.setItem('areaName', this.$route.params.areaName)
                localStorage.setItem('areaInclude', JSON.stringify(this.$route.params.list.areaInclude))
                localStorage.setItem('areaBorder', JSON.stringify(this.$route.params.list.areaBorder))
                localStorage.setItem('cellInfo', JSON.stringify(this.$route.params.list.areaInclude))
            }
            // 刷新页面
            if (localStorage.getItem('resourceId')) {
                this.reviseAreaId = localStorage.getItem('resourceId')
            }
            if (localStorage.getItem('areaName')) {
                this.areaName = localStorage.getItem('areaName')
            }
            if (localStorage.getItem('areaBorder')) {
                this.areaBorder = JSON.parse(localStorage.getItem('areaBorder'))
            }
            if (localStorage.getItem('cellInfo')) {
                this.cellInfo = JSON.parse(localStorage.getItem('cellInfo'))
            }
            if (localStorage.getItem('areaInclude')) {
                this.cellInfo = JSON.parse(localStorage.getItem('areaInclude'))
            }
            this.$refs.importArea.setValue(this.areaName)
            this.mapData = {
                areaBorder: [],
                cellInfo: []
            }
            this.areaBorder.map(item => {
                let point = JSON.stringify(item);
                this.mapData.areaBorder.push(point)
            })
            this.cellInfo.map(item => {
                let point = JSON.stringify(item);
                this.mapData.cellInfo.push(point)
            })
        },
        destroyed () {
            localStorage.removeItem('resourceId');
            localStorage.removeItem('areaName');
            localStorage.removeItem('areaBorder');
            localStorage.removeItem('cellInfo');
            localStorage.removeItem('areaInclude');
        }
    }
</script>
<style>
    .ga-importType {
        margin-top: 10px;
    }
    .a {
        cursor: pointer;
    }
    .msgTip {
        padding-left:10px;
    }
    .importType .el-upload-list {
        display: none;
    }
</style>
