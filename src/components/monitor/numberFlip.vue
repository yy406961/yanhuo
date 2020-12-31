<template lang="html">
        <!-- 标题在上 -->
        <div class="ga-contentBox" :style="boxFlexStyle">
        <!-- 标题在左 -->
            <div class="ga-contentBox__titleContent" :style="nameStyle" v-if="returnData.showTitle && returnData.titlePosition == '2'">{{returnData.titleName}}</div>
            <div class="ga-contentBox__preContent" :style="preStyle" v-if="returnData.preContent" v-text="returnData.preContent"></div>
            <div class="ga-contentBox__numBox">
                <span class="ga-contentBox__numBox--smallBox" :style="[numStyle, pubStyle]" v-if="defaultNum > 0" v-for="item in defaultNum">
                     0
                </span>
                <span class="ga-contentBox__numBox--smallBox" v-for="item in numData" :style="[pubStyle, item == ',' ? dotStyle : numStyle]">
                    {{item}}
                </span>
            </div>
            <div class="ga-contentBox__nextContent" :style="nextStyle" v-if="returnData.nextContent" v-text="returnData.nextContent"></div>
        </div>
</template>
<script>
let prop = {
    // 是否显示标题
    showTitle: false,
    // 标题名称
    titleName: '',
    // 标题位置
    titlePosition: '1',
    // 标题文字大小
    titleFontSize: '20',
    // 标题文字颜色
    titleFontColor: 'rgba(154, 245, 246, .8)',
    // 标题是否加粗
    titleIsBold: false,
    // 是否显示背景
    showBg: true,
    // 背景大小
    bgDistance: '2',
    bgLeftDistance: '6',
    // 翻牌器对齐方式 1 左对齐  2 右对齐  3 居中对齐
    blockAlign: '3',
    // 背景颜色
    // bgColor: 'rgba(36, 135, 226, .2)',
    bgColor: 'rgba(24,117,240,0.20)',
    // 背景圆角值
    bgRadiu: '0',
    // 数字间距
    distance: '8',
    // 前缀内容
    preContent: '',
    // 后缀内容
    nextContent: '',
    // 数字文字大小
    fontSize: '38',
    // 数字文字颜色
//     fontColor: 'linear-gradient(to bottom, #)',
    fontColor: '#D6FFF7',
    // 数字文字是否加粗
    isBold: true,
    // 默认位数
    defaultCount: '7',
    // 千分位是否显示
    showThousand: false,
    // 翻动时间
    turnTime: '1',
    // 前缀文字颜色
    preFontColor: '#1d90e6',
    // 前缀文字大小
    preFontSize: '18',
    // 前缀文字是否加粗
    preIsBold: false,
    // 后缀文字颜色
    nextFontColor: '#1d90e6',
    // 后缀文字大小
    nextFontSize: '18',
    // 后缀文字是否加粗
    nextIsBold: false
}
export default {
    name: 'numberFlip',
    props: [
        'options',
        'renderData'
    ],
    data () {
        return {
            oldData: 0,
            changeData: 0,
            returnData: {},
            textAlign: '',
            blockAlign: '',
            runNum: {
                scale: 0
            },
            refreshNum: 0,
            diff: 0,
            numAte: {}
        }
    },
    computed: {
        numData () {
            return this.changeData.toString().split('')
        },
        boxFlexStyle () {
            // 判断行高
            let maxSize = 0
            if (this.returnData.preFontSize) {
                maxSize = this.returnData.preFontSize
            }
            if (this.returnData.nextFontSize) {
                maxSize = this.returnData.nextFontSize
            }
            if (this.returnData.fontSize) {
                maxSize = this.returnData.fontSize
            }
            if (Number(this.returnData.preFontSize) > Number(this.returnData.fontSize)) {
                maxSize = this.returnData.preFontSize
            }
            if (Number(this.returnData.nextFontSize) > Number(maxSize)) {
                maxSize = this.returnData.nextFontSize
            }
            return {
                justifyContent: this.blockAlign,
                // marginTop: this.options.height / 2 - maxSize / 2 + 'px'
                marginTop: 5 + 'px'
            }
        },
        // 数字样式
        pubStyle () {
            return {
                fontSize: this.returnData.fontSize + 'px',
                fontColor: this.returnData.fontColor,
                fontWeight: this.returnData.isBold ? 'bold' : '',
                color: this.returnData.fontColor,
                borderRadius: this.returnData.bgRadiu + 'px',
                marginRight: this.returnData.distance + 'px'
            }
        },
        numStyle () {
            return {
                padding: this.returnData.showBg ? (this.returnData.bgDistance + 'px') : '0px',
                paddingLeft: this.returnData.showBg ? (this.returnData.bgLeftDistance + 'px') : '0px',
                background: this.returnData.showBg ? this.returnData.bgColor : 'none'
            }
        },
        dotStyle () {
            return {
                padding: '0px'
            }
        },
           // 标题样式
        nameStyle () {
            return {
                color: this.returnData.titleFontColor,
                fontSize: this.returnData.titleFontSize + 'px',
                fontWeight: this.returnData.titleIsBold ? 'bold' : ''
            }
        },
           // 前缀样式
        preStyle () {
            return {
                color: this.returnData.preFontColor,
                fontSize: this.returnData.preFontSize + 'px',
                fontWeight: this.returnData.preIsBold ? 'bold' : '',
                paddingLeft: this.returnData.showBg ? (this.returnData.bgLeftDistance + 'px') : '0px',
                padding: this.returnData.showBg ? (this.returnData.bgDistance + 'px') : '0px'
            }
        },
           // 后缀样式
        nextStyle () {
            return {
                color: this.returnData.nextFontColor,
                fontSize: this.returnData.nextFontSize + 'px',
                fontWeight: this.returnData.nextIsBold ? 'bold' : '',
                paddingLeft: this.returnData.showBg ? (this.returnData.bgLeftDistance + 'px') : '0px',
                padding: this.returnData.showBg ? (this.returnData.bgDistance + 'px') : '0px'
            }
        },
        defaultNum () {
            if (this.returnData.defaultCount > this.numData.length) {
                return this.returnData.defaultCount - this.numData.length
            } else {
                return 0
            }
        }
    },
    mounted () {
        this.initFlip()
    },
    methods: {
        initFlip () {
            this.returnData = prop
            if (this.returnData.blockAlign === '1') {
                this.blockAlign = 'flex-start'
            } else if (this.returnData.blockAlign === '2') {
                this.blockAlign = 'flex-end'
            } else if (this.returnData.blockAlign === '3') {
                this.blockAlign = 'center'
            }
            if (this.returnData.showThousand) {
                    // 处理默认位数
                let changeAfter = ''
                if (this.defaultNum) {
                    let zeroNumber = ''
                    for (var i = 0; i < this.defaultNum; i++) {
                        zeroNumber = zeroNumber + '0'
                    }
                    changeAfter = zeroNumber + this.oldData
                } else {
                    let zeroNumber = ''
                    let numNum = this.returnData.defaultCount - this.numData.length
                    for (let i = 0; i < numNum; i++) {
                        zeroNumber = zeroNumber + '0'
                    }
                    changeAfter = zeroNumber + this.oldData
                }
                this.changeData = this.formatNum(changeAfter)
            } else {
                this.changeData = this.oldData
            }
        },
        // 数字动画
        numberAnimate () {
            if (this.numAte.kill) {
                this.numAte.kill(null, this.runNum)
            }
            this.runNum.scale = 0
                //  差值
            this.diff = this.oldData - this.refreshNum
            this.numAte = TweenMax.to(this.runNum, this.returnData.turnTime, {
                scale: 1,
                ease: window.Expo.easeOut,
                onUpdate: this.onUpdate
            })
        },
        onUpdate () {
            if (this.returnData.showThousand) {
                this.changeData = this.formatNum(Math.round(this.refreshNum + this.diff * this.runNum.scale))
            } else {
                this.changeData = Math.round(this.refreshNum + this.diff * this.runNum.scale)
            }
        },
            // 数字格式化
        formatNum (num) {
            num = (num || 0).toString()
            let result = ''
            while (num.length > 3) {
                result = ',' + num.slice(-3) + result
                num = num.slice(0, num.length - 3)
            }
            if (num) { result = num + result }
            return result
        }
    },
    watch: {
        renderData: {
            handler (newVal) {
                if (newVal && newVal.length) {
                    this.refreshNum = Number(this.oldData, 10)
                    this.oldData = newVal[0].value
                    this.numberAnimate()
                }
            }
        },
        options: {
            deep: true,
            handler () {
                this.initFlip()
            }
        }
    }
}
</script>

<style scoped>
@component-namespace ga {
    @b contentBox {
        display: flex;
        flex-direction: cloumn;
        align-items: baseline;
        pointer-events:none;
        @e titleContent {
            margin-right: 20px;
        }
        @e numBox {
            font-family: 'lcdd';
            overflow: hidden;
            float: left;
            @m smallBox {
                display: inline-block;
                border-top: 1px solid #0876A6;
                border-bottom: 1px solid #0876A6;
                &:last-child {
                    margin-right: 0px !important;
                }
            }
        }
    }
}
</style>
