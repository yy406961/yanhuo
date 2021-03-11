<!--
 * @Author: your name
 * @Date: 2021-03-10 14:57:04
 * @LastEditTime: 2021-03-10 15:38:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yanhuo\src\views\situationAnalysis\components\userBar.vue
-->
<template lang="html">
    <div class="ga-userBar">
        <div v-for="(item, index) in option" :key="'bar' + index"
          class="ga-userBar__barItem">
            <div class="ga-userBar__title">
                <span>{{ item.area }}</span>
                <span class="ga-userBar__title--count">{{ item.count }}</span>
            </div>
            <div class="ga-userBar__bar">
                <span class="ga-userBar__bar--count" :w="item.count" ref="areaBar"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'userBar',
        props: ['option'],
        data () {
            return {
            }
        },
        updated () {
            this.$nextTick(function () {
                this.showBarWidth()
            })
        },
        watch: {
        },
        computed: {
            baseWidth () {
                if (this.option && this.option.length !== 0) {
                    return this.option[0].count
                }
            }
        },
        methods: {
            showBarWidth () {
                let span = this.$refs.areaBar
                let baseWidth = this.baseWidth

                if (span) {
                    span.forEach(item => {
                        let width = item.getAttribute('w')
                        let per = width / baseWidth * 100
                        // 105px为柱图左边名字的宽度65px加上柱图右边数字最长宽度40px
                        item.style.width = `calc(${per}%)`
                    })
                }
            }
        }
    }
</script>

<style scoped>
    @component-namespace ga {
        @b userBar {
            display: flex;
            flex-wrap: wrap;
            font-size: 13px;
            @e barItem {
                width: calc(50% - 8px);
                margin: 6px 2px 6px 0;
                &:nth-child(odd) {
                    margin-right: 12px;
                }
            }
            @e title {
                display: flex;
                justify-content: space-between;
                color: #fff;
                @m count {
                    color: rgba(14, 247, 255, 1);
                }
            }
            @e bar {
                width: 100%;
                background: #06224E;
                border-radius: 5px;
                height: 10px;
                margin-top: 5px;
                display: flex;
                @m count {
                    border-radius: 5px;
                    min-width: 5px;
                    height: 10px;
                    transition:width 1s;
                    background: linear-gradient(270deg, #2FACBA, #0977FF);
                }
            }
        }
    }
</style>
