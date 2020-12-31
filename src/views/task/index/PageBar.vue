<template>
    <div class="ga-layout__body-section3">
        <ul class="pageList" v-show="totalPageNum">
            <li @click="changePage(n)"
                v-for="n in totalPageNum"
                :key="n"
                :class="{ 
                    'pageList-active' : currentNum === n,
                    'page-hasNews' : isPageHasNews[n - 1]
                }">{{ n }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'PageBar',
        props: {
            //    	 总页数
            totalPageNum: {
                type: Number,
                default: 0
            },
            //       当前页数
            currentNum: {
                type: Number,
                default: 1
            },
            //        包裹层类名
            wrapperClass: {
                type: String,
                default: ''
            },
            // 页内是否有变化的数据
            isPageHasNews: {
                type: Array,
                default: []
            }
        },
        methods: {
            //    	将当前页码传给父组件
            changePage (num) {
                this.$emit('update:currentNum', num);
                this.isPageHasNews[num - 1] = false;
            }
        }
    }
</script>

<style lang="postcss">
    @component-namespace ga {
        @b layout {
            @e body-section3 {
                height: 7%;
                text-align: center;
                ul.pageList {
                    display: inline-block;
                    height: 30px;
                    border-bottom: 1px dashed #444;
                    padding: 0 30px;
                    li {
                        display: inline-block;
                        position: relative;
                        color: #5383d0;
                        font-size: 18px;
                        width: 60px;
                        height: 60px;
                        line-height: 60px;
                        background: url("~assets/images/task/pageBg.png") no-repeat center;
                        background-size: 55%;
                        margin: 0 4px;
                        cursor: pointer;
                    }
                    li.pageList-active {
                        width: 62px;
                        color: #fff;
                        background-image: url("~assets/images/task/pageBgActive.png");
                    }
                    li.page-hasNews:after {
                        content: '';
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        background: #f00;
                        border-radius: 50%;
                        position: absolute;
                        right: 12px;
                        top: 12px;
                    }
                    li.pageList-active:after {
                        display: none;
                    }
                }
            }
        }
    }
    
    @media only screen and (max-device-width: 1440px) {
        @component-namespace ga {
            @b layout {
                @e body-section3 {
                    ul.pageList {
                        height: 18px;
                        li {
                            font-size: 14px;
                            width: 36px;     
                            height: 34px;
                            line-height: 34px;
                        }
                        li.pageList-active {
                            width: 40px;
                        }
                        li.page-hasNews:after {
                            width: 6px;
                            height: 6px;
                            right: 8px;
                            top: 6px;
                        }
                    }
                }
            }
        }
    }
</style>

