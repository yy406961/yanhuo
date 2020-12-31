<template>
    <div>
        <transition name = 'hide'>
            <div class='Elastic' v-if='IsShow'>
                <p class='Title'>{{areaName}}</p>
                <div class = 'Realtime '>
                    <div>
                        <p v-text='monitoring.totalNum'>{</p>
                        <p></p>
                        <p>实时总数</p>
                    </div>
                    <div>
                        <p v-text='monitoring.jnnum'></p>
                        <p></p>
                        <p>境内人员</p>
                    </div>
                    <div>
                        <p v-text='monitoring.jwnum'></p>
                        <p></p>
                        <p>境外人员</p>
                    </div>
                    <div style='cursor: pointer;'  @click='keyper()'>
                        <p v-text='monitoring.zdrynum'></p>
                        <p></p>
                        <p>重点人员</p>
                    </div>
                </div>
                <div class = 'clear'></div>
                <div class='chachatop' @click='closeShow()'>
                    <div class='chacha'></div>
                </div>
                <transition name = "slideLeft">
                    <div class='Elasticbox' v-if='Keyinfor'>
                        <div class = 'Keyperinfor'>
                            <p>重点人员</p>
                            <table border='1' v-if='Tableshow' >
                                <tr>
                                    <th>姓名</th>
                                    <th>手机号码</th>
                                    <th>IMSI</th>
                                    <th>采集时间</th>
                                </tr>
                                <tr v-for='(item, index) in ZDQYinfor' :key='index'>
                                    <td>{{item.name}}</td>
                                    <td style='color: #0aaebf;cursor: pointer'>{{item.telphone}}</td>
                                    <td>{{item.imsi}}</td>
                                    <td>{{item.zdrydate}}</td>
                                </tr>
                            </table>
                            <div class = 'NoneData' v-if='!Tableshow'>
                                暂无数据
                            </div>
                            <div class='chachatop1' @click='rightelastic()'>
                                <div class='chacha'></div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>



</template>

<script>
    import { ajax } from 'common'
    // import axios from 'axios'
    export default {
        name: 'Elastic',
        props: ['IsShow', 'showIndex', 'zdrType', 'areaName', 'isWarn'],
        data() {
            return {
                monitoring: {
                    totalNum: 0, // 实时总数
                    jnnum: 0, // 境内人员
                    jwnum: 0, // 境外人员
                    zdrynum: 0 // 重点人员
                },
                Tableshow: true,
                Keyinfor: false, // 显示表格
                Elastic: true, // 显示整个弹框
                // 获取设备3分钟内采集的imsi总数、境内总数、境外总数、重点人员总数。
                RealBasidata: {
                    ZDQYID: '01',
                    ZDQYDATE: '2019-06-15 10:45:00'
                },
                // 获取设备3分钟内采集的重点人信息（姓名、手机号码、imsi、采集时间）列表。
                ZdryBasidata: {
                    ZDQYID: '01',
                    ZDRYDATE: '2019-06-15 10:45:00'
                },
                ZDQYinfor: [
                    {
                        'name': '张三',
                        'telphone': '8617729583869',
                        'imsi': '1557907844',
                        'zdrydate': '2019-06-15 16:10'
                    },
                    {
                        'name': '李四',
                        'telphone': '8617729583869',
                        'imsi': '1557907844',
                        'zdrydate': '2019-06-15 16:10'
                    }
                ],
                timer: null
            }
        },
        mounted() {
            this.getInfo();
            this.getZDQY();
            this.rollPoling(true)
        },
        methods: {
            keyper() {
                this.Keyinfor = true;
            },
            closeShow() {
                this.$emit('innerClick', this.showIndex, false)
            },
            rightelastic() {
                this.Keyinfor = false;
            },
            // 获取card信息
            getInfo() {
                ajax.post(`http://15.15.11.129:8088/DwMan/getDevInfo`, {
                    'ZDQYID': this.zdrType
                }).then(resp => {
                    let { data } = resp
                    this.monitoring = data;
                }).catch((error) => {
                    console.log(error);
                })
            },
            // 获取重点人员
            getZDQY() {
                ajax.post(`http://15.15.11.129:8088/DwMan/getZdryInfo`, {
                    'ZDQYID': this.zdrType
                }).then(resp => {
                    let { data } = resp
                    if (data.data === '') {
                        // 暂无数据
                        this.Tableshow = false;
                    } else {
                        this.Tableshow = true;
                        this.ZDQYinfor = data;
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            rollPoling (isTurnOn) {
                if (isTurnOn) {
                    this.timer = setInterval(() => {
                        this.getInfo()
                        this.getZDQY()
                    }, 180000)
                } else {
                    clearInterval(this.timer)
                }
            }
        },
        // 销毁之前先清空本地存储的taskId和areaId,并断开socket连接
        beforeDestroy () {
            // 关闭轮询
            this.rollPoling(false)
        },
        watch: {
            isWarn(newVal) {
                let bool = !(newVal === '0')
                if (bool) this.getInfo()
            }
        }
    }
</script>


<style scoped>
    /*左边表格动画*/


    .right-enter{
        transform: translate3d(-100%, 0, 0);
        opacity: 0;
        width: 0;
    }
     .right-enter-to {
        transform: translate3d(0, 0, 0);
        width: 360px;
    }
    .right-leave{
        opacity: 1;
    }
    .right-leave-to{
        opacity: 0;
    }

    .right-enter-active, .right-leave-active {
        transition: all .5s
    }



    /*整个模块变化*/
    .hide-enter{
        opacity: 0;
    }
    .hide-enter-active{
        transition: opacity .2s;
    }
    .hide-leave-to{
        opacity: 0;
    }
    .hide-leave-active{
        transition: opacity .2s;
    }
    .NoneData{
        font-size: 0.8em;
        text-align: center;
        color: #fff;
        margin-top: 24px;
    }
    .Keyperinfor>p{
        text-align: left;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
        padding: 5px 0 5px 10px;
    }
    td,th {
        height: 26px;
        font-size: x-small;
        padding: 0;
        text-align: center;
        /* background: transparent; */
        /* background: rgba(1,6,22, 0.6); */
        border: 0
    }
    table{width:100%;text-align:center;border-collapse:collapse;border-spacing:0;color: rgb(255,255,255) }
    /*border-right:1px solid #939598; border-bottom:1px solid #939598;*/
    table td{word-break: break-all; word-wrap:break-word;}
    .Elasticbox{
        overflow: auto;
        position: absolute;
        left: -360px;
        top: 0;
        width: 350px;
        height: 130px;
        border-radius: 4px;
        border: 1px solid transparent;
        background: rgba(1,6,22,0.7);
        -webkit-box-shadow: 0 0 20px 0 rgba(0,0,0,0.10);
        box-shadow: 0 0 20px 0 rgba(0,0,0,0.10);
    }

    .Elasticbox::-webkit-scrollbar {/*滚动条整体样式*/
        width: 6px;
        height: 6px;
        background-color: rgba(7, 63, 100, 0);
    }
    .Elasticbox::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 6px;
        height: 6px;
        background: #0aaebf;
        /* background-color: rgba(38, 140, 198, 1); */
    }
    .Elasticbox::-webkit-scrollbar-track {/*滚动条里面轨道*/
        background-color: rgba(7, 63, 100, 0.3);
        border-radius: 6px;
    }
    .Elastic:hover >.chachatop{
        display: block;
    }
    .Elasticbox:hover >div>.chachatop1{
        display: block;
    }
    .chachatop,.chachatop1{
        display: none;
        position: absolute;
        top: 1px;
        right: 3px;
        width: 25px;
        height: 25px;
        text-align: center;
    }
    .chacha {
        display: inline-block;
        width: 12px;
        height: 2px;
        background: #999;
        line-height: 0;
        font-size: 0;
        vertical-align: middle;
        -webkit-transform: rotate(45deg);
    }
    .chacha:after {
        content: '/';
        display: block;
        width: 12px;
        height: 2px;
        background: #999;
        -webkit-transform: rotate(-90deg);
    }
    .clear{
    clear: both;
    }
    .Realtime{
        width: 100%;
        height:  calc(100% - 40px);
    }
    .Realtime>div{
        float: left;
        width: 50%;
        height: 50%;
    }
    .Realtime>div>p{
        font-size: 14px;
        text-align: center;
        color: rgb(255,255,255);
    }
    .Realtime>div>p:first-child{
        color: rgb(244, 70, 122);
    }
    .Realtime>div>p:first-child+p{
        height: 2px;
        width: 48%;
        margin: 2px auto;
        background-color: #0aaebf;
    }
.Elastic{
    margin: 0 auto;
    position: relative;
    width: 240px;
    height: 150px;
    border-radius: 4px;
    border: 1px solid transparent;
    background: rgba(1,6,22,0.7);
    -webkit-box-shadow: 0 0 20px 0 rgba(0,0,0,0.10);
    box-shadow: 0 0 20px 0 rgba(0,0,0,0.10);
}
    .Title{
        text-align: center;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
        padding: 12px 0  12px;
    }
</style>
