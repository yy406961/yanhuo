<template>
    <div class="ga-MenuTaskDetail">
        <div class="ga-MenuTaskDetail__taskDescribe" @click="closeDetail">
            <p>任务开始时间：{{ detailData.beginTime }}</p>
            <p>任务结束时间：{{ detailData.endTime }}</p>
            <p>任务目标人数：{{ detailData.taskTargetCount }}人</p>
            <p>任务区域：{{ detailData.taskAreaCount }}个</p>
        </div>
        <div class="ga-MenuTaskDetail__taskConfig">
            <div v-for="m, index in taskConfig" class="ga-MenuTaskDetail__submenuList"
                 @click="goRouter(m)" :key="index" v-text="m.menuName">
            </div>
        </div>
    </div>
</template>

<script>
    import { ajax } from 'common'
    import { mapActions } from 'vuex'
    export default {
        name: 'taskDetail',
        data() {
            return {
                taskId: '',
                taskConfig: [],
                data: []
            }
        },
        props: ['detailData'],
        created() {
            this.taskId = this.detailData.taskBaseId
            this.getConfigList()
        },
        watch: {
            'detailData': {
                deep: true,
                handler (newVal) {
                    if (newVal) {
                        this.taskId = newVal.taskBaseId
                        this.getConfigList()
                    }
                }
            }
        },
        methods: {
            ...mapActions({
                changeMenuState: 'global/changeMenuState'
            }),
            // 任务配置详情
            getConfigList() {
                this.taskConfig.splice(0, this.taskConfig.length)
                let sendTaskId = this.taskId.charAt(0) === 'T'
                    ? this.taskId.substr(1) : this.taskId;
                ajax.post('/task/taskBaseInfoQuery', {
                    taskBaseId: sendTaskId,
                    isDetail: '1'
                }).then(resp => {
                    let { rows } = resp
                    if (rows) {
                        rows.map((val) => {
                            // funStatus 表示此功能的状态为是否被勾选，0 表示未勾选，1 表示勾选，未勾选则不在列表中显示
                            let funStatus = val.dictType === 'funType' && val.funStatus === '0';
                            let alarmStatus = val.dictType === 'alarmType' && val.alarmStatus === '0';
                            let areaStatus = val.dictType === 'importantArea';
                            if (funStatus || alarmStatus || areaStatus) {
                                return
                            }
                            // ---------------------联调---------------------
                            // taskType 表示功能类型，1 表示最新位置查询和表示历史数据查询，2 表示告警类，3 表示关联关系分析，4 表示查询类
                            if (val.taskType === undefined) {
                                if (val.dictType === 'alarmType') {
                                    val.taskType = '2'
                                } else {
                                    var reg = /9\d{4,}/
                                    if (reg.test(val.menuId)) {
                                        // 省内、全国地图
                                        val.taskType = '1'
                                        if (val.menuId === '90005') {
                                            val.taskType = '10'
                                        }
                                    } else if (val.menuId === '80001' || val.menuId === '80002' || val.menuId === '80003') {
                                        // 三个关联关系分析页面
                                        val.taskType = '3'
                                    } else if (val.menuId === '80004' || val.menuId === '80005') {
                                        // SJSZ 页面
                                        val.taskType = '6'
                                    } else if (val.menuId === '80006') {
                                        // 人物画像
                                        val.taskType = '7'
                                    } else if (val.menuId === '80007') {
                                        // 目标事件查询
                                        val.taskType = '8'
                                    } else if (val.menuId === '80008') {
                                        //  app
                                        val.taskType = '9'
                                    } else {
                                        // 短信页面
                                        val.taskType = '4'
                                    }
                                }
                            }
                            // 遍历筛选出实时监测数据
                            // 暂时不考虑分屏显示的场景
                            // if (val.taskType === '1') {
                            //     this.updateTime.push(val)
                            // } else {
                            //     this.data.push(val)
                            // }
                            // 优先添加最新位置查询及历史查询
                            if (val.taskType === '1' || val.taskType === '10') {
                                this.data.push(val)
                            }
                        })
                        rows.map(val => {
                            // 添加 告警
                            if (val.taskType === '2') {
                                this.data.push(val)
                            }
                            // 对重点区域数据进行处理，将每个区域作为一个卡片显示
                            if (val.dictType === 'importantArea' && val.location) {
                                // importantAreaVal 是为了方便本地调试，真实数据返回的是在val.location中，rap 返回的在 val.location.location 中，不用在意这个变量
                                let importantAreaVal = val.location instanceof Array ? val.location : val.location.location;
                                importantAreaVal.map(item => {
                                    let areaLocations = [].concat(item.location);
                                    item.taskType = '5';
                                    item.dictType = 'importantArea';
                                    item.menuId = item.importAreaId;
                                    item.menuName = item.importAreaName + '实时监测';
                                    item.taskBaseId = val.taskBaseId;
                                    item.funStatus = '1';
                                    item.location = {
                                        alarmArea: areaLocations,
                                        alarmMsisdn: []
                                    }
                                    this.data.push(item)
                                })
                            }
                        })
                        rows.map(val => {
                            // 添加关联关系分析
                            if (val.taskType === '3' || val.taskType === '6' || val.taskType === '7' || val.taskType === '8' || val.taskType === '9') {
                                this.data.push(val)
                            }
                        })
                        // 添加 查询类
                        rows.map(val => val.taskType === '4' && this.data.push(val))
                    }
                    this.taskConfig = this.data
                })
                    .catch(error => {
                        console.log(error)
                    })
            },
            // 路由跳转
            goRouter(menu) {
                if (menu.menuId === '4' || menu.menuId === '1') {
                    this.$router.push({
                        path: menu.path,
                        params: {
                            taskId: 'T' + menu.taskBaseId
                        }
                    })
                }
                if (menu.taskType === '2') {
                    this.$router.push({
                        name: '告警模块详情',
                        params: {
                            alarmTaskIdList: menu.alarmTaskIdList,
                            alarmTaskIds: menu.alarmTaskIds,
                            alarmId: menu.menuId,
                            alarmName: menu.menuName,
                            eventName: menu.taskName,
                            taskId: menu.taskBaseId
                        }
                    })
                }
                if (menu.taskType === '5') {
                    this.$router.push({
                        name: '重点区域实时监测',
                        params: {
                            taskId: menu.taskBaseId,
                            areaId: menu.areaId,
                            areaName: menu.menuName
                        }
                    })
                }
                if (menu.taskType !== '2' && menu.taskType !== '5') {
                    this.$router.push({
                        path: menu.path,
                        params: {
                            taskId: menu.taskBaseId
                        }
                    })
                }
                this.changeMenuState(false)
            },
            closeDetail() {
                this.$emit('closeDetail', false)
            }
        }
    }
</script>

<style>
    @component-namespace ga {
        @b MenuTaskDetail {
            width: 270px;
            height: 100%;
            padding-bottom: 26px;
            background: rgba(10,30,56,0.90);
            box-shadow: 2px 0 4px 0 rgba(0,0,0,0.50);
            @e taskDescribe {
                padding-left: 10px;
                padding-top: 60px;
                height: 165px;
                color: rgba(255,255,255,0.75);
                background: rgba(255,255,255,0.05);
                box-shadow: inset 0 -1px 0 0 rgba(255,255,255,0.20);
                cursor: pointer;
                p {
                    font-size: 14px;
                    height: 24px;
                    line-height: 24px;
                }
            }
            @e submenuList {
                height: 36px;
                line-height: 36px;
                cursor: pointer;
                padding: 0 26px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &:hover {
                     background: rgba(0,255,191,0.15);
                     box-shadow: inset 0 -1px 0 0 rgba(0,255,191,0.40), inset 0 1px 0 0 rgba(0,255,191,0.40);
                     color: #fff;
                 }
            }
            @e taskConfig {
                padding-top: 10px;
                height: calc(100% - 170px);
                overflow: auto;
            }
        }
    }
</style>