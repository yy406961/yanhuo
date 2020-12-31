<template>
    <div style="width: 100%; height: 100%">
        <div class="ga-dialogContent ga-layout__body-title">
            <span class="ga-dialogContent__dialogTitleLeft"></span>
            <span class="ga-dialogContent__dialogTitleCenter">
                {{ title }}
            </span>
            <span class="ga-dialogContent__dialogTitleRight"></span>
        </div>
        <div v-loading="loading" style="height: 88%;">
            <div v-if="totalTasklist.length && !showTaskList"
                 style="height: 100%;">
                <div class="analysis">
                    <component :is="situationAnalysis[currentNum - 1].comp"></component>
                </div>
            </div>
            <div v-if="totalTasklist.length && showTaskList"
                style="height: 100%;">
                <actionbar :taskStatus="taskStatus"
                        @update:taskStatus=" val => taskStatus = val "></actionbar>
                <tasklist :tasklist="currentList"></tasklist>
            </div>
        </div>
        <pagebar :totalPageNum="totalPageNum"
                 :isPageHasNews="isPageHasNews"
                 :currentNum="currentNum"
                 @update:currentNum=" val => currentNum = val "></pagebar>
    </div>
</template>

<script>
    import pagebar from './PageBar.vue'
    import tasklist from './HomeTaskList.vue'
    import actionbar from './ActionBar.vue'
    import { taskListInit } from 'api/task/taskList'
    import { getSelectHome } from 'api/login'
    import { mapGetters } from 'vuex'
    import allProvincePage from '../../situationAnalysis/allProvincePage'
    import outProvincePage from '../../situationAnalysis/outProvincePage'
    import overseasPage from '../../situationAnalysis/overseasPage'
    import Io from 'utils/websocket'
    // import io from 'utils/websocket1'
    const apiUrl = process.env.NODE_ENV === 'production'
        ? '' : 'ws://192.168.3.175:8080/policeBusiness'
    export default {
        name: 'index',
        props: ['mshow'],
        data () {
            return {
                totalTasklist: [],
                taskStatus: 1,
                currentList: [],
                totalPageNum: 0,
                currentNum: 1,
                isPageHasNews: [],
                setPromptsList: [],
                loading: true,
                socket: new Io(),
                // socket: io,
                situationAnalysis: []
            }
        },
        components: {
            pagebar,
            tasklist,
            actionbar,
            allProvincePage,
            outProvincePage,
            overseasPage
        },
        computed: {
            showTaskList () {
                return this.currentNum > this.situationAnalysis.length;
            },
            title () {
                let title = this.situationAnalysis[this.currentNum - 1]
                    ? this.situationAnalysis[this.currentNum - 1].name : '任务列表';
                return title;
            },
            ...mapGetters({
                'userName': 'global/userName'
            })
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
                let totalLength = totalList.length;
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
            },
            async loadSelectHome () {
                let resp = await getSelectHome();
                // let resp = {
                //     'message': '查询成功！',
                //     'rows': [
                //         {
                //             'id': 1,
                //             'name': '实有人口态势分析'
                //         },
                //         {
                //             'id': 2,
                //             'name': '省外人口态势分析'
                //         },
                //         {
                //             'id': 3,
                //             'name': '境外人口态势分析'
                //         }
                //     ],
                //     'status': 200
                // };
                resp.rows.forEach(item => {
                    if (item.id === 70001) {
                        item.comp = 'allProvincePage'
                    } else if (item.id === 70002) {
                        item.comp = 'outProvincePage'
                    } else if (item.id === 70003) {
                        item.comp = 'overseasPage'
                    }
                });
                this.situationAnalysis = resp.rows;
            },
            // 初始化任务列表, 更新任务列表
            async getTaskList (status) {
                let params = {
                    'owner': this.userName,
                    'taskStatus': status
                };
                let resp = await taskListInit(params);
                // 将请求到的任务列表存入 data 中，便于监听是否有新的告警
                this.totalTasklist = resp.rows;
                if (this.totalTasklist.length) {
                    this.loading = false
                }
                // ------------  连接 node socket.io --------------------------

                // 与后端建立 socket 连接
                // this.socket.connect('ws://localhost:3000/taskList');
                this.socket.connect(`${apiUrl}/websocket/taskAlarmCountSocket`);
                this.getRealtimeAlarm(this.socket, resp.rows, this.totalTasklist);

                // ------------------------------------------------------------

                // 获取当前页显示的任务
                this.currentList = this.loadPage(resp.rows, 1, 8);
                // 获取任务总页数
                this.totalPageNum = this.situationAnalysis.length + this.totalPageSize(resp.rows, 8);
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
                // let isPageHasNews = [];
                if (oldVal.length) {
                    // 遍历变化后的列表
                    newVal.map((it, i) => {
                        // 判断新旧列表的告警数量是否变化
                        // debugger
                        // console.log(oldVal[i].alarmCount)
                        // console.log(it.alarmCount)
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
                socket.on('open', (e) => {
                    console.log(e)
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
                // ------------  连接 Java 的 socket ------------------------

                socket.on('message', resp => {
                    // console.log('接收到后台发的数据：', resp);
                    let data = socket.JSONparse(resp.data);
                    // console.log(data);
                    if (data && data.eventLabel === 'dataUpdate') {
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
                // ----------------------------------------------------------

                // ------------  连接 node socket.io --------------------------
                // socket.on('dataUpdate', resp => {
                //     console.log(resp.rows)
                //     let newList = targetData.map((item) => {
                //         // 对原数组中的对象进行克隆，修改克隆的对象的值并返回，不会修改原对象,可以防止直接修改原对象导致vue监听不到对象属性的变化
                //         let _copy = JSON.parse(JSON.stringify(item));
                //         resp.rows.forEach((item1) => {
                //             if (_copy.taskBaseId === item1.taskBaseId) {
                //                 _copy.alarmCount = item1.alarmCount;
                //             }
                //         })
                //         return _copy;
                //     });
                //     this.totalTasklist = newList;
                // })
                // -------------------------------------------------------------
            }
        },
        created () {
            // 组件初始化完毕后向后台请求列表数据
            this.getTaskList(this.taskStatus);
            this.loadSelectHome();
            if (localStorage.getItem('taskId')) {
                localStorage.removeItem('taskId')
            }
            this.$emit('menuToggle', true)
        },
        beforeDestroy () {
            this.socket.disconnect();
        },
        watch: {
            taskStatus: function (newVal) {
                this.getTaskList(newVal)
            },
            totalTasklist: { // 监听任务是否有更新
                deep: true,
                handler (newVal, oldVal) {
                    let _type = this.situationAnalysis.length;
                    let _currentNum = this.situationAnalysis.length
                        ? this.currentNum - this.situationAnalysis.length : this.currentNum;
                    // 获取当前页显示的任务
                    this.currentList = this.loadPage(newVal, _currentNum, 8);
                    // 设置需要显示提示的页码
                    this.isPageHasNews = this.setPrompts(newVal, oldVal, this.currentNum, _type);
                }
            },
            currentNum: function (newVal) {
                // 监听页码是否发生变化，若变化则更新当前显示的列表
                let _currentNum = this.situationAnalysis.length
                    ? newVal - this.situationAnalysis.length : newVal;
                this.currentList = [];
                setTimeout(() => {
                    this.currentList = this.loadPage(this.totalTasklist, _currentNum, 8);
                }, 600)
            }
        }
    }
</script>
<style lang="postcss" scoped>
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
