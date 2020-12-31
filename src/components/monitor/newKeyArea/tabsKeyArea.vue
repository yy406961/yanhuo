<template>
    <div :style="mainStyle">
        <div class="ga-tabs">
            <div class="ga-tabs__tabsTitle">
                <div class='ga-tabs__popHide' @click='closeTabs'> </div>
                <div>
                    <span v-if="TArray.length === 3" :class="['ga-tabs__tabs']">实时在线用户变化趋势</span>
                    <span v-else :class="['ga-tabs__tabs']">累计在线用户变化趋势</span>
                </div>
                <!--<div v-show="isAllTab">-->
                    <!--<span :class="['ga-tabs__tabs']">变化趋势</span>-->
                <!--</div>-->
                <!--<div v-show="!isAllTab">-->
                    <!--<span :class="['ga-tabs__tabs', lineShow ? 'bottomLine' : '']" @click="rightTabsLine()">变化趋势</span>-->
                    <!--<span :class="['ga-tabs__tabs', !lineShow ? 'bottomLine' : '']" @click="rightTabsTable()">人员列表</span>-->
                <!--</div>-->
            </div>
            <div class="ga-tabs__content" ref="content">
                <div v-show="lineShow">
                    <div class="ga-tabs__Title">{{ lineTitle }}</div>
                    <el-row :span='8' class='ga-tabs__linesWrap' ref="linesWrap" v-for='(item, index) in TArray' :key='item + index'>
                        <span class='ga-tabs__lineTitle'>{{TArray[index]}}在线用户变化情况</span>
                        <div v-loading="!lineData[index]" class="ga-tabs__loading">
                            <div class="ga-tabs__empty" v-show="lineData[index] && !lineData[index].length">暂无数据</div>
                        </div>
                        <div :style="linesHeight">
                            <linesTrend @showDialog="showDialog" ref="linesTrend" v-show="lineData[index]" :option="lineOpt" :renderData="lineData[index]" :flag="index" :last="TArray.length - 1"></linesTrend>
                        </div>
                    </el-row>
                </div>
                <div v-show="!lineShow">
                    <div class="ga-tabs__Title">
                        <div class="ga-tabs__Title">{{ tableTitle }}</div>
                        <exportFrom :option="btnFromOpt" ref="from" ></exportFrom>
                    </div>
                    <div v-if="isShowExport">
                        <el-row class="ga-tabs__expContent">
                            <span>导出内容：</span>
                            <div>
                                <el-checkbox-group v-model="exFromSlects">
                                    <el-checkbox v-for="(item, index) in exFromData" :label="index" :key="index">{{item}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-row>
                        <!--<exportFrom :option="exFromOpt" ref="exFrom" ></exportFrom>-->
                        <el-row type="flex" justify="center">
                            <el-button type="text" class="ga-tabs__sureBtn"
                                       @click="exportData"
                                       :class="{'active': btnSts === 'export'}">导出</el-button>
                            <el-button type="text" class="ga-tabs__clearBtn"
                                       @click="cancleExport"
                                       :class="{'active': btnSts === 'cancle'}">取消</el-button>
                        </el-row>
                    </div>
                    <div v-show="!isShowExport">
                        <tableCom :option="tableOpt" :comSize="comSize" @handleCurrentPageChange="handleCurrentPageChange" @handleSizePageChange="handleSizePageChange"></tableCom>
                    </div>
                </div>
            </div>
            <span class="ga-tabs__leftTop"></span>
            <span class="ga-tabs__rightTop"></span>
            <span class="ga-tabs__leftBottom"></span>
            <span class="ga-tabs__rightBottom"></span>
            <span class="ga-tabs__left"></span>
            <span class="ga-tabs__right"></span>
            <span class="ga-tabs__top"></span>
            <span class="ga-tabs__bottom"></span>
        </div>
        <div v-show="frameShow" class="ga-frame" :style="autoTop">
            <frameCom :title="frameTitle">
                <div class="ga-frame__close" @click="closeFrame"></div>
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
    import linesTrend from 'components/monitor/newKeyArea/linesTrend'
    import tableCom from 'components/Table'
    import exportFrom from 'components/Form/index'
    import { mapGetters } from 'vuex'
    //    import { forbiddenDate } from 'utils'
    const exportUrl = process.env.NODE_ENV === 'production'
        ? '/policeBusiness' : 'http://192.168.3.183:8080/policeBusiness'
    export default {
        name: 'tabs',
        components: {
            linesTrend,
            tableCom,
            exportFrom,
            frameCom
        },
        props: {
            fn: Function,
            tableData: Array,
            renderData: Array,
            lineTitle: String,
            tableTitle: String,
            area: String,
            tabChange: Boolean,
            isAllTab: Boolean,
            TArray: {
                default: function () {
                    return ['近1小时', '近24小时', '近7天']
                }
            }
        },
        data () {
            let me = this;
            return {
                frameTitle: '近7天按天展示用户变化趋势',
                subTitle: '',
                frameShow: false,
                mainStyle: {
                    width: '100%',
                    height: '100%'
                },
                tableOpt: {
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '手机号', value: 'msisdn', width: 120, align: 'center' },
                        { name: '所属地', value: 'name', width: 100, align: 'center' },
                        { name: '迁入时间', value: 'arrivetime', width: 150, align: 'center' },
                        { name: '停留时间', value: 'staytime', align: 'center' }
                    ],
                    pagination: true,
                    pageOpt: {
                        // total: 100,
                        currentPage: 1,
                        pageSizes: [10, 20, 30],
                        pageSize: 10
                    },
                    data: []
                },
                comSize: {
                    height: 380
                },
                //  人员列表title
                peopleTableTitle: '',
                //  导出地址变量
                exportDataUrl: '',
                //                导出选项
                exFromSlects: [],
                //                导出项
                exFromData: ['省内', '省外', '境外', '重点人', '涉疆', '涉藏'],
                btnSts: '',
                //  导出项是否显示
                isShowExport: false,
                btnFromOpt: {
                    inline: true,
                    labelWidth: '150',
                    items: [{
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '用户列表',
                            disabled: false,
                            click: function () {
                                me.isShowExport = false;
                            }
                        }
                    }, {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '人员导出',
                            disabled: false,
                            click: function () {
                                me.isShowExport = true;
                            }
                        }
                    }]
                },
                // TArray: ['近1小时', '近24小时', '近7天'],
                lineShow: true,
                data: this.option,
                lineData: [],
                lineOpt: {
                    width: '100%',
                    props: {
                        gridBottom: 30,
                        gridTop: 15,
                        gridLeft: 80,
                        gridRight: 20
                    }
                },
                lineData1: [],
                autoTopVal: 0
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            }),
            linesHeight () {
                return {
                    height: (this.vsHeight - 31 - 47) / 3 - 30 + 'px'
                }
            },
            autoTop () {
                return {
                    top: this.autoTopVal + 'px'
                }
            }
        },
        watch: {
            'tabChange' () {
                this.isShowExport = false;
                this.lineShow = true;
            },
            'tableData' (val) {
                this.tableOpt.data = val
                //                if (val === '') {
                //                    $('.ga-tabs__content').css('height', '101%')
                //                } else {
                //                    $('.ga-tabs__content').css('height', 'calc(100% - 28px)')
                //                }
                //                console.log('表格数据变化')
            },
            'renderData' () {
                this.frameShow = false
                this.$refs.linesTrend.forEach(item => {
                    item.resizeComp({ width: '100%', height: '100%' })
                })
                this.lineData = this.renderData
            }
        },
        beforeMount () {
            this.setLinesHeight()
        },
        mounted () {
            // if (this.title) {
                // $('.ga-tabs__content').css('height', 'calc(100% - 28px)')
            // } else {
                // $('.ga-tabs__content').css('height', '101%')
            // }
        },
        methods: {
            rightTabsLine () {
                this.lineShow = true
                this.$emit('lineClick')
            },
            rightTabsTable () {
                this.lineShow = false
                this.isShowExport = false
                this.$emit('tableClick')
            },
            closeTabs () {
                this.$emit('closeTabs', false)
                this.frameShow = false
            },
            peopleExport () {
                this.$emit('peopleExport')
            },
            handleCurrentPageChange (val) {
                this.$emit('handleCurrentPageChange', val)
            },
            handleSizePageChange (val) {
                this.$emit('handleSizePageChange', val)
            },
            //  ‘人员导出’按钮点击事件
            showExport () {
                this.isShowExport = !this.isShowExport;
                this.$emit('peopleExport');
            },
            // 设置折线图的高度
            setLinesHeight () {
                this.lineOpt.height = (this.vsHeight - 31 - 47) / 3 - 20
            },
            exportData () {
                //  获取导出表单的表单项
                this.btnSts = 'export';
                let type = '';
                if (this.exFromSlects.length) {
                    type = this.exFromSlects.join(',')
                }
                //                let exportDataOne = `${exportUrl}/zdqy/daochu/${type}/111/222`;
                let exportDataOne = `${exportUrl}/zdqy/daochu/${type}/${this.taskId}/${this.areaId}`;
                location.href = exportDataOne
                this.exFromSlects = []
            },
            cancleExport () {
                this.isShowExport = false;
                this.btnSts = 'cancle';
                this.exFromSlects = []
            },
            showDialog (val, time) {
                console.log(val)
                this.fn().then(resp => {
                    if (resp && resp.data) {
                        this.frameShow = true;
                        this.autoTopVal = this.$refs.linesWrap[this.$refs.linesWrap.length - 1].$el.offsetTop - 45
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
        }
    }
</script>

<style scoped>
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
    .bottomLine::after {
      content: "";
      width: 100px;
      height: 2px;
      display: block;
      background: #4aa6dc;
      position: absolute;
      top: 28px;
    }
    .ga-tabs__sureBtn.active:before {
      background: #1a498a;
    }
    .ga-tabs__sureBtn.active:after {
      background: #1a498a;
    }
    .ga-tabs__clearBtn.active:before {
      background: #1a498a;
    }
    .ga-tabs__clearBtn.active:after {
      background: #1a498a;
    }
    @component-namespace ga {
      @b tabs {
        position: relative;
        color: #ffffff;
        font-size: 12px;
        width: 100%;
        height: 100%;
        border: 1px solid transparent;
        /* padding: 0 6px 10px 6px; */
        @e content {
          overflow: hidden;
          width: 100%;
          /* background: linear-gradient(
            -45deg,
            transparent 9px,
            rgba(0, 0, 0, 0.7) 0
          ); */
          background: rgba(0, 0, 0, 0.7);
        }
        @e tabsTitle {
          position: relative;
          /*overflow: hidden;*/
          white-space: nowrap;
          font-size: 13px;
          color: #A2EEFF;
          height: 28px;
          background: #11365D;
          box-shadow: inset 0 -1px 0 0 rgba(255,255,255,0.10);
        }
        @e Title {
          margin: 10px;
          /* width: 50%; */
        }
        @e expContent {
          padding: 20px 10px;
          /*color: #00ffff;*/
          span {
            font-size: 16px;
            color: #9af5f6;
          }
          div {
            margin: 30px 0;
          }
        }
        @e button {
          /*display: block;*/
          /*position: absolute;*/
          /*top: 38px;*/
          /*margin-left: 10px;*/
          padding-left: 10px;
          /*color: #fff;*/
          font-size: 1px;
        }
        @e popHide {
          /*float: right;*/
          width: 10px;
          height: 10px;
          cursor: pointer;
          position: absolute;
          top: 10px;
          right: 20px;
          background: url("~assets/images/common/close.png") no-repeat 0 center;
        }
        @e tabs {
          display: inline-block;
          padding-left: 15px;
          font-size: 16px;
          height: 28px;
          line-height: 28px;
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
       @e leftTop {
            width: 89px;
            height: 41px;
            background: url("~@/assets/images/login/topLeft.png") no-repeat;
            position: absolute;
            top: -2px;
            left: -2px;
        }
        @e rightTop {
            width: 33px;
            height: 41px;
            background: url("~@/assets/images/login/topRight.png") no-repeat;
            position: absolute;
            top: -2px;
            right: -2px;
            z-index: -1;
        }
        @e leftBottom {
            width: 33px;
            height: 48px;
            background: url("~@/assets/images/login/bottomLeft.png") no-repeat;
            background-size: contain;
            position: absolute;
            left: -2px;
            bottom: -2px;
        }
        @e rightBottom {
            width: 89px;
            height: 48px;
            background: url("~@/assets/images/login/bottomRight.png") no-repeat right;
            background-size: contain;
            position: absolute;
            right: -2px;
            bottom: -2px;
        }
        @e left {
          position: absolute;
          left: -1px;
          bottom: 20px;
          width: 1px;
          height: calc(100% - 40px);
          background: #4f8ee5;
        }
        @e right {
          position: absolute;
          right: -1px;
          bottom: 20px;
          width: 1px;
          height: calc(100% - 40px);
          background: #4f8ee5;
        }
        @e top {
          position: absolute;
          left: 20px;
          top: -1px;
          width: calc(100% - 40px);
          height: 1px;
          background: #4f8ee5;
        }
        @e bottom {
          position: absolute;
          left: 20px;
          bottom: -1px;
          width: calc(100% - 40px);
          height: 1px;
          background: #4f8ee5;
        }
        @e sureBtn {
          font-size: 12px;
          position: relative;
          margin-right: 25px;
          margin-bottom: 10px;
          z-index: 1;
          &:before {
            content: "";
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
            content: "";
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
        @e clearBtn {
          font-size: 12px;
          position: relative;
          margin-bottom: 10px;
          z-index: 1;
          &:before {
            content: "";
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
            content: "";
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
      }
      @b frame {
        position: absolute;
        left: -100%;
        width: 100%;
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
      }
    }
</style>
