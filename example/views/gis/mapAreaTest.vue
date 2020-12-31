<template>
    <div>
        <gis :style="mapHeight" @mapCoordinate="getMapCoordinate" ref="gisMap" :option="mapData"></gis>
    </div>
</template>
<script>
import formList from 'components/Form/index'
import buttonComp from 'components/Form/button'
import { mapSelectAreaRangeSave, reviseArea, getCellCoordinate, upService } from 'api/task/taskArea'
import { mapGetters } from 'vuex'
import gis from './gisMap'
export default {
    name: '',
    data() {
        const me = this
        return {
            isUpLoad: false,
            sysOwner: '',
            formHeight: '',
            mapData: {
                areaBorder: [],
                cellInfo: []
            },
            mapRangeBtn: true,
            mapCoordinate: [],
            formOpt: {
                inline: true,
                items: [
                    {
                        label: '区域名称',
                        type: 'text',
                        comOpt: {
                            id: 'areaName',
                            value: '',
                            disabled: false
                        }
                    },
                    {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '清除已框选区域',
                            disabled: false,
                            click: function() {
                                me.isUpLoad = false
                                me.mapCoordinate = []
                                me.mapData = {
                                    areaBorder: [],
                                    cellInfo: []
                                }
                                me.$refs.gisMap.clearAll()
                            }
                        }
                    },
                    {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '上传到服务器',
                            disabled: false,
                            click: function() {
                                me.uploadFun()
                            }
                        }
                    }
                ]
            },
            mapRange: {
                radius: '',
                coordinates: '',
                acreage: ''
            },
            mapSaveBtnOpt: {
                id: 'btn2',
                value: '保存',
                disabled: false,
                click: function() {
                    if (me.isUpLoad || me.reviseAreaId) {
                        me.getMapArea()
                    } else {
                        me.$message('请先上传到服务器')
                    }
                }
            },
            mapReviseBtnOpt: {
                id: 'mapReviseBtnOpt',
                value: '保存',
                disabled: false,
                click: function() {
                    if (me.isUpLoad || me.reviseAreaId) {
                        me.getMapArea()
                    } else {
                        me.$message('请先上传到服务器')
                    }
                }
            },
            reviseAreaId: '',
            areaName: '',
            areaBorder: [],
            cellInfo: []
        }
    },
    methods: {
        // 上传到服务器
        async uploadServer(areaName) {
            let resp = await upService({
                areaSourceType: '2',
                areaName: areaName,
                radius: this.mapRange.radius,
                coordinates: this.mapRange.coordinates,
                acreage: this.mapRange.acreage,
                owner: this.sysOwner
            })
            let { data } = resp
            if (resp) {
                this.mapData = {
                    areaBorder: [],
                    cellInfo: []
                }
                this.isUpLoad = true
                localStorage.setItem('areaBorder', JSON.stringify(data.areaBorderInfoVO))
                localStorage.setItem('cellInfo', JSON.stringify(data.areaIncludeCellVO))
                data.areaBorderInfoVO.map(item => {
                    let point = JSON.stringify(item)
                    this.mapData.areaBorder.push(point)
                })
                data.areaIncludeCellVO.map(item => {
                    let point = JSON.stringify(item)
                    this.mapData.cellInfo.push(point)
                })
            }
        },
        judgeIsRight() {
            let areaName = this.$refs.form.getValue().areaName
            let isRight = false
            this.$refs.gisMap.finishMap()
            if (!areaName) {
                this.$message('请输入区域名称')
            } else if (this.mapCoordinate.length === 0) {
                this.$message('请选择区域')
            } else if (this.mapCoordinate[0] === 'false') {
                this.$message('只能框选一个区域，请重新框选')
                this.mapCoordinate = []
            } else {
                isRight = true
                let list = []
                if (this.mapCoordinate[0] === 'circle') {
                    let arr = []
                    arr.push(this.mapCoordinate[2])
                    arr.push(this.mapCoordinate[3])
                    list.push(arr.join(' '))
                    this.mapRange.radius = this.mapCoordinate[1]
                    this.mapRange.acreage = this.mapCoordinate[4]
                } else {
                    this.mapCoordinate[0].map(item => {
                        let arr = []
                        arr.push(item.lng)
                        arr.push(item.lat)
                        list.push(arr.join(' '))
                    })
                    this.mapRange.radius = 0
                    this.mapRange.acreage = this.mapCoordinate[1]
                }
                this.mapRange.coordinates = list.join(',')
            }
            return { areaName, isRight }
        },
        uploadFun() {
            let judgeObj = this.judgeIsRight()
            if (judgeObj.isRight) {
                this.uploadServer(judgeObj.areaName)
            }
        },

        // 地图框选区域范围保存
        async saveMapRegin(areaName, obj) {
            let resp = await mapSelectAreaRangeSave({
                flag: 1,
                areaSourceType: '2',
                areaName: areaName,
                radius: obj.radius,
                coordinates: obj.coordinates,
                acreage: obj.acreage,
                owner: this.sysOwner
            })
            if (resp) {
                this.$message(resp.message)
                this.mapRange = {
                    radius: '',
                    coordinates: '',
                    acreage: ''
                }
                //                    this.reviseAreaId = resp.data.resourceId
                //                    this.getCellCoordinate({ resourceId: this.reviseAreaId })
                this.mapCoordinate = []
                this.$router.push({ name: '区域管理' })
            }
        },
        // 地图框选区域范围修改
        async reviseArea(obj) {
            // 如果修改失败先清空向后台传的对象，以免下次传入多组数据导致传入的坐标信息以及半径错误
            this.mapCoordinate = []
            let resp = await reviseArea(obj)
            if (resp) {
                this.$message(resp.message)
                //                    this.getCellCoordinate({ resourceId: this.reviseAreaId })
                this.mapCoordinate = []
                this.$router.push({ name: '区域管理' })
            }
        },
        // 接收地图框选坐标
        getMapCoordinate(val) {
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
                circleData.map(item => {
                    let point = JSON.stringify(item)
                    this.mapData.areaBorder.push(point)
                })
                this.mapCoordinate = val
            } else {
                if (val.mapLength === 1) {
                    this.mapData = {
                        areaBorder: [],
                        cellInfo: []
                    }
                    val.path.map(item => {
                        //                            let { lng, lat } = item
                        item.longtitude = item.lng
                        item.latitude = item.lat
                    })
                    val.path.map(item => {
                        let point = JSON.stringify(item)
                        this.mapData.areaBorder.push(point)
                    })
                    this.mapCoordinate.push(val.path)
                    this.mapCoordinate.push(val.acreage)
                } else {
                    this.mapCoordinate = ['false']
                }
            }
        },
        // 基站信息查询
        async getCellCoordinate(obj) {
            let resp = await getCellCoordinate(obj)
            let { data } = resp
            if (resp) {
                this.mapData = {
                    areaBorder: [],
                    cellInfo: []
                }
                localStorage.setItem('areaBorder', JSON.stringify(data.areaBorderInfoVO))
                localStorage.setItem('cellInfo', JSON.stringify(data.areaIncludeCellVO))
                data.areaBorderInfoVO.map(item => {
                    let point = JSON.stringify(item)
                    this.mapData.areaBorder.push(point)
                })
                data.areaIncludeCellVO.map(item => {
                    let point = JSON.stringify(item)
                    this.mapData.cellInfo.push(point)
                })
                this.$router.push({ name: '区域管理' })
            }
        },
        // 根据lac ci画图(上传到服务器按钮)
        getMapArea() {
            let areaName = this.$refs.form.getValue().areaName
            //                this.$refs.gisMap.finishMap()
            if (!areaName) {
                this.$message('请输入区域名称')
            } else if (this.mapCoordinate.length === 0) {
                this.$message('请选择区域')
            } else if (this.mapCoordinate[0] === 'false') {
                this.$message('只能框选一个区域，请重新框选')
                this.mapCoordinate = []
            } else {
                let list = []
                if (this.mapCoordinate[0] === 'circle') {
                    let arr = []
                    arr.push(this.mapCoordinate[2])
                    arr.push(this.mapCoordinate[3])
                    list.push(arr.join(' '))
                    this.mapRange.radius = this.mapCoordinate[1]
                    this.mapRange.acreage = this.mapCoordinate[4]
                } else {
                    this.mapCoordinate[0].map(item => {
                        let arr = []
                        arr.push(item.lng)
                        arr.push(item.lat)
                        list.push(arr.join(' '))
                    })
                    this.mapRange.radius = 0
                    this.mapRange.acreage = this.mapCoordinate[1]
                }
                this.mapRange.coordinates = list.join(',')
                //                        console.log(this.mapCoordinate)
                // 如果存在区域ID，是修改，否则是新增
                if (this.reviseAreaId) {
                    this.reviseArea({
                        flag: 2,
                        areaSourceType: '2',
                        resourceId: this.reviseAreaId,
                        areaName: areaName,
                        radius: this.mapRange.radius,
                        coordinates: this.mapRange.coordinates,
                        owner: this.sysOwner,
                        acreage: this.mapRange.acreage
                    })
                } else {
                    this.saveMapRegin(areaName, this.mapRange)
                }
            }
        }
    },
    components: {
        formList,
        buttonComp,
        gis
    },
    computed: {
        ...mapGetters({
            userName: 'global/userName',
            visualHeight: 'global/visualHeight'
        }),
        mapHeight() {
            return {
                height: '600px',
                width: '100%'
            }
        }
    },
    mounted() {
        this.mapRangeBtn = false
        this.areaName = '昌平CBD'
        this.areaBorder = [
            { radius: 0, latitude: 40.105592, longtitude: 116.371739 },
            { radius: 0, latitude: 40.105592, longtitude: 116.376051 },
            { radius: 0, latitude: 40.103522, longtitude: 116.376051 },
            { radius: 0, latitude: 40.103522, longtitude: 116.371739 },
            { radius: 0, latitude: 40.105592, longtitude: 116.371739 }
        ]
        this.cellInfo = [
            { ispCode: 28158, longtitude: 116.371739, latitude: 40.105592 },
            { ispCode: 28158, longtitude: 116.376051, latitude: 40.105592 },
            { ispCode: 28158, longtitude: 116.376051, latitude: 40.103522 },
            { ispCode: 28158, longtitude: 116.371739, latitude: 40.103522 },
            { ispCode: 28158, longtitude: 116.371739, latitude: 40.105592 }
        ]
        this.mapData = {
            areaBorder: [],
            cellInfo: []
        }
        this.mapData.areaBorder = this.areaBorder
        this.mapData.cellInfo = this.cellInfo
    }
}
</script>
