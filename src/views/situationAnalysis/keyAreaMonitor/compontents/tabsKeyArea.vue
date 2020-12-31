<template>
    <div :style="mainStyle">
        <div class="ga-tabs">
            <frameCom :normal="true">
                <div class="ga-tabs__tabsTitle">
                    <div class='ga-tabs__popHide' @click='closeTabs'> </div>
                    <div>
                        <!-- v-if="!(index === 1 && areaId !== areaCurId)" -->
                        <!-- , {'ga-tabs__active': activeIndex === item.value && areaId === areaCurId} -->
                        <span
                            :class="['ga-tabs__tabs']"
                        >{{lineTitle}}</span>
                    </div>
                </div>
                <div class="ga-tabs__content">
                        <!-- <div class="ga-tabs__Title">{{ lineTitle }}</div> -->
                        <div class='ga-tabs__linesWrap' v-for='(item, index) in TArray' :key='item'>
                            <span class='ga-tabs__lineTitle' v-if="index < 2">{{TArray[index]}}在线用户变化趋势</span>
                            <linesTrend ref="linesTrend" :option="lineOpt" :renderData="lineData[index]" :index="index" v-if="index < 2"></linesTrend>
                        </div>
                </div>
                <!-- <div class="ga-tabs__content" v-show="activeIndex === 1">
                    <leveBar ref="bar" :option="barObj" :renderData="barLeavelData"></leveBar>
                </div> -->
            </frameCom>
        </div>
        <div v-show="frameShow" class="ga-tabs__dialogFrame">
            <frameCom :title="frameTitle"  :normal="true">
                <div class="ga-tabs__close" @click="closeFrame"></div>
                <div class="ga-tabs__Title">{{ subTitle }}</div>
                <div :style="linesHeight">
                    <linesTrend ref="lineSome" :option="lineOpt" :renderData="lineData1"></linesTrend>
                </div>
            </frameCom>
        </div>
    </div>
</template>

<script>
    import frameCom from 'components/monitor/frame'
    import tableCom from 'components/Table'
    import exportFrom from 'components/Form/index'
    import linesTrend from './linesTrend'
    import leveBar from './levelbar.vue'
    import { mapGetters } from 'vuex'
    import { ajax } from 'common'
    export default {
        name: 'tabs',
        props: ['showTitle', 'tabTitle', 'renderData', 'barData', 'areaId', 'lineTitle', 'TArray', 'obj'],
        data () {
            // let me = this;
            return {
                areaCurId: '642530',
                activeIndex: 0,
                tabsNames: [
                    { name: '变化趋势', value: 0 }
                    // { name: 'APP概览', value: 1 }
                ],
                barObj: {
                    width: '99%',
                    height: 300
                },
                mainStyle: {
                    width: '100%',
                    height: 500
                },
                data: this.option,
                lineData: [],
                barLeavelData: [],
                lineOpt: {
                    width: '100%',
                    props: {
                        gridBottom: 30,
                        gridTop: 55,
                        gridLeft: 80,
                        gridRight: 20
                    }
                },
                // 弹出折线图
                frameTitle: '用户变化趋势',
                subTitle: '',
                frameShow: false,
                lineData1: []
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            }),
            additionalHeight() {
                let height = this.showTitle ? 0 : 50
                return height
            },
            linesHeight () {
                return {
                    height: (this.vsHeight - 31 - 47 - this.additionalHeight) / 3 + 'px',
                    overflow: 'hidden'
                }
            }
        },
        watch: {
            'renderData' () {
                this.activeIndex = 0
                this.frameShow = false
                this.getChartsData(this.activeIndex)
            }
        },
        beforeMount () {
            // this.setLinesHeight()
        },
        mounted () {
            if (this.title) {
                $('.ga-tabs__content').css('height', 'calc(100% - 28px)')
            } else {
                $('.ga-tabs__content').css('height', '101%')
            }
            if (this.$refs.bar) this.$refs.bar.resizeComp({ width: '99%', height: this.vsHeight - 50 - 50 })
        },
        methods: {
            closeTabs () {
                this.frameShow = false
                this.$emit('closeTabs', false)
            },
            tabsChange(value) {
                this.activeIndex = value
                this.getChartsData(value)
            },
            getChartsData(value) {
                let barHeight = this.vsHeight - 50 - this.additionalHeight
                let lineHeight = (this.vsHeight - 31 - 47 - this.additionalHeight - 44) / 2
                // let lineHeight = (this.vsHeight - 31 - 47 - this.additionalHeight - 44) / 3
                if (value === 0) {
                    this.$refs.linesTrend.forEach(item => {
                        item.resizeComp({ width: '100%', height: lineHeight })
                    })
                    this.lineData = this.renderData
                } else {
                    this.$refs.bar.resizeComp({ width: '99%', height: barHeight })
                    this.barLeavelData = this.barData
                }
            },
            // 设置折线图的高度
            // setLinesHeight () {
            //     this.lineOpt.height = (this.vsHeight - 31 - 47 - 40) / 3 - 18
            // },
            getDiaLine(time) {
                let obj = this.obj
                obj.timestamp = time
                ajax.post('keyArea/getDataOneDay', obj).then(resp => {
                    if (resp && resp.data) {
                        this.frameShow = true;
                        this.$refs.lineSome.resizeComp({ width: '100%', height: '100%' })
                        this.lineData1 = resp.data.oneDay
                        this.subTitle = time + '用户变化趋势'
                    }
                })
            },
            closeFrame () {
                this.frameShow = false
                this.lineData1 = []
            }
        },
        components: {
            linesTrend,
            leveBar,
            tableCom,
            exportFrom,
            frameCom
        }
    }
</script>

<style scoped>
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
    @component-namespace ga {
      @b tabs {
        position: relative;
        color: #ffffff;
        font-size: 12px;
        width: 100%;
        height: 100%;
        @e content {
            overflow: auto;
            overflow-x: hidden;
            width: 100%;
            background: rgba(16,42,74,0.90);
            padding-left: 5px;
        }
        @e tabsTitle {
          position: relative;
          white-space: nowrap;
          font-size: 13px;
          color: #fff;
          height: 28px;
          padding-left: 12px;
          background: #11365D;
        }
        @e tabs {
          display: inline-block;
          width: 100px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          cursor: pointer;
        }
        @e active{
            border-bottom:2px solid #4aa6dc;
        }
        @e Title {
          margin: 10px 0;
        }
        @e popHide {
          width: 10px;
          height: 10px;
          cursor: pointer;
          position: absolute;
          top: 10px;
          right: 20px;
          background: url("~assets/images/common/close.png") no-repeat 0 center;
        }
        @e linesWrap{
            overflow: hidden;
            position: relative;
        }
        @e lineTitle {
          font-size: 12px;
          line-height: 16px;
          margin-left: 10px;
          &:before {
            content: "";
            width: 5px;
            height: 16px;
            background: #4aa6dc;
            position: absolute;
            margin-left: -10px;
          }
        }
        @e dialogFrame{
            width:100%;
            position: absolute;
            right:40%;
            top:30%;
        }
        @e close {
            position: absolute;
            top: 0;
            right: 20px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            &::before {
                content: "\2716"
            }
        }
        @e loading {
            position: absolute;
            top: 50%;
            left: calc(50% - 20px);
        }
        @e empty {
            color: #9af5f6;
            opacity: 0.6;
            font-size: 14px;
        }
      }
    }
</style>
