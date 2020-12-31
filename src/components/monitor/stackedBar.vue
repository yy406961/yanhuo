<template lang="html">
    <div class="ga-stackedBar">
        <div class="ga-stackedBar__shade" v-if="!option.click && option.type === 'area'"></div>
        <ul>
            <li v-for="(item, index) in realData" @click="barClick(item, index)" class="ga-stackedBar__header">
                <span class="ga-stackedBar__area">
                    <el-tooltip class="item" effect="dark" :content="item.area" placement="top">
                        <span>{{ item.area }}</span>
                    </el-tooltip>
                </span>
                <span :class="barClass"
                      :w="item.count">
                      <template v-if="item.cshow">
                        <el-tooltip v-if="item.sjshow" class="item" effect="dark" :content="'涉疆：' + item.sjcount.toString()" placement="top">
                            <span :w="item.sjcount" :style="{'background': activeIndex === index ? '#14ce9a' : ''}">{{ item.sjcount }}</span>
                        </el-tooltip>
                        <el-tooltip v-else class="item" effect="dark" :content="'涉疆：' + item.sjcount.toString()" placement="top">
                            <span :w="item.sjcount" :style="{'background': activeIndex === index ? '#14ce9a' : ''}"></span>
                        </el-tooltip>
                        <el-tooltip v-if="item.szshow" class="item" effect="dark" :content="'涉藏：' + item.szcount.toString()" placement="top">
                            <span :w="item.szcount" :style="{'background': activeIndex === index ? '#3cf887' : ''}">{{ item.szcount }}</span>
                        </el-tooltip>
                        <el-tooltip v-else class="item" effect="dark" :content="'涉藏：' + item.szcount.toString()" placement="top">
                            <span :w="item.szcount" :style="{'background': activeIndex === index ? '#3cf887' : ''}"></span>
                        </el-tooltip>
                      </template>
                      <template v-else>
                        <el-tooltip class="item" effect="dark" :content="'涉疆：' + item.sjcount.toString()" placement="top">
                            <span :w="item.sjcount" :style="{'background': activeIndex === index ? '#14ce9a' : ''}"></span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" :content="'涉藏：' + item.szcount.toString()" placement="top">
                            <span :w="item.szcount" :style="{'background': activeIndex === index ? '#3cf887' : ''}"></span>
                        </el-tooltip>
                      </template>
                </span>
                <span style="padding-top: 3px;">{{ item.count }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'stackedBar',
        props: ['option'],
        data () {
            return {
                activeIndex: -1
            }
        },
        watch: {
            'option.data' (newVal) {
                if (newVal) {
                    this.activeIndex = -1
                }
            },
            'option.click' (newVal) {
                if (!newVal) {
                    this.activeIndex = -1
                }
            }
        },
        updated () {
            this.$nextTick(function () {
                // debugger
                this.showBarWidth()
            })
        },
        computed: {
            barClass () {
                return `ga-${this.option.type}-stackedBar ga-stackedBar__bar`
            },
            baseWidth () {
                if (this.option.data.length !== 0) {
                    return this.option.data[0].count
                }
            },
            realData () {
                this.option.data.forEach(item => {
                    item.cshow = true;
                    item.sjshow = true;
                    item.szshow = true;
                    if (item.count / this.baseWidth < 0.5) {
                        item.cshow = false
                    }
                    if (item.cshow) {
                        if (item.sjcount / item.count <= 0.4) {
                            item.sjshow = false
                        }
                        if (item.szcount / item.count <= 0.4) {
                            item.szshow = false
                        }
                    } else {
                        item.sjshow = false
                        item.szshow = false
                    }
                });
                return this.option.data
            }
        },
        methods: {
            showBarWidth () {
                let span = $(`.ga-${this.option.type}-stackedBar`);
                let baseWidth = this.baseWidth;
                span.each(function () {
                    let width = $(this).attr('w');
                    let per = width / baseWidth;
                    // 115px为柱图左边名字的宽度75px加上柱图右边数字最长宽度40px
                    $(this).width(`calc((100% - 120px) * ${per})`)
                    let a = $(this).find('span').eq(0);
                    let b = $(this).find('span').eq(1);
                    let aw = $(this).find('span').eq(0).attr('w') / width * 100 + '%';
                    let bw = $(this).find('span').eq(1).attr('w') / width * 100 + '%';
                    a.width(aw)
                    b.width(bw)
                })
            },
//            getBarWidth (count) {
//                let per = count / this.baseWidth;
//                return `width: calc((100% - 115px) * ${per})`
//            },
            barClick (item, index) {
                this.activeIndex = index
                if (this.option.barClick && _.isFunction(this.option.barClick)) {
                    this.option.barClick(item, index);
                }
            }
        }
    }
</script>

<style scoped>
    @component-namespace ga {
        @b stackedBar {
            color: #fff;
            font-size: 12px;
            cursor: pointer;
            margin: 5px 0;
            @e shade {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: transparent;
                cursor: default;
            }
            @e header {
                display: flex;
                height: 30px;
            }
            @e area {
                text-overflow: ellipsis;
                width: 60px;
                padding-left: 5px;
                padding-top: 3px;
                overflow: hidden;
                white-space: nowrap;
                border-right: 1px solid #7D818D;
            }
            @e bar {
                margin-top: 4px;
                margin-right: 10px;
                /*margin-left: 5px;*/
                min-width: 10px;
                width: 10px;
                height: 14px;
                /*background: #0077BE;*/
                /* background: repeating-linear-gradient(90deg, #34befc, #34befc 5px, transparent 0, transparent 6px); */
                transition: width 1s;
                -moz-transition: width 1s; /* Firefox 4 */
                -webkit-transition: width 1s; /* Safari and Chrome */
                -o-transition: width 1s; /* Opera */
                display: flex;
                span {
                    /* display: inline-block; */
                    text-align: center;
                    font-size: 12px;
                    line-height: 14px;
                }
                span:first-child {
                    background: #2089d4;
                }
                span:last-child {
                    background: #34befc;
                }
            }
        }
    }
</style>
