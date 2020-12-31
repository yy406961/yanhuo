<template lang="html">
    <div class="ga-curveBars">
        <ul>
            <li v-for="(item, index) in option.data" @click="barClick(item, index)" class="ga-curveBars__header">
                <span class="ga-curveBars__area">
                    <el-tooltip class="item" effect="dark" :content="item.area" placement="top">
                        <span :style="{'color': activeIndex === index ? '#00FFBF' : ''}">{{ item.area }}</span>
                    </el-tooltip>
                </span>
                <!--<span class="ga-curveBars__bar" :style="getBarWidth(item.count)"></span>-->
                <!--<span class="ga-curveBars__bar"-->
                      <!--:w="item.count"-->
                      <!--:style="{'background': activeIndex === index ? '#00FFBF' : ''}"></span>-->
                <div class="ga-curveBars__barContent"
                     :style="{'background': activeIndex === index ? 'rgba(0,255,191,0.20)' : ''}">
                       <span class="ga-curveBars__bar"
                             :w="item.count"
                             :style="{'background': activeIndex === index ? '#00FFBF' : ''}"></span>
                </div>
                <span :style="{'color': activeIndex === index ? '#00FFBF' : ''}">{{ item.count }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'areaBars',
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
            }
        },
        updated () {
            this.$nextTick(function () {
                this.showBarWidth()
            })
        },
        computed: {
            baseWidth () {
                if (this.option.data.length !== 0) {
                    return this.option.data[0].count
                }
            }
        },
        methods: {
            showBarWidth () {
                let span = $('.ga-curveBars__bar');
                let baseWidth = this.baseWidth;
                span.each(function () {
                    let width = $(this).attr('w');
                    let per = width / baseWidth;
                    // 115px为柱图左边名字的宽度75px加上柱图右边数字最长宽度40px
                    $(this).width(`calc(100% * ${per})`)
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
        @b curveBars {
            color: #fff;
            font-size: 12px;
            cursor: pointer;
            margin: 5px 0;
            @e header {
                display: flex;
                height: 24px;
                color: #A2EEFF;
            }
            @e area {
                text-overflow: ellipsis;
                width: 60px;
                padding-left: 5px;
                overflow: hidden;
                white-space: nowrap;
                /*border-right: 1px solid #7D818D;*/
            }
            @e barContent {
                display: inline-block;
                width: calc(100% - 115px);
                background: rgba(24,117,240,0.20);
                border-radius: 3px;
                height: 5px;
                margin-right: 10px;
                margin-top: 4px;
            }
            @e bar {
                display: inline-block;
                position: relative;
                top: -8px;
                /*margin-top: 4px;*/
                /*margin-right: 10px;*/
                /*margin-left: 5px;*/
                min-width: 10px;
                width: 10px;
                height: 5px;
                background: #1874F0;
                border-radius: 3px;
                /*background: repeating-linear-gradient(90deg, #34befc, #34befc 5px, transparent 0, transparent 6px);*/
                transition: width 1s;
                -moz-transition: width 1s; /* Firefox 4 */
                -webkit-transition: width 1s; /* Safari and Chrome */
                -o-transition: width 1s; /* Opera */
            }
        }
    }
</style>
