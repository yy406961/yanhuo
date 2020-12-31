<template>
    <div style="height: 100%;">
        <div class="ga-layout__bodyTitle">
            <span class="ga-layout__titleTopLeft"></span>
            <span class="ga-layout__titleLeft"></span>
            <span class="ga-layout__titleCenter">{{ detailTitle }}</span>
            <span class="ga-layout__titleRight"></span>
            <span class="ga-layout__titleRightLeft"></span>
        </div>
        <div class="ga-taskDetail__body-section1">
            <!-- <div class="ga-taskDetail__body-task-warn"> -->
            <div class="ga-taskDetail__body--taskDetail-numBox">
                <!-- 10 -->
                任务起止时间：
                <span>{{startTime}}——{{endTime}}</span>
                ；任务目标人数：
                <span>{{taskTarNum}}</span>
                人；任务区域：
                <span>{{taskAreaNum}}</span>
                个
            </div>
            <div class="ga-taskDetail__body-task-operate">
                <span v-if="overStatus" style="padding-top: 6px;padding-right: 8px;color: red;">当前任务将于 {{ endTime }} 到期！</span>
                <el-button type="primary"
                           @click="deployTask">配置任务</el-button>
                <el-button type="primary"
                           @click="stopTask">中止任务</el-button>
                <el-button type="primary"
                           @click="exitTask">退出任务</el-button>
            </div>
        </div>
        <div class="ga-taskDetail__body-taskSection2">
            <div class="partOne"
                 v-loading="loading">
                <!-- 列表,有实时监测时 -->
                <div class="mapBoxOne"
                     :style="widthStyle"
                     v-if="updateTime.length > 0 && currentNum === 1"
                     v-for="(item, i) in updateTime"
                     :key="i">
                    <div class="contentBg">
                        <gis v-if="item.menuId === '4' || item.menuId === '1'"
                             :type="item.dictType"
                             :menuId="item.menuId"
                             :owner="item.taskBaseId"></gis>
                    </div>
                    <div class="iconTopCenter">
                        <div>
                            <router-link v-if="item.menuId === '4' || item.menuId === '1'"
                                         :to="{ name: item.menuName, params: { taskId: 'T' + item.taskBaseId }}">
                                {{item.menuName}}
                            </router-link>
                        </div>
                    </div>
                    <div class="iconTopLeft"></div>
                    <div class="iconLeftTop"></div>
                    <div class="iconBotLeft"></div>
                    <div class="iconBotRight"></div>
                    <div class="iconTopRight"></div>
                </div>
                <!-- 无实时监测 -->
                <div class="mapBoxOne"
                     :style="widthStyle"
                     v-if="updateTime.length === 0 || currentNum !== 1"
                     v-for="(item, i) in currentList"
                     :key="i">
                    <!-- 告警地图显示 -->
                    <div :class="{
                                        cardBg: true,
                                        contentBg: item.taskType === '1' || item.taskType === '2' || item.taskType === '5',
                                        contentAnalysisBg: item.taskType === '3',
                                        contentTableBg: item.taskType === '4' || item.taskType === '8',
                                        contentSJSZBg: item.taskType === '6',
                                        contentAnalysisPeopleDrawBg: item.taskType === '7',
                                        contentAnalysisPeopleAppBg: item.taskType === '9',
                                        informationSourceBg: item.taskType === '10'
                                    }">
                        <gis v-if="item.taskType === '1' || item.taskType === '2' || item.taskType === '5'"
                             :type="item.dictType"
                             :menuId="item.menuId"
                             :owner="item.taskBaseId"
                             :alarmMapData="item.location"></gis>
                    </div>
                    <div v-show="item.taskType === '2'"
                         class="iconWarnNum">{{ item.alarmCount }}</div>
                    <div class="lastWarnTime"
                         v-show="item.taskType === '2'">
                        最新一次告警时间：{{ item.alarmTime | setAlarmTime }}
                    </div>
                    <div class="iconTopCenter">
                        <div>
                            <router-link v-if="item.taskType === '2'"
                                         :to="{ name:'告警模块详情', params: { alarmTaskIdList: item.alarmTaskIdList, alarmTaskIds:item.alarmTaskIds, alarmId: item.menuId, alarmName: item.menuName, eventName: detailTitle, taskId: item.taskBaseId }}">
                                {{item.menuName}}
                            </router-link>
                            <router-link v-else-if="item.taskType === '5'"
                                         :to="{ name:'重点区域实时监测', params: { taskId: item.taskBaseId, areaId: item.areaId, areaName: item.menuName }}">
                                {{item.menuName + '实时监测'}}
                            </router-link>
                            <router-link v-else-if="item.taskType !== '2' && item.taskType !== '5'"
                                         :to="{ path:item.path, params: { taskId: item.taskBaseId }}">
                                {{item.menuName}}
                            </router-link>
                        </div>
                    </div>
                    <div class="iconTopLeft"></div>
                    <div class="iconLeftTop"></div>
                    <div class="iconBotLeft"></div>
                    <div class="iconBotRight"></div>
                    <div class="iconTopRight"></div>
                </div>
            </div>
        </div>
        <div style="clear: both"></div>
        <warnSound ref="warn"></warnSound>
        <pageBar :totalPageNum="totalPageNum"
                 :isPageHasNews="isPageHasNews"
                 :currentNum="currentNum"
                 @update:currentNum=" val => currentNum = val "></pageBar>
        <sysDialog size="tiny"
                    title="提示"
                    @change="dialogChangeStopTask"
                    @openCallback="dialogOpendCallbackStopTask"
                    :dialogVisible="dialogVisibleStopTask"
                    :okFn="okFnStopTask">
                <el-row>是否确认中止任务?</el-row>
        </sysDialog>
    </div>
</template>

<script>
    import gis from './config/map'
    import BmapCom from '../warning/mapCom'
    import BmapComPart from '../warning/mapComPart'
    import { taskBaseInfoQuery, stopTask } from 'api/task/taskDetail'
    import pageBar from './index/PageBar'
    import Io from 'utils/websocket'
    import sysDialog from 'components/common/dialog'
    import warnSound from 'components/common/warnSound'
    // import axios from 'axios'
    // import io from 'utils/websocket1'
    const apiUrl = process.env.NODE_ENV === 'production'
        ? '' : 'ws://10.8.0.14:8080/policeBusiness'
    export default {
        name: 'taskDetail',
        data () {
            return {
                detailTitle: this.$route.params.taskName,
                startTime: this.$route.params.startTime,
                endTime: this.$route.params.endTime,
                taskAreaNum: this.$route.params.taskAreaNum,
                taskTarNum: this.$route.params.taskTarNum,
                taskStatus: this.$route.params.taskStatus,
                updateTime: [],     // 实时监测数据
                data: [],           // 非实时监测数据
                currentList: [],    // 当前页数据
                loading: true,
                taskId: this.$route.params.taskId,
                totalPageNum: 0,
                currentNum: 1,
                nowPage: 1,
                storyUrl: '',
                isPageHasNews: [],
                socketAll: new Io(),
                alarmMapData: {},
                timeMsg: '',
                overStatus: 0,
                dialogVisibleStopTask: false
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                // 通过 `vm` 访问组件实例，记录上一级路径
                vm.storyUrl = from.path
            })
        },
        mounted () {
            this.taskFunListInit();
            this.getTaskDetail();
        },
        beforeDestroy () {
            this.socketAll.disconnect();
        },
        filters: {
            setAlarmTime (val) {
                if (val) {
                    return val.substring(0, val.length - 3)
                }
            }
        },
        computed: {
            // 卡片的宽度样式
            widthStyle () {
                if (this.updateTime.length === 1 && this.currentNum === 1) {
                    return { 'width': '100%' }
                } else if (this.updateTime.length === 2 && this.currentNum === 1) {
                    return {
                        width: '47%',
                        marginLeft: '2%'
                    }
                } else if (this.updateTime.length === 0 || this.currentNum !== 1) {
                    return {
                        width: '23%',
                        height: '45%',
                        margin: '0 1% 2%'
                    }
                }
            },
            // 是否需要记录页码
            witchPageNum () {
                return this.storyUrl === '/task/index' || this.storyUrl === '/task/config'
            },
            // 是否任务到期前七天
            isTaskExpire () {
                let nowTime = new Date();
                let endTime = new Date(this.endTime);
                let range = 7 * 24 * 3600000;
                if (endTime.getTime() - nowTime.getTime() <= range) {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            // 用来加载当前页的方法
            loadPage (totalList, curPageNum, pageSize) {
                let list = [];
                let n = curPageNum * pageSize;
                for (let m = n - pageSize; m < n; m++) {
                    if (totalList[m]) {
                        list.push(totalList[m]);
                    }
                }
                return list;
            },
            // 用来计算总页数的方法
            totalPageSize (totalList, pageSize) {
                let totalLength = 0;
                totalList.map(v => {
                    if (v.funStatus === '1' || v.alarmStatus === '1') {
                        totalLength++
                    }
                })
                if (totalLength === 0) {
                    return 0
                } else if (totalLength <= pageSize) {
                    // 总条数小于 pageSize 时，页码只有 1
                    return 1
                } else if (totalLength > pageSize) {
                    // 判断页码
                    if (totalLength % pageSize === 0) {
                        // 整数页
                        return totalLength / pageSize;
                    } else {
                        // 非整数页
                        return Math.floor(totalLength / pageSize) + 1;
                    }
                }
            },
            // 获取初始化列表
            async taskFunListInit () {
                // 过滤任务ID前的字母T
                // let sendTaskId = this.taskId;
                let sendTaskId = this.taskId.charAt(0) === 'T'
                    ? this.taskId.substr(1) : this.taskId;

                let resp = await taskBaseInfoQuery({
                    taskBaseId: sendTaskId,
                    isDetail: '1'
                })
                // let resp1 = await axios.get('static/mock/ddd.json');
                // let resp = resp1.data;
                // console.log(resp1.data)
                if (resp.status === 200) {
                    if (resp.rows) {
                        this.loading = false;
                        this.overStatus = Number(resp.rows[0].overStatus);
                        resp.rows.map((val) => {
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
                                        if (val.menuId === '90005' || val.menuId === '90006') {
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
                        resp.rows.map(val => {
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
                                    item.menuName = item.importAreaName;
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
                        resp.rows.map(val => {
                            // 添加关联关系分析
                            if (val.taskType === '3' || val.taskType === '6' || val.taskType === '7' || val.taskType === '8' || val.taskType === '9') {
                                this.data.push(val)
                            }
                        })
                        // 添加 查询类
                        resp.rows.map(val => val.taskType === '4' && this.data.push(val))
                    }

                    // ----------------------  连接 socket --------------------------

                    // 与后端建立 socket 连接
                    // 目标进入区域告警
                    this.socketAll.connect(`${apiUrl}/websocket/alarmDetailsSocket`);
                    this.getRealtimeAlarm(this.socketAll, resp.rows, this.data);
                }
                // 判断是否记录当前页
                if (this.witchPageNum) {
                    this.currentNum = 1
                } else {
                    this.currentNum = Number(localStorage.getItem('currentPage')) === 0
                        ? 1 : Number(localStorage.getItem('currentPage'))
                }
                // console.log('load:currentNum', this.currentNum)
                // 判断第一页是否显示实时数据
                if (this.updateTime.length !== 0 && this.currentNum !== 1 || this.updateTime.length === 0) {
                    this.currentList = this.loadPage(this.data, this.currentNum, 8)
                }
                // 获取数据总页数
                this.totalPageNum = this.totalPageSize(this.data, 8) +
                    (this.updateTime.length === 0 ? 0 : 1)
                // 设置每一页初始化时都不显示小红点
                for (let i = 0; i < this.totalPageNum; i++) {
                    this.isPageHasNews.push(false)
                }
            },
            // 配置任务
            deployTask () {
                this.$router.push({
                    name: '任务配置',
                    params: {
                        handleType: this.taskId,
                        startTime: this.startTime,
                        endTime: this.endTime,
                        detailTitle: this.detailTitle
                    }
                }
                )
            },
            // 停止任务
            stopTask () {
                this.dialogChangeStopTask(true)
            },
            dialogChangeStopTask (val) {
                this.dialogVisibleStopTask = val
            },
            dialogOpendCallbackStopTask () {},
            okFnStopTask () {
                this.dialogChangeStopTask(false)
                let sendTaskId = this.taskId.charAt(0) === 'T'
                    ? this.taskId.substr(1) : this.taskId;
                stopTask({ taskBaseId: sendTaskId }).then((resp) => {
                    if (resp.status === 201) {
                        setTimeout(() => {
                            this.$router.push({
                                path: '/task/index'
                            })
                        }, 2000)
                    }
                })
            },
            // localStorage中的内容
            getTaskDetail () {
                if (this.taskId !== undefined) {
                    localStorage.setItem('taskId', this.$route.params.taskId)
                }
                this.taskId = localStorage.getItem('taskId')
                if (this.detailTitle !== undefined) {
                    localStorage.setItem('detailTitle', this.$route.params.taskName)
                }
                this.detailTitle = localStorage.getItem('detailTitle')
                if (this.startTime !== undefined) {
                    localStorage.setItem('startTime', this.$route.params.startTime)
                }
                this.startTime = localStorage.getItem('startTime')
                if (this.endTime !== undefined) {
                    localStorage.setItem('endTime', this.$route.params.endTime)
                }
                this.endTime = localStorage.getItem('endTime')
                if (this.taskAreaNum !== undefined) {
                    localStorage.setItem('taskAreaNum', this.$route.params.taskAreaNum)
                }
                this.taskAreaNum = localStorage.getItem('taskAreaNum')
                if (this.taskTarNum !== undefined) {
                    localStorage.setItem('taskTarNum', this.$route.params.taskTarNum)
                }
                this.taskTarNum = localStorage.getItem('taskTarNum')
                if (this.taskStatus !== undefined) {
                    localStorage.setItem('taskStatus', this.$route.params.taskStatus)
                    localStorage.setItem('taskStatus1', this.$route.params.taskStatus)
                }
                this.taskStatus = localStorage.getItem('taskStatus')
            },
            // 退出任务
            exitTask () {
                this.$router.go(-1)
                localStorage.removeItem('taskId')
                localStorage.setItem('currentPage', 1)
            },
            // 判断列表数据的变化给页码添加提示
            setPrompts (newVal, oldVal, currentNum, type) {
                // debugger;
                // 创建一个中间变量，此变量必须有，否则子组件无法接收到变化后的 isPageHasNews，这真他妈是个坑！
                let isPageHasNews = [];
                if (oldVal.length) {
                    // 遍历变化后的列表
                    newVal.map((it, i) => {
                        if (oldVal[i]) {
                            // 判断新旧列表的告警数量是否变化
                            if (it.dictType === 'alarmType' && it.alarmCount !== oldVal[i].alarmCount) {
                                // 计算变化的那一条任务所在的页码
                                if (type) {
                                    isPageHasNews[Math.floor(i / 8) + 1] = true
                                } else {
                                    isPageHasNews[Math.floor(i / 8)] = true
                                }
                            }
                        }
                    })
                }
                // 当前页应为false
                isPageHasNews[currentNum - 1] = false;
                // console.log(isPageHasNews)
                return isPageHasNews;
            },
            // socket 获取实时告警数据
            getRealtimeAlarm (socket, originalVal, targetData) {
                // 监听连接是否建立
                // console.log(targetData)
                socket.on('open', () => {
                    let alarmId = {
                        data: []
                    };
                    let arr = [];
                    originalVal.map(item => {
                        // 将所有的告警任务ID（alarmTaskId）封装成参数
                        // alarmTaskIds(String)与alarmTaskIdList(Array)都是告警任务ID
                        // 真的是猜不透
                        // 当都属于预警的时候
                        if (item.dictType === 'alarmType' && item.alarmStatus === '1') {
                            let obj = {}
                            obj = {
                                alarmTypeId: item.menuId,
                                alarmTaskId: item.alarmTaskIdList
                            }
                            arr.push(obj)
                        }
                    });
                    alarmId.data = arr;
                    // 成功建立后触发后台返回实时数据，参数均为测试用，无实际意义
                    socket.emit('dataUpdate', alarmId)
                })
                socket.on('message', resp => {
                    // 这段代码怎么看都和alarmTypeId无关
                    // 核心在alarmTaskIdList上，传参完全没啥用啊
                    let data = socket.JSONparse(resp.data);
                    if (data.alarmDetailsJson) {
                        this.$refs.warn.play()
                        let newList = targetData.map((item) => {
                            // 将socket传输来的数据重新赋值
                            let _copy = JSON.parse(JSON.stringify(item));
                            if (item.alarmTaskIdList && item.alarmTaskIdList.length) {
                                // debugger
                                data.alarmTaskId.map(item1 => {
                                    if (item.alarmTaskIdList[0] === item1) {
                                        _copy.alarmCount = data.alarmDetailsJson.alarmCount;
                                        _copy.alarmTime = data.alarmDetailsJson.alarmTime;
                                        _copy.location = data.alarmDetailsJson;
                                    }
                                })
                            }
                            return _copy;
                        });
                        this.data = newList;
                    }
                });
                // socket.on('dataUpdate', resp => {
                //     console.log(resp)
                //     let newList = targetData.map((item) => {
                //         // 将socket传输来的数据重新赋值
                //         let _copy = JSON.parse(JSON.stringify(item));
                //         if (item.alarmTaskIdList && item.alarmTaskIdList.length) {
                //             resp.alarmTaskId.map(item1 => {
                //                 if (item.alarmTaskIdList[0] === item1) {
                //                     _copy.alarmCount = resp.alarmCount;
                //                     _copy.alarmTime = resp.alarmTime;
                //                     _copy.location = resp;
                //                 }
                //             })
                //         }
                //         return _copy;
                //     });
                //     this.data = newList;
                // })
            }
        },
        watch: {
            currentNum (newVal) {
                // 监听页码是否发生变化，若变化则更新当前显示的列表
                localStorage.setItem('currentPage', newVal)
                this.currentList = [];
                let me = this
                if (newVal === 1) {
                    if (me.updateTime.length === 0) {
                        me.currentList = me.loadPage(me.data, newVal, 8)
                    } else if (me.updateTime.length === 1) {
                        me.currentList = me.loadPage(me.updateTime, newVal, 1)
                    } else if (me.updateTime.length === 2) {
                        me.currentList = me.loadPage(me.updateTime, newVal, 2)
                    }
                } else {
                    if (me.updateTime.length === 0) {
                        me.currentList = me.loadPage(me.data, newVal, 8)
                    } else {
                        me.currentList = me.loadPage(me.data, newVal - 1, 8)
                    }
                }
            },
            data: {
                deep: true,
                handler (newVal, oldVal) {
                    // 判断是否包含实时数据
                    let _type = this.updateTime.length;
                    let _currentNum = this.updateTime.length
                        ? this.currentNum - 1 : this.currentNum;
                    // 获取当前页显示的任务
                    this.currentList = this.loadPage(newVal, _currentNum, 8);
                    // 设置需要显示提示的页码
                    this.isPageHasNews = this.setPrompts(newVal, oldVal, this.currentNum, _type);
                }
            }
        },
        components: {
            pageBar,
            gis,
            BmapComPart,
            BmapCom,
            sysDialog,
            warnSound
        }
    }
</script>

<style lang='postcss' scoped>
    .ga-taskDetail__body-section1 {
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        height: 10%;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 1.6%;
    }

    .ga-taskDetail__body-task-warn {
        display: flex;
        align-items: center;
        color: #e54545;
        /* background: url("~@/assets/images/task/warning.png") no-repeat 0 center; */
        height: 22px;
        line-height: 28px;
        width: 70px;
        padding-left: 25px;
    }

    .ga-taskDetail__body-task-operate {
        display: flex;
        justify-content: flex-end;
        color: #fff;
        >.opera-btn {
            padding: 10px 15px;
            margin-right: 10px;
            border-radius: 4px;
            background-color: #20a0ff;
            color: #fff;
            &:hover {
                cursor: pointer;
                background: #47a7ef;
            }
            ;
        }
        button {
            margin: 0 4px !important;
        }
    }

    .ga-taskDetail__body--taskDetail-numBox {
        padding: 6px 1.6% 0;
        font-size: 16px;
        color: #fff;
        span {
            color: #d4b32f;
        }
    }

    .ga-taskDetail__body-taskSection2 {
        padding: 0 1.6%;
        margin-top: 1.4%;
        margin-bottom: 1%;
        color: #fff;
        height: 70%;
    }

    .ga-taskDetail__body-taskSection2 .partOne {
        height: 100%;
    }

    /* 屏幕50% */

    .ga-taskDetail__body-taskSection2 .partOne .mapBoxOne {
        width: 49%;
        height: 100%;
        /* margin-right: 1%; */
        float: left;
        background-size: 100% 100%;
        border: 2px solid #28599c;
        position: relative;
    }
    .contentBg {
        background: url('~@/assets/images/task/warn-content2.png') no-repeat;
    }

    .contentTableBg {
        background: url('~@/assets/images/task/table-bg.png') no-repeat;
    }

    .contentSJSZBg {
        background: url('~@/assets/images/task/sjsz-bg.png') no-repeat;
    }

    .contentAnalysisBg {
        background: url('~@/assets/images/task/table-bg1.png') no-repeat;
    }
    /* 人物画像 */
    .contentAnalysisPeopleDrawBg {
        background: url('~@/assets/images/task/table-bg2.png') no-repeat;
    }
    /*及时通信app*/
    .contentAnalysisPeopleAppBg {
        background: url('~@/assets/images/task/table-bg3.png') no-repeat;
    }
    /*重点信源*/
    .informationSourceBg {
        background: url('~@/assets/images/task/zdxy.png') no-repeat;
    }
    .cardBg {
        width: 100%;
        height: 100%;
        background-size: cover;
    }
    .iconTopCenter {
        width: 100%;
        text-align: center;
        position: absolute;
        top: -16px;
        >div {
            display: inline-block;
            height: 46px;
            line-height: 40px;
            padding: 0 40px;
            background: url('~@/assets/images/task/icon-top-center1.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
        }
    }

    .iconTopLeft {
        position: absolute;
        top: -3px;
        left: -3px;
        width: 9px;
        height: 9px;
        background: url('~@/assets/images/task/icon-top-left.png') no-repeat;
    }

    .iconLeftTop {
        position: absolute;
        top: 50px;
        left: -6px;
        width: 4px;
        height: 77px;
        background: url('~@/assets/images/task/icon-left.png') no-repeat;
    }

    .iconBotLeft {
        position: absolute;
        bottom: -12px;
        left: -6px;
        width: 32px;
        height: 25px;
        background: url('~@/assets/images/task/icon-bot-left.png') no-repeat;
        background-size: 26px;
    }

    .iconBotCenter {
        position: absolute;
        bottom: -2px;
        width: 222px;
        height: 9px;
        background: url('~@/assets/images/task/icon-bot-center.png') no-repeat;
    }

    .iconBotRight {
        position: absolute;
        bottom: -11px;
        right: -12px;
        width: 32px;
        height: 25px;
        background: url('~@/assets/images/task/icon-bot-right.png') no-repeat;
        background-size: 26px;
    }

    .iconTopRight {
        position: absolute;
        top: -8px;
        right: -1px;
        width: 34px;
        height: 6px;
        background: url('~@/assets/images/task/icon-top-right.png') no-repeat;
    }

    .iconWarnNum {
        position: absolute;
        top: 4%;
        right: 2%;
        background: url("~@/assets/images/task/warning.png") no-repeat 0 center;
        background-size: 1.2em;
        height: 22px;
        width: 34px;
        color: #e54545;
        padding-left: 16px;
        line-height: 27px;
    }

    .lastWarnTime {
        position: absolute;
        bottom: 10px;
        left: 10px;
        width: 94%;
        height: 24px;
        line-height: 24px;
        color: #fff;
        background: #ee6565;
        padding-left: 5px;
    }

    @media only screen and (max-device-width: 1440px) {
        .iconTopCenter {
            >div {
                height: 33px;
                line-height: 29px;
                padding: 0 30px;
            }
        }
        .lastWarnTime {
            font-size: 14px;
        }
    }
</style>
