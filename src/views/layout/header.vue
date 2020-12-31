<template>
    <div class="ga-sysHeader">
        <div class="ga-sysHeader__leftPart">
            <!-- <i class="ga-sysHeader__logo" v-if="isPoliceBadge"></i>
            <span class="ga-sysHeader__systemName">{{ gtitle }}</span> -->
            <!--<i :class="['ga-sysHeader__menu', menuState ? 'ga-sysHeader__menuChose' : '']"-->
               <!--@click="showLeftMenu"></i>-->
            <i class="ga-sysHeader__goHome" title="返回首页" @click="goHome"></i>
            <span class="ga-sysHeader__gTime">
                <gTime></gTime>
            </span>
            <!-- <i class="ga-sysHeader__goBack" v-if="showButton" title="返回上一页" @click="goBack"></i> -->
        </div>
        <div class="ga-sysHeader__rightPart">
            <!-- <span class="ga-sysHeader__gTime">
                <gTime></gTime>
            </span>
            <span class="ga-sysHeader__userMsg">{{ userMsg }}</span> -->
            <!-- <i class="ga-sysHeader__notice"></i> -->
            <el-dropdown class="ga-sysHeader__userConfig" trigger="click" @command="downData">
                <span class="el-dropdown-link">
                    <i class="ga-sysHeader__downExcel" title="数据导出"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="userConfigList">
                    <el-dropdown-item><div>确认导出</div></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown class="ga-sysHeader__userConfig" trigger="click" @command="changeData" v-if="routerName == '任务列表'">
                <span class="el-dropdown-link">
                    <i class="ga-sysHeader__notice" title="开关控制"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="userConfigList">
                    <el-dropdown-item command="开">开</el-dropdown-item>
                    <el-dropdown-item command="关">关</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown class="ga-sysHeader__userConfig"
                         trigger="click"
                         @command="handleCommand">
                <span class="el-dropdown-link">
                    <i class="ga-sysHeader__userSet" title="用户设置"></i>
                </span>
                <el-dropdown-menu slot="dropdown"
                                  class="userConfigList">
                    <el-dropdown-item v-for="(item, index) in userConfigList"
                                      :key="index"
                                      :command="item.name">
                    <span v-if="item.name === '首页配置' || item.name === '密码修改'">
                        {{ item.name }}
                    </span>
                    <span class="ga-sysHeader__nameSpan" v-else @click="nameClick(item.path)">
                        {{ item.name }}
                    </span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <i class="ga-sysHeader__exit"
               @click="exitToLogin"
               title="退出系统"></i>
        </div>

        <!--<span class="ga-sysHeader__gTime"> {{ gTime }}</span>-->

        <!--首页设置-->
        <sysDialog v-if="homeSettings"
                   :dialogVisible="homeSettings"
                   title="首页设置"
                   size="tiny"
                   @change="dialogSetChange"
                   :okFn="okHomeSettings">
            <el-row>
                <el-col :span="21"
                        :offset="2">
                    <FormComp :option="formHomeSettingsOpt"
                              ref="formHomeSettings"></FormComp>
                    <div style="padding-left: 40px;">
                        <ul>
                            <li v-for="(homeName, i) in homeNames"
                                v-show="homeTreeShow">
                                <label class="ga-sysHeader__setUp">
                                    <span class="ga-sysHeader__setUp--set">
                                        <span class="ga-sysHeader__setUp--setSpan"
                                              :data-type="homeName.status"
                                              @click="setChecked(i)"></span>
                                        <input class="ga-sysHeader__setUp--setInput"
                                               type="checkbox"
                                               ref = "isHomes"
                                               :value="homeName.id"
                                               v-model="homeIds"
                                               checked="checked">
                                    </span>
                                </label>
                                <span>{{ homeName.name }}</span>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
        </sysDialog>
        <!-- 修改密码 -->
        <sysDialog v-if="modifyPassword"
                   :dialogVisible="modifyPassword"
                   title="密码修改"
                   size="tiny"
                   @change="dialogPasswordChange"
                   :okFn="okModifyPassword">
            <el-row>
                <el-col :span="21"
                        :offset="2">
                    <FormComp :option="formModifyPasswordOpt"
                              ref="formModifyPassword"></FormComp>
                </el-col>
            </el-row>
        </sysDialog>
        <!-- 开关控制 -->
        <sysDialog v-if="trunButton"
            :dialogVisible="trunButton"
            title="请输入数据切换密码"
            size="tiny"
            @change="dialogTrunChange"
            :okFn="okTrunPwd">
            <el-row>
                <el-col :span="21"
                        :offset="2">
                    <FormComp :option="formTrunButton"
                              ref="formTrunPassword"></FormComp>
                </el-col>
            </el-row>
        </sysDialog>
        <!-- 导出报表 -->
        <sysDialog v-if="downtrunButton"
                   :dialogVisible="downtrunButton"
                   title="数据导出"
                   size="tiny"
                   @change="dialogdownExcelChange"
                   :okFn="downExcel"
                   >
            <el-row class = 'time-blocks'>
                <div class="block time-block">
                    <el-date-picker
                        v-model="startTime"
                        type="datetime"
                        :picker-options='pickerStartDate'
                        placeholder="请选择开始日期">
                    </el-date-picker>
                </div>
                <span class = 'time-duan'>至</span>
                <div class="block time-block">
                    <el-date-picker
                        v-model="endTime"
                        type="datetime"
                        :picker-options='pickerCloseDate'
                        placeholder="请选择结束日期">
                    </el-date-picker>
                </div>
            </el-row>
        </sysDialog>
    </div>
</template>
<script>
    import { logoutUser } from 'api/login'
    // import { storage } from 'common';
    import { mapGetters, mapActions } from 'vuex'
    import sysDialog from 'components/common/dialog'
    import FormComp from 'components/Form/index'
    import buttonComp from 'components/Form/button'
    import gTime from './gTime'
    // import { updatePwd, updateHomePage, selectHome } from 'api/layout/header'
    import { updatePwd, updateHomePage, selectHome, getMenuList } from 'api/layout/header'
    export default {
        name: 'vheader',
        data () {
            let me = this;
            return {
                // 开始时间小于结束时间24小时
                pickerStartDate: {
                    disabledDate: time => {
                        if (this.endTime) {
                            return (time.getTime() > this.endTime.getTime());
                        }
                    }
                },
                pickerCloseDate: {
                    disabledDate: time => {
                        if (this.startTime) {
                            return (time.getTime() < this.startTime.getTime() - (1 * 24 * 60 * 60 * 1000));
                        }
                    } },
                startTime: '', // 开始时间
                endTime: '', // 结束时间
                routerName: '任务列表',
                loginData: this.isLogin,
                userConfigList: [],
                trunButton: false,
                downtrunButton: false,
                dataStatus: false,
                modifyPassword: false,
                homeSettings: false,
                homeTreeShow: true,
                formModifyPasswordOpt: {
                    labelWidth: '90',
                    inline: true,
                    items: [{
                        label: '旧密码：',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'oldpwd',
                            value: '',
                            disabled: false,
                            width: '200',
                            iptType: 'password'
                        }
                    }, {
                        label: '新密码：',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'newpwd',
                            value: '',
                            disabled: false,
                            width: '200',
                            iptType: 'password'
                        }
                    }, {
                        label: '确认密码：',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'yespwd',
                            value: '',
                            disabled: false,
                            width: '200',
                            iptType: 'password'
                        }
                    }]
                },
                formModifyPasswordObj: {
                    oldpwd: '',
                    newpwd: '',
                    yespwd: ''
                },
                formHomeSettingsOpt: {
                    labelWidth: '150',
                    inline: true,
                    items: [{
                        label: '是否展示首页：',
                        type: 'radio',
                        comOpt: {
                            id: 'isHome',
                            value: '1',
                            disabled: false,
                            data: [{
                                name: '是', value: '1'
                            }, {
                                name: '否', value: '0'
                            }],
                            change: function (val) {
                                if (val === '1') {
                                    me.homeTreeShow = true;
                                } else if (val === '0') {
                                    me.homeTreeShow = false;
                                }
                            }
                        }
                    }]
                },
                formTrunButton: {
                    labelWidth: '120',
                    inline: true,
                    items: [{
                        label: '数据切换密码：',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'changePwd',
                            value: '',
                            disabled: false,
                            width: '200',
                            iptType: 'password'
                        }
                    }]
                },
                home: [],
                homeNames: [],
                homeIds: []
            }
        },
        props: ['isLogin', 'gTime', 'showButton'],
        computed: {
            gtitle () {
                // console.log(this.globalKeys)
                // return `${this.globalKeys['gTitle']}社会安全实验平台`
                return `${this.globalKeys['homeInfo']}`
            },
            userMsg () {
                return `您好，${this.gUserNick}`
            },
            ...mapGetters({
                'menuState': 'global/menuState',
                'gUserNick': 'global/userNick',
                'gUserName': 'global/userName',
                'globalKeys': 'global/globalKeys',
                'isPoliceBadge': 'global/isPoliceBadge'
            })
        },
        created () {
            this.loadMenuList();
        },
        methods: {
            ...mapActions({
                changeMenuState: 'global/changeMenuState'
            }),
            nameClick(path) {
                this.$router.push({
                    path: path
                })
            },
            showLeftMenu() {
                if (this.menuState) {
                    this.changeMenuState(false)
                } else {
                    this.changeMenuState(true)
                }
            },
            goBack () {
                this.$router.go(-1)
                this.changeMenuState(false)
            },
            setChecked (index) {
                if (this.homeNames[index].status) {
                    this.homeNames[index].status = 0;
                    this.$refs.isHomes[index].checked = true;
                    // this.$refs.isHomes[index].checked = false;
                } else {
                    this.homeNames[index].status = 1;
                    this.$refs.isHomes[index].checked = false;
                    // this.$refs.isHomes[index].checked = true;
                }
            },
            async loadMenuList () {
                let resp = await getMenuList();
                // console.log(resp);
                this.userConfigList = resp.data;
            },
            exitToLogin () {
                logoutUser().then(() => {
                    // console.log(res)
                    this.$emit('change', this.loginData = false)
                    this.$router.push({
                        path: '/'
                    })
                    localStorage.clear()
                    sessionStorage.clear()
                    this.$message('退出系统成功！')
                })
            },
            goHome () {
                localStorage.removeItem('taskId')
                localStorage.setItem('currentPage', 1)
                sessionStorage.setItem('homeCurNum', 1)
                this.$router.push({
                    path: '/task'
                })
                this.changeMenuState(false)
            },
            async selectHome () {
                let resp = await selectHome();
                if (resp && resp.status === 200) {
                    this.homeNames = resp.rows;
                    // console.log(resp)
                    for (let i in resp.rows) {
                        if (resp.rows[i].status === 1) {
                            this.homeIds.push(resp.rows[i].id);
                        }
                    }
                }
            },
//            首页配置接口
            async updateHomePage (addObj) {
                await updateHomePage(addObj);
                this.dialogSetChange(false);
            },
//            修改密码接口
            async updatePwd () {
                let resp = await updatePwd(this.formModifyPasswordObj);
                if (resp && resp.status === 201) {
                    this.dialogPasswordChange(false);
                    logoutUser().then(() => {
                        // console.log(res)
                        this.$emit('change', this.loginData = false)
                        this.$router.push({
                            path: '/'
                        })
                        localStorage.clear()
                        sessionStorage.clear()
                        this.$message('密码修改成功！请重新登录')
                    })
                }
            },
            handleCommand (command) {
                if (command === '首页配置') {
                    this.setUp();
                    this.homeName = [];
                    this.selectHome();
                } else if (command === '密码修改') {
                    this.password();
                }
            },
//            首页配置弹框
            setUp () {
                this.homeSettings = true;
            },
//            修改密码弹框
            password () {
                this.modifyPassword = true;
            },
//            首页配置弹框关闭按钮
            dialogSetChange (val) {
                this.homeSettings = val;
                if (!val) {
                    this.homeIds = []
                }
            },
//            修改密码弹框关闭按钮
            dialogPasswordChange (val) {
                this.modifyPassword = val;
            },
            dialogdownExcelChange (val) {
                this.downtrunButton = val;
            },
            // 开关控制
            dialogTrunChange (val) {
                this.trunButton = val
            },
//            首页配置确认按钮
            okHomeSettings () {
                let whether = this.$refs.formHomeSettings.getValue().isHome;
                let homeId = whether === '1' ? this.homeIds.join(',') : null;
                let { isHome } = this.$refs.formHomeSettings.getValue();
                let addObj = { isHome, homeId };
                this.updateHomePage(addObj);
                setTimeout(() => {
                    location.reload();
                }, 500);
            },
//            修改密码确认按钮
            okModifyPassword () {
                this.formModifyPasswordObj = Object.assign(this.formModifyPasswordObj, this.$refs.formModifyPassword.getValue());
                if (this.formModifyPasswordObj.oldpwd === '') {
                    this.$alert('请输入旧密码', {
                        confirmButtonText: '确定'
                    });
                } else if (this.formModifyPasswordObj.newpwd === '') {
                    this.$alert('请输入新密码', {
                        confirmButtonText: '确定'
                    });
                } else if (this.formModifyPasswordObj.yespwd === '') {
                    this.$alert('请确认新密码', {
                        confirmButtonText: '确定'
                    });
                } else {
                    this.updatePwd(this.formModifyPasswordObj);
                    this.modifyPassword = false;
                }
            },
            // 导出打开弹框
            downData () {
                this.downtrunButton = true
            },
            // 数据打开弹框
            changeData(command) {
                this.dataStatus = command
                this.trunButton = true
            },
            okTrunPwd () {
                if (this.$refs.formTrunPassword.getValue().changePwd === '') {
                    this.$alert('请输入密码', {
                        confirmButtonText: '确定'
                    });
                } else if (this.$refs.formTrunPassword.getValue().changePwd !== '123456') {
                    this.$alert('请输入正确密码', {
                        confirmButtonText: '确定'
                    });
                } else {
                    this.trunButton = false
                    if (this.dataStatus === '开') {
                        this.$store.dispatch('global/changeDataType', true);
                        // storage.session.set('dataType', true)
                    } else {
                        this.$store.dispatch('global/changeDataType', false);
                    }
                }
            },
            downExcel () {
                let startTime = this.dataTime(this.startTime);
                let endTime = this.dataTime(this.endTime);
                if (startTime === '' || endTime === '') {
                    this.$alert('请输入相关时间', {
                        confirmButtonText: '确定'
                    });
                } else if (this.startTime.getTime() <= this.endTime.getTime() && this.endTime.getTime() <= (this.startTime.getTime() + (1 * 24 * 60 * 60 * 1000))) {
                    window.open('http://15.15.11.128:8045/policeBusiness/focus/ListExport?startTime=' + startTime + '&endTime=' + endTime);
                    this.downtrunButton = false;
                } else if (this.endTime.getTime() < this.startTime.getTime()) {
                    this.$alert('结束时间必须大于开始时间！', {
                        confirmButtonText: '确定'
                    });
                } else {
                    this.$alert('最大时间间隔为24小时', {
                        confirmButtonText: '确定'
                    });
                }
            },
            dataTime(now) {
                let yy = now.getFullYear();
                let mm = now.getMonth() + 1;
                let dd = now.getDate();
                let hh = now.getHours();
                let ii = now.getMinutes();
                let ss = now.getSeconds();
                let clock = yy + '-';
                if (mm < 10) clock += '0';
                clock += mm + '-';
                if (dd < 10) clock += '0';
                clock += dd + ' ';
                if (hh < 10) clock += '0';
                clock += hh + ':';
                if (ii < 10) clock += '0';
                clock += ii + ':';
                if (ss < 10) clock += '0';
                clock += ss;
                return clock
            }
        },
        components: {
            sysDialog,
            FormComp,
            buttonComp,
            gTime
        },
        watch: {
            $route() {
                this.routerName = this.$route.name
            }
        }
    }
</script>
<style scoped>
    @component-namespace ga {
        @b sysHeader {
            width: 100%;
            height: 44px;
            display: flex;
            justify-content: space-between;
            /*background: url("~@/assets/images/common/header.png") no-repeat center;*/
            /*background-size: 100% 100%;*/
            @e leftPart {
                display: flex;
                align-items: center;
                padding-left: 10px;
                z-index:102;
            }
            @e rightPart {
                display: flex;
                align-items: center;
                padding-left: 10px;
                z-index:102;
            }
            @e logo {
                width: 33px;
                height: 33px;
                 background: url("~@/assets/images/common/logo-small.png") no-repeat;
                -webkit-background-size: 100% 100%;
                background-size: 100% 100%;
                margin-right: 8px;
            }
            @e systemName {
                color: #A2EEFF;
                font-size: 18px;
                letter-spacing: 2px;
                text-shadow: 0px 0px 10px #199fd4;
                white-space: nowrap;
                cursor: default;
                margin-right: 8px;
            }
            @e menu {
                background: url("~@/assets/images/common/menu.png") no-repeat;
                background-size: contain;
                color: #A2EEFF;
                width: 25px;
                height: 25px;
                cursor: pointer;
                margin-right: 8px;
                    &:hover {
                         background: url("~@/assets/images/common/menuHover.png") no-repeat;
                         background-size: contain;
                    }
            }
            @e menuChose {
                background: url("~@/assets/images/common/menuChosed.png") no-repeat;
                background-size: contain;
            &:hover {
                 background: url("~@/assets/images/common/menuChosedHover.png") no-repeat;
                 background-size: contain;
             }
            }
            @e nameSpan{
                display: inline-block;
                width: calc(100% + 40px);
                margin-left: -20px;
            }
            @e goBack {
                background: url("~@/assets/images/common/goback.png") no-repeat;
                background-size: contain;
                width: 25px;
                height: 25px;
                cursor: pointer;
                z-index: 10;
            }
            @e gTime {
                color: #A2EEFF;
                /* color: #00C5FF; */
                font-size: 16px;
                margin-right: 8px;
            }
            @e userMsg {
                font-size: 14px;
                color: #00C5FF;
                margin-right: 8px;
                &:hover {
                    cursor: default;
                }
            }
            @e userSet {
                display: inline-block;
                background: url("~@/assets/images/common/set.png") no-repeat;
                background-size: contain;
                width: 25px;
                height: 25px;
                cursor: pointer;
                margin-top: 5px;
                &:hover {
                     background: url("~@/assets/images/common/setHover.png") no-repeat;
                     background-size: contain;
                }
            }
            @e goHome {
                background: url("~@/assets/images/common/home.png") no-repeat;
                background-size: contain;
                width: 25px;
                height: 25px;
                margin-right: 8px;
                cursor: pointer;
                &:hover {
                     background: url("~@/assets/images/common/homeHover.png") no-repeat;
                     background-size: contain;
                }
            }
            @e notice {
                display: inline-block;
                background: url("~@/assets/images/common/setting.png") no-repeat;
                background-size: contain;
                width: 25px;
                height: 25px;
                margin-right: 8px;
                margin-top: 5px;
                cursor: pointer;
                &:hover {
                     background: url("~@/assets/images/common/setting_hover.png") no-repeat;
                     background-size: contain;
                 }
            }
            @e downExcel {
                display: inline-block;
                background: url("~@/assets/images/common/downdefult.png") no-repeat;
                background-size: contain;
                width: 25px;
                height: 25px;
                margin-right: 8px;
                margin-top: 5px;
                cursor: pointer;
            &:hover {
                 background: url("~@/assets/images/common/downhover.png") no-repeat;
                 background-size: contain;
             }
            }
            @e exit {
                background: url("~@/assets/images/common/exitBlue.png") no-repeat;
                background-size: contain;
                width: 25px;
                height: 25px;
                margin-right: 8px;
                cursor: pointer;
                &:hover {
                     background: url("~@/assets/images/common/exitHover.png") no-repeat;
                     background-size: contain;
                }
            }
            @e setUp {
                color: #1f2d3d;
                cursor: pointer;
                display: inline-block;
                position: relative;
                white-space: nowrap;
                @m set {
                    outline: 0;
                    line-height: 1;
                    vertical-align: middle;
                    cursor: pointer;
                    display: inline-block;
                    position: relative;
                    white-space: nowrap;
                }
                @m setSpan {
                    border-radius: 0px;
                    margin: 0 6px 0 14px;
                    border: 1px solid #186986;
                    background-color: transparent;
                    /*background: #041024;*/
                    display: inline-block;
                    position: relative;
                    box-sizing: border-box;
                    width: 18px;
                    height: 18px;
                    z-index: 1;
                    transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s cubic-bezier(.71, -.46, .29, 1.46);
                }
                @m setInput {
                    margin: 0;
                    display: inline-block;
                    left: -999px;
                    opacity: 0;
                    outline: 0;
                    position: absolute;
                    width: 0px;
                    height: 0px;
                }
            }
            div.ga-sysHeader__userConfig {
                font-size: 20px;
                color: #A2EEFF;
                margin-right: 8px;
            }
            .ga-sysHeader__setUp--setSpan[data-type='1']:after {
                box-sizing: content-box;
                content: "";
                border: 2px solid #fff;
                border-left: 0;
                border-top: 0;
                height: 8px;
                left: 5px;
                position: absolute;
                top: 1px;
                transform: rotate(45deg) scaleY(1);
                width: 4px;
                transition: transform .15s cubic-bezier(.71, -.46, .88, .6) .05s;
                transform-origin: center;
            }
        }
    }
    ul.userConfigList {
        color: #fff;
        background: rgba(0, 0, 0, 0.8);
        border: none;
        text-align: center;
        font-size: 12px;
        width: auto;
        min-width: 80px;
        padding: 10px 0;
        z-index: 99999 !important;
        >li {
            line-height: 26px;
        }
        >li:hover {
            color: #1862bd !important;
            background: none !important;
        }
    }
    >>>.el-date-editor.el-input{
        float: left;
    }
    .time-blocks{
        display: flex;
        align-items: center;
    }
    .time-duan{
        float: left;
        padding: 0  8px;
    }
    .time-block{
        text-align: center;
        width: 50%;
        float: left;
    }
</style>
