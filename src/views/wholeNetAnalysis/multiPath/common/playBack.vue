<template>
    <div class="playBack-content">
        <el-button :type="realType"
                    @click="clearHandler"
                    class='ga-button__realTime'
                    :class="{'active': btnSts === 'real'}">实时</el-button>
        <el-button type="primary"
                    :disabled="isLoading"
                    @click="startHandler"
                    class='ga-button__startBtn'
                    :class="{'active': btnSts === 'playback'}">{{startBtn}}</el-button>
        <div class="playBack-trackAxle">
            <!--<div :style="bubble" v-show="state || isStop"-->
                    <!--:class="['ga-mainContent__bottom&#45;&#45;bubble', {-->
                        <!--'ga-mainContent__bottom&#45;&#45;bubbleMoving': !moving-->
                    <!--}]">-->
                <!--<div v-show="!moving">-->
                    <!--到达时间：{{bubbleArriveTime}} <br>-->
                    <!--停留时间：{{bubbleStayTime}}-->
                <!--</div>-->
                <!--<div v-show="moving" class="moving">-->
                    <!--&lt;!&ndash;移动中&ndash;&gt;-->
                <!--</div>-->
            <!--</div>-->
            <el-slider
                class="nxPolice-slider"
                ref="trackAxle"
                :show-tooltip="false"
                v-model="trackAxleVal"
                :max="maxVal"
                @change="trackAxleValChange"
                show-stops>
            </el-slider>
        </div>
        <div class="playBack-cover"></div>
    </div>
</template>

<script>
import Bus from './bus.js'
const HISLABEL = '回放'
const CONLABEL = '继续'
const PAUSELABEL = '暂停'
export default {
    name: 'palyBack',
    props: {
        fn: '',
        maxVal: 0
    },
    watch: {
        state (val) {
            this.$emit('playBackState', val)
        }
    },
    data () {
        return {
            realType: 'primary',
            startBtn: HISLABEL,
            trackAxleVal: 0,
            playMinTime: 5,
            playMaxTime: 5,
            btnSts: 'real',
            isLoading: false,
            // 点击标签 是否重复点击
            clicktag: 0,
            // 是否暂停
            isStop: true,
            /**
             * 播放状态 是否播放
             * true 播放
             * false 暂停
            **/
            state: false
        }
    },
    methods: {
        clearHandler (val = true) {
            this.realType = 'primary'
            this.controlCover(true)
            this.trackAxleVal = 0;
            clearInterval(this.timer)
            if (val) {
                this.fn();
            }
            this.btnSts = 'real'
            this.startBtn = HISLABEL
            this.state = false
            this.isStop = false;
        },
        startHandler () {
            if (this.clicktag === 0) {
                this.clicktag = 1;
                setTimeout(() => {
                    this.clicktag = 0
                }, 500);
            } else {
                alert('请勿频繁点击！');
                return;
            }
            //  回放 两折叠框 收起
            // let tab = $('.ga-mainContent__left');
            // if (tab.height() > 50) {
            //     tab.animate({
            //         'height': '28px'
            //     })
            // }
            // let tab1 = $('.ga-mainContent__right');
            // if (tab1.height() > 50) {
            //     tab1.animate({
            //         'height': '28px'
            //     })
            // }
            //  暂停 状态 真
            this.isStop = true;
            // this.isLeftToggle = true;
            // this.isRightToggle = true;
            this.btnSts = 'playback'
            if (this.state) {
                this.realType = 'primary'
                        // 暂停
                clearInterval(this.timer)
                this.startBtn = CONLABEL
                this.controlCover(false)
                this.state = false;
            } else {
                        //  播放
                this.realType = 'default'
                this.controlCover(true)
                this.startBtn = PAUSELABEL
                        //  播放完 归零
                if (this.trackAxleVal === this.maxVal) {
                    this.trackAxleVal = 0;
                }
                let speed = 1;
                let speedTime = this.playTime(20, this.maxVal * 2 + 1, this.playMinTime, this.playMaxTime)
                        //  轴值 不为0 说明是暂停再播放情况
                if (this.trackAxleVal) {
                    this.trackAxleVal += 0.5
                }
                this.state = true
                let num = 0;
                this.timer = setInterval(() => {
                    Bus.$emit('playBackToMap', num)
                    num += 1;
                    this.trackAxleVal += 0.5
                    speed += 1;
                    if (this.trackAxleVal === this.maxVal) {
                        this.startBtn = CONLABEL;
                        this.state = false;
                        clearInterval(this.timer)
                        this.timer = 0;
                        Bus.$emit('playBackToMap', num)
                    }
                }, speedTime * (speed++))
            }
        },
        trackAxleValChange () {},
        /**
         * [playTime 播放]
         * @param  {[type]} minTime  [description] 最小播放时间 单位s
         * @param  {[type]} maxTime [description]  最大播放时间 单位s
         * @return {[type]} num        [description]  最小播放时间可播放的最大个数
         * @return {[type]} total        [description]  播放总个数
         */
        playTime (num, total, minTime, maxTime) {
            let speedTime = 1000
            let n = +(total / num).toFixed(2)
            let subtract = maxTime - minTime
            if (n > 1 && n < subtract) {
                speedTime = ((minTime + n - 1) * 1000) / (total)
            } else if (n <= 1) {
                speedTime = (minTime * 1000) / (total)
            } else if (n >= subtract) {
                speedTime = ((maxTime) * 1000) / (total)
            }
            return speedTime
        },
         // 禁用是否
        controlCover (val) {
            let value = val ? 'block' : 'none'
            let cover = $('.playBack-cover');
            cover.css({
                'display': value
            })
        }
    }
}
</script>

<style lang="postcss" scoped>
    .playBack-clearBtn.active:before {
        background: #1A498A;
    }
    .playBack-clearBtn.active:after {
        background: #1A498A;
    }
    .playBack-startBtn.active:before {
        background: #1A498A;
    }
    .playBack-startBtn.active:after {
        background: #1A498A;
    }
    @component-namespace playBack {
        @b content {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        @b clearBtn {
            font-size: 12px;
            position: relative;
            margin-left: 25px;
            margin-right: 25px;
            margin-bottom: 0px;
            z-index: 1;
            &:before {
                content: '';
                z-index: -1;
                top: 3px;
                bottom: 3px;
                right: 5px;
                left: -17px;
                background: var(--bg-color);
                position: absolute;
                border: 1px solid #4081dc;
            }
            &:after {
                content: '';
                position: absolute;
                top: 3px;
                bottom: 3px;
                left: 0px;
                right: -18px;
                z-index: -1;
                background: var(--bg-color);
                -webkit-transform: skew(-25deg);
                transform: skew(-25deg);
                border: 1px solid #4081dc;
                border-left: none;
            }
        }
        @b startBtn {
            font-size: 12px;
            position: relative;
            margin-bottom: 0px;
            z-index: 1;
            &:before {
                content: '';
                z-index: -1;
                top: 3px;
                bottom: 3px;
                right: 5px;
                left: -15px;
                background: var(--bg-color);
                position: absolute;
                -webkit-transform: skew(-25deg);
                transform: skew(-25deg);
                border: 1px solid #4081dc;
                border-right: none;
            }
            &:after {
                content: '';
                position: absolute;
                top: 3px;
                bottom: 3px;
                left: 8px;
                right: -15px;
                z-index: -1;
                background: var(--bg-color);
                border: 1px solid #4081dc;
                border-left: none;
            }
        }
        @b trackAxle {
            position: relative;
            left: 30px;
            width: calc(100% - 145px)
        }
        @b cover {
            position: absolute;
            bottom: 0px;
            z-index: 1002;
            right: 0px;
            height: 30px;
            width: calc(100% - 125px);
            /*background-color: red;*/
            cursor:not-allowed;
        }
    }
</style>
