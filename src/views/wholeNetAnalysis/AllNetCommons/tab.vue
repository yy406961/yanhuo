<template>
    <div class="ga-tabs">
        <div class="ga-tabs__panes">
            <div @click="toggle(index)" v-for="(pane,index) in panes" :key="index" :class="[{active:active === index},
            {'ga-tabs__panes--pane':panes.length === 3, 'ga-tabs__panes--nationPane':panes.length === 4}]">
                <span>
                    {{pane.name}}
                </span>
            </div>
        </div>
        <div class="ga-tabs__content" :style="contentStyle" ref="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                active: this.act,
                panesHeight: 0,
                contentHeight: 0
            }
        },
        created () {
        },
        mounted () {
        },
        props: {
            act: {
                default: 0
            },
            panes: {
                type: Array,
                default: [
                    {
                        type: '你好',
                        view: 'hello1'
                    },
                    {
                        type: '哈哈',
                        view: 'hello'
                    }
                ]
            },
            option: {}
        },
        watch: {
            'option.panes.height' (val) {
                this.panesHeight = val;
            },
            act (val) {
                this.active = val
            }
        },
        computed: {
            panesStyle () {
                return {
                    height: this.panesHeight + 'px'
                }
            },
            contentStyle () {
                return {
                    height: this.option.content.height + 'px',
                    width: this.option.content.width + 'px'
                }
            }
        },
        methods: {
            toggle (i) {
                this.active = i
                this.$emit('currentSelected', i)
            }
        }
    }
</script>

<style lang="postcss" scoped>
    .active{
        color: #00FFBF !important;
        /* border-bottom: 2px solid #20a5dc; */
    }
    @component-namespace ga {
        @b tabs {
            /*border: 1px solid black;*/
            @e panes {
                /*background-color: rgba(0,0,0,0.7);*/
                width: 100%;
                height: 30px;
                padding-left: 5%;
                padding-right: 5%;
                /*border: 1px solid red;*/
                @m pane {
                    float: left;
                    width: 33%;
                    color:#fff;
                    cursor: pointer;
                    text-align: center;
                    padding-top: 5px;
                    padding-bottom: 3px;
                }
                @m nationPane {
                    float: left;
                    width: 25%;
                    color:#fff;
                    cursor: pointer;
                    text-align: center;
                    padding-top: 5px;
                    padding-bottom: 3px;
                }
            }
            @e content {
                /*background-color: rgba(0,0,0,0.7);*/
                background-color: transparent;
                /*border: 1px solid gold;*/
            }
        }
    }
</style>
