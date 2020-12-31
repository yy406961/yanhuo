<template>
    <div>
        <el-row>
            <el-col :span="24">
                <tableComp :option="tableOpt" class="tableComp" :comSize="tableSize" @handleCurrentPageChange="handleCurrentPageChange" @handleSizePageChange = "handleSizePageChange"></tableComp>
            </el-col>
        </el-row>
        <sysDialog size="large" :title="dialogTitle" :dialogVisible="dialogShow" @change="dialogChange">
                <littleGis :style="showMap" :option="mapData"></littleGis>
        </sysDialog>
    </div>
</template>
<script>
    import square from 'components/common/square'
    import tableComp from 'components/Table'
    import { mapGetters } from 'vuex'
    import sysDialog from 'components/common/dialog'
    import { selectedAreaInfoQuery } from 'api/task/taskArea'
    import littleGis from '../taskCreate/config/showMapArea'
    import { getCellCoordinate } from 'api/task/taskArea'

    export default {
        name: 'approval',
        data () {
            let me = this
            return {
                dialogTitle: '',
                acreage: '',
                mapInfo: {},
                areaBaseInfoId: '',
                dialogShow: false,
                pageOpt: {
                    approverStatus: '',
                    rows: 10,
                    page: 1
                },
                mapData: '',
                tableOpt: {
                    listLoading: false,
                    //  是否为斑马纹 table
//                    rowHeight: 50,
                    stripe: false,
                    column: [
                        // 首列是否显示序号、复选框index/selection
                        { name: '序号', value: 'index', width: 120, align: 'center' },
                        { name: '区域名称', value: 'areaName', width: 700, align: 'center' },
                        { name: '操作', value: '', align: 'center', operations: [
                            { label: '查看', type: 'label', click: me.editClick }
                        ] }
                    ],
                    data: [],
                    // 是否分页
                    pagination: false,
                    // 分页参数
                    pageOpt: {
                        currnetPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    },
                    rowClick: function (row) {
                        me.dialogTitle = row.areaName
                        me.getCellCoordinate({ resourceId: row.resourceId })
                    }
                }
            }
        },
        props: {
            taskIdProp: {
                type: String
            },
            approverStatusProp: {
                type: Number
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            }),
            squareHeight () {
                return {
                    height: this.vsHeight - 160 + 'px'
                }
            },
            tableSize () {
                return {
                    height: Math.floor((this.vsHeight - 180) / 4)
                }
            },
            showMap () {
                return {
                    height: this.vsHeight - 175 + 'px',
                    width: '100%'
                }
            }
        },
        mounted () {
            this.pageOpt.approverStatus = this.approverStatusProp;
            this.selectedAreaInfoQuery();
        },
        methods: {
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
//                    data.cellInfo.map(item => {
//                        let point = JSON.stringify(item);
//                        this.mapData.cellInfo.push(point)
//                    })
                    data.areaIncludeCellVO.map(item => {
                        let point = JSON.stringify(item);
                        this.mapData.cellInfo.push(point)
                    })
                    this.acreage = data.acreage
                    this.mapInfo = data
                }
            },
            async selectedAreaInfoQuery () {
                this.pageOpt.owner = this.taskIdProp;
                let resp = await selectedAreaInfoQuery(this.pageOpt);
                if (resp) {
                    // console.log(resp)
                    this.tableOpt.data = resp.rows;
                    this.tableOpt.pageOpt.total = resp.total;
                }
            },
            dialogChange (val) {
                this.dialogShow = val;
            },
            handleCurrentPageChange (val) {
                this.pageOpt.page = val;
                this.selectedAreaInfoQuery();
            },
            handleSizePageChange (val) {
//                console.log(val);
                this.pageOpt.rows = val;
                this.tableOpt.pageOpt.currentPage = 1;
                this.selectedAreaInfoQuery();
            },
            editClick (row) {
                this.dialogShow = true;
//                console.log(row);
                this.mapData = {
                    areaBorder: [],
                    cellInfo: []
                }
                row.areaBorderInfoVO.map(item => {
                    let point = JSON.stringify(item);
                    this.mapData.areaBorder.push(point)
                })
                row.cellInfo.map(item => {
                    let point = JSON.stringify(item);
                    this.mapData.cellInfo.push(point)
                })
            }
        },
        components: { square, tableComp, sysDialog, littleGis }
    }
</script>
<style scoped>
    .square {
        margin-top: 13px;
    }
</style>
