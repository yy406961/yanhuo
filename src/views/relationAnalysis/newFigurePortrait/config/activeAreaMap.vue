<template>
    <div>
        <div id="activeAreaMap"></div>
        <div class="ga-popover" id="pop"  v-show="popover" ref="popover">
            <el-row style="background-color: #1C74C8;padding: 0px 5px;">
                <el-col :span="22">
                    {{perMsg.name + ' ' + perMsg.phone}}
                </el-col>
                <el-col :span="2" style="height: 22px;">
                    <p class="ga-popover__close" @click="close">&#10005</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22" :offset="1" class="ga-title">
                    <el-row>
                        <span></span>位置信息
                    </el-row>
                </el-col>
                <div class="ga-popover__content">
                    <ul>
                        <template v-for="item in tableData">
                            <li>{{item.name}}</li>
                        </template>
                    </ul>
                    <ul>
                        <template v-for="item in tableData">
                            <div>
                                <li>{{item.value}}</li>
                            </div>
                        </template>
                    </ul>
                </div>
            </el-row>
        </div>
        <sysDialog  size='small'
                    title="活动区域"
                    v-if="detailDialog"
                    @change="dialogChange"
                    :dialogVisible="detailDialog"
                    :showCancel='false'
                    :showConfirm='false'>
            <ul class="ga-dialog__base">
                <li v-for="(item, index) in dialogBaseData">
                    <p>{{item.name}}</p>
                    <el-tooltip :content="item.val" placement="top">
                        <p>{{ item.val }}</p>
                    </el-tooltip>
                </li>
            </ul>
            <ul class="ga-dialog__detail">
                <li>
                    <p>位置中文名</p>
                    <p>{{dialogLocData}}</p>
                </li>
            </ul>
            <!--<tableComp :option="dialogDetailTableOpt"-->
                       <!--:comSize="{height: 250}">-->
            <!--</tableComp>-->
            <!-- <div style="height: 200px">
                <barComp :option="barOpt" :renderData="barChart"></barComp>
            </div> -->
        </sysDialog>
    </div>
</template>

<script>
    // import barComp from 'components/chart/figurePortrait/barApp1'
    import BMap from 'BMap'
    import sysDialog from 'components/common/dialog'
    import { pointRandom } from 'utils'
    import { mapGetters } from 'vuex'
    import tableComp from 'components/Table'
    const RED = './static/vendor/gis/baidumapv2/images/point-collection/red-map-work.png'
    export default {
        data () {
            return {
                barOpt: {
                    width: '',
                    height: '',
                    props: {
                        yName: ''
                    }
                },
                barChart: [],
                dialogBaseData: [
                    { name: '停留时长', val: ' ' },
                    { name: '停留次数', val: ' ' },
                    { name: '基站名称', val: ' ' },
                    { name: 'LAC', val: ' ' },
                    { name: 'CI', val: ' ' },
                    { name: '经度', val: ' ' },
                    { name: '纬度', val: ' ' }
                ],
                dialogDetailTableOpt: {
                    widthType: true,
                    listLoading: false,
//                    emptyText: ' ',
                    stripe: true,
                    column: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '到达时间', value: 'arrivetime', width: 400, align: 'center' },
                        { name: '停留时间', value: 'staytime', align: 'center' }
                    ],
                    data: []
                },
                dialogLocData: '',
                detailDialog: false,
                showData: [],
                smallMapCenter: {},
                popoverContent: 0,
                smallMap: null,
                map: null,
                zoom: 5,
                center: [],
                popover: false,
                perMsg: {},
                pointArr: [],
                lineArr: [],
                color: ['rgb(255, 0, 0)', 'rgb(0, 0, 0)', 'rgb(0, 158, 215)', 'rgb(59, 0, 0)', 'rgb(30, 101, 19)'],
                icon: [RED, RED, RED, RED, RED],
                tableData: [
                    { name: '到达时间', value: ' ' },
                    { name: '位置坐标', value: ' ' },
                    { name: '停留时长', value: ' ' },
                    { name: '位置描述', value: ' ' }
                ],
                // 地图点的等级
                iconLe: [
                    { lev1: 26, lev2: 31 },
                    { lev1: 32, lev2: 36 },
                    { lev1: 37, lev2: 41 },
                    { lev1: 44, lev2: 48 },
                    { lev1: 51, lev2: 55 }
                ]
            }
        },
        props: ['option', 'showIndex', 'rowClick'],
        created () {
        },
        mounted () {
            this.createMap()
        },
        components: {
            // barComp,
            tableComp,
            sysDialog
        },
        watch: {
            'showIndex' () {
                this.createMap()
                if (this.option.info) {
                    this.createPoint()
                }
            },
            'rowClick': {
                deep: true,
                handler (newVal) {
                    if (newVal.type) {
                        this.detailDialog = true;
                        this.$emit('detailDialogChange', true)
                        if (newVal.data) {
                            this.dealDialogData(newVal.data, 'table')
                        }
                    }
                }
            },
            option () {
                this.createPoint()
            }
        },
        computed: {
            ...mapGetters({
                'mapCenter': 'global/globalKeys'
            })
        },
        methods: {
            showIndexChange () {
                this.createMap()
            },
            setLabelShow (marker, message, colorIndex) {
                let label = new BMap.Label(message,
                    { offset: new BMap.Size(5, 0) })
                label.setStyle({
                    backgroundColor: 'transparent',
                    color: '#fff',
                    fontSize: '12px',
                    height: '20px',
                    lineHeight: '20px',
                    opacity: 0.9,
                    border: this.color[colorIndex]
                });
                marker.setLabel(label)
            },
            //  移除名字和号码信息label
            removeMapLable () {
                let markerArr = this.map.getOverlays();
                for (let i in markerArr) {
                    this.map.removeOverlay(markerArr[i].getLabel());
                }
            },
            //  切换显示 位置信息和轨迹
            changeShow (val) {
                this.popoverContent = val;
                if (val === 1) {
                    this.loadSmallMap(this.smallMapCenter);
                }
            },
            //  创建地图
            createMap () {
                let map = new BMap.Map('activeAreaMap', { minZoom: 3, maxZoom: 17 })
                this.map = map
                this.zoom = 10
                let point = new BMap.Point(this.mapCenter.gMapCenter[0], this.mapCenter.gMapCenter[1])
                map.centerAndZoom(point, this.zoom)
                map.enableScrollWheelZoom();
            },
            //  画点
            createPoint () {
                this.createMap();
                let map = this.map
                map.clearOverlays();
                let pointArr = this.option.info
                let pointsArr = [];
                for (let i in pointArr) {
                    if (pointArr[i].longtitude && pointArr[i].latitude) {
                        pointsArr.push({
                            lng: pointArr[i].longtitude,
                            lat: pointArr[i].latitude
                        })
                    }
                }
                let view = map.getViewport(pointsArr);
                map.centerAndZoom(view.center, view.zoom);
                for (let i = pointArr.length - 1; i >= 0; i--) {
                    if (pointArr[i].longtitude && pointArr[i].latitude) {
                        let lev1 = this.iconLe[pointArr[i].level].lev1;
                        let lev2 = this.iconLe[pointArr[i].level].lev2;
                        let myIcon = new BMap.Icon(this.icon[0], new BMap.Size(lev1, lev2), {
                            imageSize: new BMap.Size(lev1, lev2)
                        })
                        let point = new BMap.Point(pointRandom(pointArr[i].longtitude), pointRandom(pointArr[i].latitude))
                        let marker = new BMap.Marker(point, { icon: myIcon })
                        map.addOverlay(marker)
                        let me = this;
                        let ids = pointArr[i].ids
                        marker.addEventListener('click', function () {
                            me.detailDialog = true;
                            me.dealDialogData(ids, 'map')
                        })
                    }
                }
            },
            dealDialogData (data, type) {
                let newData;
                if (type === 'map') {
                    this.option.info.forEach(item => {
                        if (item.ids === data) {
                            newData = _.cloneDeep(item);
                        }
                    })
                } else if (type === 'table') {
                    newData = _.cloneDeep(data);
                }
                // 弹窗数据为空使用'----'代替
                for (let i in newData) {
                    if (newData[i] === null || newData[i] === 'null') {
                        newData[i] = '----';
                    }
                }
                let baseData = this.dialogBaseData
                baseData[0].val = newData.allTime
                baseData[1].val = newData.count + ''
                baseData[2].val = newData.uliName
                baseData[3].val = newData.lac
                baseData[4].val = newData.ci
                baseData[5].val = newData.longtitude
                baseData[6].val = newData.latitude
                this.barOpt = {
                    width: '100%',
                    height: 200,
                    props: {
                        yName: '天数'
                    }
                }
                this.barChart = [1, 1, 1, 1, 1]
                this.dialogBaseData = baseData
                // 位置中文名
                this.dialogLocData = newData.localDescripe;
                // this.dialogLocData = data.arr2[0];
                // this.dialogDetailTableOpt.data = data.detail
            },
            //  关闭详情框
            close () {
                this.popover = false
            },
            dialogChange (val) {
                this.detailDialog = val;
                this.$emit('detailDialogChange', val)
            }
        }
    }
</script>

<style scoped lang="postcss">
    #activeAreaMap {
        width: 100%;
        height: 100%;
        /*margin-top: 5%;*/
        position: absolute;
    }
    @component-namespace ga {
        @b dialog {
            @e base {
                width: 100%;
                height: 60px;
                list-style: none;
                display: table;
                table-layout: fixed;
                border-bottom: 1px solid #4F8EE5;
                border-right: 1px solid #4F8EE5;
                margin-bottom: 6px;
                & li {
                    display: table-cell;
                    line-height: 30px;
                    text-align: center;
                    & p {
                        border-top: 1px solid #4F8EE5;
                        border-left: 1px solid #4F8EE5;
                        white-space: nowrap;
                        text-overflow:ellipsis;
                        overflow: hidden;
                        min-height: 30px;
                    }
                    & p:first-child {
                        background: #102546;
                    }
                }
            }
            @e detail {
                width: 100%;
                height: 32px;
                list-style: none;
                display: table;
                table-layout: fixed;
                border-bottom: 1px solid #4F8EE5;
                border-right: 1px solid #4F8EE5;
                margin-bottom: 6px;
                & li:first-child {
                    width: 100%;
                    display: table-cell;
                    line-height: 30px;
                }
                & li p {
                    border-top: 1px solid #4F8EE5;
                    border-left: 1px solid #4F8EE5;
                    text-align: center;
                    min-height: 30px;
                    float: left;
                }
                & li p:first-child {
                    background: #102546;
                    width: 20%;
                }
                & li p:last-child {
                    background: #102546;
                    width: 80%;
                }
            }
        }
        @b popover {
            position: absolute;
            width: 375px;
            height: 190px;
            background-color: rgba(0,0,0,0.7);
            color: #ffffff;
            font-size: 10px;
            z-index: 666;
            border-bottom-right-radius: 15px;
            @e close {
                font-size: 10px;
                color: #ffffff;
                padding: 0px 0px 1px 6px;
                cursor: pointer;
                &:hover {
                    /*color: #20a0ff;*/
                }
            }
            @e title {
                display: inline-block;
                text-align: left;
                padding: 5px 10px;
                color: #fff;
                /*background-color: #268CC6;*/
            }
            @e content {
                padding: 5px 10px;
                height: 160px;
                text-align: center;
                & ul:first-child {
                    display: inline-block;
                }
                & ul:first-child li {
                    width: 100px;
                    height: 30px;
                    line-height: 30px;
                    /*background-color: #7FC7DE;*/
                    overflow-y: hidden;
                }
                & ul:last-child {
                    display: inline-block;
                    /*width: 250px;*/
                    overflow: auto;
                }
                & ul:last-child li {
                    width: 250px;
                    height: 30px;
                    line-height: 30px;
                    /*background-color: #7FC7DE;*/
                    overflow-y: hidden;
                    white-space: nowrap;
                    & div {
                        min-width: 250px;
                        max-width: 400px;
                    }
                }
                & li:not(last-child) {
                    /*border-top: 1px solid #CCCCCC;*/
                    /*border-left: 1px solid #CCCCCC;*/
                    /*border-right: 1px solid #CCCCCC;*/
                }
                & li:last-child {
                    /*border-bottom: 1px solid #CCCCCC;*/
                }
            }
        }
    }
</style>
