<template>
    <div class="ga-dataPart">
        <div class="ga-dataPart__numWrap">
            <p class="ga-dataPart__numTitle" :style="flipTitleStyle">
                {{numFlipTitle[flipType].name}}
            </p>
            <div @click="numClick(numFlipTitle[flipType])" :style="flipStyle">
                <numberFlip v-if="flipType === 0"
                    :options="numberOpt" :renderData="flipData"></numberFlip>
                <NewFlip v-else :option="newFlipOpt"
                    :randerData="flipValueData" class="ga-dataPart__LJNumClass"></NewFlip>
            </div>
        </div>
        <div class="ga-dataPart__userConstitute">
            <p class="ga-dataPart__numTitle" :style="flipTitleStyle">{{userTitle[flipType]}}</p>
            <div class="ga-dataPart__userTabWrap">
                <div :class="['ga-dataPart__userTab',
                    {'ga-dataPart__userTabColor': [1, 11, 14].includes(item.value)},
                    {'ga-dataPart__userTabWidth': [11, 12, 14].includes(item.value)},
                    {'ga-dataPart__userPointTab': isUserClick(item.value)}]"
                    @click="tabClick(item)"
                    v-for="(item, id) in tabsName" :key="id">
                    <p :style="tabTitleStyle">{{ item.name }}</p>
                    <p :style="tabNumStyle">
                        {{ tabsData[id] }}
                        <sub v-if="[1, 3].includes(item.value)">
                            / {{tabsData[id + 3 + item.value % 3]}}
                        </sub>
                        <sub v-if="item.value === 13">
                            / 158
                        </sub>
                    </p>
                    <!-- <p :style="tabNumStyle" v-else>
                        {{ tabsData[id] }}
                    </p> -->
                </div>
                <p class="ga-dataPart__lineClassB"></p>
                <p class="ga-dataPart__lineClassE"></p>
            </div>
        </div>
        <!-- 累计弹框 -->
        <!-- <LJDialog ref="LJDialog" :taskTime="taskTime"></LJDialog> -->
    </div>
</template>
<script>
import NewFlip from 'components/common/numberFlipNew'
import numberFlip from 'components/monitor/numberFlip'
import LJDialog from './LJDialog'
import { getIntervalDate } from 'utils'
export default {
    props: ['flipFontObj', 'flipType', 'flipValueData', 'tabPropsData', 'taskTime', 'barNum'],
    data() {
        // let me = this
        return {
            colorArr: [
                [0, 1],
                [2, 3, 4],
                [5, 6]
            ],
            numFlipTitle: [
                { name: '五分钟在线用户数', value: 0 },
                { name: '近一小时累计用户数', value: 10 }
            ],
            numberOpt: { height: 0 },
            flipData: [{ value: 0 }],
            // 人员构成
            userTitle: [
                '五分钟在线用户构成（按手机归属地统计）',
                '近一小时累计用户构成（按手机归属地统计）'
            ],
            newFlipOpt: {
                isThousand: false
            },
            tabsData: [0, 0, 0, 0, 0, 0, 0],
            barTotal: 2000
        }
    },
    computed: {
        tabsName() {
            let result = [
                { name: '省内', value: 14, text: '省内在线用户排行' },
                { name: '省外', value: 11, text: '省外在线用户排行' },
                { name: '境外', value: 12, text: '境外在线用户排行' },
                { name: '区域常住用户', value: 1, text: '' },
                { name: '区域流动用户', value: 2, text: '' },
                { name: '疆藏用户', value: 3, text: '' }
                // { name: '重点人', value: 13, text: '在线重点人列表' }
            ]
            return result
        },
        barStyle() {
            return {
                width: (this.barNum[0] / this.barNum[1]) * 100 + '%'
            }
        },
        flipStyle() {
            if (this.flipType === 0) {
                return {
                    cursor: 'pointer'
                }
            }
        },
        flipTitleStyle() {
            // if (!this.flipFontObj) {
            //     return
            // }
            // let { flipTitleColr } = this.flipFontObj
            // return {
            //     color: flipTitleColr
            // }
        },
        tabTitleStyle() {
            if (!this.flipFontObj) {
                return
            }
            // let { tabColor } = this.flipFontObj
            return {
                // color: tabColor
            }
        },
        tabNumStyle() {
            if (!this.flipFontObj) {
                return
            }
            // let { tabFamily } = this.flipFontObj
            return {
                // fontFamily: tabFamily,
                // fontSize: '20px',
                // color: '#fff'
            }
        }
    },
    mounted() {
        this.flipData = [{ value: this.flipValueData }]
    },
    methods: {
        numClick(data) {
            if (this.flipType === 0) this.$emit('numClick', data, this.flipType)
        },
        LJDialogShow() {
            let LJDisabled = moment(getIntervalDate()).diff(moment(this.taskTime.end), 'days') > 10
            if (!LJDisabled) this.$refs.LJDialog.showDialog()
        },
        tabClick(data) {
            let bool = [14, 11, 12, 13].includes(data.value)
            if (this.flipType === 0 && bool) this.$emit('tabClick', data, this.flipType)
        },
        isUserClick(value) {
            let bool = [14, 11, 12, 13].includes(value) && this.flipType === 0
            return bool
        }
    },
    watch: {
        flipValueData(newValue) {
            this.flipData = [{ value: newValue }]
        },
        tabPropsData(newValue) {
            this.tabsData = newValue
        }
    },
    components: {
        numberFlip,
        NewFlip,
        LJDialog
    }
}
</script>
<style scoped>
@component-namespace ga {
      @b dataPart {
          font-size:14px;
          @e numWrap{
              border: 1px solid;
                border-top:none;
                padding-bottom: 6px;
                border-image: linear-gradient(90deg, rgba(0,197,255,0.10), rgba(0,197,255,0.49), rgba(0,197,255,0.10)) 1 0;
          }
          @e numTitle{
                height: 28px;
                line-height: 28px;
          }
          @e userConstitute{
              margin: 6px 0;
          }
          @e userTabWrap{
              position: relative;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                div:nth-child(-n+3){
                    p:last-child{
                        color:rgb(0, 255, 191);
                        /* color:rgb(255, 157, 107); */
                    }
                }
                div:nth-child(n+6){
                    p:last-child{
                        color: #FFEC00;
                        /* color:rgb(229, 193, 0); */
                    }
                }
          }
          @e userTab{
                text-align: center;
                width:49%;
                margin: 4px 0;
                height: 60px;
                p:first-child{
                    display: inline-block;
                    padding: 0 6px;
                    margin-bottom:6px;
                    font-size: 13px;
                }
                p:last-child{
                    font-size: 16px;
                    color:#00FEFF;
                    /* font-family: 'lcdd'; */
                    font-weight: bold;
                    sub{
                        position: absolute;
                        padding: 9px 4px;
                        opacity: 0.5;
                    }
                }
          }
          @e userTabWidth{
                width: 33%;
          }
          @e userTabColor{
              border: 1px solid;
            border-left: 0;
            border-image: linear-gradient(rgba(0,197,255,0.10), rgba(0,197,255,0.49), rgba(0,197,255,0.10)) 0 1;
          }
          @e userPointTab{
              cursor: pointer;
              p:first-child{
                border-bottom: 1px solid #eee;
              }
          }
          @e pointer{
              cursor: pointer;
          }
          @e lineClassB{
              position: absolute;
              top: 60px;
                height: 1px;
                margin-top: 4px;
                width:100%;
              background-image: linear-gradient(-270deg, rgba(0,197,255,0.10) 0%, rgba(0,197,255,0.49) 49%, rgba(0,197,255,0.10) 100%);
          }
          @e lineClassE{
              position: absolute;
              top: 132px;
                height: 1px;
                margin-top: 4px;
                width:100%;
              background-image: linear-gradient(-270deg, rgba(0,197,255,0.10) 0%, rgba(0,197,255,0.49) 49%, rgba(0,197,255,0.10) 100%);
          }
          @e LJDialogEntrance{
                height: 20px;
                line-height: 20px;
                color: #eee;
                font-size: 12px;
                font-weight: normal;
                padding: 0 4px;
                border-radius: 4px;
                float:right;
                /* position: absolute;
                right: 4px;
                top: 11px; */
                cursor: pointer;
                background: rgba(29,79,149,1);
          }
          @e LJNumClass{
              font-size: 30px;
                color: #00FEFF;
                font-family: 'lcdd';
                text-align: center;
          }
      }
}
</style>