<template>
    <div style="width: 100%; height: 100%">
        <!--<div class="ga-dialogContent ga-layout__body-title">-->
            <!--<span class="ga-dialogContent__dialogTitleLeft"></span>-->
            <!--<span class="ga-dialogContent__dialogTitleCenter">-->
                <!--{{ title }}-->
            <!--</span>-->
            <!--<span class="ga-dialogContent__dialogTitleRight"></span>-->
        <!--</div>-->
        <div class="ga-layout__bodyTitle">
            <span class="ga-layout__titleTopLeft"></span>
            <span class="ga-layout__titleLeft"></span>
            <span class="ga-layout__titleCenter">{{ title }}</span>
            <span class="ga-layout__titleRight"></span>
            <span class="ga-layout__titleRightLeft"></span>
        </div>

        <div v-if="isBusinessAudit">
            <businessAudit></businessAudit>
        </div>
        <div v-else :class="['ga-home__index',
            this.currentNum === 1 ? 'ga-home__specialBg' : '',
            this.currentNum !== 1 ? 'ga-home__areaBg' : '']">
            <div v-loading="isBusinessAudit&&loading"
                    style="height: 92%;">
                <div v-if="modularLength && !showTaskList"
                        style="height: 100%;">
                    <div class="analysis">
                        <component :is="modularArr[currentNum - 1].comp" :Interface="modularArr[currentNum - 1].id"></component>
                    </div>
                </div>
                <div v-if="totalTasklist && showTaskList"
                        style="height: 100%;">
                        <actionbar :taskStatus="taskStatus"
                                    @update:taskStatus=" val => taskStatus = val "></actionbar>
                        <tasklist v-if="totalTasklist.length" :tasklist="currentList"></tasklist>
                </div>
            </div>
            <warnSound ref="warn"></warnSound>
            <pagebar :totalPageNum="totalPageNum"
                        :isPageHasNews="isPageHasNews"
                        :currentNum="currentNum"
                        @update:currentNum=" val => currentNum = val "></pagebar>
        </div>
    </div>
</template>

<script>
    import { ajax } from 'common'
    import pagebar from './PageBar.vue'
    import tasklist from './HomeTaskList.vue'
    import actionbar from './ActionBar.vue'
    import warnSound from 'components/common/warnSound'
    import { taskListInit } from 'api/task/taskList'
    import { getSelectHome } from 'api/login'
    import { mapGetters } from 'vuex'
    // import homePage from '../../home/home'
    import homePage from '../../home/newHome'
    import businessAudit from '../../businessAudit'
    import allProvincePage from '../../situationAnalysis/allProvincePage'
    import outProvincePage from '../../situationAnalysis/outProvincePage'
    import overseasPage from '../../situationAnalysis/overseasPage'
    import mobileInternetAnalysis from '../../mobileInternetAnalysis/index.vue'
    import keyAreaPage from '../../situationAnalysis/keyAreaMonitor/index.vue'
    import keyAreaPageJZ from '../../situationAnalysis/keyAreaMonitor/keyAreaPageJZ.vue'
    import keySmallArea from '../../situationAnalysis/keyAreaMonitor/keySmallArea.vue'
    import CounterTerrorism from '../../situationAnalysis/CounterTerrorism.vue';
    import extensionPage from '../../situationAnalysis/extensionPage.vue';
    import extensionEx from '../../situationAnalysis/extensionEx.vue';
    // eslint-disable-next-line no-unused-vars
    import letterVisit from '../../letterVisit/index.vue';
    // eslint-disable-next-line no-unused-vars
    import keyPersons from '../../keyPersons/index.vue';
    import keyAreaPageJZZ from '../../situationAnalysis/keyAreaMonitor/keyAreaPageJZZ.vue'
    import chinaAfrica from '../../chinaAfrica/index.vue';
    // import minorityPage from '../../situationAnalysis/minorityPage'
    // import minoritySJPage from '../../situationAnalysis/minoritySJPage'
    // import minoritySZPage from '../../situationAnalysis/minoritySZPage'
    // import minorityStatePage from '../../situationAnalysis/minorityStatePage'
    import Io from 'utils/websocket'
    const apiUrl = process.env.NODE_ENV === 'production'
        ? '' : 'ws://10.8.0.14:8080/policeBusiness'
    export default {
        name: 'index',
        props: ['mshow'],
        data () {
            return {
                totalTasklist: null,
                taskStatus: 1,
                currentList: [],
                totalPageNum: 0,
                currentNum: 1,
                isPageHasNews: [],
                setPromptsList: [],
                loading: true,
                socket: new Io(),
                storyUrl: '',
                modularArr: [],
                modularLength: 0,
                isBusinessAudit: false,
                tempID: [
                    { id: 70001, page: 'homePage' },
                    { id: 70002, page: 'allProvincePage' },
                    { id: 70003, page: 'outProvincePage' },
                    { id: 70008, page: 'overseasPage' },
                    { id: 70009, page: 'mobileInternetAnalysis' },
                    // { id: 70005, page: 'minorityStatePage' },
                    // { id: 70006, page: 'minorityPage' },
                    // { id: 70007, page: 'minoritySZPage' },
                    { id: 70010, page: 'keyAreaPage' },
                    { id: 70011, page: 'keyAreaPage' },
                    { id: 70012, page: 'keyAreaPage' },
                    { id: 70013, page: 'keyAreaPageJZ' },
                    { id: 70014, page: 'keySmallArea' },
                    { id: 70015, page: 'chinaAfrica' },
                    { id: 70016, page: 'keyAreaPage' },
                    { id: 70017, page: 'keyAreaPage' },

                    { id: 70018, page: 'keyAreaPage' },
                    { id: 70019, page: 'keyAreaPage' },
                    { id: 70020, page: 'CounterTerrorism' },
                    { id: 70021, page: 'letterVisit' },
                    { id: 70022, page: 'keyAreaPage' },
                    { id: 70023, page: 'keyAreaPageJZZ' }, // 新修改的橘子洲
                    { id: 70024, page: 'keyPersons' }, // 重点群体
                    { id: 70025, page: 'keyAreaPage' },
                    { id: 70026, page: 'keyAreaPage' },
                    { id: 70027, page: 'keyAreaPage' },
                    { id: 70028, page: 'keyAreaPage' },
                    { id: 70029, page: 'keyAreaPage' },
                    { id: 70030, page: 'keyAreaPage' },
                    { id: 70031, page: 'keyAreaPage' },
                    { id: 70032, page: 'keyAreaPage' },
                    { id: 70036, page: 'keyAreaPage' },
                    { id: 70037, page: 'extensionEx' },
                    { id: 70038, page: 'keyAreaPage' },
                    { id: 70039, page: 'keyAreaPage' }
                ]
            }
        },
        computed: {
            // 判断是否显示任务列表
            showTaskList () {
                return this.currentNum > this.modularLength;
            },
            title () {
                let title = this.modularArr[this.currentNum - 1]
                    ? this.modularArr[this.currentNum - 1].name : '任务列表';
                return title;
            },
            // 是否需要记录页码
            witchPageNum () {
                return this.storyUrl.indexOf('/task/detail') === -1
            },
            ...mapGetters({
                'userName': 'global/userName',
                'userId': 'global/userId'
            })
        },
        created () {
            // 请求首页配置中的态势页面
            this.loadSelectHome();
            if (localStorage.getItem('taskId')) {
                localStorage.removeItem('taskId')
            }
            if (!sessionStorage.getItem('homeCurNum')) {
                sessionStorage.setItem('homeCurNum', this.currentNum)
            }
            this.$emit('menuToggle', true)
        },
        beforeDestroy () {
            // 关闭 socket
            this.socket.disconnect();
        },
        methods: {
            // 用来加载当前页的方法
            loadPage (totalList, curPageNum, pageSize) {
                let n = curPageNum * pageSize;
                let list = [];
                for (let m = n - pageSize; m < n; m++) {
                    if (totalList && totalList[m]) {
                        list.push(totalList[m]);
                    }
                }
                return list;
            },
            // 用来计算总页数的方法
            totalPageSize (totalList, pageSize) {
                if (totalList) {
                    let totalLength = totalList.length;
                    if (totalLength) {
                        if (totalLength <= pageSize) {
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
                    } else {
                        return 1;
                    }
                } else {
                    return 0;
                }
            },
            // 请求已选择首页
            async loadSelectHome () {
                let resp = await getSelectHome();
                // 判断是否记录当前页
                if (this.witchPageNum) {
                    this.currentNum = 1
                    sessionStorage.setItem('homeCurNum', this.currentNum)
                } else {
                    this.currentNum = Number(sessionStorage.getItem('homeCurNum')) === 0
                        ? 1 : Number(sessionStorage.getItem('homeCurNum'))
                }
                if (resp.rows) {
                    this.loading = false;
                    resp.rows.forEach(item => {
                        if (item.status === 1) {
                            this.isBusinessAudit = false
                            if (item.id === 70005) {
                                this.isBusinessAudit = true
                            }
                            this.tempID.forEach(itID => {
                                if (item.id === itID.id) {
                                    item.comp = itID.page
                                }
                            })
                            if (item.id === 70005) {
                                this.modularArr.unshift(item)
                            } else {
                                this.modularArr.push(item);
                            }
                        }
                    });
                }
                this.modularLength = this.modularArr.length
                if (String(this.userId) === '29') {
                    // 请求列表数据
                    this.getTaskList(this.taskStatus);
                } else {
                    this.totalPageNum = this.modularLength
                }
                // 请求列表数据
                // this.getTaskList(this.taskStatus);
            },
            // 初始化任务列表, 更新任务列表
            async getTaskList (status) {
                let params = {
                    'taskUser': this.userId,
                    'taskStatus': status
                };
                let resp = await taskListInit(params);
                if (resp.rows) {
                    this.loading = false
                    // 将请求到的任务列表存入 data 中，便于监听是否有新的告警
                    this.totalTasklist = resp.rows;
                    if (this.totalTasklist.length) {
                        // 获取当前页显示的任务
                        this.currentList = this.loadPage(resp.rows, this.currentNum, 8);
                        // 与后端建立 socket 连接
                        // this.socket.connect('ws://localhost:3000/taskList');
                        if (this.taskStatus === 1) {
                            this.socket.connect(`${apiUrl}/websocket/taskAlarmCountSocket`);
                            this.getRealtimeAlarm(this.socket, resp.rows, this.totalTasklist);
                        } else {
                            this.socket.disconnect();
                        }
                    } else {
                        this.currentList = [];
                    }
                }
                // 获取任务总页数
                this.totalPageNum = this.modularLength + this.totalPageSize(resp.rows, 8);
                // 设置每一页初始化时都不显示小红点
                for (let i = 0; i < this.totalPageNum; i++) {
                    this.isPageHasNews.push(false)
                }
            },
            // 判断列表数据的变化给页码添加提示
            setPrompts (newVal, oldVal, currentNum, type) {
                // debugger;
                // 创建一个中间变量，此变量必须有，否则子组件无法接收到变化后的 isPageHasNews，这真他妈是个坑！
                let isPageHasNews = this.setPromptsList;
                if (oldVal && oldVal.length) {
                    // 遍历变化后的列表
                    newVal.map((it, i) => {
                        // 判断新旧列表的告警数量是否变化
                        // debugger
                        if (oldVal[i] && it.alarmCount !== oldVal[i].alarmCount) {
                            // 计算变化的那一条任务所在的页码
                            if (type) {
                                isPageHasNews[Math.floor(i / 8) + type] = true
                            } else {
                                isPageHasNews[Math.floor(i / 8)] = true
                            }
                        }
                    })
                }
                // 当前页应为false
                isPageHasNews[currentNum - 1] = false;
                // console.log(isPageHasNews)
                return [].concat(isPageHasNews);
            },
            // socket 获取实时告警数据
            getRealtimeAlarm (socket, originalVal, targetData) {
                // 监听连接是否建立
                socket.on('open', () => {
                    // console.log(e)
                    let taskIdList = originalVal.map(item => {
                        return item.taskBaseId
                    })
                    let data = {
                        owner: this.userName,
                        taskBaseId: taskIdList
                    }
                    // 成功建立后触发后台返回实时数据，参数均为测试用，无实际意义
                    socket.emit('dataUpdate', data)
                })

                // 监听列表数据变化事件
                socket.on('message', resp => {
                    // console.log('接收到后台发的数据：', resp);
                    let data = socket.JSONparse(resp.data);
                    if (data && data.eventLabel === 'dataUpdate') {
                        this.$refs.warn.play()
                        // debugger;
                        let newList = targetData.map((item) => {
                            // 对原数组中的对象进行克隆，修改克隆的对象的值并返回，不会修改原对象,可以防止直接修改原对象导致vue监听不到对象属性的变化
                            let _copy = JSON.parse(JSON.stringify(item));

                            data.taskAlarmCount.forEach((item1) => {
                                if (_copy.taskBaseId === Number(item1.taskBaseId)) {
                                    _copy.alarmCount = item1.alarmCount;
                                }
                            })
                            return _copy;
                        });
                        this.totalTasklist = newList;
                    }
                })
            }
        },
        watch: {
            taskStatus: function (newVal) {
            // 任务状态下拉框切换时重新请求
                this.currentNum = this.modularLength + 1
                this.getTaskList(newVal)
            },
            currentList: {
            // 监听当前任务列表变化，判断是否达到任务开始时间，若达到，给任务添加属性 isAbled = true
                deep: true,
                handler (newVal) {
                    if (newVal) {
                        newVal.forEach((item) => {
                            let bYear = new Date(item.beginTime).getFullYear();
                            let bMonth = new Date(item.beginTime).getMonth();
                            let bDay = new Date(item.beginTime).getDate();
                            let cYear = new Date().getFullYear();
                            let cMonth = new Date().getMonth();
                            let cDay = new Date().getDate();

                            if (cYear > bYear) {
                                item.isAbled = true;
                            } else if (cYear === bYear) {
                                if (cMonth > bMonth) {
                                    item.isAbled = true;
                                } else if (cMonth === bMonth) {
                                    if (cDay >= bDay) {
                                        item.isAbled = true;
                                    }
                                }
                            }
                        });
                    }
                }
            },
            totalTasklist: {
            // 监听任务是否有更新
                deep: true,
                handler (newVal, oldVal) {
                    let _type = this.modularLength;
                    let _currentNum = this.modularLength
                        ? this.currentNum - this.mmodularLength : this.currentNum;
                    // 获取当前页显示的任务
                    this.currentList = this.loadPage(newVal, _currentNum, 8);
                    // 设置需要显示提示的页码
                    this.isPageHasNews = this.setPrompts(newVal, oldVal, this.currentNum, _type);
                }
            },
            currentNum: function (newVal) {
                // 切换页码时，没完成的请求全部中断
                ajax.cancelAjax()
                // console.log(newVal)
                sessionStorage.setItem('homeCurNum', newVal)
            // 监听页码是否发生变化，若变化则更新当前显示的列表
                let _currentNum = this.modularLength
                    ? newVal - this.modularLength : newVal;
                this.currentList = [];
                setTimeout(() => {
                    this.currentList = this.loadPage(this.totalTasklist, _currentNum, 8);
                }, 600)
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                // 通过 `vm` 访问组件实例，记录上一级路径
                vm.storyUrl = from.path
            })
        },
        components: {
            pagebar,
            tasklist,
            actionbar,
            businessAudit,
            allProvincePage,
            outProvincePage,
            overseasPage,
            mobileInternetAnalysis,
            keyAreaPage,
            keyAreaPageJZ,
            keySmallArea,
            chinaAfrica,
            letterVisit,
            CounterTerrorism,
            keyAreaPageJZZ,
            keyPersons,
            extensionPage,
            extensionEx,
            // minorityPage,
            // minoritySJPage,
            // minoritySZPage,
            // minorityStatePage,
            warnSound,
            homePage
        }
    }
</script>
<style lang="postcss" scoped>
    .ga-home__index {
        height: calc(100% - 40px);
        padding: 10px 21px 0;
        width: calc(100% + 32px);
        position: relative;
        left: -16px;
        top: -10px;
    }
    .ga-home__specialBg {
        background: url("~assets/images/common/loginBg.png") no-repeat center 0;
        -webkit-background-size: cover;
        background-size: cover;
    }
    .ga-home__areaBg{
        background: rgba(33,54,82,1);
    }
    .analysis {
        height: 100%;
        color: #fff;
        .ga-allProvince__content,
        .ga-SWOTANLS__content {
            // padding-left: 2%;
            // height: calc(100% - 18px)
        }
    }

    .iconTopCenter {
        width: 100%;
        text-align: center;
        position: absolute;
        top: -6px;
        >div {
            display: inline-block;
            height: 33px;
            line-height: 29px;
            padding: 0 15px;
            background: url('~@/assets/images/task/icon-top-center.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
        }
    }
</style>
