<template>
    <div class="ga-all">
        <el-row>
            <el-col :span="12" v-loading="mapLoading">
            <!-- 图例方案一 -->
                <!-- <div class="legendBox">
                    <div class="workLegend"></div>
                    <span>工作地</span>
                    <div class="residenceLegend"></div>
                    <span>居住地</span>
                </div> -->
                <div id="residenceMap" class="ga-all__left">
                </div>
            </el-col>
            <el-col :span="12">
                <div class="ga-all__right">
                    <p class="ga-all__right--title">工作地（红色气泡代表工作地）</p>
                    <tableComp :option="tableWork" :comSize="workHeight"></tableComp>
                    <p class="ga-all__right--title">居住地（绿色气泡代表居住地）</p>
                    <tableComp :option="tableResidence" :comSize="residenceHeight"></tableComp>
                </div>
            </el-col>
        </el-row>
        <sysDialog size='small'
                   v-if="dialogShow"
                   :title='dialogTittle'
                   @change="dialogResult"
                   :dialogVisible="dialogShow"
                   :showCancel='false'
                   :showConfirm='false'>
                   <ul class="dialogUl">
                        <li v-for="(item, index) in dialogValue">
                            <p>{{item.key}}</p>
                            <el-tooltip :content="item.value" placement="top">
                                <p>{{ item.value }}</p>
                            </el-tooltip>
                        </li>
                    </ul>
                   <ul class="dialogUlMap">
                        <li v-for="(item, index) in dialogValue2">
                            <p>{{item.key}}</p>
                            <p>{{item.value}}</p>
                        </li>
                    </ul>
                   <!-- <div class="barBox">
                       <transverse :renderBar="renderBar"></transverse>
                   </div> -->
        </sysDialog>
    </div>
</template>

<script>
    // import { notNull } from 'utils'
    import tableComp from 'components/Table'
    import sysDialog from 'components/common/dialog'
    import BMap from 'BMap'
    // import transverse from './transverse.vue'
    import { mapGetters } from 'vuex'
    import { ajax } from 'common'
    // import { residencePlace } from 'api/relationAnalysis/newFigurePortrait/stability'
    const RED = './static/vendor/gis/baidumapv2/images/point-collection/red-map-work.png'
    const GREEN = './static/vendor/gis/baidumapv2/images/point-collection/green-map-work.png'
    export default {
        props: ['renderData', 'showIndexChange'],
        data () {
            return {
                mapLoading: false,
                map: '',
                // 存储页面所有数据 -- 毕竟只返回一次数据
                rowsArr: [],
                renderBar: [],
                dialogTittle: '',
                dialogShow: false,
                dialogValue: [
                    { key: '停留总时长' },
                    { key: '停留次数' },
                    { key: '基站名称' },
                    { key: 'LAC' },
                    { key: 'CI' },
                    { key: '经度' },
                    { key: '纬度' }
                ],
                dialogValue2: [
                    { key: '位置中文名' }
                ],
                tableWork: {
                    listLoading: false,
                    // 数据是否完整加载的状态试别
                    dataLoading: false,
                    column: [
                        { name: '排行', value: 'index', align: 'center', width: 80 },
                        { name: '停留总时长', value: 'allTime', align: 'center', width: 80, tooltip: true },
                        { name: 'LAC', value: 'lac', width: 120, align: 'center' },
                        { name: 'CI', value: 'ci', width: 120, align: 'center' },
                        { name: '位置描述', value: 'localDescripe', tooltip: true, align: 'center' }
                    ],
                    data: [],
                    rowClick: (row) => {
                        this.dialogTittle = '工作地'
                        this.placeDialogFun(row.ids, 'residence')
                    }
                },
                tableResidence: {
                    listLoading: false,
                    dataLoading: false,
                    column: [
                        { name: '排行', value: 'index', width: 80, align: 'center' },
                        { name: '停留总时长', value: 'allTime', width: 80, align: 'center', tooltip: true },
                        { name: 'LAC', value: 'lac', width: 120, align: 'center' },
                        { name: 'CI', value: 'ci', width: 120, align: 'center' },
                        { name: '位置描述', value: 'localDescripe', tooltip: true, align: 'center' }
                    ],
                    data: [],
                    rowClick: (row) => {
                        this.dialogTittle = '居住地'
                        this.placeDialogFun(row.ids, 'place')
                    }
                },
                mapArr: [],
                icon: RED,
                icon1: GREEN,
                // 地图点的等级
                iconLe: [
                    { lev1: 24, lev2: 31 },
                    { lev1: 30, lev2: 36 },
                    { lev1: 35, lev2: 41 },
                    { lev1: 42, lev2: 48 },
                    { lev1: 48, lev2: 55 }
                ]
            }
        },
        watch: {
            'showIndexChange' (val) {
                if (val === 7 && !this.renderData) {
                    this.drawMap();
                }
                if (val === 7) {
                    // 数据状态与loading状态同步
                    this.tableWork.listLoading = this.tableWork.dataLoading;
                    this.tableResidence.listLoading = this.tableResidence.dataLoading;
                } else {
                    this.tableWork.listLoading = false;
                    this.tableResidence.listLoading = false;
                }
            },
            'renderData' () {
                this.tableWork.dataLoading = false;
                this.tableResidence.dataLoading = false;
                if (this.renderData.msisdn) {
                    this.drawMap();
                    this.residencePlaceFun();
                }
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'mapCenter': 'global/globalKeys'
            }),
            workHeight () {
                return {
                    height: (this.vsHeight - 70) / 2 - 25
                }
            },
            residenceHeight () {
                return {
                    height: (this.vsHeight - 70) / 2 - 25
                }
            }
        },
        mounted () {
            // this.residencePlaceFun()
        },
        methods: {
            // 请求弹窗数据
            placeDialogFun (ids, type) {
                // 依据type找出应便利的数组
                let dataArr = []
                if (type === 'pointArr') {
                    dataArr = this.rowsArr.pointArr
                } else if (type === 'place') {
                    dataArr = this.rowsArr.place
                } else if (type === 'residence') {
                    dataArr = this.rowsArr.residence
                }
                this.dialogShow = true;
                dataArr.forEach(item => {
                    if (item.ids === ids) {
                        // 用字段赋值稍显冗余
                        this.dialogValue[0].value = item.allTime
                        this.dialogValue[1].value = item.count
                        this.dialogValue[2].value = item.uliName
                        this.dialogValue[3].value = item.lac
                        this.dialogValue[4].value = item.ci
                        this.dialogValue[5].value = item.longtitude
                        this.dialogValue[6].value = item.latitude
                        this.dialogValue2[0].value = item.localDescripe
                    }
                })
                // 数据加载好后再赋值
                // this.$nextTick(() => {
                //     this.renderBar = resp.data.barArr
                // })
            },
            // 弹窗状态变化
            dialogResult (val) {
                this.dialogShow = val;
            },
            // 加载地图/表格数据
            async residencePlaceFun () {
                // 改变loading - 数据状态标识
                // window.GALoading.open('查询中, 请耐心等会儿...')
                this.$emit('change', true)
                this.mapLoading = true
                this.tableWork.listLoading = true
                this.tableResidence.listLoading = true
                this.tableWork.dataLoading = true
                this.tableResidence.dataLoading = true
                this.tableWork.data = [];
                this.tableResidence.data = [];
                ajax.post('/baseInfo/getWorkHomeArea', {
                    // flag 和 type为固定数据
                    msisdn: this.renderData.msisdn,
                    flag: 1,
                    type: 4,
                    time: 'null'
                }).then(resp => {
                    if (resp.rows) {
                        this.rowsArr = [];
                        this.rowsArr = resp.rows[0];
                        this.tableResidence.data = this.isNull(resp.rows[0].place)
                        this.tableWork.data = this.isNull(resp.rows[0].residence)
                        this.mapArr = this.isNull(resp.rows[0].pointArr)
                        this.drawMap();
                        this.drawPoint();
                    }
                    this.tableWork.listLoading = false
                    this.tableResidence.listLoading = false
                    this.tableWork.dataLoading = false
                    this.tableResidence.dataLoading = false
                    this.$emit('change', false)
                    this.mapLoading = false
                    // window.GALoading.close()
                }).catch(() => {
                    this.tableWork.listLoading = false
                    this.tableResidence.listLoading = false
                    this.tableWork.dataLoading = false
                    this.tableResidence.dataLoading = false
                    this.$emit('change', false)
                    this.mapLoading = false
                    // window.GALoading.close()
                })
            },
            drawMap () {
                // 百度地图API功能
                let { gMapCenterRvrovice } = this.mapCenter
                let map = new BMap.Map('residenceMap');
                this.map = map;
                map.clearOverlays()
                // 地图中心点
                let point = new BMap.Point(gMapCenterRvrovice[0], gMapCenterRvrovice[1]);
                map.centerAndZoom(point, 9);
                map.enableScrollWheelZoom();
                // 图例方案二
                // 定义一个控件类,即function
                // function ZoomControl () {
                //     // 默认停靠位置和偏移量
                //     this.defaultAnchor = 0;
                //     this.defaultOffset = new BMap.Size(10, 10);
                // }
                // // 通过JavaScript的prototype属性继承于BMap.Control
                // ZoomControl.prototype = new BMap.Control();
                // // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
                // // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
                // ZoomControl.prototype.initialize = function (map) {
                //     // 创建一个DOM元素
                //     let div = document.createElement('div');
                //     let div1 = document.createElement('div');
                //     let div2 = document.createElement('div');
                //     let div3 = document.createElement('div');
                //     let div4 = document.createElement('div');
                //     // 大Box
                //     div.style = 'legendBox'
                //     div.style.width = 250 + 'px';
                //     div.style.height = 30 + 'px';
                //     div.style.lineHeight = 30 + 'px';
                //     div.style.textAlign = 'center';
                //     // div1
                //     div1.style.width = 30 + 'px';
                //     div1.style.height = 14 + 'px';
                //     div1.style.background = 'red';
                //     div1.style.display = 'inline-block'
                //     // div2
                //     div2.style.display = 'inline-block'
                //     div2.innerText = '工作地'
                //     div2.style.width = 50 + 'px';
                //     div2.style.height = 20 + 'px';
                //     // div3
                //     div3.style.width = 30 + 'px';
                //     div3.style.height = 14 + 'px';
                //     div3.style.background = 'green';
                //     div3.style.display = 'inline-block'
                //     // div4
                //     div4.style.display = 'inline-block'
                //     div4.style.width = 50 + 'px';
                //     div4.style.height = 20 + 'px';
                //     div4.innerText = '居住地'

                //     div.appendChild(div1);
                //     div.appendChild(div2);
                //     div.appendChild(div3);
                //     div.appendChild(div4);
                //     // 添加DOM元素到地图中
                //     map.getContainer().appendChild(div);
                //     // 将DOM元素返回
                //     return div;
                // }
                // // 创建控件
                // let myZoomCtrl = new ZoomControl();
                // // 添加到地图当中
                // map.addControl(myZoomCtrl);
            },
            drawPoint () {
                let this_ = this;
                let map = this.map;
                // 编写自定义函数,创建标注
                function addMarker (point, level, datas, ids) {
                    let lev1 = this_.iconLe[level].lev1;
                    let lev2 = this_.iconLe[level].lev2;
                    let icons;
                    if (+datas === 1) {
                        icons = this_.icon;
                    } else {
                        icons = this_.icon1
                    }
                    let myIcon = new BMap.Icon(icons, new BMap.Size(lev1, lev2), {
                        imageSize: new BMap.Size(lev1, lev2)
                    })
                    var marker = new BMap.Marker(point, { icon: myIcon });
                    marker.addEventListener('click', () => {
                        // 为弹窗标题赋值
                        if (+datas === 1) {
                            this_.dialogTittle = '工作地'
                        } else {
                            this_.dialogTittle = '居住地'
                        }
                        // 点的点击事件
                        this_.placeDialogFun(ids, 'pointArr')
                    });
                    map.addOverlay(marker);
                }
                if (this.mapArr.length && this.mapArr.length > 0) {
                    let pointsArr = [];
                    for (let i in this.mapArr) {
                        pointsArr.push({
                            lng: this.mapArr[i].longtitude,
                            lat: this.mapArr[i].latitude
                        })
                    }
                    let view = map.getViewport(pointsArr);
                    map.centerAndZoom(view.center, view.zoom);
                    this.mapArr.forEach((item) => {
                        let level = item.level;
                        let datas = item.type;
                        let ids = item.ids
                        let point = new BMap.Point(item.longtitude, item.latitude);
                        addMarker(point, level, datas, ids);
                    })
                }
            },
            // 不显示NULL
            isNull(data) {
                let { entries } = Object
                data.map(item => {
                    for (let [key, value] of entries(item)) {
                        if (value === null || value === 'null') {
                            item[key] = '----'
                        } else {
                            item[key] = value
                        }
                    }
                })
                return data
            }
        },
        components: {
            tableComp,
            sysDialog
            // transverse
        }
    }
</script>

<style scoped>
    .legendBox {
        width: 250px;
        height: 30px;
        line-height: 30px;
        text-align: center;
    }
    .workLegend {
        width: 30px;
        height: 14px;
        background: red;
        display: inline-block;
        margin: 0 5px;
    }
    .residenceLegend {
        width: 30px;
        height: 14px;
        background: green;
        display: inline-block;
        margin: 0 5px;
    }
    .el-row {
        width: 100%;
        height: 100%;
    }
    .el-col {
        height: 100%;
    }
    .barBox {
        width: 100%;
        height: 200px;
    }
    .dialogUlMap {
        width: 100%;
        height: 32px;
        list-style: none;
        border-bottom: 1px solid #4F8EE5;
        border-right: 1px solid #4F8EE5;
        margin-bottom: 6px;
    }
    .dialogUlMap li {
        height: 32px;
        width: 100%;
        overflow: hidden;
        line-height: 30px;
        text-align: center;
    }
    .dialogUlMap li p:first-child{
        width: 20%;
        height: 30px;
        background: #102546;
        float: left;
        border-top: 1px solid #4F8EE5;
        border-left: 1px solid #4F8EE5;
        min-height: 30px;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
    }
    .dialogUlMap li p:last-child{
        width: 80%;
        float: left;
        height: 30px;
        border-top: 1px solid #4F8EE5;
        border-left: 1px solid #4F8EE5;
        min-height: 30px;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
    }
    .dialogUl {
        width: 100%;
        height: 60px;
        list-style: none;
        display: table;
        table-layout: fixed;
        border-bottom: 1px solid #4F8EE5;
        border-right: 1px solid #4F8EE5;
        margin-bottom: 6px;
    }
    .dialogUl li {
        display: table-cell;
        line-height: 30px;
        text-align: center;
    }
    .dialogUl li p {
        border-top: 1px solid #4F8EE5;
        border-left: 1px solid #4F8EE5;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
        min-height: 30px;
    }
    .dialogUl li p:first-child {
        background: #102546;
    }
    @component-namespace ga {
        @b all {
            width: 100%;
            height: 100%;
            @e left {
                width: 100%;
                height: 100%;
                position: relative;
            }
            @e right {
                width: 100%;
                height: 100%;
                @m title {
                    width: 100%;
                    height: 25px;
                    font-size: 14px;
                    line-height: 25px;
                    color: #9af5f6;
                }
            }
        }
    }
</style>
