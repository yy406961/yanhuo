<template>
    <div class="ga-numberFlip__value">
        <span class="ga-numberFlip__supplement">{{ supplement }}</span>
        <span >{{ changeData }}</span>
    </div>
</template>

<script>
    export default {
        name: 'numberFlip',
        data() {
            return {
                supplement: '0',
                oldData: 0,
                changeData: 0,
                returnData: {},
                runNum: {
                    scale: 0
                },
                refreshNum: 0,
                diff: 0,
                numAte: {}
            }
        },
        props: ['randerData'],
        created () {
        },
        watch: {
            'randerData': {
                deep: true,
                handler (newval) {
                    if (newval) {
                        this.supplement = this.completion(newval, 8)
                        this.refreshNum = Number(this.oldData, 10)
                        this.oldData = newval
                        this.numberAnimate()
                    }
                }
            }
        },
        methods: {
            completion(data, length) {
                let scale = length - (data + '').length
                if (scale) {
                    return (Array(length).join('0')).slice(0, scale);
                } else {
                    return ''
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
                this.numAte = TweenMax.to(this.runNum, '2', {
                    scale: 1,
                    ease: window.Expo.easeOut,
                    onUpdate: this.onUpdate
                })
            },
            onUpdate () {
                this.changeData = Math.round(this.refreshNum + this.diff * this.runNum.scale)
            }
        }
    }
</script>

<style>
    @component-namespace ga {
        @b numberFlip {
            @e supplement {
                margin-right: -5px;
            }
            @e value {
                position: relative;
                font-size: 22px;
                font-family: 'lcdd';
                background: url('~@/assets/images/common/num.png') no-repeat center 0;
                -webkit-background-size: 100% 100%;
                -o-background-size: 100% 100%;
                background-size: 100% 100%;
                margin-bottom: 10px;
                margin-top: 5px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                padding: 0 8px 0 9px;
            }
        }
    }
</style>