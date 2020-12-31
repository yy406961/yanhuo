<template lang="html">
    <div class="ga-loginPage" :style="loginStyle">
        <div class="ga-loginPage__loginBox">
            <i class="ga-loginPage__topLeft"></i>
            <i class="ga-loginPage__topRight"></i>
            <i class="ga-loginPage__bottomLeft"></i>
            <i class="ga-loginPage__bottomRight"></i>
            <div :class="['ga-loginPage__loginLogo', isPoliceBadge?'ga-loginPage__isShow':'']">
                <div>
                    <!--<span class="ga-loginPage__loginWings&#45;&#45;left"></span>-->
                    {{gtitle}}
                    <!--<span class="ga-loginPage__loginWings&#45;&#45;right"></span>-->
                </div>
            </div>
            <div class="ga-loginPage__item">
                <!--<label>用户名：</label>-->
                <i class="ga-loginPage__item--username"></i>
                <input placeholder="请输入用户名" v-model="loginForm.userName" type="text">
            </div>
            <div class="ga-loginPage__item">
                <!--<label>密码：</label>-->
                <i class="ga-loginPage__item--password"></i>
                <input placeholder="请输入密码" v-model="loginForm.userPassword"  type="password">
            </div>
            <!--<div class="ga-loginPage__item ga-loginPage__item&#45;&#45;verification">-->
                <!--<label>验证码：</label>-->
                <!--<input placeholder="请输入验证码" v-model="loginForm.veryfycode"  type="text">-->
                <!--<div>-->
                    <!--<img  :src="verificationSrc" @click="changeVerification">-->
                <!--</div>-->
            <!--</div>-->
            <p class="ga-loginPage__msg">{{ msg }}</p>
            <button class="ga-loginPage__button--enter"
                    ref="enterBtn"
                    @click="login" >登&nbsp;录</button>
        </div>
    </div>
</template>

<script>
import Io from 'utils/websocket';
import SoftKey3W from 'utils/Syunew3.js';
import { storage } from 'common';
import { loginUser, loginUkey } from 'api/login';
import { mapActions, mapGetters } from 'vuex';
import { getGlobalKeys } from 'api/layout/header';
const apiUrl =
  process.env.NODE_ENV === 'production'
    ? '/policeBusiness'
    : 'http://192.168.3.196:8080/policeBusiness';
const URL =
  process.env.NODE_ENV === 'production'
    ? ''
    : 'ws://10.8.0.14:8080/policeBusiness';
export default {
    name: 'login',
    data() {
        return {
            loginForm: {
                // userName: '',
                // userPassword: ''
                userName: 'admin-任务使用人',
                userPassword: '123456'
                // veryfycode: ''
            },
            ukeyForm: {
                serName: '',
                userPassword: ''
            },
            isSession: null,
            msg: '',
            verificationSrc: '',
            loginData: this.isLogin,
            socket3w: null,
            socket: new Io(),
            socketDestory: false,
            bConnect: 0
        };
    },
    props: ['isLogin', 'gtitle', 'isUkey', 'isNeedUkey', 'ukeyClient'],
    created() {},
    watch: {
    //  检测 是否开启 ukey登录
        isNeedUkey(val) {
            if (val) {
                this.socket3w = new SoftKey3W();
                setTimeout(() => {
                    this.ukeyVerify();
                }, 500);
            }
        }
    },
    beforeDestroy() {
        this.socketDestory = true;
        this.socket.disconnect();
    //            this.socket.disconnect()
    },
    mounted() {
        this.login();
        // document.addEventListener(
        //     'keyup',
        //     function(e) {
        //         if (this.$refs.enterBtn && e.keyCode === 13) {
        //             this.login();
        //         }
        //     }.bind(this),
        //     false
        // );
        // this.changeVerification()
    },
    methods: {
    // 超时登录 方法
        socketFun() {
            this.socket.connect(`${URL}/websocket/loginSocket`);
            this.socket.on('open', () => {
                // this.socket.emit('webScoketData', {
                //     'id': sessionStorage.getItem('userId')
                // });
            });
            this.socket.on('message', () => {
                // let { data } = res
                let num = 0;
                if (this.loginData) {
                    num += 1;
                    if (num === 1) {
                        this.$message('超时登录，请重新登录');
                        localStorage.clear();
                        sessionStorage.clear();
                        this.$router.push({
                            path: '/login'
                        });
                        this.isLogin = false;
                        num = 0;
                        // this.$alert('超时登录，请退出重新登录', '警告', {
                        //     confirmButtonText: '确定',
                        //         cancelButtonText: '取消',
                        //     type: 'warning'
                        // }).then(() => {
                        //     localStorage.clear()
                        //     sessionStorage.clear()
                        //     this.$router.push({
                        //         path: '/login'
                        //     })
                        //     this.isLogin = false
                        //     num = 0;
                        // })
                    }
                }
            });
            this.socket.on('close', () => {
                // this.socket.disconnect()
            });
        },
        login() {
            // isNeedUkey是否开启ukey登录 开启又是否有插入ukey
            if (this.isNeedUkey && !this.isUkey) {
                this.$message({
                    type: 'warning',
                    message: '请插入ukey或重新插拔'
                });
                return;
            }
            if (this.loginForm.userName === '') {
                this.$message('用户名不能为空！');
                return;
            }
            if (this.loginForm.userPassword === '') {
                this.$message('密码不能为空！');
                return;
            }
            // if (this.loginForm.veryfycode === '') {
            //     this.$message('验证码不能为空');
            //     return
            // }
            loginUser(this.loginForm).then(resp => {
                this.$emit('change', (this.loginData = true));
                this.$router.push({ path: '/task/index' });
                this.$message('登录成功！');
                // userName 对应后台返回值中 userName 字段，此字段为登录用户的用户名
                // userId 对应后台返回值中 userId 字段，此字段为登录用户的用户ID
                // userNick 对应后台返回值中 userNick 字段，此字段为登录用户的用户姓名
                this.saveUserName(resp.data.userName);
                this.saveUserNick(resp.data.userNick);
                this.saveUserId(resp.data.userId);
                this.saveGlobalKeys(resp.data);
                storage.session.set('userName', resp.data.userName);
                storage.session.set('userNick', resp.data.userNick);
                storage.session.set('userId', resp.data.userId);
                storage.session.set('globalKeys', resp.data);
                this.getGlobalKeys();
                this.socketFun();
            });
        },
        // ukey登录
        ukeyLogin() {
            if (this.ukeyForm.userName === '') {
                this.$message('获取用户名失败！');
                return;
            }
            if (this.ukeyForm.userPassword === '') {
                this.$message('获取密码失败！');
                return;
            }
            loginUkey(this.ukeyForm).then(resp => {
                this.$emit('change', (this.loginData = true));
                this.$router.push({ path: '/task/index' });
                this.$message('登录成功！');
                // userName 对应后台返回值中 userName 字段，此字段为登录用户的用户名
                // userId 对应后台返回值中 userId 字段，此字段为登录用户的用户ID
                // userNick 对应后台返回值中 userNick 字段，此字段为登录用户的用户姓名
                this.saveUserName(resp.data.userName);
                this.saveUserNick(resp.data.userNick);
                this.saveUserId(resp.data.userId);
                this.saveGlobalKeys(resp.data);
                storage.session.set('userName', resp.data.userName);
                storage.session.set('userNick', resp.data.userNick);
                storage.session.set('userId', resp.data.userId);
                storage.session.set('globalKeys', resp.data);
                this.getGlobalKeys();
                this.socketFun();
            });
        },
        async getGlobalKeys() {
            let resp = await getGlobalKeys();
            storage.session.set('gTime', resp.data.now);
        },
        changeVerification() {
            this.verificationSrc = `${apiUrl}/login/verifyImgRefresh/?${new Date()}`;
        },
        ...mapActions({
            saveGlobalKeys: 'global/saveGlobalKeys',
            saveUserName: 'global/saveUserName',
            saveUserNick: 'global/saveUserNick',
            saveUserId: 'global/saveUserId'
        }),
        // ukey 检测 是否安装了客户端服务
        // ukeyDetect () {
        //     try {
        //         this.socket3w.on('open', () => {
        //             //  用于判断是否安装了客户端服务
        //             this.bConnect = 1
        //         })
        //     } catch (e) {
        //         alert(e.name + ': ' + e.message);
        //         return false;
        //     }
        // },
    // ueky 获取用户名 密码 登录
        ukeyVerify() {
      //  判断是否安装了客户端服务程序，如果没有安装提示用户安装
            if (this.ukeyClient === 0) {
                this.$message({
                    type: 'warning',
                    message: '未能连接服务程序，请确定客户端服务程序是否安装。'
                });
                return false;
            }
            try {
                let DevicePath, mylen;

        // 创建UK类
                let socket = new SoftKey3W();
                socket.on('open', () => {
                    if (this.socketDestory) {
                        return;
                    }
          //  这里调用ResetOrder将计数清零，这样，消息处理处就会收到0序号的消息，通过计数及序号的方式，从而生产流程
                    socket.ResetOrder();
                });

        //  写代码时一定要注意，每调用我们的一个UKEY函数，就会生产一个计数，即增加一个序号，较好的逻辑是一个序号的消息处理中，只调用我们一个UKEY的函数
                socket.on('message', Msg => {
                    let UKData = JSON.parse(Msg.data);
                    if (UKData.type !== 'Process') {
            //  如果不是流程处理消息，则跳过
                        return;
                    }
                    let warningDeal = msg => {
                        if (UKData.LastError !== 0) {
                            this.$message({
                                type: 'warning',
                                message: msg + UKData.LastError.toString()
                            });
                            socket.SocketUK.close();
                            return false;
                        }
                    };
                    switch (UKData.order) {
                        case 0:
                            socket.FindPort(0);
                            break;
                        case 1:
                            if (UKData.LastError !== 0) {
                                this.$message({
                                    type: 'warning',
                                    message: '未发现ukey，请插入ukey登录'
                                });
                                socket.SocketUK.close();
                                return false;
                            }
              //  拿到返回的UK的路径
                            DevicePath = UKData.return_value;
              //  获取设置在锁中的用户名
                            socket.YReadEx(0, 1, 'ffffffff', 'ffffffff', DevicePath); //  发送命令取UK地址0的数据
                            break;
                        case 2:
                            warningDeal('读取用户名数据时错误，错误码为：');
              //  发送命令从数据缓冲区中数据
                            socket.GetBuf(0);
                            break;
                        case 3:
                            warningDeal('调用用户名GetBuf时错误，错误码为：');
                            mylen = UKData.return_value; // 获得返回的数据缓冲区中数据
              //  再从地址1读取相应的长度的字符串，,使用默认的读密码"FFFFFFFF","FFFFFFFF"
                            socket.YReadString(1, mylen, 'ffffffff', 'ffffffff', DevicePath); // 发送命令从UK地址1中取字符串
                            break;
                        case 4:
                            warningDeal('读取用户名字符串时错误，错误码为：');
              //  拿到用户名
                            this.ukeyForm.userName = UKData.return_value;
              //   获得返回的UK地址1的字符串
              //  获到设置在锁中的用户密码,
                            socket.YReadEx(20, 1, 'ffffffff', 'ffffffff', DevicePath);
                            break;
                        case 5:
                            warningDeal('读取密码数据时错误，错误码为：');
                            socket.GetBuf(0); // 发送命令从数据缓冲区中数据
                            break;
                        case 6:
                            warningDeal('调用密码GetBuf时错误，错误码为：');
                            mylen = UKData.return_value; // 获得返回的数据缓冲区中数据
                            socket.YReadString(21, mylen, 'ffffffff', 'ffffffff', DevicePath);
                            break;
                        case 7:
                            warningDeal('读取密码字符串时错误，错误码为：');
              //  拿到密码
                            this.ukeyForm.userPassword = UKData.return_value;
                            this.ukeyLogin();
                            socket.SocketUK.close();
            //  自定义写入 方法
            //  socket.YWriteString('自定义', 101, 'ffffffff', 'ffffffff', DevicePath)
            //                            case 8:
            //                                //  自定义写入 方法
            //                                warningDeal('写入自定义数据错误')
            //                                socket.SetBuf(UKData.return_value, 0)
            //                                break;
            //                            case 9:
            //                                warningDeal('设置数据到缓冲区时错误，错误码为：')
            //                                socket.YWriteEx(100, 1, 'ffffffff', 'ffffffff', DevicePath);
            //                                break;
            //                            case 10:
            //                                warningDeal('写入加密锁错误，错误码为：')
            //                                socket.YReadEx(100, 1, 'ffffffff', 'ffffffff', DevicePath);
            //                                break;
            //                            case 11:
            //                                warningDeal('读取字符串时错误，错误码为：')
            //                                socket.GetBuf(0);
            //                                break;
            //                            case 12:
            //                                warningDeal('调用GetBuf时错误，错误码为：')
            //                                socket.YReadString(101, UKData.return_value, 'ffffffff', 'ffffffff', DevicePath); // 发送命令从UK地址1中取字符串
            //                                break;
            //                            case 13:
            //                                warningDeal('读取字符串时错误，错误码为：')
            //                                this.ukeyLogin()
            //                                socket.SocketUK.close();
                    }
                });
                socket.on('close', () => {});
                return true;
            } catch (e) {
                alert(e.name + ': ' + e.message + '。可能是没有安装相应的控件或插件');
                return false;
            }
        }
    },
    computed: {
        loginStyle() {
            return {
        // width: document.body.clientWidth + 'px',
        // height: document.body.clientHeight + 'px'
            };
        },
    // gtitle () {
    //     return `${this.globalKeys['gTitle']}社会安全实验平台`
    // },
        ...mapGetters({
            globalKeys: 'global/globalKeys',
            isPoliceBadge: 'global/isPoliceBadge'
        })
    }
};
</script>

<style lang="postcss" scoped>
::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgba(255, 255, 255, 0.65);
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(255, 255, 255, 0.65);
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(255, 255, 255, 0.65);
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgba(255, 255, 255, 0.65);
}
/*登录页面*/
@component-namespace ga {
  @b loginPage {
    width: 100%;
    height: 100%;
    min-width: 630px;
    min-height: 630px;
    background: url("~assets/images/login/loginBg.png") no-repeat center;
    background-size: cover;
    @e isShow {
      background: url("~assets/images/login/loginLogo1.png") no-repeat center;
    }
    @e loginLogo {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      /*background: url("~assets/images/login/loginLogo1.png") no-repeat center;*/
      -webkit-background-size: 92px;
      background-size: 92px;
      width: 640px;
      /*// width: 1000px;*/
      height: 170px;
      position: relative;
      top: 18%;
      left: 50%;
      margin-left: -320px;
      color: #fff;
      font-size: 26px;
      letter-spacing: 2px;
      text-shadow: 0px 0px 10px #199fd4;
      margin-bottom: 24px;
      > div {
        display: flex;
        align-items: baseline;
        justify-content: space-around;
        width: 100%;
      }
      span {
        width: 154px;
        height: 16px;
      }
    }
    @e loginWings {
      @m left {
        background: url("~assets/images/login/loginWingsLeft.png") no-repeat 0 0;
      }
      @m right {
        background: url("~assets/images/login/loginWingsRight.png") no-repeat 0
          0;
      }
    }
    @e loginBox {
      width: 400px;
      /*margin: 0 auto;*/
      /*height: 310px;*/
      /*height: 260px;*/
      background: #ccc;
      position: relative;
      top: 50%;
      left: 58%;
      transform: translateY(-50%);
      /*background: url("~assets/images/login/loginBoxBg.png") no-repeat center;*/
      /*background-size: 100% 100%;*/
      background: rgba(121, 180, 255, 0.11);
      border: 1px solid rgba(60, 164, 255, 1);
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
      /*padding: 44px 50px 0;*/
      padding: 20px 65px 50px;
      color: #fff;
      font-size: 14px;
    }
    @e topLeft {
      width: 89px;
      height: 41px;
      background: url("~@/assets/images/login/topLeft.png") no-repeat;
      position: absolute;
      top: -2px;
      left: -2px;
    }
    @e topRight {
      width: 33px;
      height: 41px;
      background: url("~@/assets/images/login/topRight.png") no-repeat;
      position: absolute;
      top: -2px;
      right: -2px;
    }
    @e bottomLeft {
      width: 33px;
      height: 48px;
      background: url("~@/assets/images/login/bottomLeft.png") no-repeat;
      background-size: contain;
      position: absolute;
      left: -2px;
      bottom: -2px;
    }
    @e bottomRight {
      width: 89px;
      height: 48px;
      background: url("~@/assets/images/login/bottomRight.png") no-repeat right;
      background-size: contain;
      position: absolute;
      right: -2px;
      bottom: -2px;
    }
    @e item {
      /*display: flex;*/
      /*justify-content: flex-end;*/
      /*align-items: center;*/
      height: 60px;
      position: relative;
      > label {
        font-size: 14px;
        margin-right: 10px;
      }
      > input {
        /*width: 76%;*/
        width: 100%;
        /*border: none;*/
        background: #10406f;
        border: 1px solid #00a4ff;
        /*background: url("~assets/images/common/input.png") no-repeat 0 center;*/
        /*background-size: 100% 100%;*/
        line-height: 35px;
        outline: none;
        color: #fff;
        padding-left: 45px;
        padding-right: 16px;
        &:focus {
          box-shadow: 0 0 6px 0 #00a4ff;
        }
      }
      > span {
        cursor: pointer;
        margin-top: -20px;
      }
      > i {
        position: absolute;
        top: 7px;
        left: 10px;
        display: inline-block;
        width: 20px;
        height: 20px;
        &:after {
          content: "";
          width: 1px;
          height: 22px;
          position: absolute;
          top: 0;
          right: -9px;
          background: linear-gradient(
            0deg,
            rgba(0, 197, 255, 0.1) 0%,
            rgba(0, 197, 255, 0.6) 50%,
            rgba(0, 197, 255, 0.1) 98%
          );
        }
      }
      @m username {
        background: url("~assets/images/login/username.png") no-repeat 0 center;
        background-size: 100% 100%;
      }
      @m password {
        background: url("~assets/images/login/password.png") no-repeat 0 center;
        background-size: 100% 100%;
      }
      @m verification {
        input {
          width: 47%;
        }
        div {
          width: 76px;
          height: 32px;
          margin-left: 2%;
          padding: 2px 0 0 2px;
          background: url("~assets/images/common/input1.png") no-repeat 0 center;
          background-size: 100% 100%;
          img {
            width: 72px;
            height: 28px;
          }
        }
      }
    }
    @e msg {
      margin: 0;
      color: red;
      text-align: center;
      margin-bottom: 10px;
      /*height: 30px;*/
      /*line-height: 30px;*/
    }
    @e button {
      @m enter {
        display: block;
        /*margin: 10px auto 0;*/
        margin: -5px auto 0;
        /*background: #20a0ff;*/
        /*background-image: radial-gradient(50% 198%, #00ADE0 100%, #13649F 100%);*/
        background: url("~assets/images/login/button.png") no-repeat;
        background-size: 100% 100%;
        /*border: 1px solid #00A4FF;*/
        border-radius: 3px;
        border: none;
        color: #fff;
        width: 100%;
        /*border-radius: 4px;*/
        line-height: 34px;
        font-size: 16px;
        cursor: pointer;
      }
      @m enter:hover {
        background-color: #47a7ef;
      }
    }
  }
}

/*@media only screen and (max-device-width: 1366px) {*/
/*@component-namespace ga {*/
/*@b loginPage {*/
/*@e loginLogo {*/
/*top: 5%;*/
/*}*/
/*@e loginBox {*/
/*top: 12%;*/
/*}*/
/*@e msg {*/
/*bottom: 40px;*/
/*left: 26%;*/
/*}*/
/*}*/
/*}*/
/*}*/
</style>
