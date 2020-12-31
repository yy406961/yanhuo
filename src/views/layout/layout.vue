<template>
  <div>
    <div v-if="isLogin" class="ga-layout" :style="layoutStyle">
      <!--<sysHeader :isLogin="isLogin"-->
      <!--:gTime="gTime"-->
      <!--@change="loginStatus"></sysHeader>-->
      <div class="ga-layout__sysHeader">
        <sysHeader :isLogin="isLogin" :showButton="showButton" @change="loginStatus"></sysHeader>
      </div>
      <transition name="fade">
        <div class="ga-layout__leftMenu" v-if="menuState">
          <leftMenuComp></leftMenuComp>
        </div>
      </transition>
      <div class="ga-layout__body" :style="bodyStyle">
        <div class="ga-layout__bodyTitle" v-if="showTitle">
          <span class="ga-layout__titleTopLeft"></span>
          <span class="ga-layout__titleLeft"></span>
          <span class="ga-layout__titleCenter">{{ title }}</span>
          <span class="ga-layout__titleRight"></span>
          <span class="ga-layout__titleRightLeft"></span>
        </div>
        <p class="ga-layout__boderLeftTop"></p>
        <p class="ga-layout__boderLeft"></p>
        <p class="ga-layout__boderLeftBottom"></p>
        <p class="ga-layout__boderRightTop"></p>
        <p class="ga-layout__boderRight"></p>
        <p class="ga-layout__boderRightBottom"></p>
        <p class="ga-layout__boderBottom"></p>
        <!--<div class="ga-layout__body-back"-->
        <!--v-if="showButton"-->
        <!--title="返回上一页">-->
        <!--<button type="button"-->
        <!--class="el-button el-button&#45;&#45;leftTop ga-layout__body-back"-->
        <!--@click="goBack">-->
        <!--<span>返回</span>-->
        <!--</button>-->
        <!--</div>-->
        <!--<i class="ga-layout__goBack" v-if="showButton" title="返回上一页" @click="goBack"></i>-->
        <router-view
          :style="contentHeight()"
          :mshow="menuShow"
          :gTime="gTimeFormat"
          @menuToggle=" m => menuShow = m "
        ></router-view>
      </div>
      <!-- <menuComp :isLogin="isLogin"
      v-show="menuShow"></menuComp>-->
    </div>
    <sysLogin
      v-else
      :isLogin="isLogin"
      :gtitle="gtitle"
      :isUkey="isUkey"
      :ukeyClient="ukeyClient"
      :isNeedUkey="isNeedUkey"
      @change="sysStatus"
    ></sysLogin>
  </div>
</template>
<script>
import SoftKey3W from 'utils/Syunew3.js';
import sysLogin from 'views/login/index';
import sysHeader from './header';
import menuComp from './menuCircle';
import { storage } from 'common';
import { mapGetters, mapActions } from 'vuex';
import { isNeedUkey } from 'api/layout/header';
import leftMenuComp from '../menu/index';
export default {
    name: 'layout',
    data() {
        return {
      //  是否需要ukey验证
            isNeedUkey: false,
      // 是否插入了ukey
            isUkey: false,
            menuShow: true,
            isLogin: false,
            winWidth: 0,
            winHeight: 0,
            showButton: false,
            showTitle: true,
            title: this.$route.name,
      //                gTime: ' ',
            gTimeFormat: '',
            gtitle: `${process.env.loginName}`,
            socketKey: null,
      // 客户端服务
            ukeyClient: 0,
            digitArray: [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                'a',
                'b',
                'c',
                'd',
                'e',
                'f'
            ]
        };
    },
    components: {
        sysLogin,
        sysHeader,
        menuComp,
        leftMenuComp
    },
  //        beforeDestroy () {
  //            this.socketKey.disconnect()
  //        },
    created() {
        this.winWidth = document.body.clientWidth;
        this.winHeight = document.body.clientHeight;
    // this.saveGlobalKeys();
    // this.getGlobalKeys();
        this.isNeedUkeyFun();
    },
    mounted() {
        this.initEvent();
        this.isShowButton();
        this.isShowTitle();
        if (storage.session.storage.userName) {
            this.isLogin = true;
        } else {
            this.$router.push('/login');
        }
    // this.isLogin = true;
    //            requestAnimationFrame(() => {
    //                this.getGlobalKeys();
    //            })
    },
    computed: {
    // 根据屏幕分辨率设置 div.layout 的初始宽度和最小高度
        layoutStyle() {
            return {
                width: this.winWidth + 'px',
                height: this.winHeight + 'px'
            };
        },
        bodyStyle() {
            return {
                height: this.winHeight + 'px'
            };
        },
        ...mapGetters({
            menuState: 'global/menuState'
        })
    },
    methods: {
        contentHeight() {
            return {
                height: this.showTitle ? 'calc(100% - 50px)' : '100%',
                padding: this.showTitle ? '0 5px' : '0'
            };
        },
        async isNeedUkeyFun() {
            let resp = await isNeedUkey();
            if (+resp.data.isNeedUkey === 1) {
                this.socketKey = new SoftKey3W();
                this.isNeedUkey = true;
                this.ukeyDetect();
            }
        },
    // ukey 客户端服务
        ukeyDetect() {
            try {
                this.socketKey.on('open', () => {
          //  代表已经连接，用于判断是否安装了客户端服务
                    this.ukeyClient = 1;
          // this.isNeedUkey = true;
                });
        //  在使用事件插拨时，注意，一定不要关掉Sockey，否则无法监测事件插拨
                this.socketKey.on('message', Msg => {
                    let PnpData = JSON.parse(Msg.data);
          // 如果是插拨事件处理消息
                    if (PnpData.type === 'PnpEvent') {
            //                          被插入的锁的路径是：' + PnpData.DevicePath
                        if (PnpData.IsIn) {
                            this.$message({
                                type: 'info',
                                message: 'UKEY已被插入'
                            });
                            this.isUkey = true;
                            if (!this.isLogin) {
                                this.isNeedUkey = 0;
                                setTimeout(() => {
                                    this.isNeedUkey = 1;
                                });
                // location.reload()
                            }
                        } else {
                            localStorage.clear();
                            sessionStorage.clear();
                            this.$router.push({
                                path: '/login'
                            });
                            this.isLogin = false;
                            this.$message({
                                type: 'info',
                                message: 'UKEY已被拔出'
                            });
                            this.isUkey = false;
                        }
                    }
                });
                this.socketKey.on('close', () => {});
                this.socketKey.on('error', () => {
                    console.log('PC未安装客户端服务');
                });
            } catch (e) {
                alert(e.name + ': ' + e.message);
                return false;
            }
        },
        goBack() {
            this.$router.go(-1);
        },
        isShowButton() {
            if (this.title === '任务详情' || this.title === '任务列表') {
                this.showButton = false;
            } else {
                this.showButton = true;
            }
        },
        isShowTitle() {
            if (
        this.title === '任务列表' ||
        this.title === '任务详情' ||
        this.title === '告警模块详情' ||
        this.title === '老版重点区域实时监测' ||
        this.title === '重点区域实时监测' ||
        this.title === '任务配置' ||
        this.title === '审计查看' ||
        this.title === '省内历史轨迹查询' ||
        this.title === '全国历史轨迹查询' ||
        this.title === '省内最新位置查询' ||
        this.title === '全国最新位置查询' ||
        this.title === '省内多天历史轨迹查询' ||
        this.title === '快捷查询' ||
        this.title === '任务新增'
      ) {
                this.showTitle = false;
                this.menuShow = false;
            } else {
                this.showTitle = true;
                let titleFalse = [
                    '功能区域校准',
                    '功能区域划分',
                    '基础设施校准',
                    '基础设施划分',
                    '区域划分',
                    '用户密集区域校准',
                    '区域管控'
                ];
                if (titleFalse.includes(this.title)) {
                    this.showTitle = false;
                }
                this.menuShow = true;
                if (localStorage.getItem('taskId')) {
                    this.menuShow = false;
                }
            }
        },
        loginStatus(status) {
            this.isUkey = false;
            this.isLogin = status;
      // this.isNeedUkey = 0
      // this.socketKey.disconnect()
      // console.log(this.isNeedUkey)
      // this.isNeedUkeyFun()
        },
        sysStatus(status) {
            this.isLogin = status;
        },
    // 窗体自适应
        initEvent() {
            $(window).resize(() => {
                this.layoutResize();
            });
            this.layoutResize();
        },
        layoutResize() {
            let ww = $(window).width();
            let hh = $(window).height();
            this.winWidth = ww;
            this.winHeight = hh;
            this.$store.dispatch('global/syncVisualHeight', this.winHeight - 50 - 12);
        },
        ...mapActions({
            saveGlobalKeys: 'global/saveGlobalKeys'
        })
    },
    watch: {
        $route(to) {
            if (to.path === '/' || to.path === '/login') {
                localStorage.clear();
                sessionStorage.clear();
                this.isLogin = false;
            }
            this.title = this.$route.name;
            this.isShowButton();
            this.isShowTitle();
        }
    }
};
</script>

<style>
@component-namespace ga {
  @b layout {
    background: url("~assets/images/common/bg-nomal.png") no-repeat center 0;
    -webkit-background-size: cover;
    background-size: cover;
    position: relative;
    font-size: 18px;
    overflow: hidden;
    @e specialBg {
      background: url("~assets/images/common/loginBg.png") no-repeat center 0;
      -webkit-background-size: cover;
      background-size: cover;
    }
    @e sysHeader {
      /*display: none;*/
      position: absolute;
      top: 0;
      /* z-index: 102; */
      width: 100%;
    }
    @e leftMenu {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
    }
    @e body {
      padding: 0 16px 12px;
      /* background: url("~assets/images/common/bodyWrapBg.png") no-repeat center top;
                    background-size: 98% 99%;
                    padding: .6% 50px; */
      /*padding: 10px;*/
      /*>div {*/
      /*width: 100%;*/
      /*height: 100%;*/
      /*padding: 10px 20px;*/
      /*!*border: 1px solid rgb(71, 130, 209);*!*/
      /*!*box-shadow: rgb(71, 130, 209) 0px 0px 10px inset;*!*/
      /*background: rgba(0, 0, 0, 0.4);*/
      /*position: relative;*/
      /*}*/
    }
    @e bodyTitle {
      /*margin-top: -10px;*/
      font-size: 18px;
      height: 45px;
      line-height: 35px;
      color: #fff;
      text-shadow: 0px 0px 10px #199fd4;
      font-weight: 400;
      display: table;
      width: 100%;
      position: relative;
      z-index: 101;
    }
    @e titleTopLeft {
      display: inline-block;
      width: calc(39% - 69px);
      height: 50px;
      background: url("~@/assets/images/layout/titleTopLeft.png") no-repeat;
      background-size: 100% 100%;
      float: left;
    }
    @e titleLeft {
      display: inline-block;
      width: 70px;
      height: 50px;
      background: url("~@/assets/images/layout/titleLeft.png") no-repeat;
      background-size: 100% 100%;
      float: left;
    }
    @e titleCenter {
      display: inline-block;
      width: 22%;
      height: 50px;
      line-height: 43px;
      background: url("~@/assets/images/layout/titleCenter.png") repeat-x;
      background-size: contain;
      text-align: center;
      float: left;
      /*padding: 0 30px;*/
      margin-left: -1px;
      cursor: default;
      color: #a2eeff;
      font-size: 20px;
    }
    @e titleRight {
      display: inline-block;
      width: 70px;
      height: 50px;
      background: url("~@/assets/images/layout/titleRight.png") no-repeat;
      background-size: 100% 100%;
      float: left;
      margin-left: -1px;
    }
    @e titleRightLeft {
      display: inline-block;
      width: calc(39% - 69px);
      height: 50px;
      background: url("~@/assets/images/layout/titleTopRight.png") no-repeat;
      background-size: 100% 100%;
      float: left;
    }
    @e boderLeftTop {
      width: 16px;
      height: 50px;
      background: url("~@/assets/images/layout/topLeft.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 101;
    }
    @e boderRightTop {
      width: 17px;
      height: 50px;
      background: url("~@/assets/images/layout/topRight.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 101;
    }
    @e boderLeftBottom {
      width: 32px;
      height: 32px;
      background: url("~@/assets/images/layout/bottomLeft.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 101;
    }
    @e boderRightBottom {
      width: 32px;
      height: 32px;
      background: url("~@/assets/images/layout/bottomRight.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 101;
    }
    @e boderLeft {
      width: 16px;
      height: calc(100% - 82px);
      background: url("~@/assets/images/layout/boderLeft.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 0;
      top: 50px;
      z-index: 101;
    }
    @e boderRight {
      width: 16px;
      height: calc(100% - 82px);
      background: url("~@/assets/images/layout/boderRight.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: 50px;
      z-index: 101;
    }
    @e boderBottom {
      width: calc(100% - 64px);
      height: 12px;
      background: url("~@/assets/images/layout/boderBottom.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 32px;
      bottom: 0;
      z-index: 101;
    }
    @e body-content {
      height: calc(100% -10px);
    }
    @e body-back {
      position: absolute;
      right: 8px;
      top: 4px;
      color: #fff;
      /* font-size: 16px !important;  */
      z-index: 102;
      &:hover {
        cursor: pointer;
      }
    }
    @e goBack {
      background: url("~@/assets/images/common/goback.png") no-repeat;
      background-size: contain;
      position: absolute;
      left: 334px;
      top: 16px;
      width: 25px;
      height: 25px;
      cursor: pointer;
      z-index: 102;
    }
  }
}

@media only screen and (max-device-width: 1440px) {
  @component-namespace ga {
    @b layout {
      font-size: 14px;
      @e body {
        /* padding-top: .8%; */
      }
      div.ga-layout__body-title {
        font-size: 16px;
      }
    }
  }
}
</style>
