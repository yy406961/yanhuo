<template>
    <div class="ga-menu">
        <div class="ga-menu__mask" :style="maskStyle" @click="hiddenMenu"></div>
        <div class="ga-menu__content">
            <div v-for="m, index in menuData"
                 :class="['ga-menu__list', menuDataActive === index ? 'ga-menu__list--active' : '']"
                 @click="openSubmenu(m.submenu, index)" :key="index">
                <i :class="['ga-menu__icon',`ga-menu__icon--${m.id}`]"></i>
                <span>{{ m.name }}</span>
            </div>
        </div>
        <transition name="fade">
            <div class="ga-menu__submenu" v-if="submenuShow">
                <div v-for="m, index in submenu" class="ga-menu__submenuList"
                     :class="['ga-menu__submenuList', activeTask === m.taskBaseId ? 'ga-menu__submenuList--active' : '']"
                     @click="goRouter(m)" :key="index">
                    {{ m.name || m.taskName}}
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="ga-menu__taskDetail" v-if="taskDetailShow">
                <taskDetail :detailData="detailData" @closeDetail="closeDetail"></taskDetail>
            </div>
        </transition>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import taskDetail from './taskDetail'
    import { ajax } from 'common'
    export default {
        name: 'leftMenu',
        data() {
            return {
                menuData: [
                    {
                        name: '态势分析',
                        id: '10000',
                        submenu: [
                            {
                                name: '综合态势分析',
                                path: '/home',
                                id: '10001'
                            },
                            {
                                name: '实有在线用户态势分析',
                                path: '/situationAnalysis/allProvincePage',
                                id: '10002'
                            },
                            {
                                name: '省外在线用户态势分析',
                                path: '/situationAnalysis/outProvincePage',
                                id: '10003'
                            },
                            {
                                name: '境外在线用户态势分析',
                                path: '/situationAnalysis/keyAreaPage',
                                id: '10004'
                            },
                            {
                                name: '移动上网用户态势分析',
                                path: '/mobileInternetAnalysis',
                                id: '10005'
                            }
                        ]
                    },
                    {
                        name: '在控任务',
                        id: '20000',
                        submenu: []
                    },
                    {
                        name: '快捷查询',
                        id: '30000',
                        submenu: [
                            {
                                name: '省内最新位置快捷查询',
                                path: '/wholeNetAnalysis/partRealTimeSearch',
                                id: '30001'
                            },
                            {
                                name: '省内历史轨迹快捷查询',
                                path: '/wholeNetAnalysis/partHistorySearch',
                                id: '30002'
                            },
                            {
                                name: '目标话单快捷查询',
                                path: '/dataSearch/targetTicketQuery',
                                id: '30003'
                            },
                            {
                                name: '快捷查询审批',
                                path: '/quickQueryApproval',
                                id: '30004'
                            }
                        ]
                    },
                    {
                        name: '通用功能',
                        id: '40000',
                        submenu: [
                            {
                                name: '告警信息',
                                path: '/warningCom',
                                id: '40001'
                            },
                            {
                                name: '涉疆人员分析',
                                path: '/situationAnalysis/minoritySJPage',
                                id: '40002'
                            },
                            {
                                name: '涉藏人员分析',
                                path: '/situationAnalysis/minoritySZPage',
                                id: '40003'
                            },
                            {
                                name: '小众信源用户挖掘',
                                path: '/informationSource',
                                id: '40004'
                            },
                            {
                                name: '机身码查询',
                                path: '/imeiQuery',
                                id: '40005'
                            },
                            {
                                name: '态势数据导出',
                                path: '/system/importantPersonExport',
                                id: '40006'
                            },
                            {
                                name: '业务报表',
                                path: '/reportFrom',
                                id: '40007'
                            },
                            {
                                name: '基站查询',
                                path: '/system/baseStationSearch',
                                id: '40008'
                            },
                            {
                                name: '短信内容逻辑查询',
                                path: '/msgAnalysis/msgLogic',
                                id: '40009'
                            },
                            {
                                name: '有害短信溯源分析',
                                path: '/msgAnalysis/harmMsg',
                                id: '40010'
                            }
                        ]
                    },
                    {
                        name: '任务管理',
                        id: '50000',
                        submenu: [
                            {
                                name: '任务配置',
                                path: '/task/config',
                                id: '50001'
                            },
                            {
                                name: '任务审批',
                                path: '/system/taskAgree',
                                id: '50002'
                            },
                            {
                                name: '标签管理',
                                path: '/system/tarNumLabelMag',
                                id: '50003'
                            },
                            {
                                name: '区域管理',
                                path: '/system/areaManage',
                                id: '50004'
                            }
                        ]
                    },
                    {
                        name: '社会民生',
                        id: '60000',
                        submenu: [
                            {
                                name: '基础设施划分',
                                path: '/socialLivelihood/baseDivision',
                                id: '60001'
                            },
                            {
                                name: '基础设施校准',
                                path: '/socialLivelihood/baseAline',
                                id: '60002'
                            },
                            {
                                name: '功能区域划分',
                                path: '/socialLivelihood/areaDivision',
                                id: '60003'
                            },
                            {
                                name: '功能区域校准',
                                path: '/socialLivelihood/areaAline',
                                id: '60004'
                            },
                            {
                                name: '用户密集区域划分',
                                path: '/socialLivelihood/userIntensiveAreas',
                                id: '60005'
                            },
                            {
                                name: '用户密度异常检测',
                                path: '/socialLivelihood/userIntensiveAreas',
                                id: '60006'
                            }
                        ]
                    },
                    {
                        name: '系统管理',
                        id: '70000',
                        submenu: [
                            {
                                name: '机构管理',
                                path: '/system/organizationManage',
                                id: '70001'
                            },
                            {
                                name: '部门管理',
                                path: '/system/department',
                                id: '70002'
                            },
                            {
                                name: '人员管理',
                                path: '/system/personnelManagement',
                                id: '70003'
                            },
                            {
                                name: '密码修改',
                                path: '/',
                                id: '70004'
                            }
                        ]
                    },
                    {
                        name: '业务审计',
                        id: '80000',
                        submenu: [
                            {
                                name: '任务使用审计',
                                path: '/system/auditManage',
                                id: '80001'
                            },
                            {
                                name: '通用功能审计',
                                path: '/businessAudit/check',
                                id: '80002'
                            },
                            {
                                name: '快捷查询审计',
                                path: '/quickQueryAudit',
                                id: '80003'
                            }
                        ]
                    }
                ],
                menuDataActive: -1,
                submenuShow: false,
                submenu: [],
                activeTask: '',
                taskDetailShow: false,
                detailData: {},
                test: ''
            }
        },
        computed: {
            ...mapGetters({
                'userId': 'global/userId',
                'menuState': 'global/menuState'
            }),
            maskStyle () {
                let width = $(window).width()
                return {
                    width: width + 'px'
                }
            }
        },
        watch: {
            'menuState': {
                deep: true,
                handler (newVal) {
                    this.taskDetailShow = false
                    if (newVal) {
                        this.menuDataActive = -1
                        this.submenuShow = false
                        this.taskDetailShow = false
                    }
                }
            }
        },
        mounted() {
            this.getTaskList()
        },
        methods: {
            ...mapActions({
                changeMenuState: 'global/changeMenuState'
            }),
            // 获取任务列表
            getTaskList () {
                ajax.post('/task/taskListInit', {
                    'taskUser': this.userId,
                    'taskStatus': 1
                }).then(resp => {
                    let { rows } = resp
                    this.menuData.forEach(item => {
                        if (item.name === '在控任务') {
                            item.submenu = rows
                        }
                    })
                })
                    .catch(error => {
                        console.log(error)
                    })
            },
            // 打开子菜单
            openSubmenu(submenu, index) {
                this.menuDataActive = index
                this.submenu = submenu
                this.submenuShow = true
                this.activeTask = -1
                this.taskDetailShow = false
            },
            // 路由跳转或者获取任务详情
            goRouter(menu) {
                let { path } = menu
                if (path) {
                    this.$router.push({ path: path })
                    this.changeMenuState(false)
                } else {
                    this.activeTask = menu.taskBaseId
                    this.taskDetailShow = true
                    this.detailData.taskBaseId = 'T' + menu.taskBaseId
                    this.detailData.beginTime = menu.beginTime
                    this.detailData.endTime = menu.endTime
                    this.detailData.taskTargetCount = menu.taskTargetCount
                    this.detailData.taskAreaCount = menu.taskAreaCount
                    this.detailData.taskStatus = menu.taskStatus
                    this.detailData.taskName = menu.taskName
                    this.detailData = _.cloneDeep(this.detailData)
                }
            },
            // 菜单隐藏
            hiddenMenu() {
                this.changeMenuState(false)
            },
            closeDetail(val) {
                this.taskDetailShow = val
            }
        },
        components: {
            taskDetail
        }
    }
</script>

<style>
    @component-namespace ga {
        @b menu {
            position: relative;
            width: 196px;
            /*left: -196px;*/
            height: 100%;
            background: #142F53;
            padding: 60px 0px 20px 10px;
            border-right: 1px solid rgba(0,197,255,0.7);
            color: #A2EEFF;
            font-size: 16px;
            transition: all 0.4s cubic-bezier(0.75, 0.15, 0.24, 1);
            @e list {
                height: 40px;
                line-height: 40px;
                cursor: pointer;
                padding-left: 30px;
                &:hover {
                     background: rgba(0,255,191,0.15);
                     box-shadow: inset 0 -1px 0 0 rgba(0,255,191,0.40), inset 0 1px 0 0 rgba(0,255,191,0.40);
                     color: #fff;
                    i[class$="10000"] {
                        background: url("~assets/images/menu/situationHover.png") no-repeat;
                        background-size: cover;
                    }
                    i[class$="20000"] {
                        background: url("~assets/images/menu/inControlHover.png") no-repeat;
                        background-size: cover;
                    }
                    i[class$="30000"] {
                        background: url("~assets/images/menu/quickHover.png") no-repeat;
                        background-size: cover;
                    }
                    i[class$="40000"] {
                        background: url("~assets/images/menu/currencyHover.png") no-repeat;
                        background-size: cover;
                    }
                    i[class$="50000"] {
                        background: url("~assets/images/menu/taskManageHover.png") no-repeat;
                        background-size: cover;
                    }
                    i[class$="60000"] {
                        background: url("~assets/images/menu/livelihoodHover.png") no-repeat;
                        background-size: cover;
                    }
                    i[class$="70000"] {
                        background: url("~assets/images/menu/systemManageHover.png") no-repeat;
                        background-size: cover;
                    }
                    i[class$="80000"] {
                        background: url("~assets/images/menu/auditHover.png") no-repeat;
                        background-size: cover;
                    }
                 }
                @m active {
                    background: rgba(0,255,191,0.15);
                    box-shadow: inset 0 -1px 0 0 rgba(0,255,191,0.40), inset 0 1px 0 0 rgba(0,255,191,0.40);
                    color: #fff;
                    i[class$="10000"] {
                        background: url("~assets/images/menu/situationHover.png") no-repeat;
                        background-size: cover;
                    }
                    i[class$="20000"] {
                        background: url("~assets/images/menu/inControlHover.png") no-repeat;
                        background-size: cover;
                    }
                    i[class$="30000"] {
                        background: url("~assets/images/menu/quickHover.png") no-repeat;
                        background-size: cover;
                    }
                    i[class$="40000"] {
                        background: url("~assets/images/menu/currencyHover.png") no-repeat;
                        background-size: cover;
                    }
                    i[class$="50000"] {
                        background: url("~assets/images/menu/taskManageHover.png") no-repeat;
                        background-size: cover;
                    }
                    i[class$="60000"] {
                        background: url("~assets/images/menu/livelihoodHover.png") no-repeat;
                        background-size: cover;
                    }
                    i[class$="70000"] {
                        background: url("~assets/images/menu/systemManageHover.png") no-repeat;
                        background-size: cover;
                    }
                    i[class$="80000"] {
                        background: url("~assets/images/menu/auditHover.png") no-repeat;
                        background-size: cover;
                    }
                }
            }
            @e icon {
                display: inline-block;
                width: 22px;
                height: 22px;
                margin-right: 10px;
                position: relative;
                top: 5px;
                @m 10000 {
                    background: url("~assets/images/menu/situation.png") no-repeat;
                    background-size: cover;
                }
                @m 20000 {
                    background: url("~assets/images/menu/inControl.png") no-repeat;
                    background-size: cover;
                }
                @m 30000 {
                    background: url("~assets/images/menu/quick.png") no-repeat;
                    background-size: cover;
                }
                @m 40000 {
                    background: url("~assets/images/menu/currency.png") no-repeat;
                    background-size: cover;
                }
                @m 50000 {
                    background: url("~assets/images/menu/taskManage.png") no-repeat;
                    background-size: cover;
                }
                @m 60000 {
                    background: url("~assets/images/menu/livelihood.png") no-repeat;
                    background-size: cover;
                }
                @m 70000 {
                    background: url("~assets/images/menu/systemManage.png") no-repeat;
                    background-size: cover;
                }
                @m 80000 {
                    background: url("~assets/images/menu/audit.png") no-repeat;
                    background-size: cover;
                }
            }
            @e submenu {
                position: absolute;
                top: 0;
                left: 196px;
                width: 330px;
                /*width: 0;*/
                height: 100%;
                padding-top: 60px;
                padding-bottom: 26px;
                background: rgba(15,37,66,0.95);
                border-right: 1px solid rgba(0,197,255,0.7);
                transition: all 0.4s cubic-bezier(0.75, 0.15, 0.24, 1);
                overflow: hidden;
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
                @m active {
                    background: rgba(0,255,191,0.15);
                    box-shadow: inset 0 -1px 0 0 rgba(0,255,191,0.40), inset 0 1px 0 0 rgba(0,255,191,0.40);
                    color: #fff;
                }
            }
            @e taskDetail {
                position: absolute;
                top: 0;
                left: 526px;
                height: 100%;
                transition: all 0.2s;
            }
            @e mask {
                position: absolute;
                top: 0;
                left: 0;
                z-index: -1;
                height: 100%;
                background: transparent;
            }
        }
    }
</style>