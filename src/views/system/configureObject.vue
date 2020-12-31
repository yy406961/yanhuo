<template>
    <div class="ga-all">
        <frameCom>
            <!-- 标签页 -->
            <div class="ga-all__tabs">
                <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                    <el-tab-pane label="目标号码" name="first"></el-tab-pane>
                    <el-tab-pane label="重点区域" name="second"></el-tab-pane>
                    <el-tab-pane label="关键词" name="third"></el-tab-pane>
                </el-tabs>
            </div>
            <!-- 表单 -->
            <div class="ga-all__forms">
                <formComp :option="formOpt1" v-show="activeName === 'first'"
                          ref="form1"></formComp>
                <formComp :option="formOpt2" v-show="activeName === 'second'"
                          ref="form2"></formComp>
                <formComp :option="formOpt3" v-show="activeName === 'third'"
                          ref="form3"></formComp>
            </div>
            <!-- 表格 -->
            <div class="ga-all__tables">
                <tableComp :option="tableOpt1" :comSize="tableHeight1"
                           v-show="activeName === 'first'"
                           @handleCurrentPageChange="tableCurrent1"
                           @handleSizePageChange = "tableSize1"></tableComp>
                <tableComp :option="tableOpt2" :comSize="tableHeight2"
                           v-show="activeName === 'second'"
                           @handleCurrentPageChange="tableCurrent2"
                           @handleSizePageChange = "tableSize2"></tableComp>
                <tableComp :option="tableOpt3" :comSize="tableHeight3"
                           v-show="activeName === 'third'"
                           @handleCurrentPageChange="tableCurrent3"
                           @handleSizePageChange = "tableSize3"></tableComp>
            </div>
        </frameCom>
        <!-- 地图弹窗 -->
        <sysDialog title="重点区域"
                   size="small"
                   @change="dialogChange"
                   :dialogVisible='dialogShow'
                   :showCancel="false"
                   :showConfirm="false">
            <div class="ga-all__maps">
                <div class="ga-all__maps" id="map"></div>
            </div>
        </sysDialog>
    </div>
</template>

<script>
    import tableComp from 'components/Table/'
    import formComp from 'components/Form/index'
    import sysDialog from 'components/common/dialog'
    import frameCom from 'components/monitor/frame'
    import { mapGetters } from 'vuex'
    import BMap from 'BMap'
    import { taskLoad, personFlagLoad, mapArea, tagNum, importArea, keyWords } from 'api/system/configureObject.js'
    export default {
        data () {
            return {
                // 标签页的绑定值
                activeName: 'first',
                dialogShow: false,
                // 存储查询条件
                tagNumObj: '',
                importAreaObj: '',
                keyWordsObj: '',
                formOpt1: {
                    inline: true,
                    items: [
                        {
                            label: '姓名',
                            type: 'text',
                            comOpt: {
                                id: 'name',
                                value: ''
                            }
                        },
                        {
                            label: '目标号码',
                            type: 'text',
                            comOpt: {
                                id: 'usernum',
                                value: ''
                            }
                        },
                        {
                            label: '任务名称',
                            type: 'select',
                            comOpt: {
                                id: 'taskNameOne',
                                data: []
                            }
                        },
                        {
                            label: '人物标签',
                            type: 'select',
                            comOpt: {
                                id: 'personTag',
                                data: []
                            }
                        }
                    ],
                    btns: [
                        {
                            type: 'button',
                            comOpt: {
                                value: '查询',
                                click: () => {
                                    let obj = this.$refs.form1.getValue();
                                    this.tagNumObj = obj;
                                    this.tagNumFun(obj, 1, 10);
                                }
                            }
                        }
                    ]
                },
                formOpt2: {
                    inline: true,
                    // btnPos: 'right',
                    items: [
                        {
                            label: '重点区域',
                            type: 'text',
                            comOpt: {
                                id: 'area',
                                value: ''
                            }
                        },
                        {
                            label: '任务名称',
                            type: 'select',
                            comOpt: {
                                id: 'taskNameTwo',
                                data: []
                            }
                        }
                    ],
                    btns: [
                        {
                            type: 'button',
                            comOpt: {
                                value: '查询',
                                click: () => {
                                    let obj = this.$refs.form2.getValue();
                                    this.importAreaObj = obj;
                                    this.importAreaFun(obj, 1, 10);
                                }
                            }
                        }
                    ]
                },
                formOpt3: {
                    inline: true,
                    items: [
                        {
                            label: '关键词',
                            type: 'text',
                            comOpt: {
                                id: 'keyWord',
                                value: ''
                            }
                        },
                        {
                            label: '任务名称',
                            type: 'select',
                            comOpt: {
                                id: 'taskNameThree',
                                data: []
                            }
                        }
                    ],
                    btns: [
                        {
                            type: 'button',
                            comOpt: {
                                value: '查询',
                                click: () => {
                                    let obj = this.$refs.form3.getValue();
                                    this.keyWordsObj = obj;
                                    this.keyWordsFun(obj, 1, 10);
                                }
                            }
                        }
                    ]
                },
                tableOpt1: {
                    listLoading: false,
                    column: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '目标号码', value: 'msisdn', width: 180, align: 'center' },
                        { name: '姓名', value: 'name', width: 100, align: 'center' },
                        { name: '卡号', value: 'imsi', width: 100, align: 'center' },
                        { name: '机身码', value: 'imei', width: 150, align: 'center' },
                        { name: '任务名称', value: 'taskName', align: 'center' },
                        { name: '功能', value: 'func', width: 280, align: 'center' },
                        { name: '标签', value: 'flag', width: 100, align: 'center' }
                    ],
                    data: [],
                    pagination: true,
                    pageOpt: {
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                },
                tableOpt2: {
                    listLoading: false,
                    column: [
                        { name: '序号', value: 'index', width: 120, align: 'center' },
                        { name: '重点区域名称', value: 'areaName', width: 350, align: 'center' },
                        { name: '任务名称', value: 'taskName', align: 'center' },
                        { name: '功能', value: 'func', width: 330, align: 'center' },
                        { name: '操作', value: 'operate', operations: [{
                            label: '查看',
                            type: 'label',
                            click: (e) => {
                                this.dialogShow = true;
                                this.$nextTick(() => {
                                    this.mapAreaFun(e.resourceId);
                                })
                            }
                        }], width: 150, align: 'center' }
                    ],
                    data: [],
                    pagination: true,
                    pageOpt: {
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                },
                tableOpt3: {
                    listLoading: false,
                    column: [
                        { name: '序号', value: 'index', width: 120, align: 'center' },
                        { name: '关键词', value: 'words', width: 250, align: 'center' },
                        { name: '任务名称', value: 'taskName', align: 'center' },
                        { name: '功能', value: 'func', width: 530, align: 'center' }
                    ],
                    data: [],
                    pagination: true,
                    pageOpt: {
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                }
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            }),
            tableHeight1 () {
                return {
                    height: this.vsHeight - 145
                }
            },
            tableHeight2 () {
                return {
                    height: this.vsHeight - 175
                }
            },
            tableHeight3 () {
                return {
                    height: this.vsHeight - 175
                }
            }
        },
        mounted () {
            this.taskLoadFun();
            this.personFlagLoadFun();
        },
        methods: {
            handleClick (val) {
                this.activeName = val.name;
            },
            dialogChange (val) {
                this.dialogShow = val;
            },
            // 表格分页
            tableCurrent1 (val) {
                this.tagNumFun(this.tagNumObj, val, this.tableOpt1.pageOpt.pageSize)
            },
            tableSize1 (val) {
                this.tagNumFun(this.tagNumObj, 1, val)
            },
            tableCurrent2 (val) {
                this.importAreaFun(this.importAreaObj, val, this.tableOpt2.pageOpt.pageSize)
            },
            tableSize2 (val) {
                this.importAreaFun(this.importAreaObj, 1, val)
            },
            tableCurrent3 (val) {
                this.keyWordsFun(this.keyWordsObj, val, this.tableOpt3.pageOpt.pageSize)
            },
            tableSize3 (val) {
                this.keyWordsFun(this.keyWordsObj, 1, val)
            },
            // 初始化信息加载
            async taskLoadFun () {
                let resp = await taskLoad()
                resp.rows.forEach((item) => {
                    let obj = {};
                    obj.value = item.taskName;
                    obj.name = item.taskName;
                    this.formOpt1.items[2].comOpt.data.push(obj)
                    this.formOpt2.items[1].comOpt.data.push(obj)
                    this.formOpt3.items[1].comOpt.data.push(obj)
                })
            },
            async personFlagLoadFun () {
                let resp = await personFlagLoad()
                resp.rows.forEach((item) => {
                    let obj = {};
                    obj.value = item.flagName;
                    obj.name = item.flagName;
                    this.formOpt1.items[3].comOpt.data.push(obj)
                })
            },
            // 目标号码查询
            async tagNumFun (obj, page, rows) {
                this.tableOpt1.listLoading = true;
                this.tableOpt1.pageOpt.pageSize = rows
                this.tableOpt1.pageOpt.currentPage = page;
                let resp = await tagNum({
                    name: obj.name,
                    flag: obj.personTag,
                    taskName: obj.taskNameOne,
                    msisdn: obj.usernum,
                    page: page,
                    rows: rows
                });
                if (resp) {
                    this.tableOpt1.listLoading = false;
                    this.tableOpt1.pageOpt.total = resp.total;
                    this.tableOpt1.data = resp.rows;
                } else {
                    this.tableOpt1.listLoading = false;
                }
            },
            // 重点区域查询
            async importAreaFun (obj, page, rows) {
                this.tableOpt2.listLoading = true;
                this.tableOpt2.pageOpt.pageSize = rows
                this.tableOpt2.pageOpt.currentPage = page;
                let resp = await importArea({
                    areaName: obj.area,
                    taskName: obj.taskNameTwo,
                    page: page,
                    rows: rows
                });
                if (resp) {
                    this.tableOpt2.listLoading = false;
                    this.tableOpt2.pageOpt.total = resp.total;
                    this.tableOpt2.data = resp.rows;
                } else {
                    this.tableOpt2.listLoading = false;
                }
            },
            // 查看重点区域
            async mapAreaFun (ids) {
                let resp = await mapArea({
                    resourceId: ids
                })
                if (resp.rows.length < 2) {
                    // 画圆
                    let obj = {};
                    obj.lat = resp.rows[0].latitude;
                    obj.lng = resp.rows[0].longtitude;
                    obj.radius = resp.rows[0].radius;
                    this.drawMap(0, obj)
                } else {
                    // 画多边形
                    let arr = [];
                    resp.rows.forEach(item => {
                        let obj = {}
                        obj.longtitude = item.longtitude;
                        obj.latitude = item.latitude;
                        arr.push(obj);
                    })
                    this.drawMap(1, arr)
                }
            },
            // 关键词查询
            async keyWordsFun (obj, page, rows) {
                this.tableOpt3.listLoading = true;
                this.tableOpt3.pageOpt.pageSize = rows
                this.tableOpt3.pageOpt.currentPage = page;
                let resp = await keyWords({
                    words: obj.keyWord,
                    taskName: obj.taskNameThree,
                    page: page,
                    rows: rows
                });
                if (resp) {
                    this.tableOpt3.listLoading = false;
                    this.tableOpt3.pageOpt.total = resp.total;
                    this.tableOpt3.data = resp.rows;
                } else {
                    this.tableOpt3.listLoading = false;
                }
            },
            // 绘制地图
            drawMap (flag, obj) {
                let map = new BMap.Map('map');
                map.clearOverlays();
                map.enableScrollWheelZoom();
                // 画圆
                if (flag === 0) {
                    let point = new BMap.Point(obj.lng, obj.lat);
                    let circle = new BMap.Circle(point, obj.radius, {
                        strokeColor: 'blue',
                        strokeWeight: 2,
                        strokeOpacity: 1
                    });
                    map.centerAndZoom(point, 15);
                    map.addOverlay(circle);
                } else {
                    let polyArr = [];
                    obj.forEach((item) => {
                        polyArr.push(new BMap.Point(item.longtitude, item.latitude))
                    })
                    let polygon = new BMap.Polygon(polyArr, { strokeColor: 'blue', strokeWeight: 2, strokeOpacity: 0.5 });
                    let pointsArr = [];
                    for (let i in obj) {
                        pointsArr.push({
                            lng: obj[i].longtitude,
                            lat: obj[i].latitude
                        })
                    }
                    let view = map.getViewport(pointsArr);
                    map.centerAndZoom(view.center, view.zoom)
                    map.addOverlay(polygon);
                }
            }
        },
        components: {
            tableComp,
            formComp,
            sysDialog,
            frameCom
        }
    }
</script>

<style scoped>
    @component-namespace ga {
        @b all {
            /*width: 93%;*/
            height: 100%;
            /*margin: 0 auto;*/
            padding: 8px 5px !important;
            @e tabs {
                width: 100%;
                height: 32px;
                padding: 0 5px;
            }
            @e forms {
                width: 100%;
                height: auto;
                padding: 0 5px;
            }
            @e maps {
                width: 95% !important;
                height: 350px !important;
                /*margin: 0 auto;*/
            }
        }
    }
</style>