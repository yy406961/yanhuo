<template>
    <div class= "ga-warningPullPanel__container" :style = "boxstyle[0]">
        <div class="ga-warningPullPanel__Title">
            <span class="overDot">{{opt.title1}}</span>
            <div :class="['ga-warningPullPanel__Arrow',{ 'ga-warningPullPanel__Arrow--open':opt.isOpen}]" @click="toggleOpen">
                <i class="el-icon-arrow-down"></i>
            </div>
        </div>
        <div class="ga-warningPullPanel__information">
            <div class="ga-warningPullPanel__headText">{{opt.name}}<br>{{opt.phoneNumber}}</div>
            <div class="ga-warningPullPanel__detailText" :style = "boxstyle[1]">
                <p v-text="opt.content" class="ga-warningPullPanel__event">
                </p>
            </div>
            <LinesTrend :option="lineOpt" :renderData="lineData" v-if="lines"
            style="margin: 0 0 20px 0"></LinesTrend>
        </div>
    </div>
</template>
<script>
import tableCom from 'components/Table'
import LinesTrend from 'components/monitor/lines'
import { mapGetters } from 'vuex'
import { phoneNumChange } from 'utils/index.js'
// import axios from 'axios'
export default {
    name: 'pullText',
    props: ['opt'],
    data () {
        return {
            lines: false,
            H1: 26,
            detailTitle: '',
            lineOpt: {
                width: '400',
                height: '230',
                props: {
                    xName: '时间',
                    yName: '人员个数'
                }
            },
            lineData: []
        }
    },
    mounted () {
        // 号码加密
        if (this.isPhoneJM && this.opt.phoneNumber) {
            this.opt.phoneNumber = phoneNumChange(this.opt.phoneNumber)
        }
        if (this.opt.warnmoDelId === 9) {
            $('.ga-warningPullPanel__headText').eq(0).css('display', 'none');
            this.lines = true;
            this.loadLineJson()
        } else {
            this.lines = false;
            // this.detailTitle = '详情面板'
        }
        if (this.opt.warnmoDelId === 4 || this.opt.warnmoDelId === 11) {
            this.$nextTick(() => {
                $('.overDot').css({
                    width: '70%'
                })
            })
        }
    },
    watch: {
        'opt.phoneNumber' (val) {
            if (this.isPhoneJM && val) {
                this.opt.phoneNumber = phoneNumChange(val)
            }
        }
        // 'opt.isOpen' (val) {
        //     if (val) {
        //         if (this.opt.warnmoDelId === 9) {
        //             console.log(this.opt.title1, this.opt.titleDetail)
        //             this.detailTitle = this.opt.titleDetail
        //         } else {
        //             this.detailTitle = this.opt.title1
        //         }
        //     } else {
        //         if (this.opt.warnmoDelId === 9) {
        //             this.detailTitle = this.opt.title1
        //         } else {
        //             this.detailTitle = '详情面板'
        //         }
        //     }
        // }
        // 'opt.lineDataArr' (val) {
        //     if (val) {
        //         if (this.opt.warnmoDelId === 9) {
        //             $('.ga-warningPullPanel__headText').eq(0).css('display', 'none');
        //             this.lines = true;
        //             this.loadLineJson()
        //         } else {
        //             this.lines = false;
        //             // this.detailTitle = '详情面板'
        //         }
        //     }
        // }
    },
    components: {
        tableCom,
        LinesTrend
    },
    computed: {
        ...mapGetters({
            'isPhoneJM': 'global/isPhoneJM'
        }),
        boxstyle () {
            if (this.opt.isOpen) {
                if (this.opt.warnmoDelId === 9) {
                    this.H1 = 350
                    return [{ height: `${this.H1}px` }, { height: `${this.H1 - 276}px` }]
                } else {
                    this.H1 = 180
                    return [{ height: `${this.H1}px` }, { height: `${this.H1 - 100}px` }]
                }
            } else {
                if (this.opt.warnmoDelId === 9) {
                    this.H1 = 350
                    return [{ height: `35px` }, { height: `${this.H1 - 276}px` }]
                } else {
                    this.H1 = 200
                    return [{ height: `35px` }, { height: `${this.H1 - 100}px` }]
                }
            }
        }
    },
    methods: {
        toggleOpen () {
            this.opt.isOpen = !this.opt.isOpen
        },
        loadLineJson () {
            // axios.get('./static/mock/aaa.json').then((resp) => {
                // this.lineData = resp.data;
            // })
            this.lineData = this.opt.lineDataArr
        }
    }
}
</script>
<style scoped>
.overDot{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 90%;
    display: inline-block;
}
@component-namespace ga {
     @b warningPullPanel{
        @e container{
            width: 100%;
            height: 35px;
            overflow: hidden;
            box-shadow:-4px 4px 9px rgba(0,0,0,0.5);
            /*border-radius: 0 0 0 18px;*/
            border-radius: 0 0 5px 5px;
            transition: height .5s;
            -moz-transition: height 0.5s;
            -webkit-transition: height 0.5s;	
            -o-transition: height 0.5s;
            @m open{
                /*height: 220px;*/
            }
        }
        @e Title{
            color:#fff;
            width: 100%;
            height: 35px;
            line-height: 35px;
            font-size: 14px;
            padding-left: 10px;
            background: rgba(11, 63, 120, 0.9);
            /*background-image: url("~assets/images/warning/titleSqu.png");*/
            background-repeat:repeat-x;
            background-position:0 0;
            border-radius: 5px 5px 0 0;
        }
        @e information {
            color: #fff;
            padding: 10px 0;
            box-sizing:border-box;
            background: rgba(0,0,0,0.8);
        }
        @e headText {
            height: 40px;
            background: url("~assets/images/warning/head.png") no-repeat 15px;
            background-size: 35px 35px;
            padding-left: 65px;
            white-space: nowrap;
            text-overflow: ellipsis;
            line-height: 23px;
        }
        @e detailText {
            overflow-y: scroll;
            margin-top:18px;
            text-indent:2em;
            padding: 10px 15px 0 15px;
            border-top: 1px solid #999;
        }
        @e event {
            display: inline;
            line-height:24px;
            font-size:14px;
        }
        @e Arrow{
            /*background: url("~assets/images/warning/arrow.png") no-repeat center;
            background-size: 100% 100%;
            background-origin: content-box;*/
            height: 25px;
            width: 25px;
            margin-left: 6px;
            margin-top: 5px;
            float: left;
            cursor: pointer;
            line-height: 25px;
            text-align: center;
            font-size: 16px;
            /*transition: transform 0.5s;*/
            @m open{
                transform:rotate(180deg);
                -moz-transform:rotate(180deg); 
                -webkit-transform:rotate(180deg);
                -o-transform:rotate(180deg);
            }
        } 
    } 
}
</style>

